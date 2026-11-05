/**
 * The path the 404 shows. Kept out of the "use client" module so the server page can
 * import the pre-paint script as a plain string (as theme.ts does).
 *
 * The 404 is prerendered once at build time, so the server can't know the requested
 * path. The page renders FALLBACK_PATH (the reference's own fallback), PATH_INIT_SCRIPT
 * writes the real one into [data-nf-path] before first paint, and once hydrated React
 * renders the router's path, which is the same text.
 */

export const FALLBACK_PATH = "/this-page";

/** The reference's rule: over 40 characters becomes the first 38 and "…". By code point, so emoji never split. */
export function displayPath(raw: string | null | undefined): string {
  let p = raw || "/";
  try {
    p = decodeURI(p);
  } catch {
    // malformed escapes: show the path as requested
  }
  const chars = Array.from(p);
  return chars.length > 40 ? chars.slice(0, 38).join("") + "…" : p;
}

/** Mirrors displayPath(); keep the two in sync. Text only (textContent), never HTML. */
export const PATH_INIT_SCRIPT = `(function(){try{var p=location.pathname||"/";try{p=decodeURI(p)}catch(e){}var c=Array.from(p);if(c.length>40)p=c.slice(0,38).join("")+"\\u2026";document.querySelectorAll("[data-nf-path]").forEach(function(el){el.textContent=p})}catch(e){}})()`;
