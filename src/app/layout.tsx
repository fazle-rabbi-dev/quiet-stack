import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { SiteHeader } from "@/components/shared/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";
import { ScrollProgress } from "@/components/public/blog/scroll-progress";
import { Suspense } from "react";
import { NEXT_PUBLIC_SITE_URL } from "@/lib/env";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(NEXT_PUBLIC_SITE_URL),
  applicationName: "QuietStack",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Fazle Rabbi",
    "fazle rabbi dev",
    "fazlerabbidev",
    "quietstack",
    "quietstack blog",
    "blog",
    "nextjs blog",
  ],
  authors: [
    { name: "Fazle Rabbi", url: "https://fazle-rabbi-dev.vercel.app/" },
  ],
  creator: "Fazle Rabbi",
  title: {
    default: "QuietStack | Tech Tutorials, Programming & Life Essays",
    template: "%s | QuietStack",
  },
  description:
    "QuietStack is a minimal blog covering everything tech plus essays on life, focus and calm living.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <head>
        <meta
          name="google-site-verification"
          content="bBOJ8YhTLw-vz1qayvGCHKw3GnTLPoQ4RWRodFvBqI4"
        />
      </head>
      <body>
        <ThemeProvider>
          <ScrollProgress />
          <SiteHeader />
          <div className="pt-16">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
