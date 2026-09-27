import Link from "next/link";

import { cn } from "cn";

type TagFiltersProps = {
  tags: { tag: string }[];
};

export function TagFilters({ tags }: TagFiltersProps) {
  if (tags.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.slice(0, 15).map(({ tag }) => (
        <Link
          key={tag}
          href={`/tag/${tag}`}
          className={cn(
            "rounded-full dark:border-white/10 dark:bg-transparent dark:text-white/60 dark:hover:border-white/20 dark:hover:text-white"
          )}
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
