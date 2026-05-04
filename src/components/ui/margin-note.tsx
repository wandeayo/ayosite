import { cn } from "@/lib/cn";

/**
 * Slightly tilted, asterisk-led footnote that sits next to hero copy.
 * The visual rhythm depends on the rotation, so each instance can override
 * via the rotate prop without rewriting the styling.
 */
export function MarginNote({
  rotate = -1.2,
  className,
  children,
}: {
  rotate?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn("margin-note inline-block self-end text-right", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className="margin-note__ast">*</span>
      {children}
    </span>
  );
}
