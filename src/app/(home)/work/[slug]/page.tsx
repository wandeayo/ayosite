import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CASES, CASE_ORDER, isCaseSlug, type CaseMeta, type CaseSlug } from "@/components/case/cases";
import { LANDING, PERSON_ID } from "@/components/landing/content";
import { AirstrideCase } from "@/components/case/pages/airstride";
import { ArcticEdgeCase } from "@/components/case/pages/arctic";
import { CarmenCase } from "@/components/case/pages/carmen";
import { DexlaCase } from "@/components/case/pages/dexla";

/** One template, four pages: each composes the shared blocks with its own content. */
const PAGES: Record<CaseSlug, () => React.ReactNode> = {
  "carmen-ai": CarmenCase,
  airstride: AirstrideCase,
  "arctic-edge": ArcticEdgeCase,
  "dexla-design-system": DexlaCase,
};

// Case studies share the landing page's root layout ((home)/layout.tsx): tokens,
// fonts, the pre-paint theme script and home.css. Only these four slugs exist.
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CASE_ORDER.map((slug) => ({ slug }));
}

/** 1200 × 630 social card: the case H1 on its tile (scripts/og-case.html). */
const ogImage = (meta: CaseMeta) => ({
  url: `/work/${meta.slug}/og.png`,
  width: 1200,
  height: 630,
  alt: `${meta.hero.label}. ${meta.hero.h1}`,
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isCaseSlug(slug)) return {};
  const meta = CASES[slug];
  const url = `/work/${slug}`;
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: LANDING.name,
      locale: "en_GB",
      title: meta.title,
      description: meta.description,
      images: [ogImage(meta)],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [ogImage(meta)] },
  };
}

/** schema.org CreativeWork for the case, authored by the home page's Person. */
function caseJsonLd(meta: CaseMeta) {
  const year = meta.hero.facts.find(([k]) => k === "Client")?.[1].match(/\d{4}/)?.[0];
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${LANDING.url}/work/${meta.slug}#case`,
    url: `${LANDING.url}/work/${meta.slug}`,
    name: meta.name,
    headline: meta.hero.h1,
    description: meta.description,
    image: `${LANDING.url}/work/${meta.slug}/og.png`,
    inLanguage: "en-GB",
    ...(year && { dateCreated: year }),
    author: { "@type": "Person", "@id": PERSON_ID, name: LANDING.name, url: LANDING.url },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isCaseSlug(slug)) notFound();
  const Page = PAGES[slug];
  return (
    <>
      <script
        type="application/ld+json"
        // Static, trusted JSON; `<` is escaped so it can never close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseJsonLd(CASES[slug])).replace(/</g, "\\u003c") }}
      />
      <Page />
    </>
  );
}
