import type { Metadata } from "next";

import { CopyEmail } from "@/components/contact/copy-email";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE.name}. Email, X, LinkedIn, Instagram, Dribbble.`,
};

export default function ContactPage() {
  return (
    <div className="page-anim relative isolate flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden">
      <div aria-hidden className="contact-dots pointer-events-none absolute inset-0 -z-10" />

      <Container className="text-center py-24">
        <Eyebrow>Get in touch with me here</Eyebrow>

        <h1 className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 font-serif font-normal leading-[1.02] tracking-[-0.025em] text-[clamp(36px,8vw,112px)]">
          <a
            href={`mailto:${SITE.email}`}
            className="break-all decoration-line decoration-2 underline-offset-[10px] transition-colors duration-200 hover:underline hover:decoration-accent"
          >
            {SITE.email}
          </a>
          <CopyEmail email={SITE.email} />
        </h1>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {SITE.socials.map((social) => (
            <Button key={social.label} href={social.href} variant="ghost">
              {social.label}
            </Button>
          ))}
        </div>
      </Container>
    </div>
  );
}
