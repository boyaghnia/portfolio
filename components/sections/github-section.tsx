"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Code2, RefreshCw } from "lucide-react";

const FADE_IN = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const YEAR_OPTIONS = [
  { id: "last", label: "1 Tahun Terakhir" },
  { id: "2026", label: "2026" },
  { id: "2025", label: "2025" },
  { id: "2024", label: "2024" },
];

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface LanguageItem {
  name: string;
  percentage: number;
  color: string;
}

interface ActivityData {
  hasToken: boolean;
  years: string[];
  contributionsByYear: Record<
    string,
    { total: number; contributions: ContributionDay[] }
  >;
  activeYear: string;
  totalContributions: number;
  contributions: ContributionDay[];
  languages: LanguageItem[];
}

export function GithubSection() {
  const [data, setData] = React.useState<ActivityData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [selectedYear, setSelectedYear] = React.useState<string>("last");
  const [mounted, setMounted] = React.useState(false);
  const [hoveredDay, setHoveredDay] = React.useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch("/api/github-activity");
        if (res.ok) {
          const json = await res.json();
          if (isMounted) {
            setData(json);
            if (json.activeYear) {
              setSelectedYear(json.activeYear);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load GitHub activity", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Get active year data
  const currentYearData = React.useMemo(() => {
    if (data?.contributionsByYear?.[selectedYear]) {
      return data.contributionsByYear[selectedYear];
    }
    return {
      total: data?.totalContributions ?? 0,
      contributions: data?.contributions ?? [],
    };
  }, [data, selectedYear]);

  // Auto scroll heatmap to the right (latest days) on year change or initial load
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [selectedYear, data]);

  // Organize days into weeks of 7 days
  const weeks = React.useMemo(() => {
    const list = currentYearData.contributions;
    if (!list || list.length === 0) return [];

    const weekChunks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    const firstDate = new Date(list[0].date);
    const leadingPadding = firstDate.getUTCDay(); // Align days 0-6

    for (let i = 0; i < leadingPadding; i++) {
      currentWeek.push({ date: "", count: -1, level: -1 });
    }

    for (const day of list) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weekChunks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: "", count: -1, level: -1 });
      }
      weekChunks.push(currentWeek);
    }

    return weekChunks;
  }, [currentYearData.contributions]);

  // Determine month labels for each week column
  const monthLabels = React.useMemo(() => {
    if (weeks.length === 0) return [];
    const labels: Record<number, string> = {};
    let lastMonth = -1;
    let lastLabeledCol = -10;

    weeks.forEach((week, wIdx) => {
      const validDay = week.find((d) => d.date && d.count !== -1);
      if (validDay) {
        const d = new Date(validDay.date);
        const m = d.getUTCMonth();

        // Place label if month changes
        if (m !== lastMonth) {
          // If week 0 only contains 1-2 trailing days of previous month before a new month starts next week, skip week 0 (eliminates "AguSep" clash at start)
          const isWeekZeroCutoff =
            wIdx === 0 &&
            weeks[1] &&
            Boolean(
              weeks[1].find(
                (d) =>
                  d.date &&
                  d.count !== -1 &&
                  new Date(d.date).getUTCMonth() !== m,
              ),
            );

          // Prevent labels from colliding if closer than 3 columns
          const isTooClose = wIdx - lastLabeledCol < 3;

          // Only skip if it's literally the very last column where text would clip outside the container
          const isAtVeryEdge = weeks.length - wIdx < 2;

          if (!isWeekZeroCutoff && !isAtVeryEdge && !isTooClose) {
            labels[wIdx] = MONTH_NAMES[m];
            lastLabeledCol = wIdx;
          }

          lastMonth = m;
        }
      }
    });

    return labels;
  }, [weeks]);

  // Primary color levels matching portfolio style without yellow
  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-primary/25 hover:bg-primary/35";
      case 2:
        return "bg-primary/50 hover:bg-primary/65";
      case 3:
        return "bg-primary/75 hover:bg-primary/85";
      case 4:
        return "bg-primary hover:bg-primary/95 shadow-[0_0_8px_var(--primary)]";
      case 0:
      default:
        return "bg-muted/40 dark:bg-zinc-800/60 hover:bg-muted/70 dark:hover:bg-zinc-700/70";
    }
  };

  return (
    <motion.section
      id="activity"
      className="pb-6 scroll-mt-14 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {/* Main Content: Heatmap & Languages (Border None) */}
      <div className="space-y-6">
        {/* Contribution Calendar (Heatmap) */}
        <motion.div
          variants={FADE_IN}
          className="p-6 bg-background/50 backdrop-blur-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-base">
                {loading
                  ? "Grafik Kontribusi GitHub"
                  : selectedYear === "last"
                    ? `${currentYearData.total} Kontribusi dalam 1 Tahun Terakhir`
                    : `${currentYearData.total} Kontribusi pada tahun ${selectedYear}`}
              </h3>
            </div>
          </div>

          {/* Grid Layout: Calendar + Side Year Selector */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Scrollable Heatmap */}
            <div className="flex-1 min-w-0 w-full overflow-hidden">
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto pb-3 pt-1 scrollbar-none"
              >
                {loading ? (
                  <div className="h-28 flex items-center justify-center gap-2 text-muted-foreground text-sm">
                    <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                    Memuat grafik kontribusi...
                  </div>
                ) : (
                  <div className="inline-block min-w-full">
                    {/* Month Labels Row */}
                    <div className="flex gap-1.5 mb-2 select-none h-4">
                      {weeks.map((_, wIdx) => {
                        const label = monthLabels[wIdx];
                        return (
                          <div
                            key={wIdx}
                            className="w-3 sm:w-3.5 shrink-0 relative"
                          >
                            {label && (
                              <span className="absolute left-0 top-0 text-[11px] font-medium text-muted-foreground whitespace-nowrap">
                                {label}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Heatmap Grid */}
                    <div className="flex gap-1.5">
                      {weeks.map((week, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-1.5">
                          {week.map((day, dIdx) => {
                            if (day.count === -1) {
                              return (
                                <div
                                  key={dIdx}
                                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-0"
                                />
                              );
                            }
                            return (
                              <div
                                key={dIdx}
                                onMouseEnter={(e) => {
                                  const rect =
                                    e.currentTarget.getBoundingClientRect();
                                  setHoveredDay({
                                    date: day.date,
                                    count: day.count,
                                    x: rect.left + rect.width / 2,
                                    y: rect.top - 8,
                                  });
                                }}
                                onMouseLeave={() => setHoveredDay(null)}
                                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-all duration-150 cursor-pointer ${getLevelColor(
                                  day.level,
                                )}`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-between mt-4 pt-3 text-xs text-muted-foreground">
                      <span className="text-[11px]">
                        Github:{" "}
                        <a
                          href="https://github.com/boyaghnia"
                          target="_blank"
                          rel="noreferrer"
                          className="underline hover:text-foreground"
                        >
                          @boyaghnia
                        </a>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] mr-1">Less</span>
                        <div className="w-3 h-3 bg-muted/40 dark:bg-zinc-800/60" />
                        <div className="w-3 h-3 bg-primary/25" />
                        <div className="w-3 h-3 bg-primary/50" />
                        <div className="w-3 h-3 bg-primary/75" />
                        <div className="w-3 h-3 bg-primary" />
                        <span className="text-[11px] ml-1">More</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Year Selector on the Right Side (1 Tahun Terakhir, 2026, 2025, 2024) */}
            <div className="flex md:flex-col gap-1.5 shrink-0 self-start w-full md:w-auto pt-1">
              {YEAR_OPTIONS.map((opt) => {
                const isSelected = selectedYear === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedYear(opt.id)}
                    className={`px-3.5 py-1.5 text-xs font-medium transition-all text-center md:text-left cursor-pointer flex-1 md:flex-none ${
                      isSelected
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Top Languages Breakdown (Border None) */}
        <motion.div
          variants={FADE_IN}
          className="p-6 bg-background/50 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-base">Top Languages</h3>
            </div>
            <span className="text-xs text-muted-foreground">
              {data?.hasToken
                ? "Repository Languages Percentage"
                : "Repository Languages Percentage"}
            </span>
          </div>

          {/* Multi-color Distribution Bar */}
          <div className="h-3 w-full overflow-hidden flex gap-1 p-0.5 bg-muted/40 mb-4">
            {data?.languages?.map((lang, idx) => (
              <div
                key={idx}
                style={{
                  width: `${Math.max(lang.percentage, 3)}%`,
                  backgroundColor: lang.color,
                }}
                className="h-full transition-all duration-500"
                title={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>

          {/* Language Badges / Pills */}
          <div className="flex flex-wrap gap-3">
            {data?.languages?.map((lang, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 bg-card/60 text-xs"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="font-medium text-foreground">{lang.name}</span>
                <span className="text-muted-foreground font-mono">
                  {lang.percentage}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Portal Tooltip: rendered in document.body to prevent any Framer Motion transform offset */}
      {mounted &&
        hoveredDay &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed z-[99999] pointer-events-none px-2.5 py-1 bg-popover/95 backdrop-blur-md text-popover-foreground text-xs shadow-xl whitespace-nowrap"
            style={{
              left: `${hoveredDay.x}px`,
              top: `${hoveredDay.y}px`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <span className="font-semibold text-primary">
              {hoveredDay.count === 0
                ? "No contributions"
                : `${hoveredDay.count} contribution${
                    hoveredDay.count > 1 ? "s" : ""
                  }`}
            </span>{" "}
            on{" "}
            {new Date(hoveredDay.date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>,
          document.body,
        )}
    </motion.section>
  );
}
