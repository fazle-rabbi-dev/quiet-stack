import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import type { SortKey } from "@/lib/posts";
import { getPageItems, pageHref } from "./pagination";
import { cn } from "cn";

type StoriesPaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  sort: SortKey;
  hrefFor?: (n: number) => string;
};

const navLinkClass = cn(
  buttonVariants({ variant: "outline", size: "icon" }),
  "size-8 rounded-lg dark:border-white/10 dark:bg-transparent dark:text-white/70 dark:hover:border-white/20"
);

export function StoriesPagination({
  page,
  totalPages,
  total,
  sort,
  hrefFor,
}: StoriesPaginationProps) {
  // hrefFor is required for dashboard pagination because: dashboard using ?page=n while public route using /page/n
  const href = hrefFor ?? ((n: number) => pageHref(n, sort));

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted-foreground dark:text-white/50">
        {total} results · page {page} of {totalPages}
      </p>
      {totalPages > 1 && (
        <nav
          aria-label="Stories pagination"
          className="flex items-center gap-1.5"
        >
          {/* Previous page */}
          {page !== 1 ? (
            <Link
              href={href(page - 1)}
              aria-label="Previous page"
              className={navLinkClass}
            >
              <ChevronLeft className="size-4" />
            </Link>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled
              aria-label="Previous page"
              className="size-8 rounded-lg dark:border-white/10 dark:bg-transparent dark:text-white/70 dark:hover:border-white/20"
            >
              <ChevronLeft className="size-4" />
            </Button>
          )}

          {/* Page numbers */}
          {getPageItems(page, totalPages).map((item, i) =>
            item === "..." ? (
              <span
                key={`ellipsis-${i}`}
                aria-hidden
                className="px-1 text-sm text-muted-foreground dark:text-white/50"
              >
                ...
              </span>
            ) : item !== page ? (
              <Link
                key={item}
                href={href(item)}
                aria-label={`Page ${item}`}
                className={navLinkClass}
              >
                {item}
              </Link>
            ) : (
              <Button
                key={item}
                type="button"
                variant="outline"
                size="icon"
                aria-label={`Page ${item}`}
                aria-current="page"
                className="size-8 rounded-lg border-transparent bg-white text-black hover:bg-white/90 hover:text-black dark:bg-white dark:text-black"
              >
                {item}
              </Button>
            )
          )}

          {/* Next page */}
          {page !== totalPages ? (
            <Link
              href={href(page + 1)}
              aria-label="Next page"
              className={navLinkClass}
            >
              <ChevronRight className="size-4" />
            </Link>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled
              aria-label="Next page"
              className="size-8 rounded-lg dark:border-white/10 dark:bg-transparent dark:text-white/70 dark:hover:border-white/20"
            >
              <ChevronRight className="size-4" />
            </Button>
          )}
        </nav>
      )}
    </div>
  );
}
