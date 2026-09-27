import { Suspense } from "react";
import type { Metadata } from "next";

import { AllStories } from "@/components/public/blog-list/all-stories";
import { FeaturedPosts } from "@/components/public/home/featured-posts";
import { HeroSection } from "@/components/public/home/hero-section";
import { LatestPosts } from "@/components/public/home/latest-posts";
import { TagsSection } from "@/components/public/blog-list/tags-section";
import { SITE_URL } from "@/constants/site";

export const metadata: Metadata = {
  title: "QuietStack | Tech Tutorials, Programming & Life Essays",
  description:
    "QuietStack is a minimal blog covering everything tech - programming, web development, tools and gadgets - plus essays on life, focus and calm living.",
};

type HomeProps = {
  searchParams: Promise<{ sort?: string }>;
};

// Sync wrapper: searchParams promise only forwarded, never awaited here.
export default function HomePage({ searchParams }: HomeProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "QuietStack",
    url: SITE_URL,
    description:
      "QuietStack is a minimal blog covering everything tech plus essays on life, focus and calm living.",
  };

  return (
    <main className="pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <FeaturedPosts />
      <LatestPosts />
      <Suspense
        fallback={
          <div className="max-body mt-12" aria-label="Loading stories">
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 dark:border-white/10 dark:bg-[#121218]">
              <p className="text-sm text-muted-foreground">
                Loading stories...
              </p>
            </div>
          </div>
        }
      >
        <AllStories page={1} searchParams={searchParams} />
      </Suspense>
      <TagsSection />
    </main>
  );
}
