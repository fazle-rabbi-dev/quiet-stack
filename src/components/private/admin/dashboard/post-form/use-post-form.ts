"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "@/components/ui/toast";
import { createPost, updatePost } from "@/lib/actions/post.action";
import {
  EMPTY_FORM,
  type PostFormData,
  type PostFormParent,
} from "./post-form-types";
import { calculateReadingTime, validatePostForm } from "./post-form-utils";

export function usePostForm(
  parent: PostFormParent,
  initialData?: Partial<PostFormData>,
  originalSlug?: string
) {
  const isEdit = parent === "edit-post";
  const router = useRouter();

  const [formData, setFormData] = useState<PostFormData>({
    ...EMPTY_FORM,
    ...initialData,
  });
  const [tagInput, setTagInput] = useState("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  function updateField(
    field: keyof PostFormData,
    value: string | boolean | string[] | number | null
  ) {
    if (value === null) return;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (typeof value === "string" && validationErrors[field]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleAddTag() {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      updateField("tags", [...formData.tags, tagInput.trim()]);
      setTagInput("");
    }
  }

  function handleRemoveTag(tagToRemove: string) {
    updateField(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove)
    );
  }

  function handleContentChange(content: string) {
    setFormData((prev) => ({
      ...prev,
      content,
      readingTime: calculateReadingTime(content),
    }));
  }

  // ========================================================================
  // -------------------- Form submission -----------------------------------
  // ========================================================================
  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const errors = validatePostForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.add({
        title: "Form validation failed",
        description: Object.values(errors).join("\n"),
        type: "destructive",
      });
      return;
    }

    try {
      if (isEdit) {
        const response = await updatePost(formData, originalSlug);
        if (!response.success) {
          toast.add({ title: "Post update failed", type: "error" });
          return;
        }
        toast.add({
          title: "Post updated successfully",
          description: "Redirecting to the dashboard...",
          type: "success",
        });
      } else {
        const response = await createPost(formData);
        if (!response.success) {
          toast.add({ title: "Post creation failed", type: "error" });
          return;
        }
        toast.add({
          title: "Post created successfully",
          description: "Redirecting to the dashboard...",
          type: "success",
        });
      }
      router.push("/admin/dashboard");
    } catch (error) {
      toast.add({
        title: error instanceof Error ? error.message : "Unknown error",
        description: "Please try again later",
        type: "error",
      });
    }
  }

  return {
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
  };
}
