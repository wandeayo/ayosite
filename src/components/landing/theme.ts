/**
 * Colour theme for the landing page. home.css already themes off
 * `prefers-color-scheme`, with `:root[data-theme]` as an explicit override;
 * this sets or clears that override.
 *
 * Kept out of the "use client" module so the server layout can import the
 * pre-paint script as a plain string.
 */

export type Theme = "light" | "dark";

/** localStorage key. Absent means "follow the device". */
export const THEME_KEY = "waande-theme";

/**
 * Runs in <head> before first paint, so a saved choice never flashes the
 * other theme on load. Mirrors readStoredTheme(); keep the two in sync.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
