const P = __P__, presets = __PRESETS__, stations = __STATIONS__, REST = __REST__, TRACK = __TRACK__;
const stage = document.querySelector(".iso-stage"), svg = stage.querySelector("svg"), readout = document.querySelector("[data-readout]");
const token = svg.querySelector('[data-part="token"]'), pawl = svg.querySelector('[data-part="pawl-arm"]');
const buttons = [...document.querySelectorAll("[data-preset]")];
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const IDLE = 3600, TOUR_STEP = 1300;
let preset = 1, maxTurns = presets[1].maxTurns, run = runOf(presets[preset], maxTurns), step = 0;
let angle = REST, target = REST, frame = 0, last = 0, visible = false, touring = false, tourAt = 0, idle = 0, hovered = false, focused = false, pressed = false, dragX = null;

const angleOf = (id) => ({ think: 270, tool: 0, observe: 90, result: 180 })[id];
function angleFor(stationId, from) {
  let d = ((angleOf(stationId) - (((from % 360) + 360) % 360) + 540) % 360) - 180;
  if (d === -180) d = 180;
  return from + d;
}
function draw() {
  const s = run[step];
  const a = (angle * Math.PI) / 180;
  token.setAttribute("transform", translateAlong(P, [TRACK * Math.cos(a) - 0, TRACK * Math.sin(a) + TRACK, 0]));
  svg.querySelectorAll("[data-station]").forEach((n) => n.toggleAttribute("data-active", n.dataset.station === s.station));
  svg.querySelectorAll("[data-needle]").forEach((n) => n.toggleAttribute("data-active", Number(n.dataset.needle) === s.turn));
  svg.querySelectorAll("[data-limit]").forEach((n) => n.toggleAttribute("data-active", Number(n.dataset.limit) === maxTurns));
  const stopped = s.done && s.subtype === "error_max_turns";
  pawl.setAttribute("transform", stopped ? translateAlong(P, [0, 0, -4]) : "");
  svg.querySelector('[data-part="result-lamp"]').toggleAttribute("data-on", Boolean(s.done));
  buttons.forEach((b, i) => b.setAttribute("aria-pressed", String(i === preset)));
  readout.textContent = `${s.event} · turn ${s.turn}/${maxTurns}`;
  stage.setAttribute("aria-valuenow", String(step));
  stage.setAttribute("aria-valuemax", String(run.length - 1));
  stage.setAttribute("aria-valuetext", readout.textContent);
}
function engaged() { return hovered || focused || pressed; }
function setStep(n) {
  n = Math.max(0, Math.min(run.length - 1, n));
  if (n === step) return;
  target = angleFor(run[n].station, target);
  step = n;
  if (reduce.matches) { angle = target; draw(); } else go();
  draw();
}
function setPreset(i, keep = false) {
  preset = (i + presets.length) % presets.length;
  if (!keep) maxTurns = presets[preset].maxTurns;
  run = runOf(presets[preset], maxTurns);
  step = Math.min(step, run.length - 1);
  target = angleFor(run[step].station, target);
  if (reduce.matches) angle = target;
  draw(); go();
}
function setMax(m) { maxTurns = Math.max(1, Math.min(6, m)); setPreset(preset, true); }
function tick() {
  const now = performance.now(), dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;
  if (touring) {
    const n = Math.floor((now - tourAt) / TOUR_STEP);
    if (n >= run.length + 1) { tourAt = now; step = 0; target = angleFor("think", target); }
    else if (n < run.length && n !== step) { step = n; target = angleFor(run[n].station, target); }
    draw();
  }
  angle += (target - angle) * (1 - Math.exp(-dt / 0.22));
  if (Math.abs(target - angle) < 0.05) angle = target;
  draw();
  frame = visible && (touring || angle !== target) ? requestAnimationFrame(tick) : 0;
}
function go() { if (!frame && visible && !reduce.matches) { last = 0; frame = requestAnimationFrame(tick); } }
function stopTour() { touring = false; if (idle) clearTimeout(idle); idle = 0; }
function scheduleTour(delay = IDLE) {
  stopTour();
  if (!visible || reduce.matches || engaged()) return;
  idle = setTimeout(() => { idle = 0; if (!visible || reduce.matches || engaged()) return; preset = 1; maxTurns = presets[1].maxTurns; run = runOf(presets[1], maxTurns); step = 0; touring = true; tourAt = performance.now(); go(); }, delay);
}
function hold() { stopTour(); }
function release() { if (!engaged()) scheduleTour(); }

new IntersectionObserver((es) => { visible = es[es.length - 1].isIntersecting; if (!visible) { stopTour(); if (frame) cancelAnimationFrame(frame); frame = 0; last = 0; return; } go(); scheduleTour(1400); }, { rootMargin: "100px 0px" }).observe(stage);
stage.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { hovered = true; hold(); } });
stage.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") hovered = false; release(); });
stage.addEventListener("pointerdown", (e) => { pressed = true; dragX = e.clientX; hold(); stage.setPointerCapture?.(e.pointerId); });
stage.addEventListener("pointerup", () => { pressed = false; dragX = null; release(); });
stage.addEventListener("pointercancel", () => { pressed = false; dragX = null; release(); });
stage.addEventListener("pointermove", (e) => {
  if (!pressed || dragX === null) return;
  hold();
  const px = svg.getBoundingClientRect().width / (run.length + 2);
  const moved = Math.round((e.clientX - dragX) / px);
  if (moved) { dragX = e.clientX; setStep(step + moved); }
});
stage.addEventListener("focus", () => { focused = true; hold(); });
stage.addEventListener("blur", () => { focused = false; release(); });
stage.addEventListener("keydown", (e) => {
  const k = e.key;
  if (k === "ArrowRight") setStep(step + 1);
  else if (k === "ArrowLeft") setStep(step - 1);
  else if (k === "ArrowUp") setMax(maxTurns + 1);
  else if (k === "ArrowDown") setMax(maxTurns - 1);
  else if (k === "Home") setStep(0);
  else if (k === "End") setStep(run.length - 1);
  else if (/^[1-3]$/.test(k)) { step = 0; setPreset(Number(k) - 1); }
  else return;
  e.preventDefault(); hold();
});
buttons.forEach((b, i) => b.addEventListener("click", () => { step = 0; setPreset(i); hold(); release(); }));
reduce.addEventListener("change", () => { stopTour(); if (reduce.matches) { if (frame) cancelAnimationFrame(frame); frame = 0; angle = target; draw(); } else { go(); scheduleTour(1400); } });
draw();
