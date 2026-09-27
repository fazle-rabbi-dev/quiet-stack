import { coverClass } from "@/components/public/post-cover-styles";
import { cn } from "cn";

type BlogCoverProps = {
  title: string;
  cover: string;
  coverText?: string;
  primaryTag: string;
};

export function BlogCover({ title, cover, coverText, primaryTag }: BlogCoverProps) {
  return (
    <div
      className={cn("relative h-52 overflow-hidden sm:h-64", coverClass(cover))}
    >
      <div
        aria-hidden
        className="absolute inset-0 [background-image:radial-gradient(rgb(255_255_255/0.28)_1px,transparent_1.4px)] [background-size:18px_18px] opacity-70"
      />
      <div className="absolute top-20 w-full px-3 py-1 font-semibold text-black">
        <h3 className="heading-3 text-center italic">{coverText || title}</h3>
      </div>
      <span className="absolute bottom-4 left-4 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        #{primaryTag}
      </span>
    </div>
  );
}
