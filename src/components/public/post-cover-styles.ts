import { cn } from "cn";

import type { PostCover } from "@/types/post";

export const COVER_STYLES: Record<PostCover, string> = {
  violet: "bg-linear-to-br from-violet-600 via-indigo-500 to-sky-400",
  blue: "bg-linear-to-br from-sky-500 via-blue-500 to-indigo-600",
  green: "bg-linear-to-br from-emerald-500 via-green-500 to-lime-400",
  pink: "bg-linear-to-br from-purple-500 via-fuchsia-500 to-pink-500",
  indigo: "bg-linear-to-br from-indigo-600 via-blue-600 to-violet-500",
  orange: "bg-linear-to-br from-rose-500 via-orange-500 to-amber-400",
};

export function coverClass(cover: string) {
  return cn(
    COVER_STYLES[(cover as PostCover) ?? "violet"] ?? COVER_STYLES.violet
  );
}
