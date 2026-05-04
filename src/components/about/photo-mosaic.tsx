import { Container } from "@/components/ui/container";
import { MediaTile } from "@/components/ui/media-tile";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/cn";
import { PHOTOS } from "@/lib/about";

const SPAN_CLASS = {
  tall: "photo-tile--tall",
  wide: "photo-tile--wide",
  square: "photo-tile--square",
} as const;

/**
 * Six-tile masonry that mirrors the gallery on waande.com/about.
 * Drop in <Image> when real photos are ready by replacing the children
 * inside each MediaTile with `<Image fill src=… />`.
 */
export function PhotoMosaic() {
  return (
    <Reveal>
      <Container as="section" className="grid auto-rows-[120px] grid-cols-12 gap-4 py-20 md:grid-cols-12 md:auto-rows-[120px]">
        {PHOTOS.map((photo, index) => (
          <MediaTile
            key={photo.label}
            className={cn(
              "rounded-lg transition-[transform,border-color] duration-500 ease-[var(--ease-out-quart)] hover:-translate-y-1 hover:border-line-strong",
              SPAN_CLASS[photo.span],
            )}
          >
            <div className="absolute inset-x-4 bottom-3.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
              <span>{String(index + 1).padStart(2, "0")} / 06</span>
              <span>{photo.label}</span>
            </div>
          </MediaTile>
        ))}
      </Container>
    </Reveal>
  );
}
