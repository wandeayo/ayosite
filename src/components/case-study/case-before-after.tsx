import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/site/reveal";

interface CaseBeforeAfterImage {
  src: string;
  alt: string;
  /** Short label rendered above the image, e.g. "Legacy" / "Redesigned". */
  label: string;
  /** Optional one-line annotation rendered below the label. */
  note?: string;
  width?: number;
  height?: number;
}

interface CaseBeforeAfterProps {
  before: CaseBeforeAfterImage;
  after: CaseBeforeAfterImage;
  /** Mono kicker rendered above the comparison. */
  kicker?: string;
  /** Caption rendered below the comparison. */
  caption?: string;
}

/**
 * Side-by-side before/after comparison for UI case studies.
 * The two images sit at the same scale so the visual delta reads cleanly.
 */
export function CaseBeforeAfter({ before, after, kicker, caption }: CaseBeforeAfterProps) {
  return (
    <Reveal>
      <Container as="figure" className="my-20">
        {kicker && (
          <div className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            {kicker}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {[before, after].map((image, index) => {
            const w = image.width ?? 1608;
            const h = image.height ?? 3496;
            return (
              <div key={image.src} className="flex flex-col gap-3">
                <header className="flex items-baseline justify-between gap-3 border-b border-line pb-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
                    {index === 0 ? "Before · " : "After · "}
                    {image.label}
                  </span>
                  {image.note && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
                      {image.note}
                    </span>
                  )}
                </header>
                <div className="flex justify-center">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={w}
                    height={h}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-auto w-full max-w-[420px]"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {caption && (
          <figcaption className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
            {caption}
          </figcaption>
        )}
      </Container>
    </Reveal>
  );
}
