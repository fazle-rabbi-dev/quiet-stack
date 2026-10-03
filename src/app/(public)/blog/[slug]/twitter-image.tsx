import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

const GRADIENTS: Record<string, string> = {
  violet: "linear-gradient(135deg, #7c3aed, #6366f1 55%, #38bdf8)",
  blue: "linear-gradient(135deg, #0ea5e9, #3b82f6 55%, #6366f1)",
  green: "linear-gradient(135deg, #10b981, #22c55e 55%, #a3e635)",
  pink: "linear-gradient(135deg, #a855f7, #d946ef 55%, #ec4899)",
  indigo: "linear-gradient(135deg, #4f46e5, #3b82f6 55%, #8b5cf6)",
  orange: "linear-gradient(135deg, #f43f5e, #fb923c 55%, #fbbf24)",
};

type TwitterProps = {
  params: Promise<{ slug: string }>;
};

export default async function TwitterImage({ params }: TwitterProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post ? post.title : "QuietStack";
  const tag = post?.tags?.[0] ? `#${post.tags[0]}` : "#blog";
  const gradient = GRADIENTS[post?.cover ?? "violet"] ?? GRADIENTS.violet;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: gradient,
        padding: "70px",
      }}
    >
      <div
        style={{
          fontSize: 26,
          color: "#000",
          border: "2px solid #000",
          borderRadius: 999,
          padding: "8px 28px",
        }}
      >
        {tag}
      </div>
      <div
        style={{
          fontSize: 58,
          fontWeight: 800,
          color: "#111",
          textAlign: "center",
          lineHeight: 1.15,
          marginTop: 24,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 28, color: "#111", marginTop: 28 }}>
        QuietStack
      </div>
    </div>,
    { ...size }
  );
}
