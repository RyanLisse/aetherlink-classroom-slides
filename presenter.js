'use strict';
/* ==========================================================================
   Presenter view — a separate window/tab kept in sync with the main deck.
   Sync channel: BroadcastChannel('aetherlink-classroom-slides'), same name
   the main app.js broadcasts on. Falls back to a localStorage 'storage'
   event for browsers without BroadcastChannel (older Safari/WebViews).
   Shows: a live preview of the current and next slide (index.html?embed=1 in
   an iframe), keyword bullets (keyPoints) above the full notes text, and the
   same timer as the deck (timers.js, shared through localStorage).
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
const DECK_ID = window.DECK_PAGE || 'index.html';
const PRESENTER_CHANNEL = 'aetherlink-classroom-slides:' + DECK_ID;
const PRESENTER_KEY = 'als:presenter:index:' + DECK_ID;
const HIDDEN_KEY = 'als:hidden:' + DECK_ID;
const SHOWN_KEY = 'als:shown:' + DECK_ID;
const $ = id => document.getElementById(id);

let current = 0;
const startedAt = Date.now();
let timerController = null;

function setSyncStatus(live) {
  $('sync-status').classList.toggle('live', live);
  $('sync-label').textContent = live ? 'Live — following the main window' : 'Waiting for the main window…';
}

function renderElapsed() { $('elapsed').textContent = ALSTimer.fmt(Math.floor((Date.now() - startedAt) / 1000)); }
setInterval(renderElapsed, 1000);
renderElapsed();

/* ---- slide previews: the real deck in an iframe, scaled to fit ---- */
function fitShot(shot) { const f = shot.querySelector('iframe'); f.style.transform = 'scale(' + (shot.clientWidth / 1600) + ')'; }
function showInFrame(frame, index) {
  if (index == null) { frame.parentElement.hidden = true; return; }
  frame.parentElement.hidden = false;
  const hash = '#' + (index + 1);
  // once the deck has loaded inside the frame, only change its hash (no reload); before that, (re)load it
  try { if (frame.dataset.ready) { frame.contentWindow.location.hash = hash; return; } } catch {}
  frame.src = (window.DECK_PAGE || 'index.html') + '?embed=1' + hash;
}
[$('p-frame'), $('p-next-frame')].forEach(f => f.addEventListener('load', () => { f.dataset.ready = '1'; }));
const ro = new ResizeObserver(entries => entries.forEach(e => fitShot(e.target)));
[$('p-shot'), $('p-next-shot')].forEach(el => ro.observe(el));

function isHidden(i) {
  const id = i + ':' + slides[i].title; const list = k => { try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch { return []; } };
  return slides[i].hidden ? !list(SHOWN_KEY).includes(id) : list(HIDDEN_KEY).includes(id);
}

/* ---- the timer for this slide, if it has one (assignment, break or quiet timer) ---- */
function setupTimer(s) {
  timerController?.abort(); timerController = new AbortController();
  const slot = $('p-timer-slot'); slot.replaceChildren();
  const v = s.visual || {}; const key = ALSTimer.key(current, s.title); let box = null, label = '';
  if (s.layout === 'exercise') { label = 'This assignment'; box = ALSTimer.mount({ key, defaultSec: 0, minutes: true, bar: true, doneText: 'TIME', signal: timerController.signal }); }
  else if (v.countdown) { label = 'Break'; box = ALSTimer.mount({ key, defaultSec: v.countdown * 60, back: true, boxCls: 'pause-box', faceCls: 'pause-clock', lateCls: 'late', signal: timerController.signal }); }
  else if (v.quietTimer) { label = 'Quiet time'; box = ALSTimer.mount({ key, defaultSec: v.quietTimer * 60, boxCls: 'pause-box quiet', faceCls: 'pause-clock', lateCls: 'late', lateAt: 30, signal: timerController.signal }); }
  $('p-timer').hidden = !box; $('p-timer-label').textContent = label; if (box) slot.append(box);
}

// notes: a blank line starts a new paragraph; a line that starts with "Label:" (Why now, Watch for, If stuck…) gets the label in bold
function renderNotes(el, text) {
  el.replaceChildren(...text.split(/\n{2,}/).map(par => {
    const p = document.createElement('span'); p.className = 'p-note-par';
    par.split('\n').forEach((line, i) => {
      if (i) p.append(document.createElement('br'));
      const m = /^([A-Z][A-Za-z ?/]{1,24}):\s+/.exec(line);
      if (m) { const b = document.createElement('strong'); b.textContent = m[1] + ': '; p.append(b, line.slice(m[0].length)); } else p.append(line);
    });
    return p;
  }));
}

// teach: an optional coloured teaching card (presenter only). Fixed sections, each a short list.
// Text between `backticks` is shown as code.
// script: numbered beats in the order you perform them; each beat {do, say, ask} (any may be left out).
const TEACH_SECTIONS = [
  ['do', 'They build', 'left'], ['done', 'Done when', 'left'],
  ['learn', 'They learn', 'right'], ['watch', 'Watch for', 'right'], ['terms', 'If they ask', 'right']
];
function renderScript(beats) {
  const sec = document.createElement('section'); sec.className = 't-script';
  const h = document.createElement('h3'); h.textContent = 'Script'; sec.append(h);
  const ol = document.createElement('ol');
  for (const b of beats) {
    const li = document.createElement('li');
    // A question step reads in the order it happens: do → question → answer → what you say next.
    // The answer is `answer`, or a leading "(Answer: …)" / "(…)" in `say`.
    let say = b.say || '', answer = b.answer || '', note = '';
    const m = b.ask && !answer && /^\(([^)]*)\)\s*/.exec(say);
    if (m) {
      say = say.slice(m[0].length);
      const a = /^Answers?:\s*/.exec(m[1]);
      if (a) answer = m[1].slice(a[0].length); else note = m[1];
    }
    const lines = b.ask
      ? [[b.do, 't-b-do', '▶ '], [b.ask, 't-b-ask', '? Ask: '], [answer, 't-b-answer', '✓ Answer: '], [note, 't-b-note', '→ '], [say, 't-b-say', '']]
      : [[b.do, 't-b-do', '▶ '], [say, 't-b-say', '']];
    // warn: a red reminder at the top of the beat
    if (b.warn) lines.unshift([b.warn, 't-b-warn', '⚠ ']);
    for (const [text, cls, prefix] of lines) {
      if (!text) continue;
      const p = document.createElement('p'); p.className = cls; teachText(p, prefix + text); li.append(p);
    }
    if (b.copy) {
      // copy: [[label, text], …] texts to paste in this step
      const box = document.createElement('div'); box.className = 't-copy t-copy-inline';
      for (const [label, text] of b.copy) box.append(...copyItem(label, text));
      li.append(box);
    }
    if (b.clip) {
      // a short screen recording of this step; click opens it full size in a new tab
      const v = document.createElement('video');
      Object.assign(v, { src: b.clip, muted: true, loop: true, autoplay: true, playsInline: true, preload: 'metadata', className: 't-clip', title: 'Click to open full size' });
      v.addEventListener('click', () => window.open(b.clip, '_blank'));
      li.append(v);
    }
    ol.append(li);
  }
  sec.append(ol); return sec;
}
function teachText(el, text) {
  String(text).split('`').forEach((part, i) => {
    if (i % 2) { const c = document.createElement('code'); c.textContent = part; el.append(c); } else el.append(part);
  });
}
// copy: [[label, text], …] texts to paste during the demo (tickets, prompts); click a box to copy it
function copyItem(label, text) {
  const head = document.createElement('div'); head.className = 't-copy-head';
  const b = document.createElement('strong'); b.className = 't-copy-label'; b.textContent = label;
  const btn = document.createElement('button'); btn.type = 'button'; btn.className = 't-copy-btn'; btn.textContent = 'Copy';
  const pre = document.createElement('pre'); pre.className = 't-copy-box'; pre.textContent = text; pre.title = 'Click to copy';
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); } catch { const r = document.createRange(); r.selectNodeContents(pre); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); document.execCommand('copy'); }
    pre.classList.add('copied'); btn.textContent = 'Copied ✓'; btn.classList.add('copied');
    setTimeout(() => { pre.classList.remove('copied'); btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1500);
  };
  btn.addEventListener('click', copy); pre.addEventListener('click', copy);
  head.append(b, btn); return [head, pre];
}
function renderCopy(items) {
  const sec = document.createElement('section'); sec.className = 't-sec t-copy';
  const h = document.createElement('h3'); h.textContent = 'Copy-paste'; sec.append(h);
  for (const [label, text] of items) sec.append(...copyItem(label, text));
  return sec;
}
function renderTeach(el, t) {
  el.hidden = !t; if (!t) { el.replaceChildren(); return; }
  const gist = document.createElement('p'); gist.className = 't-gist';
  if (t.time) { const b = document.createElement('span'); b.className = 't-time'; b.textContent = t.time; gist.append(b); }
  teachText(gist, t.gist || '');
  const cols = { left: document.createElement('div'), right: document.createElement('div') };
  if (t.script && t.script.length) cols.left.append(renderScript(t.script));
  if (t.copy && t.copy.length) cols.right.append(renderCopy(t.copy));
  for (const [key, label, col] of TEACH_SECTIONS) {
    const items = t[key]; if (!items || !items.length) continue;
    const sec = document.createElement('section'); sec.className = 't-sec t-' + key;
    const h = document.createElement('h3'); h.textContent = label;
    const ul = document.createElement('ul');
    for (const item of items) {
      const li = document.createElement('li');
      if (Array.isArray(item)) { const b = document.createElement('strong'); teachText(b, item[0]); li.append(b, ' — '); teachText(li, item[1]); }
      else teachText(li, item);
      ul.append(li);
    }
    sec.append(h, ul); cols[col].append(sec);
  }
  const grid = document.createElement('div'); grid.className = 't-grid'; grid.append(cols.left, cols.right);
  el.replaceChildren(gist, grid);
  if (t.next) { const n = document.createElement('p'); n.className = 't-next'; teachText(n, 'Next → ' + t.next); el.append(n); }
}

function renderSlide(index) {
  if (!Number.isInteger(index) || index < 0 || index >= slides.length) return;
  current = index;
  const s = slides[current];
  const type = s.type || (s.layout === 'exercise' ? 'practice' : s.layout === 'recap' ? 'recap' : 'context');
  const TYPE_LABEL = { practice: 'Assignment', concept: 'Concept', demo: 'Demo', review: 'Review', quiz: 'Quiz', recap: 'Recap', pause: 'Break', context: 'Context' };
  $('ptype-wrap').dataset.ptype = type;
  $('p-type-label').textContent = TYPE_LABEL[type] || 'Context';
  $('p-kicker-text').textContent = s.kicker || '';
  $('p-progress').textContent = dayCount(current, DECK_ID).join(' / ');
  $('p-hidden').hidden = !isHidden(current);
  $('p-title').textContent = s.title;
  const keys = s.keyPoints || [];
  $('p-keys-block').hidden = !keys.length;
  $('p-keys').replaceChildren(...keys.map(k => { const li = document.createElement('li'); li.textContent = k; return li; }));
  if (s.notes) renderNotes($('p-notes'), s.notes); else $('p-notes').textContent = 'No facilitator notes on this slide.';
  $('p-notes').classList.toggle('p-empty', !s.notes);
  if ($('p-teach')) {
    renderTeach($('p-teach'), s.teach);
    if (s.teach) $('p-keys-block').hidden = true;
    if ($('p-full')) $('p-full').open = !s.teach;
  }
  const promptBlock = $('p-prompt-block');
  if (s.prompt) { promptBlock.hidden = false; $('p-prompt').textContent = s.prompt; } else { promptBlock.hidden = true; }
  showInFrame($('p-frame'), current);
  renderNext();
  setupTimer(s);
}
function renderNext() {
  let nextIndex = current + 1 < slides.length ? current + 1 : null;
  if (window.PRESENTER_SKIP_HIDDEN) { nextIndex = null; for (let n = current + 1; n < slides.length; n++) if (!isHidden(n)) { nextIndex = n; break; } }   // opt-in: Next shows the slide the arrows go to (hidden ones skipped)
  $('p-next-title').textContent = nextIndex != null ? (nextIndex + 1) + '. ' + slides[nextIndex].title : 'This is the last slide.';
  showInFrame($('p-next-frame'), nextIndex);
}

/* ---- sync ---- */
// ?notes=1: notes only, for the deck's Overview page. No sync with the main window: the Overview tells it which slide to show.
const NOTES_ONLY = new URLSearchParams(location.search).has('notes');
if (NOTES_ONLY) document.documentElement.classList.add('notes-only');
let channel = null;
try { if (!NOTES_ONLY && 'BroadcastChannel' in window) channel = new BroadcastChannel(PRESENTER_CHANNEL); } catch {}
if (channel) {
  channel.addEventListener('message', e => { if (e.data && e.data.type === 'slide') { setSyncStatus(true); renderSlide(e.data.index); } });
}
window.addEventListener('storage', e => {
  if (NOTES_ONLY) return;
  if (e.key === HIDDEN_KEY || e.key === SHOWN_KEY) { $('p-hidden').hidden = !isHidden(current); if (window.PRESENTER_SKIP_HIDDEN) renderNext(); return; }
  if (e.key !== PRESENTER_KEY || !e.newValue) return;
  try { const data = JSON.parse(e.newValue); setSyncStatus(true); renderSlide(data.index); } catch {}
});

/* ---- initial paint: URL param, then whatever localStorage already has ---- */
(function init() {
  const params = new URLSearchParams(location.search);
  const fromUrl = Number(params.get('i'));
  if (Number.isInteger(fromUrl) && fromUrl >= 0 && fromUrl < slides.length) { renderSlide(fromUrl); }
  if (NOTES_ONLY) return;
  try {
    const stored = JSON.parse(localStorage.getItem(PRESENTER_KEY) || 'null');
    if (stored && Number.isInteger(stored.index)) { renderSlide(stored.index); if (Date.now() - (stored.at || 0) < 15000) setSyncStatus(true); }
  } catch {}
  if (!slides.length) { $('p-title').textContent = 'slides.js did not load.'; }
})();
