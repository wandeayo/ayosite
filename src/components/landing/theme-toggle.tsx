"use client";

import { useEffect, useState } from "react";

import { THEME_KEY, type Theme } from "./theme";

const systemTheme = (): Theme => (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null; // storage blocked (private mode, settings): fall back to the device
  }
}

/** Set or clear the override, with transitions paused so colours switch in one frame. */
function applyOverride(theme: Theme | null) {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  if (theme) root.setAttribute("data-theme", theme);
  else root.removeAttribute("data-theme");
  void root.offsetWidth; // commit the new colours before transitions come back
  requestAnimationFrame(() => root.classList.remove("theme-switching"));
}

/**
 * Light/dark toggle. Follows the device until the visitor picks; a pick is
 * remembered (and synced across tabs). Picking the theme the device already
 * uses clears the override, so the page goes back to following the device.
 *
 * Both icons are server-rendered and CSS shows the right one, so the button
 * is correct before hydration and never mismatches.
 */
export function ThemeToggle() {
  // Effective theme; null until mounted, because the server can't know it.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setTheme(readStoredTheme() ?? systemTheme());
    const onDeviceChange = () => {
      if (!readStoredTheme()) sync();
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key !== THEME_KEY) return;
      applyOverride(readStoredTheme());
      sync();
    };

    sync();
    media.addEventListener("change", onDeviceChange);
    window.addEventListener("storage", onStorage);
    return () => {
      media.removeEventListener("change", onDeviceChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const toggle = () => {
    const next: Theme = (readStoredTheme() ?? systemTheme()) === "dark" ? "light" : "dark";
    const followsDevice = next === systemTheme();
    try {
      if (followsDevice) localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, next);
    } catch {
      // not persisted, but the switch still applies for this visit
    }
    applyOverride(followsDevice ? null : next);
    setTheme(next);
  };

  const label = theme ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Switch colour mode";

  return (
    <button type="button" className="tt" onClick={toggle} aria-label={label} title={label}>
      {/* moon in light mode, sun in dark mode: the icon shows where the button takes you.
          Paths are the case-study handoff's (waande-case-handoff/reference, .theme-t). */}
      <svg className="i-sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg className="i-moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
      </svg>
    </button>
  );
}
