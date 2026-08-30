import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4F5D95",
  Python: "#3572A5",
  Vue: "#41b883",
  Shell: "#89e051",
  Blade: "#f7523f",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Dart: "#00B4AB",
  Other: "#a855f7",
};

const TARGET_YEARS = ["last", "2026", "2025", "2024"];

export async function GET() {
  const username = "boyaghnia";
  const token = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT;

  const authHeaders: Record<string, string> = {
    "User-Agent": "Portfolio-App",
    Accept: "application/vnd.github+json",
  };
  if (token) {
    authHeaders["Authorization"] = `Bearer ${token}`;
  }

  try {
    // 1. Fetch Contributions for "last" (rolling 1 year) and individual years (2026, 2025, 2024)
    const contributionsByYear: Record<
      string,
      { total: number; contributions: ContributionDay[] }
    > = {
      last: { total: 0, contributions: [] },
      "2026": { total: 0, contributions: [] },
      "2025": { total: 0, contributions: [] },
      "2024": { total: 0, contributions: [] },
    };

    try {
      const [lastRes, allRes] = await Promise.all([
        fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
          { next: { revalidate: 3600 } }
        ),
        fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
          next: { revalidate: 3600 },
        }),
      ]);

      if (lastRes.ok) {
        const lastData = await lastRes.json();
        if (lastData && Array.isArray(lastData.contributions)) {
          contributionsByYear.last = {
            total:
              lastData.total?.lastYear ??
              lastData.contributions.reduce(
                (acc: number, c: ContributionDay) => acc + c.count,
                0
              ),
            contributions: lastData.contributions,
          };
        }
      }

      if (allRes.ok) {
        const allData = await allRes.json();
        const allContribs: ContributionDay[] = allData.contributions || [];

        for (const yr of ["2026", "2025", "2024"]) {
          const yearContribs = allContribs.filter((c) =>
            c.date.startsWith(`${yr}-`)
          );
          const totalYear =
            allData.total?.[yr] ??
            yearContribs.reduce((acc, c) => acc + c.count, 0);

          contributionsByYear[yr] = {
            total: totalYear,
            contributions: yearContribs,
          };
        }
      }
    } catch {
      // Fallback below if fetch fails
    }

    // Fallbacks if empty
    if (contributionsByYear.last.contributions.length === 0) {
      const today = new Date();
      const list: ContributionDay[] = [];
      for (let i = 364; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const count =
          i % 7 === 1 || i % 5 === 2 || i % 11 === 0 ? (i % 6) + 1 : 0;
        list.push({
          date: d.toISOString().split("T")[0],
          count,
          level: count > 4 ? 4 : count > 2 ? 3 : count > 0 ? 2 : 0,
        });
      }
      contributionsByYear.last = {
        total: list.reduce((acc, c) => acc + c.count, 0),
        contributions: list,
      };
    }

    for (const yr of ["2026", "2025", "2024"]) {
      if (contributionsByYear[yr].contributions.length === 0) {
        const yearInt = parseInt(yr, 10);
        const isLeap =
          (yearInt % 4 === 0 && yearInt % 100 !== 0) || yearInt % 400 === 0;
        const totalDays = isLeap ? 366 : 365;
        const list: ContributionDay[] = [];
        const start = new Date(`${yr}-01-01T00:00:00Z`);

        for (let d = 0; d < totalDays; d++) {
          const current = new Date(start);
          current.setUTCDate(start.getUTCDate() + d);
          const dateStr = current.toISOString().split("T")[0];
          const seed = (d * 7 + yearInt) % 13;
          const count = seed === 0 || seed === 4 ? (d % 5) + 1 : 0;
          list.push({
            date: dateStr,
            count,
            level: count > 4 ? 4 : count > 2 ? 3 : count > 0 ? 2 : 0,
          });
        }

        contributionsByYear[yr] = {
          total: list.reduce((acc, c) => acc + c.count, 0),
          contributions: list,
        };
      }
    }

    // Default initial view: "last" (1 Tahun Terakhir)
    const activeYear = "last";
    const totalContributions = contributionsByYear.last.total;
    const contributions = contributionsByYear.last.contributions;

    // 2. Fetch Repositories (Public + Private if token is available)
    const reposUrl = token
      ? `https://api.github.com/user/repos?per_page=100&type=all&sort=updated`
      : `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;

    let repos: any[] = [];
    try {
      const reposRes = await fetch(reposUrl, {
        headers: authHeaders,
        next: { revalidate: 3600 },
      });
      if (reposRes.ok) {
        repos = await reposRes.json();
      }
    } catch {
      // Ignore repo fetch error
    }

    // 3. Calculate Language Stats from Repositories
    const langByteMap: Record<string, number> = {};
    let totalBytes = 0;

    if (Array.isArray(repos) && repos.length > 0) {
      if (token) {
        const activeRepos = repos.slice(0, 15);
        await Promise.all(
          activeRepos.map(async (r) => {
            try {
              const langRes = await fetch(r.languages_url, {
                headers: authHeaders,
                next: { revalidate: 3600 },
              });
              if (langRes.ok) {
                const langJson = await langRes.json();
                for (const [lang, bytes] of Object.entries(langJson)) {
                  langByteMap[lang] =
                    (langByteMap[lang] || 0) + (bytes as number);
                  totalBytes += bytes as number;
                }
              }
            } catch {
              // Ignore single repo error
            }
          })
        );
      }

      if (totalBytes === 0) {
        for (const repo of repos) {
          if (repo.language) {
            langByteMap[repo.language] = (langByteMap[repo.language] || 0) + 1;
            totalBytes += 1;
          }
        }
      }
    }

    let languages = Object.entries(langByteMap)
      .map(([name, val]) => ({
        name,
        percentage: Math.round((val / (totalBytes || 1)) * 100),
        color: LANGUAGE_COLORS[name] || "#a855f7",
      }))
      .filter((l) => l.percentage > 0)
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 7);

    if (languages.length === 0) {
      languages = [
        { name: "TypeScript", percentage: 50, color: "#3178c6" },
        { name: "HTML", percentage: 30, color: "#e34c26" },
        { name: "PHP", percentage: 15, color: "#4F5D95" },
        { name: "CSS", percentage: 5, color: "#563d7c" },
      ];
    }

    return NextResponse.json({
      hasToken: Boolean(token),
      years: TARGET_YEARS,
      contributionsByYear,
      activeYear,
      totalContributions,
      contributions,
      languages,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to fetch GitHub data",
        message: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
