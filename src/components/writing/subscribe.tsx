"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "ok" | "error";

/**
 * Newsletter subscribe form. Wired client-side so the route remains static.
 * Replace the handler with a real endpoint (Resend / Buttondown / Loops) when ready.
 */
export function SubscribeBlock() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    // TODO: POST to a real subscribe endpoint.
    setTimeout(() => setStatus("ok"), 400);
  };

  return (
    <Container as="section" className="mt-15 border-t border-line py-15">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="font-serif text-[32px] tracking-[-0.01em]">Subscribe for new field notes.</p>
          <p className="mt-2 text-ink-dim">
            One post a month, never more. No spam, no AI summaries.
          </p>
        </div>
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <input
            type="email"
            value={email}
            placeholder="you@studio.com"
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              "min-w-[280px] rounded-full border bg-transparent px-5 py-3.5 font-mono text-[13px] text-ink outline-none transition-colors placeholder:text-ink-faint",
              status === "error" ? "border-warn" : "border-line-strong focus:border-ink",
            )}
            aria-label="Your email address"
            required
          />
          <Button variant="primary" type="submit" disabled={status === "submitting"}>
            {status === "ok" ? "Subscribed" : "Subscribe"}
          </Button>
        </form>
      </div>
    </Container>
  );
}
