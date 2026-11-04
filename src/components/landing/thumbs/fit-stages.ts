/** Stage width in px; every thumbnail is authored at this width. */
export const STAGE_W = 1440;

/**
 * Runs inline, right after the grid's HTML, so every stage has its real scale
 * before first paint, as in the prototype. Chrome rasterizes the
 * `will-change: transform` cameras at their first-painted scale and may keep
 * it after a small change, so fitting only after hydration leaves the tiles
 * slightly soft. players.ts' ResizeObserver takes over from there.
 */
export const FIT_STAGES_INLINE = `document.querySelectorAll(".work .view,.work .thumb.dark").forEach(function(v){var s=v.querySelector(".stage,.ph-stage");if(s)s.style.setProperty("--s",v.getBoundingClientRect().width/${STAGE_W})})`;
