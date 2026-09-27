"use client";

import { PostForm } from "@/components/private/admin/dashboard/post-form/post-form";

export default function NewPostPage() {
  return (
    <main className="max-body space-y-6 py-8">
      <div className="relative grid gap-8 lg:grid-cols-1">
        <section className="space-y-6">
          <div>
            <h1 className="heading-1">Create New Post</h1>
            <p className="mt-2 text-muted-foreground">
              Fill in the details below to create a new blog post.
            </p>
          </div>

          <PostForm parent="create-post" />
        </section>
      </div>
    </main>
  );
}
