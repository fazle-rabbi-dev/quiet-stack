"use server";

import { updateTag } from "next/cache";

import { type IPost, Post } from "@/models/post.model";
import { connectDB } from "@/lib/db";
import { logger } from "@/lib/logger";
import { getAuthUser } from "@/lib/actions/auth.action";

async function requireAdmin() {
  const authed = await getAuthUser();
  return authed;
}

export async function createPost(post: Partial<IPost>) {
  if (!(await requireAdmin())) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();

    const createdPost = await Post.create(post);
    updateTag("posts");
    return { success: true, data: JSON.parse(JSON.stringify(createdPost)) };
  } catch (error) {
    logger.error("Error creating post:", error);
    return { success: false, error: "Error creating post" };
  }
}

export async function updatePost(post: Partial<IPost>) {
  if (!(await requireAdmin())) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();

    // Strip immutable/system fields, keep slug as the identifier
    const { slug, _id, createdAt, updatedAt, __v, ...rest } =
      post as Partial<IPost> & {
        _id?: unknown;
        createdAt?: unknown;
        updatedAt?: unknown;
        __v?: unknown;
      };
    const updatedPost = await Post.updateOne({ slug }, { $set: rest });
    updateTag("posts");

    return { success: true, data: JSON.parse(JSON.stringify(updatedPost)) };
  } catch (error) {
    logger.error("Error updating post:", error);
    return { success: false, error: "Error updating post" };
  }
}

export async function deletePost(slug: string) {
  if (!(await requireAdmin())) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await connectDB();
    const deletedPost = await Post.deleteOne({ slug });
    updateTag("posts");

    return { success: true, data: JSON.parse(JSON.stringify(deletedPost)) };
  } catch (error) {
    logger.error("Error deleting post:", error);
    return { success: false, error: "Error deleting post" };
  }
}
