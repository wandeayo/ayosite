import type { ReactNode } from "react";

import { ContactSection, SiteFooter, SiteHeader } from "@/components/landing/chrome";
import { FloatingNav } from "@/components/landing/floating-nav";

import { BottleDefs, Photo } from "./art";
import { BeforeAfter } from "./before-after";
import { BottleSystem } from "./bottle-system";
import { LINK_CARD } from "./catalogue";
import { DupeGuide } from "./dupe-guide";
import { cormorant, jost, jostExt } from "./fonts";
import { PhotoSlider } from "./photo-slider";
import { AgentStepper, ConceptFigure, LIVE, PriceSheet } from "./prototypes";
import { Audit, Stats } from "./reveal";
import { SearchDemo } from "./search-demo";
import { Tour } from "./tour";

import "./scents.css";

/** Hero copy, shared with the route's metadata. */
export const SCENTS = {
  label: "Side quest 01 · Perfume shop",
  h1: "Giving an Instagram perfume shop a front door.",
  lede: "Biba sells perfume from Shop 6 in Jos and from her Instagram DMs. Her buyers rarely know what a perfume is called. They describe it: something sweet for my wife, under 30k. I designed and built a website that sells the way she already does.",
  site: "https://scentsbybiba.vercel.app",
  facts: [
    ["Owner", "Scents by Biba · 2026"],
    ["Role", "Designer and front-end, solo"],
    ["Scope", "Research, product design, build, SEO"],
    ["Status", "Live since Nov 2026"],
  ],
} as const;

function Fig({ n, caption, children }: { n: number; caption: ReactNode; children: ReactNode }) {
  return (
    <figure className="sb-fig">
      {children}
      <figcaption>
        <b>Fig. {n}</b>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

const DM_MAP: ReadonlyArray<readonly [string, string, string]> = [
  ["Do you have something sweet under 30k?", "Describe-it search.", "Plain words in, four picks out, each with a reason."],
  ["How much is Asad?", "A price on every perfume.", "Order-in prices read “About ₦32,500”, so a guess never looks like a promise."],
  ["Is there something like Baccarat Rouge?", "32 “smells like” guides.", "The designer scent, and what in the shop is closest."],
  ["Can you deliver to Abuja?", "City delivery pages.", "Timing, how ordering works and what holds up in that weather."],
  ["I want these three, plus one for my sister", "The bag.", "One numbered WhatsApp message with references, quantities and the city."],
];

const PROBLEMS: ReadonlyArray<readonly [string, string]> = [
  ["Nobody knows the names", "Buyers ask for a mood and a budget, not “Khamrah Qahwa”. A search box that needs the exact name is a dead end."],
  ["Most stock isn’t on the shelf", "307 of the 408 perfumes are ordered in, so their prices are estimates, not promises."],
  ["Nobody pays a stranger", "A card form on an unknown website asks for trust the shop hasn’t earned there yet. Her DMs already have it."],
  [
    "Every question is a DM",
    "Do you have it, how much, is it like Baccarat, can you send it to Abuja. Each one waits for Biba to reply by hand, and a buyer who has to wait may not come back.",
  ],
];

const NEXT = [
  "Ship the price sheet, so Biba can change a price or mark something sold out herself.",
  "Build the Instagram agent once her post archive arrives, with approval in WhatsApp.",
  "Measure which placement gets the most WhatsApp taps: cards, product pages or the bag.",
  "Replace the drawn bottles with photos from her own shelf.",
];

/** Copy verbatim from waande-scents-handoff/reference/index.html; section order and figure numbers as approved. */
export function ScentsCase() {
  return (
    <div className={`wrap ${cormorant.variable} ${jost.variable} ${jostExt.variable}`}>
      <BottleDefs />
      <SiteHeader />
      {/* header and footer stay outside main, as the banner and contentinfo landmarks */}
      <main className="sb">
        <div className="sb-top">
          <a className="sb-back" href="/#work">
            ← All work
          </a>
          <span className="label">{SCENTS.label}</span>
          <h1>{SCENTS.h1}</h1>
          <p className="sb-lede">{SCENTS.lede}</p>
          <a className="btn" href={SCENTS.site} target="_blank" rel="noopener">
            Visit Scents by Biba ↗
          </a>
          <dl className="sb-facts">
            {SCENTS.facts.map(([dt, dd]) => (
              <div key={dt}>
                <dt>{dt}</dt>
                <dd>{dd}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Fig n={1} caption="The whole product in one frame: describe a scent, add a perfume or two, and watch the WhatsApp order write itself. It runs on 24 perfumes from the real catalogue.">
          <SearchDemo />
        </Fig>

        <Stats />

        <h2>What 545 posts said.</h2>
        <p>
          Before designing anything I read every post on her Instagram. Product shots, the bottles on a shelf, pulled a
          handful of likes. Posts with Biba in them pulled ten times that.
        </p>
        <Fig n={2} caption="Typical likes per post. People weren’t following a catalogue. They were following Biba.">
          <Audit />
        </Fig>
        <p>
          That changed the brief. The site speaks in her voice, every pick is framed as hers, and every order lands in her
          own WhatsApp, not in an inbox nobody answers.
        </p>

        <h2>Four things the shop was up against.</h2>
        <ul className="sb-problems">
          {PROBLEMS.map(([title, line], i) => (
            <li key={title}>
              <span className="sb-pn">P.0{i + 1}</span>
              <strong>{title}</strong>
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <h2>Ask the shop, not the shopkeeper.</h2>
        <p>
          The site’s real job is to answer the questions buyers would otherwise DM, so Biba’s time goes to orders, not to
          typing prices. The hero is one question: describe the scent you’re looking for. The search reads{" "}
          <strong>a budget</strong> (“under 30k”), <strong>an occasion</strong>, <strong>who it’s for</strong> and{" "}
          <strong>a scent family</strong>, explains each match in one line, and offers one-tap refinements: cheaper, sweeter,
          fresher, for him, for her. It never returns nothing. With no exact match it shows the closest picks and says so.
        </p>
        <Fig n={3} caption="Five questions that used to start a DM, and the part of the site that now answers each one first.">
          <ul className="sb-frame sb-dmmap">
            {DM_MAP.map(([q, a, rest]) => (
              <li className="sb-dm-row" key={q}>
                <span className="sb-dm-q">{q}</span>
                <span className="sb-dm-arrow" aria-hidden="true">
                  →
                </span>
                <span className="sb-dm-a">
                  <strong>{a}</strong> {rest}
                </span>
              </li>
            ))}
          </ul>
        </Fig>

        <h2>A tour of the shop.</h2>
        <p>Seven screens from the live site at phone width, because buyers arrive by tapping a link in Instagram or WhatsApp.</p>
        <Tour />

        <h2>A dupe guide, not a dupe shop.</h2>
        <p>
          A lot of perfume shopping starts from a designer scent someone already loves. Instead of pretending to stock those,
          the site has a guide for each of the favourites: the original, its price, and what in the shop is closest. It says
          plainly that these are inspired by, not copies.
        </p>
        <Fig n={4} caption="Pick a designer favourite. Prices are the shop’s own, from the live catalogue.">
          <DupeGuide />
        </Fig>

        <h2>The checkout already existed.</h2>
        <p>
          It’s called WhatsApp. Instead of building payments and accounts, the bag turns a list of perfumes into one numbered
          message with references, quantities, the delivery city and the search that led there. Biba confirms stock and the
          total in the chat, the way she always has. <strong>The tradeoff:</strong> no on-site conversion data. So every
          WhatsApp tap is counted by where it happened instead.
        </p>

        <h2>408 perfumes, 129 photos.</h2>
        <p>
          A catalogue of grey placeholders would read as an empty shop. So I built a small photo pipeline: pull the brand’s
          catalogue shots, draw them onto a canvas, flood-fill the white background away, and check every bottle by eye. 129
          made it. Three didn’t: a lifestyle shot and two bottles still in their boxes.
        </p>
        <Fig n={5} caption="Drag to compare. A cut-out sits on the shop’s arch, so a photographed bottle and a drawn one live on the same shelf.">
          <PhotoSlider />
        </Fig>
        <p>
          The other 279 needed a face that wasn’t a placeholder or a copied bottle. So I drew a system instead: eight
          silhouettes, 26 liquids and five metal caps, chosen from each perfume’s name and scent family.
        </p>
        <Fig
          n={6}
          caption="Type a name and watch the bottles take its colours: “rose” turns the liquid pink, “midnight” gives a noir cap, “oud” a darker body. Tap a bottle to cycle its liquid."
        >
          <BottleSystem />
        </Fig>

        <h2>One action per card.</h2>
        <p>
          The first build put two buttons on every card: Order on WhatsApp and Add to bag. On a phone, that’s 48 buttons
          fighting 24 bottles, and the labels wrapped. A browsing grid is for choosing, so I gave each card one quick add on
          the photo. WhatsApp moved to the product page, where the decision happens. A tick confirms the add, and tapping it
          again opens the bag instead of adding a duplicate.
        </p>
        <Fig n={7} caption="Same grid, one decision. Switch to After and tap a bag button.">
          <BeforeAfter />
        </Fig>

        <h2>Built to be found.</h2>
        <Fig n={8} caption="A product link pasted into a chat. Every perfume gets its own card, drawn at build time from the catalogue.">
          <div className="sb-frame sb-share">
            <div className="sb-bubble">
              <div className="sb-card">
                <Photo img={LINK_CARD} alt="Link preview card for Ramz Silver: photo, name, brand and price" />
                <div>
                  <strong>Ramz Silver by Lattafa, ₦25,000 | Scents by Biba</strong>
                  <small>scentsbybiba.vercel.app</small>
                </div>
              </div>
              <p>this one 👀</p>
            </div>
          </div>
        </Fig>
        <p>
          Every perfume has its own page and its own link preview card, so a link shared in a chat shows the bottle and the
          price. Delivery pages for Abuja, Kaduna and Kano answer what buyers there actually ask, and the sitemap and
          structured data are generated from the same catalogue as the pages.
        </p>

        <h2>What’s next, already prototyped.</h2>
        <p>
          The site runs on a catalogue file, which is fine for launch but means Biba can’t change a price without me. The
          next two pieces hand the shop back to her. Neither is live yet, so they’re marked as prototypes.
        </p>
        <ConceptFigure
          live={LIVE.priceSheet}
          n={9}
          caption="Biba edits a row in a sheet she already knows how to use, and the site rebuilds itself. Try changing the price or the stock."
        >
          <PriceSheet />
        </ConceptFigure>
        <ConceptFigure
          live={LIVE.agent}
          n={10}
          caption="An agent that turns her Instagram posts into stock updates, with one rule: nothing goes public without her yes. It’s the same trust problem I solved for Carmen, at shop size."
        >
          <AgentStepper />
        </ConceptFigure>

        <section className="sb-closing">
          <h2 className="label">In closing</h2>
          <p>
            Scents by Biba went from a shop you could only reach through DMs to one you can browse, search in plain words and
            order from in a single message, without asking buyers to trust anything new. Next:
          </p>
          <ol className="sb-nextlist">
            {NEXT.map((line, i) => (
              <li key={line}>
                <span>0{i + 1}</span>
                {line}
              </li>
            ))}
          </ol>
        </section>

        <ContactSection />
      </main>
      <SiteFooter />
      <FloatingNav variant="case" />
    </div>
  );
}
