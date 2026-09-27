import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { HeroSearch } from "@/components/public/home/hero-search";
import { getAllTags, getPublishedCount } from "@/lib/posts";

export async function HeroSection() {
  const [{ success: tagsSuccess, data: tags }, { data: postCount }] =
    await Promise.all([getAllTags(), getPublishedCount()]);

  const visibleTags = tagsSuccess ? tags.slice(0, 6) : [];

  return (
    <section aria-label="Intro" className="max-body pt-6">
      <div className="relative overflow-hidden rounded-4xl border border-border bg-card px-5 py-10 sm:px-8 md:p-12 dark:border-white/10">
        {/* Background dots + glows */}
        <div
          aria-hidden
          className="hero-dots pointer-events-none absolute inset-0"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 -right-28 size-96 rounded-full bg-violet-400/40 blur-3xl dark:bg-violet-500/30"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 left-1/4 size-80 rounded-full bg-pink-300/40 blur-3xl dark:bg-pink-400/30"
        />

        <div className="relative max-w-2xl">
          {/* Badge */}
          <p className="flex-center inline-flex gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground dark:border-white/10 dark:bg-black/40 dark:text-white/70">
            <span className="size-2 rounded-full bg-emerald-500" />
            {postCount} posts · minimal & fast
          </p>

          {/* Heading */}
          <h1 className="hero-heading mt-5 text-black dark:text-white">
            Ideas, distilled.
            <span className="primary-gradient-text inline-block">
              Written calmly.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-base text-muted-foreground dark:text-white/60">
            A small corner of the internet where I document what I build, what I
            learn, the ideas I explore, and life along the way.
          </p>

          {/* Search + CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <HeroSearch />
            <Link
              href="#featured"
              className="btn-primary shrink-0 justify-center rounded-2xl px-6 py-3.5"
            >
              Start reading
              <ArrowDown className="size-4" />
            </Link>
          </div>

          {/* Tags */}
          <ul aria-label="Popular tags" className="mt-6 flex flex-wrap gap-2.5">
            {visibleTags.map(({ tag }) => (
              <li key={tag}>
                <Link
                  href={`/tag/${tag}`}
                  className="inline-block rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground dark:border-white/10 dark:bg-black/40 dark:text-white/80 dark:hover:border-white/20 dark:hover:text-white"
                >
                  #{tag}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
