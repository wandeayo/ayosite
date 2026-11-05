import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="page-anim flex min-h-[80vh] flex-col items-center justify-center px-(--gutter) py-20 text-center"
      style={{ ["--gutter" as string]: "clamp(20px, 4vw, 56px)" }}
    >
      <div className="font-serif text-[clamp(120px,22vw,360px)] italic leading-[0.9] tracking-[-0.04em] text-accent">
        404
      </div>
      <h1 className="mt-8 font-serif text-[clamp(32px,4vw,56px)] font-normal tracking-[-0.02em]">
        This page
        <br />
        does not exist.
      </h1>
      <p className="mt-4 max-w-[40ch] text-ink-dim">
        Either the link is broken, or I am still designing it. Both are common, neither is fatal.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button variant="primary" href="/" trailingArrow>
          Back to index
        </Button>
        <Button href="/work">Browse work</Button>
      </div>
    </div>
  );
}
