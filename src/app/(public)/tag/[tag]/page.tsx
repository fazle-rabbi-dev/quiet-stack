import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TagPosts } from "@/components/public/tag/tag-posts";

export async function generateMetadata({
  params,
}: Pick<TagPageProps, "params">): Promise<Metadata> {
  const { tag } = await params;

  return {
    title: `Posts tagged #${tag}`,
    description: `Browse all blog posts tagged with #${tag}.`,
  };
}

type TagPageProps = {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { tag } = await params;
  const { page: pageParam } = await searchParams;

  const page = Math.max(1, Math.floor(Number(pageParam)) || 1);

  if (!tag) notFound();

  return (
    <main className="pb-16">
      <TagPosts tag={tag} page={page} />
    </main>
  );
}
