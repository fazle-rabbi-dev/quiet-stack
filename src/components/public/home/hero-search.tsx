"use client";

import { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import Form from "next/form";

import { Input } from "@/components/ui/input";

export function HeroSearch() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing =
        target.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);

      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Form action="/search" className="relative w-full">
      <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground dark:text-white/40" />
      <Input
        ref={inputRef}
        name="q"
        type="search"
        placeholder="Search posts, tags, ideas...  ( / to focus )"
        aria-label="Search posts"
        className="h-13 rounded-2xl pr-4 pl-11 dark:border-white/10 dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 dark:focus-visible:border-white/20 dark:focus-visible:ring-purple-500/40"
      />
    </Form>
  );
}
