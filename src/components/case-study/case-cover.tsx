import { Container } from "@/components/ui/container";
import { MediaTile } from "@/components/ui/media-tile";

interface CaseCoverProps {
  glyph: string;
  caption: string;
  /** Index used in the bottom-right marker, e.g. "001". */
  index?: string;
  frame?: string;
}

/**
 * Hero placeholder under the case-study lede. Single italic glyph centred
 * over a striped surface with designer-style metadata in the corners.
 */
export function CaseCover({ glyph, caption, index = "001", frame = "1920 × 1080" }: CaseCoverProps) {
  return (
    <Container as="section">
      <MediaTile className="my-20 min-h-[520px] rounded-xl border-line" aspect="h-[70vh]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="font-serif text-[200px] italic leading-[1] text-accent">{glyph}</div>
          <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
            {caption}
          </div>
        </div>
        <div className="absolute bottom-6 left-6 flex gap-8 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
          <span>01 / Cover</span>
          <span>Frame · {frame}</span>
        </div>
        <div className="absolute top-6 right-6 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
          CS / {index}
        </div>
      </MediaTile>
    </Container>
  );
}
