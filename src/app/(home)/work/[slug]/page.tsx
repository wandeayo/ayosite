import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseLayout } from "@/components/case/case-layout";
import { CASES, CASE_ORDER, isCaseSlug } from "@/components/case/cases";

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
  return <CaseLayout meta={CASES[slug]} />;
}
