'use strict';
/* Workshop 5 diagrams: flat, inline SVG figures for `visual.diagram` (see app.js renderDiagram).
   Each entry gets the slide object and returns { viewBox, svg, steps }. Labels come from the slide data
   where the slide has them (items, columns, cards, tagline), so the slide text stays the single source.
   Groups with class "dg-step" and data-step="n" take part in the → step-through (app.js).
   Design rules (after the MIT "Diagram Design" skill, applied by hand to the AetherLink skin):
   - one accent: orange marks the human / decide step only; cyan is the main flow
   - solid line = flow, dashed line = return, async or not allowed (red)
   - right-angle connectors (loop rings excepted), 8px corners, no shadows or glow
   - arrow labels in caps on an opaque mask, legend as a bottom strip
   No external assets except local deck images. Offline-capable. */
(function () {
  const esc = t => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  function wrap(text, max) {
    const words = String(text).split(/\s+/); const lines = []; let cur = '';
    words.forEach(w => { if ((cur + ' ' + w).trim().length > max && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); });
    if (cur) lines.push(cur); return lines;
  }
  function T(x, y, text, cls, opt = {}) {
    const lh = opt.lh || 1.22, size = opt.size || 22, anchor = opt.anchor || 'middle';
    const lines = Array.isArray(text) ? text : (opt.wrap ? wrap(text, opt.wrap) : [text]);
    return '<text class="' + cls + '" x="' + x + '" y="' + y + '" text-anchor="' + anchor + '" style="font-size:' + size + 'px">' +
      lines.map((l, i) => '<tspan x="' + x + '" dy="' + (i ? size * lh : 0) + '">' + esc(l) + '</tspan>').join('') + '</text>';
  }
  const rect = (x, y, w, h, cls, r = 8) => '<rect class="' + cls + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + r + '"/>';
  // node: opaque mask, styled box, optional eyebrow / name / sublabel (left-aligned unless center)
  function node(o) {
    const { x, y, w, h, kind = '', eyebrow, name, sub, center } = o; const ns = o.nameSize || 28, ss = o.subSize || 19;
    const tx = center ? x + w / 2 : x + 22, an = center ? 'middle' : 'start'; let ty = y + (o.top || 34); let s = rect(x, y, w, h, 'dg-mask') + rect(x, y, w, h, 'dg-n ' + kind);
    if (eyebrow) { s += T(tx, ty, eyebrow, 'dg-eye' + (kind.includes('focal') ? ' dg-eye-o' : ''), { anchor: an, size: 16 }); ty += ns + 8; } else ty += ns / 2;
    if (name) { s += T(tx, ty, name, 'dg-name' + (o.mono ? ' dg-mono' : '') + (kind.includes('focal') ? ' dg-o' : ''), { anchor: an, size: ns }); ty += ss + 12; }
    if (sub) s += T(tx, ty, Array.isArray(sub) ? sub : wrap(sub, o.subWrap || 30), 'dg-sub', { anchor: an, size: ss });
    return s;
  }
  // arrow label: caps, opaque mask with a gap to its line
  function lab(x, y, text, cls = '', size = 15) { const t = String(text).toUpperCase(), w = Math.ceil(t.length * 0.66 * size + 18);
    return '<rect class="dg-mask" x="' + (x - w / 2) + '" y="' + (y - 17) + '" width="' + w + '" height="24" rx="2"/>' + T(x, y, t, 'dg-lab ' + cls, { size }); }
  const KIND = { flow: 'f', plain: 'p', human: 'o', ret: 'p', deny: 'r' };
  const line = (d, kind = 'plain') => '<path class="dg-l dg-l-' + kind + '" d="' + d + '" marker-end="url(#dg-m-' + KIND[kind] + ')"/>';
  const step = (n, inner, extra = '') => '<g class="dg-step' + (extra ? ' ' + extra : '') + '" data-step="' + n + '">' + inner + '</g>';
  const defs = '<defs>' + ['f', 'p', 'o', 'r'].map(k => '<marker id="dg-m-' + k + '" viewBox="0 0 12 12" refX="10" refY="6" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" orient="auto-start-reverse"><path d="M1 1 11 6 1 11z" class="dg-mk-' + k + '"/></marker>').join('') +
    '<pattern id="dg-hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="12" height="12" class="dg-hatch-bg"/><path d="M0 0V12" class="dg-hatch-line"/></pattern></defs>';
  const person = (x, y, s = 1, cls = 'dg-person') => '<g class="' + cls + '" transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><circle cx="0" cy="-9" r="7"/><path d="M-12 14a12 12 0 0 1 24 0z"/></g>';
  const cross = (x, y) => '<g class="dg-x" transform="translate(' + x + ' ' + y + ')"><rect class="dg-mask" x="-16" y="-16" width="32" height="32" rx="16"/><circle r="14"/><path d="M-5-5 5 5M5-5-5 5"/></g>';
  const tick = (x, y) => '<g class="dg-tick" transform="translate(' + x + ' ' + y + ')"><circle r="14"/><path d="M-6 0-2 4 6-4"/></g>';
  const bot = (x, y, w) => '<image class="dg-bot" href="assets/aetherbot/aetherbot-head.webp" x="' + (x - w / 2) + '" y="' + (y - w / 2) + '" width="' + w + '" height="' + w + '"/>';
  // legend strip at the bottom: [kind, label] pairs; kind = line kind or 'focal'
  function legend(y, items, x0 = 20) { let x = x0, s = '<path class="dg-rule" d="M20 ' + (y - 22) + ' H1260"/>';
    items.forEach(([k, t]) => { s += k === 'focal' ? rect(x, y - 13, 26, 18, 'dg-n focal', 4) : '<path class="dg-l dg-l-' + k + '" d="M' + x + ' ' + (y - 4) + ' h 40"/>';
      const w = (k === 'focal' ? 26 : 40) + 12; s += T(x + w, y + 2, t, 'dg-legend', { anchor: 'start', size: 17 }); x += w + t.length * 9.4 + 40; }); return s; }
  // ellipse ring cut out of the boxes it passes behind (Loop type: one continuous ring, clockwise)
  function ring(cx, cy, rx, ry, a0, a1, boxes, pad = 10) {
    const inside = (p, b) => p[0] > b[0] - pad && p[0] < b[0] + b[2] + pad && p[1] > b[1] - pad && p[1] < b[1] + b[3] + pad;
    const pts = []; for (let a = a0; a <= a1; a += 0.5) { const r = a * Math.PI / 180; pts.push([cx + rx * Math.cos(r), cy + ry * Math.sin(r)]); }
    const free = pts.filter(p => !boxes.some(b => inside(p, b)));
    if (free.length < 2) return ''; const [p0, p1] = [free[0], free[free.length - 1]];
    return 'M' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1) + ' A ' + rx + ' ' + ry + ' 0 0 1 ' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1);  // one true elliptical arc per gap
  }
  function loopRing(cx, cy, rx, ry, angles, boxes, kinds) {
    return angles.map((a, i) => { const b = angles[(i + 1) % angles.length] + (i === angles.length - 1 ? 360 : 0);
      const d = ring(cx, cy, rx, ry, a, b, boxes); return d ? line(d, kinds?.[i] || 'flow') : ''; }).join('');
  }

  const D = {};

  /* ---- slide 9: code is not the bottleneck (Gantt rows; the wait blocks are the focus) ---- */
  D.bottleneck = () => {
    const X = 236, rowY = [40, 196], H = 84;
    const before = [['Plan', 132], ['Design', 132], ['Build', 420], ['Test', 140], ['Deploy', 124], ['Maintain', 116]];
    const after = [['Plan', 132], ['Design', 132], ['Build', 120, 'fast'], ['review', 108, 'wait'], ['Test', 140], ['approval', 108, 'wait'], ['Deploy', 124], ['Maintain', 116]];
    const row = (segs, y) => { let x = X; return segs.map(([label, w, kind]) => { const g = kind === 'wait'
      ? rect(x + 4, y, w - 8, H, 'dg-wait') + T(x + w / 2, y + 36, 'WAIT', 'dg-wait-t', { size: 17 }) + T(x + w / 2, y + 62, label, 'dg-wait-s', { size: 17 })
      : rect(x + 4, y, w - 8, H, 'dg-n' + (kind === 'fast' ? ' key' : '')) + T(x + w / 2, y + 52, label, 'dg-name', { size: label === 'Maintain' ? 20 : 22 }); x += w; return g; }).join(''); };
    const svg = defs +
      step(1, T(X - 24, rowY[0] + 38, 'BEFORE', 'dg-eye', { anchor: 'end', size: 20 }) + T(X - 24, rowY[0] + 64, 'AGENTS', 'dg-eye', { anchor: 'end', size: 20 }) + row(before, rowY[0])) +
      step(2, T(X - 24, rowY[1] + 38, 'WITH', 'dg-eye dg-c', { anchor: 'end', size: 20 }) + T(X - 24, rowY[1] + 64, 'AGENTS', 'dg-eye dg-c', { anchor: 'end', size: 20 }) + row(after, rowY[1]) +
        T(X + 300, rowY[1] + H + 30, 'Build gets faster', 'dg-name dg-c', { size: 20 }) +
        '<path class="dg-bracket" d="M' + (X + 4) + ' ' + (rowY[1] + H + 50) + ' v 10 H ' + (X + 1092) + ' v -10"/>' +
        T(X + 548, rowY[1] + H + 92, 'Decisions and checks still take time', 'dg-name', { size: 24 })) +
      step(3, [['Waiting time shifts to Plan, Test, and Deploy.', 20, 440], ['Manual line-by-line review does not scale with more code.', 480, 420], ['Review and approval must keep pace.', 920, 340]].map(([t, x, w]) =>
        rect(x, 412, w, 100, 'dg-n') + T(x + 24, 452, wrap(t, Math.floor(w / 13)), 'dg-sub dg-ink', { anchor: 'start', size: 22 })).join('') +
        T(1260, 548, 'Illustrative, not a time guarantee.', 'dg-foot', { anchor: 'end', size: 17 }));
    return { viewBox: '0 0 1280 556', svg, steps: 'reveal' };
  };

  /* ---- slide 11: the AI-native loop (Loop type: six stations clockwise, the agent as the hub) ---- */
  D.loop = () => {
    const cx = 640, cy = 320, rx = 400, ry = 206, W = 220, H = 76; const names = ['Plan', 'Design', 'Build', 'Test', 'Release', 'Observe'];
    const ang = names.map((_, i) => -90 + i * 60);
    const pos = ang.map(a => [cx + rx * Math.cos(a * Math.PI / 180), cy + ry * Math.sin(a * Math.PI / 180)]);
    const boxes = pos.map(([x, y]) => [x - W / 2, y - H / 2, W, H]); const hub = [500, 256, 280, 128];
    const nodes = names.map((n, i) => { const [x, y] = boxes[i]; const focal = n === 'Release';
      return step(i + 1, node({ x, y, w: W, h: H, kind: focal ? 'focal' : '', center: true, name: n, nameSize: 26, top: focal ? 26 : 40, eyebrow: focal ? 'A HUMAN APPROVES' : null })); }).join('');
    const svg = defs + loopRing(cx, cy, rx, ry, ang, [...boxes, hub]) +
      rect(260, 8, 760, 52, 'dg-n focal-soft', 8) + person(296, 38, 1, 'dg-person dg-person-o') + T(660, 43, 'Humans set goals, direct, and approve', 'dg-name', { size: 24 }) +
      nodes + rect(hub[0], hub[1], hub[2], hub[3], 'dg-n hub') + bot(cx, 300, 76) + T(cx, 364, 'The agent supports every stage', 'dg-sub dg-ink', { size: 20 });
    return { viewBox: '0 0 1280 572', svg, steps: 'highlight' };
  };

  /* ---- slide 12: the line and the loop (uses the compare columns) ---- */
  D['line-loop'] = s => {
    const [L, Rc] = s.columns || [{}, {}]; const stages = ['Plan', 'Design', 'Build', 'Test', 'Release', 'Observe'];
    const left = stages.map((n, i) => { const x = 20 + i * 84, y = 92 + i * 64;
      return (i < 5 ? line('M' + (x + 152) + ' ' + (y + 24) + ' H ' + (x + 168) + ' q 8 0 8 8 V ' + (y + 62), 'plain') : '') + node({ x, y, w: 152, h: 48, center: true, name: n, nameSize: 20, top: 18 }); }).join('');
    const cx = 960, cy = 324, rx = 208, ry = 150, W = 136, H = 48;
    const ang = stages.map((_, i) => -90 + i * 60);
    const boxes = ang.map(a => [cx + rx * Math.cos(a * Math.PI / 180) - W / 2, cy + ry * Math.sin(a * Math.PI / 180) - H / 2, W, H]);
    const ringNodes = stages.map((n, i) => node({ x: boxes[i][0], y: boxes[i][1], w: W, h: H, center: true, name: n, nameSize: 19, top: 17 }) +
      '<g class="dg-ai" transform="translate(' + (boxes[i][0] + W - 6) + ' ' + (boxes[i][1] + 4) + ')"><circle r="13"/><text y="5" text-anchor="middle">AI</text></g>').join('');
    const svg = defs +
      step(1, T(20, 36, (L.title || '').toUpperCase(), 'dg-eye dg-ink', { anchor: 'start', size: 22 }) + '<path class="dg-rule-c" d="M20 54 H600"/>' + left +
        T(600, 150, L.items?.[1] || '', 'dg-sub', { anchor: 'end', size: 19, wrap: 18 }) +
        rect(20, 500, 580, 64, 'dg-n') + T(310, 542, L.items?.[2] || '', 'dg-name', { size: 28 })) +
      '<path class="dg-divider" d="M640 16 V 564"/>' +
      step(2, T(680, 36, (Rc.title || '').toUpperCase(), 'dg-eye dg-ink', { anchor: 'start', size: 22 }) + '<path class="dg-rule-o" d="M680 54 H1260"/>' +
        rect(780, 76, 360, 44, 'dg-n focal-soft', 8) + person(808, 99, .85, 'dg-person dg-person-o') + T(974, 106, 'Humans above the loop', 'dg-name', { size: 21 }) +
        loopRing(cx, cy, rx, ry, ang, boxes) + ringNodes +
        T(cx, cy - 4, wrap(Rc.items?.[0] || '', 16), 'dg-sub', { size: 19 }) +
        rect(680, 500, 580, 64, 'dg-n key') + T(970, 542, (Rc.items?.[2] || '').split('.')[0], 'dg-name', { size: 28 }) +
        T(1260, 476, Rc.items?.[1] || '', 'dg-sub dg-c', { anchor: 'end', size: 19 }));
    return { viewBox: '0 0 1280 572', svg, steps: 'reveal' };
  };

  /* ---- slide 31: the control loop (Loop type: five steps clockwise, intent.md as the hub, the human gate on top) ---- */
  D['control-loop'] = s => {
    const it = s.items || []; const cx = 640, cy = 300, rx = 400, ry = 212, W = 300, H = 136;
    // clockwise from the top: 3 Decide (human gate) → 4 Map → 5 Edit → 1 Read → 2 Ask → 3
    const order = [2, 3, 4, 0, 1]; const roles = ['SENSOR', 'COMPARE', 'HUMAN GATE', 'WRITE SET POINT', 'ACTUATOR'];
    const maps = ['MCP, tests, review', 'evidence vs intent', '', '', 'a human with a PR'];
    const ang = order.map((_, k) => -90 + k * 72);
    const boxes = ang.map(a => [Math.round(cx + rx * Math.cos(a * Math.PI / 180) - W / 2), Math.round(cy + ry * Math.sin(a * Math.PI / 180) - H / 2), W, H]);
    const hub = [544, 252, 192, 96];
    const station = (si, k) => { const [x, y] = boxes[k]; const st = it[si] || {}; const focal = si === 2;
      return step(si + 1, rect(x, y, W, H, 'dg-mask') + rect(x, y, W, H, 'dg-n' + (focal ? ' focal' : '')) +
        '<text class="dg-eye' + (focal ? ' dg-eye-o' : '') + '" x="' + (x + 22) + '" y="' + (y + 32) + '" style="font-size:16px">' + roles[si] + (maps[si] ? '<tspan class="dg-eye-map" dx="10">' + esc(maps[si]) + '</tspan>' : '') + '</text>' +
        (focal ? person(x + 42, y + 72, 1.3, 'dg-person dg-person-o') : '<circle class="dg-num" cx="' + (x + 42) + '" cy="' + (y + 68) + '" r="20"/>' + T(x + 42, y + 76, String(si + 1), 'dg-num-t', { size: 22 })) +
        T(x + 76, y + 79, (focal ? '3 · ' : '') + (st.label || ''), 'dg-name' + (focal ? ' dg-o' : ''), { anchor: 'start', size: 30 }) +
        T(x + 22, y + 108, wrap(st.caption || '', 30).slice(0, 2), 'dg-sub', { anchor: 'start', size: 18, lh: 1.15 }), focal ? 'dg-human' : ''); };
    // the dashed write-back spoke: Map (k = 1, upper right) writes the set point into intent.md
    const mapBox = boxes[1]; const spoke = '<path class="dg-l dg-l-ret" d="M' + mapBox[0] + ' ' + (mapBox[1] + H / 2 + 20) + ' H 780 q -8 0 -8 8 V ' + (hub[1] + 30) + ' H ' + (hub[0] + hub[2] + 6) + '" marker-end="url(#dg-m-p)"/>';
    const svg = defs + loopRing(cx, cy, rx, ry, ang, [...boxes, hub], ['human', 'flow', 'flow', 'flow', 'flow']) + spoke +
      order.map((si, k) => station(si, k)).join('') +
      rect(hub[0], hub[1], hub[2], hub[3], 'dg-mask') + rect(hub[0], hub[1], hub[2], hub[3], 'dg-n hub') + T(cx, hub[1] + 34, 'SET POINT', 'dg-eye', { size: 16 }) + T(cx, hub[1] + 70, 'intent.md', 'dg-name dg-mono', { size: 26 }) +
      bot(112, 404, 96) + T(112, 486, 'One round.', 'dg-name', { size: 24 }) + T(112, 516, 'Then stop.', 'dg-name', { size: 24 }) +
      legend(570, [['flow', 'flow, clockwise from 1'], ['ret', 'writes intent.md'], ['focal', 'a human decides']], 300);
    return { viewBox: '0 0 1280 580', svg, steps: 'highlight' };
  };

  /* ---- slide 39: MCP (architecture: one call path, one dashed return, dashed red for what is not allowed) ---- */
  D.mcp = s => {
    const tools = String(s.cards?.[1]?.body || '').split('\n').filter(Boolean);
    const svg = defs +
      line('M292 168 H 418', 'flow') + lab(355, 154, 'tool call', 'dg-c') +
      line('M418 228 H 292', 'ret') + lab(355, 258, 'result') +
      line('M862 196 H 988', 'flow') + lab(925, 182, 'read', 'dg-c') +
      [[540, 300], [640, 640], [740, 980]].map(([px, tx]) => line('M' + px + ' 372 V 400' + (tx === px ? ' V 436' : ' q 0 8 ' + (tx > px ? 8 : -8) + ' 8 H ' + (tx > px ? tx - 8 : tx + 8) + ' q ' + (tx > px ? 8 : -8) + ' 0 ' + (tx > px ? 8 : -8) + ' 8 V 436'), 'deny')).join('') +
      node({ x: 12, y: 112, w: 280, h: 172, center: true, eyebrow: 'RUNTIME SRE AGENT', name: '', top: 30 }) + bot(152, 196, 72) + T(152, 262, 'Agent SDK', 'dg-sub', { size: 18 }) +
      node({ x: 420, y: 20, w: 440, h: 352, kind: 'key', center: true, eyebrow: 'MCP SERVER', name: 'telemetry', nameSize: 28, sub: (s.cards?.[0]?.body || '').split('.')[0], subSize: 18, top: 32 }) +
      T(640, 140, 'src/tools.ts', 'dg-sub dg-mono', { size: 17 }) +
      tools.map((t, i) => step(i + 1, rect(460, 160 + i * 52, 360, 42, 'dg-n chip', 6) + T(640, 188 + i * 52, t, 'dg-name dg-mono', { size: 21 }))).join('') +
      node({ x: 990, y: 112, w: 278, h: 172, kind: 'store', center: true, eyebrow: 'LOADED TELEMETRY', name: 'telemetry.json', mono: true, nameSize: 24, sub: ['logs, metrics', 'deploys, diffs'], subSize: 18, top: 32 }) +
      [['Shop mutations', 300], ['External tool calls', 640], ['Arbitrary file reads', 980]].map(([t, x]) => rect(x - 150, 440, 300, 64, 'dg-n ghost') + cross(x - 116, 472) + T(x - 92, 479, t, 'dg-deny-t', { anchor: 'start', size: 20 })).join('') +
      T(640, 548, s.tagline || '', 'dg-name', { size: 24 }) +
      legend(586, [['flow', 'call'], ['ret', 'return'], ['deny', 'not allowed']], 400);
    return { viewBox: '0 0 1280 596', svg, steps: 'highlight' };
  };

  /* ---- slide 44: allow · ask · deny (flowchart: one check, three exits; uses the compare columns) ---- */
  D.hooks = s => {
    const cols = s.columns || []; const kinds = ['allow', 'ask', 'deny']; const subs = ['runs', 'a human confirms', 'blocked'];
    const lk = ['plain', 'human', 'deny']; const ports = [580, 640, 700], mids = [200, 640, 1080];
    const svg = defs +
      line('M640 72 V 104', 'plain') +
      ports.map((p, i) => line(p === mids[i] ? 'M' + p + ' 184 V 252' : 'M' + p + ' 184 V 210 q 0 8 ' + (mids[i] > p ? 8 : -8) + ' 8 H ' + (mids[i] > p ? mids[i] - 8 : mids[i] + 8) + ' q ' + (mids[i] > p ? 8 : -8) + ' 0 ' + (mids[i] > p ? 8 : -8) + ' 8 V 252', lk[i])).join('') +
      node({ x: 480, y: 8, w: 320, h: 64, center: true, name: 'Agent tool call', nameSize: 24, top: 18 }) +
      node({ x: 420, y: 106, w: 440, h: 78, kind: 'key', center: true, name: 'Hook + permissions', nameSize: 26, sub: ['check each supported call'], subSize: 18, top: 20 }) +
      cols.map((c, i) => { const x = i * 427, w = 400; let y = 334;
        const items = (c.items || []).map(t => { const lines = wrap(t, 29); const g = '<circle class="dg-dot-' + kinds[i] + '" cx="' + (x + 28) + '" cy="' + (y - 8) + '" r="6"/>' + T(x + 46, y, lines, 'dg-item', { anchor: 'start', size: 23, lh: 1.16 }); y += lines.length * 27 + 16; return g; }).join('');
        return step(i + 1, rect(x, 256, w, 268, 'dg-mask') + rect(x, 256, w, 268, 'dg-n lane-' + kinds[i]) + T(x + 24, 292, c.title.toUpperCase(), 'dg-lane-h dg-lane-h-' + kinds[i], { anchor: 'start', size: 28 }) +
          T(x + w - 22, 290, subs[i], 'dg-sub', { anchor: 'end', size: 18 }) + items, i === 1 ? 'dg-human' : ''); }).join('') +
      T(1268, 552, 'Regex rules are best effort.', 'dg-foot', { anchor: 'end', size: 17 });
    return { viewBox: '0 0 1280 560', svg, steps: 'highlight' };
  };

  /* ---- slide 49: subagents (process: delegate → investigate → verify → a human accepts) ---- */
  D.subagents = s => {
    const inv = s.cards?.[0] || {}, never = s.cards?.[1] || {};
    const svg = defs +
      line('M248 196 H 340', 'flow') + lab(294, 180, 'work') +
      line('M640 196 H 740', 'flow') + lab(690, 180, 'diagnosis', '', 14) +
      line('M1040 196 H 1088', 'human') +
      line('M492 344 V 400 q 0 8 8 8 H 1172 q 8 0 8 -8 V 292', 'deny') + cross(836, 408) +
      step(1, node({ x: 12, y: 112, w: 236, h: 168, center: true, eyebrow: 'MAIN SESSION', name: '', top: 30 }) + person(130, 190, 1.6, 'dg-person') + T(130, 252, 'you + Claude', 'dg-sub', { size: 18 })) +
      step(2, rect(344, 56, 296, 288, 'dg-ctx') + T(492, 86, 'OWN CONTEXT', 'dg-ctx-t', { size: 15 }) +
        node({ x: 360, y: 104, w: 264, h: 224, center: true, name: inv.title || 'Investigator', nameSize: 28, top: 24 }) + bot(492, 196, 60) +
        T(492, 254, '.claude/agents/', 'dg-sub dg-mono', { size: 15 }) + T(492, 274, 'oncall-investigator.md', 'dg-sub dg-mono', { size: 15 }) + T(492, 306, 'It only reports.', 'dg-sub dg-ink', { size: 18 })) +
      step(3, rect(744, 56, 296, 288, 'dg-ctx') + T(892, 86, 'NEW CONTEXT', 'dg-ctx-t', { size: 15 }) +
        node({ x: 760, y: 104, w: 264, h: 224, center: true, name: 'Verifier', nameSize: 28, top: 24 }) + bot(892, 196, 60) +
        T(892, 256, 'Checks the diagnosis.', 'dg-sub', { size: 18 }) + T(892, 280, 'It does not see how.', 'dg-sub', { size: 18 }) + T(892, 306, 'It only reports.', 'dg-sub dg-ink', { size: 18 })) +
      step(4, node({ x: 1092, y: 104, w: 176, h: 184, kind: 'focal', center: true, eyebrow: 'HUMAN', name: '', top: 30 }) + person(1180, 166, 1.6, 'dg-person dg-person-o') +
        T(1180, 230, 'accepts', 'dg-name dg-o', { size: 28 }) + T(1180, 262, 'the result', 'dg-sub', { size: 18 }), 'dg-human') +
      T(836, 452, never.body || '', 'dg-deny-t', { size: 20 }) +
      rect(140, 484, 1000, 76, 'dg-n') + T(640, 534, s.tagline || '', 'dg-name', { size: 32 });
    return { viewBox: '0 0 1280 568', svg, steps: 'highlight' };
  };

  /* ---- slide 53: eval, the bench (data flow: case → run → checks → gate; the floor is the focus) ---- */
  D.eval = s => {
    const checks = ['proposal', 'severity', 'harmful?'];
    const svg = defs +
      line('M284 152 H 340', 'flow') + line('M612 152 H 668', 'flow') + line('M924 152 H 980', 'flow') +
      line('M1196 280 V 400', 'plain') +
      step(1, node({ x: 12, y: 24, w: 272, h: 256, center: true, eyebrow: 'CASE', name: '', top: 30 }) + T(148, 70, 'bench/cases.json', 'dg-sub dg-mono', { size: 17 }) +
        ['scenario', 'expected proposal', 'expected severity'].map((t, i) => rect(36, 96 + i * 54, 224, 42, 'dg-n chip', 6) + T(148, 124 + i * 54, t, 'dg-name', { size: 18 })).join('')) +
      step(2, node({ x: 344, y: 24, w: 268, h: 256, center: true, eyebrow: 'INVESTIGATOR', name: '', top: 30 }) + bot(478, 100, 72) +
        T(478, 182, 'No model needed', 'dg-sub dg-ink', { size: 19 }) + T(478, 212, 'Runs offline in CI', 'dg-sub dg-ink', { size: 19 }) + T(478, 252, 'diagnosis + evidence', 'dg-sub', { size: 17 })) +
      step(3, node({ x: 672, y: 24, w: 252, h: 256, center: true, eyebrow: 'CHECKS', name: '', top: 30 }) +
        checks.map((t, i) => tick(714, 100 + i * 60) + T(742, 108 + i * 60, t, 'dg-name', { anchor: 'start', size: 22 })).join('')) +
      step(4, node({ x: 984, y: 24, w: 284, h: 256, kind: 'key', center: true, eyebrow: 'BENCH GATE', name: '', top: 30 }) +
        T(1126, 92, 'rate ≥ floor', 'dg-name dg-mono', { size: 22 }) + T(1126, 128, 'harmful ≤ 0', 'dg-name dg-mono', { size: 22 }) +
        rect(1004, 160, 116, 92, 'dg-pass') + T(1062, 200, 'PASS', 'dg-pass-t', { size: 22 }) + T(1062, 230, 'CI green', 'dg-sub', { size: 16 }) +
        rect(1136, 160, 116, 92, 'dg-fail') + T(1194, 200, 'FAIL', 'dg-fail-t', { size: 22 }) + T(1194, 230, 'CI red', 'dg-sub', { size: 16 })) +
      step(5, line('M148 380 V 284', 'ret') + T(172, 352, 'Each incident becomes a case.', 'dg-name dg-c', { anchor: 'start', size: 21 }) +
        (() => { const x0 = 40, y0 = 548, bw = 56; const lv = [1, 1, 2, 2, 3, 4];
          const bars = lv.map((l, i) => '<rect class="dg-bar" x="' + (x0 + i * (bw + 16)) + '" y="' + (y0 - 28 - l * 26) + '" width="' + bw + '" height="' + (28 + l * 26) + '" rx="4"/>').join('');
          let d = 'M' + x0 + ' ' + (y0 - 22 - lv[0] * 26); lv.forEach((l, i) => { const y = y0 - 22 - l * 26; d += ' V ' + y + ' H ' + (x0 + (i + 1) * (bw + 16) - 8); });
          return T(x0, 412, 'THE RATCHET', 'dg-eye', { anchor: 'start', size: 16 }) + bars + '<path class="dg-floor" d="' + d + '"/>' +
            T(x0 + 444, y0 - 124, 'floor', 'dg-name dg-o', { anchor: 'start', size: 22 }) + T(x0 + 444, y0 - 96, 'only goes up', 'dg-sub', { anchor: 'start', size: 18 }); })() +
        rect(620, 404, 648, 120, 'dg-n') + T(944, 454, wrap(s.tagline || '', 38), 'dg-name', { size: 27 }));
    return { viewBox: '0 0 1280 560', svg, steps: 'highlight' };
  };

  window.ALS_DIAGRAMS = D;
})();
