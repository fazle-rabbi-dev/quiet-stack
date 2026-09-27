"use client";

import Link from "next/link";
import { useState } from "react";

import { LayoutDashboard, Menu, PenLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/constants/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon-lg"
            aria-label="Open menu"
            className="rounded-xl md:hidden"
          />
        }
      >
        <Menu className="size-4" />
      </SheetTrigger>

      <SheetContent side="right" className="w-72">
        <SheetTitle className="sr-only">Menu</SheetTitle>

        <nav
          aria-label="Mobile"
          className="mt-12 flex flex-1 flex-col gap-1 px-4"
        >
          <p className="px-3 text-2xl font-bold text-primary">Menu</p>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}

          {/* Bottom admin actions */}
          <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4 pb-2">
            <Link
              href="/admin/dashboard/new-post"
              onClick={() => setOpen(false)}
              className="btn-primary justify-center rounded-xl px-4 py-2.5"
            >
              <PenLine className="size-4" />
              Write
            </Link>
            <Link
              href="/admin/dashboard"
              onClick={() => setOpen(false)}
              className="flex-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
