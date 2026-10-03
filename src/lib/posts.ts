"server only";

import { type IPost, Post } from "@/models/post.model";
import { connectDB } from "@/lib/db";
import { logger } from "@/lib/logger";
import { getAuthUser } from "@/lib/actions/auth.action";
import { cacheLife, cacheTag } from "next/cache";

// Public pages only ever see published posts. Drafts stay in admin.
const PUBLISHED = { status: "published" } as const;

export async function getPosts() {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");

  try {
    const conn = await connectDB();
    const posts = await Post.find(PUBLISHED)
      .sort({ createdAt: -1, _id: -1 })
      .lean();
    const plainPosts = JSON.parse(JSON.stringify(posts)) as IPost[];

    return plainPosts;
    // return { success: true, data: plainPosts };
  } catch (error) {
    logger.error("Error fetching posts:", error);
    return null;
  }
}

export async function getPostBySlug(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("posts", `post-${slug}`);

  try {
    await connectDB();
    console.log("===========DB HIT", slug);
    const post = await Post.findOne({ slug, status: "published" }).lean();
    console.log("=========== post fetched", post);
    if (!post) return null;
    const plainPost = JSON.parse(JSON.stringify(post)) as IPost;

    return plainPost;
  } catch (error) {
    logger.error("Error fetching post by slug:", error);
    return null;
  }
}

export async function getPublishedCount() {
  "use cache";
  cacheLife("days");
  cacheTag("posts", "posts-count");

  try {
    await connectDB();
    const count = await Post.countDocuments(PUBLISHED);
    return { success: true, data: count };
  } catch (error) {
    logger.error("Error fetching published count:", error);
    return { success: false, data: 0 };
  }
}

export async function getFeaturedPosts() {
  "use cache";
  cacheLife("hours");
  cacheTag("posts", "featured-posts");

  try {
    await connectDB();
    console.log("===========DB HIT");
    const posts = await Post.find({ featured: true, status: "published" })
      .sort({ createdAt: -1, _id: -1 })
      .lean();
    console.log("=========== featured posts fetched", posts.length);
    const plainPosts = JSON.parse(JSON.stringify(posts)) as IPost[];

    return { success: true, data: plainPosts };
  } catch (error) {
    logger.error("Error fetching featured posts:", error);
    return { success: false, data: [] };
  }
}

export async function getLatestPosts(limit = 3) {
  "use cache";
  cacheLife("hours");
  cacheTag("posts", "latest-posts");

  try {
    await connectDB();
    const posts = await Post.find(PUBLISHED)
      .sort({ createdAt: -1, _id: -1 })
      .limit(limit)
      .lean();
    const plainPosts = JSON.parse(JSON.stringify(posts)) as IPost[];

    return { success: true, data: plainPosts };
  } catch (error) {
    logger.error("Error fetching latest posts:", error);
    return { success: false, data: [] };
  }
}

export type TagWithCount = { tag: string; count: number };

export async function getAllTags() {
  "use cache";
  cacheLife("hours");
  cacheTag("posts", "tags");

  try {
    await connectDB();
    const result = await Post.aggregate<{ _id: string; count: number }>([
      { $match: { status: "published" } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    const tags: TagWithCount[] = result.map((t) => ({
      tag: t._id,
      count: t.count,
    }));

    return { success: true, data: tags };
  } catch (error) {
    logger.error("Error fetching tags:", error);
    return { success: false, data: [] as TagWithCount[] };
  }
}

export type SortKey = "newest" | "oldest" | "liked";

export const PAGE_SIZE = 6;

const SORT_MAP: Record<SortKey, Record<string, 1 | -1>> = {
  newest: { createdAt: -1, _id: -1 },
  oldest: { createdAt: 1, _id: 1 },
  liked: { likes: -1, _id: -1 },
};

export async function getPaginatedPosts(
  page: number,
  sort: SortKey = "newest"
) {
  "use cache";
  cacheLife("hours");
  cacheTag("posts", `page-${page}`, `sort-${sort}`);

  try {
    await connectDB();
    const safePage = Math.max(1, Math.floor(page));
    const total = await Post.countDocuments(PUBLISHED);
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const posts = await Post.find(PUBLISHED)
      .sort(SORT_MAP[sort])
      .skip((safePage - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean();
    const plainPosts = JSON.parse(JSON.stringify(posts)) as IPost[];

    return {
      success: true,
      data: plainPosts,
      total,
      totalPages,
      page: safePage,
    };
  } catch (error) {
    logger.error("Error fetching paginated posts:", error);
    return {
      success: false,
      data: [] as IPost[],
      total: 0,
      totalPages: 1,
      page,
    };
  }
}

// ---------------------------------------------------------------------------
// Admin reads: no "use cache", always fresh. Mutations live in
// src/lib/actions/post.action.ts.
// ---------------------------------------------------------------------------

export const ADMIN_PAGE_SIZE = 20;

export async function getAdminPostBySlug(slug: string) {
  if (!(await getAuthUser())) {
    return { success: false, data: null };
  }
  try {
    await connectDB();
    const post = await Post.findOne({ slug }).lean();
    if (!post) return { success: false, data: null };
    const plainPost = JSON.parse(JSON.stringify(post)) as IPost;

    return { success: true, data: plainPost };
  } catch (error) {
    logger.error("Error fetching admin post by slug:", error);
    return { success: false, data: null };
  }
}

export async function getAdminPosts(
  page: number,
  sort: SortKey = "newest",
  limit = ADMIN_PAGE_SIZE
) {
  if (!(await getAuthUser())) {
    return {
      success: false,
      data: [] as IPost[],
      total: 0,
      totalPages: 1,
      page,
    };
  }
  try {
    await connectDB();
    const safePage = Math.max(1, Math.floor(page));
    const total = await Post.countDocuments({});
    const totalPages = Math.max(1, Math.ceil(total / limit));

    const posts = await Post.find({})
      .sort(SORT_MAP[sort])
      .skip((safePage - 1) * limit)
      .limit(limit)
      .lean();
    const plainPosts = JSON.parse(JSON.stringify(posts)) as IPost[];

    return {
      success: true,
      data: plainPosts,
      total,
      totalPages,
      page: safePage,
    };
  } catch (error) {
    logger.error("Error fetching admin posts:", error);
    return {
      success: false,
      data: [] as IPost[],
      total: 0,
      totalPages: 1,
      page,
    };
  }
}

export async function getDashboardStats() {
  if (!(await getAuthUser())) {
    return {
      success: false,
      data: { total: 0, published: 0, drafts: 0, likes: 0 },
    };
  }
  try {
    await connectDB();
    const [total, published, drafts, likesAgg] = await Promise.all([
      Post.countDocuments({}),
      Post.countDocuments({ status: "published" }),
      Post.countDocuments({ status: "draft" }),
      Post.aggregate<{ total: number }>([
        { $group: { _id: null, total: { $sum: "$likes" } } },
      ]),
    ]);

    return {
      success: true,
      data: {
        total,
        published,
        drafts,
        likes: likesAgg[0]?.total ?? 0,
      },
    };
  } catch (error) {
    logger.error("Error fetching dashboard stats:", error);
    return {
      success: false,
      data: { total: 0, published: 0, drafts: 0, likes: 0 },
    };
  }
}

export async function getPostsByTag(tag: string, page: number) {
  "use cache";
  cacheLife("hours");
  cacheTag("posts", `tag-${tag}`, `tag-page-${page}`);

  try {
    await connectDB();
    const filter = { status: "published", tags: tag } as const;
    const safePage = Math.max(1, Math.floor(page));
    const total = await Post.countDocuments(filter);
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const posts = await Post.find(filter)
      .sort({ createdAt: -1, _id: -1 })
      .skip((safePage - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean();
    const plainPosts = JSON.parse(JSON.stringify(posts)) as IPost[];

    return {
      success: true,
      data: plainPosts,
      total,
      totalPages,
      page: safePage,
    };
  } catch (error) {
    logger.error("Error fetching posts by tag:", error);
    return {
      success: false,
      data: [] as IPost[],
      total: 0,
      totalPages: 1,
      page,
    };
  }
}

// Uncached full-text search: fresh on every request, no "use cache".
export async function searchPosts(query: string, page: number) {
  try {
    await connectDB();
    const q = query.trim();
    if (!q) {
      return {
        success: true,
        data: [] as IPost[],
        total: 0,
        totalPages: 1,
        page: 1,
      };
    }
    const filter = { status: "published" as const, $text: { $search: q } };
    const safePage = Math.max(1, Math.floor(page));
    const total = await Post.countDocuments(filter);
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const posts = await Post.find(filter, { score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } })
      .skip((safePage - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean();
    const plainPosts = JSON.parse(JSON.stringify(posts)) as IPost[];

    return {
      success: true,
      data: plainPosts,
      total,
      totalPages,
      page: safePage,
    };
  } catch (error) {
    logger.error("Error searching posts:", error);
    return {
      success: false,
      data: [] as IPost[],
      total: 0,
      totalPages: 1,
      page,
    };
  }
}
