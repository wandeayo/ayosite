import { ChessBoard, StreakDays } from "@/components/about/chess-board";
import { getChessStats, STREAK_START, streakDays } from "@/components/about/chess-data";

import "@/components/about/chess.css";

/*
 * "Off the clock": the chess section of /about. Strings, sizes and behaviour are from
 * waande-chess-handoff (CHESS.md and the chess section of about-reference.html).
 * All its CSS lives in chess.css, scoped to .ab-chess.
 */

const CHALLENGE_URL = "https://www.chess.com/play/online/new?opponent=ayowandee";
const PROFILE_URL = "https://www.chess.com/member/ayowandee";

const fmt = (n: number) => n.toLocaleString("en-US");

export async function ChessSection() {
  const stats = await getChessStats();
  const now = new Date();
  // Rendered on the server (revalidated daily), then corrected to the visitor's date in the browser.
  const days = streakDays(STREAK_START, now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

  return (
    <section className="ab-sec ab-chess" id="chess" aria-labelledby="chess-h">
      <div className="sec-head">
        <span className="label">Off the clock</span>
      </div>
      <div className="ch">
        <div className="ch-copy">
          <h2 id="chess-h">
            <StreakDays start={STREAK_START} initial={days} /> days. Not one missed.
          </h2>
          <p>
            I play chess every single day on chess.com, and I haven’t skipped one in{" "}
            <StreakDays start={STREAK_START} initial={days} /> days. Some days I win. Plenty of days I don’t.
          </p>
          <p className="ch-line mono">
            <span>{fmt(stats.games)} games</span> · <span>{fmt(stats.won)} won</span> ·{" "}
            <span>{fmt(stats.lost)} lost</span> · <span>{fmt(stats.drawn)} drawn</span>
          </p>
          <p className="ch-nudge">You’re white. Go on, make the first move.</p>
          <div className="ch-cta">
            <a className="btn primary" href={CHALLENGE_URL} target="_blank" rel="noopener">
              Challenge me ↗
            </a>
            <a className="btn" href={PROFILE_URL} target="_blank" rel="noopener">
              @ayowandee
            </a>
          </div>
        </div>

        <ChessBoard challengeUrl={CHALLENGE_URL} />
      </div>
    </section>
  );
}
