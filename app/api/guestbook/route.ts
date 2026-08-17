import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { SPAM_KEYWORDS } from "@/lib/spam-keywords";

export interface GuestbookReply {
  id: string;
  name: string;
  handle?: string;
  avatarColor: string;
  isOwner: boolean;
  message: string;
  createdAt: string;
  likes: number;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  handle?: string;
  avatarColor: string;
  tag: string;
  isOwner: boolean;
  isPinned: boolean;
  message: string;
  createdAt: string;
  likes: number;
  replies: GuestbookReply[];
}

const DATA_FILE_PATH = path.join(process.cwd(), "data", "guestbook.json");

// In-memory rate limit storage (IP -> timestamps)
interface RateLimitRecord {
  lastPostTime: number;
  postTimestamps: number[];
  likeTimestamps: number[];
}
const rateLimitMap = new Map<string, RateLimitRecord>();

// Cleanup stale rate limit records every 30 minutes
setInterval(() => {
  const oneHourAgo = Date.now() - 3600 * 1000;
  for (const [ip, record] of rateLimitMap.entries()) {
    record.postTimestamps = record.postTimestamps.filter((t) => t > oneHourAgo);
    record.likeTimestamps = record.likeTimestamps.filter((t) => t > oneHourAgo);
    if (
      record.postTimestamps.length === 0 &&
      record.likeTimestamps.length === 0 &&
      record.lastPostTime < oneHourAgo
    ) {
      rateLimitMap.delete(ip);
    }
  }
}, 30 * 60 * 1000);

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();
  return "127.0.0.1";
}

function checkRateLimit(
  ip: string,
  action: "post" | "like"
): { allowed: boolean; retryAfter?: number; reason?: string } {
  const now = Date.now();
  let record = rateLimitMap.get(ip);

  if (!record) {
    record = {
      lastPostTime: 0,
      postTimestamps: [],
      likeTimestamps: [],
    };
    rateLimitMap.set(ip, record);
  }

  // Clean records older than 1 hour
  const oneHourAgo = now - 3600 * 1000;
  record.postTimestamps = record.postTimestamps.filter((t) => t > oneHourAgo);
  record.likeTimestamps = record.likeTimestamps.filter((t) => t > oneHourAgo);

  if (action === "post") {
    // Cooldown check: min 20 seconds between posts
    const cooldownMs = 20 * 1000;
    const timeSinceLast = now - record.lastPostTime;
    if (record.lastPostTime > 0 && timeSinceLast < cooldownMs) {
      const waitSec = Math.ceil((cooldownMs - timeSinceLast) / 1000);
      return {
        allowed: false,
        retryAfter: waitSec,
        reason: `Harap tunggu ${waitSec} detik sebelum mengirim pesan berikutnya.`,
      };
    }

    // Hourly quota: max 6 posts per hour per IP
    if (record.postTimestamps.length >= 6) {
      return {
        allowed: false,
        reason:
          "Batas pengiriman pesan tercapai (maks 6 pesan/jam). Silakan coba lagi nanti.",
      };
    }

    record.lastPostTime = now;
    record.postTimestamps.push(now);
  } else if (action === "like") {
    // Like limit: max 40 likes per minute
    const oneMinAgo = now - 60 * 1000;
    const recentLikes = record.likeTimestamps.filter((t) => t > oneMinAgo);
    if (recentLikes.length >= 40) {
      return {
        allowed: false,
        reason: "Terlalu banyak interaksi like. Silakan tunggu sebentar.",
      };
    }
    record.likeTimestamps.push(now);
  }

  return { allowed: true };
}

function formatHandle(handle?: string): string | undefined {
  if (!handle) return undefined;
  const trimmed = handle.trim();
  if (!trimmed || trimmed === "@") return undefined;
  const clean = trimmed.replace(/^@+/, "");
  return clean ? `@${clean}` : undefined;
}

function validateSpamContent(message: string, name: string): string | null {
  const lowerMessage = message.toLowerCase();
  const lowerName = name.toLowerCase();

  // Check character bounds
  if (name.trim().length < 2 || name.trim().length > 50) {
    return "Nama harus antara 2 hingga 50 karakter.";
  }
  if (message.trim().length < 3 || message.trim().length > 600) {
    return "Pesan harus antara 3 hingga 600 karakter.";
  }

  // Check spam keywords
  for (const keyword of SPAM_KEYWORDS) {
    if (lowerMessage.includes(keyword) || lowerName.includes(keyword)) {
      return "Pesan atau nama terindikasi spam/promosi terlarang.";
    }
  }

  // Count links (http/https)
  const urlMatches = message.match(/https?:\/\/[^\s]+/gi) || [];
  if (urlMatches.length > 2) {
    return "Pesan tidak boleh mengandung lebih dari 2 tautan link.";
  }

  return null;
}

const AVATAR_GRADIENTS = [
  "from-amber-500 to-orange-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-purple-500 to-pink-600",
  "from-rose-500 to-red-600",
  "from-cyan-500 to-blue-600",
  "from-fuchsia-500 to-purple-600",
  "from-violet-500 to-purple-700",
  "from-teal-400 to-emerald-600",
  "from-sky-400 to-blue-600",
  "from-pink-500 to-rose-600",
  "from-amber-400 to-yellow-600",
  "from-indigo-400 to-cyan-600",
];

function getRandomGradient(): string {
  return AVATAR_GRADIENTS[Math.floor(Math.random() * AVATAR_GRADIENTS.length)];
}

function readEntries(): GuestbookEntry[] {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      const initialData: GuestbookEntry[] = [];
      const dir = path.dirname(DATA_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const data = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading guestbook data:", error);
    return [];
  }
}

function writeEntries(entries: GuestbookEntry[]) {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(entries, null, 2));
  } catch (error) {
    console.error("Error writing guestbook data:", error);
  }
}

export async function GET() {
  const entries = readEntries();
  return NextResponse.json({ success: true, entries });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, passcode, website } = body;
    const entries = readEntries();
    const clientIp = getClientIp(req);

    // 1. HONEYPOT CHECK: If invisible "website" input was filled by a bot, silently reject
    if (website && String(website).trim() !== "") {
      console.warn(`[SPAM BOT DETECTED via Honeypot] IP: ${clientIp}`);
      // Return fake success so bot doesn't retry with altered behavior
      return NextResponse.json({ success: true, entries });
    }

    const isOwner =
      passcode === "boyaghnia" ||
      passcode === "admin123" ||
      passcode === "owner" ||
      passcode === "3sopdsi" ||
      passcode === "esopdsi" ||
      passcode === "esopds1";

    if (action === "create") {
      const { name, handle, message, tag } = body;

      if (!name || !message) {
        return NextResponse.json(
          { success: false, error: "Nama dan pesan wajib diisi." },
          { status: 400 }
        );
      }

      // Non-owner checks: Rate limiting & content validation
      if (!isOwner) {
        const rateLimit = checkRateLimit(clientIp, "post");
        if (!rateLimit.allowed) {
          return NextResponse.json(
            {
              success: false,
              error: rateLimit.reason || "Terlalu banyak permintaan.",
              retryAfter: rateLimit.retryAfter,
            },
            { status: 429 }
          );
        }

        const spamError = validateSpamContent(message, name);
        if (spamError) {
          return NextResponse.json(
            { success: false, error: spamError },
            { status: 400 }
          );
        }
      }

      const randomGradient = getRandomGradient();

      const newEntry: GuestbookEntry = {
        id: `guestbook-${Date.now()}`,
        name: isOwner ? "Boy Aghnia Rifadhan" : name.trim(),
        handle: isOwner
          ? "@boyaghnia"
          : formatHandle(handle),
        avatarColor: isOwner ? "from-amber-500 to-orange-600" : randomGradient,
        tag: tag || (isOwner ? "Owner Note" : "Sapaan"),
        isOwner: isOwner,
        isPinned: isOwner && body.isPinned ? true : false,
        message: message.trim(),
        createdAt: new Date().toISOString(),
        likes: 0,
        replies: [],
      };

      if (newEntry.isPinned) {
        entries.unshift(newEntry);
      } else {
        const firstNonPinnedIndex = entries.findIndex((e) => !e.isPinned);
        if (firstNonPinnedIndex === -1) {
          entries.push(newEntry);
        } else {
          entries.splice(firstNonPinnedIndex, 0, newEntry);
        }
      }

      writeEntries(entries);
      return NextResponse.json({ success: true, entry: newEntry, entries });
    }

    if (action === "reply") {
      const { entryId, name, handle, message } = body;

      if (!entryId || !name || !message) {
        return NextResponse.json(
          { success: false, error: "Semua kolom balasan wajib diisi." },
          { status: 400 }
        );
      }

      // Non-owner checks: Rate limiting & content validation
      if (!isOwner) {
        const rateLimit = checkRateLimit(clientIp, "post");
        if (!rateLimit.allowed) {
          return NextResponse.json(
            {
              success: false,
              error: rateLimit.reason || "Terlalu banyak permintaan.",
              retryAfter: rateLimit.retryAfter,
            },
            { status: 429 }
          );
        }

        const spamError = validateSpamContent(message, name);
        if (spamError) {
          return NextResponse.json(
            { success: false, error: spamError },
            { status: 400 }
          );
        }
      }

      const entry = entries.find((e) => e.id === entryId);
      if (!entry) {
        return NextResponse.json(
          { success: false, error: "Pesan tidak ditemukan." },
          { status: 404 }
        );
      }

      const randomGradient = getRandomGradient();

      const newReply: GuestbookReply = {
        id: `reply-${Date.now()}`,
        name: isOwner ? "Boy Aghnia Rifadhan" : name.trim(),
        handle: isOwner
          ? "@boyaghnia"
          : formatHandle(handle),
        avatarColor: isOwner ? "from-amber-500 to-orange-600" : randomGradient,
        isOwner: isOwner,
        message: message.trim(),
        createdAt: new Date().toISOString(),
        likes: 0,
      };

      entry.replies.push(newReply);
      writeEntries(entries);

      return NextResponse.json({ success: true, reply: newReply, entries });
    }

    if (action === "like") {
      const rateLimit = checkRateLimit(clientIp, "like");
      if (!rateLimit.allowed) {
        return NextResponse.json(
          { success: false, error: rateLimit.reason },
          { status: 429 }
        );
      }

      const { entryId, replyId } = body;
      const entry = entries.find((e) => e.id === entryId);

      if (!entry) {
        return NextResponse.json(
          { success: false, error: "Pesan tidak ditemukan." },
          { status: 404 }
        );
      }

      if (replyId) {
        const reply = entry.replies.find((r) => r.id === replyId);
        if (reply) {
          reply.likes = (reply.likes || 0) + 1;
        }
      } else {
        entry.likes = (entry.likes || 0) + 1;
      }

      writeEntries(entries);
      return NextResponse.json({ success: true, entries });
    }

    if (action === "delete") {
      if (!isOwner) {
        return NextResponse.json(
          { success: false, error: "Hanya pemilik yang dapat menghapus pesan." },
          { status: 403 }
        );
      }

      const { entryId, replyId } = body;

      if (!entryId) {
        return NextResponse.json(
          { success: false, error: "ID pesan wajib disertakan." },
          { status: 400 }
        );
      }

      if (replyId) {
        const entry = entries.find((e) => e.id === entryId);
        if (entry) {
          entry.replies = entry.replies.filter((r) => r.id !== replyId);
          writeEntries(entries);
          return NextResponse.json({ success: true, entries });
        }
        return NextResponse.json(
          { success: false, error: "Pesan tidak ditemukan." },
          { status: 404 }
        );
      } else {
        const updatedEntries = entries.filter((e) => e.id !== entryId);
        writeEntries(updatedEntries);
        return NextResponse.json({ success: true, entries: updatedEntries });
      }
    }

    if (action === "edit") {
      if (!isOwner) {
        return NextResponse.json(
          { success: false, error: "Hanya pemilik yang dapat mengedit pesan." },
          { status: 403 }
        );
      }

      const { entryId, replyId, message, tag } = body;

      if (!entryId || !message?.trim()) {
        return NextResponse.json(
          { success: false, error: "ID dan isi pesan wajib disertakan." },
          { status: 400 }
        );
      }

      const entry = entries.find((e) => e.id === entryId);
      if (!entry) {
        return NextResponse.json(
          { success: false, error: "Pesan tidak ditemukan." },
          { status: 404 }
        );
      }

      if (replyId) {
        const reply = entry.replies.find((r) => r.id === replyId);
        if (!reply) {
          return NextResponse.json(
            { success: false, error: "Balasan tidak ditemukan." },
            { status: 404 }
          );
        }
        reply.message = message.trim();
      } else {
        entry.message = message.trim();
        if (tag) {
          entry.tag = tag;
        }
      }

      writeEntries(entries);
      return NextResponse.json({ success: true, entries });
    }

    return NextResponse.json(
      { success: false, error: "Aksi tidak dikenali." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in guestbook API:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server internal." },
      { status: 500 }
    );
  }
}
