/**
 * The pages that did ship, and a forgiving matcher for "did you mean". Most real 404s are
 * typos or half-remembered links (/work/carmen, /abuot, /Dexla), so the matcher compares
 * each word of the path against a few distinctive keys per page: exact, contained,
 * prefix (4+ letters), or within one or two edits (a swapped pair counts as one).
 */

export interface Page {
  href: string;
  keys: readonly string[];
}

export const PAGES: readonly Page[] = [
  { href: "/", keys: ["home", "index"] },
  { href: "/about", keys: ["about", "bio"] },
  { href: "/work/carmen-ai", keys: ["carmen"] },
  { href: "/work/airstride", keys: ["airstride"] },
  { href: "/work/arctic-edge", keys: ["arctic"] },
  { href: "/work/dexla-design-system", keys: ["dexla"] },
  { href: "/side-quests/scents-by-biba", keys: ["scents", "biba", "perfume"] },
];

/** Sections of the home page that old links may mean ("/contact-me", "/hire"). Suggested, never listed. */
const SECTIONS: readonly Page[] = [{ href: "/#contact", keys: ["contact", "hire", "email"] }];

/** The terminal's four links, verbatim from the reference. */
export const TERMINAL_LINKS = [
  { label: "Home", href: "/" },
  { label: "Carmen, an AI agent people trust", href: "/work/carmen-ai" },
  { label: "Airstride, six modules, one designer", href: "/work/airstride" },
  { label: "About me", href: "/about" },
] as const;

/** Optimal string alignment distance: Levenshtein, plus adjacent swaps as one edit. */
function editDistance(a: string, b: string): number {
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array<number>(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
}

/** Lower is closer; Infinity is no match. */
function score(word: string, key: string): number {
  if (word === key) return 0;
  if (key.length >= 4 && word.includes(key)) return 0.5;
  if (word.length >= 4 && key.startsWith(word)) return 1;
  if (word.length >= 4 && key.length >= 4) {
    const d = editDistance(word, key);
    if (d <= (key.length >= 6 ? 2 : 1)) return d + 0.5;
  }
  return Infinity;
}

/** The closest real page to a path or a typed name, or null when nothing is close. */
export function suggest(input: string | null | undefined): string | null {
  const words = (input || "").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  let best: string | null = null;
  let bestScore = Infinity;
  for (const page of [...PAGES, ...SECTIONS]) {
    for (const key of page.keys) {
      for (const word of words) {
        const s = score(word, key);
        if (s < bestScore) {
          bestScore = s;
          best = page.href;
        }
      }
    }
  }
  return best;
}
