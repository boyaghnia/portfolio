import type * as React from "react";

export type FolderCategory =
  | "organologi-tarawangsa"
  | "organologi-kacapi"
  | "alat-musik"
  | "karinding"
  | "terminal-bade"
  | "etc";

export interface LightboxMedia {
  title: string;
  category: string;
  type: "image" | "video";
  src: string;
  desc?: string;
  badge?: string;
}

export interface YouTubeVideo {
  id: string;
  youtubeId: string;
  title: string;
  subtitle: string;
  desc: string;
  software: string;
  url: string;
}

export interface FolderTabConfig {
  id: FolderCategory;
  number: string;
  name: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  itemCount: number;
}
