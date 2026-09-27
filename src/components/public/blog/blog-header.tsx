import Link from "next/link";
import { Calendar, Clock, Heart } from "lucide-react";

type BlogHeaderProps = {
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  readingTime: number;
  words: number;
  likes: number;
};

export function BlogHeader({
  title,
  excerpt,
  tags,
  date,
  readingTime,
  words,
  likes,
}: BlogHeaderProps) {
  return (
    <header>
      {/* Tags */}
      {tags.length > 0 && (
        <ul aria-label="Post tags" className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/tag/${tag}`}
                className="inline-block rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground dark:bg-black/40 dark:text-white/70 dark:hover:text-white"
              >
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Title + excerpt */}
      <h1 className="heading-1 mt-4 text-foreground dark:text-white">{title}</h1>
      <p className="mt-3 text-base text-muted-foreground dark:text-white/60">
        {excerpt}
      </p>

      {/* Meta */}
      <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground dark:text-white/50">
        <span className="flex-center gap-1">
          <Calendar className="size-3.5" />
          {date}
        </span>
        <span className="flex-center gap-1">
          <Clock className="size-3.5" />
          {readingTime} min read · {words} words
        </span>
        <span className="flex-center gap-1">
          <Heart className="size-3.5" />
          {likes} likes
        </span>
      </p>
    </header>
  );
}
