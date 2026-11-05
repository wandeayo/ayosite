/**
 * Runs inline after a page's prototypes, so each ProtoFrame has its real scale
 * (and so its height) before first paint instead of jumping after hydration.
 * ProtoFrame's ResizeObserver takes over from there. Kept out of the
 * "use client" module so server components can import the plain string.
 */
export const FIT_PROTOS_INLINE = `document.querySelectorAll(".pview").forEach(function(v){var s=v.clientWidth/(+v.dataset.w),st=v.querySelector(".pstage");v.style.setProperty("--s",s);if(st)st.style.setProperty("--s",s)})`;
