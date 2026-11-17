/**
 * The path the 404 shows, and the kind of page the frame guesses it would have been.
 * Kept out of the "use client" module so the server page can import the pre-paint
 * script as a plain string (as theme.ts does).
 *
 * The 404 is prerendered once at build time, so the server can't know the requested
 * path. The page renders the fallbacks below, PATH_INIT_SCRIPT writes the real path and
 * kind in before first paint, and once hydrated React renders the same from the router.
 */

export const FALLBACK_PATH = "/this-page";

/** Decoded for display and matching; malformed escapes stay as requested. */
export function decodePath(raw: string | null | undefined): string {
  const p = raw || "/";
  try {
    return decodeURI(p);
  } catch {
    return p;
  }
}

/** The reference's rule: over 40 characters becomes the first 38 and "…". By code point, so emoji never split. */
export function displayPath(raw: string | null | undefined): string {
  const p = decodePath(raw);
  const chars = Array.from(p);
  return chars.length > 40 ? chars.slice(0, 38).join("") + "…" : p;
}

/**
 * What the missing page would have been, from its first segment. `label` names the frame
 * ("Article · /blog/hello"). Sources are strings so the inline script can share them.
 */
export const KINDS = [
  { kind: "article", label: "Article", re: "^/(blog|posts?|articles?|notes?|journal|essays?|news|writing)(/|$)" },
  { kind: "case", label: "Case study", re: "^/(work|case-?stud(y|ies)|cases?|projects?|portfolio)(/|$)" },
  { kind: "shop", label: "Shop", re: "^/(shop|store|products?|cart|checkout|merch|buy)(/|$)" },
  { kind: "form", label: "Form", re: "^/(contact|hire|book|log-?in|sign-?in|sign-?up|register|subscribe|newsletter|wp-login\\.php)(/|$)" },
  { kind: "dashboard", label: "Dashboard", re: "^/(admin|dashboard|app|settings|account|wp-admin|cpanel)(/|$)" },
] as const;

export type Kind = (typeof KINDS)[number]["kind"] | "page";

export const FALLBACK_KIND = { kind: "page", label: "Frame" } as const satisfies { kind: Kind; label: string };

export function kindFor(raw: string | null | undefined): { kind: Kind; label: string } {
  const p = decodePath(raw).toLowerCase();
  return KINDS.find((k) => new RegExp(k.re).test(p)) ?? FALLBACK_KIND;
}

const RULES = JSON.stringify(KINDS.map((k) => [k.kind, k.label, k.re]));

/** Mirrors displayPath() and kindFor(); keep them in sync. Text only (textContent), never HTML. */
export const PATH_INIT_SCRIPT = `(function(){try{var p=location.pathname||"/";try{p=decodeURI(p)}catch(e){}var R=${RULES},k="page",l="Frame",s=p.toLowerCase();for(var i=0;i<R.length;i++)if(new RegExp(R[i][2]).test(s)){k=R[i][0];l=R[i][1];break}var c=Array.from(p);if(c.length>40)p=c.slice(0,38).join("")+"\\u2026";document.querySelectorAll("[data-nf-path]").forEach(function(el){el.textContent=p});document.querySelectorAll("[data-nf-kind]").forEach(function(el){el.textContent=l});var f=document.querySelector("[data-nf-frame]");if(f)f.setAttribute("data-kind",k)}catch(e){}})()`;
