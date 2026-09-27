import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin | QuietStack",
    template: "%s | QuietStack",
  },
  description:
    "Manage QuietStack stories: write, publish, edit and delete posts.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
