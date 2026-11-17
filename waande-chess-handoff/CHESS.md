# Chess section: About page addition (v3, the chess-book diagram)

## Scope: read this first

**Implement only the chess section (`<section id="chess">`) on `/about`. Everything else stays exactly as it is.**

- Don't touch the home page, the case studies, the 404, the header, the floating nav, the footer, the contact section, the theme toggle, global styles, tokens or fonts.
- Don't touch any other part of the About page (hero, "engineers" cards, "Where I've been", photo row). `about-reference.html` contains the whole About page only so you can see the section in context. Don't "sync" the rest of the page to it, even where it differs from what's live.
- Don't refactor, rename or reformat existing code. Don't add dependencies (no chess libraries; the board logic below is about 60 lines).
- New files are fine only if they belong to this section (e.g. `components/about/ChessSection.tsx`, its CSS module, the piece sprite).
- Scope all CSS to the section (CSS module or a `.ab-chess` prefix) so nothing leaks into the rest of the site.
- If you think something outside the section needs changing, stop and ask Ayo.
- Don't deploy. Ayo reviews it locally first.

## Files

| File | What it is |
|---|---|
| `CHESS.md` | This brief |
| `about-reference.html` | The approved About page, the source of truth for the chess section. Open it in a browser and play a move before you code. |
| `chess-pieces.svg` | The 12 piece symbols (`cp-wP` … `cp-bK`) as an inline SVG sprite |

In the reference, the section's CSS is everything after the `/* chess: a diagram from a chess book… */` comment, and its JS is the block commented `// chess: the visitor plays white's first move`.

## The idea

The board looks like a diagram printed in a chess book: hatched dark squares, a double ruled frame, coordinates in the margin, a "White to move." caption. The visitor plays white's first move, Ayo replies, and the caption turns into book notation with an annotation mark and a one-line comment. Then the visitor is sent to chess.com to finish the game.

## Placement

After the photo row, before the Contact section. Same `ab-sec` spacing and top border as the neighbouring sections.

## Content

**Left column**

- Label: "Off the clock".
- H2: "{days} days. Not one missed."
- Paragraph: "I play chess every single day on chess.com, and I haven't skipped one in {days} days. Some days I win. Plenty of days I don't."
- Stats line (mono, hairline above, each item `nowrap`): "{games} games · {won} won · {lost} lost · {drawn} drawn".
- Nudge (`--fg`): "You're white. Go on, make the first move."
- Buttons: "Challenge me ↗" (primary) → `https://www.chess.com/play/online/new?opponent=ayowandee`; "@ayowandee" → `https://www.chess.com/member/ayowandee`. Both open in a new tab.

**Right column (max 400px): the diagram**

- Header (mono, uppercase, 11px): "Guest – ayowandee" left, "Rapid · 10 min" right.
- Rank numbers 8–1 on the left, files a–h underneath, outside the frame.
- Board: 8×8, `1.5px` ink border plus a second hairline frame (`box-shadow: 0 0 0 3px paper, 0 0 0 4px ink`).
- Caption: "White to move."
- **End overlay** (hidden until Ayo has replied): sits over the board only, not the header, coordinates or caption.
  - Wash: `position:absolute; inset:4px` inside a `position:relative` board wrapper, paper at 80% (`color-mix(in srgb, var(--paper) 80%, transparent)`), `backdrop-filter: blur(2px)`, fades in over .4s.
  - Line (italic 14px, max 30ch, balanced): "That's as far as this board goes. The rest of the game is on chess.com."
  - Buttons, centred: "Finish the game ↗" (primary, challenge URL, new tab) and "Reset".
  - Inside the diagram the buttons use ink and paper, not the site's button colours: primary = ink fill with paper text, secondary = paper fill with a 1px ink border. They keep the site's button size and radius.

## Look

- **Paper and ink:** the diagram is always printed in dark ink on light paper, in both themes.
  - Light theme: paper = page background (`#f7f7f5`), so it looks printed on the page. No card, no shadow.
  - Dark theme: paper `#e9e5dc`, radius 3px, a deep soft shadow and `rotate(-.6deg)`, like a page torn out of a book and left on the desk. No rotation under 760px.
  - Ink: `#1b1a18`.
- **Squares:** light squares are plain paper. Dark squares are hatched: `repeating-linear-gradient(-45deg, rgba(27,26,24,.42) 0 1px, transparent 1px 4px)`. a1 is a dark square.
- **Pieces:** the cburnett SVG set from `chess-pieces.svg` (`<use href="#cp-wN">`), at 92% of the square. Don't use Unicode chess characters (iOS turns some into emoji) or an icon font.
- **Highlights:** selection and last move use a highlighter yellow (`rgba(242,196,64,.55)`, dark theme `.6`). Legal targets are small hollow ink rings.
- **Caption type:** the moves are mono 13px weight 500, the comment is Geist italic, e.g. `1. g4?! d5` *Oh, you're feeling brave.*

## Board rules

It's deliberately tiny. It is not a chess engine.

- Only white's first move is playable: any pawn one or two squares forward, or either knight to an empty square.
- Click or tap a piece to select it (it lifts 2px), then click a ring to move. Clicking the selected piece again deselects it.
- Pieces slide to their new square (`.34s`, transform only).
- After white moves, the caption reads "1. {move} ayowandee is thinking…". Ayo replies after about 1.1s, with the same slide.
- Replies, keyed by white's move:

| White | Black | Mark | Comment |
|---|---|---|---|
| e4 | e5 | ! | Classic. |
| d4 | d5 | ! | Serious. I like it. |
| c4 | e5 | !? | The English. Fancy. |
| Nf3 | Nf6 | | Flexible. Respect. |
| f4 | d5 | !? | The Bird. Bold. |
| g4 | d5 | ?! | Oh, you're feeling brave. |
| b4 | e5 | ?! | The Sokolsky? Okay then. |
| Nc3 | d5 | | Old school. |
| a3 | e5 | ?! | Taking it slow, I see. |
| h4 | d5 | ?! | Chaos. I respect it. |
| Nh3 / Na3 | d5 | ?! | A knight on the rim. Bold. |
| anything else | e5 | | Noted. Interesting choice. |

- The caption below the board becomes `1. {move}{mark} {reply}` plus the comment. 0.6s later the end overlay fades in over the board, and focus moves to "Finish the game ↗".
- Reset hides the overlay, restores the start position, clears highlights and sets the caption back to "White to move."

## Data

- **Streak:** chess.com's public API doesn't expose streaks, so compute the count. `STREAK_START = 2026-06-02` is day 1, so day 169 is 17 Nov 2026. Keep the start date in one constant or env var so Ayo can reset it if the streak breaks. Fill every `.ch-n`.
- **Stats:** fetch `https://api.chess.com/pub/player/ayowandee/stats` on the server.
  - Use `chess_rapid.record.win/loss/draw`. Games = their sum.
  - Revalidate daily (`next: { revalidate: 86400 }`) and send a descriptive User-Agent.
  - Fall back to the reference values if the fetch fails. Never fetch from the browser.
- **Ratings:** don't display them.

## Credit

The pieces are the "cburnett" set by Colin M.L. Burnett, under a free licence (GPLv2+/BSD/GFDL), the same set Lichess and Wikipedia use. Keep the credit comment in the sprite.

## Accessibility

- Every square is a `<button>` labelled like "e2, white pawn" or "e4, move here". Focus stays on the square after a selection.
- The board has `role="grid"` and the label "Chessboard. You play white. Pick a pawn or knight, then a square."
- The caption is `aria-live="polite"`, so the reply and comment are announced.
- The overlay must really be hidden until it's shown. Keep `.dg-after[hidden]{display:none}`, or it blocks every click on the board.
- Reduced motion: no slides, no fade, and a shorter thinking delay.

## Responsive

- Under 760px the diagram stacks below the text, at most 420px wide, with 14px padding.
- No horizontal scroll at 390px.

## Verify

- [ ] The chess section matches the reference at 1440 and 390px, in light and dark.
- [ ] `git diff` touches only the chess section's files plus the single line that places it on `/about`. Nothing else on the site changed.
- [ ] a1 is dark, h1 is light, and the pieces render as SVG on iOS Safari (not emoji).
- [ ] Every reply in the table works, plus the fallback. The overlay covers only the board, and Reset brings the board back and it's playable again.
- [ ] The day count is right for today's date. The stats render from the API and from the fallback.
- [ ] Both chess.com links open the right pages.
- [ ] No console errors.
- [ ] Don't deploy until Ayo has reviewed it locally.
