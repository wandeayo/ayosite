import type { ThumbKind } from "@/lib/projects";

interface WorkThumbProps {
  kind: ThumbKind;
}

const ACCENT = "var(--color-accent)";

export function WorkThumb({ kind }: WorkThumbProps) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 100% at 70% 0%, rgba(255,255,255,.04), transparent 60%), #101216",
        fontFamily: "var(--font-mono)",
      }}
    >
      {kind === "carmen" && <CarmenThumb />}
      {kind === "airstride" && <AirstrideThumb />}
      {kind === "arctic" && <ArcticThumb />}
      {kind === "dexla" && <DexlaThumb />}
    </div>
  );
}

/* ──────────────────────────────────────────────
   CARMEN AI — autonomous agent command center
────────────────────────────────────────────── */
function CarmenThumb() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontSize: 10,
            letterSpacing: ".1em",
            color: "#8b8d93",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: ACCENT,
              boxShadow: `0 0 8px ${ACCENT}`,
              animation: "car-dot 2s ease-in-out infinite",
            }}
          />
          CARMEN · RUNNING
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 10,
            color: "#c4c3bf",
            border: "1px solid rgba(255,255,255,.16)",
            borderRadius: 6,
            padding: "4px 9px",
          }}
        >
          ❚❚ Pause
        </span>
      </div>

      {/* metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
        {[
          { label: "MESSAGES", val: "289", accent: false },
          { label: "REPLIES", val: "24", accent: false },
          { label: "REPLY RATE", val: "18.9%", accent: true },
        ].map(({ label, val, accent }) => (
          <div
            key={label}
            style={{
              border: accent
                ? "1px solid rgba(200,242,80,.3)"
                : "1px solid rgba(255,255,255,.08)",
              borderRadius: 8,
              padding: "8px 10px",
              background: accent ? "rgba(200,242,80,.06)" : "rgba(255,255,255,.02)",
            }}
          >
            <div
              style={{
                fontSize: 8,
                letterSpacing: ".06em",
                color: accent ? "#8a9a55" : "#6e7075",
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 19,
                color: accent ? ACCENT : "#e8e6e1",
                lineHeight: 1.1,
              }}
            >
              {val}
            </div>
          </div>
        ))}
      </div>

      {/* live timeline */}
      <div
        style={{
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 9,
          padding: "10px 11px",
          background: "rgba(255,255,255,.02)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 9,
            color: "#9a9aa0",
          }}
        >
          <span>Enriching contacts</span>
          <span style={{ color: "#6e7075" }}>271 / 412 · 3.2/min</span>
        </div>
        <div
          style={{
            height: 4,
            borderRadius: 3,
            background: "rgba(255,255,255,.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 3,
              background: ACCENT,
              animation: "car-progress 3.6s ease-in-out infinite",
              width: "8%",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 9,
            color: "#c4c3bf",
            animation: "car-feed1 3.6s ease-in-out infinite",
          }}
        >
          <span
            style={{ width: 5, height: 5, borderRadius: "50%", background: "#4b4f59", flex: "none" }}
          />
          4 partners enriched · 24 messages generated
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 9,
            color: "#c4c3bf",
            animation: "car-feed2 3.6s ease-in-out infinite",
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: ACCENT,
              flex: "none",
              animation: "car-tick 3.6s ease-in-out infinite",
            }}
          />
          2 positive replies waiting · review
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   AIRSTRIDE — 6-module platform, deals scannable
────────────────────────────────────────────── */
const AIR_MODULES = ["Overview", "Deals", "Mapping", "Analytics", "Training", "Engagement"];

function AirstrideThumb() {
  return (
    <div style={{ position: "absolute", inset: 0, padding: 18, display: "flex" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          border: "1px solid rgba(255,255,255,.1)",
          borderRadius: 10,
          overflow: "hidden",
          background: "#0c0d11",
        }}
      >
        {/* sidebar */}
        <div
          style={{
            width: "34%",
            borderRight: "1px solid rgba(255,255,255,.08)",
            padding: "12px 11px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 8, letterSpacing: ".1em", color: "#6e7075", marginBottom: 2 }}>
            MODULES
          </span>
          {AIR_MODULES.map((mod, i) => (
            <div
              key={mod}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "5px 7px",
                borderRadius: 5,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 4,
                  bottom: 4,
                  width: 2,
                  borderRadius: 2,
                  background: ACCENT,
                  animation: `air-active 6s linear ${i}s infinite`,
                }}
              />
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 3,
                  background: "#3a3d44",
                }}
              />
              <span style={{ fontSize: 9, color: "#c4c3bf" }}>{mod}</span>
            </div>
          ))}
        </div>

        {/* main content */}
        <div style={{ flex: 1, padding: "12px 13px", position: "relative", overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 9,
            }}
          >
            <span style={{ fontSize: 10, color: "#e8e6e1" }}>Deals</span>
            <span
              style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 8, color: "#9a9aa0" }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#ff7a59",
                  animation: "air-flag 1.6s ease-in-out infinite",
                }}
              />
              Needs action
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {[
              { w: "46%", label: "In mgmt", color: "#6fd3ff", bg: "rgba(111,211,255,.16)" },
              { w: "38%", label: "Done", color: ACCENT, bg: "rgba(200,242,80,.16)" },
              { w: "52%", label: "Default", color: "#9a9aa0", bg: "rgba(255,255,255,.08)" },
            ].map(({ w, label, color, bg }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "7px 9px",
                  border: "1px solid rgba(255,255,255,.07)",
                  borderRadius: 6,
                }}
              >
                <span style={{ height: 4, width: w, borderRadius: 2, background: "#3a3d44" }} />
                <span
                  style={{ fontSize: 7, padding: "2px 6px", borderRadius: 999, background: bg, color }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* sliding detail panel */}
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              bottom: 8,
              width: "58%",
              border: "1px solid rgba(255,255,255,.12)",
              borderRadius: 8,
              background: "#15171c",
              boxShadow: "-12px 0 24px rgba(0,0,0,.4)",
              padding: 11,
              display: "flex",
              flexDirection: "column",
              gap: 7,
              animation: "air-panel 4.4s ease-in-out infinite",
            }}
          >
            <span
              style={{ width: 24, height: 24, borderRadius: "50%", background: "#2a2d34" }}
            />
            <span style={{ height: 5, width: "70%", borderRadius: 3, background: "#34373f" }} />
            <span style={{ height: 4, width: "90%", borderRadius: 2, background: "#26282e" }} />
            <span style={{ height: 4, width: "80%", borderRadius: 2, background: "#26282e" }} />
            <span
              style={{
                marginTop: "auto",
                height: 18,
                borderRadius: 5,
                background: ACCENT,
                opacity: 0.85,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ARCTIC EDGE — ice-bath temperature dial
────────────────────────────────────────────── */
function ArcticThumb() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* State 1: COOLING */}
      <div
        style={{
          position: "absolute",
          width: 144,
          height: 144,
          animation: "arc-s1 6s ease-in-out infinite",
        }}
      >
        <svg
          viewBox="0 0 120 120"
          style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}
        >
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="6" />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#5cc8ff"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="327"
            strokeDashoffset="120"
          />
          <circle cx="60" cy="8" r="2.6" fill="#5cc8ff" />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 13, color: "#5cc8ff" }}>❄</span>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 38,
              color: "#ece9e3",
              lineHeight: 1,
            }}
          >
            3°
          </span>
          <span style={{ fontSize: 8, letterSpacing: ".14em", color: "#5cc8ff", marginTop: 3 }}>
            COOLING
          </span>
        </div>
      </div>

      {/* State 2: HEATING */}
      <div
        style={{
          position: "absolute",
          width: 144,
          height: 144,
          animation: "arc-s2 6s ease-in-out infinite",
        }}
      >
        <svg
          viewBox="0 0 120 120"
          style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}
        >
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="6" />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#ff6a55"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="327"
            strokeDashoffset="80"
          />
          <circle cx="60" cy="8" r="2.6" fill="#ff6a55" />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 13, color: "#ff6a55" }}>〜</span>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 38,
              color: "#ece9e3",
              lineHeight: 1,
            }}
          >
            40°
          </span>
          <span style={{ fontSize: 8, letterSpacing: ".14em", color: "#ff6a55", marginTop: 3 }}>
            HEATING
          </span>
        </div>
      </div>

      {/* State 3: OFF */}
      <div
        style={{
          position: "absolute",
          width: 144,
          height: 144,
          animation: "arc-s3 6s ease-in-out infinite",
        }}
      >
        <svg
          viewBox="0 0 120 120"
          style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}
        >
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="6" />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 38,
              color: "#5b5f66",
              lineHeight: 1,
            }}
          >
            —
          </span>
          <span style={{ fontSize: 8, letterSpacing: ".14em", color: "#6e7075", marginTop: 7 }}>
            SYSTEM OFF
          </span>
        </div>
      </div>

      <span
        style={{
          position: "absolute",
          bottom: 18,
          fontSize: 8,
          letterSpacing: ".1em",
          color: "#6e7075",
        }}
      >
        SAME DIAL · STATE IN COLOUR
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────
   DEXLA — design tokens cycling through themes
────────────────────────────────────────────── */
function DexlaThumb() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "24px 28px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 18,
      }}
    >
      {/* swatch row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10, letterSpacing: ".12em", color: "#8b8d93" }}>TOKENS</span>
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          {[
            { bg: "#c8ff5a", delay: "0s" },
            { bg: "#5b6cff", delay: ".3s" },
            { bg: "#ff7a59", delay: ".6s" },
          ].map(({ bg, delay }) => (
            <span
              key={bg}
              style={{
                width: 18,
                height: 18,
                borderRadius: 5,
                background: bg,
                animation: `tw-swatch 3s ease-in-out ${delay} infinite`,
              }}
            />
          ))}
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: 5,
              border: "1px solid rgba(255,255,255,.16)",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                fontSize: 8,
                color: "#6e7075",
              }}
            >
              8
            </span>
          </span>
        </div>
      </div>

      {/* dashed divider */}
      <div
        style={{
          height: 1,
          background:
            "repeating-linear-gradient(90deg,rgba(255,255,255,.16) 0 6px,transparent 6px 12px)",
        }}
      />

      {/* themed button pair */}
      <div
        style={{ position: "relative", display: "flex", alignItems: "center", gap: 10 }}
      >
        <span
          style={{
            position: "relative",
            padding: "9px 18px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            color: "#08130d",
            animation: "tw-theme-a 3s steps(1) infinite",
          }}
        >
          Button
          {/* colour dot indicator */}
          <span
            style={{ position: "absolute", right: -2, top: -7, width: 6, height: 6, borderRadius: "50%", background: "#fff" }}
          >
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#c8ff5a", animation: "tw-active 3s steps(1) infinite" }} />
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#5b6cff", opacity: 0, animation: "tw-active2 3s steps(1) infinite" }} />
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#ff7a59", opacity: 0, animation: "tw-active3 3s steps(1) infinite" }} />
          </span>
        </span>
        <span
          style={{
            padding: "9px 18px",
            borderRadius: 8,
            border: "1px solid",
            fontSize: 12,
            background: "transparent",
            animation: "tw-theme-b 3s steps(1) infinite",
          }}
        >
          Ghost
        </span>
        <span
          style={{ marginLeft: "auto", fontSize: 9, letterSpacing: ".08em", color: "#6e7075" }}
        >
          THEMED →
        </span>
      </div>
    </div>
  );
}
