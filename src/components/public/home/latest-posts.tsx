import { Clock } from "lucide-react";

import { getLatestPosts } from "@/lib/posts";
import { PostCard } from "./post-card";

export async function LatestPosts() {
  const { success, data: posts } = await getLatestPosts();

  if (!success || posts.length === 0) return null;
  return (
    <section
      aria-label="Latest posts"
      id="latest"
      className="max-body mt-12 scroll-mt-20"
    >
      <div className="flex-center justify-between">
        <h2 className="heading-2 flex-center gap-2 font-extrabold tracking-tight text-foreground dark:text-white">
          <Clock className="size-6 text-violet-500" />
          Latest
        </h2>
        <p className="text-sm text-muted-foreground dark:text-white/50">
          Fresh drops
        </p>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            post={{
              slug: post.slug,
              title: post.title,
              excerpt: post.excerpt,
              tag: post.tags[0] ?? "general",
              tags: post.tags,
              date: new Date(post.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
              likes: post.likes,
              readingTime: `${post.readingTime} min`,
              cover: post.cover,
              coverText: post.coverText ?? "",
              liked: false,
            }}
          />
        ))}
      </div>
    </section>
  );
}