# waande.com case studies: build handoff

This handoff covers the four redesigned case studies: Carmen, Airstride, Arctic Edge and Dexla. It continues the home-page handoff (`waande-handoff/HANDOFF.md`). The home page is already live, so reuse its tokens, fonts, tile system, thumbnail timelines, theme toggle and floating nav instead of re-implementing them.

## 0. Read this first

- **Source of truth.** The files `reference/carmen.html`, `reference/airstride.html`, `reference/arctic.html` and `reference/dexla.html` are approved, working prototypes. Open each one in a browser before writing code. Every size, colour, piece of copy and interaction comes from these files. If this brief and a reference file disagree, the reference wins.
- **Don't redesign.** Don't add sections, effects or libraries. Don't rewrite the copy; it's final. If something looks wrong, ask Ayo.
- **Routes.** Keep the existing URLs: `/work/carmen-ai`, `/work/airstride`, `/work/arctic-edge` and `/work/dexla-design-system`.
- **One template, four pages.** Build a single `CaseStudy` layout plus a small set of blocks (section 3), then compose each page from those blocks with the content in section 5. Don't build four bespoke pages.
- **Motion and interaction need a human check.** You can only verify with screenshots, so use the checkpoints in section 8, then ask Ayo to click through every prototype in a real browser.

## 1. Bundle contents

```
HANDOFF.md
reference/carmen.html      reference/airstride.html
reference/arctic.html      reference/dexla.html
assets/*.webp              57 images, named by key (see section 7)
```

The reference pages are self-contained: images are inlined as data URIs. In production, load the images from `/public/work/<slug>/` instead.

## 2. Site chrome (shared with the live home page)

**Header**
- "Ayowande Olubo" on the left, linking home.
- A round theme toggle on the right: 38px, 1px `--line` border, `--surface` fill.
  - It shows a sun in dark mode and a moon in light mode, matching the live site.
  - It sets `data-theme` on `<html>` and saves the choice in `localStorage('theme')`. Wrap storage access in try/catch.
- Reuse the live home component.

**Floating nav pill (Work, About, Contact)**
- Fixed at bottom centre, `bottom: 18px + env(safe-area-inset-bottom)`.
- Background:
  - Light mode: `rgba(20,20,19,.92)` with light text.
  - Dark mode: `rgba(34,34,33,.92)` with a 1px `rgba(255,255,255,.08)` inner ring.
- Labels are mono, 12.5px, uppercase, `.08em` tracking. The active item ("Work" on case pages) gets a 14% text-colour wash and `aria-current="page"`.
- It stays hidden until the hero has scrolled out of view (hero bottom less than 80px from the top of the viewport). It then slides up over .45s with `cubic-bezier(.2,.7,.2,1)`.
- It hides while a prototype is open full size.
- The footer gets `padding-bottom: 96px + safe-area` so the pill never covers it.
- **Recommendation for the live home page:** apply the same "appear after hero" rule there, so the pill doesn't sit on the work tiles in the first viewport.

**Contact section and footer:** identical to the home page.

## 3. Template blocks

The page column is the home `.wrap` (880px). Body text sits in a narrower reading column.

| Block | Spec |
|---|---|
| **Hero** (`.cs-hero`) | Contents, in order:<br>• "← All work" (mono, `--faint`)<br>• Mono uppercase label, e.g. "Case 01 · AI partner acquisition"<br>• H1: 28–40px, weight 500, `-.028em` tracking, max 22ch, balanced<br>• Lede: 17px, `--muted`, max 60ch<br>• Optional link buttons (`.cs-links`, home `.btn` styles)<br>• Facts `<dl>`: 4 columns (2 below 640px), top border, mono uppercase `dt` |
| **Hero figure** | The project's animated thumbnail from the home page: same component, same timeline, same hover-to-inspect loupe, at full column width. Caption below. |
| **Impact strip** (`.cs-impact`) | 4 columns (2 below 640px) between top and bottom borders. Number: 30px weight 500, tabular figures. Label: 13px `--muted`. |
| **Body grid** (`.cs-body`) | `168px` sticky "On this page" TOC, then a `620px` main column, with a 48px gap.<br>• TOC links have a 1.5px left rule. The active section's rule turns `--fg`, tracked with an IntersectionObserver (rootMargin `-30% 0 -60% 0`).<br>• Below 860px the TOC is hidden. |
| **Section** (`.cs-sec`) | Mono label ("01 · Context"), H2 (22–27px, 500), then paragraphs at 16px / 1.7 in `--fg2` (#3a3935 light, #c9c8c2 dark).<br>• A continuation section (`.cs-cont`) has no label or H2 and 28px top padding.<br>• Important: page-level `section` styles must not leak into prototypes (see section 4). |
| **Problems list** | Numbered rows "P.01–P.03". Each has a mono number column of 52px, a bold title and a muted line, with a border-top on every row. |
| **Breakout figure** (`.cs-fig`) | Figures break out of the reading column to the full 880px. Caption: mono 12px, with "Fig. N" in `--fg`.<br>• Close the body grid before the figure and reopen it after.<br>• Keep the empty TOC spacer column so the text stays aligned. |
| **Tile** | The home tile system: `data-tile="carmen" / "air" / "arctic" / "dexla"`, the same gradients, grain, inner edge and tinted shadow. Static tiles don't animate. |
| **Phone strip** (`.phs`) | Phones in a grid with `--n` columns, max width `n × 210px`, on a tile.<br>• Each phone: radius `11% / 5.1%`, a soft shadow, and a mono uppercase label underneath.<br>• Below 640px it becomes a horizontal scroll-snap row with each phone at 46% width. |
| **Wide image** (`.wimg.pad`) | An image on a tile with 5% / 6% padding, 8px radius and the tinted shadow. The `.dark` variant uses a near-black tile. |
| **Pair** (`.cs-pair`) | Two figures in a 1.25fr / 1fr grid, stacking below 640px. |
| **Closing** (`#closing`) | Label "In closing" plus one statement paragraph at 18–21px in `--fg`. This replaced the old "Reflection" sections on every page. |
| **Next nav** (`.cs-next`) | "← Previous" plus the case name on the left, and a "Next case →" card with a still tile thumbnail, name and one line on the right. The thumbnail lifts 2px on hover. Order: Carmen → Airstride → Arctic Edge → Dexla → Carmen. |

## 4. Interactive components

### 4.1 Prototype frame: Carmen only

Every Carmen prototype keeps the exact shape of its Figma frame at every width.

- **Authoring and scaling.** Each prototype is authored at fixed pixel size inside `.pstage`:
  - onboarding and chat: 1440 × 1156
  - LinkedIn: 1000 × 690
  The stage is scaled as one piece with `transform: scale(viewWidth / W)`, driven by a ResizeObserver. The `.pview` height is `H × scale`. Never let the prototype reflow.
- **Browser chrome.** The bar shows a URL label plus two controls:
  - ↺ Restart: resets that prototype's state machine.
  - ⤢ Full size: fixed overlay with 16px insets and a blurred backdrop, letterboxed with `min(w/W, h/H)`. Close with Esc, ✕ or a backdrop click, then return focus to the trigger.
- **Phones (viewport ≤ 720px).**
  - The prototype shows as a non-interactive preview with a bottom gradient, an "Open prototype ⤢" pill and a "Best on desktop" note.
  - Tapping it opens a full-screen viewer:
    - The prototype renders at `scale = clamp(.5, viewWidth/W, 1)` using CSS `zoom`, so it scrolls and pans natively inside the viewer.
    - A hint reads "Drag to look around · Turn your phone sideways for the best view". It fades after 4.2s, and the sideways line is hidden in landscape.
- **Isolation.** Prototype CSS must be scoped so page styles (section borders, padding) can't reach it. In the reference this is `.pstage section { border-top: 0 }`. In a component framework, use CSS Modules or a wrapper scope.
- **Light only.** The prototype interiors are always light, because they are the product UI. They set `color-scheme: light` and use Inter.

### 4.2 Carmen prototypes

Rebuild these from the reference HTML. Keep the copy and states exactly.

**Fig. 2: setup flow.** The left panel `fa_left` is fixed. The steps follow the Figma file:
1. Create your organisation. The fields are prefilled with Airstride and airstride.ai.
2. Setting up your account. The "In progress" task fills its bar over 1.7s, then shows Completed.
3. Research completed, with a Carmen card, Your Business and Your Market.
   - "Adjust research" turns the tags into toggles; struck-through means excluded.
   - The note text changes while adjusting.
4. Scanning the partner database. Three tasks complete in sequence over about 1.4s and then 1.2s.
5. Partner cards, one at a time: "N of 5" dashes, a match ring that animates to the score, a facts panel, "Why Carmen matched you", and Not a fit / Good match.
6. Review your matches. Rows are built from the visitor's choices with a 70ms stagger. Edit choices restarts at card 1.
7. Saving modal over the blurred Campaign Creator shell. After 2.2s it changes to Match preferences saved, and "Find more partners in chat" scrolls to Fig. 3.
- **Sample data.** CloudBridge's card content is real, from Figma. Partners 2–5 (TechSavvy, GreenWave, DataPulse, NextGen) use placeholder scores, facts and reasons. Ask Ayo for the real values.

**Fig. 3: campaign chat** inside the real app shell (sidebar, Platform/Agent toggle, empty campaign card, Connect LinkedIn and Email chips).
- It opens on the feedback summary.
- Suggestion chips and free text both work. Carmen shows a typing indicator for 900ms per line and gives two replies.
- The used chip disappears, and "Start over" restores the original state.

**Fig. 4: command center.** The full screen `cs_command` sits in a browser frame and scrolls inside it, with `height: min(560px, 62vw)`.

**Fig. 5: LinkedIn connection** (full app shell, 1000 × 690). Views:
1. Credentials, beside What you'll need, the setup guide and Need help.
2. 2FA: open LinkedIn settings, the yellow example-key box, and the Paste button that fills a sample key and enables Verify. Beside it: visual steps and the three authenticator apps.
3. Verifying modal (1.8s).
4. Either the success view (seal, profile card, Create your first campaign, trust notes) or the Connection failed modal (three causes, Try again, Contact support).

After success:
- The sidebar badge changes from "Not connected" to "Connected".
- Clicking LinkedIn in the sidebar opens connected settings: Reconnect, and a red Disconnect that returns to step 1.
- The "Verification result: Succeeds / Fails" switch sits under the frame.
- The email and password fields are display-only. Never render real inputs for credentials.

### 4.3 Arctic Edge components
- **State switcher (Fig. 2).**
  - Layout: the phone (max 230px) on the left and a list of five states on the right: Cooling, Heating, System off, No connection, Locked.
  - Item states: the active item shows its description and a 2px `#7c8cff` rule; inactive items show only the title.
  - The images cross-fade over .45s.
  - It auto-advances every 3.2s while at least 40% is in view, and stops for good once someone clicks a state. No auto-advance with reduced motion.
  - Below 640px it stacks.
- **Zone toggle (Fig. 4).** A pill segmented control, "❄ Cold zone · 17°C" and "≋ Warm zone · 28°C", cross-fades the Set temperature sheet (phone max 200px).
- **Phone strips:**
  - Fig. 3: lock, connection lost, force start.
  - Fig. 5: schedules, add · power on, add · power off, confirmed.
  - Fig. 6: set, active, complete, settings.

### 4.4 Airstride module explorer (Fig. 2)
- **Tabs.** Seven tabs in this order: Overview, Deals, Account mapping, Analytics, Partner training, Content library, Engagement.
  - The active tab is filled with `--fg` and uses `role="tablist"` with arrow-key support.
  - The row scrolls horizontally on phones.
- **Frame.** Below the tabs, a browser frame whose URL label changes to `app.airstride.ai/<slug>`. Under the frame sit the module number, heading and one line of text.
- **Production change.** The reference shows still frames with a "▶ Play live demo" pill linking out. In production, embed Ayo's existing demos inside the frame instead:
  - Use `/work/airstride/<slug>-demo/index.html` as a same-origin `<iframe loading="lazy">`. Slugs: `overview`, `deals`, `account-mapping`, `analytics`, `partner-training`, `content-library`, `engagement`.
  - Only mount the active tab's iframe, and unmount the others when switching.
  - Keep the still image as the poster until the iframe loads.
  - On phones, use the same preview and viewer pattern as 4.1.

## 5. Page content

Copy every string from the matching reference file. Structure summary:

**Carmen** (`reference/carmen.html`)
- Hero: Case 01 · AI partner acquisition.
- Impact: 3.4× qualified partner conversations per rep · 71% less time on manual sourcing · 18.9% average reply rate · 9 min to launch a campaign.
- Sections:
  1. Context, with P.01–P.03.
  2. Configure: Fig. 2, then Fig. 3, then a pull quote.
  3. Command: Fig. 4, then three decision close-ups (`cs_stats`, `cs_timeline`, and `cs_toast` + `cs_head`).
  4. Connect: Fig. 5, then the failure paragraph.
  5. Outcome, with the results grid.
  6. In closing.

**Airstride** (`reference/airstride.html`)
- Hero: Case 02 · Partner management platform. Links: "See it live" (https://app.airstride.ai) and "Visit airstride.ai".
- Impact: 6 modules · 1 designer · 84% marketing-site conversion lift · preferred by paying customers.
- Sections: Context · Problems (P.01–P.03) · The modules (explorer plus the cross-module paragraph) · In closing.

**Arctic Edge** (`reference/arctic.html`)
- Hero: Case 03. Link: "Visit Arctic Edge" (https://www.arcticedge.me/).
- Scope strip: 1 / 5 / 5 / 18.
- Sections: Context · The audit (P.01–P.03) · The system (state switcher) · Safety surfaces (strip) · Temperature (zone toggle) · Schedule and session (two strips) · In closing.

**Dexla** (`reference/dexla.html`)
- Hero: Case 04. Link: "Read the docs on Notion" (https://dexlads.notion.site/Design-System-Dexla-s-18791097c89f80b09293ca85162b2fb2).
- Deliverables strip.
- Sections:
  1. Context: brand at day one (`dx_brand`).
  2. Problems.
  3. Process: Atomic Design map on a dark tile (`dx_atomic`), the no-code editor (`dx_editor`), then a pair of component pages (`dx_components`) and alert docs (`dx_docs`).
  4. In closing.

## 6. SEO, performance, accessibility

Ayo sells websites and SEO, so these pages are part of the pitch.

**Metadata, per page**
- Title: "<Case> · Ayowande Olubo".
- Meta description: use the `<meta name="description">` from each reference file.
- Canonical URL.
- Open Graph and Twitter cards with a 1200×630 image built from the case H1 on its tile gradient.
- JSON-LD `CreativeWork` with `author` → the same `Person` as the home page.
- Add all four routes to `sitemap.xml`.

**Performance**
- Lazy-load every image and iframe below the hero.
- Serve 2× WebP or AVIF with explicit width and height, so nothing shifts as it loads.
- Animate only `transform`, `opacity`, `clip-path` and `filter`.
- Pause loops and auto-advance when they're off screen or the tab is hidden.
- Target Lighthouse ≥ 95 on mobile.

**Accessibility**
- One H1 per page, with H2s for sections.
- Every image has the alt text from the reference.
- The tabs, state switcher and zone toggle are keyboard-operable with `aria-pressed` / `aria-selected`.
- Focus rings follow the home page.
- With reduced motion: no autoplay or auto-advance, and every component shows its rest state.

## 7. Assets

The files in `assets/` are 1× captures. For production, use Ayo's originals at 2×:

- **Arctic Edge (`ae_*`).** These come from `/work/arctic-edge/*.png` on the live site, so the originals are already in the repo. Mapping:

  | Key | Original file |
  |---|---|
  | `ae_cool` | `Cooling` |
  | `ae_heat` | `Heating` |
  | `ae_off` | `System on` |
  | `ae_noconn` | `System on-2` |
  | `ae_locked` | `Locked indicator in interface` |
  | `ae_lockm` | `Lock confirmation modal` |
  | `ae_connlost` | `System on-3` |
  | `ae_force` | `Force start` |
  | `ae_tcold` | `Set temperature` |
  | `ae_twarm` | `Set temperature-1` |
  | `ae_sched` | `Timing sessions` |
  | `ae_add_on` | `Timing sessions-6` |
  | `ae_add_off` | `Timing sessions-7` |
  | `ae_added` | `Session added` |
  | `ae_timer` | `Session timer` |
  | `ae_active` | `Session timer-2` |
  | `ae_done` | `Session timer-1` |
  | `ae_settings` | `Timing sessions-1` |

  `ae_cover` is the Arctic Edge cover. On the live site it's wrongly served as Dexla's `04-style-guide.png`.

- **Dexla (`dx_*`).** These come from `/work/dexla-design-system/`:

  | Key | Original file |
  |---|---|
  | `dx_brand` | `02-problem` |
  | `dx_atomic` | `05-atomic-design` |
  | `dx_editor` | `07-no-code-editor` |
  | `dx_components` | `06-core-components` |
  | `dx_docs` | `09-documentation` |

- **Airstride posters (`as_*`).** These are first frames of the live demos. In production, capture posters from the demos at 2× or use the iframe.
- **Carmen.**
  - `cs_*`, `c_*` and `a_*` are crops of the Ayostride Figma file `vwDdZdo2eN64qSr1aHooSH`. Their frame IDs and crop boxes are listed in the home handoff, section 7.
  - `fa_left`, `fa_av` and `fa_logo` came from Ayo's screenshots of the onboarding frames. Re-export them from the "Configure campaign from sign up" row in the same file.
  - `r_cool` and `r_heat` are the Arctic Edge hero tile frames: file `PZTu0Dqb8w4wOWDxUVSw1l`, nodes `274:10510` and `107:1239`.

## 8. Verification

- [ ] At 1440, 1024 and 390px, in light and dark, each page is visually identical to its reference file.
- [ ] The pill is hidden in the hero, appears after the hero, hides when a prototype is full size, and never covers the footer.
- [ ] The theme toggle persists across pages and reloads.
- [ ] Carmen Fig. 2 can be walked end to end: org → setup → research (with adjust) → scan → 5 cards → review → saving → saved → scrolls to chat.
- [ ] Carmen Fig. 5: success path, failure path → Try again → success, Connected settings, Disconnect.
- [ ] ↺ and ⤢ work on every prototype. At 390px, the preview, "Open prototype" and the pannable viewer all work.
- [ ] The Arctic switcher auto-advances, stops after a click, and the zone toggle works.
- [ ] Airstride tabs switch modules (arrow keys too), and only one demo iframe is mounted at a time.
- [ ] No horizontal page scroll at 390px. No console errors.
- [ ] Lighthouse mobile ≥ 95 on every route.
- [ ] Ayo has clicked through every prototype in a real browser.

## 9. Open items for Ayo

- **Dexla image fix.** Replace the image wrongly served as Dexla's `04-style-guide.png` (it's the Arctic Edge cover). If a real Dexla style-guide image exists, it can lead the Dexla Process section.
- **Carmen sample data.** Real scores, facts and reasons for partners 2–5 in the Carmen setup prototype.
- **Carmen link.** Confirm the "See Carmen live" URL, if he wants that link back.
- **Home page fixes.** From the landing review:
  - Start each thumbnail loop with a 1–2s hold on the full screen before the first zoom.
  - Apply the "appear after hero" rule to the floating pill.
