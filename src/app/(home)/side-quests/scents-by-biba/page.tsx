import type { Metadata } from "next";

import { LANDING, PERSON_ID, WEBSITE_ID } from "@/components/landing/content";
import { JsonLd } from "@/components/landing/json-ld";
import { SCENTS, ScentsCase } from "@/components/side-quests/scents/page";

const PATH = "/side-quests/scents-by-biba";
const TITLE = "Scents by Biba: perfume shop design and build case study · Ayowande Olubo";
const DESCRIPTION =
  "Side quest: designing and building a website for an Instagram perfume shop in Jos, where buyers describe a scent and order on WhatsApp.";

// No page-specific social card yet: the site's default (public/og.png) applies.
export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "article", url: PATH, siteName: LANDING.name, locale: "en_GB", title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": `${LANDING.url}${PATH}#case`,
  url: `${LANDING.url}${PATH}`,
  name: "Scents by Biba",
  headline: SCENTS.h1,
  description: DESCRIPTION,
  inLanguage: "en-GB",
  dateCreated: "2026",
  author: { "@type": "Person", "@id": PERSON_ID, name: LANDING.name, url: LANDING.url },
  isPartOf: { "@id": WEBSITE_ID },
};

export default function ScentsByBibaPage() {
  return (
    <>
      <JsonLd data={JSON_LD} />
      <ScentsCase />
    </>
  );
}
