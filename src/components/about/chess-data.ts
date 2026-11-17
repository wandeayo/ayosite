/**
 * Data for the About page's chess section (waande-chess-handoff/CHESS.md, "Data").
 * Server-only: the stats are fetched here, never from the browser.
 */

/**
 * Day 1 of the daily-chess streak (chess.com's public API doesn't expose streaks).
 * If the streak breaks, set CHESS_STREAK_START=YYYY-MM-DD or change the default here.
 */
export const STREAK_START = process.env.CHESS_STREAK_START ?? "2026-06-02";

const DAY_MS = 864e5;

/** Day number of the streak on the given calendar date; the start date is day 1. */
export function streakDays(start: string, year: number, monthIndex: number, date: number): number {
  const [y, m, d] = start.split("-").map(Number);
  return Math.max(1, Math.floor((Date.UTC(year, monthIndex, date) - Date.UTC(y, m - 1, d)) / DAY_MS) + 1);
}

export type ChessStats = { games: number; won: number; lost: number; drawn: number };

/** The reference's numbers, shown when chess.com can't be reached. */
const FALLBACK: ChessStats = { games: 2146, won: 1032, lost: 1007, drawn: 107 };

const STATS_URL = "https://api.chess.com/pub/player/ayowandee/stats";

/** Rapid record from chess.com, revalidated daily; the fallback if the fetch fails or looks wrong. */
export async function getChessStats(): Promise<ChessStats> {
  try {
    const res = await fetch(STATS_URL, {
      headers: { "User-Agent": "waande.com About page (+https://waande.com/about)", Accept: "application/json" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const record = (await res.json())?.chess_rapid?.record;
    const n = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : NaN);
    const won = n(record?.win);
    const lost = n(record?.loss);
    const drawn = n(record?.draw);
    if ([won, lost, drawn].some(Number.isNaN)) throw new Error("unexpected response shape");
    return { games: won + lost + drawn, won, lost, drawn };
  } catch (err) {
    console.warn(`[chess] chess.com stats unavailable, using fallback: ${(err as Error).message}`);
    return FALLBACK;
  }
}
