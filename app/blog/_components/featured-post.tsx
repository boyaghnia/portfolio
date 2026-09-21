"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  Eye,
  Heart,
} from "lucide-react";
import { BlogPost, formatBlogDate } from "@/data/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FeaturedPostProps {
  post: BlogPost;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative rounded-none border border-border/60 bg-card/60 backdrop-blur-md overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-2xl shadow-primary/5 mb-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Visual Cover Section */}
        <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-[420px] bg-muted overflow-hidden group">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent lg:hidden" />
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-card/90 hidden lg:block" />

          {/* Floating Pill: Featured */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none text-xs font-semibold bg-primary text-primary-foreground shadow-lg">
              Artikel Unggulan
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
              <Badge
                variant="outline"
                className="text-xs font-medium uppercase border-primary/30 text-primary rounded-none"
              >
                {post.category}
              </Badge>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {formatBlogDate(post.publishedAt || post.updatedAt)}
                </span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime} min baca</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground hover:text-primary transition-colors mb-3 leading-snug">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>

            {/* Excerpt */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3 mb-6">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-none bg-muted/60 text-muted-foreground font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Call to Action & Stats */}
          <div className="pt-6 border-t border-border/40 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" /> {post.views || 0} views
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500/80" /> {post.likes || 0}
              </span>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <Button className="gap-2 group rounded-none">
                <span>Baca Artikel</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
