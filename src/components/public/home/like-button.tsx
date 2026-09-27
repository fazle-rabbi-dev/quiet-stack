"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "cn"

type LikeButtonProps = {
  initialLikes: number
  initialLiked?: boolean
  title?: string
}

export function LikeButton({
  initialLikes,
  initialLiked = false,
  title = "Like",
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked)

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      title={title}
      aria-label={title}
      aria-pressed={liked}
      onClick={() => setLiked((v) => !v)}
      className={cn(
        "size-10 shrink-0 rounded-xl border-border bg-transparent transition-colors",
        "dark:border-white/10 dark:bg-black/40 dark:hover:border-white/20",
        liked &&
          "border-pink-500/50 bg-pink-500/10 text-pink-500 hover:text-pink-500 dark:border-pink-500/50 dark:bg-pink-500/10 dark:text-pink-500"
      )}
    >
      <Heart className={cn("size-4", liked && "fill-current")} />
      <span className="sr-only">
        {liked ? "Unlike" : "Like"} (
        {initialLikes + (liked && !initialLiked ? 1 : 0)} likes)
      </span>
    </Button>
  )
}
