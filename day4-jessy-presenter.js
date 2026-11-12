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
// seq items: {goal}, {how: [...]}, {do}, {run: [label, command]}, {now: [label, code]} (read-only: what's in the file now), {paste: [label, code]} (into a file), {tell: [...]}, {see: [...]}, {me: [...]}, {ask, answer}, {clip}
function renderSeq(li, seq) {
  const cap = (cls, text) => { const c = document.createElement('p'); c.className = 't-seq-cap ' + cls; c.textContent = text; return c; };
  const list = (items, tag, cls) => { const l = document.createElement(tag); l.className = cls; for (const it of items) { const x = document.createElement('li'); teachText(x, it); l.append(x); } return l; };
  for (const s of seq) {
    const part = document.createElement('div'); part.className = 't-seq';
    if (s.goal) { part.classList.add('t-seq-goal'); part.append(cap('t-cap-goal', '🎯 Goal')); const g = document.createElement('p'); g.className = 't-goal'; teachText(g, s.goal); part.append(g); }
    if (s.how) { part.classList.add('t-seq-how'); part.append(cap('t-cap-how', '⚙ What it really does'), list(s.how, 'ol', 't-flow')); }
    if (s.do) { part.classList.add('t-seq-do'); const p = document.createElement('p'); p.className = 't-b-do'; teachText(p, '▶ You do: ' + s.do); part.append(p); }
    if (s.run) {
      part.classList.add('t-seq-run'); part.append(cap('t-cap-run', '📋 Copy → paste in the terminal → Enter'));
      const box = document.createElement('div'); box.className = 't-copy t-copy-inline'; box.append(...copyItem(s.run[0], s.run[1])); part.append(box);
    }
    if (s.now) {
      part.classList.add('t-seq-now'); part.append(cap('t-cap-now', '👀 What is in the file now'));
      const l = document.createElement('p'); l.className = 't-now-label'; teachText(l, s.now[0]);
      const pre = document.createElement('pre'); pre.className = 't-now-box'; pre.textContent = s.now[1]; part.append(l, pre);
    }
    if (s.paste) {
      part.classList.add('t-seq-paste'); part.append(cap('t-cap-paste', '📝 Copy → paste in the file → save (Cmd+S)'));
      const box = document.createElement('div'); box.className = 't-copy t-copy-inline'; box.append(...copyItem(s.paste[0], s.paste[1])); part.append(box);
    }
    if (s.tell) { part.classList.add('t-seq-tell'); part.append(cap('t-cap-tell', '💬 Explain to students'), list(s.tell, 'ul', 't-say-list')); }
    if (s.see) { part.classList.add('t-seq-see'); part.append(cap('t-cap-see', 'What you see'), list(s.see, 'ol', 't-flow')); }
    if (s.me) { part.classList.add('t-seq-me'); part.append(cap('t-cap-me', 'For you (not to say)'), list(s.me, 'ul', 't-say-list')); }
    if (s.ask) {
      const p = document.createElement('p'); p.className = 't-b-ask'; teachText(p, '? Ask: ' + s.ask); part.append(p);
      if (s.answer) { const a = document.createElement('p'); a.className = 't-b-answer'; teachText(a, '✓ Answer: ' + s.answer); part.append(a); }
    }
    if (s.clip) {
      const v = document.createElement('video');
      Object.assign(v, { src: s.clip, muted: true, loop: true, autoplay: true, playsInline: true, preload: 'metadata', className: 't-clip', title: 'Click to play large here' });
      v.addEventListener('click', () => openClip(s.clip));
      part.append(cap('t-cap-see', '🎬 Clip (if you don\'t run it live)'), v);
    }
    li.append(part);
  }
}
// Clip player: a click on a clip plays it large inside the presenter view (no new tab). Close: ×, Esc, or click beside it.
function openClip(src) {
  document.querySelector('.t-clipbox')?.remove();
  const box = document.createElement('div'); box.className = 't-clipbox';
  const v = document.createElement('video');
  Object.assign(v, { src, controls: true, autoplay: true, muted: true, loop: true, playsInline: true });
  const x = document.createElement('button'); x.type = 'button'; x.className = 't-clipbox-x'; x.textContent = '×'; x.title = 'Close (Esc)';
  const close = () => { box.remove(); document.removeEventListener('keydown', onKey, true); };
  const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
  x.addEventListener('click', close);
  box.addEventListener('click', (e) => { if (e.target === box) close(); });
  document.addEventListener('keydown', onKey, true);
  box.append(v, x); document.body.append(box);
}
// Collapsible blocks: a beat with a label folds under its heading; closed by default, remembered per slide
const FOLD_OPEN = new Set(); let foldScope = '';
function setFold(li, open) { li.classList.toggle('t-folded', !open); const k = li.dataset.foldKey; if (open) FOLD_OPEN.add(k); else FOLD_OPEN.delete(k); }
function foldBeat(li) {
  const label = li.querySelector(':scope > .t-b-label'); if (!label) return li;
  const body = document.createElement('div'); body.className = 't-b-body';
  for (const n of [...li.childNodes]) if (n !== label) body.append(n);
  li.append(body); li.classList.add('t-foldable');
  li.dataset.foldKey = foldScope + '|' + label.textContent;
  li.classList.toggle('t-folded', !FOLD_OPEN.has(li.dataset.foldKey));
  label.setAttribute('role', 'button'); label.tabIndex = 0; label.title = 'Click to open or close';
  const toggle = () => setFold(li, li.classList.contains('t-folded'));
  label.addEventListener('click', toggle);
  label.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  return li;
}
// Open all / Close all: every collapsible block in the notes at once (buttons at the top, or keys O / C)
function foldAll(open) { for (const li of document.querySelectorAll('li.t-foldable')) setFold(li, open); updateFoldBar(); }
function updateFoldBar() {
  const all = document.querySelectorAll('li.t-foldable'), shut = document.querySelectorAll('li.t-foldable.t-folded');
  for (const c of document.querySelectorAll('.t-fold-count')) c.textContent = (all.length - shut.length) + ' of ' + all.length + ' open';
}
document.addEventListener('click', (e) => { if (e.target.closest && e.target.closest('.t-foldable > .t-b-label')) updateFoldBar(); });
document.addEventListener('keydown', (e) => {
  if (e.target.closest && e.target.closest('input, textarea, [contenteditable="true"]')) return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key === 'o' || e.key === 'O') foldAll(true);
  else if (e.key === 'c' || e.key === 'C') foldAll(false);
});
function renderScript(beats) {
  const sec = document.createElement('section'); sec.className = 't-script';
  const h = document.createElement('h3'); h.textContent = 'Script'; sec.append(h);
  const ol = document.createElement('ol');
  for (const b of beats) {
    const li = document.createElement('li');
    // A question step reads in the order it happens: do → question → answer → what you say next.
    // The answer is `answer`, or a leading "(Answer: …)" / "(…)" in `say`.
    // say may be a list of short lines: shown as bullets instead of one paragraph
    const sayList = Array.isArray(b.say) ? b.say : null;
    let say = sayList ? '' : (b.say || ''), answer = b.answer || '', note = '';
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
    // label: a block heading above the beat (e.g. "Tour through the code")
    if (b.label) { li.classList.add('t-b-labelled'); const h = document.createElement('p'); h.className = 't-b-label'; teachText(h, b.label); li.append(h); }
    // seq: the parts of this beat in the order you do them, each with its own caption
    if (b.seq) { if (b.warn) { const p = document.createElement('p'); p.className = 't-b-warn'; teachText(p, '⚠ ' + b.warn); li.append(p); } renderSeq(li, b.seq); ol.append(foldBeat(li)); continue; }
    // flow: numbered list (e.g. the files a command passes through), shown before what you say
    const flowList = () => { const ol2 = document.createElement('ol'); ol2.className = 't-flow'; for (const item of b.flow) { const li2 = document.createElement('li'); teachText(li2, item); ol2.append(li2); } return ol2; };
    let flowDone = !b.flow;
    for (const [text, cls, prefix] of lines) {
      if (!text) continue;
      if (cls === 't-b-say' && !flowDone) { li.append(flowList()); flowDone = true; }
      const p = document.createElement('p'); p.className = cls; teachText(p, prefix + text); li.append(p);
    }
    if (!flowDone) li.append(flowList());
    if (sayList) { const ul = document.createElement('ul'); ul.className = 't-say-list'; for (const line of sayList) { const li2 = document.createElement('li'); teachText(li2, line); ul.append(li2); } li.append(ul); }
    if (b.copy) {
      // copy: [[label, text], …] texts to paste in this step
      const box = document.createElement('div'); box.className = 't-copy t-copy-inline';
      for (const [label, text] of b.copy) box.append(...copyItem(label, text));
      li.append(box);
    }
    if (b.clip) {
      // a short screen recording of this step; click opens it full size in a new tab
      const v = document.createElement('video');
      Object.assign(v, { src: b.clip, muted: true, loop: true, autoplay: true, playsInline: true, preload: 'metadata', className: 't-clip', title: 'Click to play large here' });
      v.addEventListener('click', () => openClip(b.clip));
      li.append(v);
    }
    ol.append(foldBeat(li));
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
  foldScope = t.gist || ''; if (t.script && t.script.length) cols.left.append(renderScript(t.script));
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
  el.replaceChildren(gist);
  // links: [[label, url, note?], …] a coloured box at the top with a clickable link and a Copy button
  if (t.links && t.links.length) {
    const box = document.createElement('div'); box.className = 't-links';
    for (const [label, url, note] of t.links) {
      const row = document.createElement('div'); row.className = 't-link';
      const b = document.createElement('strong'); b.textContent = label;
      const a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = url;
      const btn = document.createElement('button'); btn.type = 'button'; btn.className = 't-copy-btn'; btn.textContent = 'Copy';
      btn.addEventListener('click', async () => { try { await navigator.clipboard.writeText(url); } catch {} btn.textContent = 'Copied ✓'; setTimeout(() => { btn.textContent = 'Copy'; }, 1500); });
      row.append(b, a, btn);
      if (note) { const n = document.createElement('p'); n.className = 't-link-note'; teachText(n, note); row.append(n); }
      box.append(row);
    }
    el.append(box);
  }
  if (grid.querySelector('li.t-foldable')) {
    const bar = document.createElement('div'); bar.className = 't-fold-bar';
    for (const [txt, open, key] of [['▾ Open all', true, 'O'], ['▸ Close all', false, 'C']]) {
      const btn = document.createElement('button'); btn.type = 'button'; btn.className = 't-fold-btn'; btn.textContent = txt;
      btn.title = 'Shortcut: press ' + key; btn.addEventListener('click', () => foldAll(open)); bar.append(btn);
    }
    const cnt = document.createElement('span'); cnt.className = 't-fold-count'; bar.append(cnt);
    const k = document.createElement('span'); k.className = 't-fold-keys'; k.textContent = 'keys: O = open all · C = close all'; bar.append(k);
    el.append(bar);
  }
  el.append(grid); updateFoldBar();
  if (t.next) { const n = document.createElement('p'); n.className = 't-next'; teachText(n, 'Next → ' + t.next); el.append(n); }
}

/* ---- live vs. preview: `live` is the slide on the main screen; `current` is the slide shown here.
   Clicking the next-slide card, the ◀ ▶ buttons or the arrow keys previews another slide's notes
   without moving the main screen. Back to live (or Esc, or the main screen changing) returns. ---- */
let live = 0, peeking = false;
function renderSlide(index, isPeek = false) {
  if (!Number.isInteger(index) || index < 0 || index >= slides.length) return;
  if (!isPeek) { live = index; peeking = false; }
  current = index;
  const s = slides[current];
  const type = s.type || (s.layout === 'exercise' ? 'practice' : s.layout === 'recap' ? 'recap' : 'context');
  const TYPE_LABEL = { practice: 'Assignment', concept: 'Concept', review: 'Review', quiz: 'Quiz', recap: 'Recap', pause: 'Break', context: 'Context' };
  $('ptype-wrap').dataset.ptype = type;
  $('p-type-label').textContent = TYPE_LABEL[type] || 'Context';
  $('p-kicker-text').textContent = s.kicker || '';
  $('p-progress').textContent = dayCount(current, 'index.html').join(' / ');
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
  const nextIndex = current + 1 < slides.length ? current + 1 : null;
  $('p-next-title').textContent = nextIndex != null ? (nextIndex + 1) + '. ' + slides[nextIndex].title : 'This is the last slide.';
  showInFrame($('p-frame'), current);
  showInFrame($('p-next-frame'), nextIndex);
  if (!isPeek) setupTimer(s);
  updatePeekUI();
}
function peekAt(i) {
  if (!Number.isInteger(i) || i < 0 || i >= slides.length) return;
  if (i === live) { goLive(); return; }
  peeking = true; renderSlide(i, true); window.scrollTo({ top: 0, behavior: 'smooth' });
}
function goLive() { peeking = false; renderSlide(live); }

const PEEK_CSS = `
  .p-nav{display:flex;gap:.5rem;margin-bottom:.8rem}
  .p-nav button{flex:1;font:inherit;font-size:.85rem;font-weight:650;padding:.55rem .7rem;border-radius:10px;border:1px solid var(--border);background:var(--surface2);color:var(--text);cursor:pointer}
  .p-nav button:hover:not(:disabled){border-color:var(--cyan);color:var(--cyan)}
  .p-nav button:disabled{opacity:.4;cursor:default}
  .p-nav .p-live-btn{flex:1.3;background:color-mix(in srgb,var(--ok) 18%,var(--surface2));border-color:var(--ok)}
  .p-next.p-next-click{cursor:pointer;transition:border-color .15s}
  .p-next.p-next-click:hover{border-color:var(--cyan);border-style:solid}
  .p-next-hint{font-size:.72rem;color:var(--muted);margin:.45rem 0 0}
  .p-peek{display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;margin:0 0 1rem;padding:.7rem 1rem;border-radius:12px;border:1px solid var(--cyan);background:color-mix(in srgb,var(--cyan) 14%,transparent);font-weight:650}
  .p-peek[hidden],.p-nav button[hidden]{display:none}
  .t-b-labelled{border-color:var(--cyan)!important}
  .t-b-label{margin:0 0 .45rem;font-size:.72rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--cyan)}
  .t-flow{margin:.5rem 0 0;padding-left:1.3rem;display:grid;gap:.35rem;font-size:.92rem;line-height:1.45}
  .t-flow code{font-size:.85em}
  .t-script .t-say-list{margin:.4rem 0 0;padding-left:1.15rem;list-style:disc;display:grid;gap:.25rem;line-height:1.45}
  .t-script .t-say-list li{counter-increment:none;padding:0;background:none;border:0;border-radius:0}
  .t-script .t-say-list li::before{content:none}
  .t-script .t-say-list li::marker{color:var(--aether-orange)}
  .t-foldable > .t-b-label{cursor:pointer;user-select:none;display:flex;align-items:center;gap:.45rem}
  .t-foldable > .t-b-label::before{content:'▾';display:inline-block;transition:transform .15s;font-size:.9em}
  .t-foldable.t-folded > .t-b-label::before{transform:rotate(-90deg)}
  .t-foldable.t-folded > .t-b-body{display:none}
  .t-foldable.t-folded > .t-b-label{margin-bottom:0}
  .t-fold-bar{position:sticky;top:0;z-index:5;display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;margin:.6rem 0;padding:.45rem .7rem;border-radius:10px;background:#1b2130;border:1px solid rgba(94,234,212,.35);box-shadow:0 4px 12px rgba(0,0,0,.35)}
  .t-fold-btn{font:inherit;font-size:.85rem;font-weight:600;padding:.3rem .8rem;border-radius:999px;border:1px solid rgba(94,234,212,.5);background:rgba(94,234,212,.1);color:#ccfbf1;cursor:pointer}
  .t-fold-btn:hover{background:rgba(94,234,212,.25);color:#fff}
  .t-clipbox{position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center;background:rgba(5,8,15,.82);padding:3vh 3vw}
  .t-clipbox video{max-width:100%;max-height:100%;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,.6);background:#000}
  .t-clipbox-x{position:absolute;top:1.2rem;right:1.6rem;font-size:2rem;line-height:1;width:2.6rem;height:2.6rem;border-radius:50%;border:1px solid rgba(255,255,255,.4);background:rgba(0,0,0,.5);color:#fff;cursor:pointer}
  .t-clipbox-x:hover{border-color:#5eead4;color:#5eead4}
  .t-fold-count{font-size:.8rem;opacity:.85;margin-left:.3rem}
  .t-fold-keys{font-size:.72rem;opacity:.55;margin-left:auto}
  .t-seq{margin:.55rem 0 0;padding:.5rem .7rem;border-radius:10px;border-left:4px solid transparent;background:rgba(255,255,255,.025)}
  .t-seq-do{border-left-color:#a78bfa}
  .t-seq-run{border-left-color:#2dd4bf;background:rgba(45,212,191,.07)}
  .t-seq-tell{border-left-color:var(--aether-orange);background:rgba(255,140,50,.07)}
  .t-seq-see{border-left-color:#60a5fa}
  .t-seq-me{border-left-color:#94a3b8;opacity:.9}
  .t-seq-goal{border-left-color:#facc15;background:rgba(250,204,21,.09)}
  .t-seq-how{border-left-color:#f472b6;background:rgba(244,114,182,.06)}
  .t-goal{margin:0;font-weight:700;font-size:1.02rem;line-height:1.45}
  .t-cap-goal{color:#fde047}.t-cap-how{color:#f9a8d4}
  .t-seq .t-b-do{margin:0}
  .t-seq-cap{margin:0 0 .3rem;font-size:.72rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
  .t-seq-paste{border-left-color:#fbbf24;background:rgba(251,191,36,.07)}.t-cap-paste{color:#fcd34d}
  .t-seq-now{border-left-color:#64748b}.t-cap-now{color:#94a3b8}
  .t-now-label{margin:.1rem 0 .3rem;font-size:.85rem;opacity:.85}
  .t-now-box{margin:0;padding:.55rem .7rem;border-radius:8px;background:rgba(0,0,0,.3);border:1px dashed rgba(148,163,184,.4);font-size:.78rem;line-height:1.45;white-space:pre-wrap;color:#cbd5e1;opacity:.9}
  .t-cap-run{color:#5eead4}.t-cap-tell{color:var(--aether-orange)}.t-cap-see{color:#93c5fd}.t-cap-me{color:#cbd5e1}
  .t-seq .t-say-list,.t-seq .t-flow{margin-top:.1rem}
  .t-links{margin:.2rem 0 1rem;padding:.75rem 1rem;border:2px solid #2dd4bf;border-radius:12px;background:rgba(45,212,191,.12);display:grid;gap:.6rem}
  .t-link{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:.4rem .8rem}
  .t-link strong{color:#5eead4;font-size:.85rem;letter-spacing:.04em;text-transform:uppercase}
  .t-link a{color:#ccfbf1;font-weight:700;word-break:break-all}
  .t-link-note{grid-column:1/-1;margin:0;font-size:.9rem;opacity:.85}
  .p-peek button{font:inherit;font-weight:700;padding:.45rem .9rem;border-radius:9px;border:0;background:var(--ok);color:#04121c;cursor:pointer}`;
function setupPeekUI() {
  const css = document.createElement('style'); css.textContent = PEEK_CSS; document.head.append(css);
  const side = document.querySelector('.p-side'), next = document.querySelector('.p-next'), main = $('ptype-wrap');
  if (!side || !next || !main) return;
  const nav = document.createElement('div'); nav.className = 'p-nav';
  const mk = (id, text, fn, cls) => { const b = document.createElement('button'); b.type = 'button'; b.id = id; b.textContent = text; if (cls) b.className = cls; b.addEventListener('click', fn); return b; };
  nav.append(mk('p-prev-btn', '◀ Previous', () => peekAt(current - 1)),
             mk('p-live-btn', '● Back to live', goLive, 'p-live-btn'),
             mk('p-next-btn', 'Next ▶', () => peekAt(current + 1)));
  side.prepend(nav);
  next.classList.add('p-next-click'); next.title = 'Click to read the notes of this slide. The main screen stays where it is.';
  next.addEventListener('click', () => peekAt(current + 1));
  const hint = document.createElement('p'); hint.className = 'p-next-hint'; hint.textContent = 'Click to read its notes. The main screen does not move.'; next.append(hint);
  const banner = document.createElement('div'); banner.className = 'p-peek'; banner.id = 'p-peek'; banner.hidden = true;
  const txt = document.createElement('span'); txt.id = 'p-peek-text';
  banner.append(txt, mk('p-peek-live', 'Back to live', goLive));
  main.prepend(banner);
  document.addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input, textarea, [contenteditable="true"]')) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); peekAt(current + 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); peekAt(current - 1); }
    else if (e.key === 'Escape' && peeking) goLive();
  });
}
function updatePeekUI() {
  const banner = $('p-peek'); if (!banner) return;
  banner.hidden = !peeking;
  if (peeking) $('p-peek-text').textContent = 'Preview of slide ' + (current + 1) + ' · the main screen is still on slide ' + (live + 1) + '.';
  $('p-live-btn').hidden = !peeking;
  $('p-prev-btn').disabled = current <= 0;
  $('p-next-btn').disabled = current >= slides.length - 1;
}
setupPeekUI();

/* ---- sync ---- */
let channel = null;
try { if ('BroadcastChannel' in window) channel = new BroadcastChannel(PRESENTER_CHANNEL); } catch {}
if (channel) {
  channel.addEventListener('message', e => { if (e.data && e.data.type === 'slide') { setSyncStatus(true); renderSlide(e.data.index); } });
}
window.addEventListener('storage', e => {
  if (e.key === HIDDEN_KEY || e.key === SHOWN_KEY) { $('p-hidden').hidden = !isHidden(current); return; }
  if (e.key !== PRESENTER_KEY || !e.newValue) return;
  try { const data = JSON.parse(e.newValue); setSyncStatus(true); renderSlide(data.index); } catch {}
});

/* ---- initial paint: URL param, then whatever localStorage already has ---- */
(function init() {
  const params = new URLSearchParams(location.search);
  const fromUrl = Number(params.get('i'));
  if (Number.isInteger(fromUrl) && fromUrl >= 0 && fromUrl < slides.length) { renderSlide(fromUrl); }
  try {
    const stored = JSON.parse(localStorage.getItem(PRESENTER_KEY) || 'null');
    if (stored && Number.isInteger(stored.index)) { renderSlide(stored.index); if (Date.now() - (stored.at || 0) < 15000) setSyncStatus(true); }
  } catch {}
  if (!slides.length) { $('p-title').textContent = 'slides.js did not load.'; }
})();
