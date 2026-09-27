"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import "@uiw/react-md-editor/markdown-editor.css";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { PostCover } from "@/types/post";
import {
  POST_COVERS,
  POST_STATUSES,
  type PostFormData,
  type PostFormParent,
  type PostStatus,
} from "./post-form-types";
import { usePostForm } from "./use-post-form";

export type { PostFormData };

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

type PostFormProps = {
  parent: PostFormParent;
  initialData?: Partial<PostFormData>;
  originalSlug?: string;
};

export function PostForm({ parent, initialData, originalSlug }: PostFormProps) {
  const {
    isEdit,
    formData,
    tagInput,
    setTagInput,
    validationErrors,
    updateField,
    handleAddTag,
    handleRemoveTag,
    handleContentChange,
    handleSubmit,
  } = usePostForm(parent, initialData, originalSlug);

  const { resolvedTheme } = useTheme();
  // to apply the theme of nextTheme to the md editor at bellow
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Post Metadata */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter post title"
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              maxLength={160}
              required
              className={validationErrors.title ? "border-destructive" : ""}
            />
            <div className="flex justify-between">
              <div className="text-xs text-destructive">
                {validationErrors.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {formData.title.length}/160 characters
              </div>
            </div>
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              placeholder="post-url-slug"
              value={formData.slug}
              onChange={(e) =>
                updateField("slug", e.target.value.toLowerCase())
              }
              // required
              className={validationErrors.slug ? "border-destructive" : ""}
            />
            <div className="flex justify-between">
              <div className="text-xs text-destructive">
                {validationErrors.slug}
              </div>
              <div className="text-xs text-muted-foreground">
                URL-friendly identifier (lowercase, no spaces)
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              placeholder="Brief summary of the post"
              value={formData.excerpt}
              onChange={(e) => updateField("excerpt", e.target.value)}
              maxLength={300}
              rows={3}
              required
              className={validationErrors.excerpt ? "border-destructive" : ""}
            />
            <div className="flex justify-between">
              <div className="text-xs text-destructive">
                {validationErrors.excerpt}
              </div>
              <div className="text-xs text-muted-foreground">
                {formData.excerpt.length}/300 characters
              </div>
            </div>
          </div>

          {/* Cover Color */}
          <div className="space-y-2">
            <Label htmlFor="cover">Cover Color</Label>
            <Select
              value={formData.cover}
              onValueChange={(value: PostCover | null) =>
                updateField("cover", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a cover color" />
              </SelectTrigger>
              <SelectContent>
                {POST_COVERS.map((color) => (
                  <SelectItem key={color} value={color}>
                    <div className="flex-center gap-2">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{
                          backgroundColor: `var(--color-${color})`,
                          border: "1px solid var(--border)",
                        }}
                      />
                      <span className="capitalize">{color}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cover Text */}
          <div className="space-y-2">
            <Label htmlFor="coverText">Cover Text</Label>
            <Input
              id="coverText"
              placeholder="Short text shown on the gradient cover"
              value={formData.coverText}
              onChange={(e) => updateField("coverText", e.target.value)}
              maxLength={120}
            />
            <div className="flex justify-end">
              <div className="text-xs text-muted-foreground">
                {formData.coverText.length}/120 characters
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex-center gap-2">
              <Input
                id="tags"
                placeholder="Add a tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Status and Featured */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: PostStatus | null) =>
                  updateField("status", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {POST_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      <span className="capitalize">{status}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:ms-auto">
              <div className="flex-center gap-2">
                <Label htmlFor="featured">Featured Post</Label>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    updateField("featured", checked)
                  }
                />
              </div>
            </div>
          </div>

          {/* Reading Time */}
          <div className="space-y-2">
            <div className="flex-center justify-between">
              <Label>Reading Time</Label>
              <div className="text-sm font-medium">
                {formData.readingTime}{" "}
                {formData.readingTime === 1 ? "minute" : "minutes"}
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Automatically calculated from content length
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Editor */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <div
              suppressHydrationWarning
              data-color-mode={
                !mounted
                  ? undefined
                  : resolvedTheme === "dark"
                    ? "dark"
                    : "light"
              }
              id="mdeditor"
            >
              {!mounted ? (
                <div className="h-[400px] rounded-md border border-border bg-muted/30" />
              ) : (
                <MDEditor
                  value={formData.content}
                  onChange={(value) => handleContentChange(value ?? "")}
                  height={400}
                  preview="edit"
                />
              )}
            </div>
            {validationErrors.content && (
              <div className="text-xs text-destructive">
                {validationErrors.content}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Form Action */}
      <Button type="submit" size="lg">
        {isEdit ? "Update Post" : "Create Post"}
      </Button>
    </form>
  );
}
