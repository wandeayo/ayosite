// Receives a visitor's sticky note from the "Kind words" board and emails it to Ayo through Resend.
// From waande-testimonials-handoff/source/api-note-route.ts. No new dependencies: it calls
// Resend's REST API with fetch.
//
// Env (set in Vercel → Project → Settings → Environment Variables, and in .env.local for dev):
//   RESEND_API_KEY   required. From resend.com → API Keys.
//   NOTE_TO_EMAIL    optional. Defaults to ayowandeolubo@gmail.com.
//   NOTE_FROM_EMAIL  optional. Defaults to "waande.com <onboarding@resend.dev>", which only delivers to the
//                    email the Resend account was created with. Once waande.com is verified in Resend, use
//                    something like "waande.com notes <notes@waande.com>".

export const runtime = "nodejs";

const TO = process.env.NOTE_TO_EMAIL || "ayowandeolubo@gmail.com";
const FROM = process.env.NOTE_FROM_EMAIL || "waande.com <onboarding@resend.dev>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort rate limit: 3 notes per IP per 10 minutes. It lives in memory, so it resets when the
// serverless instance does. That's fine for a portfolio; swap in Upstash/Vercel KV if spam ever becomes real.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now(),
    win = 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < win);
  list.push(now);
  hits.set(ip, list);
  return list.length > 3;
}

export async function POST(req: Request) {
  let body: { message?: unknown; email?: unknown; website?: unknown; ms?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const trap = typeof body.website === "string" ? body.website : "";
  const ms = typeof body.ms === "number" ? body.ms : 0;

  // Bots: filled the hidden field, or "wrote" the note in under 2 seconds. Pretend it worked.
  if (trap || ms < 2000) return Response.json({ ok: true });

  if (!message || message.length > 500) return Response.json({ ok: false }, { status: 400 });
  if (email && (email.length > 120 || !EMAIL_RE.test(email))) return Response.json({ ok: false }, { status: 400 });

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return Response.json({ ok: false }, { status: 429 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ ok: false }, { status: 500 });

  const text = `${message}\n\n— ${email || "no email left"}\nSent from the Kind words board on waande.com`;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      subject: "A note from waande.com",
      text, // plain text only, so nothing the visitor typed is ever rendered as HTML
      ...(email ? { reply_to: email } : {}),
    }),
  });

  return Response.json({ ok: r.ok }, { status: r.ok ? 200 : 502 });
}
