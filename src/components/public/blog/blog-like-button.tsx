"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getLikeState, toggleLike } from "@/lib/actions/like.action";
import { cn } from "cn";

type BlogLikeButtonProps = {
  slug: string;
  initialLikes: number;
};

export function BlogLikeButton({ slug, initialLikes }: BlogLikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  // Identify this browser once, then load its like state
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const { default: FingerprintJS } =
          await import("@fingerprintjs/fingerprintjs");
        const fp = await FingerprintJS.load();
        const { visitorId } = await fp.get();
        if (cancelled) return;
        setFingerprint(visitorId);

        const state = await getLikeState(slug, visitorId);
        if (!cancelled && state.success) {
          setLiked(state.liked);
          setLikes(state.likes);
        }
      } catch {
        // Fingerprinting unavailable, button stays local-only
      }
    }

    void init();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  async function onToggle() {
    if (!fingerprint || pending) return;
    setPending(true);

    try {
      const res = await toggleLike(slug, fingerprint);
      if (res.success) {
        setLiked(res.liked);
        setLikes(res.likes);
      } else {
        toast.add({ title: "Like failed", type: "error" });
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-pressed={liked}
      onClick={onToggle}
      disabled={pending}
      className={cn(
        "rounded-xl",
        liked && "border-pink-500/50 text-pink-500 dark:border-pink-500/50"
      )}
    >
      <Heart className={cn("size-4", liked && "fill-current")} />
      {liked ? `Liked · ${likes}` : `Like · ${likes}`}
    </Button>
  );
}
