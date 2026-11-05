import { ContactSection, SiteFooter, SiteHeader } from "@/components/landing/chrome";
import { HOME_JSON_LD, LINKS, SERVICES } from "@/components/landing/content";
import { FloatingNav } from "@/components/landing/floating-nav";
import { JsonLd } from "@/components/landing/json-ld";
import { KindWords } from "@/components/landing/kind-words";
import { LocalClock } from "@/components/landing/local-clock";
import { FIT_STAGES_INLINE } from "@/components/landing/thumbs/fit-stages";
import { AirstrideThumb, ArcticThumb, CarmenThumb, DexlaThumb } from "@/components/landing/thumbs/thumbs";
import { WorkGrid } from "@/components/landing/work-grid";

interface ProjectCardProps {
  href: string;
  thumb: React.ReactNode;
  title: React.ReactNode;
  year: string;
  description: string;
  role: string;
}

function ProjectCard({ href, thumb, title, year, description, role }: ProjectCardProps) {
  return (
    <a className="project" href={href}>
      {thumb}
      <div className="meta">
        <div className="meta-row">
          <h3>{title}</h3>
          <span className="mono yr">{year}</span>
        </div>
        <p>{description}</p>
        <div className="meta-row mono role">
          <span>{role}</span>
          <span className="arrow">→</span>
        </div>
      </div>
    </a>
  );
}

export default function HomePage() {
  return (
    <div className="wrap">
      <JsonLd data={HOME_JSON_LD} />

      <SiteHeader home />

      {/* header and footer stay outside main, as the banner and contentinfo landmarks */}
      <main>
        <div className="intro">
          <h1>
            Product designer for early‑stage AI and SaaS teams. <span>I design it, then I ship it.</span>
          </h1>
          <p>
            I work directly with founders and CTOs, usually as the first designer in the room. I take products from a
            rough idea to production front-end that I build myself, so what gets approved is what ships. Recent work
            spans agentic tools, internal platforms and design systems at <a href="/work/airstride">Airstride</a>,{" "}
            <a href="/work/dexla-design-system">Dexla</a> and others.
          </p>
          <div className="status mono">
            <span>
              <span className="dot" />
              Open to founding designer and design engineer roles
            </span>
            <span>
              Abuja, Nigeria · <LocalClock />
            </span>
          </div>
          <div className="cta">
            <a className="btn primary" href={LINKS.calendly} target="_blank" rel="noopener">
              Book a call
            </a>
            <a className="btn" href={LINKS.resume} target="_blank" rel="noopener">
              Résumé
            </a>
            <a className="btn" href={LINKS.github} target="_blank" rel="noopener">
              GitHub ↗
            </a>
          </div>
        </div>

        <section id="work">
          <div className="sec-head">
            <h2 className="label">Selected work</h2>
            <span className="label">2024 – 2025</span>
          </div>
          <WorkGrid>
            <ProjectCard
              href="/work/carmen-ai"
              thumb={<CarmenThumb />}
              title={
                <>
                  Carmen <small>· Airstride</small>
                </>
              }
              year="2025"
              description="An AI agent for partner acquisition. The hard part was building trust into something that sends messages while nobody is watching."
              role="Product Designer · AI agent"
            />
            <ProjectCard
              href="/work/airstride"
              thumb={<AirstrideThumb />}
              title="Airstride"
              year="2025"
              description="A partner revenue platform taken from zero to six modules and a design system. The marketing site redesign lifted conversion by 84%."
              role="UX Designer · Web app"
            />
            <ProjectCard
              href="/work/arctic-edge"
              thumb={<ArcticThumb />}
              title="Arctic Edge"
              year="2024"
              description="A cold and heat therapy app paired with hardware. I reworked the visual language, the information architecture and the temperature dial."
              role="UI Designer · Mobile + hardware"
            />
            <ProjectCard
              href="/work/dexla-design-system"
              thumb={<DexlaThumb />}
              title="Dexla Design System"
              year="2024"
              description="Tokens, primitives and patterns for a no-code AI builder, with documentation the engineers kept open while they built."
              role="UX Designer · Design system"
            />
          </WorkGrid>
          <script dangerouslySetInnerHTML={{ __html: FIT_STAGES_INLINE }} />
        </section>

        <section id="about">
          <div className="sec-head">
            <h2 className="label">What I do</h2>
          </div>
          <div className="cols">
            {SERVICES.map((s) => (
              <div key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <KindWords />

        <ContactSection />
      </main>

      <SiteFooter />

      <FloatingNav variant="home" />
    </div>
  );
}
