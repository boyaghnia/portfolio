"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, Eye, Heart, ArrowUpRight } from "lucide-react";
import { BlogPost, formatBlogDate } from "@/data/blog";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="group flex flex-col h-full rounded-none border border-border/50 bg-card/60 backdrop-blur-md overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
    >
      {/* Cover Image Container */}
      <Link
        href={`/blog/${post.slug}`}
        className="relative w-full h-48 sm:h-52 overflow-hidden block bg-muted"
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className="text-[11px] font-semibold tracking-wide bg-background/85 backdrop-blur-md border border-border/60 uppercase rounded-none"
          >
            {post.category}
          </Badge>
        </div>

        {/* Draft Indicator */}
        {!post.published && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-none bg-amber-500/90 text-amber-950">
              Draft
            </span>
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        {/* Meta Info: Date & Reading Time */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2.5">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatBlogDate(post.publishedAt || post.updatedAt)}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime} min baca</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
          <Link href={`/blog/${post.slug}`} className="flex items-start justify-between gap-1">
            <span>{post.title}</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-primary shrink-0 mt-1" />
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4 flex-1">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-none bg-muted/60 text-muted-foreground font-mono"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-[11px] px-1.5 py-0.5 rounded-none text-muted-foreground">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer Meta: Views & Likes */}
        <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1" title="Jumlah pembaca">
              <Eye className="w-3.5 h-3.5" /> {post.views || 0}
            </span>
            <span className="flex items-center gap-1" title="Jumlah apresiasi">
              <Heart className="w-3.5 h-3.5 text-rose-500/80" /> {post.likes || 0}
            </span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            Baca Selengkapnya
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
