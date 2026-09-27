import type { PostFormData } from "./post-form-types";

export function validatePostForm(data: PostFormData) {
  const errors: Record<string, string> = {};

  if (!data.title.trim()) {
    errors.title = "Title is required";
  } else if (data.title.length > 160) {
    errors.title = "Title must be 160 characters or less";
  }

  // if (!data.slug.trim()) {
  //   errors.slug = "Slug is required";
  // } else if (!/^[a-z0-9-]+$/.test(data.slug)) {
  //   errors.slug =
  //     "Slug can only contain lowercase letters, numbers, and hyphens";
  // }

  if (!data.excerpt.trim()) {
    errors.excerpt = "Excerpt is required";
  } else if (data.excerpt.length > 300) {
    errors.excerpt = "Excerpt must be 300 characters or less";
  }

  if (!data.content.trim()) {
    errors.content = "Content is required";
  }

  return errors;
}

// Approx 200 words per minute, minimum 1
export function calculateReadingTime(content: string) {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
}
