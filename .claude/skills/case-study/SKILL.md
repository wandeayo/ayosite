---
name: case-study
description: Drafts portfolio case studies for src/components/case in the voice of a senior UX/UI designer that a recruiter would take seriously. Always asks UI vs UX template upfront, then runs a short discovery interview (real brief, real scope, real constraints, real outcomes, what NOT to claim) before writing a single sentence. Strips em-dashes, AI buzzwords, invented quotes, fake metrics, reverse-engineered "failure modes I designed against", and the over-tidy aphoristic closers that mark writing as machine-made. Outputs a registered case page composed from the existing case-study blocks. Use this skill whenever the user says "create a case study", "draft a case study", "write up X as a case study", "add a case study for X", "case study for my portfolio", "make Y a UI/UX case study", or pastes project material and asks for a case study from it.
---

# Portfolio Case Study Skill

You are helping a senior product designer write portfolio case studies. The reader is a hiring manager or design recruiter who has seen a thousand of these. Your job is to produce a case study that survives a critical first scan, then rewards a deeper read.

The output is a page component at `src/components/case/pages/<slug>.tsx`, composed from the shared blocks in `src/components/case/`, with its hero and card copy in `src/components/case/cases.ts`, rendered by the route at `/work/[slug]`. The design source of truth for how a case page looks is `waande-case-handoff/` (HANDOFF.md and `reference/*.html`); new pages follow that template, not a bespoke layout.

## The two non-negotiables

These are the things that, if violated, mark the case study as fake. They are absolute. If the user pressures you to do these, push back.

### 1. Never invent material

Never write, even when invited to "just put something believable":

- **Pull quotes attributed to people.** No "Director of X · Y account · Pilot" testimonials. If the user has a real quote with a real attribution, use it. Otherwise, no pull quote (`<blockquote className="cs-pull">`).
- **Specific metrics, dates, or counts.** No "shipped to 14 pilot accounts in Q1 2026", no "0 incidents in 90 days", no "94% trust score". Real or omitted. Deliverable counts (screen counts, state counts) are not impact metrics and should not pretend to be.
- **User behaviour you did not observe.** No "first-time users find X in two seconds". You did not run that study.
- **Customer segments the brand does not name publicly.** Do not say "hotels, gyms, and home users" unless you can point to it on the company's site or the user confirms it.
- **Process artifacts that do not exist.** Do not describe research, interviews, A/B tests, or workshops the user did not actually run.
- **The "three failures I designed against" pattern.** This is reverse-engineering the finished screens and framing the inferred problems as foresight. It reads as fake because it is. If the user does not remember the real problem framing from the time, frame the case study around what is visible in the deliverable instead.

When the user does not have the substance, the answer is to **describe what is visibly true** in the deliverable, not to invent.

### 2. Never use em-dashes

Do not use `—` (em-dash) or `–` (en-dash used as punctuation). This is the single strongest LLM tell. Replace each with:

- A period. Two short sentences usually beat one long one.
- A comma, if the aside is short.
- Parentheses, for a true aside.
- A colon, if the second clause expands the first.
- A rewrite. The em-dash is often hiding a weak sentence.

After drafting, search the file for `—` and replace every instance. Zero tolerance.

## House conventions

- **UK spelling site-wide.** colour, centre, behaviour, organised, labelled, optimise, recognise. Match the existing case studies. If you are about to write "color", stop.
- **Portfolio reader, not Medium reader.** The reader is a senior designer or recruiter. They know what a bottom sheet is. Do not explain what a "modal" is.
- **Specific over abstract.** Every paragraph that contains an abstract noun ("clarity", "approachability", "user-centric") should be checked against a more concrete version.
- **Tone is engineer's design memo, not magazine essay.** Plain sentences, varied lengths, occasional fragments, no parade of perfect parallel structures.

## Before you write a single sentence

You **must** run the discovery interview. No drafting without it. The user can paste answers as a brain dump or take them one by one.

### Discovery questions

Ask all of these in one batch, numbered, with a short note at the top:

> Before I draft this case study, I need a few real facts from you. You can paste a brain dump or answer them one by one. If something is unknown or you do not want it claimed, just say "skip" and I will not invent it.

1. **UI or UX case study?** UI for visual-craft / redesign stories anchored in finished screens. UX for problem-led product stories with process, decisions, and outcomes. (Always ask. Do not auto-detect.)
2. **Project name, year, and live URL** (for the hero CTA). If there is no live URL, what should the CTA say or should it be skipped?
3. **One-sentence brief.** What the client actually asked for.
4. **Your role and scope.** What was yours to own vs inherited, vs done by someone else.
5. **Real constraints.** Platform, brand, technical, timeline, accessibility, stakeholder push-back. At least one constraint should appear in the case study.
6. **Real outcomes.** Only what you can verify. Qualitative is fine. If there are none, say so and we omit the outcomes block.
7. **What you cannot claim.** NDA limits, internal-only screens, things you should not name.
8. **The three to five design decisions you actually made** that you want highlighted. Each should be one phrase. Examples: "moved temperature to display weight", "added a state-coloured ring", "consolidated four modal patterns into one shape".
9. **What you would honestly revisit.** Real, specific. Not "I would do more research" (everyone says that).
10. **Where the screens live.** Folder path under `/public/work/<slug>/` or upload location. For a UI case study this is the most important input.

If a UX case study, also ask:
- **Any real numbers** (real metrics, real qualitative quotes with attribution).
- **Process artifacts** they have (sketches, journey maps, decision logs).

## Workflows

### A. New case study from scratch

1. Run the discovery interview.
2. If UI: follow the UI template (below). If UX: follow the UX template.
3. Add the case's metadata to `src/components/case/cases.ts` (hero label, H1, lede, links, facts, title, meta description, tile, next-card teaser) and its slug to `CASE_ORDER`.
4. Draft the page in `src/components/case/pages/<slug>.tsx` from the blocks (see "Available blocks reference").
5. Register it in `PAGES` in `src/app/(home)/work/[slug]/page.tsx` (see "File location and registration").
6. Run the editing passes.
7. Type-check (`npx tsc --noEmit`) and confirm the page renders at `/work/<slug>`.
8. Report what was written and what is left for the user to provide (e.g. legacy screenshot for a before/after).

### B. Rewriting an existing case study

1. Read the existing file first.
2. Run the discovery interview, prefilled with what is already in the file. The user only needs to correct what is wrong.
3. Audit the existing draft against the non-negotiables and the "anti-patterns" list (below). Report what you found before rewriting.
4. Rewrite, run the editing passes, and confirm render.

### C. Auditing a case study

The user asks "audit this case study" or "is this case study any good?". Do not rewrite. Read the file and produce a structured report:

1. **Factual errors.** Things that are wrong (e.g. claims about colours, counts, behaviour).
2. **Unverified assertions.** Things stated with confidence that have no source.
3. **Invented material.** Fake quotes, fake metrics, reverse-engineered "failure modes I designed against".
4. **Missed opportunities.** What would change the texture most (before/after wiring, specifics, constraints, accessibility, team credit, process artifact).
5. **AI-writing tells.** Aphoristic closers, tricolons, em-dash count, perfectly resolved paragraphs, balanced symmetry constructions.
6. **Small things.** Voice consistency, spelling convention, filenames, title typography.

Close with a shortlist of fixes the user can approve before any rewrite.

## UI template

For visual-craft / redesign stories. The reader is here to see craft.

### Default section spine

```
Hero        Label, H1, lede, facts (Company/Role/Scope/Status), link to the
            live URL. Lives in cases.ts; CaseLayout renders it.
Fig. 1      HeroFigure with the project's home-page thumbnail if it has
            one; otherwise the strongest screen as a Fig (PhoneStrip,
            WideImage or BrowserTile).
Impact      Optional Impact strip (4 items). Scope counts are fine here
            when labelled as scope ("Scope", not "Impact").
01 Context  The brief and the scope. One paragraph on what you owned vs
            inherited. Surface one platform / technical constraint.
            Add a team-credit sentence.
02 Audit    What the legacy got wrong, in visible terms (no invented
            research). Use a six-bullet list anchored in the legacy
            screenshot. End with the two or three things you decided
            had to be fixed first.
[Before/after] If a legacy screenshot exists, drop a Pair (legacy left,
               redesign right) between sections 01 and 02. This is the
               single biggest lift a UI case study gets.
03 System   Typography, colour, hierarchy. Three numbered tiers if the
            screens support it. Cite specific named patterns, not
            adjectives. Show what the colour is doing (state) and what
            the typography is doing (one display weight for the one
            important number).
[Figure]    State coverage (4-up). Heating, off, disconnected, locked,
            ready. Whatever the deliverable shows.
04 Pattern  A shared pattern across screens. Most products have one
            (modal vocabulary, card shape, action hierarchy). Name the
            elements that make up the shape (four to six). Show the
            most aggressive variant and the most reassuring variant.
[Figure]    Safety surfaces or pattern variants (3-up).
05 Deep     A specific deep-dive on one mechanic worth explaining
            (temperature picker, schedule add, search). Short. One
            paragraph. Optional 2-up figure.
06 Flows    The repeating user behaviours, with their flow grids.
            Usually 3-up or 4-up. Add a kicker like "SCHEDULE FLOW".
07 Other    Operator-only or secondary surfaces. Short.
Closing     "In closing": one statement paragraph (Closing block). It
            replaced the old Reflection section on every page. Say what
            changed, plainly; no aphorism.
```

### UI blocks in use

```
Section         Every numbered beat (label "01 · Context", H2, paragraphs).
Fig             Every breakout figure, numbered, with a caption.
PhoneStrip      Phone exports, 3-up or 4-up, on an Arctic-style tile.
WideImage       Documents and desktop exports on a tile.
Pair            Before/after, or two related figures.
StateSwitcher / ZoneToggle   Only when the deliverable has real states to step through.
```

Do not use `Results` in a UI case study. Counts are not the point.
Do not use a pull quote unless the user supplied a real quote with attribution.

## UX template

For problem-led product stories. The reader is here to see how you think.

### Default section spine

```
Hero            Label, H1, lede, facts (Company/Role/Team/Status), link to
                the live URL. Lives in cases.ts.
Fig. 1          HeroFigure (home thumbnail) or the strongest composition
                shot as a Fig.
Impact          Impact strip, ONLY with real metrics.
01 Context      The brief and the real constraint. What changed in the
                business or product that made this work necessary.
02 Problem      The real problem (not reverse-engineered). Three problems
                max, in a numbered list with P.01, P.02, P.03 ids. Each
                problem ends with the consequence of not solving it.
03 Process      What you actually did. Specific decisions and the
                rationale. If you tried an approach and rejected it, say
                so. This section earns the case study.
[Figure]        Optional supporting visual.
[Pull quote]    Only if the user provided a real quote.
04 Outcome      What shipped. Real numbers if real numbers exist.
[Results]       Optional Results grid with real metrics only.
Closing         "In closing": one statement paragraph (Closing block).
```

### UX blocks in use

```
Section         Every numbered beat. Problems inside "02 · Problem".
Fig             Supporting visuals and prototypes.
ProtoFrame      Interactive prototypes authored at a fixed size (Carmen's
                Figs 2, 3 and 5 are the reference implementation).
BrowserTile     A static desktop screen in a browser frame.
cs-pull         Pull quote, ONLY with a real attribution.
Impact/Results  ONLY with real metrics.
```

## Available blocks reference

Page frame and data:

- `CASES` in `src/components/case/cases.ts`: per slug, `name`, `title`, `description` (meta), `tile` (`carmen` | `air` | `arctic` | `dexla`; a new project needs a tile colour added in `home.css`), `hero` (`label`, `h1`, `lede`, `links?`, `facts`) and `teaser` (one line for the "Next case" card). Previous/next follow `CASE_ORDER`.
- `CaseLayout({ meta, className?, children })` in `case-layout.tsx`: header, hero, your blocks, previous/next, contact, footer and floating nav. Each page is one `CaseLayout`.
- `HeroFigure({ thumb, caption })`: Fig. 1 from the home thumbnail (`src/components/landing/thumbs/thumbs.tsx`).

Blocks in `src/components/case/blocks.tsx`:

- `Impact({ label, items })`: four `[number, label]` pairs between rules.
- `Body({ toc?, children })`: the 168px "On this page" + 620px reading column. The first `Body` on a page takes `toc` (`{ id, label }[]`, one per labelled section); every later `Body` gets the spacer automatically.
- `Section({ id?, label?, title?, cont?, children })`: a numbered beat, or `cont` for a continuation after a figure (no label or H2).
- `Problems({ items })`: P.01–P.03 rows, `[title, line]` pairs.
- `Results({ items })`: outcome numbers, `[number, sentence]` pairs.
- `Closing({ children })`: "In closing" and one statement paragraph. Always the last section.
- `Fig({ n, caption, id?, children })`: a breakout figure at the full 880px. Close the `Body` before it and open a new one after.
- `BrowserTile({ tile, url, children })`, `PhoneStrip({ tile, phones })`, `WideImage({ tile, img, alt, dark? })`, `Pair` + `PairFig({ n, caption })`.
- `Img({ src, w, h, hi?, alt })`: every image. `src` has no extension; a `@2x.webp` beside it is used when `hi` is set. Always pass the real width and height.

Interactive (client components):

- `ProtoFrame` (`proto-frame.tsx`): a prototype authored at a fixed W × H, scaled to fit, with restart, full size and the phone viewer.
- `ModuleExplorer` (`airstride/module-explorer.tsx`), `StateSwitcher` and `ZoneToggle` (`arctic/state-controls.tsx`): reuse the patterns, not the content.

Images go in `public/work/<slug>/`. `scripts/export-case-images.mjs` shows how originals become checked 1x + 2x WebP files.

## Editing passes

Run these in order on every draft, every time. Do not try to do them all at once.

### Pass 1: Substance audit

Read the draft against the discovery answers.
- Is every claim traceable to something the user told you, or to something visibly true in the deliverable?
- If a sentence is "load-bearing" (carries the case study's argument), can you point to its source?
- Cut every sentence that you cannot back. Even if it sounds good.

### Pass 2: Em-dash and buzzword pass

- Search the file for `—`. Zero instances allowed. Replace each one.
- Search the file for `–` used as punctuation. Same rule.
- Check against the AI buzzword list below. Replace or cut every instance.
- Check spelling convention is UK throughout.

### Pass 3: Aphoristic-closer pass

Read each section's closing sentence aloud (in your head). If it sounds like a quotable LinkedIn caption, cut it.

Tell signs:
- Ends on a tidy reversal ("It needs to be findable, not present.")
- A balanced symmetry ("One vocabulary, two contexts.")
- A short declarative that summarises everything just said
- A snappy four-to-six word sentence after a longer paragraph

Replace with: a normal sentence, a quiet observation, or simply end on the previous sentence.

### Pass 4: Tricolon pass

Search for prose patterns of "A, B, and C" or "X, Y, Z" where all three are roughly equal-weight clauses. These are LLM tells when they appear in body prose (lists of three actual things are fine).

When you find one in prose, recompose: drop one, break into two sentences, or vary the construction.

### Pass 5: Cadence pass

Vary sentence length. The case study should not feel like five medium-length sentences in a row. Sentences should range from three words to twenty-five. Use a fragment when it lands.

### Pass 6: Specificity pass

For every abstract noun (clarity, approachability, hierarchy, system, vocabulary), check if a more concrete substitute would work.

Bad: "The redesign improved clarity."
Better: "The temperature became readable from across the room."

### Pass 7: Anti-pattern pass

Search the draft for these and rewrite or cut:

- "Three failures I designed against" / any "N failures I solved" framing where the failures are not from research the user actually ran
- "Anyone, untrained, could operate it on the first try" (or any version of this aspirational claim)
- Wellness-manager / front-desk / "user X opens this once a month" frequency claims (unless the user told you)
- "The app refuses to show a spinner" style sentences that anthropomorphise the product
- "From first tap to last" / "from end to end" / "across the entire journey" rhetorical sweeps
- "I built this so X" where X is a generic virtue
- Numbers that round suspiciously ("ninety days", "Q1 2026", "100% goal completion" in user-context). Round numbers feel invented.

## AI buzzwords to ban

Strip these from every draft. Replace with plain language.

- **Verbs:** leverage, utilize, unlock, unleash, harness, elevate, empower, streamline, optimise, enhance, revolutionise, delve, dive into
- **Adjectives:** seamless, robust, comprehensive, holistic, transformative, cutting-edge, intuitive (when vague), thoughtful (when vague), beautiful (when vague)
- **Phrases:** navigate the landscape, the world of X, the realm of X, the journey of X, at the heart of, at the intersection of, the essence of
- **Openers:** it's important to note, it's worth noting, in today's fast-paced world, in the digital age, whether you're X or Y
- **Constructions:** not just X, it's Y; not only X but also Y; X is the new Y

If the user wrote one in the discovery answers, do not echo it in the draft. Rewrite to plain.

## Voice rules

- **Use "I" sparingly.** A senior designer does not need to remind the reader who did the work. "I owned the visual system" once is fine. "I owned, I drove, I led" everywhere reads as ego.
- **Credit the team at least once.** Even when solo. There is always a hardware partner, a product owner, a platform you inherited from. Name them.
- **Surface a constraint.** Real design has friction. A case study that reads frictionless reads fake. Even one sentence ("Tuya's pairing flow was not mine to redesign") changes the texture.
- **Show one specific thing.** A token name, a real copy string from the design, a specific pattern count. Not invented numbers, but real specifics.
- **End by stopping.** "In closing" is the last section. Do not write a "and that is the story of how" closing. The last paragraph ends and the reader moves on.

## Output format

When delivering a case study `.tsx` file, also report:

- Slug, files written, and the registration changes (cases.ts, PAGES, home card).
- Section spine you used.
- Anything the user still needs to supply (e.g. legacy screenshot for the before/after block).
- Type-check + render confirmation.

When delivering an audit (workflow C), return the structured audit. Do not start writing fixes until the user approves the shortlist.

## When in doubt

- If a sentence sounds quotable, it is probably wrong for a case study. A senior memo does not produce quotables.
- If you cannot point to where a fact came from, do not write it.
- If the user asks you to "just make something up about outcomes", refuse politely and either describe what is visibly true in the deliverable or skip the outcomes block entirely.
- If the case study is going to be thin without invented material, that is a signal to make it shorter, not to fabricate. A short honest case study beats a long fake one.
- If you are about to write a section that begins "Three things I learned" or "Five principles", stop. Lists of N principles are an LLM tell.

## File location and registration

A new case study is shipped by:

1. Adding its entry to `CASES` and its slug to `CASE_ORDER` in `src/components/case/cases.ts` (the `CaseSlug` type lists the slugs).
2. Writing `src/components/case/pages/<slug>.tsx` exporting a named component (e.g. `ArcticEdgeCase`) that returns one `CaseLayout`.
3. Registering it in `PAGES` in `src/app/(home)/work/[slug]/page.tsx`.
4. Adding its card to the home page work grid in `src/app/(home)/page.tsx` (and a thumbnail scene if it should animate), and its entry in `src/lib/projects.ts`, which the retired /work index still reads. The sitemap follows `CASE_ORDER`. Ask the user for the card copy rather than writing it.
5. Verifying the route at `/work/<slug>` renders, then comparing it with the handoff template at 1440, 1024 and 390px.

The slug must match the route param exactly. Filenames with spaces in `/public/work/<slug>/` work but are fragile. Prefer kebab-case for new exports when possible.
