import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../vendor/kit/iso-kit.mjs";
import * as A from "../vendor/kit/audit.mjs";
import { RESPONSIVE_FIGURE_STYLE } from "../responsive.mjs";
import { kitScript } from "../vendor/scripts/inline-kit.mjs";
import { AGENTS, TOOLS, PRESETS, AUTO_APPROVE_TRANSACTION_AMOUNT, assertModel, evaluate } from "./model.mjs";
import { PARTS } from "./parts.mjs";

assertModel();
const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "../../../assets/anatomy");
const W = 700, H = 440;
const BASE = { x: -150, y: -78, w: 300, d: 150, r: 10 };
const BODY = { x: -40, y: -52, w: 110, d: 80, r: 4 };
const CAP = { x: -43, y: -55, w: 116, d: 86, r: 5 };
const FRONT_Y = BODY.y + BODY.d;
const TOP = 104;
const P = k.fitProjection([...k.boxCorners(BASE, -12, 0), ...k.boxCorners(CAP, TOP, TOP + 26)], W, H, { pad: 26, azimuth: 42, elevation: 31 });
const at = (p) => k.iso(p, P);
const tag = (name, body, attrs = "") => `<g data-part="${name}"${attrs}>${body}</g>`;

// drawer rows, top to bottom: [tool, z, height]
const ROWS = [["get_customer", 90, 8], ["get_transaction", 79, 8], ["list_transactions", 68, 8], ["save_reply_draft", 56, 8], ["update_transaction", 36, 14], ["add_transaction", 19, 14], ["delete_transaction", 2, 14]];
const LOCK = { x: 64, y: 33, r: 3.5 };
const KEY_X = AGENTS.map((_, i) => -124 + i * 13);
const DIAL = { x: -10, y: -22, r: 13 };
const LAMPS = [["allow", 12, "green"], ["ask", 28, "blue"], ["deny", 44, "red"]];
const SWITCH = { x: 55, y: -40 };
const angleOf = (amount) => (-135 + 270 * Math.min(amount ?? 0, 200) / 200) * Math.PI / 180;

function scene() {
  const R = A.recorder(P);
  const over = [];
  const put = (name, at3, svg, shape, attrs = "", bias = 0) => R.put({ name, at: at3, bias, svg: tag(name, svg, attrs), shapes: [R.solid(shape)] });
  const slab = (name, plan, z, h, tone, attrs = "", o = {}) =>
    put(name, [plan.x + plan.w / 2, plan.y + plan.d / 2, z + h / 2], k.solidSvg(k.slabOf(plan, z, h, P, o.steps ?? 5, o.bevel ?? 0.6), { tone, lit: o.lit }), A.slab(plan, z, h, { name, ground: o.ground }), attrs, o.bias);
  const cyl = (name, x, y, r, z, h, tone, attrs = "", o = {}) =>
    put(name, [x, y, z + h / 2], k.solidSvg(k.cylinder(x, y, r, z, h, P, o.steps ?? 26, o.bevel ?? 0.3), { tone, lit: o.lit }), A.cylinder(x, y, r, z, h, { name, ground: o.ground }), attrs, o.bias);

  // base and feet
  over.push(`<path class="iso-halo" d="${k.haloOf(BASE, -12, 12, P)}"/>`);
  k.corners(BASE, 20).forEach(([x, y], i) => cyl(`foot-${i + 1}`, x, y, 8, -12, 4, "lo", "", { ground: true }));
  slab("base-plate", BASE, -8, 8, "mid", "", { steps: 10, bevel: 1.6, ground: true });
  over.push(tag("base-groove", k.lineSvg(k.planOutline(k.insetPlan(BASE, 7), 0, P, 10), { tone: "faint" })));
  const screws = k.corners(BASE, 11);
  over.push(tag("base-screws", k.lineSvg(screws.map(([x, y]) => k.ring(x, y, 1.8, 0, P, 14)).join(""), { tone: "lo" }) + k.dotsSvg(screws.map(([x, y]) => at([x, y, 0])), { size: 0.46 })));

  // cabinet
  slab("cabinet-body", BODY, 0, TOP, "hi", "", { steps: 6, bevel: 0.5 });
  slab("cabinet-cap", CAP, TOP, 4, "hi", "", { bevel: 0.8 });
  over.push(tag("cap-groove", k.lineSvg(k.planOutline(k.insetPlan(CAP, 4), TOP + 4, P, 6), { tone: "faint" })));
  const capScrews = k.corners(CAP, 5);
  over.push(tag("cap-screws", k.dotsSvg(capScrews.map(([x, y]) => at([x, y, TOP + 4])), { size: 0.5 })));
  over.push(tag("label-plate", k.faceTextSvg(k.topMatrix([CAP.x + 8, CAP.y + CAP.d - 6], TOP + 4.1, P, "x"), "transaction-guard", { size: 2.4, tone: "lo" })));

  // drawers on the front face
  ROWS.forEach(([tool, z, h]) => {
    const kind = TOOLS.find((t) => t.id === tool).kind;
    const attrs = ` data-drawer="${tool}" data-kind="${kind}"`;
    const front = { x: -34, y: FRONT_Y, w: 92, d: 3, r: 1 };
    slab(`drawer-${tool}`, front, z, h, kind === "write" ? "mid" : "hi", attrs);
    const pullZ = z + h / 2 - 1;
    if (kind === "draft") {
      slab(`lip-${tool}`, { x: -30, y: FRONT_Y + 3, w: 84, d: 1.6, r: 0.5 }, z + h - 2.4, 1.6, "hi", attrs);
    } else {
      slab(`pull-${tool}`, { x: 4, y: FRONT_Y + 4.2, w: 16, d: 2, r: 0.8 }, pullZ, 2, "hi", attrs);
      slab(`pull-post-${tool}-a`, { x: 5, y: FRONT_Y + 3, w: 2, d: 1.2, r: 0.4 }, pullZ + 0.4, 1.2, "mid", attrs);
      slab(`pull-post-${tool}-b`, { x: 17, y: FRONT_Y + 3, w: 2, d: 1.2, r: 0.4 }, pullZ + 0.4, 1.2, "mid", attrs);
    }
    const plate = { x: -28, y: FRONT_Y + 3, w: 18, d: 0.8, r: 0.3 };
    slab(`plate-${tool}`, plate, pullZ - 0.5, 3, "lo", attrs, { steps: 3, bevel: 0.1 });
    for (let i = 0; i < 2; i++) over.push(tag(`plate-rule-${tool}-${i + 1}`, k.lineSvg(k.lineOnTop([plate.x + 2, FRONT_Y + 3.85], [plate.x + 16 - i * 5, FRONT_Y + 3.85], pullZ + 1.6 - i * 0.9, P), { tone: "faint", free: true }), attrs));
    over.push(tag(`screws-${tool}`, k.dotsSvg([at([-32, FRONT_Y + 3, z + h - 1]), at([56, FRONT_Y + 3, z + h - 1])], { size: 0.4 }), attrs));
    if (kind === "write") cyl(`lock-${tool}`, 50, FRONT_Y + 5, 2, z + h / 2 - 1, 1.4, "lo", attrs, { steps: 16, bevel: 0.1 });
  });

  // gang lock bar, lock cylinder and the key in it
  cyl("lock-bar", LOCK.x, LOCK.y, LOCK.r, 0, 52, "hi", "", { ground: true, steps: 28, bevel: 0.2 });
  cyl("lock-cylinder", LOCK.x, LOCK.y, 5, 52, 6, "hi", "", { steps: 30, bevel: 0.6 });
  over.push(tag("lock-ring", k.lineSvg(k.ring(LOCK.x, LOCK.y, 3.4, 58, P, 24), { tone: "lo" })));
  cyl("key-bow", LOCK.x, LOCK.y, 3.6, 58, 1.6, "hi", ' data-lock-key=""', { lit: true, steps: 24, bevel: 0.2 });
  slab("key-grip", { x: LOCK.x - 1.2, y: LOCK.y - 3.2, w: 2.4, d: 6.4, r: 0.6 }, 59.6, 1.2, "hi", ' data-lock-key=""', { lit: true, steps: 3 });
  slab("pawl-guide", { x: 70, y: 28, w: 6, d: 10, r: 1 }, 0, 60, "mid", "", { ground: true, steps: 4 });
  cyl("deny-pawl", 73, 33, 1.8, 60, 10, "hi", ' data-pawl=""', { steps: 18, bevel: 0.2 });

  // key tray with one key per agent
  const TRAY = { x: -132, y: -22, w: 72, d: 50, r: 3 };
  slab("key-tray", TRAY, 0, 6, "hi", "", { bevel: 0.8 });
  over.push(tag("tray-screws", k.dotsSvg(k.corners(TRAY, 4).map(([x, y]) => at([x, y, 6])), { size: 0.42 })));
  AGENTS.forEach((agent, i) => {
    const cx = KEY_X[i];
    const attrs = ` data-key="${agent.id}"`;
    over.push(tag(`slot-${agent.id}`, k.lineSvg(k.planOutline({ x: cx - 4.5, y: -17, w: 9, d: 40, r: 2 }, 6, P, 4), { tone: "faint" })));
    cyl(`bow-${agent.id}`, cx, -11, 3.2, 6, 1.4, "hi", attrs, { steps: 20, bevel: 0.2 });
    slab(`shank-${agent.id}`, { x: cx - 1, y: -7.8, w: 2, d: 24, r: 0.4 }, 6, 1.4, "hi", attrs, { steps: 3, bevel: 0.1 });
    agent.tools.forEach((tool, b) => {
      const write = TOOLS.find((t) => t.id === tool).kind === "write";
      slab(`bit-${agent.id}-${b + 1}`, { x: cx + 1, y: 14 - b * 3.6, w: write ? 2.6 : 1.6, d: 2, r: 0.3 }, 6, 1.4, "hi", attrs, { steps: 3, bevel: 0.1 });
    });
  });
  slab("handoff-rail", { x: -60, y: -4, w: 20, d: 3, r: 0.8 }, 0, 2.2, "hi", "", { steps: 3 });
  const route = [[-60, 20, 0.2], [-60, 44, 0.2], [LOCK.x, 44, 0.2], [LOCK.x, LOCK.y + LOCK.r, 0.2]];
  over.push(tag("delegate-line", k.lineSvg(k.pathOf(route.map(at)), { tone: "lit", flow: true }), ' data-delegate=""'));
  over.push(tag("delegate-dots", k.dotsSvg([at(route[0]), at([-60, 6, 0.2])], { size: 0.5, tone: "hi" }), ' data-delegate=""'));

  // amount dial, relay and lamps on the cap
  cyl("dial-body", DIAL.x, DIAL.y, DIAL.r, TOP + 4, 3, "mid", "", { steps: 40, bevel: 0.5 });
  over.push(tag("dial-knurl", k.lineSvg(k.knurl(DIAL.x, DIAL.y, DIAL.r, TOP + 4.6, TOP + 6.4, 36, P), { tone: "lo" })));
  cyl("dial-face", DIAL.x, DIAL.y, 10.5, TOP + 7, 0.8, "hi", "", { steps: 40, bevel: 0.1 });
  const ticks = k.radialTicks(DIAL.x, DIAL.y, 9.6, 21, 5, TOP + 7.9, [1.2, 2.4], P, angleOf(0), angleOf(200) - angleOf(0));
  over.push(tag("dial-ticks", k.lineSvg(ticks.minor, { tone: "lo" }) + k.lineSvg(ticks.major, { tone: "mid" })));
  const th = angleOf(AUTO_APPROVE_TRANSACTION_AMOUNT);
  over.push(tag("dial-threshold", k.lineSvg(k.lineOnTop([DIAL.x + Math.cos(th) * 7, DIAL.y + Math.sin(th) * 7], [DIAL.x + Math.cos(th) * 9.8, DIAL.y + Math.sin(th) * 9.8], TOP + 8, P), { tone: "hi" })));
  over.push(tag("dial-needle", `<path class="iso-line" data-tone="hi" data-needle="" d="${k.lineOnTop([DIAL.x, DIAL.y], [DIAL.x + Math.cos(th) * 8.6, DIAL.y + Math.sin(th) * 8.6], TOP + 8.2, P)}"/>`));
  cyl("dial-hub", DIAL.x, DIAL.y, 1.6, TOP + 7.8, 1.2, "hi", "", { steps: 16, bevel: 0.1 });
  slab("relay-block", { x: 8, y: -40, w: 44, d: 16, r: 2 }, TOP + 4, 9, "mid", "", { bevel: 0.6 });
  over.push(tag("relay-seam", k.lineSvg(k.planOutline({ x: 10, y: -38, w: 40, d: 12, r: 1.5 }, TOP + 13, P, 4), { tone: "faint" })));
  [[12, -37], [48, -37], [12, -27], [48, -27]].forEach(([x, y], i) => cyl(`relay-screw-${i + 1}`, x, y, 0.9, TOP + 13, 0.5, "lo", "", { steps: 10, bevel: 0 }));
  LAMPS.forEach(([id, x, tone]) => {
    cyl(`lamp-base-${id}`, x, -12, 4.2, TOP + 4, 2, "lo", ` data-lamp="${id}"`, { steps: 22, bevel: 0.3 });
    cyl(`lamp-${id}`, x, -12, 3, TOP + 6, 6, "hi", ` data-lamp="${id}"`, { steps: 22, bevel: 0.9, lit: true });
    over.push(tag(`lamp-text-${id}`, k.faceTextSvg(k.topMatrix([x, -4], TOP + 4.1, P, "x"), id.toUpperCase(), { size: 2.2, tone, anchor: "middle" })));
  });
  over.push(tag("relay-wires", k.lineSvg(LAMPS.map(([, x]) => k.lineOnTop([x, -24], [x, -16.3], TOP + 4.1, P)).join(""), { tone: "lo" })));
  // y/N switch and the terminal lamp (a person must be there to answer)
  slab("switch-base", { x: SWITCH.x, y: SWITCH.y, w: 16, d: 11, r: 2 }, TOP + 4, 4, "mid", "", { bevel: 0.6 });
  cyl("switch-lever", SWITCH.x + 8, SWITCH.y + 5.5, 1.5, TOP + 8, 9, "hi", ' data-lever=""', { steps: 16, bevel: 0.2 });
  cyl("switch-knob", SWITCH.x + 8, SWITCH.y + 5.5, 2.4, TOP + 17, 1.6, "hi", ' data-lever=""', { steps: 18, bevel: 0.3 });
  over.push(tag("switch-text", k.faceTextSvg(k.topMatrix([SWITCH.x + 1, SWITCH.y + 14], TOP + 4.1, P, "x"), "y / N", { size: 2.2, tone: "lo" })));
  cyl("terminal-lamp-base", 60, -14, 3.2, TOP + 4, 1.6, "lo", ' data-terminal=""', { steps: 18, bevel: 0.2 });
  cyl("terminal-lamp", 60, -14, 2.2, TOP + 5.6, 4, "hi", ' data-terminal=""', { steps: 18, bevel: 0.7, lit: true });

  // audit ticker on the right side of the cabinet
  slab("ticker-housing", { x: BODY.x + BODY.w, y: -34, w: 7, d: 18, r: 1.2 }, 0, 11, "hi", "", { ground: true, bevel: 0.5 });
  const TAPE = { x: BODY.x + BODY.w + 7, y: -31, w: 54, d: 12, r: 0.4 };
  slab("audit-tape", TAPE, 0, 0.8, "hi", "", { steps: 3, bevel: 0.1, ground: true });
  for (let i = 0; i < 6; i++) over.push(tag(`audit-line-${i + 1}`, k.lineSvg(k.lineOnTop([TAPE.x + 5 + i * 8, TAPE.y + 1.5], [TAPE.x + 5 + i * 8, TAPE.y + TAPE.d - 1.5], 0.9, P), { tone: "lo", free: true }), ` data-audit-line="${i + 1}"`));

  A.settle(R, P);
  R.items.sort((a, b) => a.key - b.key);
  return { R, markup: R.items.map((i) => i.svg).join("") + over.join("") };
}

const CSS = `[data-drawer]{opacity:.82;transition:opacity .25s}[data-drawer][data-active]{opacity:1}[data-drawer][data-active] .iso-edge{stroke:var(--anatomy-lit)!important}
[data-lamp] .iso-solid[data-lit]{filter:none;opacity:.35}[data-lamp][data-active] .iso-solid[data-lit]{opacity:1;filter:drop-shadow(0 0 5px var(--anatomy-lit))}
[data-key]{opacity:.72}[data-key][data-active]{opacity:1}[data-key][data-active] .iso-edge{stroke:var(--anatomy-lit)!important}[data-lock-key] .iso-solid{filter:drop-shadow(0 0 4px var(--anatomy-lit))}[data-lock-key][data-hidden]{opacity:0}[data-delegate]{opacity:0;transition:opacity .25s}[data-delegate][data-active]{opacity:1}
[data-terminal] .iso-solid[data-lit]{opacity:.3;filter:none}[data-terminal][data-active] .iso-solid[data-lit]{opacity:1;filter:drop-shadow(0 0 4px var(--anatomy-lit))}
[data-audit-line]{opacity:0}[data-audit-line][data-shown]{opacity:1}[data-pawl],[data-lever],[data-lock-key]{transition:transform .35s var(--anatomy-ease)}
.iso-stage{outline:none;touch-action:pan-y}.iso-stage:focus-visible{box-shadow:0 0 0 2px var(--anatomy-blue)}@media(prefers-reduced-motion:reduce){[data-flow]{animation:none!important}[data-pawl],[data-lever],[data-lock-key]{transition:none}}`;

const LABEL = "A filing cabinet with seven drawers: three shallow read drawers, a draft tray and three deep write drawers behind one gang lock. A key tray holds one key per agent. An amount dial, a relay with ALLOW, ASK and DENY lamps, a y/N switch and an audit ticker tape sit on and beside the cabinet.";

const figure = (standalone, audit = false) => {
  const s = scene();
  if (audit) A.auditOrExit(s.R, P);
  return k.figureSvg({ width: W, height: H, standalone, label: LABEL, body: `<style>${CSS}</style>${s.markup}` });
};

function html(theme) {
  const initial = 4;
  const presets = PRESETS.map((p) => ({ ...p, result: evaluate(p.input), amount: p.input.amount ?? 0, agent: p.input.agent, tool: p.input.tool, terminal: p.input.terminal ?? true, answer: p.input.answer ?? null }));
  const plate = k.plateHtml({ fig: "Fig 1", title: "Who may open which drawer", hint: "Drag or use arrow keys", readout: presets[initial].readout, keys: [
    { mark: "lit", label: "The key in the lock" }, { mark: "green", label: "allow" }, { mark: "blue", label: "ask a person" }, { mark: "red", label: "deny · ESCALATE" },
  ], caption: `Four layers decide one tool call. The agent's key ring is its tools list. The orchestrator holds no write key, so it hands the job to transaction-agent. The hook reads the amount: below ${AUTO_APPROVE_TRANSACTION_AMOUNT} the lock turns, at ${AUTO_APPROVE_TRANSACTION_AMOUNT} or more, and for add or delete, a person answers y or N. Nobody at the switch means deny. Every applied write prints one audit line.`, body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Permission situation" aria-valuemin="0" aria-valuemax="${presets.length - 1}" aria-valuenow="${initial}">${figure(false)}</div>` });
  const live = `
const presets=${JSON.stringify(presets)};const PJ=${JSON.stringify(P)};const DIAL=${JSON.stringify(DIAL)};const TOPZ=${TOP};const KEYX=${JSON.stringify(KEY_X)};const LOCK=${JSON.stringify(LOCK)};
const stage=document.querySelector('.iso-stage'),svg=stage.querySelector('svg'),readout=document.querySelector('[data-readout]');
const angleOf=a=>(-135+270*Math.min(a||0,200)/200)*Math.PI/180;
const reduce=matchMedia('(prefers-reduced-motion: reduce)'),tourOrder=[...presets.keys()],IDLE_START=1400,IDLE_RESUME=3600,TOUR_STEP=2400;let index=${initial},target=index,current=index,amountNow=presets[index].amount,frame=0,last=0,visible=false,touring=false,tourStartedAt=0,idleTimer=0,hovered=false,focused=false,pressed=false;
function needle(a){const t=angleOf(a);const d=lineOnTop([DIAL.x,DIAL.y],[DIAL.x+Math.cos(t)*8.6,DIAL.y+Math.sin(t)*8.6],TOPZ+8.2,PJ);svg.querySelector('[data-needle]').setAttribute('d',d)}
function draw(value,amount){const p=presets[Math.round(value)],r=p.result;
svg.querySelectorAll('[data-drawer]').forEach(n=>n.toggleAttribute('data-active',n.dataset.drawer===p.tool));
svg.querySelectorAll('[data-lamp]').forEach(n=>n.toggleAttribute('data-active',n.dataset.lamp===r.decision));
svg.querySelectorAll('[data-key]').forEach(n=>n.toggleAttribute('data-active',n.dataset.key===p.agent||(r.delegate&&n.dataset.key==='transaction-agent')));
svg.querySelectorAll('[data-lock-key]').forEach(n=>n.toggleAttribute('data-hidden',r.decision==='blocked'));
svg.querySelectorAll('[data-delegate]').forEach(n=>n.toggleAttribute('data-active',r.delegate));
svg.querySelectorAll('[data-terminal]').forEach(n=>n.toggleAttribute('data-active',p.terminal));
svg.querySelectorAll('[data-pawl]').forEach(n=>n.setAttribute('transform',translateAlong(PJ,[0,0,r.decision==='deny'?-9:0])));
svg.querySelectorAll('[data-lever]').forEach(n=>n.setAttribute('transform',translateAlong(PJ,[p.answer==='y'?3:p.answer==='N'?-3:0,0,0])));
const shown=presets.slice(0,Math.round(value)+1).reduce((n,q)=>n+q.result.audit,0);svg.querySelectorAll('[data-audit-line]').forEach(n=>n.toggleAttribute('data-shown',Number(n.dataset.auditLine)<=shown));
needle(amount);readout.textContent=p.readout;stage.setAttribute('aria-valuenow',String(Math.round(value)));stage.setAttribute('aria-valuetext',p.readout)}
function engaged(){return hovered||focused||pressed}function clearIdle(){if(idleTimer){clearTimeout(idleTimer);idleTimer=0}}function stopTour(){touring=false;clearIdle()}
function tick(){const now=performance.now(),dt=last?Math.min((now-last)/1000,1/30):1/60;last=now;if(touring)target=tourOrder[Math.floor((now-tourStartedAt)/TOUR_STEP)%tourOrder.length];current=current+(target-current)*(1-Math.exp(-dt/.18));if(Math.abs(target-current)<.005)current=target;const goal=presets[Math.round(current)].amount;amountNow=amountNow+(goal-amountNow)*(1-Math.exp(-dt/.25));draw(current,amountNow);frame=visible&&(touring||current!==target||Math.abs(goal-amountNow)>.5)?requestAnimationFrame(tick):0}
function run(){if(!frame&&visible&&!reduce.matches){last=0;frame=requestAnimationFrame(tick)}}function set(n){target=Math.max(0,Math.min(presets.length-1,n));if(reduce.matches){current=target;amountNow=presets[target].amount;draw(current,amountNow)}else run()}
function scheduleTour(delay=IDLE_RESUME){stopTour();if(!visible||reduce.matches||engaged())return;idleTimer=setTimeout(()=>{idleTimer=0;if(!visible||reduce.matches||engaged())return;touring=true;tourStartedAt=performance.now()-tourOrder.indexOf(Math.round(current))*TOUR_STEP;run()},delay)}function hold(){stopTour();target=current}function release(){if(!engaged())scheduleTour()}
new IntersectionObserver(es=>{visible=es[es.length-1].isIntersecting;if(!visible){stopTour();if(frame)cancelAnimationFrame(frame);frame=0;last=0;return}run();scheduleTour(IDLE_START)},{rootMargin:'100px 0px'}).observe(stage);
stage.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hovered=true;hold()}});stage.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')hovered=false;release()});stage.addEventListener('pointerdown',e=>{pressed=true;hold();stage.setPointerCapture?.(e.pointerId)});stage.addEventListener('pointerup',()=>{pressed=false;release()});stage.addEventListener('pointercancel',()=>{pressed=false;release()});stage.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'&&!pressed)return;hold();const b=svg.getBoundingClientRect();set(Math.round((e.clientX-b.left)/b.width*(presets.length-1)))});stage.addEventListener('focus',()=>{focused=true;hold()});stage.addEventListener('blur',()=>{focused=false;release()});stage.addEventListener('keydown',e=>{let n=null;if(e.key==='ArrowRight'||e.key==='ArrowUp')n=Math.round(current)+1;if(e.key==='ArrowLeft'||e.key==='ArrowDown')n=Math.round(current)-1;if(e.key==='Home')n=0;if(e.key==='End')n=presets.length-1;if(n===null)return;e.preventDefault();hold();set(n)});reduce.addEventListener('change',()=>{stopTour();if(reduce.matches){if(frame)cancelAnimationFrame(frame);frame=0;current=target;amountNow=presets[target].amount;draw(current,amountNow)}else{run();scheduleTour(IDLE_START)}});draw(index,amountNow);`;
  return k.pageHtml({ title: "Who may open which drawer", theme, body: RESPONSIVE_FIGURE_STYLE + `<style>${CSS}</style>` + plate, script: kitScript() + live, width: 760 });
}

function audit() {
  if (PARTS.length < 40) throw new Error("fewer than 40 parts");
  if (new Set(PARTS).size !== PARTS.length) throw new Error("duplicate part name");
  const svg = figure("light", true);
  for (const name of PARTS) if (!svg.includes(`data-part="${name}"`)) throw new Error(`part missing from the figure: ${name}`);
  if ((svg.match(/data-lit="?/g) || []).length < 1) throw new Error("no lit part");
  for (const file of ["permissions.html", "permissions-light.html", "permissions.svg", "permissions-light.svg"]) {
    if (!existsSync(join(OUT, file))) throw new Error(`missing ${file}`);
    if (!file.endsWith(".html")) continue;
    const text = readFileSync(join(OUT, file), "utf8");
    if (/<(script|link)[^>]+(?:src|href)=/i.test(text)) throw new Error(`${file} has an external dependency`);
    for (const needle of ["pointermove", "keydown", "prefers-reduced-motion", "IntersectionObserver"]) if (!text.includes(needle)) throw new Error(`${file} lacks ${needle}`);
  }
  console.log(`permissions audit: ${PARTS.length} parts, 4 outputs ok`);
}

mkdirSync(OUT, { recursive: true });
for (const theme of ["dark", "light"]) {
  const suffix = theme === "light" ? "-light" : "";
  writeFileSync(join(OUT, `permissions${suffix}.html`), html(theme));
  writeFileSync(join(OUT, `permissions${suffix}.svg`), figure(theme));
}
console.log("permissions build: wrote dark/light HTML and SVG");
if (process.argv.includes("--audit")) audit();
