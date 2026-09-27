import { redirect } from "next/navigation";
import { Library } from "lucide-react";

import { getAllTags, getPaginatedPosts, type SortKey } from "@/lib/posts";
import { SortSelect } from "./sort-select";
import { StoriesGrid } from "./stories-grid";
import { StoriesPagination } from "./stories-pagination";
import { TagFilters } from "./tag-filters";

const VALID_SORTS: SortKey[] = ["newest", "oldest", "liked"];

type AllStoriesProps = {
  page?: number;
  searchParams?: Promise<{ sort?: string }>;
};

export async function AllStories({ page = 1, searchParams }: AllStoriesProps) {
  const { sort: sortParam } = (await searchParams) ?? {};
  const sort: SortKey = VALID_SORTS.includes(sortParam as SortKey)
    ? (sortParam as SortKey)
    : "newest";

  const [{ success, data: posts, total, totalPages }, tagsRes] =
    await Promise.all([getPaginatedPosts(page, sort), getAllTags()]);

  if (page > totalPages) redirect("/");

  const tags = tagsRes.success ? tagsRes.data : [];

  return (
    <section
      aria-label="All stories"
      id="posts"
      className="max-body mt-12 scroll-mt-20"
    >
      <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 dark:border-white/10 dark:bg-[#121218]">
        {/* Header: title + sort */}
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="heading-2 flex-center gap-2 font-extrabold tracking-tight text-foreground dark:text-white">
            <Library className="size-6 text-violet-500" />
            All stories
          </h2>
          <SortSelect value={sort} />
        </header>

        <TagFilters tags={tags} />

        <StoriesGrid success={success} posts={posts} />

        <StoriesPagination
          page={page}
          totalPages={totalPages}
          total={total}
          sort={sort}
        />
      </div>
    </section>
  );
}
