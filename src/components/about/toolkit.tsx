import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/site/reveal";
import { TOOLKIT } from "@/lib/about";

export function Toolkit() {
  return (
    <Reveal>
      <Container
        as="section"
        className="grid grid-cols-1 gap-8 border-t border-line py-25 md:grid-cols-[280px_1fr] md:gap-20"
      >
        <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-faint">
          Toolkit
        </h2>
        <div>
          <p className="mb-8 max-w-[40ch] font-serif text-[28px] leading-[1.3]">
            Tools are tools. The thinking is what ships.
            <br />
            <span className="text-ink-dim">That said, here is what is on my desk.</span>
          </p>
          <ul className="flex flex-wrap gap-2">
            {TOOLKIT.map((tool) => (
              <li
                key={tool}
                className="cursor-default rounded-full border border-line px-4.5 py-2.5 font-mono text-[12px] tracking-[0.04em] text-ink-dim transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Reveal>
  );
}
