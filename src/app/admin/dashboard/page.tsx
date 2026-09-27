import type { Metadata } from "next";
import { Suspense } from "react";

import { DashboardHeader } from "@/components/private/admin/dashboard/dashboard-header";
import { DashboardPosts } from "@/components/private/admin/dashboard/dashboard-posts";
import { DashboardStats } from "@/components/private/admin/dashboard/dashboard-stats";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage stories - publish, edit, delete.",
};

type DashboardPageProps = {
  searchParams: Promise<{ page?: string; sort?: string }>;
};

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  return (
    <main className="max-body space-y-6 py-8">
      <DashboardHeader />

      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">Loading stats...</p>
        }
      >
        <DashboardStats />
      </Suspense>

      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">Loading posts...</p>
        }
      >
        <DashboardPosts searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
