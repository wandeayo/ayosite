import Link from "next/link";

import type { Post } from "@/lib/posts";

export function PostRow({ post }: { post: Post }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="group grid grid-cols-[80px_1fr] items-center gap-8 border-t border-line py-7 transition-[padding] duration-300 ease-[var(--ease-out-quart)] last:border-b hover:pl-3 md:grid-cols-[100px_1fr_auto_200px]"
    >
      <span className="font-mono text-[11px] tracking-[0.06em] text-ink-faint">{post.date}</span>
      <h3 className="font-serif text-[28px] font-normal leading-[1.1] tracking-[-0.01em]">
        {post.title}
      </h3>
      <span className="hidden font-mono text-[11px] tracking-[0.06em] text-ink-faint md:block">
        {post.readTime}
      </span>
      <span className="hidden text-right font-mono text-[11px] uppercase tracking-[0.08em] text-ink-dim md:block">
        {post.topic}
      </span>
    </Link>
  );
}
