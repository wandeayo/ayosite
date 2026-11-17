# Kind words (testimonials) section: sticky-note desk

## Scope: read this first

**Implement only the testimonials section (the "Kind words" section on the home page). Everything else stays exactly as it is.**

- Replace the current "Kind words" section in place, in the same position on the home page. Its current markup, CSS and JS (the auto-advancing one-quote-at-a-time view with the people list) are removed.
- Don't touch anything else:
  - **Pages:** the About page (including the chess section, which is already built), the case studies and the 404.
  - **Other home sections:** the hero, Selected work, What I do and Contact.
  - **Site chrome:** the header, the floating nav, the footer and the theme toggle.
  - **Foundations:** global styles, tokens, fonts and metadata.
- `reference.html` shows a few other sections around the new one only for context. Don't copy or "sync" them, even where they differ from what's live.
- Don't refactor, rename or reformat existing code. Don't add dependencies: no drag or physics libraries, plain pointer events only.
- New files are fine only if they belong to this section:
  - `components/home/KindWords.tsx`, its CSS module and a small client hook for the board;
  - the API route `app/api/note/route.ts`, which sends visitors' notes (see "Sending notes" below);
  - `RESEND_API_KEY` added to `.env.example` if the repo has one. Never commit a real key.
- Scope all CSS to the section (CSS module or a `.kw2` prefix) so nothing leaks into the rest of the site.
- If you think something outside the section needs changing, stop and ask Ayo.
- Don't commit, push or deploy until Ayo has reviewed it locally.

## Files

| File | What it is |
|---|---|
| `TESTIMONIALS.md` | This brief |
| `reference.html` | The approved design, and the source of truth. Open it in a browser and play with it at desktop and phone widths before you code. |
| `source/kind-words.html` | The section markup |
| `source/kind-words.css` | The section styles (uses the site's existing tokens: `--fg`, `--muted`, `--faint`, `--accent`, `--mono`) |
| `source/kind-words.js` | The board behaviour, framework-free. Port it to a client component or hook; keep the logic. |
| `source/api-note-route.ts` | The API route that emails visitors' notes to Ayo via Resend. Drop it in as `app/api/note/route.ts` (adjust if the repo uses the pages router). |

## The idea

The testimonials are sticky notes on a desk. They arrive loosely scattered and fully readable. Visitors can drag them, throw them, tidy them into a grid or mess them up. A pad of blank notes in the corner lets them write their own note to Ayo, which is emailed to him straight from the site.

## Content

- **Section label:** "Kind words" (an `h2` styled as the site's `.label`).
- **Six notes, in this order and colour:**

| # | Name | Role | Paper |
|---|---|---|---|
| 1 | Max Edwards | Co-founder & CEO · Airstride | yellow `#fbf1a6` |
| 2 | Hugo Rawlinson | Co-founder & CRO · Airstride | blue `#d3e6f7` |
| 3 | Tom McDonough | Co-founder & CTO · Dexla | green `#d9efc8` |
| 4 | Ibrahim Bashir | CEO · Techonstack | pink `#fad5dc` |
| 5 | Williams Balogun | Full Stack Engineer · Airstride | orange `#fde1ba` |
| 6 | Valeria Cuciniello | Product Designer | lilac `#e4dcf6` |

- **Quotes:** copy them exactly from `source/kind-words.html`. They're the full quotes from the current section. Tom's attribution stays "Co-founder & CTO · Dexla".
- **Pad:** "Your turn." / "Leave a note +". After a note is sent, the first line reads "Sent. Thank you." for 5 seconds.
- **Hint:** "psst, they move." on desktop, "flick the top one away →" on phones. It fades out after the first drag.

## Look

- **Notes:** paper colour, ink `#1d1c19`, radius 2px, padding 20px. Quote 14px/1.55 with a hanging opening quote mark (`text-indent:-.4em`). Name 13.5px weight 500. Role in mono 10.5px `#5b584c`.
- **Same paper in both themes:** the notes are objects on the desk, so their colours don't change in dark mode. Only the shadows get deeper.
- **Curl:** a soft shadow under the bottom-right edge (`.note::before`) makes the note look slightly lifted. Keep it; it's what makes them read as real paper.
- **No tape and no pins.** That's deliberate.
- **Visitor's note and pad:** off-white paper `#fdfcf7`, so a visitor's own note is clearly theirs and never mistaken for a testimonial.

## Desktop behaviour (board 640px wide and up)

- **Layout:** three loose columns, two rows. Note width is `min(264px, (board width − 40) / 3)`.
  - Fixed small offsets and tilts (`ROT` and `JIT` in the JS), so the first view is always readable and the same for everyone.
  - The board height follows the notes, with room at the bottom for the pad and hint.
- **Arrival:** the first time the board scrolls into view, the notes drop in one by one (80ms stagger).
- **Dragging:**
  - Pointer down, then 4px of movement, picks up a note. A plain click doesn't. The note comes to the front, scales to 1.04 and its shadow deepens.
  - While held, it leans with the drag velocity (up to ±14°).
- **Throwing:** on release the note keeps its momentum with friction (`× .9` per frame), bounces softly off the board edges (`× −.45`), and settles at a slightly new angle.
- **"Tidy up" / "Mess it up":** one text button in the section header.
  - "Tidy up" animates every note into a straight, aligned grid.
  - "Mess it up" scatters them at random with tilts up to ±11°.
  - 45ms stagger in both directions.
- **The pad:**
  - Hovering it lifts the top sheet.
  - Clicking it peels off a new note: it animates from the pad onto the board, and focus goes to the textarea.
  - Only one visitor note can exist at a time. Clicking the pad again brings it to the front.
  - What happens next is in "Sending notes" below.
- **Resizing** re-lays out the board.

## Phone behaviour (board under 640px)

- **The stack:** the notes become a centred stack (width `min(320px, board − 28px)`). The top note is flat. Up to two notes peek out behind it with small tilts and a 7px offset.
- **Counter:** the header shows "01 / 06" instead of "Tidy up".
- **Flicking:** drag the top note sideways (`touch-action: pan-y`, so vertical scrolling still works).
  - Past 25% of the width, or flicked fast, it flies off and tucks in at the back of the stack, and the counter advances.
  - Otherwise it springs back.
- **The pad:** a smaller pad sits under the stack. Its new note goes on top of the stack.

## Sending notes

The visitor's note is a small `<form>`. Notes are emailed to Ayo from the site; the visitor never leaves the page or needs an email app.

**The note**

- Textarea (required, max 500 characters), placeholder "Hi Ayo, …".
- Optional email field, placeholder "Your email, if you want a reply" (mono, dashed underline).
- A hidden honeypot input `name="website"`.
- Footer: "You", then "Bin" (removes the note) and "Send ↗".
  - "Send ↗" stays disabled until there's a message, and while the email field holds an invalid address.
- Dragging never starts from the textarea, the inputs or the buttons.

**Sending**

- The note POSTs JSON to `/api/note`: `{ message, email, website, ms }`, where `ms` is the time since the note was opened.
- While sending, the fields are read-only and the button says "Sending…".
- **Success:** the footer is replaced by "Stuck to Ayo's desk ✓". 1.5s later the note flies up and away off the board and is removed. The pad then reads "Sent. Thank you." for 5 seconds.
- **Failure** (network error or non-200): the text is kept, the button becomes "Try again ↗", and a red line reads "Didn't send. Email me instead ↗". That link is a `mailto:` with the note pre-filled, as a fallback.

**The API route** (`source/api-note-route.ts` → `app/api/note/route.ts`)

- **Bots:** if the honeypot is filled or `ms` is under 2000, it returns `{ ok: true }` without sending.
- **Validation:** the message must be 1–500 characters after trimming, and the email is optional but must be valid. Otherwise it returns 400.
- **Rate limit:** best effort, in memory, 3 per IP per 10 minutes. Otherwise it returns 429.
- **Sending:** it emails Ayo through Resend's REST API (`fetch`, no SDK).
  - Plain text only.
  - Subject "A note from waande.com".
  - `reply_to` is the visitor's email if they gave one.
- **Env:** `RESEND_API_KEY` is required. `NOTE_TO_EMAIL` and `NOTE_FROM_EMAIL` are optional.
  - Until waande.com is verified in Resend, the default sender `onboarding@resend.dev` only delivers to the address the Resend account was created with. Ayo should sign up to Resend with ayowandeolubo@gmail.com.
  - After verifying the domain, set `NOTE_FROM_EMAIL="waande.com notes <notes@waande.com>"`.
- **Demo mode:** the reference board has `data-demo="true"`, which fakes a successful send. **Remove `data-demo` in production**, and keep `data-endpoint="/api/note"` or pass the endpoint as a prop.

**What Ayo has to do** (Claude Code should list these for him and not attempt them):

1. Create a free account at resend.com with ayowandeolubo@gmail.com and copy an API key.
2. Add `RESEND_API_KEY` to `.env.local` for local testing, and in Vercel → Project → Settings → Environment Variables.
3. Optional, later: verify waande.com in Resend (DNS records) and set `NOTE_FROM_EMAIL`.

## Accessibility

- **Progressive enhancement:** the notes are server-rendered `<figure>`s with `<blockquote>` and `<figcaption>`. Without JS they show as a plain readable grid. Keep it that way for SEO.
- **Keyboard:** each note is focusable.
  - Desktop: arrow keys move the focused note 16px (48px with Shift).
  - Phone: left and right send the top note to the back.
  - Hidden notes in the stack get `tabindex="-1"` and `aria-hidden`.
- **Instructions:** a visually hidden paragraph explains dragging and the arrow keys. The board points to it with `aria-describedby`.
- **Reduced motion:** no arrival animation, no tilt, no throw momentum and no eased transitions. Notes still move, just directly.
- **The visitor's note:** both fields have visually hidden labels. The status line is `role="status"` with `aria-live="polite"`, so "Sending", the success message and errors are announced. The honeypot has `tabindex="-1"` and `aria-hidden`.
- **Hidden attributes must really hide:** keep the `[hidden]{display:none}` rules for `.kw-tidy` and `.kw-n`, because `all:unset` overrides the browser default.

## Verify

- [ ] It matches `reference.html` at 1440, 1024 and 390px, in light and dark.
- [ ] Desktop: drag, throw and bounce work; notes stay inside the board; "Tidy up" / "Mess it up" work; the pad creates and bins a note.
- [ ] Sending, with `RESEND_API_KEY` in `.env.local`: a note arrives in Ayo's inbox, and "reply" goes to the visitor's email when one was given. An invalid email keeps Send disabled. With the key removed, the failure state and "Email me instead" fallback show. The honeypot and the 2-second check return success without sending. A 4th note within 10 minutes is rejected.
- [ ] `data-demo` is gone from the production markup.
- [ ] Phone: flicking works and the counter advances; vertical scrolling over the notes still works; no horizontal scroll at 390px.
- [ ] Keyboard and reduced motion behave as described. No console errors.
- [ ] `git diff` touches only the testimonials section's files, the new `app/api/note/route.ts` (and `.env.example` if present), and the line that renders the section on the home page. Nothing else on the site changed, including the About page and its chess section.
- [ ] Don't commit, push or deploy until Ayo has reviewed it locally.
