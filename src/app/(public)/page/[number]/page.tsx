// page is displayed as PPR on build logs
// but the page content does contains the header + footer
// the stories/blogs will rendered on the server on demand, but get posts from cache since getPost function using caching

import { Suspense } from "react";
import { redirect } from "next/navigation";

import { AllStories } from "@/components/public/blog-list/all-stories";
import { TagsSection } from "@/components/public/blog-list/tags-section";

type PageProps = {
  params: Promise<{ number: string }>;
  searchParams: Promise<{ sort?: string }>;
};

// Sync wrapper: no runtime access here, so prerender is not blocked.
export default function PagedStories({ params, searchParams }: PageProps) {
  return (
    <main className="pb-16">
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
        <PagedContent params={params} searchParams={searchParams} />
      </Suspense>
      <TagsSection />
    </main>
  );
}

// Async child inside Suspense: params awaited here, covered by the boundary.
async function PagedContent({ params, searchParams }: PageProps) {
  const { number } = await params;

  const page = Number(number);
  if (!Number.isInteger(page) || page <= 1) redirect("/");

  return <AllStories page={page} searchParams={searchParams} />;
}
