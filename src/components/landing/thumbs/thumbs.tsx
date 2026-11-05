/**
 * Thumbnail markup, ported from the approved prototype. Server-rendered in each
 * scene's rest state (what `reset()` produces) so nothing jumps on hydration.
 * The ids are hooks for scenes.ts and are unique on the page.
 */
import { Shot } from "./shot";

function Cursor() {
  return (
    <div className="cursor">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 3l14 8.2-6.2 1.3L10 19z" fill="#111" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** Browser window frame with a 1440 × 1008 stage scaled into its view. */
function Window({ stageId, children }: { stageId?: string; children: React.ReactNode }) {
  return (
    <div className="win" aria-hidden="true">
      <div className="chrome">
        <i />
        <i />
        <i />
      </div>
      <div className="view">
        {/* --s is set inline before hydration (fit-stages.ts) */}
        <div className="stage" id={stageId} suppressHydrationWarning>
          {children}
        </div>
      </div>
    </div>
  );
}

const ROW_TOPS = [350, 458, 566, 674, 782] as const;
const STAT_LEFTS = [383, 637, 891, 1145] as const;

export function CarmenThumb() {
  return (
    <div className="thumb" data-play="carmen" role="img" aria-label="Carmen: partner matching and a running campaign, animated">
      <Window>
        <div className="abs cam" style={{ inset: 0 }}>
          <div className="abs fade hide" id="c-on" style={{ inset: 0, background: "#fafafa" }}>
            <Shot name="carmen-01-scanning" className="abs" style={{ left: 0, top: 0 }} />
            <div className="abs c-spin">
              <i />
            </div>
            <div className="abs c-bar">
              <i id="c-fill" />
            </div>
            <Shot name="carmen-02-review-base" id="c-rb" className="abs fade hide" style={{ left: 0, top: 0 }} />
            {ROW_TOPS.map((top, i) => (
              <Shot
                key={top}
                name={`carmen-02-row-${i}` as `carmen-02-row-${0 | 1 | 2 | 3 | 4}`}
                className="abs c-row hide"
                style={{ left: 605, top }}
              />
            ))}
            <Shot name="carmen-02-buttons" id="c-btn" className="abs c-row c-press hide" style={{ left: 1083, top: 908 }} />
          </div>
          <div className="abs fade" id="c-run" style={{ inset: 0, background: "#f7f7fb" }}>
            <div className="abs c-campwrap" id="c-camp" style={{ left: 0, top: 0, width: 1440 }}>
              <Shot name="carmen-03-campaign" />
              <div className="abs c-pulse" />
              {STAT_LEFTS.map((left, i) => (
                <Shot
                  key={left}
                  name={`carmen-03-stat-${i}` as `carmen-03-stat-${0 | 1 | 2 | 3}`}
                  className="abs c-card"
                  style={{ left, top: 429, width: 240 }}
                />
              ))}
            </div>
          </div>
          <Cursor />
        </div>
      </Window>
    </div>
  );
}

const SKELETON_LINES = [
  { width: "30%", marginTop: 12 },
  { width: "92%" },
  { width: "74%" },
  { width: "38%", marginTop: 12 },
] as const;
const SKELETON_TAIL = [{ width: "34%", marginTop: 12 }, { width: "80%" }, { width: "60%" }, { width: "76%" }, { width: "52%" }] as const;

export function AirstrideThumb() {
  return (
    <div className="thumb" data-play="air" role="img" aria-label="Airstride: deals board and an AI deal summary, animated">
      <Window stageId="a-stage">
        <div className="abs cam" id="a-cam" style={{ inset: 0 }}>
          <Shot name="airstride-01-board" className="abs a-board" style={{ left: 0, top: 0 }} />
          <div className="abs a-hover" id="a-hover" />
          <div className="abs a-menu hide" id="a-menu">
            <Shot name="airstride-02-menu" />
            <div className="abs a-item" id="a-item" />
          </div>
          <div className="abs a-modal hide" id="a-modal">
            <Shot name="airstride-03-summary-modal" />
            <div className="abs a-skel" id="a-skel">
              <div className="a-gen">
                <i />
                Carmen is reading CRM and partner notes…
              </div>
              <div className="row">
                <div className="sk box" />
                <div className="sk box" />
                <div className="sk box" />
              </div>
              {SKELETON_LINES.map((s, i) => (
                <div key={i} className="sk" style={s} />
              ))}
              <div className="sk box" style={{ height: 70 }} />
              {SKELETON_TAIL.map((s, i) => (
                <div key={i} className="sk" style={s} />
              ))}
            </div>
          </div>
          <Cursor />
        </div>
      </Window>
    </div>
  );
}

export function ArcticThumb() {
  return (
    <div className="thumb dark" data-play="arctic" role="img" aria-label="Arctic Edge: switching between cooling and heating, animated">
      <div className="ph-stage" aria-hidden="true" suppressHydrationWarning>
        <div className="abs ph-glow" id="r-glow" />
        <div className="abs cam ph-cam" id="r-cam">
          <div className="abs phone">
            <Shot name="arctic-01-cooling" />
            <Shot name="arctic-02-heating" id="r-heat" className="r-heat" />
            <div className="abs r-breath" id="r-breath" />
            <div className="abs r-tri" id="r-tri" />
          </div>
          <Cursor />
        </div>
      </div>
    </div>
  );
}

export function DexlaThumb() {
  return (
    <div className="thumb" data-play="dexla" role="img" aria-label="Dexla: one token change updating every component, animated">
      <Window>
        <div className="abs cam" style={{ inset: 0 }}>
          <div className="abs dx" id="dx">
            <div className="abs dx-top">
              <div className="dx-crumb">
                <span className="dx-logo">D</span>
                <b>Dexla</b>
                <span>/</span>
                <span>Acme Logistics</span>
                <span>/</span>
                <span>Design system</span>
              </div>
              <div className="dx-actions">
                <span style={{ display: "flex", marginRight: 6 }}>
                  <span className="dx-av">TM</span>
                  <span className="dx-av">AO</span>
                </span>
                <span className="dx-pill">Preview</span>
                <span className="dx-pill p">Publish</span>
              </div>
            </div>
            <div className="abs dx-side">
              <h5>
                Tokens <span>core · v2.4</span>
              </h5>
              <div className="dx-g">Color</div>
              <div className="dx-t" id="dx-tb">
                <span className="dx-sw" id="dx-sw" style={{ background: "#18181b" }} />
                <code>action/brand</code>
                <span className="v" id="dx-bv">
                  zinc/900
                </span>
              </div>
              <div className="dx-t">
                <span className="dx-sw" id="dx-ss" style={{ background: "#fff" }} />
                <code>surface/default</code>
                <span className="v" id="dx-sv">
                  white
                </span>
              </div>
              <div className="dx-t">
                <span className="dx-sw" style={{ background: "#71717a" }} />
                <code>text/subtle</code>
                <span className="v">zinc/500</span>
              </div>
              <div className="dx-t">
                <span className="dx-sw" style={{ background: "#e4e4e7" }} />
                <code>border/default</code>
                <span className="v">zinc/200</span>
              </div>
              <div className="dx-g">Shape</div>
              <div className="dx-t" id="dx-tr">
                <span className="dx-sw" style={{ borderRadius: "2px 9px 2px 2px", background: "#f4f3f8" }} />
                <code>radius/control</code>
                <span className="v" id="dx-rv">
                  6px
                </span>
              </div>
              <div className="dx-t">
                <span className="dx-sw" style={{ background: "#f4f3f8" }} />
                <code>space/inset</code>
                <span className="v">12px</span>
              </div>
              <div className="dx-g">Mode</div>
              <div className="dx-seg">
                <span className="on" id="dx-l">
                  Light
                </span>
                <span id="dx-d">Dark</span>
              </div>
              <div className="dx-map" id="dx-map">
                surface/default → <b>white</b>
                <br />
                text/default → <b>zinc/900</b>
              </div>
            </div>
            <div className="abs dx-canvas">
              <div
                className="abs"
                style={{ left: 56, top: 210, width: 1000, height: 520, transform: "scale(1.08)", transformOrigin: "0 0" }}
              >
                <div className="abs" style={{ left: 0, top: 0, width: 500 }}>
                  <div className="dx-lbl">Form / Create workspace</div>
                  <div className="dx-art">
                    <h6>
                      New workspace{" "}
                      <span className="dx-badge" data-u="">
                        Draft
                      </span>
                    </h6>
                    <p>Apps in this workspace share data sources and roles.</p>
                    <div className="dx-l">Workspace name</div>
                    <div className="dx-in" data-u="">
                      Acme Logistics
                    </div>
                    <div className="dx-l">Region</div>
                    <div className="dx-in ph" data-u="">
                      <span>Europe (Frankfurt)</span>
                      <span>⌄</span>
                    </div>
                    <div className="dx-tg" data-u="">
                      <span>Enable AI suggestions</span>
                      <span className="dx-sw2" data-u="" />
                    </div>
                    <div className="dx-btns">
                      <span className="dx-b" data-u="">
                        Cancel
                      </span>
                      <span className="dx-b p" data-u="">
                        Create workspace
                      </span>
                    </div>
                  </div>
                </div>
                <div className="abs" style={{ left: 540, top: 0, width: 440 }}>
                  <div className="dx-lbl">List / Members</div>
                  <div className="dx-art">
                    <h6>
                      Members{" "}
                      <span className="dx-b p" data-u="" style={{ fontSize: 13, padding: "7px 12px" }}>
                        Invite
                      </span>
                    </h6>
                    <p>4 people can edit apps in Acme Logistics.</p>
                    <Member initials="TM" name="Tom McDonough" email="tom@dexla.ai" badge="Owner" />
                    <Member initials="AO" name="Ayowande Olubo" email="ayo@dexla.ai" badge="Editor" />
                    <Member initials="KN" name="Kemi Nwosu" email="kemi@acme.co" badge="Invited" ok />
                  </div>
                </div>
              </div>
              <div className="dx-toast" id="dx-toast">
                updated
              </div>
            </div>
          </div>
          <Cursor />
        </div>
      </Window>
    </div>
  );
}

function Member({ initials, name, email, badge, ok }: { initials: string; name: string; email: string; badge: string; ok?: boolean }) {
  return (
    <div className="dx-mem">
      <i>{initials}</i>
      <span>
        {name}
        <small>{email}</small>
      </span>
      <span className={ok ? "dx-badge ok" : "dx-badge"} data-u="">
        {badge}
      </span>
    </div>
  );
}
