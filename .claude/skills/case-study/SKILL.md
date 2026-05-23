---
name: case-study
description: Drafts portfolio case studies for src/components/case-study in the voice of a senior UX/UI designer that a recruiter would take seriously. Always asks UI vs UX template upfront, then runs a short discovery interview (real brief, real scope, real constraints, real outcomes, what NOT to claim) before writing a single sentence. Strips em-dashes, AI buzzwords, invented quotes, fake metrics, reverse-engineered "failure modes I designed against", and the over-tidy aphoristic closers that mark writing as machine-made. Outputs a registered .tsx component using the existing case-study primitives. Use this skill whenever the user says "create a case study", "draft a case study", "write up X as a case study", "add a case study for X", "case study for my portfolio", "make Y a UI/UX case study", or pastes project material and asks for a case study from it.
---

# Portfolio Case Study Skill

You are helping a senior product designer write portfolio case studies. The reader is a hiring manager or design recruiter who has seen a thousand of these. Your job is to produce a case study that survives a critical first scan, then rewards a deeper read.

The output is a `.tsx` file under `src/components/case-study/`, registered in `src/components/case-study/registry.ts`, that renders inside the existing route at `/work/[slug]`.

## The two non-negotiables

These are the things that, if violated, mark the case study as fake. They are absolute. If the user pressures you to do these, push back.

### 1. Never invent material

Never write, even when invited to "just put something believable":

- **Pull quotes attributed to people.** No "Director of X · Y account · Pilot" testimonials. If the user has a real quote with a real attribution, use it. Otherwise, no `CasePullQuote`.
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
3. Draft the `.tsx` file in `src/components/case-study/<slug>.tsx`.
4. Register the slug in `src/components/case-study/registry.ts`.
5. Verify the slug exists in `src/lib/projects.ts`. If not, add an entry (ask the user for the work-card metadata).
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
Hero        Title, lede, meta (Client/Role/Scope/Status), CTA to live URL.
Cover       One CaseFigure with the strongest hero screen, priority load.
01 Context  The brief and the scope. One paragraph on what you owned vs
            inherited. Surface one platform / technical constraint.
            Add a team-credit sentence.
02 Audit    What the legacy got wrong, in visible terms (no invented
            research). Use a six-bullet list anchored in the legacy
            screenshot. End with the two or three things you decided
            had to be fixed first.
[BeforeAfter]  If a legacy screenshot exists, drop a CaseBeforeAfter
               between sections 01 and 02. This is the single biggest
               lift a UI case study gets.
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
08 Reflect  What you would honestly revisit. Specific, not generic.
            Two short paragraphs.
```

### UI primitives in use

```
CaseHero        Always. Meta, title, lede, optional cta.
CaseFigure      Most blocks. Flush surface for phone exports.
CaseSection     Every numbered beat.
CaseBeforeAfter When a legacy screenshot is provided.
```

Do not use `CaseStats` in a UI case study. Counts are not the point.
Do not use `CasePullQuote` unless the user supplied a real quote with attribution.

## UX template

For problem-led product stories. The reader is here to see how you think.

### Default section spine

```
Hero            Title, lede, meta (Client/Role/Team/Status), CTA to live URL.
Cover           CaseCover with an italic glyph or a CaseFigure with a
                hero composition shot.
01 Context      The brief and the real constraint. What changed in the
                business or product that made this work necessary.
02 Problem      The real problem (not reverse-engineered). Three problems
                max, in a numbered list with P.01, P.02, P.03 ids. Each
                problem ends with the consequence of not solving it.
[ImageBlock]    A typographic principle separator with the guiding
                equation or framing sentence.
03 Process      What you actually did. Specific decisions and the
                rationale. If you tried an approach and rejected it, say
                so. This section earns the case study.
[Figure]        Optional supporting visual.
[PullQuote]     Only if the user provided a real quote.
04 Outcome      What shipped. Real numbers if real numbers exist.
[Stats]         Optional CaseStats with real metrics only.
05 Reflection   What you would do differently. Honest and specific.
```

### UX primitives in use

```
CaseHero        Always.
CaseCover       Often. The italic-glyph hero is the UX template's signature.
CaseSection     Every numbered beat.
CaseImageBlock  For typographic principle separators.
CasePullQuote   ONLY with a real attribution.
CaseStats       ONLY with real metrics.
CaseFigure      Optional, for process artifacts or supporting visuals.
```

## Available primitives reference

All live under `src/components/case-study/`:

- `CaseHero({ meta, title, lede, cta? })`. `cta` is `{ label, href }`. External URLs auto-open in a new tab.
- `CaseCover({ glyph, caption, index?, frame? })`. Italic-glyph hero placeholder, useful when imagery is not ready.
- `CaseSection({ step, title, children })`. The two-column numbered narrative beat.
- `CaseFigure({ images, caption?, kicker?, priority?, surface? })`. `surface: "flush"` (default, phone exports) or `"tile"` (documents). 1, 2, 3, or 4-up.
- `CaseBeforeAfter({ before, after, kicker?, caption? })`. Side-by-side comparison.
- `CaseImageBlock({ caption, display?, kicker? })`. Typographic principle separator.
- `CasePullQuote({ quote, attribution })`. Only with real quotes.
- `CaseStats({ stats })`. Real metrics only.
- `CaseInProgress({ project })`. Fallback for un-written case studies.

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
- **End by stopping.** The reflection section is the last section. Do not write a "and that is the story of how" closing. The last paragraph ends and the reader moves on.

## Output format

When delivering a case study `.tsx` file, also report:

- Slug, location, registry change.
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

1. Writing `src/components/case-study/<slug>.tsx` exporting a named component (e.g. `ArcticEdgeCase`).
2. Importing and registering it in `src/components/case-study/registry.ts` under the slug key.
3. Confirming an entry exists in `src/lib/projects.ts` for the slug. If not, prompt the user for the work-card fields (title, summary, year, role, tags, category, cardGradient, cardImage).
4. Verifying the route at `/work/<slug>` renders.

The slug must match the route param exactly. Filenames with spaces in `/public/work/<slug>/` work but are fragile. Prefer kebab-case for new exports when possible.
