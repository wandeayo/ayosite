/**
 * The terminal's hidden command line, which opens once "Ship it anyway" has run. Pure:
 * takes what was typed and returns lines to print, plus anything the page should do.
 * Everything typed is printed as React text, never as HTML.
 */
import { PAGES, suggest } from "./routes";

type Tone = "m" | "e" | "g";

export type Line =
  | { kind: "text"; text: string; cls?: Tone }
  | { kind: "echo"; text: string }
  | { kind: "link"; href: string; label: string; before?: string; after?: string; cls?: Tone };

export type Effect = { type: "navigate"; href: string } | { type: "clear" } | { type: "exit" };

export interface Result {
  lines: Line[];
  effect?: Effect;
}

const say = (text: string, cls?: Tone): Line => ({ kind: "text", text, cls });

/** Short enough to fit the phone terminal (~34 characters) without wrapping. */
const HELP: Line[] = [
  say("  ls           pages that shipped", "m"),
  say("  open <page>  go to one", "m"),
  say("  ship         try again", "m"),
  say("  whoami       who’s asking", "m"),
  say("  clear        clear the log", "m"),
  say("  exit         back to the canvas", "m"),
];

/** Where `open x` / `cd x` goes: home aliases, the home page's sections, a page, or the closest one. */
function resolve(arg: string): string | null {
  const a = arg.toLowerCase().replace(/\/+$/, "");
  if (["", "~", "/", ".", "..", "home"].includes(a)) return "/";
  if (a === "work") return "/#work";
  if (a === "contact" || a === "hire") return "/#contact";
  const exact = PAGES.find((p) => p.href === a || p.href === `/${a}` || p.href === `/work/${a}`);
  return exact ? exact.href : suggest(a);
}

export function runCommand(input: string, ctx: { path: string }): Result {
  const text = input.trim();
  if (!text) return { lines: [] };
  const [word, ...rest] = text.split(/\s+/);
  const cmd = word.toLowerCase();
  const arg = rest.join(" ");

  switch (cmd) {
    case "help":
    case "?":
      return { lines: HELP };
    case "ls":
    case "dir":
      return { lines: PAGES.map((p) => ({ kind: "link", before: "  ", label: p.href, href: p.href })) };
    case "open":
    case "cd":
    case "go": {
      if (!arg && cmd === "open") return { lines: [say("usage: open <page>, e.g. open carmen", "m")] };
      const href = resolve(arg);
      if (!href) return { lines: [say(`✕ no page called “${arg}”`, "e"), say("  try ls", "m")] };
      return { lines: [say(`→ opening ${href}…`, "m")], effect: { type: "navigate", href } };
    }
    case "ship":
    case "deploy":
      return { lines: [say("✕ build failed: frame is still empty", "e"), say("  it was empty a minute ago too", "m")] };
    case "sudo":
      return { lines: [say("✓ shipped to /dev/null. it’s lovely there.", "g")] };
    case "whoami":
      return { lines: [say("someone who types into 404 pages. respect.")] };
    case "pwd":
      return { lines: [say(ctx.path)] };
    case "echo":
      return { lines: [say(arg)] };
    case "figma":
      return { lines: [say("▸ opened it. still empty.", "m")] };
    case "hire":
    case "contact":
      return { lines: [{ kind: "link", cls: "g", before: "↳ good call: ", label: "get in touch", href: "/#contact" }] };
    case "rm":
      return { lines: [say("✕ nice try.", "e")] };
    case "clear":
    case "cls":
      return { lines: [], effect: { type: "clear" } };
    case "exit":
    case "quit":
    case "q":
      return { lines: [], effect: { type: "exit" } };
    default:
      return { lines: [say(`command not found: ${word}`, "e"), say("  try help", "m")] };
  }
}
