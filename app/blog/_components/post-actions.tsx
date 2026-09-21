"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Heart, Check, Copy, MessageCircle } from "lucide-react";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

interface PostActionsProps {
  slug: string;
  title: string;
  initialLikes: number;
}

export function PostActions({ slug, title, initialLikes }: PostActionsProps) {
  const [likes, setLikes] = React.useState(initialLikes);
  const [hasLiked, setHasLiked] = React.useState(false);
  const [isLiking, setIsLiking] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  // Check localStorage for like state
  React.useEffect(() => {
    try {
      const likedPosts = JSON.parse(
        localStorage.getItem("blog_liked_posts") || "[]",
      );
      if (likedPosts.includes(slug)) {
        setHasLiked(true);
      }
    } catch {
      // Ignore storage errors
    }
  }, [slug]);

  const handleLike = async () => {
    if (hasLiked || isLiking) return;

    setIsLiking(true);
    // Optimistic UI update
    setLikes((prev) => prev + 1);
    setHasLiked(true);

    try {
      const likedPosts = JSON.parse(
        localStorage.getItem("blog_liked_posts") || "[]",
      );
      if (!likedPosts.includes(slug)) {
        likedPosts.push(slug);
        localStorage.setItem("blog_liked_posts", JSON.stringify(likedPosts));
      }

      await fetch(`/api/blog/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like" }),
      });
    } catch (error) {
      console.error("Failed to like post:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = () => {
    if (!currentUrl) return;
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title,
  )}&url=${encodeURIComponent(currentUrl)}&via=boyaghnia`;

  const shareLinkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    currentUrl,
  )}`;

  const shareWhatsAppUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${title} - ${currentUrl}`,
  )}`;

  return (
    <div className="py-6 my-8 border-y border-border/40 flex flex-wrap items-center justify-between gap-4">
      {/* Like Button */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLike}
          disabled={hasLiked || isLiking}
          className={`flex items-center gap-2 px-4 py-2 rounded-none border transition-all cursor-pointer ${
            hasLiked
              ? "bg-rose-500/10 border-rose-500/40 text-rose-500 font-medium"
              : "bg-muted/50 hover:bg-muted border-border text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Sukai artikel ini"
        >
          <motion.div
            animate={hasLiked ? { scale: [1, 1.35, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={`w-5 h-5 ${
                hasLiked
                  ? "fill-rose-500 text-rose-500"
                  : "text-muted-foreground"
              }`}
            />
          </motion.div>
          <span className="text-sm font-semibold">{likes}</span>
        </motion.button>
      </div>

      {/* Share Buttons */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground font-medium hidden sm:inline flex items-center gap-1.5 mr-1">
          Bagikan:
        </span>

        {/* Copy Link */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="h-9 px-3 text-xs gap-1.5 rounded-none border-border/60 hover:bg-muted cursor-pointer"
          title="Salin tautan artikel"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500">Tersalin</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Salin URL</span>
            </>
          )}
        </Button>

        {/* Twitter/X */}
        <a
          href={shareTwitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 w-9 inline-flex items-center justify-center rounded-none border border-border/60 bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          title="Bagikan ke X (Twitter)"
        >
          <FaXTwitter className="w-4 h-4" />
        </a>

        {/* LinkedIn */}
        <a
          href={shareLinkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 w-9 inline-flex items-center justify-center rounded-none border border-border/60 bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          title="Bagikan ke LinkedIn"
        >
          <FaLinkedin className="w-4 h-4" />
        </a>

        {/* WhatsApp */}
        <a
          href={shareWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 w-9 inline-flex items-center justify-center rounded-none border border-border/60 bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          title="Bagikan ke WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
