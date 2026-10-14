import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../vendor/kit/iso-kit.mjs";
import * as A from "../vendor/kit/audit.mjs";
import { kitScript } from "../vendor/scripts/inline-kit.mjs";
import { RESPONSIVE_FIGURE_STYLE } from "../responsive.mjs";
import { STATIONS, PARTS, partCount } from "./parts.mjs";
import { PRESETS, runOf, assertModel } from "./model.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, "../../../assets/anatomy");
const BOT_DATA = `data:image/webp;base64,${readFileSync(resolve(HERE, "../../../assets/aetherbot/aetherbot-head.webp")).toString("base64")}`;
const WIDTH = 720, HEIGHT = 470, TRACK = 86;
const BASE = { x: -142, y: -104, w: 284, d: 208, r: 14 };
const DIAL = [116, 72];
const P = k.fitProjection([...k.boxCorners(BASE, -12, 0), [-124, -78, 48], [120, -92, 48], [DIAL[0], DIAL[1], 36]], WIDTH, HEIGHT, { pad: 38, azimuth: 45, elevation: 34 });
const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const tag = (name, body, attrs = "") => `<g data-part="${name}"${attrs}>${body}</g>`;
const dialAngle = (v) => -Math.PI * 0.75 + (v / 6) * Math.PI * 1.5;
const onDial = (r, v) => [DIAL[0] + Math.sin(dialAngle(v)) * r, DIAL[1] - Math.cos(dialAngle(v)) * r];

function makeScene() {
  const R = A.recorder(P);
  const overlays = [];
  const owner = "agent-loop";
  const slab = (name, plan, z, h, tone, attrs = "", o = {}) =>
    R.put({ name, piece: o.piece ?? "machine", at: [plan.x + plan.w / 2, plan.y + plan.d / 2, z + h / 2], bias: o.bias ?? 0, svg: tag(name, S(k.slabOf(plan, z, h, P, o.steps ?? 6, o.bevel ?? 0.7), { tone, lit: o.lit }), attrs), shapes: [R.solid(A.slab(plan, z, h, { name, owner, ground: o.ground }))] });
  const cyl = (name, x, y, r, z, h, tone, attrs = "", o = {}) =>
    R.put({ name, piece: o.piece ?? "machine", at: [x, y, z + h / 2], bias: o.bias ?? 0, svg: tag(name, S(k.cylinder(x, y, r, z, h, P, o.steps ?? 28, o.bevel ?? 0.4), { tone, lit: o.lit, crease: o.crease }), attrs), shapes: [R.solid(A.cylinder(x, y, r, z, h, { name, owner }))] });

  // base
  [["foot-nw", BASE.x + 22, BASE.y + 22], ["foot-ne", BASE.x + BASE.w - 22, BASE.y + 22], ["foot-sw", BASE.x + 22, BASE.y + BASE.d - 22], ["foot-se", BASE.x + BASE.w - 22, BASE.y + BASE.d - 22]].forEach(([n, x, y]) => cyl(n, x, y, 8, -12, 4, "lo"));
  slab("base-plate", BASE, -8, 8, "mid", "", { steps: 10, bevel: 1.8, ground: true });
  overlays.push(tag("base-groove", L(k.planOutline(k.insetPlan(BASE, 8), 0, P, 10), { tone: "faint" })));
  overlays.push(tag("corner-screws", k.dotsSvg(k.corners(BASE, 13).map((p) => at([p[0], p[1], 0])), { size: 0.55, tone: "mid" })));
  const label = { x: -134, y: 80, w: 44, d: 16, r: 2 };
  slab("label-plate", label, 0, 2, "lo", "", { steps: 3, bevel: 0.3 });
  overlays.push(tag("label-rules", L([0, 1, 2].map((i) => k.lineOnTop([label.x + 5, label.y + 4 + i * 4], [label.x + 39 - i * 6, label.y + 4 + i * 4], 2.05, P)).join(""), { tone: "faint", free: true })));

  // turntable
  cyl("turntable-lower", 0, 0, 104, 0, 5, "lo", "", { steps: 96, bevel: 0.8 });
  cyl("turntable-upper", 0, 0, 97, 5, 4, "mid", "", { steps: 96, bevel: 0.6 });
  cyl("turntable-hub", 0, 0, 30, 9, 5, "hi", "", { steps: 48, bevel: 0.6 });
  const ticks = k.radialTicks(0, 0, 97, 48, 12, 9, [2, 4], P);
  overlays.push(tag("turntable-index", L(ticks.minor + ticks.major, { tone: "faint" })));
  overlays.push(tag("track-outer", L(k.ring(0, 0, TRACK + 7.5, 9.05, P, 96), { tone: "faint" })));
  overlays.push(tag("track-inner", L(k.ring(0, 0, TRACK - 7.5, 9.05, P, 96), { tone: "faint" })));

  // stations
  STATIONS.forEach((st, i) => {
    const [x, y] = st.position;
    const attrs = ` data-station="${st.id}" aria-label="${st.label} station"`;
    slab(`${st.id}-deck`, { x: x - 18, y: y - 14, w: 36, d: 28, r: 4 }, 9, 5, "mid", attrs, { steps: 5 });
    slab(`${st.id}-riser`, { x: x - 10, y: y - 8, w: 20, d: 16, r: 3 }, 14, 10, "hi", attrs, { steps: 4 });
    cyl(`${st.id}-tool`, x + (i % 2 ? 2 : -2), y - 1, 6 - (i % 2), 24, 8 + (i % 3) * 2, "hi", attrs);
    cyl(`${st.id}-lamp`, x + 13, y - 9, 2.6, 14, st.id === "result" ? 8 : 6, "hi", attrs, { steps: 20, lit: true });
    cyl(`${st.id}-terminal`, x + 13, y + 9, 1.8, 14, 2.2, "mid", attrs, { steps: 18, bevel: 0.2 });
    overlays.push(tag(`${st.id}-label`, k.faceTextSvg(k.topMatrix([x, y + 11.5], 14.05, P, "x"), st.label, { size: 3, tone: "mid", anchor: "middle" }), attrs));
  });

  // token on the track, built at rest at the THINK station
  const rest = [0, -TRACK];
  slab("token-carriage", { x: rest[0] - 8, y: rest[1] - 6, w: 16, d: 12, r: 2 }, 9, 2, "mid", "", { steps: 3, bevel: 0.3, piece: "token" });
  cyl("token", rest[0], rest[1], 6, 11, 5, "hi", "", { lit: true, piece: "token" });

  // stop pawl beside THINK, dropping into the rim notch when maxTurns is reached
  slab("pawl-housing", { x: 20, y: -100, w: 14, d: 12, r: 2 }, 9, 7, "mid", "", { steps: 3, bevel: 0.4 });
  cyl("pawl-pivot", 27, -94, 2, 16, 2, "lo", "", { steps: 16, bevel: 0.1 });
  slab("pawl-arm", { x: 23, y: -97, w: 8, d: 5, r: 1 }, 18, 3, "hi", "", { steps: 3, bevel: 0.3, piece: "pawl" });
  overlays.push(tag("rim-notch", L(k.lineOnTop([15, -Math.sqrt((TRACK - 7.5) ** 2 - 225)], [15, -Math.sqrt((TRACK + 7.5) ** 2 - 225)], 9.05, P) + k.lineOnTop([17, -Math.sqrt((TRACK - 7.5) ** 2 - 289)], [17, -Math.sqrt((TRACK + 7.5) ** 2 - 289)], 9.05, P), { tone: "lo" })));

  // operator console with AetherBOT
  cyl("operator-pedestal", 0, 0, 24, 14, 16, "mid", "", { steps: 48, bevel: 0.8 });
  slab("operator-console", { x: -18, y: -15, w: 36, d: 30, r: 6 }, 30, 12, "hi", "", { bevel: 0.8 });
  const c = at([0, 0, 42]);
  overlays.push(tag("operator-screen", `<circle cx="${c[0]}" cy="${c[1] - 24}" r="27" fill="var(--anatomy-paper)" stroke="var(--anatomy-mid)" stroke-width="1.2"/>`));
  overlays.push(tag("aetherbot", `<defs><clipPath id="bot-clip"><circle cx="${c[0]}" cy="${c[1] - 24}" r="24.5"/></clipPath></defs><image href="${BOT_DATA}" x="${c[0] - 24}" y="${c[1] - 52}" width="48" height="56" preserveAspectRatio="xMidYMid slice" clip-path="url(#bot-clip)"/>`));

  // maxTurns counter: post, bracket with set knob, dial with needle and limit pin
  const [dx, dy] = DIAL;
  cyl("counter-post", dx, dy, 5, 0, 26, "mid", "", { steps: 24, crease: "none" });
  slab("counter-bracket", { x: dx - 2, y: dy + 5, w: 14, d: 9, r: 2 }, 10, 4, "mid", "", { steps: 3, bevel: 0.4 });
  cyl("counter-knob", dx + 7, dy + 9.5, 4.2, 14, 4, "hi", "", { steps: 24, bevel: 0.4 });
  const kt = k.radialTicks(dx + 7, dy + 9.5, 4.2, 16, 4, 18, [0.8, 1.5], P);
  overlays.push(tag("counter-knob-ticks", L(kt.minor + kt.major, { tone: "lo" })));
  cyl("dial-base", dx, dy, 16, 26, 3, "mid", "", { steps: 40, bevel: 0.6 });
  cyl("dial-face", dx, dy, 13, 29, 1, "hi", "", { steps: 40, bevel: 0.1 });
  overlays.push(tag("dial-bezel", L(k.ring(dx, dy, 14.6, 29.05, P, 48), { tone: "lo" })));
  const dt = k.radialTicks(dx, dy, 12, 12, 2, 30.05, [1.2, 3.5], P, dialAngle(0), Math.PI * 1.5);
  overlays.push(tag("dial-ticks", L(dt.minor + dt.major, { tone: "mid" })));
  overlays.push(tag("dial-needle", [0, 1, 2, 3, 4, 5, 6].map((v) => `<g data-needle="${v}">${L(k.lineOnTop([dx, dy], onDial(10, v), 30.15, P), { tone: "hi" })}</g>`).join("")));
  cyl("dial-pin", dx, dy, 1.6, 30, 1.6, "hi", "", { steps: 16, bevel: 0.1 });
  overlays.push(tag("dial-limit", [1, 2, 3, 4, 5, 6].map((m) => `<g data-limit="${m}">${k.dotsSvg([at([...onDial(14.6, m), 29.1])], { size: 0.9, tone: "hi" })}</g>`).join("")));

  A.settle(R, P);
  R.items.sort((a, b) => a.key - b.key);
  return { R, markup: R.items.map((it) => it.svg).join("") + overlays.join("") };
}

const CSS = `
.iso-stage{outline:none;touch-action:pan-y;cursor:ew-resize}.iso-stage:focus-visible{box-shadow:0 0 0 2px var(--anatomy-blue)}
[data-station]{opacity:.55;transition:opacity .28s}[data-station][data-active]{opacity:1}
[data-station] [data-lit]{opacity:.3}[data-station][data-active] [data-lit]{opacity:1;filter:drop-shadow(0 0 5px var(--anatomy-lit))}
[data-part="result-lamp"][data-on] [data-lit]{opacity:1;filter:drop-shadow(0 0 7px var(--anatomy-green))}
[data-needle],[data-limit]{display:none}[data-needle][data-active],[data-limit][data-active]{display:inline}
[data-limit][data-active] circle{fill:var(--anatomy-red)}
[data-part="token"]{transition:none}[data-part="pawl-arm"]{transition:transform .3s}
.loop-presets{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin:14px 0 0}.loop-presets button{border:1px solid var(--anatomy-lo);background:var(--anatomy-card);color:var(--anatomy-text);font:11px/1.2 var(--anatomy-mono);padding:9px 7px;cursor:pointer}.loop-presets button[aria-pressed="true"]{border-color:var(--anatomy-hi);color:var(--anatomy-strong)}
@media(prefers-reduced-motion:reduce){[data-station],[data-part="pawl-arm"]{transition:none}}`;

const LABEL = "A four-station rotary agent loop: Think, Tool, Observe and Result stations around a turntable, a lit token riding the track, an AetherBOT console in the centre and a maxTurns counter dial with a stop pawl beside the turntable.";

function figure(standalone) {
  const scene = makeScene();
  return { scene, svg: k.figureSvg({ width: WIDTH, height: HEIGHT, standalone, className: "agent-loop-figure", label: LABEL, body: `<style>${CSS}</style><path class="iso-halo" d="${k.haloOf(BASE, -12, 10, P)}"/>${scene.markup}` }) };
}

function html(theme) {
  const { svg } = figure(false);
  const run = runOf(PRESETS[1]);
  const plate = k.plateHtml({
    fig: "Fig 1", title: "Agent loop", hint: "← → step · ↑ ↓ maxTurns · 1–3 message",
    readout: `${run[0].event} · turn 0/${PRESETS[1].maxTurns}`,
    keys: [{ mark: "lit", label: "Token: where the loop is now" }, { mark: "raised", label: "Counter: model turns used" }, { mark: "red", label: "Pin: maxTurns" }],
    caption: "One model turn may call a tool; the result comes back and the next turn starts. The counter advances per turn. At maxTurns the pawl drops and the run ends with error_max_turns.",
    body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Agent loop step" aria-valuemin="0" aria-valuemax="${run.length - 1}" aria-valuenow="0">${svg}</div><div class="loop-presets" role="group" aria-label="Message">${PRESETS.map((p, i) => `<button type="button" data-preset="${p.id}" aria-pressed="${i === 1}">${i + 1}. ${p.label}</button>`).join("")}</div>`,
  });
  const model = readFileSync(join(HERE, "model.mjs"), "utf8").replace(/^import .*$/m, "").replace(/^export /gm, "").replace(/^if \(process\.argv.*$/m, "").replace(/function assertModel[\s\S]*?\n}\n/, "");
  const live = readFileSync(join(HERE, "live.js"), "utf8").replace("__P__", JSON.stringify(P)).replace("__PRESETS__", JSON.stringify(PRESETS)).replace("__STATIONS__", JSON.stringify(STATIONS)).replace("__REST__", "270").replace("__TRACK__", String(TRACK));
  return k.pageHtml({ title: "Agent loop", theme, body: RESPONSIVE_FIGURE_STYLE + `<style>${CSS}</style>` + plate, script: `${kitScript()}\n${model}\n${live}`, width: 760 });
}

assertModel();
mkdirSync(OUT, { recursive: true });
for (const theme of ["dark", "light"]) {
  const suffix = theme === "light" ? "-light" : "";
  writeFileSync(join(OUT, `agent-loop${suffix}.html`), html(theme));
  writeFileSync(join(OUT, `agent-loop${suffix}.svg`), figure(theme).svg);
}
console.log(`agent-loop build: wrote dark/light HTML and SVG · ${partCount} parts`);

if (process.argv.includes("--audit")) {
  const { scene, svg } = figure("dark");
  for (const part of PARTS) if (!svg.includes(`data-part="${part}"`)) throw new Error(`missing part ${part}`);
  for (const file of ["agent-loop.html", "agent-loop-light.html"]) {
    const text = readFileSync(join(OUT, file), "utf8");
    if (!existsSync(join(OUT, file))) throw new Error(`missing ${file}`);
    if (/<(script|link)[^>]+(?:src|href)=/i.test(text)) throw new Error(`${file} has an external dependency`);
    for (const needle of ["pointermove", "keydown", "prefers-reduced-motion", "IntersectionObserver"]) if (!text.includes(needle)) throw new Error(`${file} lacks ${needle}`);
  }
  A.auditOrExit(scene.R, P);
  console.log(`agent-loop audit: ${partCount} parts, ${STATIONS.length} stations, ${PRESETS.length} presets`);
}
