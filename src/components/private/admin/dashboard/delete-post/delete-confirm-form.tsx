"use client";

import { useState } from "react";
import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { deletePost } from "@/lib/actions/post.action";

const CONFIRM_PHRASE = "delete post";

type DeleteConfirmFormProps = {
  slug: string;
  title: string;
};

export function DeleteConfirmForm({ slug, title }: DeleteConfirmFormProps) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);

  const matched = value.trim().toLowerCase() === CONFIRM_PHRASE;

  async function action() {
    if (!matched || pending) return;
    setPending(true);

    try {
      const res = await deletePost(slug);
      if (!res.success) {
        toast.add({ title: "Delete failed", type: "error" });
        return;
      }
      toast.add({
        title: "Post deleted",
        description: `"${title}" was removed.`,
        type: "success",
      });
      router.push("/admin/dashboard");
    } catch {
      toast.add({ title: "Delete failed", type: "error" });
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="rounded-2xl">
      <CardContent className="space-y-5 pt-6">
        <p className="text-sm text-muted-foreground">
          This will permanently delete{" "}
          <span className="font-semibold text-foreground">“{title}”</span>. This
          action cannot be undone.
        </p>

        <Form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="confirm">
              Type{" "}
              <span className="font-mono font-semibold">{CONFIRM_PHRASE}</span>{" "}
              to confirm
            </Label>
            <Input
              id="confirm"
              name="confirm"
              placeholder={CONFIRM_PHRASE}
              autoComplete="off"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <div className="flex-center justify-end gap-2">
            <Link
              href="/admin/dashboard"
              className={buttonVariants({ variant: "outline" })}
            >
              Cancel
            </Link>
            <Button
              type="submit"
              variant="destructive"
              disabled={!matched || pending}
            >
              {pending ? "Deleting..." : "Delete post"}
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
