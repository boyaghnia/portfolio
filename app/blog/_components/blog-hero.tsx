"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, BookOpen } from "lucide-react";
import { BLOG_CATEGORIES, BlogCategoryOption } from "@/data/blog";

interface BlogHeroProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  categories?: BlogCategoryOption[];
  totalPosts: number;
}

export function BlogHero({
  selectedCategory,
  onCategoryChange,
  categories = BLOG_CATEGORIES,
  totalPosts,
}: BlogHeroProps) {
  return (
    <div className="relative pt-16 sm:pt-16 pb-8 flex flex-col items-center text-center"></div>
  );
}
