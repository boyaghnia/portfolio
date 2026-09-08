import { BlogPost, BlogCategoryOption, BlogAuthor } from "@/data/blog";

export type { BlogPost, BlogCategoryOption, BlogAuthor };

export interface BlogFilterState {
  category: string;
  search: string;
}

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}
