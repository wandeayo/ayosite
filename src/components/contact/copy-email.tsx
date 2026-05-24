"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";

interface CopyEmailProps {
  email: string;
}

export function CopyEmail({ email }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard write can fail on insecure origins or denied permissions;
      // fall through silently rather than swallowing the click feedback entirely.
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Email copied to clipboard" : `Copy ${email} to clipboard`}
      className={cn(
        "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-line text-ink-dim align-middle",
        "transition-colors duration-200 hover:border-line-strong hover:text-ink",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
      )}
    >
      <span aria-hidden className="font-mono text-[11px] uppercase tracking-[0.08em]">
        {copied ? "Ok" : "Cp"}
      </span>
    </button>
  );
}
