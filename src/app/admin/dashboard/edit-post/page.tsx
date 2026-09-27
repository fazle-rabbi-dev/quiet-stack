import Link from "next/link";
import { redirect } from "next/navigation";

import {
  PostForm,
  type PostFormData,
} from "@/components/private/admin/dashboard/post-form/post-form";
import { getAdminPostBySlug } from "@/lib/posts";
import { connection } from "next/server";
import { cookies } from "next/headers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Post",
  description: "Edit a blog post",
};

type EditPostPageProps = {
  searchParams: Promise<{ slug?: string }>;
};

export default async function EditPostPage({
  searchParams,
}: EditPostPageProps) {
  const { slug } = await searchParams;

  if (!slug) redirect("/admin/dashboard");

  const { success, data: post } = await getAdminPostBySlug(slug);

  if (!success || !post) {
    return (
      <main className="max-body space-y-6 py-8">
        <p className="text-sm text-destructive">Post not found.</p>
        <Link
          href="/admin/dashboard"
          className="text-sm text-primary underline underline-offset-4"
        >
          Back to dashboard
        </Link>
      </main>
    );
  }

  const initialData: PostFormData = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    cover: post.cover,
    coverText: post.coverText ?? "",
    tags: post.tags,
    status: post.status,
    featured: post.featured,
    readingTime: post.readingTime,
  };

  return (
    <main className="max-body space-y-6 py-8">
      <div className="relative grid gap-8 lg:grid-cols-1">
        <section className="space-y-6">
          <div>
            <h1 className="heading-1">Edit Post</h1>
            <p className="mt-2 text-muted-foreground">
              Update the details below and save your changes.
            </p>
          </div>

          <PostForm parent="edit-post" initialData={initialData} />
        </section>
      </div>
    </main>
  );
}
