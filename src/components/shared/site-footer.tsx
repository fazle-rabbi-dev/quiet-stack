import Link from "next/link";
import { AtSign, Feather, Globe, Mail, Rss } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { NewsletterForm } from "./newsletter-form";
import { cn } from "cn";
import { getPublishedCount } from "@/lib/posts";
import CopyRight from "./copy-right";

const EXPLORE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#latest", label: "Latest posts" },
  { href: "/#posts", label: "All stories" },
  { href: "/#write", label: "Write a story" },
  { href: "/admin/dashboard", label: "Admin dashboard" },
];

const TOPIC_LINKS = [
  "#design",
  "#minimalism",
  "#ux",
  "#engineering",
  "#offline",
];

const RESOURCE_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#manifesto", label: "Manifesto" },
  { href: "/#privacy", label: "Privacy · no tracking" },
  { href: "/rss.xml", label: "RSS feed" },
  { href: "/#contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://github.com", label: "GitHub", Icon: Globe },
  { href: "https://x.com", label: "Twitter", Icon: AtSign },
  { href: "/rss.xml", label: "RSS feed", Icon: Rss },
  { href: "/#contact", label: "Email", Icon: Mail },
];

export async function SiteFooter() {
  const { success, data: postCount } = await getPublishedCount();

  return (
    <footer className="mt-16 border-t border-border bg-background/80 dark:border-white/10">
      <div className="max-body pt-10 pb-6 md:pt-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="Inkwell home"
              className="flex-center gap-2.5"
            >
              <span className="primary-gradient flex-center size-9 justify-center rounded-2xl">
                <Feather className="size-5 text-white" />
              </span>
              <span className="text-xl font-bold tracking-tight text-foreground dark:text-white">
                Inkwell
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground dark:text-white/60">
              A calm corner of the internet. Minimal design, maximal signal.
              Built to share ideas, not to sell them.
            </p>
            <div className="mt-5 flex gap-2.5">
              {SOCIALS.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "size-10 rounded-xl dark:border-white/10 dark:bg-transparent dark:text-white/70 dark:hover:border-white/20 dark:hover:text-white"
                  )}
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase dark:text-white/50">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground dark:text-white/70 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Topics */}
          <nav aria-label="Topics">
            <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase dark:text-white/50">
              Topics
            </h2>
            <ul className="mt-4 space-y-3">
              {TOPIC_LINKS.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/tag/${tag.slice(1)}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground dark:text-white/70 dark:hover:text-white"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <div>
            <nav aria-label="Resources">
              <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase dark:text-white/50">
                Resources
              </h2>
              <ul className="mt-4 space-y-3">
                {RESOURCE_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground dark:text-white/70 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:text-white/50">
          <CopyRight />

          <p className="flex-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            All systems calm · {postCount} posts live
          </p>
        </div>
      </div>
    </footer>
  );
}
