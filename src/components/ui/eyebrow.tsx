import { cn } from "@/lib/cn";

/**
 * Mono-cap eyebrow with a leading rule. Used as a section label
 * everywhere on the site, so wrap it once and stop hand-rolling spans.
 */
export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("eyebrow", className)}>{children}</div>;
}
