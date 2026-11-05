# About page: Claude Code handoff

Only the About page needs building. The rest of waande.com (home page and case studies) is already live, so reuse its tokens, fonts, header, theme toggle, floating nav pill, contact section and footer. Don't change any other page.

**Route:** `/about`. Replace the current About page entirely.
**Source of truth:** `reference/about.html`. Match it exactly, and copy every string from it.

The page is deliberately simple and personal. Don't add sections, animation or effects beyond the one interaction described below. Earlier, richer versions were rejected as over-designed.

## Chrome

Reuse the live components, unchanged:

- **Header:** "Ayowande Olubo" on the left, theme toggle on the right.
- **Floating nav pill:** "About" is the active item, with `aria-current="page"`. Make sure the pill's About link points to `/about`.
- **Contact section and footer:** the same as the home page, except the contact heading and line change (see section 1, item 4).

## 1. Structure

There are four parts, plus the footer.

### 1. Hero (`.ab-hero`)

**Layout:** two columns, `1.4fr / 1fr`, 48px gap, `padding-block: 56px 52px`, no top border.

**Left column:**
- **H1:** "Hi, I'm Ayo." at 30–42px, weight 500, `-.03em` tracking.
- **Lead line:** "I design products, then I build them. Mostly AI and SaaS, mostly for startups that move fast." at 19px in `--fg`, max 34ch.
- **Three bio paragraphs:** 16px / 1.7 in `--muted`, max 56ch, 14px apart. The second paragraph contains the "engineers" interaction (section 2).

**Right column:**
- Photo: `waande-about-handoff/assets/about-horse.jpg` (new; add it to `/public/about/`), aspect 4:5, radius 14px, `object-fit: cover`, `object-position: 88% 50%`.
- Alt text: "Ayo on horseback at a polo field, sunglasses on his head".

**Under 720px:**
- The photo moves above the text.
- The photo becomes 1:1 with `object-position: 70% 40%`.

### 2. "Where I've been" (`.ab-xp`)

**Rows:** five, separated by hairlines. Each row is a grid of `150px / 1fr / auto`:

| Column | Content | Style |
|---|---|---|
| 1 | Company | weight 500 |
| 2 | Role · type | `--muted`, 14.5px |
| 3 | Years | mono 12px `--faint`, tabular figures |

**Content:**

| Company | Role · type | Years |
|---|---|---|
| Airstride | Product Designer · AI sales | 2025 |
| Dexla | UX Designer · No-code AI builder | 2024 – 25 |
| Qoinpal | Product Designer · Crypto wallet | 2023 – 24 |
| Approvam | Product Designer · Workflow | 2023 |
| Groflex | Product Designer · ERP suite | 2022 – 23 |

**Under 560px:** the role drops to a second line.

### 3. Photo row (`.ab-photos`)

**Layout:**
- Four photos, each 3:4, radius 10px, 10px gap.
- No captions or hover effects.
- Two columns under 560px.

**Photos, in order:**
1. `waande-about-handoff/assets/about-friends.jpg` (new; add it to `/public/about/`). Alt: "Ayo taking a selfie with friends on a rocky hilltop".
2. `/public/about/photo-3.jpeg`, the team working session (already in the repo).
3. `/public/about/photo-7.jpg`, the saxophone.
4. `/public/about/photo-5.jpg`, the chess pieces.

For 2–4, use the existing originals at 2×, not the 1× copies inlined in the reference file.

### 4. Contact

- **Heading:** "Let's build something good."
- **Line:** "Got a project? Or just want to talk design, chess, or debate FPL transfers? I'm always open to a conversation."
- **Below:** the usual email, Copy email button, Book a call button and social links.

## 2. The "engineers" interaction (the page's one signature moment)

**Trigger:** in the line "Ask my **engineers**, they'll back me up.", the word "engineers" is a `<button>` styled as inline text:
- `--fg` colour.
- 1px dashed underline in `--faint`, 4px offset.
- The underline turns solid `--fg` when the cards are open.
- `aria-expanded` and `aria-controls` point to the card group.

**Behaviour:** hovering (fine pointer) or tapping it deals out three cards, like a hand of playing cards.

| Card | Initials badge (32px circle, mono 11px) | Name | Role |
|---|---|---|---|
| 1 | WB, `#d9e6ff` / `#2a5bb8` | Williams Balogun | Full Stack Engineer · Airstride |
| 2 | TM, `#e3f6dc` / `#2f7d1f` | Tom McDonough | CTO · Airstride |
| 3 | T, `#f6e6d6` / `#9a5a1e` | Toba | Designer turned engineer · Dexla |

**Card style:**
- 196px wide, radius 12px, `--surface` fill.
- 1px `--line` ring plus a soft shadow.
- Name 13.5px weight 500; role 11.5px `--muted`.

**Motion (desktop):**
- Closed: cards stack at the word, `opacity: 0`, `translate(-50%, 10px) scale(.9)`.
- Open positions:
  - Left card: `x −192px, y −12px, rotate −6°`.
  - Centre card: `y −30px`, on top.
  - Right card: `x +192px, y −12px, rotate 6°`.
- Transition: `.5s cubic-bezier(.2,.9,.25,1.15)` with a 45ms stagger per card.
- Hovering a card lifts it 10px, straightens it by 3° and brings it to the front.

**Under 640px:**
- The cards anchor to the paragraph, not the word, so they never overflow the screen.
- They stack vertically above the text: `y −112 / −58 / −4px` with ±2° tilts.
- Width is `min(250px, 100vw − 48px)`.

**Interaction rules:**
- Pointer enter opens. Pointer leave closes after 180ms, so the cursor can travel onto the cards.
- Tap toggles.
- Keyboard focus opens and blur closes.
  - Ignore the click that immediately follows focus (within 400ms), or a tap would open and then close it.
- Esc or a click outside closes.
- With reduced motion: fade only, no transforms.

## 3. Copy notes

- The tone is casual and first person. Don't "improve" it into marketing copy.
- Use the name "Ayo" on this page; the site header stays "Ayowande Olubo".
- The current live page's toolkit, "B. 1998" line, journey essay and Lagos label are intentionally removed.

## 4. SEO and accessibility

- **Title:** "About · Ayowande Olubo".
- **Description:** from the reference file.
- **Open Graph image:** the horse photo cropped to 1200×630 with the H1 overlaid, or the default site OG image.
- **Structure:** one H1.
- **Alt text:** every photo has the alt text listed above.
- **Card group:** `role="group"` with the label "Engineers who'll back me up".

## 5. Verification

- [ ] At 1440, 1024 and 390px, in light and dark, the page matches `reference/about.html`.
- [ ] The cards fan correctly on desktop hover, keyboard focus and mobile tap, never overflow at 390px, and close on Esc or a click outside.
- [ ] The pill shows "About" as active.
- [ ] No horizontal page scroll. No console errors.

## Bundle

```
ABOUT.md                this brief
reference/about.html    the approved page (images inlined); open it in a browser before coding
assets/about-horse.jpg  hero photo, 1560×2080
assets/about-friends.jpg  first photo in the row, 1200×1600
```

The reference file and this brief are the source of truth. If they disagree, the reference wins. Don't deploy until Ayo has reviewed the page locally.
