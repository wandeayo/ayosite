/**
 * The four thumbnail stories, ported step for step from `scenes` in the
 * approved prototype. Coordinates are stage px (1440 wide); numbers passed to
 * `k.w()` are the exact waits from the reference. Don't retime these here:
 * change the reference first, then port the change.
 */
import { $, $$, setCam, type Scene } from "./engine";

/* ------------------------------------------------------------------ Carmen */

const carmen: Scene = {
  reset(t) {
    const s = $(t, ".stage");
    $(s, "#c-on").classList.add("hide");
    $(s, "#c-run").classList.remove("hide");
    $(s, "#c-camp").style.transform = "";
    const fill = $(s, "#c-fill");
    fill.style.transition = "none";
    fill.style.width = "38%";
    $(s, "#c-rb").classList.add("hide");
    $$(s, ".c-row").forEach((r) => r.classList.add("hide"));
    $$(s, ".c-card").forEach((c) => c.classList.remove("hide"));
    $(s, ".cursor").style.opacity = "0";
    $(s, "#c-btn").classList.remove("on");
  },
  async run(t, k) {
    const s = k.stage;
    // 1. onboarding
    $(s, "#c-on").classList.remove("hide");
    $(s, "#c-run").classList.add("hide");
    await k.w(500);
    // 2. scan finishes
    const fill = $(s, "#c-fill");
    fill.style.transition = "";
    void fill.offsetWidth;
    fill.style.width = "100%";
    await k.w(1650);
    // 3–4. review matches rise in, then the buttons
    k.show($(s, "#c-rb"));
    await k.w(350);
    for (const r of $$(s, ".c-row")) {
      if (r.id !== "c-btn") {
        k.show(r);
        await k.w(130);
      }
    }
    await k.w(250);
    k.show($(s, "#c-btn"));
    await k.w(500);
    // 5. save preferences
    k.place(900, 700);
    await k.w(50);
    await k.move(1270, 926, 800);
    $(s, "#c-btn").classList.add("on");
    await k.click();
    await k.w(120);
    // 6. campaign running, stats rise in
    k.hideCur();
    $$(s, ".c-card").forEach((c) => c.classList.add("hide"));
    $(s, "#c-run").classList.remove("hide");
    await k.w(300);
    $(s, "#c-on").classList.add("hide");
    for (const c of $$(s, ".c-card")) {
      k.show(c);
      await k.w(120);
    }
    // 7. scroll the campaign and back
    await k.w(1300);
    $(s, "#c-camp").style.transform = "translateY(-420px)";
    await k.w(2600);
    $(s, "#c-camp").style.transform = "";
    await k.w(1700);
    carmen.reset(t);
    await k.w(400);
  },
};

/* --------------------------------------------------------------- Airstride */

const airCam = (s: HTMLElement, x: number, y: number, z: number) => setCam($(s, "#a-cam"), x, y, z);

const air: Scene = {
  reset(t) {
    const s = $(t, ".stage");
    s.classList.remove("a-dim");
    ["#a-menu", "#a-modal"].forEach((q) => $(s, q).classList.add("hide"));
    $(s, "#a-skel").classList.remove("out");
    $(s, "#a-item").style.opacity = "0";
    $(s, "#a-hover").style.opacity = "0";
    $(s, ".cursor").style.opacity = "0";
    airCam(s, 720, 504, 1);
  },
  async run(t, k) {
    const s = k.stage;
    k.place(1100, 900);
    await k.w(300);
    // move to the deal card, camera eases in on it
    airCam(s, 640, 760, 1.7);
    await k.move(620, 800, 900);
    $(s, "#a-hover").style.opacity = "1";
    await k.w(350);
    await k.move(676, 708, 450);
    await k.click();
    // menu opens: reframe on the menu and push in further
    $(s, "#a-menu").classList.remove("hide");
    airCam(s, 580, 485, 2);
    await k.w(1000);
    await k.move(560, 494, 650);
    $(s, "#a-item").style.opacity = "1";
    await k.w(400);
    await k.click();
    await k.w(150);
    // modal: pull back to show the whole summary arrive
    $(s, "#a-menu").classList.add("hide");
    $(s, "#a-hover").style.opacity = "0";
    s.classList.add("a-dim");
    k.hideCur();
    airCam(s, 720, 504, 1);
    await k.w(750);
    $(s, "#a-modal").classList.remove("hide");
    await k.w(1400);
    $(s, "#a-skel").classList.add("out");
    await k.w(900);
    // read it: snapshot, then glide down to recent activity
    airCam(s, 720, 300, 1.6);
    await k.w(2000);
    airCam(s, 720, 760, 1.6);
    await k.w(2200);
    airCam(s, 720, 504, 1);
    await k.w(1200);
    $(s, "#a-modal").classList.add("hide");
    s.classList.remove("a-dim");
    await k.w(600);
    air.reset(t);
    await k.w(500);
  },
};

/* ------------------------------------------------------------- Arctic Edge */

const arcticCam = (s: HTMLElement, x: number, y: number, z: number) => setCam($(s, "#r-cam"), x, y, z);

const setHeat = (s: HTMLElement, on: boolean) => {
  $(s, "#r-heat").classList.toggle("on", on);
  $(s, "#r-glow").classList.toggle("heat", on);
  $(s, "#r-breath").classList.toggle("heat", on);
};

const arctic: Scene = {
  reset(t) {
    const s = $(t, ".ph-stage");
    setHeat(s, false);
    $(s, "#r-tri").style.left = "310px";
    $(s, ".cursor").style.opacity = "0";
    arcticCam(s, 720, 540, 1);
  },
  async run(t, k) {
    const s = k.stage;
    // mode chip and flow-rate bar, phone (519, 80) + phone-local point
    const CX = 519 + 201;
    const CY = 80 + 288;
    const FX = 519 + 300;
    const FY = 80 + 630;
    await k.w(700);
    // tap the mode chip, camera follows
    k.place(1040, 800);
    arcticCam(s, CX, CY, 2.1);
    await k.move(CX - 11, CY - 8, 1000);
    await k.w(150);
    await k.click();
    setHeat(s, true);
    await k.w(1500);
    k.hideCur();
    arcticCam(s, CX, CY, 1);
    await k.w(1300);
    // flow rate settles
    arcticCam(s, FX, FY, 2.3);
    await k.w(1000);
    $(s, "#r-tri").style.left = "292px";
    await k.w(1500);
    $(s, "#r-tri").style.left = "318px";
    await k.w(1500);
    arcticCam(s, FX, FY, 1);
    await k.w(1300);
    // back to cooling
    k.place(1040, 300);
    arcticCam(s, CX, CY, 2.1);
    await k.move(CX - 11, CY - 8, 1000);
    await k.w(150);
    await k.click();
    setHeat(s, false);
    await k.w(1300);
    k.hideCur();
    arcticCam(s, CX, CY, 1);
    $(s, "#r-tri").style.left = "310px";
    await k.w(2000);
  },
};

/* ------------------------------------------------------------------- Dexla */

const LIGHT_MAP = "surface/default → <b>white</b><br>text/default → <b>zinc/900</b>";
const DARK_MAP = "surface/default → <b>zinc/900</b><br>text/default → <b>zinc/50</b>";

/** Ring every element that uses the token, 55ms apart, then toast. */
async function dexlaPing(s: HTMLElement, w: (ms: number) => Promise<void>, msg: string, sel: string) {
  for (const el of $$(s, sel)) {
    el.classList.add("ping");
    setTimeout(() => el.classList.remove("ping"), 420);
    await w(55);
  }
  const toast = $(s, "#dx-toast");
  toast.textContent = msg;
  toast.classList.add("on");
  setTimeout(() => toast.classList.remove("on"), 1500);
}

const dexla: Scene = {
  reset(t) {
    const s = $(t, ".stage");
    const d = $(s, "#dx");
    d.classList.remove("dark", "brand");
    d.style.setProperty("--r", "6px");
    $(s, "#dx-rv").textContent = "6px";
    $(s, "#dx-bv").textContent = "zinc/900";
    $(s, "#dx-sw").style.background = "#18181b";
    $(s, "#dx-sv").textContent = "white";
    $(s, "#dx-ss").style.background = "#fff";
    $(s, "#dx-l").classList.add("on");
    $(s, "#dx-d").classList.remove("on");
    $(s, "#dx-map").innerHTML = LIGHT_MAP;
    $$(s, ".dx-t").forEach((x) => x.classList.remove("sel"));
    $$(s, ".v").forEach((x) => x.classList.remove("edit"));
    $(s, "#dx-toast").classList.remove("on");
    $(s, ".cursor").style.opacity = "0";
  },
  async run(t, k) {
    const s = k.stage;
    const d = $(s, "#dx");
    k.place(900, 800);
    await k.w(250);
    // 1. edit radius/control: 6 → 8 → 10 → 12px
    await k.to($(s, "#dx-rv"), 800);
    await k.click();
    $(s, "#dx-tr").classList.add("sel");
    $(s, "#dx-rv").classList.add("edit");
    for (const r of [8, 10, 12]) {
      $(s, "#dx-rv").textContent = `${r}px`;
      d.style.setProperty("--r", `${r}px`);
      await k.w(240);
    }
    // 2. every instance pings
    await dexlaPing(s, k.w, `radius/control → ${$$(s, "[data-u]").length} instances updated`, "[data-u]");
    await k.w(900);
    $(s, "#dx-rv").classList.remove("edit");
    $(s, "#dx-tr").classList.remove("sel");
    // 3. action/brand: zinc/900 → indigo/600
    await k.to($(s, "#dx-sw"), 650);
    await k.click();
    $(s, "#dx-tb").classList.add("sel");
    $(s, "#dx-sw").style.background = "#4f46e5";
    $(s, "#dx-bv").textContent = "indigo/600";
    d.classList.add("brand");
    await dexlaPing(s, k.w, "action/brand → 4 instances updated", ".dx-b.p,.dx-sw2");
    await k.w(1000);
    $(s, "#dx-tb").classList.remove("sel");
    // 4. dark mode
    await k.to($(s, "#dx-d"), 650);
    await k.click();
    $(s, "#dx-d").classList.add("on");
    $(s, "#dx-l").classList.remove("on");
    d.classList.add("dark");
    $(s, "#dx-sv").textContent = "zinc/900";
    $(s, "#dx-ss").style.background = "#18181b";
    $(s, "#dx-map").innerHTML = DARK_MAP;
    // 5. hold, then reset
    k.hideCur();
    await k.w(2600);
    dexla.reset(t);
    await k.w(600);
  },
};

export const SCENES = { carmen, air, arctic, dexla } as const;
export type SceneName = keyof typeof SCENES;
