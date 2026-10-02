export async function BlogContent({ content }: { content: string }) {
  return (
    <div
      className="prose mt-8 max-w-none dark:prose-invert prose-blockquote:rounded-r-2xl prose-blockquote:border-l-2 prose-blockquote:border-primary prose-blockquote:bg-muted prose-blockquote:px-5 prose-blockquote:py-1 prose-pre:rounded-xl prose-pre:bg-[#0d0d17]"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
