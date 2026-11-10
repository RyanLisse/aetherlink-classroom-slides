'use strict';
/* ==========================================================================
   Aetherlink x Worldline — Two-day classroom deck
   Adapted from the AetherLink training-site engine. Kept: hash navigation,
   keyboard nav, the segmented footer progress bar, per-slide dark variant,
   the "Do this now" exercise panel, all 7 layout renderers. Removed: the
   multi-squad/day picker, glossary, mascot, and the framework-mode fallback
   branches — this deck is always a single flat array of slides.
   New: assignment-visibility styling and the presenter-view sync (BroadcastChannel
   with a localStorage fallback) — see presenter.js for the receiving end.
   ========================================================================== */
const slides = window.SLIDES || [];
// Count per day, not over the whole file: "61 / 82" on Day 1, "5 / 50" on Day 2. Parked slides count apart.
function dayCount(i, deck) {
  const starts = (window.CLASSROOM_SESSIONS || []).filter(s => s.deck === deck).map(s => s.start - 1);
  const parked = slides.findIndex(s => /^Parked ·/.test(s.title)); const end = parked < 0 ? slides.length : parked;
  if (i >= end) return [i - end + 1, slides.length - end + ' parked'];
  const from = starts.filter(s => s <= i).at(-1) ?? 0; const to = starts.find(s => s > i) ?? end;
  return [i - from + 1, to - from];
}
const DECK = location.pathname.split('/').pop() || 'index.html';
const countText = (i, pad) => { const [n, of] = dayCount(i, DECK); return (pad ? String(n).padStart(2, '0') : String(n)) + ' / ' + of; };
const $ = id => document.getElementById(id);
let current = 0, lastFocus = null, toastTimer;
const panel = $('panel');

function node(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
function announce(text) { $('announcement').textContent = text; }
function notify(text) { $('toast').textContent = text; $('toast').classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('show'), 2600); }
function openPanel(title, content) { lastFocus = document.activeElement; if (lastFocus instanceof HTMLElement) lastFocus.setAttribute('aria-expanded', 'true'); $('panel-title').textContent = title; $('panel-body').replaceChildren(content); panel.setAttribute('aria-labelledby', 'panel-title'); panel.showModal(); $('close-panel').focus(); }
function closePanel() { panel.close(); lastFocus?.setAttribute('aria-expanded', 'false'); lastFocus?.focus(); }
$('close-panel').addEventListener('click', closePanel);
panel.addEventListener('cancel', e => { e.preventDefault(); closePanel(); });

function showPrompt() {
  const s = slides[current], wrap = node('div');
  if (!s.prompt) { wrap.append(node('p', 'prompt-intro', 'This slide has no exact read-aloud prompt.')); openPanel('Example prompt · ' + s.title, wrap); return; }
  wrap.append(node('p', 'prompt-intro', 'Read this aloud, or paste it into Claude Code.'));
  const area = node('textarea', 'prompt-text'); area.value = s.prompt; area.readOnly = true; area.setAttribute('aria-label', 'Copy-ready example prompt'); wrap.append(area);
  const row = node('div', 'prompt-copy'), copy = node('button', 'prompt-button', 'Copy prompt');
  copy.addEventListener('click', async () => { try { await navigator.clipboard.writeText(area.value); notify('Prompt copied'); copy.textContent = 'Copied ✓'; } catch { area.focus(); area.select(); notify('Select and copy the prompt manually.'); } });
  row.append(copy); wrap.append(row);
  openPanel('Example prompt · ' + s.title, wrap);
}

/* ---- card icons (kept from the source engine, keyword-matched) ---- */
const ICONS = { target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>', shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>', route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h6a4 4 0 0 0 0-8H10a4 4 0 0 1 0-8h6"/>', inbox: '<path d="M3 13l2-8h14l2 8v6H3z"/><path d="M3 13h5l2 3h4l2-3h5"/>', check: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>', cross: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>', gate: '<path d="M4 20V6l8-3 8 3v14"/><path d="M9 20v-7h6v7"/><path d="M4 12h16"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', users: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19a6 6 0 0 1 12 0"/><path d="M15 19a4 4 0 0 1 6-3.5"/>', user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>', file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>', cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="10" y="10" width="4" height="4"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>', search: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>', bulb: '<path d="M9 18h6M10 21h4"/><path d="M8 13a5 5 0 1 1 8 0c-1 1-1.5 2-1.5 3h-5c0-1-.5-2-1.5-3z"/>', flag: '<path d="M5 21V4"/><path d="M5 4h12l-2 4 2 4H5"/>', hand: '<path d="M8 12V6a1.5 1.5 0 0 1 3 0v5"/><path d="M11 11V4a1.5 1.5 0 0 1 3 0v7"/><path d="M14 11V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-12 0v-3a1.5 1.5 0 0 1 3 0v1"/>', play: '<path d="M7 5v14l11-7z"/>', repeat: '<path d="M4 12a8 8 0 0 1 14-5l2 2"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5l-2-2"/><path d="M4 20v-5h5"/>', stop: '<path d="M8 3h8l5 5v8l-5 5H8l-5-5V8z"/>', list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.2"/><circle cx="4.5" cy="12" r="1.2"/><circle cx="4.5" cy="18" r="1.2"/>', dot: '<circle cx="12" cy="12" r="3"/>' };
const ICON_RULES = [[/goal|outcome|what$/, 'target'], [/boundar|guard|scope/, 'shield'], [/^stop/, 'stop'], [/^mode|route|during/, 'route'], [/input|source|read|deliver|include|contain/, 'inbox'], [/result|check|expected/, 'check'], [/must not|negative|problem|fail/, 'cross'], [/gate|decision/, 'gate'], [/open|time|when/, 'clock'], [/rotate|repeat|loop|again/, 'repeat'], [/group|mob|roles|team|squad|users|driver|navigator/, 'users'], [/individual|analyst|developer|tester|reviewer|observer|engineer|you/, 'user'], [/packet|claim|evidence|log|record|handoff|trace|contract|file|brief|plan|note|status/, 'file'], [/model|agent|adapter|tool|harness|hook|checker|cpu|subagent|session|repo|skill|mcp/, 'cpu'], [/review|search|inspect|compare/, 'search'], [/learned|why|idea|concept/, 'bulb'], [/can do|flag|deliver|ship|transfer|required output/, 'flag'], [/pick|choose|decide/, 'hand'], [/run|demo|execute|play|watch|ask/, 'play'], [/step|list|todo|checklist/, 'list']];
// SDLC phase tracker: six dots in the slide header; slide.sdlc = 'plan' | … | 'maintain' | 'all'; slide.sdlcLoop adds ↺ (back to the start)
const SDLC_PHASES = [['plan', 'Plan'], ['design', 'Design'], ['build', 'Build'], ['test', 'Test'], ['deploy', 'Deploy'], ['maintain', 'Maintain']];
function sdlcTrack(s) {
  const p = s.sdlc; if (!p) return null;
  const el = node('div', 'sdlc-track'); el.setAttribute('role', 'img');
  el.setAttribute('aria-label', p === 'all' ? 'SDLC: all six phases' : 'SDLC phase: ' + (SDLC_PHASES.find(([k]) => k === p) || ['', p])[1]);
  SDLC_PHASES.forEach(([k, label], i) => { const st = node('span', 'sdlc-step' + (p === 'all' || p === k ? ' on' : '')); st.style.setProperty('--i', i); st.append(node('span', 'sdlc-dot'), node('span', 'sdlc-label', label)); el.append(st); });
  if (s.sdlcLoop) el.append(node('span', 'sdlc-loop', '↺'));
  return el;
}
// larger icons for the definitions layout (v.glossary)
const GLOSS_ICONS = {
  terminal: '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="M7 10l3 2.5L7 15M12.5 15H17"/>',
  alert: '<path d="M12 3l9.5 17h-19z"/><path d="M12 10v4.5M12 17.5h.01"/>',
  replay: '<path d="M4.5 12a7.5 7.5 0 1 0 2.4-5.5"/><path d="M4 4v4h4"/><path d="M10.5 9.2l4.5 2.8-4.5 2.8z"/>',
  chart: '<path d="M3 20.5h18"/><path d="M4 16l4.5-4.5 4 3L20 6"/><path d="M16 6h4v4"/>',
  trace: '<path d="M4 6h9M4 11h9M4 16h5"/><circle cx="16.5" cy="15.5" r="3.2"/><path d="M19 18l2.5 2.5"/>',
  human: '<circle cx="12" cy="9.5" r="3"/><path d="M7 18.5a5 5 0 0 1 10 0"/><path d="M19.5 9A8 8 0 0 0 5 6.5"/><path d="M4.5 15A8 8 0 0 0 19 17.5"/><path d="M5 3.5v3h3M19 20.5v-3h-3"/>',
  cart: '<path d="M2.5 4h2.6l2.3 10.5h10.4L20 7.5H6.2"/><circle cx="9.5" cy="19" r="1.4"/><circle cx="16.5" cy="19" r="1.4"/>',
  bolt: '<path d="M13.5 2.5L5 13.5h6l-1 8 8.5-11h-6z"/>',
  open: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.6 2.3c-.8.4-1.2 1-1.2 1.8"/><path d="M12 17h.01"/>',
  bot: '<rect x="5" y="8" width="14" height="11" rx="3"/><circle cx="9.5" cy="13" r="1.4"/><circle cx="14.5" cy="13" r="1.4"/><path d="M12 8V5M12 4.5h.01M9.5 16.5h5"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 11h6M9 14.5h6M9 18h4"/>',
  evidence: '<path d="M4 6h9M4 11h7M4 16h5"/><path d="M14.5 15.5l2.2 2.2 4-4.5"/>',
  fix: '<path d="M4.5 12a7.5 7.5 0 1 1 2.4 5.5"/><path d="M4 20v-4h4"/>',
  sign: '<path d="M4 19c2-3 3.5-4 5-2.5s3 .5 4-1.5"/><path d="M14 13l5.5-5.5a1.8 1.8 0 0 0-2.5-2.5L11.5 10.5 11 13z"/><path d="M4 21h16"/>'
};
function cardIcon(title) { const t = (title || '').toLowerCase(); const hit = ICON_RULES.find(([re]) => re.test(t)); const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('aria-hidden', 'true'); svg.innerHTML = ICONS[hit ? hit[1] : 'dot']; const wrap = node('span', 'card-icon'); wrap.append(svg); return wrap; }
function cardBody(body) {
  const text = String(body || '');
  const arrows = text.split(/\s*(?:→|->)\s*/);
  if (arrows.length >= 3 && text.length < 200) {
    const chain = node('div', 'chain');
    arrows.forEach((a, i) => { chain.append(node('span', 'chip' + (i === 0 ? ' first' : ''), a.trim())); if (i < arrows.length - 1) chain.append(node('span', 'chain-arrow', '→')); });
    return chain;
  }
  return node('p', null, text);
}
function renderCard(c, i) { const card = node('article', 'card'); card.style.setProperty('--i', i); const head = node('div', 'card-head'); head.append(cardIcon(c.title), node('h2', null, c.title)); card.append(head, cardBody(c.body)); return card; }

/* ---- slide layouts ---- */
let slideController = null;
function renderTagline(stage, s) { if (!s.visual?.anatomy && s.tagline) stage.append(node('p', 'tagline', s.tagline)); }
function renderPillars(stage, s) { const row = node('div', 'pillars'); (s.items || []).forEach((it, i) => { const p = node('div', 'pillar'); p.style.setProperty('--i', i); p.append(node('span', 'pillar-label', it.label)); if (it.caption) p.append(node('span', 'pillar-caption', it.caption)); row.append(p); }); stage.append(row); }
function renderSteps(stage, s) {
  const wrap = node('div', 'steps-wrap'); const row = node('ol', 'steps-chain'); let active = -1; const els = []; const co = s.callout;
  (s.items || []).forEach((it, i) => {
    const li = node('li', 'step-item'); li.style.setProperty('--i', i);
    if (co && co.at === i + 1) { const c = node('div', 'step-callout'); c.append(node('span', 'step-callout-text', co.text), node('span', 'step-callout-arrow', '▼')); li.append(c); }
    const b = node('button', 'step-btn'); b.setAttribute('aria-pressed', 'false'); b.setAttribute('aria-label', 'Step ' + (i + 1) + ': ' + it.label);
    b.append(node('span', 'step-circle', String(i + 1))); li.append(b, node('span', 'step-label', it.label));
    if (it.phase) li.append(node('span', 'step-phase', it.phase));
    if (it.caption) li.append(node('span', 'step-caption', it.caption));
    b.addEventListener('click', () => { active = i; els.forEach((e, k) => { e.classList.toggle('active', k === i); e.querySelector('button').setAttribute('aria-pressed', String(k === i)); }); cap.textContent = it.detail || it.caption || it.label; });
    els.push(li); row.append(li);
  });
  const cap = node('p', 'steps-detail', s.detail || '');
  const ctrl = node('div', 'widget-controls');
  const next = node('button', null, 'Reveal next →'); next.addEventListener('click', () => { if (active < els.length - 1) els[active + 1].querySelector('button').click(); });
  const all = node('button', 'secondary', 'Show all'); all.addEventListener('click', () => { els.forEach(e => { e.classList.add('active'); e.querySelector('button').setAttribute('aria-pressed', 'true'); }); active = els.length - 1; cap.textContent = s.detail || ''; });
  ctrl.append(next, all);
  if (co && co.at) els[co.at - 1].classList.add('highlight');
  wrap.append(row, cap, ctrl); stage.append(wrap);
}
// matrix: one row per option, the same columns for each; a cell ['yes'|'ask'|'no', text] gets a coloured mark
function renderMatrix(stage, s) { const m = s.matrix || {}; const grid = node('div', 'matrix'); const n = (m.columns || []).length;
  grid.style.setProperty('--mx-tpl', m.template || 'minmax(9rem,1.1fr) ' + 'minmax(0,1fr) '.repeat(Math.max(n - 1, 0)) + 'minmax(0,2.2fr)');  // last column holds the longer text, unless the slide sets its own
  const head = node('div', 'mx-row mx-head'); head.append(node('span')); (m.columns || []).forEach(c => head.append(node('span', 'mx-col', c))); grid.append(head);
  (m.rows || []).forEach((r, i) => { const row = node('div', 'mx-row'); row.style.setProperty('--i', i); const name = node('div', 'mx-name'); name.append(node('strong', null, r.title)); if (r.sub) name.append(node('span', 'mx-sub', r.sub)); row.append(name);
    (r.cells || []).forEach((c, j) => { let cell; if (Array.isArray(c)) { cell = node('div', 'mx-cell mx-' + c[0]); cell.append(node('span', 'mx-mark', { yes: '✓', ask: '?', no: '✕' }[c[0]] || ''), node('span', null, c[1])); } else cell = node('div', 'mx-cell mx-text', c);
      if (m.accent === j) cell.classList.add('mx-accent'); row.append(cell); });   // accent: the column that matters most stands out
    grid.append(row); });
  stage.append(grid); }
function renderCompare(stage, s) { const grid = node('div', 'compare'); (s.columns || []).forEach((c, i) => { const col = node('section', 'compare-col'); col.style.setProperty('--i', i); col.append(node('h2', null, c.title)); const ul = node('ul'); (c.items || []).forEach(x => ul.append(node('li', null, x))); col.append(ul); if (c.foot) col.append(node('p', 'compare-foot', c.foot)); grid.append(col); }); stage.append(grid); }
function renderRecap(stage, s) {
  const list = node('ul', 'recap-list'); const items = s.items || [];
  items.forEach((it, i) => { const li = node('li', 'recap-item hidden-item'); li.setAttribute('aria-hidden', 'true'); li.append(node('span', 'recap-check', String(i + 1)), node('span', 'recap-text', it.label + (it.caption ? ' — ' + it.caption : ''))); list.append(li); });
  let shown = 0; const ctrl = node('div', 'widget-controls'); const btn = node('button', null, 'Reveal (' + items.length + ')');
  btn.addEventListener('click', () => { if (shown < items.length) { const li = list.children[shown]; li.classList.remove('hidden-item'); li.removeAttribute('aria-hidden'); li.querySelector('.recap-check').textContent = '✓'; announce(li.textContent); shown++; btn.textContent = shown < items.length ? 'Reveal (' + (items.length - shown) + ' left)' : 'All shown'; } });
  ctrl.append(btn); stage.append(list, ctrl);
}
function renderTimer(stage, s) {
  // starts at 00:00; minutes can be typed or nudged any time, and the timer keeps running when you change slides
  stage.append(ALSTimer.mount({ key: ALSTimer.key(current, s.title), defaultSec: 0, minutes: true, bar: true, doneText: 'TIME',
    onDone: () => notify('Time is up — this assignment ends now'), onEmpty: () => notify('Set the minutes first, then press Start.'), signal: slideController.signal }));
}
function renderLayout(stage, s) {
  if (s.visual?.anatomy) return;
  const L = s.layout;
  if (L === 'pillars') renderPillars(stage, s);
  else if (L === 'steps') renderSteps(stage, s);
  else if (L === 'compare') renderCompare(stage, s);
  else if (L === 'matrix') renderMatrix(stage, s);
  else if (L === 'recap') renderRecap(stage, s);
  if (s.cards?.length && (!L || L === 'exercise' || L === 'cards')) {
    const grid = node('div', 'cards' + (s.cards.length === 3 ? ' three' : ''));
    s.cards.forEach((c, i) => grid.append(renderCard(c, i)));
    stage.append(grid);
  }
  if (L === 'exercise') renderTimer(stage, s);
}

/* ---- AetherBOT + illustrations (slides.js: visual) ----
   Additive only: never changes slide wording. Highlights wrap existing words
   in a span; all art is aria-hidden. AetherBOT is an assistant, not decoration:
   every appearance does something that explains the slide, and his tools come
   out of the hatch in his head. */
const SVGNS = 'http://www.w3.org/2000/svg';
function svg(viewBox, inner, cls) { const e = document.createElementNS(SVGNS, 'svg'); e.setAttribute('viewBox', viewBox); e.setAttribute('aria-hidden', 'true'); e.setAttribute('focusable', 'false'); if (cls) e.setAttribute('class', cls); e.innerHTML = inner; return e; }
/* hatch = where the lid on top of his head sits, in % of the image box (measured) */
const BOTS = {
  wave:  { src: 'assets/aetherbot/aetherbot-wave.webp',  hatch: [58.4, 12.6] },
  think: { src: 'assets/aetherbot/aetherbot-think.webp', hatch: [51.3, 14.8] },
  point: { src: 'assets/aetherbot/aetherbot-point.webp', hatch: [32.6, 14.6] },
  head:  { src: 'assets/aetherbot/aetherbot-head.webp',  hatch: [49.6, 25.8] },
  coffee: { src: 'assets/aetherbot/aetherbot-coffee.webp' },
  // stretch-arm poses: tip = fingertip position in % of the image (used by place: 'pointer')
  stretchLeft:  { src: 'assets/aetherbot/stretch/aetherbot-stretch-links.webp',  tip: [0.1, 48], ratio: 900 / 541 },
  sleepy:       { src: 'assets/aetherbot/faces/aetherbot-face-slaperig.webp' },
  happy:        { src: 'assets/aetherbot/faces/aetherbot-face-blij.webp' },
  happyHatch:   { src: 'assets/aetherbot/faces/aetherbot-face-blij.webp', hatch: [50, 22] },
  peek:         { src: 'assets/aetherbot/aetherbot-peek.webp' },
  multiarm:     { src: 'assets/aetherbot/aetherbot-multiarm.webp' },
  stretchUp:    { src: 'assets/aetherbot/stretch/aetherbot-stretch-omhoog.webp', ratio: 336 / 1100 },
  stretchRight: { src: 'assets/aetherbot/stretch/aetherbot-stretch-rechts.webp', tip: [99.7, 48.5], ratio: 900 / 551 }
};
const PILLAR_ICONS = [
  '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.3"/>',
  '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.8-4.8"/><path d="M7.5 10.5l2 2 3.5-4"/>',
  '<path d="M4 12a8 8 0 0 1 14-5l2 2"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5l-2-2"/><path d="M4 20v-5h5"/>',
  '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19a6 6 0 0 1 12 0"/><path d="M15 19a4 4 0 0 1 6-3.5"/>'];
const ART = {
  sliders: () => svg('0 0 300 96', [0, 1, 2].map(i => '<g class="sl" style="--i:' + i + '"><path class="sl-track" d="M20 ' + (18 + i * 30) + 'H280"/><circle class="sl-knob" cx="' + [210, 120, 70][i] + '" cy="' + (18 + i * 30) + '" r="10"/></g>').join(''), 'art art-sliders'),
  thermo: () => svg('0 0 300 96', '<rect class="th-tube" x="22" y="10" width="20" height="62" rx="10"/><circle class="th-bulb" cx="32" cy="78" r="14"/><rect class="th-fill" x="27" y="22" width="10" height="56" rx="5"/>' +
    '<path class="th-wave" d="M70 48c15-26 30 26 45 0s30 26 45 0 30 26 45 0 30 26 45 0"/>', 'art art-thermo'),
  route: () => svg('0 0 400 70',
    '<path class="art-path" d="M35 35H365"/>' +
    [35, 145, 255, 365].map((x, i) => '<g transform="translate(' + x + ' 35)"><g class="art-stop" style="--i:' + i + '"><circle r="24"/>' + [
      '<path d="M-6 9h12M-4 14h8M-9 2a10 10 0 1 1 18 0c-2 2-3 4-3 6h-12c0-2-1-4-3-6z"/>',
      '<rect x="-13" y="-10" width="26" height="20" rx="3"/><path d="M-7 -3l5 4-5 4M1 6h6"/>',
      '<path d="M-10 0a10 10 0 0 1 17-7l3 3M10 -9v5h-5M10 0a10 10 0 0 1-17 7l-3-3M-10 9v-5h5"/>',
      '<path d="M-13 11h26M-11 11v-20M-5 11v-16M1 11v-19M7 11l-4-17M11 11v-14"/>'][i] + '</g></g>').join(''), 'art art-route'),
  timeline: () => svg('0 0 760 96',
    [0, 1].map(i => '<g class="tl-block tl-teach" style="--i:' + i + '"><rect x="' + (i * 96) + '" y="20" width="84" height="56" rx="12"/><text x="' + (i * 96 + 42) + '" y="56">' + (i + 1) + '</text></g>').join('') +
    '<path class="tl-arrow" d="M196 48h40m-10-9 10 9-10 9"/>' +
    [0, 1, 2, 3, 4].map(i => '<g class="tl-block tl-support" style="--i:' + (i + 2) + '"><rect x="' + (256 + i * 101) + '" y="20" width="89" height="56" rx="12"/><text x="' + (256 + i * 101 + 44.5) + '" y="56">' + (i + 1) + '</text></g>').join(''), 'art art-timeline'),
  thought: () => svg('0 0 260 210',
    '<circle class="bubble" style="--i:0" cx="22" cy="198" r="7"/><circle class="bubble" style="--i:1" cx="46" cy="174" r="11"/>' +
    '<g transform="translate(262 0) scale(-1 1)"><path class="cloud" style="--i:2" d="M58 142c-26 0-44-18-44-40 0-20 15-36 34-39 5-24 26-41 51-41 19 0 36 10 45 25 6-3 13-5 21-5 27 0 48 21 48 47 0 2 0 4-1 6 12 6 20 18 20 32 0 20-16 35-36 35z"/></g>' +
    '<g class="cloud-ico" style="--i:3"><path class="loop" d="M96 60a36 36 0 1 1-26 12"/><path class="loop" d="M62 64l8 8 9-6"/><circle cx="96" cy="94" r="20"/><path d="M96 94V82M96 94h9"/><circle class="clock-dot" cx="96" cy="94" r="2.6"/></g>' +
    '<text class="cloud-q" x="168" y="120">?</text>', 'gadget gadget-thought')
};
const LID = '<svg class="lid" viewBox="0 0 60 24" aria-hidden="true"><defs><linearGradient id="lidg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b5cd6"/><stop offset="1" stop-color="#2b2f6b"/></linearGradient></defs><rect x="2" y="6" width="56" height="14" rx="7" fill="url(#lidg)" stroke="#161d3a" stroke-width="2"/><circle cx="8" cy="13" r="3.4" fill="#FF7A1A"/></svg>';

function highlight(root, s) {
  (s.visual?.highlight || []).forEach(h => {
    let host = null;
    if (h.in === 'title') host = root.querySelector('.heading h1');
    else if (h.in === 'subtitle') host = root.querySelector('.heading .subtitle');
    else if (h.in === 'tagline') host = root.querySelector('.tagline');
    else if (/^card:\d+$/.test(h.in)) host = root.querySelectorAll('.card p')[Number(h.in.split(':')[1])];
    if (!host) return;
    const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
    for (let t = walker.nextNode(); t; t = walker.nextNode()) {
      const i = t.nodeValue.indexOf(h.text); if (i < 0) continue;
      const mid = t.splitText(i); mid.splitText(h.text.length);
      const span = node('span', 'hl hl-' + h.tone); mid.replaceWith(span); span.append(mid); break;
    }
  });
}
// slides 8-13: extra layouts, all keep the slide text verbatim
function renderExtras(stage, main, s, v) {
  const x = { aim: [] }; const cards = [...main.querySelectorAll('.card')]; const grid = main.querySelector('.cards');
  if (v.keyLine != null && cards[v.keyLine]) {                 // 8: calm lead + key line that gets stamped
    main.classList.add('has-key'); cards.forEach((c, i) => { if (i !== v.keyLine) c.classList.add('card-lead'); });
    const key = cards[v.keyLine]; key.classList.add('card-key'); const row = node('div', 'key-row'); key.replaceWith(row); row.append(key);
    const stamp = node('span', 'stamp'); stamp.append(node('span', 'stamp-in', v.stamp || 'VERIFY')); key.append(stamp); x.aim.push(stamp); x.row = row;
  }
  if (v.sdlcIntro && cards.length >= 2) {                       // SDLC: traditional line (handovers) vs AI-native loop (phases light up, a person approves in the middle)
    grid.classList.add('sdlc-intro');
    const line = node('div', 'sdlc-line');
    SDLC_PHASES.forEach(([, label], i) => { if (i) line.append(node('span', 'sdlc-hand', '→')); const c = node('span', 'sdlc-chip', label); c.style.setProperty('--i', i); line.append(c); });
    cards[0].append(line);
    const cx = 120, cy = 118, R = 78, pt = (deg, r) => [cx + r * Math.cos(deg * Math.PI / 180), cy + r * Math.sin(deg * Math.PI / 180)];
    let svgTxt = '<svg class="sdlc-loop-svg" viewBox="0 0 240 236" aria-hidden="true"><defs><marker id="sdlcArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="sdlc-ah"/></marker></defs>';
    SDLC_PHASES.forEach((_, i) => { const a = -90 + i * 60; const [x1, y1] = pt(a + 13, R), [x2, y2] = pt(a + 47, R); svgTxt += `<path class="sdlc-arc" d="M${x1.toFixed(1)},${y1.toFixed(1)} A${R},${R} 0 0 1 ${x2.toFixed(1)},${y2.toFixed(1)}" marker-end="url(#sdlcArrow)"/>`; });
    SDLC_PHASES.forEach(([, label], i) => { const a = -90 + i * 60; const [x, y] = pt(a, R), [lx, ly] = pt(a, R + 24); const anchor = Math.abs(lx - cx) < 8 ? 'middle' : lx > cx ? 'start' : 'end';
      svgTxt += `<circle class="sdlc-node" style="--i:${i}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8"/><text class="sdlc-lbl" x="${(anchor === 'start' ? lx - 8 : anchor === 'end' ? lx + 8 : lx).toFixed(1)}" y="${(ly + 4).toFixed(1)}" text-anchor="${anchor}">${label}</text>`; });
    svgTxt += `<g class="sdlc-human" transform="translate(${cx - 18},${cy - 30}) scale(1.5)">${GLOSS_ICONS.human}</g><text class="sdlc-human-txt" x="${cx}" y="${cy + 22}" text-anchor="middle">a person approves</text></svg>`;
    const holder = node('div', 'sdlc-loop-wrap'); holder.innerHTML = svgTxt;
    cards[1].append(holder);
  }
  if (v.roles && cards.length >= 2) {                           // two roles side by side: builder → product (Aetherbot sits in the product card)
    grid.classList.add('roles'); cards.forEach((c) => c.querySelector('.card-icon')?.remove());
    const ic = node('div', 'gl-icon role-icon'); ic.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${GLOSS_ICONS[v.roles.icon || 'terminal']}</svg>`; cards[0].prepend(ic);
    const arrow = node('div', 'role-arrow'); arrow.append(node('span', 'role-arrow-glyph', '→'), node('span', 'role-arrow-label', v.roles.arrow || '')); cards[0].after(arrow);
  }
  if (v.story) {                                                // story strip: numbered panels with a big icon, arrows between them, one example chip each
    grid.classList.add('story');
    cards.forEach((c, i) => { const g = v.story[i]; if (!g) return; c.classList.add('gl-card', 'story-card'); c.style.setProperty('--gl', g.color || 'var(--cyan)'); c.style.setProperty('--i', i);
      c.querySelector('.card-icon')?.remove();
      const ic = node('div', 'gl-icon'); ic.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${GLOSS_ICONS[g.icon] || ICONS.dot}</svg>`;
      c.prepend(node('span', 'story-num', String(i + 1)), ic);
      if (g.eg) c.append(node('span', 'gl-eg', g.eg));
      if (i < cards.length - 1) c.after(node('div', 'story-arrow', '→')); });
  }
  if (v.skillTrees) {                                           // skills: per card an owner icon, where the skills live (folder tree) and what each does
    grid.classList.add('skill-trees'); if (cards.length === 1) grid.classList.add('one');
    cards.forEach((c, i) => { const T = v.skillTrees[i]; if (!T) return; c.classList.add('sk-card'); c.style.setProperty('--gl', T.color || 'var(--cyan)');
      c.querySelector('.card-icon')?.remove();
      const ic = node('div', 'gl-icon sk-icon');
      if (T.icon === 'bot') { const im = document.createElement('img'); im.src = BOTS.head.src; im.alt = ''; ic.append(im); }
      else ic.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${GLOSS_ICONS[T.icon] || ICONS.dot}</svg>`;
      c.prepend(ic);
      const tree = node('div', 'sk-tree');
      (T.lines || []).forEach(([depth, name, note, tag, kind]) => {
        const row = node('div', 'sk-row' + (kind ? ' sk-' + kind : '')); row.style.setProperty('--d', depth);
        const glyph = kind === 'more' ? '' : /\/$/.test(name) ? '📁' : '📄';
        row.append(node('span', 'sk-name', (glyph ? glyph + ' ' : '') + name));
        if (note) row.append(node('span', 'sk-note', note));
        if (tag) row.append(node('span', 'sk-tag', tag));
        tree.append(row); });
      c.append(tree);
      if (T.steps) { const ol = node('ol', 'sk-steps'); T.steps.forEach(t => ol.append(node('li', null, t))); c.append(ol); } });
  }
  const bigTrack = (onPick) => {                                // the header's six-dot SDLC line, drawn big across the slide (sdlcLine, sdlcRoute + routeLine)
    const track = node('div', 'sdlc-track sdlc-track-big'); track.setAttribute('role', 'img'); track.setAttribute('aria-label', 'SDLC: ' + SDLC_PHASES.map(([, l]) => l).join(', '));
    const steps = SDLC_PHASES.map(([, label], i) => { const st = node('span', 'sdlc-step'); st.style.setProperty('--i', i); st.append(node('span', 'sdlc-dot'), node('span', 'sdlc-label', label)); st.addEventListener('click', () => onPick(i)); track.append(st); return st; });
    return [track, steps];
  };
  if (v.sdlcLine) {                                             // the SDLC as one straight line with six dots: each click lights the next phase and shows its card below it
    grid.classList.add('sdlc-big'); let k = -1;
    const [track, steps] = bigTrack(i => { k = i; paint(); }); grid.prepend(track);
    cards.forEach((c, i) => { c.classList.add('sb-card'); c.querySelector('.card-icon')?.remove(); c.addEventListener('click', () => { k = i; paint(); }); });
    const paint = () => { steps.forEach((st, i) => { st.classList.toggle('on', i <= k); st.classList.toggle('cur', i === k); }); cards.forEach((c, i) => { c.classList.toggle('shown', i <= k); c.classList.toggle('cur', i === k); }); };
    paint();
    const next = () => { if (k < cards.length - 1) { k++; paint(); return true; } return false; };
    window.__reveal = next; slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; });
  }
  if (v.sdlcRoute) {                                            // the day as the SDLC: one column per phase with its assignments; → or click walks the phases, the current one is orange
    grid.classList.add('sdlc-route'); let k = 0; let lineSteps = [];
    let walker = null;
    if (v.routeLine) { const [track, steps] = bigTrack(i => { k = i; paint(); }); grid.prepend(track); grid.classList.add('sr-lined'); lineSteps = steps;
      if (v.routeBot) { walker = node('div', 'sr-walker'); walker.innerHTML = '<img src="assets/aetherbot/aetherbot-think.webp" alt="">'; walker.append(node('span', 'aj-bot-tag', v.routeBot === true ? 'SONNY' : v.routeBot)); track.classList.add('has-walker'); track.append(walker); } }
    cards.forEach((c, i) => { const R = v.sdlcRoute[i] || {}; c.classList.add('sr-card'); c.classList.toggle('sr-opt', !!R.optional); c.style.setProperty('--i', i);
      c.querySelector('.card-icon')?.remove();
      if (!v.routeLine) c.prepend(node('span', 'sr-dot', String(i + 1)));
      const list = node('div', 'sr-items');
      (R.items || []).forEach(([tag, text, opt]) => { const it = node('div', 'sr-item' + (opt ? ' opt' : '')); it.append(node('span', 'sr-tag', tag), node('span', 'sr-text', text)); list.append(it); });
      c.querySelector('.card-head')?.after(list);
      c.addEventListener('click', () => { k = i; paint(); }); });
    const paint = () => { cards.forEach((c, i) => { c.classList.toggle('on', i === k); c.classList.toggle('done', i < k); }); lineSteps.forEach((st, i) => { st.classList.toggle('on', i <= k); st.classList.toggle('cur', i === k); }); if (walker) walker.style.setProperty('--k', k); };
    paint();
    const next = () => { if (k < cards.length - 1) { k++; paint(); return true; } return false; };
    window.__reveal = next; slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; });
  }
  if (v.readyBuild && cards.length >= 2) {                      // project: ready blocks (dim, ✓) vs missing pieces (orange, red test)
    grid.classList.add('ready-build');
    cards.forEach((c, i) => { const R = v.readyBuild[i]; if (!R) return; c.classList.add(i ? 'rb-todo' : 'rb-ready'); c.querySelector('.card-icon')?.remove();
      const box = node('div', 'rb-items');
      R.items.forEach((it) => { const [tag, text] = Array.isArray(it) ? it : [null, it]; const b = node('div', 'rb-item');
        b.append(node('span', 'rb-mark', i ? '●' : '✓')); if (tag) b.append(node('span', 'rb-tag', tag)); b.append(node('span', 'rb-text', text));
        if (i) b.append(node('span', 'rb-red', 'red test')); box.append(b); });
      c.append(box); });
  }
  if (v.intentFlow && cards.length >= 2) {                     // A2: you decide → intent.md (gaps orange) → Claude Code reads it before every build
    grid.classList.add('intent-flow');
    cards.forEach((c, i) => { const F = v.intentFlow[i]; if (!F) return; c.classList.add('if-card', 'if-' + i); c.querySelector('.card-icon')?.remove();
      if (F.doc) { const d = node('div', 'if-doc'); d.append(node('div', 'if-doc-name', F.docName || 'intent.md'));
        F.doc.forEach(([sec, gap, label, note]) => { const r = node('div', 'if-sec' + (gap ? ' gap' : '')); const nm = node('span', 'if-sec-name', sec); if (note) nm.append(node('small', 'if-sec-note', note)); r.append(nm, node('span', 'if-sec-state', label || (gap ? 'fill in' : '✓ filled'))); d.append(r); });   // opt-in note: what the part is for
        c.append(d); }
      if (F.tree) { const t = node('div', 'if-tree');                     // opt-in: where the file lives (small folder tree)
        F.tree.forEach(([depth, name, note, hl, tag]) => { const r = node('div', 'if-tr' + (hl ? ' hl' : '')); r.style.setProperty('--d', depth); if (tag) r.append(node('span', 'if-tr-tag', tag)); r.append(node('span', 'if-tr-name', (/\/$/.test(name) ? '📁 ' : '📄 ') + name)); if (note) r.append(node('span', 'if-tr-note', note)); t.append(r); });
        c.append(t); }
      if (F.items) { const l = node('div', 'if-items');
        F.items.forEach(([tag, text, cls]) => { const it = node('div', 'if-item' + (cls ? ' ' + cls : '')); if (tag) it.append(node('span', 'if-tag', tag)); it.append(node('span', 'if-text', text)); l.append(it); });
        c.append(l); } });
    cards.slice(0, -1).forEach((c) => c.after(node('div', 'if-arrow', '→'))); if (cards.length === 2) grid.classList.add('if-two');
  }
  if (v.gapCompare && cards.length >= 2) {                      // Jessy Day 5: the chain (need → how we want it → what you saw → the gap → intent.md) on top, then want vs. today per block
    const G = v.gapCompare; grid.classList.add('gc-flow');
    cards.forEach((c, i) => { c.querySelector('.card-icon')?.remove(); c.classList.add('gc-chip', 'gc-' + i); if (i === G.focus) c.classList.add('gc-focus'); c.prepend(node('span', 'gc-ico', (G.icons || [])[i] || '')); });
    cards.slice(0, -1).forEach((c) => c.after(node('div', 'gc-arrow', '→')));
    const tbl = node('div', 'gc-table'); const hd = node('div', 'gc-row gc-head'); hd.append(node('span', null, G.head[0]), node('span', null, G.head[1]), node('span', null, '')); tbl.append(hd);
    G.rows.forEach(([want, seen, ok], i) => { const r = node('div', 'gc-row' + (ok ? ' ok' : ' bad')); r.style.setProperty('--i', i); r.append(node('span', 'gc-want', want)); const sv = node('span', 'gc-seen'); [].concat(seen).forEach((x) => sv.append(node('code', null, x))); r.append(sv, node('span', 'gc-mark', ok ? '✓' : '✗')); tbl.append(r); });
    grid.after(tbl); if (G.note) tbl.after(node('p', 'gc-note', G.note));
  }
  if (v.shopDay && cards.length >= 3) {                         // the world before the incident: the shop (orders tick in), you the operator (on call), today's goal (the agent)
    const D = v.shopDay; grid.classList.add('shop-day'); cards.forEach((c, i) => { c.querySelector('.card-icon')?.remove(); c.classList.add('sd-card', 'sd-' + i); });
    const shop = node('div', 'sd-shop'); shop.append(node('div', 'wk-bar', D.shopBar || 'shop · checkout'));
    D.orders.forEach(([where, what], i) => { const o = node('div', 'sd-order'); o.style.setProperty('--i', i); o.append(node('span', 'sd-ok', '✓'), node('b', null, where), node('span', null, what)); shop.append(o); });
    if (D.health) shop.append(node('div', 'sd-health', D.health));
    cards[0].querySelector('.card-head')?.after(shop);
    const you = node('div', 'sd-figure'); you.innerHTML = `<img src="assets/aetherbot/faces/aetherbot-face-blij.webp" alt=""><span class="sd-phone">📱</span>`; you.append(node('span', 'wk-tag', D.youTag || 'YOU · THE OPERATOR'));
    cards[1].querySelector('.card-head')?.after(you);
    const goal = node('div', 'sd-figure sd-goal'); goal.innerHTML = `<img src="assets/aetherbot/aetherbot-think.webp" alt="">`; goal.append(node('span', 'aj-bot-tag', D.agentTag || 'ON CALL'));
    cards[2].querySelector('.card-head')?.after(goal);
  }
  if (v.agentJob && cards.length >= 3) {                        // what the on-call agent does: it looks (data chips), writes a diagnosis (mini doc), waits for you (buttons)
    const J = v.agentJob; grid.classList.add('agent-job'); cards.forEach((c, i) => { c.querySelector('.card-icon')?.remove(); c.classList.add('aj-card', 'aj-' + i); });
    const look = node('div', 'aj-look');
    const bot = node('div', 'aj-bot'); bot.innerHTML = '<img src="assets/aetherbot/aetherbot-think.webp" alt="">'; bot.append(node('span', 'aj-bot-tag', J.botTag || 'ON CALL')); look.append(bot);
    const chips = node('div', 'aj-chips'); J.looks.forEach(([ico, txt], i) => { const ch = node('div', 'aj-chip'); ch.style.setProperty('--i', i); ch.append(node('span', 'aj-chip-i', ico), node('span', null, txt), node('span', 'aj-tick', '✓')); chips.append(ch); });
    look.append(chips); cards[0].querySelector('.card-head')?.after(look);
    const doc = node('div', 'aj-doc'); doc.append(node('div', 'aj-doc-tab', J.docName || 'diagnosis'));
    J.doc.forEach(([k, val, ev], i) => { const r = node('div', 'aj-row'); r.style.setProperty('--i', i); r.append(node('b', null, k), node('span', null, val)); if (ev) { const evs = node('span', 'aj-evs'); [].concat(ev).forEach((e) => evs.append(node('code', 'aj-ev', e))); r.append(evs); } doc.append(r); });
    cards[1].querySelector('.card-head')?.after(doc);
    const four = J.check && cards.length >= 4;                    // opt-in 4th block: he checks the diagnosis against fixed rules before it gets to you
    if (four) { grid.classList.add('aj-four'); const chk = node('div', 'aj-check');
      J.check.rules.forEach((r, i) => { const ru = node('div', 'aj-rule'); ru.style.setProperty('--i', i); ru.append(node('span', 'aj-rule-i', '📏'), node('span', null, r)); chk.append(ru); });
      if (J.check.gate) chk.append(node('div', 'aj-gate', J.check.gate));
      cards[2].querySelector('.card-head')?.after(chk); }
    const ask = node('div', 'aj-ask'); ask.append(node('div', 'aj-wait', J.wait || 'waiting for the operator'));
    const btns = node('div', 'aj-btns'); btns.append(node('span', 'aj-btn aj-yes', J.yes || 'Approve'), node('span', 'aj-btn aj-no', J.no || 'Reject')); ask.append(btns);
    cards[four ? 3 : 2].querySelector('.card-head')?.after(ask);
    (four ? [cards[0], cards[1], cards[2]] : [cards[0], cards[1]]).forEach((c) => c.after(node('div', 'aj-arrow', '→')));
  }
  if (v.contractZoom && cards.length >= 5) {                     // Jessy Day 5 "A diagnosis you can trust": slide 4's blocks on top; he looks (box) → his diagnosis (left) → the five rules (right, click to open/close, each lights what it looks at) → only if all five are met: Sonny asks you
    const Z = v.contractZoom; grid.classList.add('cz-flow');
    cards.forEach((c, i) => { c.querySelector('.card-icon')?.remove(); c.classList.add('cz-chip', 'cz-' + i); c.prepend(node('span', 'cz-ico', (Z.icons || [])[i] || '')); });
    let gate = null;
    cards.forEach((c, i) => { if (i < cards.length - 1) { if (i === 3) { gate = node('div', 'cz-arrow cz-gate'); gate.append(node('span', 'cz-gate-t', Z.gate || 'only if every rule is met'), node('span', null, '→')); c.after(gate); } else c.after(node('div', 'cz-arrow', '→')); } });
    // 1 · he looks: the first box of "How we want Sonny to work"
    const look = node('div', 'cz-look'); const L = Z.look || {};
    const lb = node('div', 'aj-bot'); lb.innerHTML = '<img src="assets/aetherbot/aetherbot-think.webp" alt="">'; lb.append(node('span', 'aj-bot-tag', 'SONNY'));
    const lc = node('div', 'cz-look-body'); lc.append(node('strong', 'cz-look-h', L.title || 'He looks'), node('p', 'cz-look-p', L.body || ''));
    const chips = node('div', 'aj-chips'); (L.items || []).forEach(([ico, txt], i) => { const ch = node('div', 'aj-chip'); ch.style.setProperty('--i', i); ch.append(node('span', 'aj-chip-i', ico), node('span', null, txt), node('span', 'aj-tick', '✓')); chips.append(ch); });
    lc.append(chips); look.append(lb, lc);
    // 2 · his diagnosis (left)
    const panel = node('div', 'cz-panel');
    const doc = node('div', 'aj-doc cz-doc'); doc.append(node('div', 'aj-doc-tab', Z.docName || 'diagnosis'));
    const marks = {}; const mark = (key, el) => { (marks[key] = marks[key] || []).push(el); el.classList.add('cz-hl-able'); };
    let ghost = null;
    Z.doc.forEach((R) => { const r = node('div', 'aj-row cz-row' + (R.ghost ? ' cz-ghost' : '') + (R.small ? ' cz-small' : '')); const lab = node('b', null, R.label); if (R.conf) { const cf = node('span', 'cz-conf', ' (' + R.conf + ')'); lab.append(cf); mark('conf', cf); }
      const txt = node('span', null, R.text); r.append(lab, txt);
      if (R.ev) { const evs = node('span', 'aj-evs'); R.ev.forEach((e) => { const ch = node('code', 'aj-ev', e); mark(e, ch); evs.append(ch); }); r.append(evs); }
      if (R.key) mark(R.key, r); if (R.ghost) ghost = { row: r, txt, off: R.text, on: R.fixed || R.text }; doc.append(r); });
    if (Z.docFoot) doc.append(node('div', 'cz-docfoot', Z.docFoot));
    // 3 · the five rules (right): click to open or close; the last one has a switch "add it"
    const side = node('div', 'cz-side'); side.append(node('div', 'cz-side-h', Z.rulesTitle || 'The contract: five rules'));
    const open = Z.rules.map(() => false); let fixed = false; let focus = -1; let k = 0; let answer = '';
    const okOf = (i) => i === Z.rules.length - 1 && Z.fixLabel ? fixed : !!Z.rules[i].ok;
    const rules = Z.rules.map((R, i) => { const r = node('div', 'cz-rule'); r.tabIndex = 0; r.setAttribute('role', 'button'); r.append(node('span', 'cz-rule-mark', '?'), node('span', 'cz-rule-txt', R.text), node('span', 'cz-rule-note', ''));
      const flip = () => { open[i] = !open[i]; focus = open[i] ? i : open.lastIndexOf(true); k = Math.max(k, 3); paint(); };
      r.addEventListener('click', flip); r.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
      if (i === Z.rules.length - 1 && Z.fixLabel) { const sw = node('button', 'cz-switch'); sw.type = 'button'; sw.append(node('span', 'cz-switch-knob'), node('span', 'cz-switch-t', Z.fixLabel));
        sw.addEventListener('click', (e) => { e.stopPropagation(); fixed = !fixed; open[i] = true; focus = i; answer = ''; paint(); }); r.append(sw); r._sw = sw; }
      side.append(r); return r; });
    const result = node('p', 'cz-result', ''); side.append(result);
    // 4 · only if all five are met: Sonny asks you
    const ask = node('div', 'cz-ask'); const ab = node('div', 'aj-bot'); ab.innerHTML = '<img src="assets/aetherbot/aetherbot-wave.webp" alt="">'; ab.append(node('span', 'aj-bot-tag', 'SONNY'));
    const bubble = node('div', 'cz-bubble'); const say = node('p', 'cz-say', Z.ask?.say || 'All five rules are met. You decide.');
    const btns = node('div', 'aj-btns'); const yes = node('button', 'aj-btn aj-yes', Z.ask?.yes || 'Approve'); const no = node('button', 'aj-btn aj-no', Z.ask?.no || 'Reject'); yes.type = no.type = 'button'; btns.append(yes, no);
    const reply = node('p', 'cz-reply', ''); bubble.append(say, btns, reply); ask.append(ab, bubble);
    yes.addEventListener('click', (e) => { e.stopPropagation(); answer = answer === 'yes' ? '' : 'yes'; paint(); }); no.addEventListener('click', (e) => { e.stopPropagation(); answer = answer === 'no' ? '' : 'no'; paint(); });
    side.append(ask); panel.append(look, doc, side); grid.after(panel);
    const n = Z.rules.length;
    const paint = () => {
      const allOpen = open.every(Boolean), allOk = Z.rules.every((_, i) => okOf(i)), through = allOpen && allOk;
      cards.forEach((c, i) => c.classList.toggle('on', i === 0 ? k >= 1 : i === 1 ? k >= 1 : i === 2 ? k >= 2 : i === 3 ? k >= 3 : through));
      grid.querySelectorAll('.cz-arrow').forEach((a, i) => a.classList.toggle('on', i === 0 ? k >= 1 : i === 1 ? k >= 2 : i === 2 ? k >= 3 : through));
      gate?.classList.toggle('lit', through);
      panel.classList.toggle('show-look', k === 1); panel.classList.toggle('show-doc', k >= 2); panel.classList.toggle('show-rules', k >= 3); panel.classList.toggle('through', through);
      rules.forEach((r, i) => { const o = open[i], ok = okOf(i); r.classList.toggle('open', o); r.classList.toggle('ok', o && ok); r.classList.toggle('bad', o && !ok); r.classList.toggle('focus', i === focus);
        r.querySelector('.cz-rule-mark').textContent = o ? (ok ? '✓' : '✗') : '?'; r.querySelector('.cz-rule-note').textContent = o ? (i === n - 1 && Z.fixLabel ? (fixed ? Z.rules[i].noteOk || 'there' : Z.rules[i].note) : Z.rules[i].note || '') : '';
        if (r._sw) { r._sw.classList.toggle('on', fixed); r._sw.setAttribute('aria-pressed', String(fixed)); } });
      Object.values(marks).flat().forEach((el) => el.classList.remove('cz-hl', 'cz-hl-bad'));
      if (focus >= 0 && open[focus]) (Z.rules[focus].hl || []).forEach((key) => (marks[key] || []).forEach((el) => el.classList.add(okOf(focus) ? 'cz-hl' : 'cz-hl-bad')));
      if (ghost) { const show = open[n - 1] || fixed; ghost.row.classList.toggle('shown', show); ghost.row.classList.toggle('fixed', fixed); ghost.txt.textContent = fixed ? ghost.on : ghost.off; }
      result.textContent = allOpen && !allOk ? (Z.result || '') : ''; result.classList.toggle('shown', allOpen && !allOk);
      ask.classList.toggle('shown', through); reply.textContent = answer === 'yes' ? (Z.ask?.yesReply || '') : answer === 'no' ? (Z.ask?.noReply || '') : ''; reply.classList.toggle('shown', !!answer);
      yes.classList.toggle('picked', answer === 'yes'); no.classList.toggle('picked', answer === 'no');
    };
    paint();
    // → : 1 he looks · 2 diagnosis · 3 rules appear · 4..3+n open the rules in order · then the switch (all met → Sonny asks you)
    const next = () => { if (k < 3) { k++; paint(); return true; } const i = open.indexOf(false); if (i >= 0) { open[i] = true; focus = i; paint(); return true; } if (Z.fixLabel && !fixed) { fixed = true; focus = n - 1; paint(); return true; } return false; };
    // ← : the same steps backwards (switch off → close the last open rule → back to the earlier block); at the start ← goes to the previous slide
    const back = () => { if (answer) { answer = ''; paint(); return true; } if (fixed) { fixed = false; focus = open.lastIndexOf(true); paint(); return true; } const j = open.lastIndexOf(true); if (j >= 0 && k >= 3) { open[j] = false; focus = open.lastIndexOf(true); paint(); return true; } if (k > 0) { k--; paint(); return true; } return false; };
    // the blocks on top are buttons too: alert / he looks → 1, he writes a diagnosis → 2, he checks it → 3, he asks you → only opens when all five rules are met (otherwise the gate shakes)
    cards.forEach((c, i) => { c.classList.add('cz-click'); c.tabIndex = 0; c.setAttribute('role', 'button');
      const go = () => { if (i <= 3) { k = Math.max(i, 1); paint(); return; } const ok = open.every(Boolean) && Z.rules.every((_, j) => okOf(j)); if (ok) return; k = Math.max(k, 3); paint(); gate?.classList.remove('shake'); void gate?.offsetWidth; gate?.classList.add('shake'); setTimeout(() => gate?.classList.remove('shake'), 600); };
      c.addEventListener('click', go); c.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } }); });
    window.__reveal = next; window.__revealBack = back;
    slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; if (window.__revealBack === back) window.__revealBack = null; });
  }
  if (v.fileFlow) {                                             // Jessy Day 5 opt-in: the real path of an incident through the files, one node lit (the contract), ending in PASS / FAIL
    const F = v.fileFlow; const wrap = node('div', 'ff-wrap'); const row = node('div', 'ff-row');
    F.nodes.forEach((N, i) => { if (i) row.append(node('div', 'ff-arrow', '→')); const c = node('div', 'ff-node' + (N.hl ? ' hl' : '')); c.style.setProperty('--i', i);
      c.append(node('span', 'ff-label', N.label)); [].concat(N.file || []).forEach((f) => c.append(node('code', 'ff-file', f))); if (N.note) c.append(node('span', 'ff-note', N.note)); row.append(c); });
    if (F.end) { row.append(node('div', 'ff-arrow', '→')); const e = node('div', 'ff-end'); e.style.setProperty('--i', F.nodes.length);
      const ok = node('div', 'ff-pass'); ok.append(node('b', null, 'PASS'), node('span', null, F.end.pass)); const no = node('div', 'ff-fail'); no.append(node('b', null, 'FAIL'), node('span', null, F.end.fail)); e.append(ok, no); row.append(e); }
    wrap.append(row); if (F.note) wrap.append(node('p', 'ff-foot', F.note)); grid.before(wrap);
    if (F.cardFiles) cards.forEach((c, i) => { const f = F.cardFiles[i]; if (!f) return; c.classList.add('ff-card', 'ff-c' + i); c.querySelector('.card-icon')?.remove(); c.querySelector('.card-head')?.after(node('code', 'ff-card-file', f[0])); if (f[1]) c.append(node('span', 'ff-card-who', f[1])); });
  }
  if (v.incidentTour && cards.length >= 6) {                     // Jessy Day 5 opt-in: follow one incident through the project. The six stops are the cards; → opens them one by one in a panel below; stop 4 (his brain) has an AI model / offline switch
    const T = v.incidentTour; grid.classList.add('it-path');
    cards.forEach((c, i) => { c.querySelector('.card-icon')?.remove(); c.classList.add('it-stop', 'it-s' + i); c.prepend(node('span', 'it-ico', (T.icons || [])[i] || ''));
      const f = (T.files || [])[i]; if (f) { const fs = node('div', 'it-files'); [].concat(f).forEach((x) => fs.append(node('code', null, x))); c.append(fs); }
      c.tabIndex = 0; c.setAttribute('role', 'button'); if (i < cards.length - 1) c.after(node('div', 'it-arrow', '→')); });
    const panel = node('div', 'it-panel'); grid.after(panel);
    const foot = node('div', 'it-foot'); if (T.foot) foot.append(node('p', 'it-foot-main', T.foot)); if (T.footNote) foot.append(node('p', 'it-foot-note', T.footNote)); panel.after(foot);
    let k = 0, off = false; const LAST = 7;                        // k: 0 nothing open · 1 alert · 2 start · 3 agent · 4 brain (AI model) · 5 brain (offline) · 6 contract · 7 you + the line at the bottom
    const stopOf = (s) => (s <= 0 ? -1 : s <= 4 ? s - 1 : s - 2);
    const block = (B) => {
      if (B.split) { const w = node('div', 'it-split'); B.split.forEach((b) => w.append(block(b))); return w; }
      if (B.stack) { const w = node('div', 'it-stack'); B.stack.forEach((b) => w.append(block(b))); return w; }
      if (B.row) { const w = node('div', 'it-row'); B.row.forEach(([ico, t, file, txt]) => { const m = node('div', 'it-mini'); const h = node('div', 'it-mini-h'); h.append(node('span', 'it-mini-i', ico), node('b', null, t)); m.append(h); if (file) m.append(node('code', 'it-mini-f', file)); if (txt) m.append(node('span', 'it-mini-t', txt)); w.append(m); }); return w; }
      if (B.code !== undefined) { const w = node('div', 'it-code' + (B.term ? ' term' : '') + (B.tone ? ' ' + B.tone : '')); if (B.label) w.append(node('span', 'it-code-l', B.label)); w.append(node('pre', null, B.code)); return w; }
      if (B.steps) { const ol = node('ol', 'it-steps'); B.steps.forEach((s) => { const li = node('li'); [].concat(s).forEach((x, j) => li.append(j ? node('code', null, x) : node('span', null, x))); ol.append(li); }); return ol; }
      if (B.checks) { const w = node('div', 'it-checks'); B.checks.forEach(([mark, t, txt, st]) => { const r = node('div', 'it-check ' + (st || 'ok')); r.append(node('span', 'it-check-m', mark), node('b', null, t), node('span', null, txt || '')); w.append(r); }); return w; }
      if (B.chips) { const w = node('div', 'it-chips'); B.chips.forEach(([ico, t]) => { const ch = node('span', 'it-chip'); ch.append(node('span', null, ico), node('span', null, t)); w.append(ch); }); return w; }
      if (B.note) return node('p', 'it-note' + (B.tone ? ' ' + B.tone : ''), B.note);
      return node('span');
    };
    const brain = (B) => {
      const w = node('div', 'it-brain'); const sw = node('div', 'it-switch'); sw.setAttribute('role', 'group');
      [['model', B.model.label], ['offline', B.offline.label]].forEach(([key, label]) => { const b = node('button', 'it-sw' + ((key === 'offline') === off ? ' on' : ''), label); b.type = 'button'; b.addEventListener('click', (e) => { e.stopPropagation(); off = key === 'offline'; if (stopOf(k) === 3) k = off ? 5 : 4; paint(); }); sw.append(b); });
      w.append(sw); const P = off ? B.offline : B.model; const body = node('div', 'it-brain-b ' + (off ? 'offline' : 'model'));
      if (P.lead) body.append(node('p', 'it-lead', P.lead));
      if (P.turns) { const list = node('div', 'it-turns'); P.turns.forEach(([think, tool, got], j) => { const r = node('div', 'it-turn'); r.style.setProperty('--j', j); r.append(node('span', 'it-think', think)); if (tool) { r.append(node('span', 'it-to', '→')); r.append(node('code', 'it-tool', tool)); } if (got) { r.append(node('span', 'it-to', '→')); r.append(node('span', 'it-got', got)); } list.append(r); }); body.append(list); }
      if (P.tools) { const list = node('div', 'it-fixed'); P.tools.forEach((t, j) => { if (j) list.append(node('span', 'it-to', '→')); list.append(node('code', 'it-tool', t)); }); body.append(list); }
      if (P.ifs) { const ul = node('div', 'it-ifs'); P.ifs.forEach(([cond, then]) => { const r = node('div', 'it-if'); r.append(node('span', null, cond), node('span', 'it-to', '→'), node('b', null, then)); ul.append(r); }); body.append(ul); }
      if (P.tags) { const tg = node('div', 'it-tags'); P.tags.forEach((t) => tg.append(node('span', 'it-tag', t))); body.append(tg); }
      w.append(body); if (B.same) w.append(node('p', 'it-same', B.same)); return w;
    };
    const paint = () => {
      const cur = stopOf(k);
      cards.forEach((c, i) => { c.classList.toggle('on', i === cur); c.classList.toggle('done', i < cur); });
      grid.querySelectorAll('.it-arrow').forEach((a, i) => a.classList.toggle('lit', i < cur));
      panel.replaceChildren(); panel.classList.toggle('empty', cur < 0);
      if (cur < 0) panel.append(node('p', 'it-hint', T.hint || ''));
      else { const P = T.stops[cur]; const h = node('div', 'it-ph'); h.append(node('span', 'it-num', String(cur + 1)), node('strong', null, P.title)); panel.append(h);
        if (P.lead) panel.append(node('p', 'it-lead', P.lead)); if (P.brain) panel.append(brain(P.brain)); (P.blocks || []).forEach((b) => panel.append(block(b))); }
      foot.classList.toggle('shown', k >= LAST);
    };
    const next = () => { if (k >= LAST) return false; if (k === 4 && !off) { off = true; k = 5; } else if (k === 4) k = 6; else k++; paint(); return true; };
    const back = () => { if (k <= 0) return false; if (k === 5) { k = 4; off = false; } else if (k === 6 && !off) k = 4; else k--; paint(); return true; };
    cards.forEach((c, i) => { const go = () => { k = i <= 2 ? i + 1 : i === 3 ? (off ? 5 : 4) : i + 2; paint(); };
      c.addEventListener('click', go); c.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } }); });
    paint(); window.__reveal = next; window.__revealBack = back;
    slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; if (window.__revealBack === back) window.__revealBack = null; });
  }
  if (v.proofQs && cards.length >= 3) {                          // Jessy Day 5 opt-in: "how do we know the contract works?" Three questions as cards, opened one by one with →; each card gets its own small picture
    const Q = v.proofQs; grid.classList.add('pq-grid'); let k = 0;
    cards.forEach((c, i) => { const P = Q[i] || {}; c.querySelector('.card-icon')?.remove(); c.classList.add('pq-card', 'pq-' + i); c.querySelector('.card-head')?.prepend(node('span', 'pq-num', String(i + 1)));
      if (P.answer) c.querySelector('.card-head')?.after(node('p', 'pq-answer', P.answer));
      if (P.rules) { const ul = node('div', 'pq-rules'); P.rules.forEach(([r, why]) => { const li = node('div', 'pq-rule'); li.append(node('b', null, r), node('span', null, why)); ul.append(li); }); c.append(ul); }
      if (P.tests) { if (P.testsHead) c.append(node('span', 'pq-tests-h', P.testsHead)); const sb = node('div', 'pq-tests'); P.tests.forEach(([lbl, today]) => { const t = node('div', 'pq-test ' + (today ? 'ok' : 'bad')); t.append(node('span', 'pq-dot', today ? '✓' : '✗'), node('span', null, lbl)); sb.append(t); }); c.append(sb); if (P.score) { const s = node('div', 'pq-score'); P.score.forEach((x, j) => { if (j) s.append(node('span', 'pq-to', '→')); s.append(node('b', null, x)); }); c.append(s); } }
      if (P.terms) P.terms.forEach(([lbl, txt, tone]) => { const t = node('div', 'pq-term ' + (tone || '')); t.append(node('span', 'pq-term-l', lbl), node('pre', null, txt)); c.append(t); });
      if (P.extra) c.append(node('p', 'pq-extra', P.extra));
      if (P.where) c.append(node('code', 'pq-where', P.where));
      c.addEventListener('click', () => { k = Math.max(k, i + 1); paint(); }); });
    const paint = () => cards.forEach((c, i) => c.classList.toggle('shown', i < k));
    paint();
    const next = () => { if (k < cards.length) { k++; paint(); return true; } return false; };
    const back = () => { if (k > 0) { k--; paint(); return true; } return false; };
    window.__reveal = next; window.__revealBack = back;
    slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; if (window.__revealBack === back) window.__revealBack = null; });
  }
  if (v.codeRoute && cards.length) {                             // Jessy Day 5 opt-in: one path into src/contract.ts as real code snippets with arrows (Moment A: Sonny's run · Moment B: the tests). Top: the two ways in, this slide's lit. → opens the snippets one by one, then the "run it yourself" bar
    const R = v.codeRoute; grid.classList.add('cr-grid'); let k = 0;
    if (R.entry) {
      const E = R.entry, en = node('div', 'cr-entry'); en.append(node('span', 'cr-entry-h', E.title || ''));
      const row = node('div', 'cr-entry-row');
      const door = (D, i) => { const d = node('div', 'cr-door cr-m' + D.tag + (i === E.here ? ' here' : ' other')); const h = node('div', 'cr-door-h'); h.append(node('span', 'cr-tag', D.icon || D.tag), node('b', null, D.name)); d.append(h, node('span', 'cr-when', D.when));
        const p = node('div', 'cr-door-path'); [D.cmd, ...(D.path || [])].forEach((x, j) => { if (j) p.append(node('span', 'cr-to', '→')); p.append(node('code', null, x)); }); d.append(p); if (i !== E.here && E.otherNote) d.append(node('span', 'cr-other', E.otherNote)); return d; };
      const tgt = node('div', 'cr-target'); tgt.append(node('code', null, E.target || 'src/contract.ts')); if (E.targetNote) tgt.append(node('span', null, E.targetNote));
      row.append(door(E.doors[0], 0), node('span', 'cr-in', '→'), tgt, node('span', 'cr-in', '←'), door(E.doors[1], 1)); en.append(row); grid.before(en);
    }
    const cols = R.cols || 3;
    cards.forEach((c, i) => { const S = (R.steps || [])[i] || {}; c.querySelector('.card-icon')?.remove(); c.classList.add('cr-card'); if (S.lit) c.classList.add('cr-lit');
      c.style.gridRow = String(Math.floor(i / cols) * 2 + 1); c.style.gridColumn = String((i % cols) * 2 + 1);
      c.querySelector('.card-head')?.prepend(node('span', 'cr-num', String(i + 1)));
      const box = node('div', 'cr-code' + (S.term ? ' term' : '')); if (S.file) box.append(node('span', 'cr-file', S.file)); box.append(node('pre', null, S.code || '')); c.querySelector('.card-head')?.after(box);
      if (S.after) { const a = node('div', 'cr-code cr-after'); a.append(node('span', 'cr-file', S.afterLabel || ''), node('pre', null, S.after)); box.after(a); }
      c.tabIndex = 0; c.setAttribute('role', 'button'); const go = () => { k = Math.max(k, i + 1); paint(); };
      c.addEventListener('click', go); c.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
      if (i < cards.length - 1) { if ((i + 1) % cols) { const a = node('div', 'cr-arrow', '→'); a.style.gridRow = c.style.gridRow; a.style.gridColumn = String((i % cols) * 2 + 2); a.dataset.after = String(i + 1); grid.append(a); }
        else { const t = node('div', 'cr-turn'); t.style.gridRow = String(Math.floor(i / cols) * 2 + 2); t.style.gridColumn = '1 / -1'; t.dataset.after = String(i + 1); const sv = svg('0 0 1000 40', '<path d="M833 2V18H167V36" /><path class="cr-turn-head" d="M159 28L167 38L175 28" />', 'cr-turn-svg'); sv.setAttribute('preserveAspectRatio', 'none'); t.append(sv); grid.append(t); } } });
    grid.style.gridTemplateColumns = Array.from({ length: cols }, () => 'minmax(0,1fr)').join(' auto ');
    const bar = node('div', 'cr-run' + (R.run && !R.run.out ? ' solo' : ''));
    if (R.run) { const left = node('div', 'cr-run-l'); left.append(node('span', 'cr-run-h', R.run.label || ''), node('code', 'cr-run-cmd', '$ ' + R.run.cmd)); if (R.run.when) left.append(node('p', 'cr-run-when', R.run.when)); bar.append(left);
      if (R.run.out) { const o = node('div', 'cr-code term cr-run-out'); if (R.run.outLabel) o.append(node('span', 'cr-file', R.run.outLabel)); o.append(node('pre', null, R.run.out)); bar.append(o); } }
    const foot = node('p', 'cr-foot', R.foot || '');
    (main.querySelector('.tagline') || grid).after(bar); bar.after(foot);
    const LAST = cards.length + 1;
    const paint = () => { cards.forEach((c, i) => { c.classList.toggle('shown', i < k); c.classList.toggle('now', i === k - 1 && k <= cards.length); });
      grid.querySelectorAll('.cr-arrow,.cr-turn').forEach((a) => a.classList.toggle('shown', k > +a.dataset.after));
      bar.classList.toggle('shown', k >= LAST); foot.classList.toggle('shown', k >= LAST && !!R.foot); };
    paint();
    const next = () => { if (k < LAST) { k++; paint(); return true; } return false; };
    const back = () => { if (k > 0) { k--; paint(); return true; } return false; };
    window.__reveal = next; window.__revealBack = back;
    slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; if (window.__revealBack === back) window.__revealBack = null; });
  }
  if (v.suiteMap && cards.length >= 3) {                         // Jessy Day 5 opt-in: the tests in the project as three boxes (main tests · workshop tests · type check), then the convention line, then a tested example. → opens them one by one
    const M = v.suiteMap; grid.classList.add('sm-grid'); let k = 0;
    cards.forEach((c, i) => { const G = M.groups[i] || {}; c.querySelector('.card-icon')?.remove(); c.classList.add('sm-card', 'sm-' + (G.tone || 'green'));
      const h = c.querySelector('.card-head'); h?.prepend(node('span', 'sm-ico', G.icon || ''));
      const meta = node('div', 'sm-meta'); if (G.count) meta.append(node('b', 'sm-count', G.count)); meta.append(node('span', 'sm-state', G.state || '')); h?.after(meta);
      const where = node('div', 'sm-where'); where.append(node('code', null, G.cmd || ''), node('span', null, G.where || '')); meta.after(where);
      if (G.files) { const t = node('div', 'sm-files'); G.files.forEach(([name, who, n, now, tone]) => { const r = node('div', 'sm-file ' + (tone || '')); r.append(node('span', 'sm-f-name', name), node('span', 'sm-f-who', who), node('span', 'sm-f-n', n), node('span', 'sm-f-now', now || '')); t.append(r); }); where.after(t); }
      if (G.rule) c.append(node('p', 'sm-rule', G.rule));
      c.addEventListener('click', () => { k = Math.max(k, i + 1); paint(); }); });
    const conv = node('div', 'sm-conv'); (M.convention || []).forEach(([when, what], j) => { const p = node('div', 'sm-conv-i'); p.append(node('span', null, when), node('b', null, what)); conv.append(p); if (!j) conv.append(node('span', 'sm-conv-to', '→')); });
    const ex = node('div', 'sm-ex'); if (M.example) { const E = M.example; ex.append(node('span', 'sm-ex-h', E.title || ''));
      const row = node('div', 'sm-ex-row'); [E.left, E.right].forEach((P, j) => { const b = node('div', 'cr-code term ' + (j ? 'sm-bad' : 'sm-good')); b.append(node('span', 'cr-file', P.label), node('pre', null, P.lines.join('\n'))); row.append(b); if (!j) row.append(node('span', 'sm-ex-to', 'but')); });
      ex.append(row); if (E.foot) ex.append(node('p', 'sm-ex-foot', E.foot)); }
    grid.after(conv); conv.after(ex);
    const LAST = cards.length + 2;
    const paint = () => { cards.forEach((c, i) => c.classList.toggle('shown', i < k)); conv.classList.toggle('shown', k > cards.length); ex.classList.toggle('shown', k >= LAST); };
    paint();
    const next = () => { if (k < LAST) { k++; paint(); return true; } return false; };
    const back = () => { if (k > 0) { k--; paint(); return true; } return false; };
    window.__reveal = next; window.__revealBack = back;
    slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; if (window.__revealBack === back) window.__revealBack = null; });
  }
  if (v.previewList) {                                           // Jessy Day 5 opt-in: a checklist preview of the next assignment. Rows start as ☐; → ticks them one by one; each row shows which moment (A Sonny's run / B the tests) and what you should see
    const P = v.previewList; const wrap = node('div', 'pv-wrap'); let k = 0;
    if (P.order) { const o = node('div', 'pv-order'); P.order.forEach(([t, tone], j) => { if (j) o.append(node('span', 'pv-to', '→')); o.append(node('span', 'pv-pill ' + (tone || ''), t)); }); wrap.append(o); }
    const list = node('div', 'pv-list');
    const rows = P.rows.map((Rw, i) => { const r = node('div', 'pv-row'); r.append(node('span', 'pv-box', ''), node('span', 'pv-step', Rw.step || ''));
      const mid = node('div', 'pv-mid'); mid.append(node('span', 'pv-text', Rw.text)); if (Rw.cmd) mid.append(node('code', 'pv-cmd', Rw.cmd)); r.append(mid);
      r.append(node('span', 'pv-moment' + (Rw.moment ? ' cr-m' + Rw.moment.replace(/[^AB]/g, '') : ' none'), Rw.label || (Rw.moment ? 'Moment ' + Rw.moment : (Rw.who || ''))));
      r.append(node('span', 'pv-out ' + (Rw.tone || ''), Rw.out || ''));
      r.addEventListener('click', () => { k = i + 1 > k ? i + 1 : i; paint(); }); list.append(r); return r; });
    wrap.append(list); const foot = P.foot ? node('p', 'pv-foot', P.foot) : null; if (foot) wrap.append(foot);
    if (grid) grid.replaceWith(wrap); else { const tg = main.querySelector('.tagline'); if (tg) tg.before(wrap); else main.append(wrap); }
    const paint = () => { rows.forEach((r, i) => { r.classList.toggle('done', i < k); r.classList.toggle('now', i === k - 1); r.querySelector('.pv-box').textContent = i < k ? '✓' : ''; }); foot?.classList.toggle('shown', k >= rows.length); };
    paint();
    const next = () => { if (k < rows.length) { k++; paint(); return true; } return false; };
    const back = () => { if (k > 0) { k--; paint(); return true; } return false; };
    window.__reveal = next; window.__revealBack = back;
    slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; if (window.__revealBack === back) window.__revealBack = null; });
  }
  if (v.guardRail) {                                             // Jessy Day 5 opt-in: guardrails. The chain alert → Sonny looks → proposes → [guardrail] → a person decides; below, the guardrails with what they stop. → reveals the guardrail, each rail, then the foot
    const G = v.guardRail; const wrap = node('div', 'gr-wrap'); let k = 0; const steps = [];
    if (G.chainTitle) wrap.append(node('div', 'gr-title', G.chainTitle));
    const chain = node('div', 'gr-chain');
    G.chain.forEach(([ico, t, sub], i) => {
      if (i === G.chain.length - 1 && G.gate) { const gate = node('div', 'gr-gate'); gate.append(node('span', 'gr-gate-ico', '🚧'), node('span', 'gr-gate-t', G.gate)); chain.append(gate); steps.push(gate); }
      else if (i) chain.append(node('span', 'gr-to', '→'));
      const b = node('div', 'gr-step' + (i === G.chain.length - 1 && !G.plainChain ? ' human' : '') + ((G.brokenStep === i) ? ' broken' : '')); b.append(node('span', 'gr-ico', ico), node('strong', null, t)); if (sub) b.append(node('span', 'gr-sub', sub)); chain.append(b);
    });
    wrap.append(chain);
    if (G.railsTitle) { const rt = node('div', 'gr-title gr-title-rails', G.railsTitle); wrap.append(rt); steps.push(rt); }
    const rails = node('div', 'gr-rails');
    G.rails.forEach((R) => { const c = node('div', 'gr-rail'); const h = node('div', 'gr-rail-h'); h.append(node('span', 'gr-ico', R.icon), node('strong', null, R.title)); c.append(h);
      if (R.who) { const w = node('div', 'gr-try'); w.append(node('span', 'gr-lab', R.whoLabel || 'Who'), node('span', null, R.who)); c.append(w); }
      const tr = node('div', 'gr-try'); tr.append(node('span', 'gr-lab', R.tryLabel || 'Try'), node('span', null, R.try)); c.append(tr);
      const st = node('div', 'gr-stop'); st.append(node('span', 'gr-x', '✋'), node('span', null, R.stop)); c.append(st);
      const m = node('div', 'gr-meta'); m.append(node('code', null, R.where)); if (R.today) m.append(node('span', 'gr-today', R.today)); c.append(m);
      rails.append(c); steps.push(c); });
    wrap.append(rails);
    if (G.foot) { const f = node('p', 'gr-foot', G.foot); wrap.append(f); steps.push(f); }
    if (grid) grid.replaceWith(wrap); else { const tg = main.querySelector('.tagline'); if (tg) tg.before(wrap); else main.append(wrap); }
    const paint = () => steps.forEach((el, i) => { el.classList.toggle('shown', i < k); el.classList.toggle('now', i === k - 1); });
    steps.forEach((el, i) => el.addEventListener('click', () => { k = Math.max(k, i + 1); paint(); }));
    paint();
    const next = () => { if (k < steps.length) { k++; paint(); return true; } return false; };
    const back = () => { if (k > 0) { k--; paint(); return true; } return false; };
    window.__reveal = next; window.__revealBack = back;
    slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; if (window.__revealBack === back) window.__revealBack = null; });
  }
  if (v.layerStrip) {                                            // Jessy Day 5 opt-in: the four layers (goal, rules, tests, code) as one row above the cards, with who writes each
    const ls = node('div', 'ls-row');
    v.layerStrip.forEach((L, i) => { if (i) ls.append(node('div', 'ls-arrow', '→')); const c = node('div', 'ls-card' + (L.state ? ' ' + L.state : '')); c.style.setProperty('--i', i);
      c.append(node('span', 'ls-phase', L.phase), node('strong', 'ls-name', L.name), node('code', 'ls-file', L.file), node('span', 'ls-who', L.who)); ls.append(c); });
    grid.before(ls);
  }
  if (v.trustMap && cards.length >= 5) {                         // Sonny's map: the slide 3 alert → slide 4's looks and diagnosis → the contract (zoom: five rules on that diagnosis) → you decide; then how he behaves
    const T = v.trustMap; grid.classList.add('trust-map'); let k = 0;
    cards.forEach((c, i) => { c.querySelector('.card-icon')?.remove(); c.classList.add('tm-card', 'tm-' + i); c.prepend(node('span', 'pl-num', String(i + 1))); c.addEventListener('click', () => { k = Math.max(k, i + 1); paint(); }); });
    const put = (i, el) => { const h = cards[i].querySelector('.card-head'); if (h) h.after(el); else cards[i].append(el); };
    const al = node('div', 'wk-alert tm-alert'); al.append(node('span', 'wk-dot'), node('span', 'wk-alert-txt', T.alert)); put(0, al);
    const chips = node('div', 'aj-chips tm-chips'); T.looks.forEach(([ico, txt]) => { const ch = node('div', 'aj-chip'); ch.append(node('span', 'aj-chip-i', ico), node('span', null, txt), node('span', 'aj-tick', '✓')); chips.append(ch); }); put(1, chips);
    const doc = node('div', 'aj-doc tm-doc'); doc.append(node('div', 'aj-doc-tab', T.docName || 'diagnosis'));
    T.doc.forEach(([kk, val, ev]) => { const r = node('div', 'aj-row'); r.append(node('b', null, kk), node('span', null, val)); if (ev) { const evs = node('span', 'aj-evs'); [].concat(ev).forEach((e) => evs.append(node('code', 'aj-ev', e))); r.append(evs); } doc.append(r); }); put(2, doc);
    const mini = node('div', 'tm-mini-rules'); T.rules.forEach(() => mini.append(node('span', 'tm-mini-rule'))); mini.append(node('span', 'tm-mini-txt', T.rules.length + ' rules')); put(3, mini);
    const btns = node('div', 'aj-btns'); btns.append(node('span', 'aj-btn aj-yes', T.yes || 'Approve'), node('span', 'aj-btn aj-no', T.no || 'Reject')); put(4, btns);
    cards.forEach((c, i) => { if (i < cards.length - 1) { if (i === 3 && T.gate) { const g = node('div', 'pl-arrow pl-gate'); g.append(node('span', 'pl-gate-text', T.gate), node('span', 'pl-gate-glyph', '→')); c.after(g); } else c.after(node('div', 'pl-arrow', '→')); } });
    const zoom = node('div', 'tm-zoom'); zoom.append(node('div', 'tm-zoom-h', T.zoomTitle || 'Zoom: the contract'));
    const list = node('div', 'tm-rules'); T.rules.forEach(([txt, ok, note]) => { const r = node('div', 'tm-rule ' + (ok ? 'tm-ok' : 'tm-bad')); r.append(node('span', 'tm-rule-mark', ok ? '✓' : '✗'), node('span', 'tm-rule-txt', txt), node('span', 'tm-rule-note', note || '')); list.append(r); }); zoom.append(list);
    if (T.today) zoom.append(node('p', 'tm-today', T.today));
    grid.after(zoom);
    const beh = node('div', 'tm-behave'); beh.append(node('span', 'tm-behave-h', T.behave.title)); T.behave.items.forEach(([tag, txt]) => { const it = node('span', 'tm-behave-item'); it.append(node('span', 'pl-tag', tag), node('span', null, txt)); beh.append(it); }); zoom.after(beh);
    if (v.plIntro) grid.before(node('p', 'pl-intro', v.plIntro));
    const steps = cards.length + 1;                                // 1–5 = the five steps (the zoom opens with step 4), 6 = how he behaves
    const paint = () => { cards.forEach((c, i) => c.classList.toggle('shown', i < k)); zoom.classList.toggle('shown', k >= 4); beh.classList.toggle('shown', k >= steps); grid.querySelectorAll('.pl-arrow').forEach((a, i) => a.classList.toggle('shown', i < k - 1)); };
    paint();
    const next = () => { if (k < steps) { k++; paint(); return true; } return false; };
    window.__reveal = next; slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; });
  }
  if (v.wakeUp && cards.length >= 3) {                          // 03:45 story: the operator (Aetherbot) wakes up, the screen fills with what is happening, then the question
    const W = v.wakeUp; grid.classList.add('wake-up'); cards.forEach((c, i) => { c.querySelector('.card-icon')?.remove(); c.classList.add('wk-card', 'wk-' + i); });
    const bot = node('div', 'wk-bot');
    bot.innerHTML = `<span class="wk-clock">${W.clock || '03:45'}</span><img class="wk-sleep" src="assets/aetherbot/faces/aetherbot-face-slaperig.webp" alt=""><img class="wk-awake" src="assets/aetherbot/faces/aetherbot-face-verrast.webp" alt=""><span class="wk-z">z<i>z</i><b>z</b></span>`;
    bot.append(node('span', 'wk-tag', W.tag || 'YOU · THE OPERATOR'));
    cards[0].querySelector('.card-head')?.after(bot);
    const scr = node('div', 'wk-screen'); scr.append(node('div', 'wk-bar', W.screen || 'on-call laptop'));
    const al = node('div', 'wk-pop wk-alert'); al.style.setProperty('--i', 0); al.append(node('span', 'wk-dot'), node('span', 'wk-alert-txt', W.alert)); scr.append(al);
    const C = W.chart, ch = node('div', 'wk-pop wk-chart'); ch.style.setProperty('--i', 1);
    ch.innerHTML = `<div class="wk-chart-h"><span>${C.label}</span><b>${C.to}</b></div><svg viewBox="0 0 300 100" aria-hidden="true"><path class="wk-limit" d="M0 72H300"/><text class="wk-limit-t" x="4" y="68">limit ${C.limit}</text><path class="wk-mark" d="M196 4V88"/><text class="wk-mark-t" x="190" y="14" text-anchor="end">${C.mark}</text><path class="wk-line" d="M0 84L40 83L80 84L120 83L160 84L196 83L212 18L240 14L270 16L300 14"/><text class="wk-from" x="4" y="98">before: ${C.from}</text></svg>`;
    scr.append(ch);
    const wd = node('div', 'wk-pop wk-world'); wd.style.setProperty('--i', 2);
    (W.world || []).forEach(([place, time, icon]) => { const z = node('div', 'wk-zone'); z.append(node('span', 'wk-zone-i', icon), node('b', null, place), node('span', null, time)); wd.append(z); });
    scr.append(wd);
    cards[1].querySelector('.card-head')?.after(scr);
    if (W.sonny) {                                              // the on-call agent got the alert too: full-body bot + speech bubble
      const so = node('div', 'wk-sonny'); so.append(node('div', 'wk-bubble', W.sonny.bubble || ''));
      const fig = node('div', 'wk-sonny-fig'); fig.innerHTML = '<img src="assets/aetherbot/aetherbot-think.webp" alt="">'; fig.append(node('span', 'aj-bot-tag', W.sonny.tag || 'ON CALL'));
      so.append(fig); cards[2].querySelector('.card-head')?.after(so);
    }
  }
  if (v.pipeline) {                                             // a row of numbered steps with arrows; each step shows its file and the assignment that builds it
    grid.classList.add('pipeline');
    cards.forEach((c, i) => { const P = v.pipeline[i] || {}; c.classList.add('pl-card'); c.classList.toggle('pl-hl', !!P.hl); c.querySelector('.card-icon')?.remove();
      c.prepend(node('span', 'pl-num', String(i + 1)));
      const meta = node('div', 'pl-meta'); if (P.file) meta.append(node('code', 'pl-file', P.file)); if (P.tag) meta.append(node('span', 'pl-tag', P.tag)); c.append(meta); if (P.warn) c.querySelector('.card-head')?.after(node('div', 'pl-warn', P.warn));
      if (P.have) { const ul = node('div', 'pl-have'); P.have.forEach(([kind, text, tag]) => { const r = node('div', 'pl-have-row pl-' + kind); r.append(node('span', 'pl-have-mark', kind === 'ok' ? '✓' : 'missing')); if (tag) r.append(node('span', 'pl-tag', tag)); r.append(node('span', 'pl-have-text', text)); ul.append(r); }); meta.before(ul); }
      if (i < cards.length - 1) { if (P.gate) { const g = node('div', 'pl-arrow pl-gate'); g.append(node('span', 'pl-gate-text', P.gate), node('span', 'pl-gate-glyph', '→')); c.after(g); } else c.after(node('div', 'pl-arrow', '→')); } });
    if (v.plIntro) grid.before(node('p', 'pl-intro', v.plIntro));
  }
  if (v.filePair && cards.length >= 2) {                        // one file before → after, drawn as an editor: h = heading, gap = empty, new = written, keep = unchanged
    grid.classList.add('file-pair');
    cards.forEach((c, i) => { const F = v.filePair[i]; if (!F) return; c.classList.add('fp-card', i ? 'fp-after' : 'fp-before'); c.querySelector('.card-icon')?.remove();
      const ed = node('div', 'fp-editor'); ed.append(node('div', 'fp-tab', F.file));
      F.lines.forEach(([kind, text, tag]) => { const r = node('div', 'fp-line fp-' + kind); r.append(node('span', 'fp-text', text)); if (tag) r.append(node('span', 'fp-tag', tag)); ed.append(r); });
      c.append(ed); });
    cards[0].after(node('div', 'fp-arrow', '→'));
  }
  if (v.doors && cards.length >= 3) {                           // two ways in (door 1, door 2) → one investigation
    grid.classList.add('doors');
    cards.forEach((c, i) => { const D = v.doors[i]; if (!D) return; c.classList.add('door-card'); c.style.setProperty('--gl', D.color || 'var(--cyan)'); c.querySelector('.card-icon')?.remove();
      const ic = node('div', 'gl-icon'); ic.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${GLOSS_ICONS[D.icon] || ICONS.dot}</svg>`; c.prepend(ic);
      if (D.mini === 'alert') { const m = node('div', 'dm-saved'); const a = node('div', 'wk-alert dm-alert'); a.append(node('span', 'wk-dot'), node('span', 'wk-alert-txt', D.alert || 'ALERT · checkout · 12% · INC-1001')); m.append(a, node('span', 'dm-stamp', D.stamp || 'SAVED · FIXTURE')); if (D.cmd) m.append(node('code', 'dm-cmd', D.cmd)); c.querySelector('.card-head')?.after(m); }
      if (D.mini === 'shop') { const m = node('div', 'dm-shop'); (D.flow || []).forEach(([ico, txt, kind], j) => { if (j) m.append(node('span', 'dm-arrow', '→')); const st = node('span', 'dm-step' + (kind ? ' dm-' + kind : '')); st.append(node('span', 'dm-ico', ico), node('span', null, txt)); m.append(st); }); c.querySelector('.card-head')?.after(m); }
      if (D.bot) { const f = node('div', 'dm-bot'); f.innerHTML = '<img src="assets/aetherbot/aetherbot-think.webp" alt="">'; f.append(node('span', 'aj-bot-tag', D.bot === true ? 'SONNY' : D.bot)); c.querySelector('.card-head')?.after(f); }
      const meta = node('div', 'door-meta'); if (D.when) meta.append(node('span', 'gl-eg', D.when)); if (D.file) meta.append(node('code', 'door-file', D.file)); c.append(meta); });
    const arrows = node('div', 'door-arrows'); arrows.innerHTML = '<span>→</span><span>→</span>'; cards[1].after(arrows);
  }
  if (v.glossary) {                                             // definitions: big icon, term, plain meaning, one real example
    grid.classList.add('glossary'); if (v.glossCols) grid.style.setProperty('--gl-cols', v.glossCols);
    cards.forEach((c, i) => { const g = v.glossary[i]; if (!g) return; c.classList.add('gl-card'); c.style.setProperty('--gl', g.color || 'var(--cyan)');
      c.querySelector('.card-icon')?.remove();
      const ic = node('div', 'gl-icon'); ic.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${GLOSS_ICONS[g.icon] || ICONS.dot}</svg>`; c.prepend(ic);
      if (g.eg) c.append(node('span', 'gl-eg', g.eg)); });
  }
  if (v.art === 'flow' && cards.length >= 3) {                  // 9: input + context -> model -> output
    grid.classList.add('flow'); const left = node('div', 'flow-in'); left.append(cards[0], cards[1]);
    const slot = node('div', 'flow-bot'); cards[2].classList.add('flow-out');
    grid.replaceChildren(left, node('span', 'flow-arrow a1'), slot, node('span', 'flow-arrow a2'), cards[2]); x.slot = slot;
  }
  if (v.art === 'window') {                                    // 10: the context window fills up, noise distracts
    main.classList.add('with-window'); const win = node('div', 'ctxwin'); const box = node('div', 'ctxwin-box');
    const kinds = 'gggggggngnnn'; [...kinds].forEach((k, i) => { const t = node('span', 'tok tok-' + k); t.style.setProperty('--i', i); t.style.gridRow = String(3 - Math.floor(i / 4)); t.style.gridColumn = String(i % 4 + 1); if ([5, 8].includes(i)) t.classList.add('tok-dim'); box.append(t); });
    const meter = node('div', 'ctxwin-meter'); meter.append(node('span', 'ctxwin-fill'));
    win.append(box, meter); grid.after(win);
  }
  if (v.reveal === 'click') {                                  // 12: cards open one by one, so the room answers first
    grid.classList.add('reveal-grid'); let reacted = null;
    const open = i => { const c = cards[i]; if (!c || !c.classList.contains('closed')) return false; c.classList.remove('closed'); c.setAttribute('aria-hidden', 'false'); x.react?.(i); return true; };
    if (v.answers) grid.classList.add('qa');                    // quiz: the question shows, only the answer is covered
    cards.forEach((c, i) => {
      c.classList.add('closed'); if (!v.answers) c.setAttribute('aria-hidden', 'true');
      const cover = node('span', 'card-cover', v.answers ? '?' : v.covers ? (v.covers[i] || '') : String(i + 1));
      if (v.answers) { const ans = node('div', 'qa-answer'); ans.append(c.lastElementChild, cover); c.append(ans); } else c.append(cover);
      c.addEventListener('click', () => open(i));
    });
    const next = () => open(cards.findIndex(c => c.classList.contains('closed')));
    const ctrl = node('div', 'widget-controls reveal-controls'); const b1 = node('button', null, 'Reveal next →'); b1.addEventListener('click', next);
    const b2 = node('button', 'secondary', 'Show all'); b2.addEventListener('click', () => cards.forEach((c, i) => open(i)));
    ctrl.append(b1, b2); if (v.buttons) grid.after(ctrl); window.__reveal = next; slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; });
    x.slot = grid;
  }
  if (v.quiz) {                                                  // 14: vote first, then wrong answers drop out
    main.classList.add('narrow'); const order = cards.map((c, i) => i).filter(i => i !== v.quiz.answer); let k = 0;
    const next = () => {
      if (k < order.length) { cards[order[k++]].classList.add('quiz-out'); return true; }
      if (k === order.length) { k++; cards[v.quiz.answer].classList.add('quiz-right'); x.pointer?.classList.add('show'); return true; }
      return false;
    };
    cards.forEach(c => c.addEventListener('click', next)); window.__reveal = next;
    slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; });
  }
  if (v.spotlight != null && cards[v.spotlight]) {               // 16: land on one card
    main.classList.add('narrow', 'spot'); cards[v.spotlight].classList.add('spot-on');
  }
  if (v.pairs) {                                                 // 17: rows come in as pairs, one per click / →
    const cmp = main.querySelector('.compare'); const cols = s.columns || [];
    const g = node('div', 'pairs'); g.append(node('h2', 'pair-head', cols[0]?.title || ''), node('span'), node('h2', 'pair-head', cols[1]?.title || ''));
    const rows = []; const n = Math.max(cols[0]?.items.length || 0, cols[1]?.items.length || 0);
    for (let i = 0; i < n; i++) { const l = node('div', 'pair-l', cols[0].items[i] || ''), m = node('span', 'pair-link'), r = node('div', 'pair-r', cols[1].items[i] || ''); [l, m, r].forEach(e => e.classList.add('pending')); g.append(l, m, r); rows.push([l, m, r]); }
    cmp?.replaceWith(g); let k = 0;
    const next = () => { if (k >= rows.length) return false; rows[k++].forEach(e => e.classList.remove('pending')); return true; };
    g.addEventListener('click', next); window.__reveal = next;
    slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; });
  }
  if (v.countdown) {                                             // pauses: countdown waits for ▶, keeps time across slides, shows the real return time
    const box = ALSTimer.mount({ key: ALSTimer.key(current, s.title), defaultSec: v.countdown * 60, back: true, boxCls: 'pause-box', faceCls: 'pause-clock', lateCls: 'late', signal: slideController.signal });
    if (s.cards?.[0]?.body) box.append(node('p', 'pause-next', s.cards[0].body));
    grid.replaceWith(box);
  }
  if (v.term) {                                                  // 20: a terminal that types a few commands, then asks
    main.classList.add('with-window'); const t = node('div', 'term'); const bar = node('div', 'term-bar'); bar.append(node('i'), node('i'), node('i')); t.append(bar);
    const body = node('div', 'term-body'); v.term.forEach((ln, i) => { const row = node('div', 'term-line ' + (ln.c ? 'cmd' : ln.ask ? 'ask' : 'out')); row.style.setProperty('--i', i);
      if (ln.c) { row.append(node('span', 'prompt-sign', '$ ')); const ty = node('span', 'typed', ln.c); ty.style.setProperty('--n', ln.c.length); row.append(ty); } else row.textContent = ln.o || ln.ask; body.append(row); });
    t.append(body); grid.after(t);
  }
  if (v.tour) {                                                  // tour: a Claude Code screen; each click shows one card and lights up its part
    const wrap = node('div', 'tour'); const t = node('div', 'term tour-screen'); t.setAttribute('aria-hidden', 'true');
    const bar = node('div', 'term-bar'); bar.append(node('i'), node('i'), node('i'), node('span', 'term-title', v.tour.title || 'claude')); t.append(bar);
    const body = node('div', 'term-body'); const lines = v.tour.screen.map(ln => { const row = node('div', 'tl tl-' + (ln.k || 'out'), ln.t); body.append(row); return [row, ln.n || []]; });
    t.append(body); grid.before(wrap); wrap.append(t, grid);
    const light = i => lines.forEach(([row, ns]) => row.classList.toggle('on', ns.includes(i + 1)));
    cards.forEach((c, i) => { c.prepend(node('span', 'tour-n', String(i + 1))); c.classList.add('pending'); c.addEventListener('click', e => { if (!c.classList.contains('pending')) { e.stopPropagation(); light(i); } }); });
    let k = 0; const next = () => { if (k >= cards.length) return false; cards[k].classList.remove('pending'); light(k); announce(cards[k].textContent); k++; return true; };
    t.addEventListener('click', next); window.__reveal = next;
    slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; });
  }
  if (v.art === 'gate') {                                        // 21: explore -> plan -> (gate) -> change
    const route = node('div', 'route'); const st = (ico, label, cls) => { const d = node('div', 'station ' + (cls || '')); d.append(node('span', 'st-ico', ico), node('span', 'st-label', label)); return d; };
    const gate = node('div', 'station gate'); gate.append(node('span', 'bar'), node('span', 'st-label', v.gateLabel || 'your approval'));
    route.append(st('🔍', 'Explore', 's1'), node('span', 'rt-line l1'), st('📋', 'Plan', 's2'), node('span', 'rt-line l2'), gate, node('span', 'rt-line l3'), st('✏️', 'Change', 's4'));
    (main.querySelector('.tagline') || grid).before(route); let open = false;
    const next = () => { if (open) return false; open = true; route.classList.add('open'); return true; };
    route.addEventListener('click', next); window.__reveal = next; slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; });
  }
  if (v.art === 'prompt' && s.prompt) {                          // 22: the demo prompt, typed; B = plan B (captured output)
    const t = node('div', 'term term-wide'); const bar = node('div', 'term-bar'); bar.append(node('i'), node('i'), node('i'), node('span', 'term-title', 'claude'));
    const body = node('div', 'term-body'); const pre = node('div', 'term-prompt'); pre.append(node('span', 'prompt-sign', '> '));
    const txt = node('span', 'tp-text', s.prompt); pre.append(txt); body.append(pre); t.append(bar, body); grid.replaceWith(t);
    (v.promptMarks || []).forEach(m => { const w = document.createTreeWalker(txt, NodeFilter.SHOW_TEXT); for (let n = w.nextNode(); n; n = w.nextNode()) { const i = n.nodeValue.indexOf(m); if (i < 0) continue; const mid = n.splitText(i); mid.splitText(m.length); const sp = node('span', 'hl hl-orange'); mid.replaceWith(sp); sp.append(mid); break; } });
    if (window.DEMO_FALLBACK) {
      const panel = node('div', 'planb'); const head = node('div', 'planb-head'); head.append(node('strong', null, 'Plan B'), node('span', null, ' · captured run of this exact prompt · press B to close'));
      panel.append(head, node('pre', 'planb-body', window.DEMO_FALLBACK)); stage.append(panel);
      const tog = () => panel.classList.toggle('show'); window.__planB = tog;
      slideController.signal.addEventListener('abort', () => { if (window.__planB === tog) window.__planB = null; });
    }
  }
  if (v.stepKeys) {                                             // steps without buttons: → activates the next step
    const items = [...main.querySelectorAll('.step-item')]; const ctrl = main.querySelector('.steps-wrap .widget-controls'); if (ctrl) ctrl.style.display = 'none';
    if (v.humanStep != null && items[v.humanStep]) { items[v.humanStep].classList.add('human'); items[v.humanStep].querySelector('.step-circle').textContent = '👤'; }
    const next = () => { const a = items.findIndex(li => li.classList.contains('active')); if (a >= items.length - 1) return false; items[a + 1].querySelector('button').click(); return true; };
    window.__reveal = next; slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; });
    x.steps = items;
  }
  if (v.reach && x.steps) {                                      // 25: AetherBOT's arm telescopes to the active step
    const wrap = main.querySelector('.steps-wrap'); wrap.classList.add('has-reach');
    const r = node('div', 'reach'); r.setAttribute('aria-hidden', 'true');
    const body = document.createElement('img'); body.src = 'assets/aetherbot/stretch/arm-body.webp'; body.className = 'reach-body'; body.alt = '';
    const tube = node('span', 'reach-tube'); const hand = document.createElement('img'); hand.src = 'assets/aetherbot/stretch/arm-hand.webp'; hand.className = 'reach-hand'; hand.alt = '';
    r.append(body, tube, hand); stage.append(r);
    const H = 200, k = H / 551;
    const place = () => {
      const first = rel(x.steps[0].querySelector('.step-circle'), stage);
      const left = first.x - 300 * k - 26, top = first.y + first.h / 2 - 22 - 280 * k;
      r.style.left = left + 'px'; r.style.top = top + 'px'; r.style.height = H + 'px';
      const a = x.steps.findIndex(li => li.classList.contains('active'));
      const tipX = a < 0 ? left + 300 * k + 10 : rel(x.steps[a].querySelector('.step-circle'), stage).x + 14;
      const w = Math.max(0, tipX - (left + 300 * k) - 150 * k); tube.style.width = w + 'px'; hand.style.setProperty('--tube', w + 'px');
    };
    r.style.setProperty('--k', k); requestAnimationFrame(() => requestAnimationFrame(place));
    const mo = new MutationObserver(place); x.steps.forEach(li => mo.observe(li, { attributes: true, attributeFilter: ['class'] }));
    slideController.signal.addEventListener('abort', () => mo.disconnect()); window.addEventListener('resize', place, { signal: slideController.signal });
  }
  if (v.art === 'loop' && x.steps) {                             // 26: the agent loop as a circle
    const chain = main.querySelector('.steps-chain'); chain.classList.add('nest-hidden');
    const labels = (s.items || []).map(i => i.label); const box = node('div', 'loop');
    const pos = [[50, 4], [92, 50], [50, 96], [8, 50]];
    const ring = svg('0 0 400 400', '<defs><marker id="lp-ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>' +
      [[200, 16, 384, 200], [384, 200, 200, 384], [200, 384, 16, 200], [16, 200, 200, 16]].map((p, i) => '<path class="lp-arc lp-arc' + i + '" marker-end="url(#lp-ar)" d="M' + p[0] + ' ' + p[1] + ' A184 184 0 0 1 ' + p[2] + ' ' + p[3] + '"/>').join(''), 'loop-ring');
    box.append(ring);
    labels.slice(0, 4).forEach((l, i) => { const n = node('span', 'lp-node', l); n.style.left = pos[i][0] + '%'; n.style.top = pos[i][1] + '%'; n.style.setProperty('--i', i); box.append(n); });
    const mid = node('div', 'lp-mid'); mid.append(node('span', 'lp-mid-ico', '↻ ■'), node('span', 'lp-mid-label', labels[4] || '')); box.append(mid);
    const orb = node('div', 'lp-orbit'); const head = document.createElement('img'); head.src = BOTS.head.src; head.alt = ''; orb.append(head); box.append(orb);
    if (v.loopCaptions) box.classList.add('show-cap'); chain.after(box); const nodes = [...box.querySelectorAll('.lp-node'), mid];
    const sync = () => x.steps.forEach((li, i) => nodes[i]?.classList.toggle('on', li.classList.contains('active')));
    const mo = new MutationObserver(sync); x.steps.forEach(li => mo.observe(li, { attributes: true, attributeFilter: ['class'] }));
    nodes.forEach((n, i) => n.addEventListener('click', () => x.steps[i].querySelector('button').click()));
    slideController.signal.addEventListener('abort', () => mo.disconnect());
  }
  if (v.art === 'boxes') {                                       // 27: SDLC ⊃ working method ⊃ agent loop, zoom in per →
    const cmp = main.querySelector('.compare'); const cols = s.columns || [];
    const mk = (c, i) => { const b = node('div', 'nb nb' + i); const h = node('div', 'nb-head'); h.append(node('span', 'nb-title', c.title));
      const row = node('div', 'nb-items'); c.items.forEach(t => { const it = node('span', 'nb-item', t); if ((v.link?.[i] || []).includes(t)) it.classList.add('nb-link'); row.append(it); }); h.append(row); b.append(h); return b; };
    const b0 = mk(cols[0], 0), b1 = mk(cols[1], 1), b2 = mk(cols[2], 2); b1.append(b2); b0.append(b1); cmp?.replaceWith(b0);
    let k = 0; const steps = [() => b1.classList.add('in'), () => b2.classList.add('in'), () => b0.classList.add('linked')];
    const next = () => { if (k >= steps.length) return false; steps[k++](); return true; };
    b0.addEventListener('click', next); window.__reveal = next; slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; });
  }
  if (v.stack) {                                                 // 29: the library stacks up block by block
    grid.classList.add('stack'); cards.forEach((c, i) => { if (v.stack[i]) c.querySelector('.card-head').append(node('span', 'stack-tag', v.stack[i])); });
    x.slot = node('div', 'stack-row'); grid.replaceWith(x.slot); x.slot.append(grid);
  }
  if (v.cmdCards) { main.classList.add('compact');               // 30: command cards look and type like a terminal
    v.cmdCards.forEach(ci => { const c = cards[ci]; if (!c) return; c.classList.add('cmd-card'); const p = c.querySelector('p'); const box = node('div', 'cmd-lines');
      String(s.cards[ci].body).split('\n').forEach((ln, i) => { const isCmd = !/[:.]$/.test(ln.trim()) || /^https?:/.test(ln.trim()); const row = node('div', isCmd ? 'cmd-l' : 'cmd-note');
        row.style.setProperty('--d', (0.5 + ci * 0.9 + i * 0.35) + 's'); if (isCmd) row.append(node('span', 'prompt-sign', '$ '), node('span', null, ln)); else row.textContent = ln; box.append(row); });
      p?.replaceWith(box); });
  }
  if (v.code != null && cards[v.code]) {                      // card body as a code block (e.g. a settings.json), indentation kept
    const pre = node('pre', 'code-block', s.cards[v.code].body); cards[v.code].querySelector('p')?.replaceWith(pre); cards[v.code].classList.add('code-card');
  }
  if (v.browser != null && cards[v.browser]) {                  // 30: a tiny browser with the starting state
    const b = node('div', 'mini-browser'); const bar = node('div', 'mb-bar'); bar.append(node('i'), node('i'), node('i'), node('span', 'mb-url', 'localhost:3000'));
    const tabs = node('div', 'mb-tabs'); ['Profiles', 'Glossary', 'Library', 'Game'].forEach((t, i) => { const d = node('div', 'mb-tab' + (i === 3 ? ' live' : '')); d.append(node('span', 'mb-name', t), node('span', 'mb-body')); tabs.append(d); });
    b.append(bar, tabs); cards[v.browser].append(b);
  }
  if (v.lineReveal != null && cards[v.lineReveal]) {            // 32: review questions one per →
    const c = cards[v.lineReveal]; const ul = node('ol', 'q-list'); String(s.cards[v.lineReveal].body).split('\n').forEach((t, i) => { const li = node('li', null, t); li.style.setProperty('--i', i); ul.append(li); });
    c.querySelector('p')?.replaceWith(ul);
  }
  if (v.stamps) {                                                // 32: decision stamps, click one
    const row = node('div', 'stamps'); row.append(node('span', 'stamps-label', 'Decision'));
    v.stamps.forEach((w, i) => { const wrap = node('span', 'stamp-wrap'); const b = node('button', 'stamp-btn st-' + w.toLowerCase(), w); b.style.setProperty('--i', i);
      b.addEventListener('click', () => { row.querySelectorAll('.stamp-btn').forEach(x => x.classList.toggle('picked', x === b)); row.classList.add('has-pick'); }); wrap.append(b); row.append(wrap); x.aim.push(wrap); });
    grid.after(row); x.stampRow = row; main.classList.add('has-stamps'); const stampBox = node('div', 'stamp-box'); row.before(stampBox); stampBox.append(row);
  }
  if (v.badge != null && cards[v.badge]) {                      // 33: "Include" as an empty profile badge
    const c = cards[v.badge]; c.classList.add('badge-card'); const bd = node('div', 'badge'); const av = node('div', 'badge-av', '?'); const rows = node('div', 'badge-rows');
    String(s.cards[v.badge].body).split('\n').forEach((t, i) => { const r = node('div', 'badge-row'); r.style.setProperty('--i', i); r.append(node('span', 'badge-k', t), node('span', 'badge-line')); rows.append(r); });
    bd.append(av, rows); c.querySelector('p')?.replaceWith(bd);
  }
  if (v.swap) {                                                  // 34: two AetherBOTs swap their work
    const sw = node('div', 'swap'); sw.setAttribute('aria-hidden', 'true');
    ['sw-a', 'sw-b'].forEach(c => { const im = document.createElement('img'); im.src = BOTS.head.src; im.alt = ''; im.className = c; sw.append(im); });
    sw.append(node('span', 'pkt pkt-ab'), node('span', 'pkt pkt-ba'));
    if (x.stampRow) { x.stampRow.classList.add('with-swap'); x.stampRow.querySelector('.stamps-label').after(sw); } else { main.classList.add('has-swap'); grid.after(sw); }
  }
  if (v.template != null && cards[v.template]) {                // 36/37: an empty card template (term/definition, concept card)
    const c = cards[v.template]; const lines = v.templateRows || String(s.cards[v.template].body).split('\n'); const t = node('div', 'tpl' + (lines.length > 3 ? ' tpl-grid' : ''));
    lines.forEach((l, i) => { const r = node('div', 'tpl-row'); r.style.setProperty('--i', i); r.append(node('span', 'tpl-k', l), node('span', 'tpl-line'), node('span', 'tpl-line short')); t.append(r); });
    if (v.templateRows) c.append(t); else c.querySelector('p')?.replaceWith(t);
  }
  if (v.notebook != null && cards[v.notebook]) {                // 39: the learning note as a notebook page
    const c = cards[v.notebook]; c.classList.add('notebook'); const ul = node('ul', 'nb-lines');
    String(s.cards[v.notebook].body).split('\n').forEach((t, i) => { const li = node('li', null, t); li.style.setProperty('--i', i); ul.append(li); }); c.querySelector('p')?.replaceWith(ul);
  }
  if (v.quietTimer) {                                            // 39: a quiet countdown without "Back at", waits for ▶
    main.classList.add('has-quiet');
    const box = ALSTimer.mount({ key: ALSTimer.key(current, s.title), defaultSec: v.quietTimer * 60, boxCls: 'pause-box quiet', faceCls: 'pause-clock', lateCls: 'late', lateAt: 30, prefix: node('span', 'quiet-ico', '✍'), signal: slideController.signal });
    grid.after(box);
  }
  if (v.badges) {                                               // 40: achievements unlocking one by one
    grid.classList.add('badges'); main.classList.add('side-grid');
    cards.forEach((c, i) => { c.classList.add('badge-tile'); c.style.setProperty('--i', i); const ic = node('span', 'badge-ico', v.badges[i] || '★'); c.prepend(ic); c.querySelector('p')?.remove(); });
    x.aside = main;
  }
  if (v.dayRoute) {                                              // 41: the shape of the day
    const stops = v.dayRoute, perRow = stops.length > 8 ? Math.ceil(stops.length / 2) : stops.length;   // >8 stops: two rows, numbering continues
    const rows = []; for (let s = 0; s < stops.length; s += perRow) {
      const r = node('div', 'day-route'); r.style.setProperty('--n', Math.min(perRow, stops.length - s));
      stops.slice(s, s + perRow).forEach((t, k) => { const i = s + k, st = node('div', 'dr-stop'); st.style.setProperty('--i', i); st.append(node('span', 'dr-dot', String(i + 1)), node('span', 'dr-label', t)); r.append(st); });
      rows.push(r);
    }
    (main.querySelector('.tagline') || grid).after(...rows);
  }
  if (v.art === 'stairs' && x.steps) {                           // 43: levels as a staircase
    const chain = main.querySelector('.steps-chain'); chain.classList.add('nest-hidden'); const st = node('div', 'stairs');
    (s.items || []).forEach((it, i) => { const b = node('div', 'stair' + ((v.today || []).includes(i) ? ' today' : '')); b.style.setProperty('--i', i);
      const top = node('div', 'stair-top'); top.append(node('span', 'stair-n', String(i + 1)), node('span', 'stair-label', it.label)); if ((v.today || []).includes(i)) top.append(node('span', 'stair-tag', 'today'));
      b.append(top, node('span', 'stair-cap', it.caption || '')); b.addEventListener('click', () => x.steps[i].querySelector('button').click()); st.append(b); });
    chain.after(st); const bl = [...st.children];
    const sync = () => x.steps.forEach((li, i) => bl[i].classList.toggle('on', li.classList.contains('active')));
    const mo = new MutationObserver(sync); x.steps.forEach(li => mo.observe(li, { attributes: true, attributeFilter: ['class'] })); slideController.signal.addEventListener('abort', () => mo.disconnect());
  }
  if (v.art === 'intake') {                                      // 44: every source of context flows into the model
    main.classList.add('intake'); grid.classList.add('intake-cards'); cards.forEach((c, i) => { c.style.setProperty('--i', i); c.append(node('span', 'intake-arrow')); if (v.tags?.[i]) c.querySelector('.card-head').append(node('span', 'stack-tag', v.tags[i])); });
    x.aside = main;
  }
  if (v.map) {                                                   // where everything lives: folders it reads -> Claude Code -> MCP out
    const M = v.map; const m = node('div', 'cmap');
    const box = (b, cls) => { const d = node('div', 'cmap-box cmap-step' + (cls ? ' ' + cls : '')); const h = node('div', 'cmap-head'); h.append(node('span', 'cmap-name', b.name), node('span', 'cmap-where', b.where)); d.append(h);
      (b.rows || []).forEach(r => { const row = node('div', 'cmap-row'); row.append(node('span', 'cmap-file', r[0]), node('span', 'cmap-what', r[1]), node('span', r[2] ? 'cmap-tag' : '', r[2] || '')); d.append(row); });
      if (b.chips) { const c = node('div', 'cmap-chips'); b.chips.forEach(t => { const k = node('span', 'cmap-chip', t[0]); if (t[1]) k.append(node('small', null, t[1])); c.append(k); }); d.append(c); }
      if (b.note) d.append(node('p', 'cmap-note', b.note)); return d; };
    const arrow = t => { const a = node('div', 'cmap-arrow'); a.append(node('span', 'cmap-line'), node('span', 'cmap-label', t)); return a; };
    const left = node('div', 'cmap-col'); (M.left || []).forEach(b => left.append(box(b)));
    if (M.tree) { const t = node('div', 'cmap-box cmap-tree'); const r0 = node('div', 'ctree-row ctree-root'); r0.append(node('span', 'ctree-name', M.tree.root), node('span', 'ctree-note', M.tree.rootNote)); t.append(r0);
      M.tree.groups.forEach(g => { const grp = node('div', 'ctree-group cmap-step'); g.forEach(([pre, name, note, dir, dim]) => { const r = node('div', 'ctree-row' + (dir ? ' ctree-dir' : '') + (dim ? ' ctree-dim' : '')); const nm = node('span', 'ctree-name'); nm.append(node('span', 'ctree-pre', pre), name); r.append(nm, node('span', 'ctree-note', '← ' + note)); grp.append(r); }); t.append(grp); });
      left.append(t); }
    const core = node('div', 'cmap-core cmap-step'); const im = document.createElement('img'); im.src = BOTS.head.src; im.alt = ''; core.append(im, node('strong', null, M.center), node('span', 'cmap-where', M.centerSub || ''));
    const mid = node('div', 'cmap-mid'); mid.append(arrow(M.inLabel || ''), core); if (M.right) mid.append(arrow(M.outLabel || ''));
    m.append(left, mid); if (M.right) { const right = node('div', 'cmap-col'); M.right.forEach(b => right.append(box(b))); m.append(right); } else m.classList.add('cmap-two'); if (M.apart) { const ap = box(M.apart, 'cmap-apart'); m.append(ap); }
    const tg = main.querySelector('.tagline'); if (grid) grid.replaceWith(m); else if (tg) tg.before(m); else main.append(m);
  }
  if (v.docPair) {                                               // two project files: where they live, what each says, when Claude reads them
    const D = v.docPair; const w = node('div', 'dpair');
    const tree = node('div', 'cmap-box cmap-tree dp-tree dp-step'); const r0 = node('div', 'ctree-row ctree-root'); r0.append(node('span', 'ctree-name', D.tree.root), node('span', 'ctree-note', D.tree.rootNote)); tree.append(r0);
    D.tree.rows.forEach(([pre, name, note, hl]) => { const r = node('div', 'ctree-row' + (hl ? ' dp-hl dp-hl-' + hl : '')); const nm = node('span', 'ctree-name'); nm.append(node('span', 'ctree-pre', pre), name); r.append(nm, node('span', 'ctree-note', '← ' + note)); tree.append(r); });
    const tone = (d, i) => d.tone === 'what' ? 1 : d.tone === 'why' ? 0 : i;
    const doc = (d, i) => { const c = node('div', 'dp-doc dp-step dp-doc-' + tone(d, i)); const h = node('div', 'dp-dhead'); h.append(node('span', 'dp-dname', d.name), node('span', 'dp-badge', d.badge)); c.append(h, node('p', 'dp-ask', d.ask));
      const f = node('div', 'dp-file'); d.lines.forEach(l => f.append(node('span', 'dp-line' + (/^#/.test(l) ? ' dp-h' : ''), l))); c.append(f);
      const facts = node('ul', 'dp-facts'); d.facts.forEach(t => facts.append(node('li', null, t))); c.append(facts); return c; };
    const link = node('div', 'dp-link dp-step'); link.append(node('span', 'cmap-line'), node('span', 'cmap-label', D.link));
    const pair = node('div', 'dp-docs' + (D.docs.length === 1 ? ' dp-docs-one' : '')); if (D.docs.length === 1) pair.append(doc(D.docs[0], 0)); else pair.append(doc(D.docs[0], 0), link, doc(D.docs[1], 1));
    const when = node('div', 'dp-whenbox dp-step'); when.append(node('span', 'dp-label', D.whenTitle));
    const cols = node('div', 'dp-wcols' + (D.docs.length === 1 ? ' dp-wcols-one' : '')); D.docs.forEach((d, i) => { const col = node('div', 'dp-wcol dp-doc-' + tone(d, i)); const hd = node('div', 'dp-whead'); hd.append(node('span', 'dp-exfile', d.name)); col.append(hd);
      const ul = node('ul', 'dp-wlist'); d.when.forEach(t => ul.append(node('li', null, t))); col.append(ul);
      const ex = node('div', 'dp-ex'); ex.append(node('span', 'dp-bubble', d.example)); col.append(ex); cols.append(col); }); when.append(cols);
    const right = node('div', 'dp-right'); right.append(pair, when);
    w.append(tree, right);
    if (D.work) { const wk = node('div', 'dp-work dp-step'); wk.append(node('span', 'dp-label', 'At work')); D.work.forEach(t => wk.append(node('span', 'dp-wk', t))); w.append(wk); }
    const tg = main.querySelector('.tagline'); if (grid) grid.replaceWith(w); else if (tg) tg.before(w); else main.append(w);
  }
  if (v.specDoc) {                                               // spec.md: where it lives, what it is, what it's for, what it means for the skills
    const D = v.specDoc; const w = node('div', 'spdoc');
    const tree = node('div', 'cmap-box cmap-tree dp-tree sp-step'); const r0 = node('div', 'ctree-row ctree-root'); r0.append(node('span', 'ctree-name', D.tree.root), node('span', 'ctree-note', D.tree.rootNote)); tree.append(r0);
    D.tree.rows.forEach(([pre, name, note, hl]) => { const r = node('div', 'ctree-row' + (hl ? ' dp-hl dp-hl-' + hl : '')); const nm = node('span', 'ctree-name'); nm.append(node('span', 'ctree-pre', pre), name); r.append(nm, node('span', 'ctree-note', '← ' + note)); tree.append(r); });
    const right = node('div', 'sp-right');
    const sec = (n, head, cls) => { const b = node('section', 'sp-sec sp-step ' + cls); const h = node('div', 'sp-head'); h.append(node('span', 'sp-n', String(n)), node('strong', null, head)); b.append(h); right.append(b); return b; };
    const a = sec(1, D.what.head, 'sp-what'); const row1 = node('div', 'sp-row'); const f = node('div', 'dp-file sp-file'); f.append(node('span', 'sp-fname', 'spec.md'));
    D.what.lines.forEach(l => f.append(node('span', 'dp-line' + (/^#/.test(l) ? ' dp-h' : ''), l))); row1.append(f, node('p', 'sp-text', D.what.text)); a.append(row1);
    const b = sec(2, D.why.head, 'sp-why'); const row2 = node('div', 'sp-pair'); const iq = node('div', 'sp-box sp-intent'); iq.append(node('span', 'sp-bname', 'intent.md'), node('span', 'sp-quote', D.why.intent));
    const sq = node('div', 'sp-box sp-spec'); sq.append(node('span', 'sp-bname', 'spec.md')); D.why.spec.forEach(t => sq.append(node('span', 'sp-num', t)));
    row2.append(iq, node('span', 'sp-arrow', '→'), sq); b.append(row2, node('p', 'sp-cap', D.why.text));
    const c = sec(3, D.skills.head, 'sp-skills'); const row3 = node('div', 'sp-flow'); const sk = node('div', 'sp-chips'); D.skills.names.forEach(t => sk.append(node('span', 'sp-chip', t)));
    const tgt = node('span', 'sp-target', 'spec.md'); row3.append(sk, node('span', 'sp-arrow sp-small', D.skills.verb), tgt); c.append(row3, node('p', 'sp-cap', D.skills.text));
    w.append(tree, right);
    if (D.work) { const wk = node('div', 'dp-work sp-step'); wk.append(node('span', 'dp-label', 'At work')); D.work.forEach(t => wk.append(node('span', 'dp-wk', t))); w.append(wk); }
    const tg = main.querySelector('.tagline'); if (grid) grid.replaceWith(w); else if (tg) tg.before(w); else main.append(w);
  }
  if (v.orchestra) {                                             // a workflow conducts skills, a test and a subagent: the ladder on the left, the run on the right
    const D = v.orchestra; const w = node('div', 'orch');
    const lad = node('div', 'or-ladder or-step'); lad.append(node('span', 'dp-label', D.ladder.title));
    D.ladder.rungs.forEach((R, i) => { const r = node('div', 'or-rung' + (R.hl ? ' or-hl' : '')); r.append(node('span', 'or-rn', String(i + 1)), node('strong', null, R.name), node('span', null, R.text)); lad.append(r); });
    if (D.front) { const f = node('div', 'pp-code or-front'); f.append(node('span', 'or-fname', D.front.name)); D.front.lines.forEach(l => f.append(node('span', 'pp-line' + (l.hl ? ' pp-hl' : ''), l.t))); lad.append(f); }
    const flow = node('div', 'or-flow or-step'); flow.append(node('span', 'dp-label', D.flow.title));
    const down = () => node('span', 'or-down', '↓');
    D.flow.steps.forEach((St, i) => { if (i) flow.append(down()); const b = node('div', 'or-box or-' + St.kind);
      if (St.label) b.append(node('span', 'or-tag', St.label)); if (St.title) b.append(node('strong', 'or-title', St.title));
      if (St.chips) { const row = node('div', 'or-chips'); St.chips.forEach((c, k) => { if (k) row.append(node('span', 'or-to', '→')); row.append(node('span', 'or-chip', c)); }); b.append(row); }
      if (St.split) { const sp = node('div', 'or-split'); St.split.forEach(x => { const o = node('div', 'or-out or-' + x.kind); o.append(node('strong', null, x.title), node('span', null, x.text)); sp.append(o); }); b.append(sp); }
      if (St.text) b.append(node('span', 'or-text', St.text)); flow.append(b); });
    w.append(lad, flow);
    const tg = main.querySelector('.tagline'); if (grid) grid.replaceWith(w); else if (tg) tg.before(w); else main.append(w);
  }
  if (v.projMap) {                                               // the project folder: what came on Day 1, this morning, and what comes this afternoon
    const D = v.projMap; const w = node('div', 'pmap');
    const tree = node('div', 'cmap-box cmap-tree pm-tree pm-step'); const r0 = node('div', 'ctree-row ctree-root'); r0.append(node('span', 'ctree-name', D.tree.root), node('span', 'ctree-note', D.tree.rootNote)); tree.append(r0);
    D.tree.rows.forEach(([pre, name, note, tag]) => { const r = node('div', 'ctree-row' + (tag ? ' ' + tag.split(' ').map(c => 'pm-' + c).join(' ') : '')); const nm = node('span', 'ctree-name'); nm.append(node('span', 'ctree-pre', pre), name); r.append(nm, node('span', 'ctree-note', note ? '← ' + note : '')); tree.append(r); });
    const lg = node('div', 'pm-legend'); D.legend.forEach(([tag, t]) => lg.append(node('span', 'pm-chip pm-' + tag, t))); tree.prepend(lg);
    const side = node('div', 'pm-side pm-step'); side.append(node('strong', 'pm-stitle', D.side.title));
    D.side.groups.forEach(G => { side.append(node('span', 'dp-label', G.head)); const ul = node('div', 'pm-files'); G.items.forEach(t => ul.append(node('span', null, t))); side.append(ul); });
    w.append(tree, side);
    const tg = main.querySelector('.tagline'); if (grid) grid.replaceWith(w); else if (tg) tg.before(w); else main.append(w);
  }
  if (v.promptParts) {                                           // one prompt taken apart: what each part does, and why the limits part matters
    const D = v.promptParts; const w = node('div', 'pparts');
    const pr = node('div', 'pt-prompt pt-step'); pr.append(node('span', 'dp-label', D.label)); const tx = node('p', 'pt-text');
    D.parts.forEach(P => tx.append(node('span', 'pt-seg pt-' + P.kind, P.text), ' ')); pr.append(tx); w.append(pr);
    const keys = node('div', 'pt-keys pt-step'); D.parts.filter(P => P.label).forEach(P => { const k = node('div', 'pt-key pt-' + P.kind); k.append(node('strong', null, P.label), node('span', null, P.means)); keys.append(k); }); w.append(keys);
    const cmp = node('div', 'pt-cmp pt-step'); cmp.append(node('span', 'dp-label pt-cmplabel', D.compare.title));
    D.compare.cols.forEach(C => { const c = node('div', 'pt-col pt-c-' + C.tone); c.append(node('strong', 'pt-chead', C.head), node('span', 'pt-say', C.say));
      const ul = node('ul', 'dp-wlist'); C.items.forEach(t => ul.append(node('li', null, t))); c.append(ul); cmp.append(c); }); w.append(cmp);
    const tg = main.querySelector('.tagline'); if (grid) grid.replaceWith(w); else if (tg) tg.before(w); else main.append(w);
  }
  if (v.permPair) {                                              // two kinds of permission side by side: where it's written, what it lets through, for how long
    const D = v.permPair; const w = node('div', 'pperm');
    D.cols.forEach((C, i) => { const c = node('section', 'pp-col pp-step pp-' + C.tone); const h = node('div', 'pp-head'); h.append(node('span', 'pp-n', String(i + 1)), node('strong', null, C.title)); c.append(h, node('span', 'pp-where', C.where));
      const f = node('div', 'pp-code'); C.code.forEach(l => f.append(node('span', 'pp-line' + (l.hl ? ' pp-hl' : ''), l.t))); c.append(f);
      const ex = node('div', 'pp-ex'); ex.append(node('span', 'pp-say', C.say), node('span', 'pp-arrow', '→'), node('span', 'pp-target', C.target), node('span', 'pp-verdict pp-v-' + C.verdict, C.verdictText)); c.append(ex);
      const sc = node('div', 'pp-scope'); sc.append(node('span', 'dp-label', 'Applies to'), node('span', null, C.scope)); c.append(sc); w.append(c); });
    if (D.work) { const wk = node('div', 'dp-work pp-step'); wk.append(node('span', 'dp-label', 'At work')); D.work.forEach(t => wk.append(node('span', 'dp-wk', t))); w.append(wk); }
    const tg = main.querySelector('.tagline'); if (grid) grid.replaceWith(w); else if (tg) tg.before(w); else main.append(w);
  }
  if (v.skillDef) {                                              // what a skill is: the definition as a flow, file → who starts it → same result
    const D = v.skillDef; const w = node('div', 'sdef');
    const q = node('blockquote', 'sf-quote sf-step'); q.append(node('span', 'sf-qtext', D.quote), node('cite', null, D.source)); w.append(q);
    const flow = node('div', 'sf-flow');
    const file = node('div', 'sf-card sf-file sf-step'); file.append(node('span', 'sf-n', '1'), node('strong', 'sf-title', D.file.title));
    const code = node('div', 'sf-code'); let dashes = 0; D.file.lines.forEach(l => { const d = /^---/.test(l); if (d) dashes++; code.append(node('span', 'sf-line' + (d ? ' sf-dash' : dashes === 1 ? ' sf-front' : ''), l)); }); file.append(code, node('span', 'sf-cap', D.file.caption));
    const arrow = () => node('span', 'sf-arrow', '→');
    const who = node('div', 'sf-who sf-step'); D.starters.forEach((st, i) => { const c = node('div', 'sf-card sf-start sf-start-' + i); c.append(node('span', 'sf-n', String(i + 2)), node('strong', 'sf-title', st.title));
      c.append(node('span', st.chip ? 'sf-chip' : 'sf-bubble', st.say)); c.append(node('span', 'sf-cap', st.caption)); who.append(c); if (i === 0) who.append(node('span', 'sf-or', 'or')); });
    const res = node('div', 'sf-card sf-result sf-step'); res.append(node('strong', 'sf-title', D.result.title)); const tiles = node('div', 'sf-tiles');
    D.result.tiles.forEach(t => { const tl = node('span', 'sf-tile'); tl.append(node('b', null, t), node('i', null, '✓')); tiles.append(tl); }); res.append(tiles, node('span', 'sf-cap', D.result.caption));
    flow.append(file, arrow(), who, arrow(), res); w.append(flow);
    const tg = main.querySelector('.tagline'); if (grid) grid.replaceWith(w); else if (tg) tg.before(w); else main.append(w);
  }
  if (v.skillDoc) {                                              // a skill: where its folder lives, what SKILL.md holds, what Claude loads when
    const D = v.skillDoc; const w = node('div', 'sdoc');
    const tree = node('div', 'cmap-box cmap-tree sd-tree sd-step'); tree.append(node('span', 'dp-label sd-tlabel', D.tree.label)); const r0 = node('div', 'ctree-row ctree-root'); r0.append(node('span', 'ctree-name', D.tree.root), node('span', 'ctree-note', D.tree.rootNote)); tree.append(r0);
    D.tree.rows.forEach(([pre, name, note, cls]) => { const r = node('div', 'ctree-row' + (cls ? ' ' + cls.split(' ').map(c => 'ctree-' + c).join(' ') : '')); const nm = node('span', 'ctree-name'); nm.append(node('span', 'ctree-pre', pre), name); r.append(nm, node('span', 'ctree-note', note ? '← ' + note : '')); tree.append(r); });
    const file = node('div', 'sd-file sd-step'); const fh = node('div', 'sd-fhead'); fh.append(node('span', 'dp-label', D.file.label), node('span', 'sd-fname', D.file.name)); file.append(fh);
    D.file.parts.forEach((P, k) => { const part = node('div', 'sd-part sd-' + P.kind + (k ? ' sd-step' : '')); const lab = node('div', 'sd-plabel'); lab.append(node('strong', null, P.label), node('span', null, P.sub)); part.append(lab);
      const body = node('div', 'sd-lines'); P.lines.forEach(([code, note]) => { const row = node('div', 'sd-row'); row.append(node('span', 'sd-code' + (/^(---|#)/.test(code) ? ' sd-mark' : ''), code), node('span', 'sd-note', note ? '← ' + note : '')); body.append(row); }); part.append(body); file.append(part); });
    const load = node('div', 'sd-load sd-step'); load.append(node('span', 'dp-label', D.load.title));
    D.load.moments.forEach(M => { const m = node('div', 'sd-moment'); m.append(node('strong', 'sd-when', M.when)); const box = node('div', 'sd-ctx'); box.append(node('span', 'sd-ctxlabel', M.label));
      const chips = node('div', 'sd-chips'); M.chips.forEach(([t, k]) => chips.append(node('span', 'sd-chip sd-chip-' + k, t))); (M.closed || []).forEach(t => chips.append(node('span', 'sd-chip sd-chip-closed', t))); box.append(chips); m.append(box, node('span', 'sd-mnote', M.note)); if (M.link) { const l = node('div', 'sd-link'); l.append(node('span', 'sd-larrow', '↓'), node('span', null, M.link)); load.append(l); } load.append(m); });
    if (D.load.why) load.append(node('p', 'sd-why', D.load.why));
    const right = node('div', 'sd-right'); if (D.loadWide) { right.append(file); w.classList.add('sd-wide'); w.append(tree, right, load); } else { right.append(file, load); w.append(tree, right); }
    const tg = main.querySelector('.tagline'); if (grid) grid.replaceWith(w); else if (tg) tg.before(w); else main.append(w);
  }
  if (v.figure) {                                                // one drawing that explains the slide on its own
    const f = node('figure', 'slide-figure'); const im = document.createElement('img'); im.src = v.figure; im.alt = v.figureAlt || ''; f.append(im);
    const tg = main.querySelector('.tagline'); if (grid) grid.replaceWith(f); else if (tg) tg.before(f); else main.append(f);
  }
  if (v.layers) {                                                // Snake in layers: one small board per layer, numbered
    const w = node('div', 'layers'); v.layers.forEach((L, i) => { const c = node('figure', 'layer-card'); const im = document.createElement('img'); im.src = L.img; im.alt = L.label;
      c.append(node('span', 'layer-n', String(i + 1)), im, node('strong', null, L.label), node('span', 'layer-cap', L.caption)); w.append(c); });
    const tg = main.querySelector('.tagline'); if (grid) grid.replaceWith(w); else if (tg) tg.before(w); else main.append(w);
  }
  if (v.mdfile != null && cards[v.mdfile]) {                    // 45/46: the card's lines as a CLAUDE.md file
    const c = cards[v.mdfile]; const f = node('div', 'mdfile'); const bar = node('div', 'md-bar'); bar.append(node('i'), node('i'), node('i'), node('span', 'md-name', v.mdName || 'CLAUDE.md')); f.append(bar);
    const body = node('div', 'md-body'); String(s.cards[v.mdfile].body).split('\n').forEach((l, i) => { const r = node('div', 'md-sec'); r.style.setProperty('--i', i); r.append(node('span', 'md-h', '## ' + l), node('span', 'md-l'), node('span', 'md-l short')); body.append(r); });
    f.append(body); c.querySelector('p')?.replaceWith(f);
  }
  if (v.guides) {                                                // 45: guides vs enforces
    const g = node('div', 'ge'); v.guides.forEach((t, i) => { const b = node('div', 'ge-b ge' + i); b.append(node('span', 'ge-ico', t[0]), node('strong', null, t[1]), node('span', null, t[2])); g.append(b); if (i === 0) g.append(node('span', 'ge-vs', '≠')); });
    const tg = main.querySelector('.tagline'); (tg || grid).before(g);
  }
  if (v.repeatStack != null && cards[v.repeatStack]) {          // 49: the same list, again and again
    const c = cards[v.repeatStack]; const wrap = node('div', 'rep-hand'); c.replaceWith(wrap);
    (v.repeatTags || ['card 1', 'card 2', 'card 3 …']).forEach((t, i) => { const k = i === 2 ? c : c.cloneNode(true); k.classList.add('rep-card', 'rep-c' + i); if (i < 2) k.setAttribute('aria-hidden', 'true');
      k.style.setProperty('--i', i); k.append(node('span', 'rep-tag', t)); wrap.append(k); });
    main.classList.add('side-grid'); x.aside = main;
  }
  if (v.noSkill != null && cards[v.noSkill]) {                  // 50: plain prompt, no skill
    const c = cards[v.noSkill]; const b = node('div', 'noskill'); b.append(node('span', 'ns-ico', '🧰'), node('strong', null, 'No skill yet')); c.querySelector('p')?.replaceWith(b);
  }
  if (v.diff) {                                                  // 51: two runs of the same card, not quite the same
    main.classList.add('side-grid'); const d = node('div', 'diff');
    v.diff.forEach((run, ri) => { const m = node('div', 'mini-card'); m.style.setProperty('--i', ri); m.append(node('span', 'mini-title', run.title));
      run.rows.forEach(r => { const row = node('div', 'mini-row' + (r.miss ? ' miss' : '') + (r.odd ? ' odd' : '')); row.append(node('span', 'mini-k', r.k), node('span', 'mini-l')); if (r.note) row.append(node('span', 'mini-note', r.note)); m.append(row); }); d.append(m); });
    grid.after(d);
  }
  if (v.lifespan) {                                              // 53: how long each mechanism "lives"
    cards.forEach((c, i) => { const L = v.lifespan[i]; if (!L) return; const box = node('div', 'life life-' + L.kind); box.append(node('span', 'life-ico', L.icon));
      const track = node('div', 'life-track'); for (let k = 0; k < 12; k++) { const t = node('span', 'life-tick'); t.style.setProperty('--k', k); track.append(t); } box.append(track, node('span', 'life-label', L.label)); c.append(box); });
  }
  if (v.tree != null && cards[v.tree]) {                        // 54: where the skill lives — an empty file
    const c = cards[v.tree]; const parts = String(s.cards[v.tree].body).split('/'); const t = node('div', 'ftree');
    parts.forEach((p, i) => { const r = node('div', 'ft-row' + (i === parts.length - 1 ? ' ft-file' : '')); r.style.setProperty('--d', i); r.style.setProperty('--i', i);
      r.append(node('span', 'ft-ico', i === parts.length - 1 ? '📄' : '📁'), node('span', 'ft-name', p + (i < parts.length - 1 ? '/' : ''))); if (i === parts.length - 1) r.append(node('span', 'ft-empty', 'empty — you write it'), node('span', 'ft-cursor')); t.append(r); });
    c.querySelector('p')?.replaceWith(t);
  }
  if (v.fence != null && cards[v.fence]) {                      // 57: bounded autonomy — a bot inside a fence
    const c = cards[v.fence]; const f = node('div', 'fence'); const yard = node('div', 'yard'); const im = document.createElement('img'); im.src = BOTS.head.src; im.alt = ''; im.className = 'yard-bot'; yard.append(im); f.append(yard);
    String(s.cards[v.fence].body).split('\n').forEach((t, i) => { const sg = node('span', 'fence-sign fs' + i, t); sg.style.setProperty('--i', i); f.append(sg); });
    c.querySelector('p')?.replaceWith(f); c.classList.add('fence-card');
  }
  if (v.conveyor != null && cards[v.conveyor]) {                // 58: terms on a belt, stamped cards come out
    const c = cards[v.conveyor]; const b = node('div', 'belt-wrap'); const belt = node('div', 'belt');
    ['term', 'term', 'term', 'term'].forEach((t, i) => { const k = node('span', 'belt-term', t); k.style.setProperty('--i', i); belt.append(k); });
    const im = document.createElement('img'); im.src = BOTS.head.src; im.alt = ''; im.className = 'belt-bot';
    const out = node('div', 'belt-out'); ['READY', 'REVISE', 'OPEN'].forEach((t, i) => { const o = node('span', 'belt-card st-' + t.toLowerCase(), t); o.style.setProperty('--i', i); out.append(o); });
    b.append(belt, im, out); c.querySelector('p')?.replaceWith(b);
  }
  if (v.perCard) {                                               // 60: every card gets its own decision
    main.classList.add('side-grid'); const row = node('div', 'percard');
    v.perCard.forEach((st, i) => { const m = node('div', 'pc-card'); m.style.setProperty('--i', i); m.append(node('span', 'pc-t', 'card ' + (i + 1)), node('span', 'pc-l'), node('span', 'pc-l short'), node('span', 'pc-stamp st-' + st.toLowerCase(), st)); row.append(m); });
    grid.after(row);
  }
  if (v.gameFlow) {                                              // 62: one round of the game
    grid.classList.add('gameflow'); cards.forEach((c, i) => { c.style.setProperty('--i', i); if (i < cards.length - 1) c.append(node('span', 'gf-arrow', '→')); });
    const back = node('div', 'gf-back'); back.append(node('span', 'gf-back-line'), node('span', 'gf-back-label', '↺ next round')); grid.after(back);
  }
  if (v.gameMock) {                                              // 63: the game screen — only feedback is missing
    main.classList.add('side-grid'); const g = node('div', 'gmock'); const bar = node('div', 'md-bar'); bar.append(node('i'), node('i'), node('i'), node('span', 'md-name', 'Game · Explain It Back')); g.append(bar);
    const b = node('div', 'gm-body'); b.append(node('span', 'gm-term', 'Context window'), node('span', 'gm-field'), node('span', 'gm-btn', 'Submit'));
    const fb = node('div', 'gm-feedback'); fb.append(node('strong', null, 'Feedback'), node('span', null, 'you build this — Assignment 11')); b.append(fb); g.append(b); grid.after(g);
  }
  if (v.phrase) {                                                // 64: the exact phrase to say
    const bub = node('div', 'phrase'); bub.append(node('span', 'phrase-who', 'You'), node('span', 'phrase-text', '“' + v.phrase + '”')); grid.after(bub);
  }
  if (v.catChips != null && cards[v.catChips]) {                // 65: rating categories as coloured labels
    const c = cards[v.catChips]; const w = node('div', 'cat-chips'); String(s.cards[v.catChips].body).split('\n').forEach((t, i) => { const k = node('span', 'cat-chip cc' + i, t); k.style.setProperty('--i', i); w.append(k); }); c.querySelector('p')?.replaceWith(w);
  }
  if (v.runner) {                                                // 66: test cases run one after another
    const c = cards[0]; const list = node('div', 'runner'); String(s.cards[0].body).split('\n').forEach((t, i) => { const r = node('div', 'run-row'); r.style.setProperty('--i', i);
      r.append(node('span', 'run-spin'), node('span', 'run-case', t), node('span', 'run-res rr-' + (v.runner[i]?.tone || 'grey'), v.runner[i]?.label || '')); list.append(r); });
    c.querySelector('p')?.replaceWith(list);
  }
  if (v.plugs != null && cards[v.plugs]) {                      // 67: MCP as one standard plug
    const c = cards[v.plugs]; const m = node('div', 'mcp'); const im = document.createElement('img'); im.src = BOTS.head.src; im.alt = ''; im.className = 'mcp-bot';
    const srv = node('div', 'mcp-srv'); srv.append(node('strong', null, 'MCP server'));
    const lines = node('div', 'mcp-plugs'); String(s.cards[v.plugs].body).split('\n').forEach((t, i) => { const pl = node('span', 'mcp-plug', t); pl.style.setProperty('--i', i); lines.append(pl); });
    m.append(im, lines, srv); c.querySelector('p')?.replaceWith(m);
  }
  if (v.zones) {                                                 // 68: local repository vs external systems
    const cmp = main.querySelector('.compare'); const cols = s.columns || []; const z = node('div', 'zones');
    const a = node('div', 'zone z-local'); a.append(node('span', 'zone-label', v.zones[0]), node('div', 'zone-icons', '📁 🔧'), node('h3', null, cols[0]?.title || ''), node('p', null, cols[0]?.items?.[0] || ''));
    const gate = node('div', 'zone-gate'); gate.append(node('span', 'gate-ico', '🔌'), node('span', null, 'MCP'));
    const b = node('div', 'zone z-ext'); const chips = node('div', 'zone-chips'); v.zones[2].forEach(t => chips.append(node('span', 'zchip', t))); b.append(node('span', 'zone-label', v.zones[1]), chips, node('h3', null, cols[1]?.title || ''), node('p', null, cols[1]?.items?.[0] || ''));
    z.append(a, gate, b); cmp?.replaceWith(z);
  }
  if (v.qa) {                                                    // knowledge check: questions visible, answers open one by one
    grid.classList.add('qa-grid');
    const open = c => { if (!c || c.classList.contains('qa-open')) return false; c.classList.add('qa-open'); announce(c.textContent); return true; };
    cards.forEach(c => c.addEventListener('click', () => open(c)));
    const next = () => open(cards.find(c => !c.classList.contains('qa-open')));
    window.__reveal = next; slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; });
  }
  if (v.pending) {                                               // 69: visible placeholder for instructions still to come
    const p = node('div', 'pending-box'); p.append(node('span', 'pending-ico', '⏳'), node('strong', null, v.pending[0]), node('span', null, v.pending[1])); grid.after(p);
  }
  if (v.rulesBox) {                                              // 5: the client's own rules as a numbered box under the cards
    const r = node('div', 'rules-box'); const ol = node('ol', 'rules-list');
    v.rulesBox[1].forEach((t, i) => { const li = node('li', null, t); li.style.setProperty('--i', i); ol.append(li); });
    r.append(node('strong', 'rules-title', v.rulesBox[0]), ol); grid.after(r);
  }
  if (v.flowText) {                                              // 25: a short flow as text under the cards: a → b → c
    const f = node('p', 'tok-flow'); v.flowText.forEach((t, i) => { if (i) f.append(node('span', 'tok-arrow', '→')); f.append(node('span', 'tok-word', t)); }); grid.after(f);
  }
  if (v.sourceTiles != null && cards[v.sourceTiles]) {          // 70: pick one source, read-only
    const c = cards[v.sourceTiles]; const t = node('div', 'src-tiles'); const icons = ['🎫', '🦊', '📘'];
    String(s.cards[v.sourceTiles].body).split('\n').forEach((l, i) => { const k = node('div', 'src-tile'); k.style.setProperty('--i', i); k.append(node('span', 'src-ico', icons[i] || '•'), node('span', 'src-name', l), node('span', 'src-lock', '🔒 read-only')); t.append(k); });
    c.querySelector('p')?.replaceWith(t);
  }
  if (v.planB && window[v.planB]) {                              // plan B overlay on any slide (key B)
    const panel = node('div', 'planb'); const head = node('div', 'planb-head'); head.append(node('strong', null, 'Plan B'), node('span', null, ' · ' + (v.planBLabel || 'captured example') + ' · press B to close'));
    panel.append(head, node('pre', 'planb-body', window[v.planB])); stage.append(panel);
    const tog = () => panel.classList.toggle('show'); window.__planB = tog; slideController.signal.addEventListener('abort', () => { if (window.__planB === tog) window.__planB = null; });
  }
  if (v.menu != null && cards[v.menu]) {                        // 71: possible outputs as a menu to pick from
    const c = cards[v.menu]; const m = node('div', 'menu'); String(s.cards[v.menu].body).split('\n').forEach((t, i) => { const b = node('button', 'menu-chip', t); b.style.setProperty('--i', i); b.addEventListener('click', () => { m.querySelectorAll('.menu-chip').forEach(x => x.classList.toggle('picked', x === b)); m.classList.add('has-pick'); }); m.append(b); });
    c.querySelector('p')?.replaceWith(m);
  }
  if (v.pipes) {                                                 // 72: the same pipeline, two systems
    const cmp = main.querySelector('.compare'); const cols = s.columns || []; const g = node('div', 'pipes');
    cols.forEach((c, r) => { g.append(node('span', 'pipe-label pl' + r, c.title)); String(c.items?.[0] || '').split(/\s*→\s*/).forEach((st, k) => { const cell = node('span', 'pipe-st' + ((v.same || []).includes(k) ? ' same' : ''), st); cell.style.setProperty('--d', (r * 4 + k) * 0.18 + 's'); g.append(cell); }); });
    cmp?.replaceWith(g);
  }
  if (v.recapKeys) {                                             // 73: → reveals the next item, no buttons
    const list = main.querySelector('.recap-list'); const ctrl = main.querySelector('.widget-controls'); if (ctrl) ctrl.style.display = 'none';
    [...(list?.children || [])].forEach((li, i) => { li.querySelector('.recap-check').textContent = '🏆'; li.classList.remove('hidden-item'); li.classList.add('won'); li.removeAttribute('aria-hidden'); li.style.setProperty('--i', i); });
    main.classList.add('side-grid'); x.aside = main;
  }
  if (v.levelUp) {                                               // 74: every item ticks, a progress bar fills
    const list = main.querySelector('.recap-list'); const ctrl = main.querySelector('.widget-controls'); if (ctrl) ctrl.style.display = 'none';
    list?.classList.add('levelup'); [...(list?.children || [])].forEach((li, i) => { li.classList.remove('hidden-item'); li.removeAttribute('aria-hidden'); li.style.setProperty('--i', i); li.querySelector('.recap-check').textContent = '✓'; });
    const bar = node('div', 'lv-bar'); const fill = node('span', 'lv-fill'); fill.style.setProperty('--n', list?.children.length || 1); bar.append(fill, node('span', 'lv-label', 'LEVEL UP')); list?.after(bar);
  }
  if (v.supportDays) main.querySelector('.art-timeline')?.classList.add('teach-done');
  if (v.doneSteps && x.steps) {                                  // 76: the first N steps are done, the next one pulses
    x.steps.forEach((li, i) => { li.classList.toggle('done-step', i < v.doneSteps); li.classList.toggle('next-step', i === v.doneSteps); if (i < v.doneSteps) li.querySelector('.step-circle').textContent = '✓'; });
  }
  if (v.handover) {                                              // 77: AI can … people remain responsible
    const cols = main.querySelectorAll('.compare-col'); if (cols[0]) { const im = document.createElement('img'); im.src = BOTS.head.src; im.alt = ''; im.className = 'ho-bot'; cols[0].prepend(im); }
    if (cols[1]) { cols[1].classList.add('ho-people'); cols[1].prepend(node('span', 'ho-person', '👤')); }
    main.append(node('p', 'ho-line', v.handover));
  }
  if (v.sentences) {                                             // 78: five open sentences on a notebook page
    const nb = node('article', 'card notebook sentences'); const ul = node('ul', 'nb-lines');
    cards.forEach((c, i) => { const li = node('li'); li.style.setProperty('--i', i); li.append(node('span', null, s.cards[i].title), node('span', 'blank')); ul.append(li); });
    nb.append(ul); grid.replaceWith(nb);
  }
  if (v.checklist != null && cards[v.checklist]) {             // 13: the checklist ticks itself off
    grid.classList.add('one-col'); const c = cards[v.checklist]; const ul = node('ul', 'checklist');
    String(s.cards[v.checklist].body).split('\n').forEach((t, i) => { const li = node('li'); li.style.setProperty('--i', i);
      const m = v.checkLabels && /^([^:]{2,14}):\s*(.*)$/.exec(t);   // checkLabels: "Goal: …" becomes a coloured label next to its text, the same colour on every slide
      if (m) { const lab = node('span', 'check-label', m[1]); lab.dataset.label = m[1].toLowerCase().replace(/\s+/g, '-'); li.classList.add('labelled'); li.append(node('span', 'check-box'), lab, node('span', 'check-text', m[2])); }
      else li.append(node('span', 'check-box'), node('span', 'check-text', t));
      ul.append(li); });
    if (v.addLine) { const li = node('li', 'check-add'); li.style.setProperty('--i', ul.children.length); const t = node('span', 'check-text', ''); t.contentEditable = 'true'; t.dataset.placeholder = v.addLine; t.addEventListener('keydown', e => e.stopPropagation()); li.append(node('span', 'check-plus', '+'), t); ul.append(li); }
    c.querySelector('p')?.replaceWith(ul);
  }
  return x;
}
const REACT = ['?', '⇄', '…?', '⌛', '!!'];
// slide 7: the steps become nested rings (each term sits inside the one before it)
function buildNest(main, s) {
  const wrap = main.querySelector('.steps-wrap'); const chain = wrap?.querySelector('.steps-chain'); if (!chain) return null;
  const items = [...chain.querySelectorAll('.step-item')]; chain.classList.add('nest-hidden');
  const five = (s.items || []).length > 4; const R = five ? [238, 194, 150, 106, 64] : [230, 172, 116, 68], CX = 380, B = 470;
  const g = document.createElementNS(SVGNS, 'svg'); g.setAttribute('viewBox', '0 0 760 480'); g.setAttribute('class', 'nest'); g.setAttribute('role', 'group');
  const labels = [];
  (s.items || []).forEach((it, i) => {
    const r = R[i], cy = B - r, grp = document.createElementNS(SVGNS, 'g'); grp.setAttribute('class', 'ring'); grp.style.setProperty('--i', i);
    const c = document.createElementNS(SVGNS, 'ellipse'); c.setAttribute('cx', CX); c.setAttribute('cy', cy); c.setAttribute('rx', r * 1.5); c.setAttribute('ry', r);
    const t = document.createElementNS(SVGNS, 'text'); t.setAttribute('x', CX); t.setAttribute('class', 'ring-label' + (i === R.length - 1 ? ' ring-label-core' : ''));
    const inner = i === R.length - 1; const words = inner ? it.label.split(' ') : [it.label];
    const lines = inner && words.length > 2 ? [words.slice(0, -1).join(' '), words.at(-1)] : [it.label];
    const y0 = inner ? cy - (lines.length - 1) * 11 + 6 : cy - r + (five ? 36 : 52);
    lines.forEach((ln, k) => { const ts = document.createElementNS(SVGNS, 'tspan'); ts.setAttribute('x', CX); ts.setAttribute('y', y0 + k * 20); ts.textContent = ln; t.append(ts); });
    grp.append(c, t); grp.addEventListener('click', () => items[i]?.querySelector('button')?.click());
    g.append(grp); labels.push(t);
  });
  const row = node('div', 'nest-row'); row.append(g); wrap.insertBefore(row, chain);
  const rings = [...g.querySelectorAll('.ring')];
  const api = { row, labels, onChange: null, current: () => { const a = items.map(li => li.classList.contains('active')); return a.every(Boolean) ? -1 : a.indexOf(true); } };
  const sync = () => { items.forEach((li, i) => rings[i].classList.toggle('on', li.classList.contains('active'))); g.classList.toggle('any-on', items.some(li => li.classList.contains('active'))); api.onChange?.(); };
  const mo = new MutationObserver(sync); items.forEach(li => mo.observe(li, { attributes: true, attributeFilter: ['class'] }));
  slideController.signal.addEventListener('abort', () => mo.disconnect());
  return api;
}
// opening slides 1-4: welcome (big logo), ask (one big question), agree + team (card rows)
function buildOpener(stage, main, s, v) {
  const head = stage.querySelector('.heading');
  if (v.opener === 'welcome') {
    const logo = node('div', 'opener-logo'); const img = document.createElement('img'); img.src = 'assets/aetherlink-mark.png'; img.alt = '';
    logo.append(img, node('span', 'opener-word', 'AETHER'), node('span', 'opener-word accent', 'LINK'));
    head.querySelector('.heading-top').after(logo);
  }
  if (v.opener === 'showcase' && v.image) {                      // Day 2 show & tell: screenshot in a browser frame
    const shot = node('figure', 'showcase'); const bar = node('div', 'showcase-bar'); bar.append(node('span', 'dots'), node('span', 'showcase-url', v.imageLink || ''));
    const img = document.createElement('img'); img.src = v.image; img.alt = ''; shot.append(bar, img);
    main.classList.add('with-showcase'); main.prepend(shot);
  }
  if (v.opener === 'sdlc-loop' && v.image) {
    const figure = node('figure', 'sdlc-loop'); const img = document.createElement('img'); img.src = v.image; img.alt = v.imageAlt || '';
    figure.append(img); main.prepend(figure);
  }
  if (v.opener === 'team') main.querySelectorAll('.card').forEach((c, i) => {
    const d = s.cards?.[i] || {};                                    // optional: photo = 'assets/team/<name>.jpg', role, back (shown when the card flips)
    const name = c.querySelector('h2,h3,strong,.card-title')?.textContent || c.textContent;
    let av;
    if (d.photo) { av = node('span', 'team-avatar team-photo'); const img = document.createElement('img'); img.src = d.photo; img.alt = ''; av.append(img); }
    else av = node('span', 'team-avatar', name.split(' ').filter(w => /^[A-Z]/.test(w)).map(w => w[0]).slice(0, 2).join(''));
    c.prepend(av);
    if (d.role) c.append(node('p', 'team-role', d.role));
    if (!d.back) return;
    // flip card, like a memory card: front and back are two faces of one card that turns in 3D
    const front = node('div', 'flip-face flip-front'); front.append(...c.childNodes, node('span', 'flip-hint', '↻'));
    const back = node('div', 'flip-face flip-back'); back.append(node('h2', null, name), node('p', 'flip-line', d.back));
    if (d.tags) { const chips = node('div', 'flip-tags'); d.tags.forEach(t => chips.append(node('span', 'flip-tag', t))); back.append(chips); }
    const inner = node('div', 'flip-inner'); inner.append(front, back);
    c.append(inner); c.classList.add('flip-card'); c.tabIndex = 0; c.setAttribute('role', 'button'); c.setAttribute('aria-label', name + ': show details');
    const flip = e => { e.stopPropagation(); c.classList.toggle('show-back'); };
    c.addEventListener('click', flip, { signal: slideController.signal });
    c.addEventListener('keydown', e => { if (e.key === 'Enter') flip(e); }, { signal: slideController.signal });
  });
  if (v.opener === 'teams') main.querySelectorAll('.card').forEach(c => {   // empty robot per team: names get written on it
    const img = document.createElement('img'); img.src = BOTS.head.src; img.alt = ''; img.className = 'teams-bot';
    const lines = node('div', 'teams-lines'); for (let k = 0; k < 6; k++) lines.append(node('span', 'teams-line'));
    c.prepend(img); c.append(lines);
  });
}
function rel(el, stage) { const a = el.getBoundingClientRect(), b = stage.getBoundingClientRect(); return { x: a.left - b.left + stage.scrollLeft, y: a.top - b.top, w: a.width, h: a.height }; }
function renderVisual(stage, body, main, s) {
  const v = s.visual; if (!v) return;
  if (v.anatomy) {
    const a = v.anatomy; const figure = node('figure', 'anatomy-figure');
    if (EMBED) {
      const img = document.createElement('img'); img.src = a.poster; img.alt = a.title + '. ' + a.caption; figure.append(img);
    } else {
      const frame = document.createElement('iframe'); frame.src = a.src; frame.title = a.title; figure.append(frame);
    }
    figure.append(node('figcaption', null, a.caption)); main.append(figure); return;
  }
  if (v.art === 'timeline') main.prepend(ART.timeline());
  if (v.cardArt) { const cards = main.querySelectorAll('.card'); Object.entries(v.cardArt).forEach(([i, kind]) => { if (cards[i] && ART[kind]) cards[i].append(ART[kind]()); }); }
  if (v.pillarIcons) main.querySelectorAll('.pillar').forEach((p, i) => p.prepend(svg('0 0 24 24', PILLAR_ICONS[i % PILLAR_ICONS.length], 'pillar-icon')));
  if (v.stagger) main.classList.add('stagger-' + v.stagger);
  if (v.compact) main.classList.add('compact-cards');
  if (v.oneCol) main.querySelector('.cards')?.classList.add('one-col', 'full-col');
  if (v.hero != null) { main.classList.add('has-hero'); main.querySelectorAll('.card')[v.hero]?.classList.add('card-hero'); }
  let popRow = null, nest = null; const ex = renderExtras(stage, main, s, v);
  if (v.art === 'nested') nest = buildNest(main, s);
  if (v.popOut != null && s.cards?.[v.popOut]) {
    const src = s.cards[v.popOut]; main.querySelectorAll('.card')[v.popOut]?.remove();
    popRow = node('div', 'pop-row'); const col = node('div', 'pop-col'); const list = node('div', 'pop-chips');
    String(src.body).split('\n').forEach((t, i) => { const c = node('span', 'pop-chip'); const inner = node('span', 'pop-chip-in', t); inner.style.setProperty('--i', i); if (v.chipIcons?.[i]) inner.prepend(node('span', 'chip-ico', v.chipIcons[i])); c.append(inner); list.append(c); });
    if (v.chipGrid) list.classList.add('grid' + v.chipGrid);
    col.append(node('p', 'pop-label', src.title), list); popRow.append(col); const tg = main.querySelector('.tagline'); if (tg) tg.before(popRow); else main.append(popRow);
  }
  highlight(stage, s);
  if (v.opener) buildOpener(stage, main, s, v);
  if (v.logoFly) {                                               // 6: our logo flies in after AetherBOT has waved
    const logo = node('div', 'fly-logo'); const img = document.createElement('img'); img.src = 'assets/aetherlink-mark.png'; img.alt = '';
    logo.append(img, node('span', 'opener-word', 'AETHER'), node('span', 'opener-word accent', 'LINK')); main.prepend(logo);
  }
  const bot = BOTS[v.bot]; if (!bot) return;
  const fig = node('figure', 'bot bot-' + v.bot + ' place-' + v.place); fig.setAttribute('aria-hidden', 'true');
  const live = node('div', 'bot-live'); const img = document.createElement('img'); img.src = bot.src; img.alt = ''; img.decoding = 'async';
  const hatch = node('span', 'hatch'); hatch.innerHTML = LID;
  if (bot.hatch) { hatch.style.left = bot.hatch[0] + '%'; hatch.style.top = bot.hatch[1] + '%'; live.append(img, hatch); } else live.append(img);
  fig.append(live);
  if (v.tool === 'thought') fig.append(ART.thought());
  if (v.botTag) fig.append(node('span', 'bot-tag', v.botTag));
  if (v.place === 'in' && v.botIn && main.querySelector(v.botIn)) { const host = main.querySelector(v.botIn); host.classList.add('bot-host'); host.append(fig); }
  else if (v.place === 'left') { body.prepend(fig); body.classList.add('with-bot', 'bot-left'); }
  else if (v.place === 'beside') { body.append(fig); body.classList.add('with-bot', 'bot-beside'); }
  else if (v.place === 'under') { main.append(fig); }
  else if (v.place === 'popout' && popRow) { popRow.prepend(fig); }
  else if (v.place === 'nest' && nest) { nest.row.prepend(fig); }
  else if (v.place === 'key' && ex.row) { ex.row.prepend(fig); }
  else if (v.place === 'slot' && ex.slot) { ex.slot.append(fig); }
  else if (v.place === 'stamps' && ex.stampRow) { ex.stampRow.querySelector('.stamps-label')?.after(fig); }
  else if (v.place === 'aside' && ex.aside) { fig.classList.add('place-aside'); const tg = ex.aside.querySelector(':scope > .tagline'); if (tg) tg.before(fig); else ex.aside.append(fig); }
  else if (v.place === 'stack' && ex.slot) { fig.classList.add('place-stack'); ex.slot.append(fig); }
  else if (v.place === 'pointer') {
    const target = main.querySelectorAll('.card')[v.pointAt]; fig.classList.add('pointer-bot'); stage.append(fig);
    const H = v.pointH || 230; fig.style.height = H + 'px';
    const put = () => { if (!target) return; const t = rel(target, stage); const W = H * bot.ratio;
      const tipX = W * bot.tip[0] / 100, tipY = H * bot.tip[1] / 100;
      fig.style.left = (bot.tip[0] < 50 ? t.x + t.w - 18 - tipX : t.x + 18 - tipX) + 'px';
      fig.style.top = (t.y + t.h / 2 - tipY) + 'px'; };
    requestAnimationFrame(() => requestAnimationFrame(put)); window.addEventListener('resize', put, { signal: slideController.signal });
    ex.pointer = fig;
    if (v.spotlight != null) { const tm = setTimeout(() => fig.classList.add('show'), 1600); slideController.signal.addEventListener('abort', () => clearTimeout(tm)); }
  }
  else if (v.place === 'clouds') {                             // 14: two thought clouds, one left and one right of AetherBOT
    const grid = main.querySelector('.cards'); const cs = [...grid.querySelectorAll('.card')]; const row = node('div', 'cloud-row');
    cs.forEach((c, i) => { c.classList.add('cloud', i ? 'cloud-right' : 'cloud-left'); const dots = node('span', 'cloud-dots'); dots.append(node('i'), node('i')); c.append(dots); });
    row.append(cs[0], fig, ...cs.slice(1)); grid.replaceWith(row);
  }
  else if (v.place === 'timeline') { const tl = main.querySelector('.art-timeline'); const row = node('div', 'tl-row'); tl.replaceWith(row); row.append(tl, fig); }
  const fx = document.createElementNS(SVGNS, 'svg'); fx.setAttribute('class', 'fx'); fx.setAttribute('aria-hidden', 'true'); stage.append(fx);
  const draw = () => {
    fx.replaceChildren(); stage.querySelectorAll('.fly').forEach(f => f.remove());
    const r = stage.getBoundingClientRect(); fx.setAttribute('viewBox', '0 0 ' + r.width + ' ' + stage.scrollHeight); fx.style.height = stage.scrollHeight + 'px';
    const h = rel(hatch, stage);
    const from = { x: h.x, y: h.y };
    const target = v.target ? stage.querySelector(v.target) : null;
    if (v.tool === 'map' && target) {
      const t = rel(target, stage), to = { x: t.x + 70, y: t.y - 8 }, top = Math.min(from.y, to.y) - 110;
      const d = 'M' + from.x + ' ' + from.y + ' C' + (from.x + 30) + ' ' + top + ' ' + (to.x - 120) + ' ' + top + ' ' + to.x + ' ' + to.y;
      fx.innerHTML = '<path class="trail" pathLength="1" d="' + d + '"/><g class="map-pop" transform="translate(' + from.x + ' ' + (from.y - 36) + ')"><g class="map-inner"><path d="M-22-14 -8-18 8-12 22-16V14L8 18-8 12-22 16z"/><path class="fold" d="M-8-18V12M8-12V18"/><circle class="pin" cx="14" cy="-2" r="4"/></g></g>';
    }
    if (v.tool === 'arm' && target) {
      const t = rel(target, stage), to = { x: t.x + t.w / 2, y: t.y + t.h / 2 };
      const d = 'M' + from.x + ' ' + from.y + ' C' + (from.x - 10) + ' ' + (from.y - 150) + ' ' + (to.x + 90) + ' ' + (to.y - 170) + ' ' + to.x + ' ' + (to.y - 30);
      fx.innerHTML = '<defs><mask id="armmask" maskUnits="userSpaceOnUse"><path class="arm-reveal" pathLength="1" d="' + d + '"/></mask></defs>' +
        '<g mask="url(#armmask)"><path class="arm-tube" d="' + d + '"/><path class="arm-rings" d="' + d + '"/></g>' +
        '<g class="arm-tip" transform="translate(' + to.x + ' ' + (to.y - 30) + ')"><circle class="ripple" r="14"/><circle class="ripple r2" r="14"/><path class="claw" d="M-9 -6 -4 10M9 -6 4 10"/><circle class="knuckle" r="9"/></g>';
      target.classList.add('tapped');
    }
    if (v.tool === 'toolbox') {
      main.querySelectorAll('.pillar-icon').forEach((ic, i) => {
        const t = rel(ic, stage); const f = node('span', 'fly'); f.style.setProperty('--i', i);
        f.style.left = from.x + 'px'; f.style.top = from.y + 'px';
        f.style.setProperty('--dx', (t.x + t.w / 2 - from.x) + 'px'); f.style.setProperty('--dy', (t.y + t.h / 2 - from.y) + 'px');
        f.append(svg('0 0 24 24', PILLAR_ICONS[i % PILLAR_ICONS.length])); stage.append(f);
      });
    }
  };
  requestAnimationFrame(() => requestAnimationFrame(draw));
  img.addEventListener('load', () => requestAnimationFrame(draw), { once: true });
  window.addEventListener('resize', draw, { signal: slideController.signal });
  if (ex.aim.length) {
    const aim = () => { const h = rel(hatch, stage); ex.aim.forEach(el => { const t = rel(el, stage); el.firstChild.style.setProperty('--dx', (h.x - t.x - t.w / 2) + 'px'); el.firstChild.style.setProperty('--dy', (h.y - t.y - t.h / 2) + 'px'); }); };
    aim(); const tm = setTimeout(aim, 1000); slideController.signal.addEventListener('abort', () => clearTimeout(tm));
    window.addEventListener('resize', aim, { signal: slideController.signal });
  }
  if (v.reveal === 'click') {
    const faces = (v.faces || []).map(f => { const src = 'assets/aetherbot/faces/aetherbot-face-' + f + '.webp'; new Image().src = src; return src; });
    const bub = node('span', 'react'); if (!faces.length && !v.noReact) fig.append(bub);
    ex.react = i => {
      live.classList.remove('jolt'); bub.classList.remove('show'); void live.offsetWidth; live.classList.add('jolt');
      if (faces.length) img.src = faces[i % faces.length]; else if (!v.noReact) { bub.textContent = REACT[i % REACT.length]; bub.classList.add('show'); }
    };
  }
  if (nest) {
    const lens = node('span', 'lens'); lens.innerHTML = '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="26" cy="26" r="19" class="lens-glass"/><circle cx="26" cy="26" r="19" class="lens-rim"/><path d="M40 40 58 58" class="lens-handle"/><path d="M16 19a12 12 0 0 1 8-6" class="lens-shine"/></svg>';
    stage.append(lens);
    const place = () => {
      const on = nest.current();
      let x, y;
      if (on < 0) { const h = rel(hatch, stage); x = h.x + 18; y = h.y - 46; }
      else { const t = rel(nest.labels[on], stage); x = t.x - 34; y = t.y + t.h / 2; }
      lens.style.left = x + 'px'; lens.style.top = y + 'px';
    };
    nest.onChange = place; const tm = setTimeout(() => { lens.classList.add('out'); place(); }, 1100);
    slideController.signal.addEventListener('abort', () => clearTimeout(tm));
    window.addEventListener('resize', place, { signal: slideController.signal });
  }
  if (popRow) {
    // chips start inside the hatch; measured after the bot has finished peeking up
    const aim = () => { const h = rel(hatch, stage); popRow.querySelectorAll('.pop-chip').forEach(c => { const t = rel(c, stage); const inner = c.firstChild; inner.style.setProperty('--dx', (h.x - t.x - t.w / 2) + 'px'); inner.style.setProperty('--dy', (h.y - t.y - t.h / 2) + 'px'); }); };
    aim(); const tm = setTimeout(aim, 1000); slideController.signal.addEventListener('abort', () => clearTimeout(tm));
    window.addEventListener('resize', aim, { signal: slideController.signal });
  }
}

/* ---- slide type -> colour chip, footer segment ---- */
const TYPE_LABEL = { practice: 'Assignment', concept: 'Concept', demo: 'Demo', review: 'Review', quiz: 'Quiz', recap: 'Recap', pause: 'Break', context: 'Context' };
function slideType(s) { return TYPE_LABEL[s.type] ? s.type : (s.layout === 'exercise' ? 'practice' : s.layout === 'recap' ? 'recap' : 'context'); }

const stateKey = () => 'als:' + current + ':' + slides[current].title;
function loadState() { try { return JSON.parse(sessionStorage.getItem(stateKey()) || '{}') || {}; } catch { return {}; } }
function saveState(st) { try { sessionStorage.setItem(stateKey(), JSON.stringify(st)); } catch {} }

function renderInstructions(s) {
  const box = node('section', 'exercise-instructions'); const st = loadState(); const steps = s.steps || [];
  if (steps.length) {
    const head = node('div', 'do-head'); head.append(node('h2', null, s.stepsHeading || 'Your prompt must ask Claude Code to:')); const count = node('span', 'do-count'); head.append(count); box.append(head);
    const list = node('ol', 'do-list'); const done = Array.isArray(st.done) ? st.done.slice(0, steps.length) : [];
    steps.forEach((step, i) => {
      const li = node('li', 'do-item'); const label = node('label'); const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = !!done[i];
      label.append(cb, node('span', 'do-text', step.text ?? step)); li.classList.toggle('done', cb.checked);
      cb.addEventListener('change', () => { done[i] = cb.checked; li.classList.toggle('done', cb.checked); saveState({ ...loadState(), done }); paint(); if (done.filter(Boolean).length === steps.length) notify('All steps done · check the checkpoint'); });
      li.append(label); list.append(li);
    });
    const paint = () => { const n = done.filter(Boolean).length; count.textContent = n + ' / ' + steps.length; box.classList.toggle('all-done', n === steps.length); };
    paint(); box.append(list);
  }
  if (s.expected) { const p = node('p', 'expected'); p.append(node('span', 'field-label', 'Expected result'), node('span', null, s.expected)); box.append(p); }
  if (s.check) {
    const cp = node('div', 'checkpoint'); const passed = !!st.passed; cp.classList.toggle('passed', passed);
    const top = node('div', 'checkpoint-top'); top.append(node('span', 'field-label', 'Checkpoint'));
    const toggle = node('button', 'checkpoint-toggle', passed ? 'Passed ✓' : 'Mark passed'); toggle.setAttribute('aria-pressed', String(passed));
    toggle.addEventListener('click', () => { const next = !(loadState().passed); saveState({ ...loadState(), passed: next }); cp.classList.toggle('passed', next); toggle.textContent = next ? 'Passed ✓' : 'Mark passed'; toggle.setAttribute('aria-pressed', String(next)); announce(next ? 'Checkpoint marked as passed' : 'Checkpoint reopened'); });
    top.append(toggle); cp.append(top, node('p', null, s.check)); box.append(cp);
  }
  return box.childNodes.length ? box : null;
}
function sideBySide(s, instructions) { if (!instructions) return false; return s.layout !== 'steps'; }

function renderProgress() {
  const bar = $('progress'); const hadFocus = bar.contains(document.activeElement); bar.replaceChildren();
  slides.forEach((s, i) => {
    const seg = node('button', 'seg'); seg.dataset.type = slideType(s); seg.classList.toggle('done', i < current); seg.classList.toggle('current', i === current); seg.classList.toggle('is-hidden', isHidden(i));
    seg.tabIndex = i === current ? 0 : -1; if (i === current) seg.setAttribute('aria-current', 'step');
    seg.setAttribute('aria-label', String(i + 1) + '. ' + s.title); seg.title = s.title;
    seg.addEventListener('click', () => go(i)); bar.append(seg);
  });
  if (hadFocus) bar.querySelector('.seg.current')?.focus();
}

/* ---- presenter-view sync: BroadcastChannel, localStorage fallback ---- */
const DECK_ID = location.pathname.split('/').pop() || 'index.html';
const PRESENTER_CHANNEL = 'aetherlink-classroom-slides:' + DECK_ID;
const PRESENTER_KEY = 'als:presenter:index:' + DECK_ID;
let presenterChannel = null;
try { if ('BroadcastChannel' in window) presenterChannel = new BroadcastChannel(PRESENTER_CHANNEL); } catch {}
function broadcastSlide(index) {
  if (presenterChannel) { try { presenterChannel.postMessage({ type: 'slide', index }); } catch {} }
  try { localStorage.setItem(PRESENTER_KEY, JSON.stringify({ index, at: Date.now() })); } catch {}
}
function openPresenterView() {
  window.open((window.PRESENTER_PAGE || 'presenter.html') + '?i=' + current, 'aetherlink-presenter:' + DECK_ID, 'width=1000,height=680,noopener');
}

/* ---- embed mode: presenter.html shows this page in an iframe (?embed=1) as a live preview ---- */
const EMBED = new URLSearchParams(location.search).has('embed');
if (EMBED) document.documentElement.classList.add('embed');
const EMBED_OPEN = EMBED && new URLSearchParams(location.search).has('open');
if (EMBED_OPEN) document.documentElement.classList.add('embed-open');

/* ---- hide a slide for now: H toggles; arrows, Home and End skip hidden slides ---- */
const HIDDEN_KEY = 'als:hidden:' + DECK_ID;
const hideId = i => i + ':' + slides[i].title;
// A slide with `hidden: true` in slides.js starts hidden on every laptop; H (or Chapters) can still show it.
const SHOWN_KEY = 'als:shown:' + DECK_ID;
const readSet = k => { try { return new Set(JSON.parse(localStorage.getItem(k) || '[]')); } catch { return new Set(); } };
const writeSet = (k, set) => { try { localStorage.setItem(k, JSON.stringify([...set])); } catch {} };
function isHidden(i) { const id = hideId(i); return slides[i].hidden ? !readSet(SHOWN_KEY).has(id) : readSet(HIDDEN_KEY).has(id); }
function toggleHidden(i) {
  const id = hideId(i); const now = !isHidden(i); const key = slides[i].hidden ? SHOWN_KEY : HIDDEN_KEY; const set = readSet(key);
  if (slides[i].hidden) { if (now) set.delete(id); else set.add(id); } else { if (now) set.add(id); else set.delete(id); }
  writeSet(key, set); return now;
}
function visibleFrom(i, dir) { for (let n = i; n >= 0 && n < slides.length; n += dir) if (!isHidden(n)) return n; return null; }
function step(dir) { const n = visibleFrom(current + dir, dir); if (n !== null) go(n); }

/* ---- stepThrough: every main item starts hidden, click / → shows the next one ---- */
const STEP_ITEMS = '.cards > .card, .pillars > .pillar, .compare > .compare-col, .matrix > .mx-row:not(.mx-head), .pop-chips > .pop-chip, .rules-box, .tok-flow, .slide-main > .tagline';
function applyStepThrough(main, s) {
  const v = s.visual || {}; if (!v.stepThrough || window.__reveal) return;
  const items = [...main.querySelectorAll(typeof v.stepThrough === 'string' ? v.stepThrough : STEP_ITEMS)];
  if (!items.length) return;
  items.forEach(el => el.classList.add('st-pending'));
  main.classList.add('step-through');
  const next = () => { const el = items.find(e => e.classList.contains('st-pending')); if (!el) return false; el.classList.remove('st-pending'); el.classList.add('st-shown'); announce(el.textContent); return true; };
  main.addEventListener('click', e => { if (!e.target.closest('button, a, input, textarea')) next(); }, { signal: slideController.signal });
  window.__reveal = next; slideController.signal.addEventListener('abort', () => { if (window.__reveal === next) window.__reveal = null; });
}

/* ---- assignment slides: one label, big steps, a picture of the result, timer pill top right ---- */
function assignmentLabel(s) {
  const m = /^Assignment (\d+[a-zA-Z]?):\s*(.*)$/.exec(s.title || '');
  const day = ((s.kicker || '').match(/DAY \d/) || [''])[0].replace('DAY', 'Day');
  return { label: (m ? 'Assignment ' + m[1] : 'Hands-on') + (day ? ' · ' + day : ''), title: m ? m[2] : s.title };
}
function timerPill(s) {
  const key = ALSTimer.key(current, s.title); const wrap = node('div', 'tpill-wrap');
  const pill = node('button', 'tpill'); pill.type = 'button'; pill.setAttribute('aria-expanded', 'false'); pill.setAttribute('aria-label', 'Assignment timer: open the controls');
  const face = node('span', 'tpill-face', '00:00'); pill.append(node('span', 'tpill-ico', '⏱'), face);
  // the controls slide out to the left of the pill, in the same row, so they never cover the slide
  const pop = node('div', 'tpill-bar'); pop.hidden = true;
  pop.append(ALSTimer.mount({ key, defaultSec: 0, minutes: true, boxCls: 'tpill-controls', faceCls: 'tpill-face-hidden', doneText: 'TIME',
    onDone: () => notify('Time is up — this assignment ends now'), onEmpty: () => notify('Set the minutes first, then press Start.'), signal: slideController.signal }));
  const toggle = open => { pop.hidden = !open; pill.setAttribute('aria-expanded', String(open)); if (open) pop.querySelector('input')?.focus(); };
  pill.addEventListener('click', e => { e.stopPropagation(); toggle(pop.hidden); });
  pop.addEventListener('click', e => e.stopPropagation());
  document.addEventListener('click', () => toggle(false), { signal: slideController.signal });
  const paint = () => { const t = ALSTimer.read(key, 0); const l = ALSTimer.left(t);
    face.textContent = t.total > 0 && l === 0 ? 'TIME' : ALSTimer.fmt(l);
    pill.classList.toggle('running', t.running); pill.classList.toggle('late', t.total > 0 && l > 0 && l <= 60); pill.classList.toggle('done', t.total > 0 && l === 0); };
  paint(); const iv = setInterval(paint, 500); slideController.signal.addEventListener('abort', () => clearInterval(iv));
  wrap.append(pop, pill); return wrap;
}
function renderAssignment(stage, s) {
  const assignment = assignmentLabel(s);
  const type = slideType(s);
  const label = type === 'practice' ? assignment.label : TYPE_LABEL[type];
  const title = assignment.title;
  const head = node('section', 'heading asg-head'); const top = node('div', 'heading-top'); const eyebrow = node('p', 'eyebrow');
  eyebrow.append(node('span', 'type-chip', label));
  if (s.mode) eyebrow.append(node('span', 'mode-chip mode-' + s.mode, ({ manual: '⏵ Start in manual mode', plan: '⏸ Start in plan mode', librechat: 'In LibreChat, not Claude Code' })[s.mode] || s.mode));
  if (isHidden(current)) eyebrow.append(node('span', 'hidden-chip', 'Hidden · H to show'));
  const right = node('div', 'asg-top-right'); const trk = sdlcTrack(s); right.append(timerPill(s)); if (trk) right.append(trk); right.append(node('p', 'slide-count', countText(current)));
  top.append(eyebrow, right); head.append(top, node('h1', null, title));
  if (s.subtitle) head.append(node('p', 'subtitle', s.subtitle));
  if (s.repo?.url) {
    const link = node('a', 'asg-repo', s.repo.label || s.repo.url); link.href = s.repo.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    head.append(link);
  }
  stage.append(head);
  const body = node('div', 'asg-body'); const main = node('div', 'asg-main');
  const st = loadState(); const done = Array.isArray(st.done) ? st.done.slice() : [];
  const isCmd = p => /^[\/!][^\n]{0,40}$/.test(p);              // a short command (/memory, !npm test) shows as a chip, not a prompt box
  const ol = node('ol', 'asg-steps' + ((s.steps || []).length > 4 ? ' many' : '') + ((s.steps || []).some(t => t.prompt && !isCmd(t.prompt)) ? ' with-prompts' : '') + (s.calm ? ' calm' : ''));
  const copyBtn = text => { const b = node('button', 'asg-prompt-copy', 'Copy'); b.type = 'button';
    b.addEventListener('click', async e => { e.stopPropagation(); try { await navigator.clipboard.writeText(text); notify('Prompt copied'); b.textContent = 'Copied ✓'; setTimeout(() => { b.textContent = 'Copy'; }, 1800); } catch { notify('Select and copy the prompt manually.'); } });
    return b; };
  const inline = (s.steps || []).some(t => t.prompt && !isCmd(t.prompt));              // steps with their own prompt: no prompt box at the bottom
  (s.steps || []).forEach((t, i) => {
    const wide = !!window.ASG_WIDE;                                 // wide layout: no click-to-cross-out on steps
    const li = node('li', 'asg-step' + (done[i] && !wide ? ' done' : '')); li.style.setProperty('--i', i); if (!wide) li.tabIndex = 0;
    let label = t.text ?? t, where = t.where || null;              // wide layout (opt-in): "Type this in: X. Goal: …" → a where-chip [X] + the goal as the title
    if (window.ASG_WIDE && !where && typeof label === 'string') { const m = label.match(/^Type this in:\s*([^.]+?)\.\s*(?:Goal:\s*)?([\s\S]*)$/) || label.match(/^Open in (browser):\s*([\s\S]*)$/i); if (m) { where = m[1].replace(/^browser$/i, 'Browser'); label = /^https?:/i.test(m[2]) ? m[2] : m[2].charAt(0).toUpperCase() + m[2].slice(1); label = label.replace(/^([^.]*[^.\s])\.$/, '$1'); } }
    const text = node('span', 'asg-text');
    if (where && window.ASG_WIDE) text.append(node('span', 'asg-where ' + (/claude/i.test(where) ? 'w-cc' : /browser/i.test(where) ? 'w-web' : 'w-term'), where));
    text.append(document.createTextNode(where && !window.ASG_WIDE ? where + '. ' + label : label));
    const cmds = t.cmds || (t.prompt && isCmd(t.prompt) ? [t.prompt] : null);  // short commands: chips on the same line, 'then' between two
    (cmds || []).forEach((p, k) => { if (k) text.append(node('span', 'asg-cmd-then', 'then')); const c = node('span', 'asg-cmd' + (p[0] !== '!' ? ' no-copy' : '')); c.append(node('code', null, p)); if (p[0] === '!') c.append(copyBtn(p)); text.append(c); });  // only !commands get Copy; /exit, claude: just type them
    if (t.prompt && !isCmd(t.prompt)) { const pr = node('div', 'asg-step-prompt'); const cb = copyBtn(t.prompt);
      if (window.ASG_WIDE && t.prompt.length > 110) {           // wide layout: long prompts show one line; "show all" opens the whole prompt in the same box, growing down over the slide (layout stays the same); Copy copies the whole prompt
        pr.classList.add('folded'); const more = node('button', 'asg-more', 'show all'); more.type = 'button';
        const full = node('pre', 'asg-prompt-full', t.prompt);
        const setOpen = (o) => { if (o) pr.dataset.open = ''; else delete pr.dataset.open; more.textContent = o ? 'show less' : 'show all'; };   // a data attribute, not a class: fit-stage does not re-zoom
        more.addEventListener('click', (e) => { e.stopPropagation(); const o = !('open' in pr.dataset); document.querySelectorAll('.asg-step-prompt[data-open]').forEach((x) => { if (x !== pr) x.querySelector('.asg-more')?.click(); }); setOpen(o); });
        full.addEventListener('click', (e) => e.stopPropagation());
        if (!window.__asgPromptClose) { window.__asgPromptClose = true;
          document.addEventListener('click', () => document.querySelectorAll('.asg-step-prompt[data-open] .asg-more').forEach((b) => b.click()));
          document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelectorAll('.asg-step-prompt[data-open] .asg-more').forEach((b) => b.click()); }); }
        const col = node('div', 'asg-prompt-btns'); col.append(cb, more); pr.append(node('pre', 'asg-prompt-text', t.prompt), col, full);
      } else pr.append(node('pre', 'asg-prompt-text', t.prompt), cb);
      text.append(pr); }
    if (t.parts) { const row = node('span', 'asg-parts'); t.parts.forEach(([k, v]) => { const p = node('span', 'asg-part'); p.append(node('span', 'asg-part-k', k), node('code', null, v)); row.append(p); }); text.append(row); }  // the pieces of what Claude made, labelled: moment, matcher, command
    if (t.after) text.append(node('span', 'asg-step-after' + (t.warn ? ' warn' : ''), t.after));  // what you see once Claude is done; warn: the trap in this step
    li.append(node('span', 'asg-num', String(i + 1)), text);
    const flip = () => { done[i] = !done[i]; li.classList.toggle('done', !!done[i]); saveState({ ...loadState(), done }); };
    if (!wide) { li.addEventListener('click', flip); li.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } }); }
    ol.append(li);
  });
  main.append(ol);
  if (s.expected) { const p = node('p', 'asg-done'); p.append(node('span', 'asg-done-k', 'Done when'), node('span', null, s.expected)); main.append(p); }
  if (s.prompt && window.ASG_PROMPT && !inline) {
    const box = node('div', 'asg-prompt'), top = node('div', 'asg-prompt-top');
    top.append(node('span', 'asg-done-k', 'Prompt'), copyBtn(s.prompt)); box.append(top, node('pre', 'asg-prompt-text', s.prompt)); main.append(box);
  }
  body.append(main);
  const v = s.visual || {}; const side = node('aside', 'asg-side'); side.append(node('p', 'asg-side-k', v.shotLabel || 'What it looks like'));
  if (v.shot) { const f = node('figure', 'asg-shot'); const img = document.createElement('img'); img.src = v.shot; img.alt = v.shotLabel || 'Expected result'; f.append(img); side.append(f); }
  else if (v.cardImages) { const row = node('div', 'asg-thumbs'); v.cardImages.forEach((src, i) => { const f = node('figure', 'thumb'); const img = document.createElement('img'); img.src = src; img.alt = ''; f.append(img, node('figcaption', null, s.cards?.[i]?.title || '')); row.append(f); }); side.append(row); }
  else if (s.cards?.length) {
    const mini = node('div', 'slide-main asg-mini'); const grid = node('div', 'cards one-col'); s.cards.forEach((c, i) => grid.append(renderCard(c, i))); mini.append(grid); side.append(mini);
    body.append(side); stage.append(body);
    renderVisual(stage, body, mini, { ...s, visual: { ...v, bot: undefined, compact: undefined, cardImages: undefined } });
    return;
  }
  if (window.ASG_WIDE && v.shot) {                               // opt-in per deck: steps use the full width (two columns), the picture becomes a thumbnail in the header; click = big
    body.classList.add('solo', 'asg-wide'); head.classList.add('has-thumb');
    const th = node('button', 'asg-thumb'); th.type = 'button'; th.title = 'Click to enlarge';
    const img = document.createElement('img'); img.src = v.shot; img.alt = v.shotLabel || 'Expected result';
    th.append(node('span', 'asg-thumb-k', v.shotLabel || 'What it looks like'), img, node('span', 'asg-thumb-zoom', '🔍'));
    th.addEventListener('click', (e) => { e.stopPropagation();
      const box = node('div', 'asg-lightbox'); const big = document.createElement('img'); big.src = v.shot; big.alt = img.alt;
      box.append(node('p', 'asg-lightbox-k', (v.shotLabel || 'What it looks like') + ' · click or Esc to close'), big);
      const close = () => { box.remove(); document.removeEventListener('keydown', onKey, true); };
      const onKey = (ev) => { if (ev.key === 'Escape') { ev.stopPropagation(); ev.preventDefault(); close(); } };
      box.addEventListener('click', close); document.addEventListener('keydown', onKey, true); document.body.append(box); });
    head.append(th); stage.append(body); return;
  }
  if (v.shot || v.cardImages) body.append(side); else body.classList.add('solo');
  stage.append(body);
}

function render() {
  slideController?.abort(); slideController = new AbortController();
  const s = slides[current]; const type = slideType(s);
  document.body.classList.toggle('dark', !!s.dark);
  document.body.classList.toggle('is-assignment', type === 'practice');
  document.body.classList.toggle('big-word', !!s.visual?.bigWord);
  document.body.dataset.type = type;
  document.body.dataset.opener = s.visual?.anatomy ? 'anatomy' : s.visual?.opener || '';
  document.title = s.title + ' · Aetherlink classroom';
  const stage = $('stage'); stage.replaceChildren();
  if (s.layout === 'exercise') { renderAssignment(stage, s); finishRender(s); return; }
  if (type === 'practice') {
    const banner = node('div', 'assignment-banner');
    banner.append(node('span', 'dot'), document.createTextNode('Assignment in progress'));
    stage.append(banner);
  }
  const head = node('section', 'heading'); const top = node('div', 'heading-top'); const eyebrow = node('p', 'eyebrow');
  const parts = (s.kicker || '').split('·').map(x => x.trim());
  eyebrow.append(node('span', 'type-chip', TYPE_LABEL[type]), node('span', 'kicker-text', parts.join(' · ')));
  const trk = sdlcTrack(s);
  if (trk) { const r = node('div', 'top-right'); r.append(trk, node('p', 'slide-count', countText(current))); top.append(eyebrow, r); }
  else top.append(eyebrow, node('p', 'slide-count', countText(current)));
  if (isHidden(current)) eyebrow.append(node('span', 'hidden-chip', 'Hidden · H to show'));
  head.append(top, node('h1', null, s.title), node('p', 'subtitle', s.subtitle));
  if (s.source?.url) {
    const link = node('a', 'asg-repo', s.source.label || s.source.url); link.href = s.source.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    head.append(link);
  }
  stage.append(head);
  const body = node('div', 'slide-body'); const main = node('div', 'slide-main'); body.append(main); stage.append(body);
  renderLayout(main, s);
  renderTagline(main, s);
  renderVisual(stage, body, main, s);
  if (!s.visual?.anatomy) applyStepThrough(main, s);
  // ?embed=1&open=1 (presenter preview, opt-in per deck): show the slide with every click-to-open block already open
  if (EMBED_OPEN && (s.visual?.reveal === 'click' || s.visual?.sdlcLine || s.visual?.routeLine || s.visual?.trustMap || s.visual?.contractZoom || s.visual?.codeRoute || s.visual?.previewList || s.visual?.guardRail)) { for (let k = 0; k < 40 && window.__reveal?.(); k++); }
  const instructions = (s.visual?.anatomy || s.visual?.quiz || s.visual?.stamps || s.visual?.perCard || s.visual?.runner) ? null : renderInstructions(s);
  if (instructions) {
    const side = sideBySide(s, instructions);
    body.classList.toggle('with-side', side);
    if (side) body.append(instructions); else stage.append(instructions);
    if (side && s.visual?.compact) main.querySelectorAll(':scope > .timer').forEach(el => instructions.append(el)); // 48: timer under the steps
    if (s.visual?.cardImages) { const gal = node('div', 'thumb-gallery'); const row = node('div', 'thumb-row'); // 48: example avatars
      s.visual.cardImages.forEach((src, i) => { const f = node('figure', 'thumb'); const img = document.createElement('img'); img.src = src; img.alt = ''; f.style.setProperty('--i', i); f.append(img, node('figcaption', null, s.cards[i]?.title || '')); row.append(f); });
      gal.append(row); const t = instructions.querySelector(':scope > .timer'); if (side && t) t.before(gal); else (side ? instructions : main).append(gal); }
  }
  finishRender(s);
}
function finishRender(s) {
  $('prompt').hidden = !s.prompt;   // only where the prompt isn't already on the slide
  $('count').textContent = countText(current, true);
  renderProgress();
  $('prev').disabled = current === 0; $('next').disabled = current === slides.length - 1;
  announce('Slide ' + (current + 1) + ' of ' + slides.length + ': ' + s.title);
  if (!EMBED) broadcastSlide(current);
}
function go(n) { if (n < 0 || n >= slides.length) return; location.hash = String(n + 1); }
function fromHash() { if (location.hash === '#stage') { $('stage').focus(); return; } const n = Number(location.hash.slice(1)); current = Number.isInteger(n) && n >= 1 && n <= slides.length ? n - 1 : 0; render(); window.scrollTo({ top: 0, behavior: 'instant' }); }

$('prev').addEventListener('click', () => step(-1));
$('next').addEventListener('click', () => step(1));
$('prompt').addEventListener('click', () => showPrompt());
$('presenter').addEventListener('click', openPresenterView);
$('chapters').addEventListener('click', () => {
  const list = node('nav', 'chapter-list'); list.setAttribute('aria-label', 'All ' + slides.length + ' slides');
  const days = (window.CLASSROOM_SESSIONS || []).filter(d => d.deck === DECK);
  const parked = slides.findIndex(s => /^Parked ·/.test(s.title));
  slides.forEach((s, i) => {
    const day = days.find(d => d.start - 1 === i);                // a heading per day, and one for the parked slides
    if (day) list.append(node('h3', 'chapter-day', day.label));
    if (i === parked) list.append(node('h3', 'chapter-day parked', 'Parked · not presented'));
    const type = slideType(s);
    const row = node('div', 'chapter-row' + (isHidden(i) ? ' is-hidden' : ''));
    const b = node('button', 'chapter-link'); b.dataset.type = type;
    b.append(node('span', 'chapter-num', String(dayCount(i, DECK)[0]).padStart(2, '0')), node('span', 'chapter-type', TYPE_LABEL[type]), node('strong', null, s.title.replace(/^Parked · /, '')));
    b.setAttribute('aria-current', String(i === current)); b.addEventListener('click', () => { closePanel(); go(i); });
    const t = node('button', 'chapter-hide', isHidden(i) ? 'Show' : 'Hide'); t.setAttribute('aria-label', (isHidden(i) ? 'Show' : 'Hide') + ' slide ' + (i + 1));
    t.addEventListener('click', () => { const h = toggleHidden(i); row.classList.toggle('is-hidden', h); t.textContent = h ? 'Show' : 'Hide'; renderProgress(); if (i === current) render(); });
    row.append(b, t); list.append(row);
  });
  openPanel('Chapters', list);
  list.querySelector('[aria-current=true]')?.scrollIntoView({ block: 'center' });   // open where you are, not at slide 1
});
// Overview (only on decks whose toolbar has the button): opens in a new tab as a storyboard of every slide, all blocks open
const OVERVIEW_PAGE = new URLSearchParams(location.search).has('overview');
function openOverview() { window.open(DECK + '?overview=1#' + (current + 1), 'overview-' + DECK); }
$('overview')?.addEventListener('click', openOverview);
const EYE_ON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3l18 18"/><path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.6 6.6C3.8 8.4 2 12 2 12s3.5 7 10 7c1.9 0 3.5-.6 4.9-1.4"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>';
function renderOverviewPage() {
  document.documentElement.classList.add('ov-page'); document.title = 'Overview · ' + document.title;
  let sel = Math.min(Math.max(Number(location.hash.slice(1)) - 1 || 0, 0), slides.length - 1);
  const page = node('div', 'ov');
  const head = node('div', 'ov-head'); head.append(node('h2', null, 'Overview · all ' + slides.length + ' slides'), node('span', 'ov-hint', 'Click a slide to see it big · ← → to browse · Enter or double-click shows it in the deck tab · hover a slide and click the eye (or press H) to hide it'));
  // the big view on top (like Finder's gallery): the selected slide, all blocks open, with arrows
  const big = node('div', 'ov-big');
  const prev = node('button', 'ov-arrow', '←'); prev.setAttribute('aria-label', 'Previous slide');
  const next = node('button', 'ov-arrow', '→'); next.setAttribute('aria-label', 'Next slide');
  const screen = node('div', 'ov-screen'); const bf = document.createElement('iframe'); bf.tabIndex = -1; bf.setAttribute('aria-hidden', 'true'); bf.scrolling = 'no'; screen.append(bf);
  const info = node('div', 'ov-info'); const title = node('strong'); const notesBtn = node('button', 'ov-deck', 'Presenter notes'); const deckBtn = node('button', 'ov-deck', 'Show in deck ↗'); info.append(title, notesBtn, deckBtn);
  const review = node('div', 'ov-review'); review.hidden = true;   // opt-in per slide: slide.review = {to, text}, a note for a colleague, only on this page
  const col = node('div', 'ov-bigcol'); col.append(screen, info, review);
  // presenter notes of the selected slide, beside the big view (the presenter page in notes-only mode)
  const notes = node('div', 'ov-notes'); let nf = null;
  const showNotes = () => { try { nf?.contentWindow?.renderSlide?.(sel); } catch {} };
  const setNotes = (on) => {
    page.classList.toggle('notes-open', on); notesBtn.setAttribute('aria-pressed', String(on)); try { localStorage.setItem('als:ov-notes', on ? '1' : '0'); } catch {}
    if (on && !nf && window.PRESENTER_PAGE) { nf = document.createElement('iframe'); nf.title = 'Presenter notes'; nf.src = window.PRESENTER_PAGE + '?notes=1&i=' + sel; nf.addEventListener('load', showNotes); notes.append(nf); }
    if (on) showNotes();
  };
  notesBtn.addEventListener('click', () => setNotes(!page.classList.contains('notes-open')));
  big.append(prev, col, next, notes);
  const grid = node('div', 'ov-grid'); page.append(head, big, grid); document.body.append(page);
  // chevron: fold the big view away to see more of the grid; remembered per browser
  const fold = node('button', 'ov-fold'); fold.setAttribute('aria-controls', 'ov-big'); big.id = 'ov-big'; head.append(fold);
  if (window.OVERVIEW_SHEET) { const sh = node('a', 'ov-sheet', 'Overview sheet ↗'); sh.href = window.OVERVIEW_SHEET; sh.target = '_blank'; sh.rel = 'noopener'; sh.title = 'The cheat sheet for this day, in a new tab'; fold.before(sh); }   // opt-in per deck: a link to the day's cheat sheet
  const setFolded = (on) => { page.classList.toggle('big-folded', on); fold.innerHTML = '<span class="ov-chev">⌃</span> Preview'; fold.title = on ? 'Show the large preview' : 'Fold the large preview away'; fold.setAttribute('aria-expanded', String(!on)); try { localStorage.setItem('als:ov-folded', on ? '1' : '0'); } catch {} };
  let folded = false; try { folded = localStorage.getItem('als:ov-folded') === '1'; } catch {}
  setFolded(folded); fold.addEventListener('click', () => setFolded(!page.classList.contains('big-folded')));
  const fitBig = () => { const w = screen.clientWidth; bf.style.transform = 'scale(' + (w / 1600) + ')'; };
  new ResizeObserver(fitBig).observe(screen);
  const fit = (shot) => { const f = shot.querySelector('iframe'); if (f) f.style.transform = 'scale(' + (shot.clientWidth / 1600) + ')'; };
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return; const shot = e.target; io.unobserve(shot);
    const f = document.createElement('iframe'); f.tabIndex = -1; f.setAttribute('aria-hidden', 'true'); f.scrolling = 'no';
    f.src = DECK + '?embed=1&open=1#' + shot.dataset.n; shot.append(f); fit(shot);
  }), { root: grid, rootMargin: '400px' });
  const ro = new ResizeObserver((es) => es.forEach((e) => fit(e.target)));
  const showInDeck = (i) => {                          // the deck tab jumps to slide i and comes to the front (a named tab: Chrome ignores opener.focus())
    const name = 'deck-' + DECK;
    try { if (window.opener && !window.opener.closed) window.opener.name = name; } catch {}
    const w = window.open(DECK + '#' + (i + 1), name);
    if (!w) location.href = DECK + '#' + (i + 1);
  };
  const tiles = slides.map((s, i) => {
    const tile = node('button', 'ov-tile' + (isHidden(i) ? ' is-hidden' : '')); tile.dataset.type = slideType(s);
    const shot = node('div', 'ov-shot'); shot.dataset.n = String(i + 1);
    const cap = node('div', 'ov-cap'); cap.append(node('span', 'ov-num', String(i + 1)), node('strong', null, s.title));
    if (s.review) { const t = node('span', 'ov-review-tag', '✎ ' + (s.review.to || 'Review')); t.title = s.review.text; cap.append(t); }
    // eye on hover: hide or show this slide (same list as H in the deck: the arrows skip it); a hidden slide stays visible here, darker
    const eye = node('span', 'ov-eye'); eye.setAttribute('role', 'button'); eye.tabIndex = 0;
    const paintEye = () => { const h = isHidden(i); tile.classList.toggle('is-hidden', h); eye.innerHTML = h ? EYE_OFF : EYE_ON; eye.title = h ? 'Hidden: click to show this slide again' : 'Hide this slide (the arrows skip it)'; eye.setAttribute('aria-label', (h ? 'Show' : 'Hide') + ' slide ' + (i + 1)); };
    const flip = (e) => { e.stopPropagation(); e.preventDefault(); toggleHidden(i); paintEye(); if (i === sel) paintSel(); };
    eye.addEventListener('click', flip); eye.addEventListener('dblclick', (e) => e.stopPropagation());
    eye.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') flip(e); });
    shot.append(eye, node('span', 'ov-hidden-tag', 'Hidden')); paintEye(); tile._paintEye = paintEye;
    tile.append(shot, cap);
    tile.addEventListener('click', () => { if (page.classList.contains('big-folded')) setFolded(false); select(i); });
    tile.addEventListener('dblclick', () => showInDeck(i));
    grid.append(tile); io.observe(shot); ro.observe(shot); return tile;
  });
  function paintSel() {
    title.textContent = (sel + 1) + ' · ' + slides[sel].title + (isHidden(sel) ? '  (hidden)' : '');
    const r = slides[sel].review; review.hidden = !r; review.replaceChildren();
    if (r) review.append(node('strong', null, '✎ For ' + (r.to || 'review')), node('span', null, r.text));
  }
  function select(i) {
    sel = Math.min(Math.max(i, 0), slides.length - 1);
    tiles.forEach((t, k) => t.classList.toggle('is-current', k === sel));
    paintSel();
    try { if (bf.dataset.ready) bf.contentWindow.location.hash = String(sel + 1); else bf.src = DECK + '?embed=1&open=1#' + (sel + 1); } catch { bf.src = DECK + '?embed=1&open=1#' + (sel + 1); }
    history.replaceState(null, '', '#' + (sel + 1));
    prev.disabled = sel === 0; next.disabled = sel === slides.length - 1; showNotes();
    tiles[sel].scrollIntoView({ block: 'nearest' });
  }
  bf.addEventListener('load', () => { bf.dataset.ready = '1'; });
  prev.addEventListener('click', () => select(sel - 1)); next.addEventListener('click', () => select(sel + 1));
  deckBtn.addEventListener('click', () => showInDeck(sel));
  document.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); select(sel - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); select(sel + 1); }
    else if (e.key === 'Enter') { e.preventDefault(); showInDeck(sel); }
    else if (e.key === 'h' || e.key === 'H') { e.preventDefault(); toggleHidden(sel); tiles[sel]._paintEye(); paintSel(); }
  });
  window.addEventListener('storage', (e) => { if (e.key === HIDDEN_KEY || e.key === SHOWN_KEY) { tiles.forEach((t) => t._paintEye()); paintSel(); } });   // hidden in the deck (H) → darker here too
  select(sel);
  let notesOn = false; try { notesOn = localStorage.getItem('als:ov-notes') === '1'; } catch {} if (notesOn) setNotes(true);
}
// generic timer in the toolbar (any slide): same look as the pause slides, one shared timer
let timerCtl = null;
$('timer-btn')?.addEventListener('click', () => {
  timerCtl?.abort(); timerCtl = new AbortController();
  const box = ALSTimer.mount({ key: 'als:timer:toolbar', defaultSec: 0, minutes: true, back: true, boxCls: 'pause-box toolbar-timer', faceCls: 'pause-clock', lateCls: 'late', signal: timerCtl.signal });
  openPanel('Timer', box);
});
$('fullscreen').addEventListener('click', async () => { try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); } catch { notify('Fullscreen is unavailable in this browser.'); } });
document.addEventListener('fullscreenchange', () => $('fullscreen').setAttribute('aria-label', document.fullscreenElement ? 'Exit fullscreen' : 'Enter fullscreen'));
document.addEventListener('keydown', e => {
  if (EMBED) return;
  if (OVERVIEW_PAGE) return;
  if (panel.open || e.altKey || e.ctrlKey || e.metaKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.target.closest('[role=tablist]')) return;
  if ((e.key === 'g' || e.key === 'G') && $('overview')) { e.preventDefault(); openOverview(); return; }
  if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); if (window.__reveal?.()) return; step(1); }
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); if (window.__revealBack?.()) return; step(-1); }   // opt-in per visual: step back inside the slide first
  if (e.key === 'Home') { e.preventDefault(); const n = visibleFrom(0, 1); if (n !== null) go(n); }
  if (e.key === 'End') { e.preventDefault(); const n = visibleFrom(slides.length - 1, -1); if (n !== null) go(n); }
  if (e.key === 'h' || e.key === 'H') { e.preventDefault(); const h = toggleHidden(current); notify(h ? 'Slide hidden — the arrows will skip it (H to show again)' : 'Slide shown again'); render(); return; }
  if ((e.key === 'b' || e.key === 'B') && window.__planB) { e.preventDefault(); window.__planB(); return; }
  if (e.key === 's' || e.key === 'S') { e.preventDefault(); openPresenterView(); }
});
window.addEventListener('pagehide', () => { slideController?.abort(); });
if (!OVERVIEW_PAGE && !EMBED && (!window.name || window.name.startsWith('deck-'))) window.name = 'deck-' + DECK;   // lets the Overview's “Show in deck” find and focus this tab
if (OVERVIEW_PAGE) renderOverviewPage(); else {
window.addEventListener('hashchange', fromHash);
window.addEventListener('storage', (e) => { if (!EMBED && (e.key === HIDDEN_KEY || e.key === SHOWN_KEY)) render(); });   // hidden or shown in the Overview → progress bar and "Hidden" chip follow
fromHash();
}
