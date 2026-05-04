import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/cn";
import { ROLES } from "@/lib/about";

export function Timeline() {
  return (
    <Reveal>
      <Container as="section" className="border-t border-line py-20">
        <div className="mb-15 grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr] md:gap-20">
          <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-faint">
            Where I have been
          </h2>
          <div className="font-serif text-[36px] leading-[1.2] tracking-[-0.01em]">
            Five years. Five teams.
            <br />
            <span className="accent-it">Always shipping.</span>
          </div>
        </div>

        <ul className="flex flex-col">
          {ROLES.map((role) => (
            <li
              key={role.role + role.date}
              className="grid grid-cols-[1fr_1fr] items-center gap-3 border-t border-line py-6 transition-[padding] duration-300 hover:pl-2 last:border-b md:grid-cols-[200px_1fr_1fr_60px] md:gap-8"
            >
              <span className="font-mono text-[12px] tracking-[0.06em] text-ink-faint">
                {role.date}
              </span>
              <span className="font-serif text-[24px] tracking-[-0.01em]">{role.role}</span>
              <span className="hidden text-[14px] text-ink-dim md:block">{role.company}</span>
              <span
                className={cn(
                  "hidden h-2 w-2 justify-self-end rounded-full md:block",
                  role.current
                    ? "bg-accent shadow-[0_0_10px_var(--color-accent)]"
                    : "bg-ink-faint",
                )}
                aria-hidden
              />
            </li>
          ))}
        </ul>
      </Container>
    </Reveal>
  );
}
