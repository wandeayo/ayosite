import { cn } from "@/lib/cn";

interface MediaTileProps {
  className?: string;
  /** Aspect ratio applied via Tailwind utility (e.g. "aspect-[16/10]"). */
  aspect?: string;
  /** Optional gradient or solid background override. */
  background?: string;
  children?: React.ReactNode;
}

/**
 * Visual placeholder for imagery the designer hasn't dropped in yet.
 * Used by work cards, case-study covers, and the about photo mosaic.
 * Once real images arrive, replace the children with <Image>.
 */
export function MediaTile({ className, aspect, background, children }: MediaTileProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-line bg-bg-elev",
        aspect,
        className,
      )}
      style={background ? { background } : undefined}
    >
      <div className="stripes-overlay" aria-hidden />
      {children}
    </div>
  );
}
