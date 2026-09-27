import type { SortKey } from "@/lib/posts";

export function pageHref(n: number, sort: SortKey) {
  const qs = sort !== "newest" ? `?sort=${sort}` : "";
  return n === 1 ? `/${qs}` : `/page/${n}${qs}`;
}

// Windowed page list: always 1 + last, plus current ± 1.
// Ellipsis only where a gap exists, so it shifts with the current page.
export function getPageItems(
  page: number,
  totalPages: number
): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const keep = new Set([1, totalPages, page - 1, page, page + 1]);
  const nums = [...keep]
    .filter((n) => n >= 1 && n <= totalPages)
    .sort((a, b) => a - b);
  const items: (number | "...")[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] - nums[i - 1] > 1) items.push("...");
    items.push(nums[i]);
  }
  return items;
}
