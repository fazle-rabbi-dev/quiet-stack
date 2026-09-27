import { connection, NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { nanoid } from "nanoid";

import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/actions/auth.action";
import { Post } from "@/models/post.model";
import { DUMMY_POSTS } from "@/constants/dummy-posts";

/**
 * POST /admin/api/seed
 * Seeds the database with 10 dummy blog posts.
 * This endpoint should only be used in development.
 */
export async function GET(request: NextRequest) {
  await connection();

  const authed = await getAuthUser();
  if (!authed) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await connectDB();

    // Clear existing posts (optional - comment out if you want to keep existing posts)
    await Post.deleteMany({});

    // Insert dummy posts
    const posts = DUMMY_POSTS.map((p) => ({
      ...p,
      slug: `${slugify(p.title, { lower: true, strict: true })}-${nanoid(6)}`,
    }));

    const createdPosts = await Post.insertMany(posts);

    return NextResponse.json(
      {
        success: true,
        message: `Successfully seeded ${createdPosts.length} blog posts`,
        posts: createdPosts,
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
