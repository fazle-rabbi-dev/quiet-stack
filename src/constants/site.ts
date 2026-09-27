export const SITE_NAME = "Inkwell"

// Set NEXT_PUBLIC_SITE_URL in .env to your production domain.
// Used for sitemap.xml and JSON-LD canonical URLs.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"

export const WRITE_HREF = "/write"

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#featured", label: "Featured" },
  { href: "/#latest", label: "Latest" },
  { href: "/#posts", label: "All posts" },
] as const

export const HERO_TAGS = [
  "#design",
  "#minimalism",
  "#ux",
  "#engineering",
  "#offline",
  "#javascript",
] as const
