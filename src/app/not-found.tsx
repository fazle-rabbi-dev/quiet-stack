import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <main className="max-body flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="flex-center size-14 justify-center rounded-2xl bg-muted dark:bg-black/40">
        <FileQuestion className="size-7 text-muted-foreground dark:text-white/60" />
      </span>
      <h1 className="heading-1 mt-6">404</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground dark:text-white/60">
        This page could not be found. It may have been moved or deleted.
      </p>
      <Link
        href="/"
        className="btn-primary mt-6 rounded-2xl px-6 py-3 text-sm font-semibold"
      >
        Back to home
      </Link>
    </main>
  );
}
