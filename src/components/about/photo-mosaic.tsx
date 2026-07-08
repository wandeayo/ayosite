import { Fragment } from "react";
import Image from "next/image";

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

const MARK_AFTER_INDEX = 4;

export function PhotoMosaic() {
  return (
    <Reveal>
      <Container as="section" className="photo-mosaic grid grid-cols-6 auto-rows-[90px] gap-4 py-20 min-[801px]:grid-cols-12 min-[801px]:auto-rows-[120px]">
        {PHOTOS.map((photo, index) => (
          <Fragment key={photo.src}>
            <MediaTile
              className={cn(
                "rounded-lg transition-[transform,border-color] duration-500 ease-[var(--ease-out-quart)] hover:-translate-y-1 hover:border-line-strong",
                SPAN_CLASS[photo.span],
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 800px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover"
                priority={index < 2}
              />
            </MediaTile>
            {index === MARK_AFTER_INDEX && <WandeMark />}
          </Fragment>
        ))}
      </Container>
    </Reveal>
  );
}

function WandeMark() {
  return (
    <div
      aria-hidden
      className="photo-mark flex items-center justify-center text-center"
    >
      <div className="flex flex-col items-center gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint/50">
          // signed
        </span>
        <span className="font-serif italic leading-none tracking-[-0.02em] text-ink-faint/35 text-[clamp(32px,4vw,52px)]">
          Wande
        </span>
      </div>
    </div>
  );
}
