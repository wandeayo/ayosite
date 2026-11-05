"use client";

import { useEffect, useRef, useState } from "react";

import { AppShell, FeedbackOpening } from "./shell";

/**
 * Fig. 3: campaign chat in the real app shell. Port of "Prototype B" in
 * reference/carmen.html. Opens on the feedback summary; suggestion chips and
 * free text both work; Carmen types for 900ms per line and replies twice; a
 * used chip disappears; "Start over" restores the opening.
 */

const REPLIES: Record<string, readonly [string, string]> = {
  "Yes, find more like these": [
    "On it. Searching for companies similar to CloudBridge, GreenWave and NextGen.",
    "I’ve added the strongest new matches to your review queue. Approve them and I’ll start outreach.",
  ],
  "Focus on EMEA only": [
    "Got it. I’ll focus on EMEA and pause sourcing outside the region.",
    "Your current matches are re-ranked for EMEA. Anything else you’d like me to change?",
  ],
  "Prioritise cloud infrastructure": [
    "Prioritising cloud infrastructure. Partners in that space will move to the top of your list.",
    "Done. I’ll weight cloud and DevOps signals more heavily from now on.",
  ],
};

const TYPING_MS = 900;
const BETWEEN_MS = 350;

interface Msg {
  id: number;
  kind: "me" | "bot" | "typing";
  text: string;
}

export function ChatProto() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [used, setUsed] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  const log = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const nextId = useRef(0);
  // Bumped by "Start over": any reply still in flight from before is dropped.
  const generation = useRef(0);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Keep the newest message in view, as the reference does after every add.
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [msgs]);

  const wait = (ms: number) => new Promise<void>((res) => timers.current.push(setTimeout(res, ms)));
  const add = (kind: Msg["kind"], text = "") => {
    const id = nextId.current++;
    setMsgs((m) => [...m, { id, kind, text }]);
    return id;
  };

  const say = async (text: string) => {
    if (busy) return;
    const gen = generation.current;
    setBusy(true);
    add("me", text);
    setUsed((u) => [...u, text]);
    const replies = REPLIES[text] ?? [`Noted: “${text}”. I’ll factor that into the search.`, "I’ll keep the rest of your preferences as they are."];
    for (const line of replies) {
      const t = add("typing");
      await wait(TYPING_MS);
      if (gen !== generation.current) return;
      setMsgs((m) => m.filter((x) => x.id !== t));
      add("bot", line);
      await wait(BETWEEN_MS);
      if (gen !== generation.current) return;
    }
    setBusy(false);
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    generation.current++;
    setBusy(false);
    setMsgs([]);
    setUsed([]);
  };

  const chips = Object.keys(REPLIES).filter((k) => !used.includes(k));

  return (
    <AppShell>
      <div className="fs-log" id="pb-log" aria-live="polite" ref={log}>
        <FeedbackOpening />
        {msgs.map((m) =>
          m.kind === "typing" ? (
            <div key={m.id} className="fs-msg typing">
              <i />
              <i />
              <i />
            </div>
          ) : (
            <div key={m.id} className={m.kind === "me" ? "fs-msg me" : "fs-msg "}>
              {m.text}
            </div>
          ),
        )}
        <div className="fs-sugg">
          <small>Suggestions to find more partners</small>
          <div id="pb-sugg">
            {!busy && (
              <>
                {chips.map((k) => (
                  <button key={k} type="button" onClick={() => say(k)}>
                    {k}
                  </button>
                ))}
                {used.length > 0 && (
                  <button type="button" data-reset onClick={reset}>
                    Start over
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <form
        className="fs-comp"
        id="pb-form"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          const v = draft.trim();
          if (!v) return;
          setDraft("");
          say(v);
        }}
      >
        <span>+</span>
        <input
          id="pb-in"
          type="text"
          placeholder="Type your message..."
          aria-label="Reply to Carmen"
          maxLength={120}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit" aria-label="Send">
          ↑
        </button>
      </form>
    </AppShell>
  );
}
