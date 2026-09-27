"use server";

import { connectDB } from "@/lib/db";
import { logger } from "@/lib/logger";
import { Like, Post } from "@/models/post.model";
import { updateTag } from "next/cache";

// Anonymous likes: no admin auth, one Like doc per (post, fingerprint).

export async function getLikeState(slug: string, fingerprint: string) {
  try {
    if (!fingerprint) return { success: false, liked: false, likes: 0 };
    await connectDB();
    const post = await Post.findOne({ slug }).select("_id likes").lean();
    if (!post) return { success: false, liked: false, likes: 0 };
    const liked = !!(await Like.exists({ post: post._id, fingerprint }));

    return { success: true, liked, likes: post.likes ?? 0 };
  } catch (error) {
    logger.error("Error fetching like state:", error);
    return { success: false, liked: false, likes: 0 };
  }
}

export async function toggleLike(slug: string, fingerprint: string) {
  try {
    if (!fingerprint) return { success: false, liked: false, likes: 0 };
    await connectDB();
    const post = await Post.findOne({ slug }).select("_id likes");
    if (!post) return { success: false, liked: false, likes: 0 };

    const existing = await Like.findOne({ post: post._id, fingerprint });

    if (existing) {
      await Like.deleteOne({ _id: existing._id });
      post.likes = Math.max(0, (post.likes ?? 0) - 1);
      await post.save();
      updateTag(`post-${slug}`);
      return { success: true, liked: false, likes: post.likes };
    }

    try {
      await Like.create({ post: post._id, fingerprint });
    } catch {
      // Lost a double-click race, treat as already liked
      const liked = !!(await Like.exists({ post: post._id, fingerprint }));
      const fresh = await Post.findById(post._id).select("likes").lean();
      updateTag(`post-${slug}`);
      return { success: true, liked, likes: fresh?.likes ?? 0 };
    }
    post.likes = (post.likes ?? 0) + 1;
    await post.save();
    updateTag(`post-${slug}`);
    return { success: true, liked: true, likes: post.likes };
  } catch (error) {
    logger.error("Error toggling like:", error);
    return { success: false, liked: false, likes: 0 };
  }
}
