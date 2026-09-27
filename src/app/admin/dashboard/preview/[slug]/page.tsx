import { notFound } from "next/navigation";

import { BackButton } from "@/components/public/blog/back-button";
import { BlogContent } from "@/components/public/blog/blog-content";
import { BlogCover } from "@/components/public/blog/blog-cover";
import { BlogHeader } from "@/components/public/blog/blog-header";
import { getAdminPostBySlug } from "@/lib/posts";
import { countWords, formatDate } from "@/lib/utils";
import { connection } from "next/server";

type PreviewPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DraftPreviewPage({ params }: PreviewPageProps) {
  const { slug } = await params;
  const { success, data: post } = await getAdminPostBySlug(slug);

  if (!success || !post) notFound();

  return (
    <main className="pb-16">
      <div className="max-body pt-6">
        <div className="flex items-center gap-3">
          <BackButton />
          <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-500">
            Draft preview
          </span>
        </div>

        <article className="mt-4 overflow-hidden rounded-3xl">
          <BlogCover
            title={post.title}
            cover={post.cover}
            coverText={post.coverText}
            primaryTag={post.tags[0] ?? "general"}
          />

          <div className="py-8">
            <BlogHeader
              title={post.title}
              excerpt={post.excerpt}
              tags={post.tags}
              date={formatDate(post.createdAt)}
              readingTime={post.readingTime}
              words={countWords(post.content)}
              likes={post.likes}
            />

            <BlogContent content={post.content} />
          </div>
        </article>
      </div>
    </main>
  );
}
