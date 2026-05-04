import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/eyebrow";

interface SectionHeadingProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "stacked" | "split";
  className?: string;
}

/**
 * Two layouts cover almost every section heading on the site:
 * stacked (eyebrow above, title below, description after) and split
 * (eyebrow on the left, title on the right, description aligned with title).
 * The visual rhythm of the prototype is preserved by sharing one component
 * instead of redeclaring the grid in every page.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "stacked",
  className,
}: SectionHeadingProps) {
  if (align === "split") {
    return (
      <div
        className={cn(
          "grid grid-cols-1 items-end gap-10 md:grid-cols-[1fr_1.6fr] md:gap-[60px]",
          className,
        )}
      >
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <div>
          <h2 className="font-serif text-[clamp(40px,5.4vw,80px)] font-normal leading-[0.98] tracking-[-0.02em]">
            {title}
          </h2>
          {description && (
            <p className="mt-8 max-w-[56ch] text-[16px] leading-[1.55] text-ink-dim">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-normal leading-[1] tracking-[-0.02em]">
        {title}
      </h2>
      {description && (
        <p className="max-w-[56ch] text-[16px] leading-[1.55] text-ink-dim">{description}</p>
      )}
    </div>
  );
}
