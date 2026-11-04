/**
 * Playback for every `.thumb[data-play]` under `root`. Port of the prototype's
 * player block, with a teardown so React (and Strict Mode's double effects)
 * can start and stop it cleanly.
 *
 * - Autoplay in a loop while ≥35% visible; stop and reset when it leaves.
 * - First start staggered by index × 900ms so tiles never move in sync.
 * - Everything stops while the tab is hidden.
 * - Hover (fine pointers): freeze the story and turn the camera into a loupe
 *   that follows the pointer; leaving restores the scripted framing and resumes.
 * - prefers-reduced-motion: no autoplay; tiles stay on their rest frame.
 */
import { $, STOP, createKit, getSavedFraming, setCam, sleep } from "./engine";
import { STAGE_W } from "./fit-stages";
import { SCENES, type SceneName } from "./scenes";

const VISIBLE_AT = 0.35;
const STAGGER_MS = 900;
const LOUPE_DESKTOP = 1.6;
const LOUPE_PHONE = 2.4;
const LOUPE_RELEASE_MS = 450;

interface Player {
  thumb: HTMLElement;
  inView: boolean;
  held: boolean;
  token: number;
  first: boolean;
  play: () => void;
  stop: () => void;
}

export function startThumbnails(root: HTMLElement): () => void {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const teardown: Array<() => void> = [];
  let disposed = false;

  // Fit each stage to its frame: desktop screens to the window view,
  // the phone stage to the whole tile.
  const ro = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const stage = entry.target.querySelector<HTMLElement>(".stage,.ph-stage");
      stage?.style.setProperty("--s", String(entry.contentRect.width / STAGE_W));
    }
  });
  root.querySelectorAll(".view,.thumb.dark").forEach((el) => ro.observe(el));
  teardown.push(() => ro.disconnect());

  const players: Player[] = Array.from(root.querySelectorAll<HTMLElement>(".thumb[data-play]")).map(
    (thumb, index) => {
      const scene = SCENES[thumb.dataset.play as SceneName];
      scene.reset(thumb);

      const p: Player = {
        thumb,
        inView: false,
        held: false,
        token: 0,
        first: true,
        play() {
          if (disposed || reduce || !p.inView || document.hidden || thumb.classList.contains("playing")) return;
          const mine = ++p.token;
          const alive = () => mine === p.token;
          thumb.classList.add("playing");
          const delay = p.first ? index * STAGGER_MS : 0;
          p.first = false;
          void (async () => {
            try {
              await sleep(delay);
              if (!alive()) return;
              while (alive()) await scene.run(thumb, createKit(thumb, alive, () => p.held));
            } catch (err) {
              if (err !== STOP) console.error(err);
            }
          })();
        },
        stop() {
          p.token++;
          thumb.classList.remove("playing");
          scene.reset(thumb);
        },
      };
      return p;
    },
  );

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const p = players.find((x) => x.thumb === entry.target);
          if (!p) continue;
          p.inView = entry.isIntersecting;
          if (p.inView) p.play();
          else p.stop();
        }
      },
      { threshold: VISIBLE_AT },
    );
    players.forEach((p) => io.observe(p.thumb));
    teardown.push(() => io.disconnect());
  }

  const onVisibility = () => players.forEach((p) => (document.hidden ? p.stop() : p.play()));
  document.addEventListener("visibilitychange", onVisibility);
  teardown.push(() => document.removeEventListener("visibilitychange", onVisibility));

  // Hover to freeze the story and inspect it with a loupe that follows the
  // pointer. Phones get a stronger zoom than desktop screens.
  if (finePointer) {
    for (const p of players) {
      const thumb = p.thumb;
      const stage = $(thumb, ".stage,.ph-stage");
      const cam = stage.querySelector<HTMLElement>(".cam");
      if (!cam) continue;
      const isPhone = stage.classList.contains("ph-stage");
      const stageH = isPhone ? 1080 : 1008;
      const zoom = thumb.dataset.play === "arctic" ? LOUPE_PHONE : LOUPE_DESKTOP;
      let releaseTimer: ReturnType<typeof setTimeout> | undefined;

      const aim = (e: PointerEvent) => {
        const r = stage.getBoundingClientRect();
        const sc = r.width / STAGE_W;
        const x = Math.min(STAGE_W, Math.max(0, (e.clientX - r.left) / sc));
        const y = Math.min(stageH, Math.max(0, (e.clientY - r.top) / sc));
        setCam(cam, x, y, zoom, false);
      };
      const onEnter = (e: PointerEvent) => {
        clearTimeout(releaseTimer);
        p.held = true;
        thumb.classList.add("inspecting");
        cam.classList.add("inspect");
        aim(e);
      };
      const onLeave = () => {
        thumb.classList.remove("inspecting");
        const [x, y, z] = getSavedFraming(cam) ?? [720, stageH / 2, 1];
        setCam(cam, x, y, z, false);
        releaseTimer = setTimeout(() => {
          cam.classList.remove("inspect");
          p.held = false;
          p.play();
        }, LOUPE_RELEASE_MS);
      };

      thumb.addEventListener("pointerenter", onEnter);
      thumb.addEventListener("pointermove", aim);
      thumb.addEventListener("pointerleave", onLeave);
      teardown.push(() => {
        clearTimeout(releaseTimer);
        thumb.removeEventListener("pointerenter", onEnter);
        thumb.removeEventListener("pointermove", aim);
        thumb.removeEventListener("pointerleave", onLeave);
        thumb.classList.remove("inspecting");
        cam.classList.remove("inspect");
      });
    }
  }

  return () => {
    disposed = true;
    teardown.forEach((fn) => fn());
    players.forEach((p) => {
      p.held = false;
      p.stop();
    });
  };
}
