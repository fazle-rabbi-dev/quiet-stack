import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { DeleteConfirmForm } from "@/components/private/admin/dashboard/delete-post/delete-confirm-form";
import { getAdminPostBySlug } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Delete Post",
  description: "Delete a blog post",
};

type DeletePostPageProps = {
  searchParams: Promise<{ slug?: string }>;
};

export default async function DeletePostPage({
  searchParams,
}: DeletePostPageProps) {
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

  return (
    <main className="max-body space-y-6 py-8">
      <section className="space-y-6">
        <div>
          <h1 className="heading-1">Delete post</h1>
          <p className="mt-2 text-muted-foreground">
            Confirm permanent deletion below.
          </p>
        </div>

        <DeleteConfirmForm slug={post.slug ?? slug} title={post.title} />
      </section>
    </main>
  );
}
