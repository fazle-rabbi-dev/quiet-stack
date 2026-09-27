import { SortSelect } from "@/components/public/blog-list/sort-select";
import { StoriesPagination } from "@/components/public/blog-list/stories-pagination";
import {
  ADMIN_PAGE_SIZE,
  getAdminPosts,
  type SortKey,
} from "@/lib/posts";
import { PostsTable, type DashboardPost } from "./posts-table";

const VALID_SORTS: SortKey[] = ["newest", "oldest", "liked"];

type DashboardPostsProps = {
  searchParams?: Promise<{ page?: string; sort?: string }>;
};

export async function DashboardPosts({ searchParams }: DashboardPostsProps) {
  const params = (await searchParams) ?? {};
  const page = Math.max(1, Math.floor(Number(params.page)) || 1);
  const sort: SortKey = VALID_SORTS.includes(params.sort as SortKey)
    ? (params.sort as SortKey)
    : "newest";

  const { data: posts, total, totalPages } = await getAdminPosts(
    page,
    sort,
    ADMIN_PAGE_SIZE
  );

  const tablePosts: DashboardPost[] = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    tags: post.tags,
    date: new Date(post.createdAt).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    likes: post.likes,
    status: post.status,
    featured: post.featured,
  }));

  const hrefFor = (n: number) => {
    const qs = new URLSearchParams();
    if (n !== 1) qs.set("page", String(n));
    if (sort !== "newest") qs.set("sort", sort);
    const q = qs.toString();
    return q ? `/admin/dashboard?${q}` : "/admin/dashboard";
  };

  return (
    <div className="space-y-0">
      <div className="mb-4 flex items-center justify-end">
        <SortSelect value={sort} />
      </div>

      <PostsTable posts={tablePosts} />

      <StoriesPagination
        page={page}
        totalPages={totalPages}
        total={total}
        sort={sort}
        hrefFor={hrefFor}
      />
    </div>
  );
}
