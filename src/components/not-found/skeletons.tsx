/**
 * The frame's contents: what the missing page would have looked like, by kind (path.ts).
 * All six are in the HTML and CSS shows the one matching the frame's data-kind, so the
 * pre-paint script can pick it before first paint. "page" is the reference's skeleton.
 */

function Nav() {
  return (
    <div className="nf-sk-r">
      <i style={{ width: "18%" }} />
      <i style={{ width: "28%" }} />
    </div>
  );
}

const repeat = (n: number) => Array.from({ length: n }, (_, i) => i);

export function FrameSkeletons() {
  return (
    <>
      <div className="nf-sk nf-sk-page">
        <Nav />
        <div className="nf-sk-h">
          <i style={{ width: "62%" }} />
          <i style={{ width: "40%", height: 9 }} />
        </div>
        <div className="nf-sk-g">
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="nf-sk nf-sk-article">
        <Nav />
        <div className="nf-sk-col">
          <i className="t" />
          <i className="s" />
          <i className="img" />
          <i />
          <i />
          <i style={{ width: "78%" }} />
        </div>
      </div>

      <div className="nf-sk nf-sk-case">
        <Nav />
        <div className="nf-sk-h">
          <i style={{ width: "20%", height: 7 }} />
          <i style={{ width: "70%" }} />
        </div>
        <i className="nf-sk-tile" />
      </div>

      <div className="nf-sk nf-sk-shop">
        <Nav />
        <div className="nf-sk-p">
          {repeat(8).map((i) => (
            <div key={i}>
              <i />
              <b />
              <b />
            </div>
          ))}
        </div>
      </div>

      <div className="nf-sk nf-sk-form">
        <Nav />
        <div className="nf-sk-f">
          <i className="t" />
          <b />
          <b />
          <b className="tall" />
          <i className="btn" />
        </div>
      </div>

      <div className="nf-sk nf-sk-dashboard">
        <div className="nf-sk-side">
          {repeat(6).map((i) => (
            <i key={i} />
          ))}
        </div>
        <div className="nf-sk-main">
          <Nav />
          <div className="nf-sk-stats">
            <i />
            <i />
            <i />
          </div>
          <div className="nf-sk-tile">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none">
              <polyline points="0,33 12,27 24,30 36,19 48,23 60,13 72,17 84,8 100,11" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
