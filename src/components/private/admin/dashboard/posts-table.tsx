"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Heart, Pencil, Search, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type DashboardPost = {
  slug: string;
  title: string;
  tags: string[];
  date: string;
  likes: number;
  status: "published" | "draft";
  featured?: boolean;
};

export function PostsTable({ posts }: { posts: DashboardPost[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Card className="rounded-2xl">
      <CardContent className="space-y-4">
        {/* Filter */}
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter posts..."
            className="h-11 rounded-xl pl-10"
          />
        </div>

        {/* Table - scrolls on small screens */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((post) => (
                <TableRow key={post.slug}>
                  {/* Title + tags */}
                  <TableCell className="min-w-56">
                    <p className="font-semibold">{post.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {post.tags.map((t) => `#${t}`).join(" ")}
                      {post.featured && " · ★ featured"}
                    </p>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        post.status === "published" ? "default" : "secondary"
                      }
                      className={
                        post.status === "published"
                          ? "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/20"
                          : "bg-amber-500/15 text-amber-500 hover:bg-amber-500/20"
                      }
                    >
                      {post.status === "published" ? "PUBLISHED" : "DRAFT"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <span className="flex-center gap-1.5">
                      <Heart className="size-4" />
                      {post.likes}
                    </span>
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {post.date}
                  </TableCell>

                  {/* Row actions */}
                  <TableCell>
                    <div className="flex justify-end gap-1.5">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          router.push(
                            post.status === "draft"
                              ? `/admin/dashboard/preview/${post.slug}`
                              : `/blog/${post.slug}`
                          )
                        }
                        aria-label={`View ${post.title}`}
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          router.push(
                            `/admin/dashboard/edit-post?slug=${post.slug}`
                          )
                        }
                        aria-label={`Edit ${post.title}`}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label={`Delete ${post.title}`}
                        className="text-destructive hover:text-destructive"
                        onClick={() =>
                          router.push(
                            `/admin/dashboard/delete-post?slug=${post.slug}`
                          )
                        }
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No posts match your filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
