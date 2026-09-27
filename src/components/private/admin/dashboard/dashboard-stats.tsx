import { EyeOff, FileText, Globe, Heart } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getDashboardStats } from "@/lib/posts";
import { connection } from "next/server";

const CARDS = [
  { key: "total", label: "Total posts", icon: FileText },
  { key: "published", label: "Published", icon: Globe },
  { key: "drafts", label: "Drafts", icon: EyeOff },
  { key: "likes", label: "Total likes", icon: Heart },
] as const;

export async function DashboardStats() {
  await connection();
  const { data: stats } = await getDashboardStats();

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {CARDS.map(({ key, label, icon: Icon }) => (
        <Card key={key} className="rounded-2xl">
          <CardContent className="flex-center gap-3">
            <span className="flex-center size-10 justify-center rounded-xl bg-muted">
              <Icon className="size-5 text-primary" />
            </span>
            <span>
              <span className="heading-4 block leading-none">{stats[key]}</span>
              <span className="text-sm text-muted-foreground">{label}</span>
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
