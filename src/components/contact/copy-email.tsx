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
        "inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-line text-ink-dim align-middle",
        "transition-colors duration-200 hover:border-line-strong hover:text-ink",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
      )}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}

function CopyIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px] text-accent"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
