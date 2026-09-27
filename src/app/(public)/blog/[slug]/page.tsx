import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BackButton } from "@/components/public/blog/back-button";
import { BlogActions } from "@/components/public/blog/blog-actions";
import { BlogContent } from "@/components/public/blog/blog-content";
import { BlogCover } from "@/components/public/blog/blog-cover";
import { BlogHeader } from "@/components/public/blog/blog-header";
import { getPostBySlug, getPosts } from "@/lib/posts";
import { cacheLife, cacheTag } from "next/cache";
import { countWords, formatDate } from "@/lib/utils";
import { connection } from "next/server";
import { logger } from "@/lib/logger";
import { SITE_URL } from "@/constants/site";

type BlogPageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { success, data: post } = await getPostBySlug(slug);

  if (!success || !post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export async function generateStaticParams() {
  const { success, data: posts } = await getPosts();

  if (!success) return [];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// on dev mode this component get called first than above function get fired
// on build time: the above is triggured and than with each slug the component get fired
export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const { success, data: post } = await getPostBySlug(slug);

  if (!success || !post) notFound();

  const words = countWords(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.createdAt).toISOString(),
    dateModified: new Date(post.updatedAt).toISOString(),
    wordCount: words,
    url: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <main className="pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-body pt-6">
        <BackButton />

        <article id="" className="mx-auto mt-4 overflow-hidden rounded-3xl">
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
              words={words}
              likes={post.likes}
            />

            <BlogContent content={post.content} />

            <BlogActions
              slug={post.slug ?? ""}
              title={post.title}
              excerpt={post.excerpt}
              content={post.content}
              likes={post.likes}
            />
          </div>
        </article>
      </div>
    </main>
  );
}
