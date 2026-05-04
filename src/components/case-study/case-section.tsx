import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/cn";

interface CaseSectionProps {
  step: string;
  title: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/**
 * Two-column case-study section: a small numbered label on the left,
 * heading + body on the right. The single layout reused for every
 * narrative beat (Context, Problem, Process, Outcome, Reflection).
 */
export function CaseSection({ step, title, className, children }: CaseSectionProps) {
  return (
    <Reveal>
      <section className={cn("border-t border-line py-25", className)}>
        <Container className="grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr] md:gap-20">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
              {step}
            </span>
          </div>
          <div>
            <h2 className="mb-10 font-serif text-[clamp(36px,5vw,64px)] font-normal leading-[1] tracking-[-0.02em]">
              {title}
            </h2>
            <div className="space-y-6 text-[18px] leading-[1.65]">{children}</div>
          </div>
        </Container>
      </section>
    </Reveal>
  );
}
