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

  const label = theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Switch colour theme";

  return (
    <button type="button" className="tt" onClick={toggle} aria-label={label} title={label}>
      {/* moon in light mode, sun in dark mode: the icon shows where the button takes you */}
      <svg className="i-moon" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M13.5 9.6A5.75 5.75 0 0 1 6.4 2.5a5.75 5.75 0 1 0 7.1 7.1Z" />
      </svg>
      <svg className="i-sun" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="2.75" />
        <path d="M8 1.5v1.25M8 13.25v1.25M1.5 8h1.25M13.25 8h1.25M3.4 3.4l.9.9M11.7 11.7l.9.9M3.4 12.6l.9-.9M11.7 4.3l.9-.9" />
      </svg>
    </button>
  );
}
