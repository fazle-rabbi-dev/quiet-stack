"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SortKey } from "@/lib/posts";

export function SortSelect({ value }: { value: SortKey }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Select
      value={value}
      onValueChange={(v) => {
        if (!v) return;
        const params = new URLSearchParams();
        if (v !== "newest") params.set("sort", v);
        const qs = params.toString();
        const base = pathname ?? "/";
        router.push(qs ? `${base}?${qs}` : base);
      }}
    >
      <SelectTrigger
        aria-label="Sort stories"
        className="h-9 w-36 rounded-xl dark:border-white/10 dark:bg-black/40"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest first</SelectItem>
        <SelectItem value="oldest">Oldest first</SelectItem>
        <SelectItem value="liked">Most liked</SelectItem>
      </SelectContent>
    </Select>
  );
}
