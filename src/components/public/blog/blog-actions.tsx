"use client";

import { Copy, Expand, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { copyText } from "@/lib/utils";
import { BlogLikeButton } from "./blog-like-button";

type BlogActionsProps = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  likes: number;
};

export function BlogActions({
  slug,
  title,
  excerpt,
  content,
  likes,
}: BlogActionsProps) {

  async function copyMarkdown() {
    const ok = await copyText(content);
    toast.add(
      ok ? { title: "Markdown copied", type: "success" } : { title: "Copy failed", type: "error" }
    );
  }

  function fullScreen() {
    const el = document.getElementById("blog-article");
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void el?.requestFullscreen().catch(() => {
        toast.add({ title: "Fullscreen not supported", type: "error" });
      });
    }
  }

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text: excerpt, url });
      } catch {
        // user dismissed, ignore
      }
      return;
    }

    const ok = await copyText(url);
    toast.add(
      ok ? { title: "Link copied", type: "success" } : { title: "Share failed", type: "error" }
    );
  }

  return (
    <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-border pt-6 dark:border-white/10">
      <BlogLikeButton slug={slug} initialLikes={likes} />

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={fullScreen}
        className="rounded-xl"
      >
        <Expand className="size-4" />
        Full screen
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={copyMarkdown}
        className="rounded-xl"
      >
        <Copy className="size-4" />
        Copy markdown
      </Button>

      <Button
        type="button"
        size="sm"
        onClick={share}
        className="btn-primary rounded-xl"
      >
        <Share2 className="size-4" />
        Share
      </Button>
    </div>
  );
}
