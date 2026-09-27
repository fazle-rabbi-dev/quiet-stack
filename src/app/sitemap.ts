import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constants/site";
import { getPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { success, data: posts } = await getPosts();

  return [
    { url: `${SITE_URL}/`, lastModified: new Date() },
    { url: `${SITE_URL}/search`, lastModified: new Date() },
    ...(success
      ? posts.map((post) => ({
          url: `${SITE_URL}/blog/${post.slug}`,
          lastModified: new Date(post.updatedAt),
        }))
      : []),
  ];
}
