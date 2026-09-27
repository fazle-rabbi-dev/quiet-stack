import Link from "next/link";

import { Feather, PenLine, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/shared/mobile-nav";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { NAV_LINKS } from "@/constants/site";
import AuthActionButtons from "./auth-action-buttons";
import { Suspense } from "react";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-body flex-center h-16 justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Inkwell home"
          className="flex-center gap-2.5"
        >
          <span className="primary-gradient flex-center size-8 justify-center rounded-2xl">
            <Feather className="size-5 text-white" />
          </span>
          <span className="text-xl font-bold tracking-tight">QuietStack</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="flex-center hidden gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex-center gap-2">
          <ThemeToggle />
          <Suspense fallback={<span>...</span>}>
            <AuthActionButtons />
          </Suspense>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
