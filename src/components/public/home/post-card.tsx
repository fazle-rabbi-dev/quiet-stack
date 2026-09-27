import Link from "next/link";
import { Calendar, Heart } from "lucide-react";
import { cn } from "cn";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { COVER_STYLES } from "@/components/public/post-cover-styles";
import type { PostCard } from "@/types/post";

type PostCardProps = {
  post: PostCard;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="gap-0 overflow-hidden rounded-3xl border-border py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#15151d]">
      {/* Cover */}
      <Link
        href={`/blog/${post.slug}`}
        aria-label={post.title}
        className={cn(
          "relative block h-44 overflow-hidden sm:h-48",
          COVER_STYLES[post.cover]
        )}
      >
        {/* dot-grid pattern on top of a gradient background */}
        <div
          aria-hidden
          className="absolute inset-0 [background-image:radial-gradient(rgb(255_255_255/0.28)_1px,transparent_1.4px)] [background-size:18px_18px] opacity-70"
        />

        <div className="absolute top-10 w-full px-3 py-1 font-semibold text-black">
          <h3 className="heading-3 text-center italic">
            {post.coverText || post.title}
          </h3>
        </div>

        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {post.tag} · {post.readingTime}
        </span>
      </Link>

      {/* Body */}
      <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex-center gap-2 text-xs text-muted-foreground dark:text-white/50">
          <Calendar className="size-3.5" />
          <span>{post.date}</span>
          <span aria-hidden>·</span>
          <Heart className="size-3.5" />
          <span>{post.likes}</span>
        </p>

        <h3 className="mt-3 text-lg leading-snug font-bold text-foreground dark:text-white">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground dark:text-white/60">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-end justify-between gap-3 pt-1">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                render={
                  <Link
                    href={`/tag/${tag}`}
                    aria-label={`Posts tagged ${tag}`}
                  />
                }
                className="rounded-full px-3 py-1 text-xs font-normal text-muted-foreground dark:border-white/10 dark:bg-transparent dark:text-white/60"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
