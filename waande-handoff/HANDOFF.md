# waande.com redesign: build handoff

This is the brief for building Ayowande Olubo's portfolio. The design is finished and approved. Your job is to put it into the real site at production quality, matching the reference exactly, motion included.

## 0. Read this first

- **Source of truth:** `reference/index.html`. It is a working prototype. Open it in a browser before you write any code. Every color, size, piece of copy and animation timing comes from that file. Where this brief and the file disagree, the file wins.
- **Don't redesign anything.** Don't swap fonts, change copy, or add sections, effects or libraries the reference doesn't use. If something seems wrong, ask instead of improving it.
- **Find the existing stack first.** Inspect the repo for framework, styling and deploy setup and build in that stack. If there is no repo yet, use Next.js (App Router) + TypeScript + plain CSS or CSS Modules, and use **Framer Motion** for the thumbnail timelines. The reference is plain HTML/CSS/JS, so a direct port is also fine.
- **You can't watch motion play.** Verify motion with screenshots at the timestamps listed in section 6, then ask Ayo to review the motion in a real browser.

## 1. Bundle contents

```
HANDOFF.md            this brief
reference/index.html  the approved prototype (self-contained; images inlined as data URIs)
assets/*.webp         the same images as files, named by project and step
```

The images are **1x exports**. For production, re-export them at **2x** from Figma (section 7) and keep every CSS coordinate in 1x units. All overlay positions in the reference assume the 1x frame coordinates.

## 2. Layout and tokens

- **Column:** one centred column, `max-width: 880px`. The side gutter is `max(16px, env(safe-area-inset-left/right))`.
- **Fonts:** Geist (400/500/600) for text and Geist Mono for labels and metadata, both from Google Fonts. Prefer `next/font` or self-hosting over a render-blocking `<link>`.
- **Section rhythm:** each section has `border-top: 1px solid var(--line)` and `padding-block: 40px`. Section labels are mono, 11.5px, uppercase, `letter-spacing: .08em`.
- **Theme:** light and dark through `prefers-color-scheme`, plus a `data-theme` override.

Base tokens, light / dark:

| token | light | dark |
|---|---|---|
| --bg | #f7f7f5 | #0f0f0e |
| --surface | #ffffff | #171716 |
| --fg | #141413 | #ededea |
| --muted | #6b6a65 | #9a9993 |
| --faint | #a19f99 | #64635e |
| --line | #e6e5e0 | #262624 |
| --accent (focus ring) | #3d5bd9 | #8c9cff |
| --ok (status dot) | #2f8a57 | #5cc28a |

Each thumbnail tile takes its colour from the product it frames. The per-tile tokens `--base --hi --mid --deep --sh --edge --lip` are in the reference under `[data-play="…"]`, with dark variants. Every tile is built from the same layers:

1. A three-stop radial gradient over `--base`: light top-left `--hi`, `--deep` bottom-right, `--mid` bottom-left.
2. Film grain from an inline SVG `feTurbulence` at `mix-blend-mode: soft-light`, opacity .22 (.35 on Arctic Edge).
3. A 1px inner edge and a top highlight line done as inset shadows.
4. The window shadow tinted with the tile's own colour (`--sh`).
5. On hover, a soft top light fades in (`::after`, opacity 0 → .7).

## 3. Page structure and copy (verbatim)

The copy is final. Copy it from `reference/index.html`. In summary:

1. **Header:** "Ayowande Olubo" on the left, and Work / About / Contact anchors on the right.
2. **Intro:**
   - **H1:** "Product designer for early‑stage AI and SaaS teams." followed by a muted span that never wraps: "I design it, then I ship it." The hyphen in "early‑stage" is non-breaking (U+2011).
   - **Paragraph:** links to the Airstride and Dexla case studies.
   - **Status line (mono):** a green dot, "Open to founding designer and design engineer roles", "Abuja, Nigeria · {live Africa/Lagos time} local".
   - **Buttons:** Book a call (primary, Calendly), Résumé (Google Drive), GitHub ↗ (github.com/wandeayo).
3. **Selected work:** a 2-column grid (1 column under 640px). Order: Carmen · Airstride, Airstride, Arctic Edge, Dexla Design System. Each card is a link to its case study: `/work/carmen-ai`, `/work/airstride`, `/work/arctic-edge`, `/work/dexla-design-system`. Each card has the animated thumbnail, then title + year, a one-line description, and a role line in mono.
4. **What I do:** a 2×2 grid: AI and agentic interfaces, SaaS tools and dashboards, Design engineering, Websites and SEO.
5. **Background:** three rows: Embedded with founding teams, Designing and shipping, Microbiology.
6. **Kind words:** see section 5.
7. **Contact:**
   - **Heading:** "Building something early and need a designer who can ship? Let's talk."
   - **Email:** shown as selectable text, with a Copy email button (clipboard, falling back to selecting the text).
   - **Buttons and links:** Book a call, then LinkedIn, GitHub, X, Dribbble, Instagram.
8. **Footer:** "© 2026 Ayowande Olubo" and "Designed and built by hand, mostly".

## 4. Thumbnail system

### Frame

- **Tile:** aspect 4:3, radius 12px, styled as in section 2.
- **Desktop projects (Carmen, Airstride, Dexla):** a browser window, `left/right: 6%`, centred vertically, radius 8px.
  - Chrome bar height is `padding-top: 3.2%` of window width, with three grey dots.
  - Below the bar is a `.view` at `aspect-ratio: 10/7`.
  - Inside the view, a **stage** is authored at **1440 × 1008** and scaled to fit with `transform: scale(viewWidth / 1440)`, updated by a ResizeObserver.
- **Arctic Edge:** no window. A stage authored at **1440 × 1080** fills the tile.
  - Phone at `left: 519px; top: 80px; 402 × 874; radius: 52px`, with a 10px black bezel ring.
  - A radial glow behind the phone shifts from blue (cooling) to red (heating).

### Camera

Every stage has a `.cam` wrapper holding all layers and the cursor. It is driven by `--ox --oy --z` as `transform-origin: var(--ox) var(--oy); transform: scale(var(--z))`.

- **Scripted moves:** transition 1s `cubic-bezier(.65,0,.35,1)` on both `transform` and `transform-origin`. Each scripted move saves its framing (`_saved`) so that hover can restore it.
- **Inspect mode (`.inspect`):** `transform` .55s `cubic-bezier(.2,.7,.2,1)` and `transform-origin` .25s ease-out.

### Cursor

- An SVG arrow, 58px in stage units, with a drop shadow. It moves with `transform: translate()` over a configurable duration using `cubic-bezier(.45,0,.2,1)`.
- **Click:** the cursor scales to .84 for 150ms, and a blue ring ripples out from its tip over .55s.
- **Inside a zooming camera:** the cursor SVG is counter-scaled with `scale(calc(var(--cd,1) / var(--z,1)))` so it keeps the same size on screen.

### Playback rules

- **Autoplay:** each thumbnail plays its timeline in a loop while at least 35% of it is in the viewport (IntersectionObserver). It stops and resets when it leaves.
- **Stagger:** the first start is staggered by `index × 900ms` so the tiles never move in sync.
- **Hidden tab:** all loops stop while `document.hidden`.
- **Hover (fine pointer only):** the timeline **freezes in place**. Every scripted `wait()` checks a `held` flag, so it pauses mid-story instead of resetting. The scripted cursor hides, and the camera becomes a loupe that follows the pointer: zoom **1.6×** on desktop projects, **2.4×** on Arctic Edge, with the origin clamped to the stage bounds. On pointer leave, the camera returns to its saved framing over ~450ms and the timeline resumes from where it stopped.
- **`prefers-reduced-motion: reduce`:** no autoplay, no transitions, and every tile shows its rest frame.
- **Rest frames:**
  - Carmen: the campaign-running view.
  - Airstride: the deals board.
  - Arctic Edge: Cooling.
  - Dexla: light mode, radius 6px, neutral brand colour.

## 5. Kind words

The section shows one testimonial at a time.

- **Layout:**
  - **Desktop:** `grid-template-columns: 220px 1fr; gap: 64px`.
  - **People list (left):** each person is a `button role="tab"`. Inactive names show in `--faint`. The selected name shows in `--fg` with the role revealed underneath in mono.
  - **Progress line:** a 1.5px line runs beside each name and fills over the active quote's duration.
- **Quote area (right):** all six quotes are stacked in one grid cell, so the height equals the longest quote and nothing shifts. The active quote fades and rises 6px over .45s. Quote text is 18–21px with hanging punctuation (`text-indent: -.42em`), followed by the name and role.
- **Counter:** "01 / 06" at the top right of the section header.
- **Order:** Max Edwards, Hugo Rawlinson, Tom McDonough, Ibrahim Bashir, Williams Balogun, Valeria Cuciniello. The quotes are verbatim and in the reference.
- **Auto-advance:** **6s** per quote, only while the section is at least 40% in view. It pauses on hover and while the tab is hidden, and resumes with the remaining time. Click a name or use the arrow keys to switch. With reduced motion there is no auto-advance.
- **Mobile (≤640px):** the names move below the quote in a 3-column grid, and the progress line runs horizontally above each name.

## 6. Animation timelines

These follow the reference's `scenes` object. Coordinates are in stage px; times are waits in ms. Port the logic one-to-one. In React, keep each timeline as a single async sequence that can be cancelled and held, either in a hook or with Framer Motion's `useAnimate`.

### Carmen (stage 1440×1008)

Layers, in the order they appear:

- **Onboarding:**
  - `carmen-01-scanning` full frame.
  - A live spinner at (634, 492), 42×42.
  - A progress bar at (698, 548), 504×6, track `#afcfff`, fill `#5196fe`, starting at 38%.
  - `carmen-02-review-base` over it, hidden at first. It is the review screen with the row area painted out.
  - Rows `carmen-02-row-0…4` at x 605, y 350 / 458 / 566 / 674 / 782.
  - Buttons at (1083, 908).
- **Campaign:** `carmen-03-campaign` (1440 wide, scrollable).
  - The stat-card area is painted white in the image, and `carmen-03-stat-0…3` sit on top at y 429, x 383 / 637 / 891 / 1145.
  - A live pulse ring sits at (387, 183) over the toast dot.

Timeline:

1. Show onboarding (450ms fade).
2. Animate the bar to 100% over 1.5s.
3. Cross-fade to the review base.
4. Rows rise in one by one, 14px up and fading in, 130ms apart. Then the buttons appear.
5. The cursor moves to Save preferences (1270, 926) over 800ms. The button darkens and the cursor clicks.
6. Cross-fade to the campaign view. The four stat cards rise in 120ms apart.
7. Hold 1.3s. Scroll the campaign image by -420px over 1.6s, hold 2.6s, scroll back, then reset.

### Airstride (stage 1440×1008)

Layers:

- `airstride-01-board` full frame.
- A card hover outline at (517, 688), 192×240, with a 3px `#5196fe` ring.
- `airstride-02-menu` at (461, 265), opening upward. Its transform origin is bottom right, and it enters from scale .96, 6px lower.
- A hover row in the menu at local (8, 219), 223×36.
- `airstride-03-summary-modal` at (460, 68), entering 20px lower at scale .985. Its body (from y 90 to 80px above the bottom) is covered by a skeleton: a shimmer and "Carmen is reading CRM and partner notes…".
- **Dimmed state:** the board gets `blur(2.5px) brightness(.82) saturate(.9)`.

Timeline, with camera moves as `cam(ox, oy, z)`:

1. `cam(640,760,1.7)` while the cursor moves to (620, 800) over 900ms. Show the card outline.
2. The cursor moves to the card's ⋯ at (676, 708) and clicks. The menu opens and `cam(580,485,2)`.
3. The cursor moves to "Summarise this deal" at (560, 494). The row highlights and the cursor clicks.
4. The menu closes, the board dims, the cursor hides, and `cam(720,504,1)`. Wait 750ms, then the modal enters.
5. Hold the skeleton 1.4s, then wipe it away top to bottom (`clip-path: inset(100% 0 0 0)`, .8s).
6. `cam(720,300,1.6)` (the snapshot), hold 2s. Then `cam(720,760,1.6)` (recent activity), hold 2.2s. Then `cam(...,1)`.
7. The modal exits, the board un-dims, then reset.

### Arctic Edge (stage 1440×1080)

Layers:

- `arctic-01-cooling` with `arctic-02-heating` on top. Heating is revealed with `clip-path: circle(0 → 1000px at 201px 288px)` over .75s, a circular wipe from the mode chip.
- A breathing glow over the dial at phone-local (86, 116), 230×230, blended with screen.
- A live flow-rate marker: a 12×10 white triangle at phone-local top 632, left 310. It is painted out of both images.

Timeline:

1. The cursor moves to the mode chip at stage (709, 360). `cam(720,368,2.1)` happens during the move.
2. The cursor clicks. The heating wipe plays, and the background glow and breathing glow turn red. Hold 1.5s, then zoom out.
3. `cam(819,710,2.3)` on the flow-rate bar. The marker slides to 292, then to 318. Zoom out.
4. The cursor taps the chip again to return to Cooling. Zoom out and hold.

### Dexla (stage 1440×1008, built in HTML)

The screen is a mini editor:

- **Top bar:** 60px, with a breadcrumb, avatars, Preview and Publish.
- **Token panel:** 320px. Tokens for color, shape and mode, with a Light/Dark segmented control and a mapping readout.
- **Canvas:** a dotted grid with two artboards, Form / Create workspace and List / Members. The artboard group is scaled 1.08 at (56, 210).

The components use CSS variables: `--r` (radius), `--brand`, `--surf`, `--surf2`, `--tx`, `--tx2`, `--bd`.

Timeline:

1. The cursor clicks the `radius/control` value. It ticks 6 → 8 → 10 → 12px, 240ms apart, and every component's radius animates.
2. A ping ring (4px indigo, 420ms) passes over each component that uses the token, 55ms apart. A toast reads "radius/control → N instances updated".
3. The cursor clicks the `action/brand` swatch. The brand colour changes from zinc/900 to indigo/600 with the same ping on the brand components, and a toast reads "action/brand → 4 instances updated".
4. The cursor clicks Dark. The artboards cross-fade to the dark tokens (.5s), and the mapping readout updates.
5. Hold 2.6s, then reset.

### Screenshot check points

These are times from when a tile's loop starts. Use them to confirm the right states are on screen.

| project | 1.5s | 3s | 5s | 8s |
|---|---|---|---|---|
| Carmen | progress bar filling | review rows in | cursor on Save | campaign stats |
| Airstride | zoomed on card | menu, zoomed | skeleton | zoomed into summary |
| Arctic Edge | cursor heading to chip | heating, zoomed | marker sliding | — |
| Dexla | radius editing | brand change | dark mode | — |

## 7. Figma sources for 2x re-exports

Each asset came from a Figma frame, cropped in 1440-wide frame coordinates (x1, y1, x2, y2).

**File `vwDdZdo2eN64qSr1aHooSH` (Ayostride):**

- `9:169064` Scanning partner database → `carmen-01-scanning`: crop 0,0,1440,1008.
- `9:169142` Review matches:
  - `carmen-02-review-base`: crop 0,0,1440,1008, **with rects (600,345)-(1360,895) and (1080,905)-(1360,962) filled with #fafafa**.
  - Rows `carmen-02-row-0…4`: x 605–1355 and y (354/462/570/678/786) −4 to +102.
  - Buttons `carmen-02-buttons`: crop 1083,908,1354,960.
- `7:107656` Background activities → `carmen-03-campaign`: the full frame scaled to 1440 wide, **with rect (380,427)-(1388,562) filled white**.
- `7:107678` header stats → `carmen-03-stat-0…3`: crops at x (23/277/531/785) → +240, y 177–306.
- `7:182106` Deals board view → `airstride-01-board`: scaled to 1440 wide, crop to 1008 tall.
- `7:184785` list view with menu → `airstride-02-menu`: crop 1189,482,1428,923.
- `7:183372` AI deal summary → `airstride-03-summary-modal`: crop 485,185,1005,1056.

**File `PZTu0Dqb8w4wOWDxUVSw1l` (Arctic Edge):**

- `274:10510` Cooling and `107:1239` Heating: full frames, **with the flow-rate marker painted out by filling rect (305,631)-(328,643) with #212121**.

## 8. SEO, performance, accessibility

Ayo sells websites and SEO, so this site is part of his pitch. Ship all of the following:

- **Metadata:**
  - Title "Ayowande Olubo · Product designer".
  - Meta description: "Product designer for early-stage AI and SaaS teams. I design it, then I ship it."
  - Canonical URL https://waande.com.
  - Open Graph and Twitter card tags with a 1200×630 OG image. Build the image from the hero text on a tile gradient.
- **JSON-LD `Person`:** name, jobTitle "Product Designer", address locality Abuja, NG, and `sameAs` links for LinkedIn, GitHub, X and Dribbble.
- **Crawling:** `sitemap.xml` and `robots.txt`. Each case study is its own route with its own title and description.
- **Semantic structure:** one `h1`, an `h3` per project card, and alt text or aria-labels on the thumbnails. The reference has an aria-label per tile.
- **Performance:**
  - Lazy-load thumbnail images below the fold.
  - Use WebP/AVIF at 2x.
  - Preload the two Geist weights.
  - No layout shift: tiles have fixed aspect ratios.
  - Animate only `transform`, `opacity`, `clip-path` and `filter`.
  - Pause loops when they are off screen.
  - Target Lighthouse ≥ 95 for Performance, Accessibility, Best Practices and SEO on mobile.
- **Accessibility:**
  - Visible focus ring (2px `--accent`).
  - The testimonial tabs are keyboard-operable.
  - Reduced motion is respected.
  - Contrast is AA in both themes.
  - The thumbnails are decorative inside a labelled link.

## 9. Acceptance checklist

- [ ] Side by side with `reference/index.html` at 1440, 1024 and 390px widths, in light and dark, the build is visually identical.
- [ ] All four timelines match the order, positions and easing in section 6. They autoplay in view, are staggered, and stop off screen.
- [ ] Hover freezes the story, the loupe follows the pointer (1.6× desktop, 2.4× Arctic Edge), and leaving restores the framing and resumes.
- [ ] Kind words: Max first, 6s each, pause on hover, keyboard support, no layout shift.
- [ ] No horizontal scroll at 390px. The H1's muted span never wraps.
- [ ] Images re-exported at 2x, with the painted-out regions reproduced (section 7).
- [ ] SEO items in section 8 shipped. Lighthouse mobile ≥ 95.
- [ ] Ayo reviews the motion in a real browser before launch.

## 10. Open items to confirm with Ayo

- **Case studies:** the `/work/*` case study pages already exist on the live site. Keep their URLs.
- **Arctic Edge:** has only two real screens so far (Cooling and Heating). More screens (Set temperature, Session timer) can extend the timeline later.
- **"This site is one example: designed and built by me"** (Background section) must stay true. Ayo is building this site himself.
- **Résumé link:** confirm it points to the current version.
