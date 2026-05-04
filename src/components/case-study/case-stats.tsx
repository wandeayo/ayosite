import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/site/reveal";

export interface CaseStat {
  /** The numeric value (without the unit). */
  value: string;
  /** Optional accent unit, e.g. "x", "%". */
  unit?: string;
  description: string;
  label: string;
}

/**
 * Four-up impact strip used at the end of an Outcome section.
 */
export function CaseStats({ stats }: { stats: CaseStat[] }) {
  return (
    <Reveal>
      <Container as="section">
        <div className="grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="flex min-h-[200px] flex-col gap-3 bg-bg p-7 md:px-7 md:py-10"
            >
              <div className="font-serif text-[80px] leading-[1] tracking-[-0.03em]">
                {stat.value}
                {stat.unit && <span className="accent-it">{stat.unit}</span>}
              </div>
              <p className="text-[13px] leading-[1.5] text-ink-dim">{stat.description}</p>
              <div className="mt-auto font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                {stat.label}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Reveal>
  );
}
