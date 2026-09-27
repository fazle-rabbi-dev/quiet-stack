export type PostCover =
  "violet" | "blue" | "green" | "pink" | "indigo" | "orange";

export type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  tags: string[];
  date: string;
  likes: number;
  readingTime: string;
  cover: PostCover;
  coverText?: string;
  liked?: boolean;
};
