import type { Metadata } from "next";

import { SearchResults } from "@/components/public/search/search-results";

type SearchPageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Pick<SearchPageProps, "searchParams">): Promise<Metadata> {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  if (!query) {
    return {
      title: "Search posts",
      description: "Search blog posts by keywords.",
    };
  }

  return {
    title: `Search results for "${query}"`,
    description: `Blog posts matching "${query}".`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page: pageParam } = await searchParams;
  const query = (q ?? "").trim();
  const page = Math.max(1, Math.floor(Number(pageParam)) || 1);

  return (
    <main className="pb-16">
      {query ? (
        <SearchResults query={query} page={page} />
      ) : (
        <section aria-label="Search" className="max-body mt-8">
          <h1 className="heading-2 text-foreground">Search posts</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Type keywords in the search box on home page to find stories.
          </p>
        </section>
      )}
    </main>
  );
}
