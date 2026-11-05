import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CASES, CASE_ORDER, isCaseSlug, type CaseSlug } from "@/components/case/cases";
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isCaseSlug(slug)) return {};
  const meta = CASES[slug];
  const url = `/work/${slug}`;
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: meta.title, description: meta.description },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isCaseSlug(slug)) notFound();
  const Page = PAGES[slug];
  return <Page />;
}
