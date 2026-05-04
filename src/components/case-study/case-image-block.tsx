import { Container } from "@/components/ui/container";
import { MediaTile } from "@/components/ui/media-tile";
import { Reveal } from "@/components/site/reveal";

interface CaseImageBlockProps {
  /** Caption shown bottom-left, mirrors a designer's layer label. */
  caption: string;
  /** Optional accent display text rendered centred over the placeholder. */
  display?: React.ReactNode;
  /** Mono kicker under the display text. */
  kicker?: string;
}

/**
 * Reusable hero image block within a case study. Until real screens are
 * dropped in, it shows a striped placeholder with a caption.
 */
export function CaseImageBlock({ caption, display, kicker }: CaseImageBlockProps) {
  return (
    <Reveal>
      <Container as="section" className="my-20">
        <MediaTile aspect="aspect-[16/9]">
          {display && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="font-serif text-[72px] italic leading-tight tracking-[-0.02em] text-accent">
                {display}
              </div>
              {kicker && (
                <div className="mt-4 font-mono text-[11px] tracking-[0.12em] text-ink-faint">
                  {kicker}
                </div>
              )}
            </div>
          )}
          <div className="absolute bottom-6 left-6 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
            {caption}
          </div>
        </MediaTile>
      </Container>
    </Reveal>
  );
}
