import Link from "next/link";
import { Tags } from "lucide-react";

import { getAllTags } from "@/lib/posts";

export async function TagsSection() {
  const { success, data: tags } = await getAllTags();

  if (!success || tags.length === 0) return null;

  return (
    <section aria-label="All tags" className="max-body mt-12">
      <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 dark:border-white/10 dark:bg-[#121218]">
        <h2 className="heading-2 flex-center gap-2 font-extrabold tracking-tight text-foreground">
          <Tags className="size-5 text-violet-500" />
          Browse by tag
        </h2>

        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <li key={tag}>
              <Link
                href={`/tag/${tag}`}
                className="inline-block rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground dark:border-white/10 dark:bg-black/40 dark:text-white/70 dark:hover:border-white/20 dark:hover:text-white"
              >
                #{tag} · {count}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
