import { StoriesPagination } from "@/components/public/blog-list/stories-pagination";
import { PostCard } from "@/components/public/home/post-card";
import { getPostsByTag } from "@/lib/posts";

type TagPostsProps = {
  tag: string;
  page: number;
};

export async function TagPosts({ tag, page }: TagPostsProps) {
  const {
    success,
    data: posts,
    total,
    totalPages,
  } = await getPostsByTag(tag, page);

  const hrefFor = (n: number) =>
    n === 1 ? `/tag/${tag}` : `/tag/${tag}?page=${n}`;

  return (
    <section aria-label={`Posts tagged ${tag}`} className="max-body mt-8">
      <h1 className="heading-2 text-foreground">
        Results for tag: <span className="primary-gradient-text">#{tag}</span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {total} {total === 1 ? "post" : "posts"} found
      </p>

      {!success || posts.length === 0 ? (
        <p className="mt-5 rounded-2xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
          No posts found for this tag.
        </p>
      ) : (
        <article className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
        </article>
      )}

      <StoriesPagination
        page={page}
        totalPages={totalPages}
        total={total}
        sort="newest"
        hrefFor={hrefFor}
      />
    </section>
  );
}