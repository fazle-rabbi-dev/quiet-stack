import { PostCard } from "@/components/public/home/post-card";
import type { IPost } from "@/models/post.model";

type StoriesGridProps = {
  success: boolean;
  posts: IPost[];
};

export function StoriesGrid({ success, posts }: StoriesGridProps) {
  if (!success || posts.length === 0) {
    return (
      <p className="mt-5 rounded-2xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground dark:border-white/10 dark:text-white/50">
        No stories found. Try a different sort or tag.
      </p>
    );
  }

  return (
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
  );
}