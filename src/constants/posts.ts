import type { PostCard } from "@/types/post";

export const FEATURED_POSTS: PostCard[] = [
  {
    slug: "designing-calm-minimalism-that-converts",
    title: "Designing calm: minimalism that converts",
    excerpt:
      "Why the quietest interfaces win - whitespace, rhythm and restraint as growth levers.",
    tag: "design",
    tags: ["design", "minimalism"],
    date: "2 Sept 2026",
    likes: 129,
    readingTime: "1 min",
    cover: "violet",
    liked: true,
  },
  {
    slug: "local-first-software-your-data-your-speed",
    title: "Local-first software: your data, your speed",
    excerpt:
      "localStorage, IndexedDB and CRDTs - how to build apps that feel instant and survive offline.",
    tag: "engineering",
    tags: ["engineering", "offline"],
    date: "28 Aug 2026",
    likes: 96,
    readingTime: "1 min",
    cover: "blue",
  },
  {
    slug: "write-in-markdown-publish-everywhere",
    title: "Write in Markdown, publish everywhere",
    excerpt:
      "One plain-text source that becomes blog, newsletter, RSS and slides. My exact workflow.",
    tag: "writing",
    tags: ["writing", "markdown"],
    date: "20 Aug 2026",
    likes: 84,
    readingTime: "1 min",
    cover: "green",
  },
];

export const LATEST_POSTS: PostCard[] = FEATURED_POSTS;

export const ALL_POSTS: PostCard[] = [
  ...FEATURED_POSTS,
  {
    slug: "dark-mode-done-right-tokens-not-overrides",
    title: "Dark mode done right: tokens, not overrides",
    excerpt:
      "Stop writing dark: prefixes everywhere. Use CSS variables and one class toggle.",
    tag: "css",
    tags: ["css", "design"],
    date: "12 Aug 2026",
    likes: 61,
    readingTime: "1 min",
    cover: "pink",
  },
  {
    slug: "anonymous-likes-with-fingerprintjs",
    title: "Anonymous likes with FingerprintJS",
    excerpt:
      "Let readers react without accounts - device fingerprints + rate limits keep it honest.",
    tag: "engineering",
    tags: ["engineering", "privacy"],
    date: "5 Aug 2026",
    likes: 48,
    readingTime: "1 min",
    cover: "indigo",
  },
  {
    slug: "typography-is-the-ui",
    title: "Typography is the UI",
    excerpt:
      "Sora for display, Inter for body, JetBrains Mono for code. A three-font system that scales.",
    tag: "design",
    tags: ["design", "typography"],
    date: "29 Jul 2026",
    likes: 39,
    readingTime: "1 min",
    cover: "orange",
  },
  {
    slug: "javascript-without-the-build-step",
    title: "JavaScript without the build step",
    excerpt:
      "Import maps, native ESM and zero-config deploys for small sites that stay fast.",
    tag: "javascript",
    tags: ["javascript", "workflow"],
    date: "21 Jul 2026",
    likes: 32,
    readingTime: "1 min",
    cover: "blue",
  },
  {
    slug: "ux-microcopy-that-calms",
    title: "UX microcopy that calms",
    excerpt:
      "Buttons, errors and empty states that lower heart rates instead of raising them.",
    tag: "ux",
    tags: ["ux", "theming"],
    date: "14 Jul 2026",
    likes: 27,
    readingTime: "1 min",
    cover: "violet",
  },
];

export const ALL_TAGS = [
  "All",
  "#design",
  "#minimalism",
  "#ux",
  "#engineering",
  "#offline",
  "#javascript",
  "#writing",
  "#markdown",
  "#workflow",
  "#css",
  "#theming",
] as const;

export const PAGE_SIZE = 6;
