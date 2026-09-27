import type { PostCover } from "@/types/post";

// Duplicated from models (client components can't import mongoose models)
export const POST_COVERS = [
  "violet",
  "blue",
  "green",
  "pink",
  "indigo",
  "orange",
] as const;

export const POST_STATUSES = ["published", "draft"] as const;
export type PostStatus = (typeof POST_STATUSES)[number];

export type PostFormData = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover: PostCover;
  coverText: string;
  tags: string[];
  status: PostStatus;
  featured: boolean;
  readingTime: number;
};

export const EMPTY_FORM: PostFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "## Heading 2 \n\nStart writing your content here...",
  cover: "violet",
  coverText: "",
  tags: [],
  status: "draft",
  featured: false,
  readingTime: 1,
};

export type PostFormParent = "create-post" | "edit-post";
