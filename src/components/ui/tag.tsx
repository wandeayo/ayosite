import { cn } from "@/lib/cn";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded border border-line bg-bg-glass px-[10px] py-[5px] font-mono text-[10px] uppercase tracking-[0.08em] text-ink-dim",
        className,
      )}
    >
      {children}
    </span>
  );
}
