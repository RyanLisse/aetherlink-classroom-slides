'use strict';
/* Workshop 5 diagrams: flat, inline SVG figures for `visual.diagram` (see app.js renderDiagram).
   Each entry gets the slide object and returns { viewBox, svg }. Labels come from the slide data
   where the slide has them (items, columns, cards), so the slide text stays the single source.
   Groups with class "dg-step" and data-step="n" take part in the → step-through (app.js).
   No external assets except local deck images. Offline-capable. */
(function () {
  const esc = t => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // greedy wrap by an approximate character budget (Nunito ≈ 0.52em per char)
  function wrap(text, max) {
    const words = String(text).split(/\s+/); const lines = []; let cur = '';
    words.forEach(w => { if ((cur + ' ' + w).trim().length > max && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); });
    if (cur) lines.push(cur); return lines;
  }
  // text block: lines centred (or start-anchored) on x, first baseline at y
  function T(x, y, text, cls, opt = {}) {
    const lh = opt.lh || 1.25, size = opt.size || 22, anchor = opt.anchor || 'middle';
    const lines = Array.isArray(text) ? text : (opt.wrap ? wrap(text, opt.wrap) : [text]);
    return '<text class="' + cls + '" x="' + x + '" y="' + y + '" text-anchor="' + anchor + '" style="font-size:' + size + 'px">' +
      lines.map((l, i) => '<tspan x="' + x + '" dy="' + (i ? size * lh : 0) + '">' + esc(l) + '</tspan>').join('') + '</text>';
  }
  const box = (x, y, w, h, cls, r = 18) => '<rect class="' + cls + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + r + '"/>';
  const step = (n, inner, extra = '') => '<g class="dg-step' + (extra ? ' ' + extra : '') + '" data-step="' + n + '">' + inner + '</g>';
  const arrow = (d, cls = 'dg-arrow') => '<path class="' + cls + '" d="' + d + '" marker-end="url(#dg-head)"/>';
  const defs = '<defs>' +
    '<marker id="dg-head" viewBox="0 0 12 12" refX="9" refY="6" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" orient="auto-start-reverse"><path d="M1 1 11 6 1 11z" class="dg-head"/></marker>' +
    '<marker id="dg-head-o" viewBox="0 0 12 12" refX="9" refY="6" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" orient="auto-start-reverse"><path d="M1 1 11 6 1 11z" class="dg-head-o"/></marker>' +
    '<marker id="dg-head-r" viewBox="0 0 12 12" refX="9" refY="6" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" orient="auto-start-reverse"><path d="M1 1 11 6 1 11z" class="dg-head-r"/></marker>' +
    '<pattern id="dg-hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="12" height="12" class="dg-hatch-bg"/><path d="M0 0V12" class="dg-hatch-line"/></pattern>' +
    '</defs>';
  const person = (x, y, s = 1, cls = 'dg-person') => '<g class="' + cls + '" transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><circle cx="0" cy="-9" r="7"/><path d="M-12 14a12 12 0 0 1 24 0z"/></g>';
  const cross = (x, y, cls = 'dg-x') => '<g class="' + cls + '" transform="translate(' + x + ' ' + y + ')"><circle r="15"/><path d="M-6-6 6 6M6-6-6 6"/></g>';
  const tick = (x, y, cls = 'dg-tick') => '<g class="' + cls + '" transform="translate(' + x + ' ' + y + ')"><circle r="15"/><path d="M-7 0-2 5 7-5"/></g>';
  const bot = (x, y, w) => '<image class="dg-bot" href="assets/aetherbot/aetherbot-head.webp" x="' + (x - w / 2) + '" y="' + (y - w / 2) + '" width="' + w + '" height="' + w + '"/>';
  // sample an ellipse from angle a0 to a1 (degrees, screen space, clockwise) and cut out the parts inside boxes
  function arc(cx, cy, rx, ry, a0, a1, boxes, pad = 12) {
    const inside = (p, b) => p[0] > b[0] - pad && p[0] < b[0] + b[2] + pad && p[1] > b[1] - pad && p[1] < b[1] + b[3] + pad;
    const pts = []; for (let a = a0; a <= a1; a += 0.5) { const r = a * Math.PI / 180; pts.push([cx + rx * Math.cos(r), cy + ry * Math.sin(r)]); }
    const free = pts.filter(p => !boxes.some(b => inside(p, b)));
    return free.length > 1 ? 'M' + free.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L') : '';
  }

  const D = {};

  /* ---- slide 9: code is not the bottleneck ---- */
  D.bottleneck = () => {
    const X = 230, rowY = [70, 250], H = 84;
    const before = [['Plan', 130], ['Design', 130], ['Build', 420], ['Test', 140], ['Deploy', 120], ['Maintain', 110]];
    const after = [['Plan', 130, 'dec'], ['Design', 130], ['Build', 120, 'fast'], ['wait', 105, 'wait', 'review'], ['Test', 140, 'dec'], ['wait', 105, 'wait', 'approval'], ['Deploy', 120, 'dec'], ['Maintain', 110]];
    const row = (segs, y) => { let x = X; return segs.map(([label, w, kind, sub]) => { const g = '<g class="dg-seg ' + (kind ? 'dg-seg-' + kind : '') + '">' +
      box(x + 3, y, w - 6, H, kind === 'wait' ? 'dg-wait' : 'dg-segbox', 12) +
      (kind === 'wait' ? T(x + w / 2, y + 38, 'WAIT', 'dg-wait-t', { size: 18 }) + T(x + w / 2, y + 64, sub, 'dg-wait-s', { size: 17 }) : T(x + w / 2, y + 52, label, 'dg-seg-t', { size: label === 'Maintain' ? 20 : 22 })) + '</g>'; x += w; return g; }).join(''); };
    const svg = defs +
      step(1, T(X - 24, rowY[0] + 40, 'BEFORE', 'dg-rowlabel', { anchor: 'end', size: 24 }) + T(X - 24, rowY[0] + 68, 'AGENTS', 'dg-rowlabel', { anchor: 'end', size: 24 }) + row(before, rowY[0]) +
        T(X + 260 + 210, rowY[0] - 16, 'Build takes a large part of the cycle', 'dg-note', { size: 19 })) +
      step(2, T(X - 24, rowY[1] + 40, 'WITH', 'dg-rowlabel dg-cyan', { anchor: 'end', size: 24 }) + T(X - 24, rowY[1] + 68, 'AGENTS', 'dg-rowlabel dg-cyan', { anchor: 'end', size: 24 }) + row(after, rowY[1]) +
        arrow('M' + (X + 260 + 210) + ' ' + (rowY[0] + H + 14) + ' C ' + (X + 470) + ' ' + (rowY[0] + H + 60) + ', ' + (X + 320) + ' ' + (rowY[1] - 60) + ', ' + (X + 320) + ' ' + (rowY[1] - 14), 'dg-arrow dg-arrow-cyan') +
        T(X + 520, rowY[0] + H + 66, 'Build gets faster', 'dg-note dg-cyan', { size: 21, anchor: 'start' }) +
        T(X + 130 + 65 + 280, rowY[1] + H + 36, 'Decisions and checks still take time', 'dg-note dg-orange', { size: 21 })) +
      step(3, [['Waiting time shifts to Plan, Test, and Deploy.', 0], ['Manual line-by-line review does not scale with more code.', 1], ['Review and approval must keep pace.', 2]].map(([t, i]) => {
        const x = 20 + i * 420; return box(x, 432, 400, 104, 'dg-callout', 16) + T(x + 200, 474, t, 'dg-callout-t', { wrap: 30, size: 22 }); }).join('') +
        T(1260, 572, 'Illustrative, not a time guarantee.', 'dg-foot', { anchor: 'end', size: 17 }));
    return { viewBox: '0 0 1280 580', svg, steps: 'reveal' };
  };

  /* ---- slide 11: the AI-native loop ---- */
  D.loop = () => {
    const cx = 640, cy = 360, R = 200, r = 64; const names = ['Plan', 'Design', 'Build', 'Test', 'Deploy', 'Maintain'];
    const pos = names.map((_, i) => { const a = (-90 + i * 60) * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
    const arcs = names.map((_, i) => { const a0 = -90 + i * 60 + 21, a1 = -90 + (i + 1) * 60 - 21; const p = a => [cx + R * Math.cos(a * Math.PI / 180), cy + R * Math.sin(a * Math.PI / 180)];
      const [x0, y0] = p(a0), [x1, y1] = p(a1); return arrow('M' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A ' + R + ' ' + R + ' 0 0 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1), i === 5 ? 'dg-arrow dg-arrow-cyan' : 'dg-arrow'); }).join('');
    const nodes = names.map((n, i) => step(i + 1, '<circle class="dg-node' + (n === 'Deploy' ? ' dg-node-human' : '') + '" cx="' + pos[i][0] + '" cy="' + pos[i][1] + '" r="' + r + '"/>' +
      T(pos[i][0], pos[i][1] + 8, n, 'dg-node-t', { size: n === 'Maintain' ? 21 : 24 }) +
      '<g class="dg-ai" transform="translate(' + (pos[i][0] + (i < 3 ? 46 : -46) * (i === 0 ? 0 : 1)) + ' ' + (pos[i][1] - 50) + ')"><circle r="16"/><text y="6" text-anchor="middle">AI</text></g>')).join('');
    const svg = defs +
      box(250, 10, 780, 70, 'dg-human-bar', 35) + person(300, 47, 1.15, 'dg-person dg-person-o') +
      T(670, 55, 'Humans set goals, direct, and approve', 'dg-human-t', { size: 26 }) +
      '<path class="dg-dash-o" d="M640 80 V 116"/>' +
      arcs + nodes + bot(cx, cy - 26, 112) + T(cx, cy + 58, 'The agent supports', 'dg-center-t', { size: 22 }) + T(cx, cy + 86, 'every stage', 'dg-center-t', { size: 22 }) +
      T(372, 200, 'Maintain returns to Plan', 'dg-note dg-cyan', { size: 21, anchor: 'end' }) +
      T(372, 468, 'Deploy: a named human approves', 'dg-note dg-orange', { size: 21, anchor: 'end' });
    return { viewBox: '0 0 1280 620', svg, steps: 'highlight' };
  };

  /* ---- slide 12: the line and the loop (uses the compare columns) ---- */
  D['line-loop'] = s => {
    const [L, Rc] = s.columns || [{}, {}]; const stages = ['Plan', 'Design', 'Build', 'Test', 'Deploy', 'Maintain'];
    const left = stages.map((n, i) => { const x = 20 + i * 86, y = 96 + i * 62; return box(x, y, 150, 50, 'dg-chip', 12) + T(x + 75, y + 33, n, 'dg-chip-t', { size: 20 }) +
      (i < 5 ? '<path class="dg-arrow" d="M' + (x + 150) + ' ' + (y + 25) + ' h 22 v 30" marker-end="url(#dg-head)"/>' + '<circle class="dg-handover" cx="' + (x + 172) + '" cy="' + (y + 26) + '" r="7"/>' : ''); }).join('');
    const cx = 960, cy = 318, R = 146;
    const ring = stages.map((n, i) => { const a = (-90 + i * 60) * Math.PI / 180, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
      return box(x - 66, y - 24, 132, 48, 'dg-chip dg-chip-loop', 24) + T(x, y + 7, n, 'dg-chip-t', { size: 19 }) +
        '<g class="dg-ai" transform="translate(' + (x + 60) + ' ' + (y - 24) + ')"><circle r="14"/><text y="5" text-anchor="middle">AI</text></g>'; }).join('');
    const svg = defs +
      step(1, T(20, 40, (L.title || '').toUpperCase(), 'dg-col-h', { anchor: 'start', size: 24 }) + '<path class="dg-col-rule" d="M20 58 H600"/>' + left +
        T(560, 120, L.items?.[1] || '', 'dg-note', { size: 20, anchor: 'end', wrap: 16 }) + '<circle class="dg-handover" cx="380" cy="104" r="7"/>' +
        '<g transform="translate(20 520)">' + box(0, 0, 580, 64, 'dg-callout', 16) + T(290, 42, L.items?.[2] || '', 'dg-big', { size: 28 }) + '</g>') +
      '<path class="dg-divider" d="M640 20 V 600"/>' +
      step(2, T(680, 40, (Rc.title || '').toUpperCase(), 'dg-col-h dg-orange', { anchor: 'start', size: 24 }) + '<path class="dg-col-rule dg-col-rule-o" d="M680 58 H1260"/>' +
        box(760, 70, 400, 44, 'dg-human-bar', 22) + person(790, 93, .9, 'dg-person dg-person-o') + T(975, 100, 'Humans above the loop', 'dg-human-t', { size: 21 }) +
        '<circle class="dg-ring" cx="' + cx + '" cy="' + cy + '" r="' + R + '"/>' + '<path class="dg-arrow" d="M' + (cx + 74) + ' ' + (cy - R + 20) + ' A ' + R + ' ' + R + ' 0 0 1 ' + (cx + R - 22) + ' ' + (cy - 72) + '" marker-end="url(#dg-head)"/>' + ring +
        T(cx, cy - 6, L.items?.[0] ? (Rc.items?.[0] || '') : '', 'dg-center-t', { size: 19, wrap: 14 }) +
        '<g transform="translate(680 520)">' + box(0, 0, 580, 64, 'dg-callout dg-callout-o', 16) + T(290, 42, (Rc.items?.[2] || '').split('.')[0], 'dg-big', { size: 28 }) + '</g>' +
        T(1260, 500, Rc.items?.[1] || '', 'dg-note dg-cyan', { size: 20, anchor: 'end' }));
    return { viewBox: '0 0 1280 600', svg, steps: 'reveal' };
  };

  /* ---- slide 31: the control loop, with the five steps of /design-control-loop on it ---- */
  D['control-loop'] = s => {
    const it = s.items || []; const W = 330, H = 150;
    // a rounded loop, clockwise: 1 sensor (bottom) → 2 compare (left) → 3 human gate (left, up) → 4 set point (top) → 5 actuator (right) → 1
    const N = [
      { k: 'sensor', c: [640, 494], step: 0, role: 'SENSOR', map: 'MCP, tests, review' },
      { k: 'compare', c: [190, 395], step: 1, role: 'COMPARE', map: 'evidence vs intent' },
      { k: 'setpoint', c: [640, 80], step: 3, role: 'SET POINT', map: 'intent.md' },
      { k: 'actuator', c: [1090, 287], step: 4, role: 'ACTUATOR', map: 'a human with a PR' }];
    const node = n => { const x = n.c[0] - W / 2, y = n.c[1] - H / 2, st = it[n.step] || {};
      return step(n.step + 1, box(x, y, W, H, 'dg-box', 20) +
        '<text class="dg-role" x="' + (x + 22) + '" y="' + (y + 32) + '" style="font-size:17px">' + n.role + '<tspan class="dg-map" dx="10">' + esc(n.map) + '</tspan></text>' +
        '<circle class="dg-num" cx="' + (x + 44) + '" cy="' + (y + 72) + '" r="22"/>' + T(x + 44, y + 80, String(n.step + 1), 'dg-num-t', { size: 23 }) +
        T(x + 80, y + 83, st.label || '', 'dg-step-t', { anchor: 'start', size: 32 }) +
        T(x + 22, y + 114, wrap(st.caption || '', 30).slice(0, 2), 'dg-cap', { anchor: 'start', size: 19, lh: 1.2 }), 'dg-node-' + n.k); };
    const g = { x: 40, y: 130, w: 300, h: 116 }, d = it[2] || {};
    const gate = step(3, box(g.x, g.y, g.w, g.h, 'dg-gate', 20) + T(g.x + 22, g.y + 32, 'HUMAN GATE', 'dg-role dg-orange', { anchor: 'start', size: 17 }) +
      person(g.x + 44, g.y + 76, 1.35, 'dg-person dg-person-o') + T(g.x + 80, g.y + 86, d.label || 'Decide', 'dg-step-t dg-orange', { anchor: 'start', size: 32 }) +
      T(g.x + 196, g.y + 86, '· ' + (d.caption || ''), 'dg-cap', { anchor: 'start', size: 20 }) +
      '<circle class="dg-num dg-num-o" cx="' + (g.x + g.w - 26) + '" cy="' + (g.y + 26) + '" r="16"/>' + T(g.x + g.w - 26, g.y + 32, '3', 'dg-num-t', { size: 18 }), 'dg-human');
    const svg = defs +
      arrow('M465 494 H 230 Q 190 494 190 480') +                                    // sensor → compare
      arrow('M190 314 V 256', 'dg-arrow dg-arrow-o') +                                 // compare → gate
      arrow('M190 124 V 110 Q 190 80 220 80 H 465', 'dg-arrow dg-arrow-o') +           // gate → set point
      arrow('M813 80 H 1050 Q 1090 80 1090 120 V 202') +                               // set point → actuator
      arrow('M1090 370 V 454 Q 1090 494 1050 494 H 813') +                             // actuator → sensor
      N.map(node).join('') + gate +
      bot(640, 250, 120) + T(640, 352, 'One round. Then stop.', 'dg-big', { size: 32 }) +
      T(640, 390, 'Start at 1 and go clockwise', 'dg-note', { size: 20 });
    return { viewBox: '0 0 1280 570', svg, steps: 'highlight' };
  };

  /* ---- slide 39: MCP ---- */
  D.mcp = s => {
    const tools = String(s.cards?.[1]?.body || '').split('\n').filter(Boolean);
    const svg = defs +
      box(10, 150, 290, 180, 'dg-box', 20) + T(155, 206, 'CLAUDE CODE', 'dg-role', { size: 20 }) + bot(155, 262, 76) + T(155, 318, 'the agent', 'dg-cap', { size: 18 }) +
      arrow('M306 210 H 404') + T(355, 196, 'tool call', 'dg-note', { size: 18 }) +
      arrow('M404 282 H 306') + T(355, 312, 'result', 'dg-note dg-cyan', { size: 18 }) +
      box(414, 40, 452, 400, 'dg-box dg-box-hi', 22) + T(640, 86, 'MCP SERVER · telemetry', 'dg-role dg-cyan', { size: 22 }) +
      T(640, 120, (s.cards?.[0]?.body || '').split('.')[0], 'dg-cap', { size: 19 }) +
      T(640, 146, 'src/tools.ts', 'dg-mono', { size: 18 }) +
      tools.map((t, i) => step(i + 1, box(454, 170 + i * 64, 372, 50, 'dg-chip', 12) + T(640, 203 + i * 64, t, 'dg-mono dg-mono-big', { size: 22 }))).join('') +
      arrow('M872 240 H 966') + T(919, 226, 'read', 'dg-note', { size: 18 }) +
      box(976, 150, 294, 180, 'dg-box', 20) + T(1123, 204, 'incidents/', 'dg-mono dg-mono-big', { size: 26 }) + T(1123, 244, 'local incident data', 'dg-cap', { size: 18 }) +
      T(1123, 290, 'max 200 lines per call', 'dg-cap', { size: 18 }) +
      [['No writes', 150], ['No network', 470], ['Path outside incidents/ → tool error', 860]].map(([t, x]) => cross(x - 110, 500, 'dg-x') + T(x - 84, 507, t, 'dg-deny-t', { anchor: 'start', size: 21 })).join('') +
      T(640, 572, s.tagline || '', 'dg-big', { size: 24 });
    return { viewBox: '0 0 1280 590', svg, steps: 'highlight' };
  };

  /* ---- slide 44: allow · ask · deny (uses the compare columns) ---- */
  D.hooks = s => {
    const cols = s.columns || []; const kinds = ['allow', 'ask', 'deny']; const subs = ['runs', 'a human confirms', 'blocked'];
    const svg = defs +
      box(470, 6, 340, 62, 'dg-box', 16) + T(640, 46, 'Agent tool call', 'dg-step-t', { size: 26 }) + arrow('M640 70 V 104') +
      box(400, 108, 480, 72, 'dg-box dg-box-hi', 18) + T(640, 140, 'Hook + permissions', 'dg-step-t', { size: 26 }) + T(640, 168, 'check each supported call', 'dg-cap', { size: 18 }) +
      arrow('M500 182 C 420 220, 220 210, 210 250', 'dg-arrow') + arrow('M640 182 V 250', 'dg-arrow dg-arrow-o') + arrow('M780 182 C 860 220, 1060 210, 1070 250', 'dg-arrow dg-arrow-r') +
      cols.map((c, i) => { const x = i * 427, w = 400; let y = 316;
        const items = (c.items || []).map(t => { const lines = wrap(t, 29); const g = '<circle class="dg-dot dg-dot-' + kinds[i] + '" cx="' + (x + 28) + '" cy="' + (y - 8) + '" r="7"/>' + T(x + 48, y, lines, 'dg-item', { anchor: 'start', size: 24, lh: 1.18 }); y += lines.length * 28 + 18; return g; }).join('');
        return step(i + 1, box(x, 256, w, 268, 'dg-lane dg-lane-' + kinds[i], 20) + T(x + 24, 294, c.title.toUpperCase(), 'dg-lane-h dg-lane-h-' + kinds[i], { anchor: 'start', size: 30 }) +
          T(x + w - 22, 292, subs[i], 'dg-cap', { anchor: 'end', size: 19 }) + '<g transform="translate(0 22)">' + items + '</g>'); }).join('') +
      T(1270, 548, 'Regex rules are best effort.', 'dg-foot', { anchor: 'end', size: 17 });
    return { viewBox: '0 0 1280 552', svg, steps: 'highlight' };
  };

  /* ---- slide 49: subagents ---- */
  D.subagents = s => {
    const inv = s.cards?.[0] || {}, never = s.cards?.[1] || {};
    const svg = defs +
      step(1, box(10, 110, 250, 200, 'dg-box', 20) + T(135, 160, 'MAIN SESSION', 'dg-role', { size: 19 }) + person(135, 216, 1.6, 'dg-person') + T(135, 278, 'you + Claude', 'dg-cap', { size: 18 })) +
      arrow('M266 210 H 334') + T(300, 196, 'delegate', 'dg-note', { size: 17 }) +
      step(2, box(344, 70, 296, 280, 'dg-context', 24) + T(492, 102, 'OWN CONTEXT', 'dg-ctx-t', { size: 16 }) +
        box(364, 118, 256, 214, 'dg-box', 18) + T(492, 158, inv.title || 'Investigator', 'dg-step-t', { size: 28 }) + bot(492, 210, 64) +
        T(492, 268, '.claude/agents/', 'dg-mono', { size: 15 }) + T(492, 288, 'oncall-investigator.md', 'dg-mono', { size: 15 }) + T(492, 316, 'It only reports.', 'dg-cap', { size: 18 })) +
      arrow('M646 210 H 714') + T(680, 196, 'diagnosis', 'dg-note', { size: 17 }) +
      step(3, box(724, 70, 296, 280, 'dg-context', 24) + T(872, 102, 'NEW CONTEXT', 'dg-ctx-t', { size: 16 }) +
        box(744, 118, 256, 214, 'dg-box', 18) + T(872, 158, 'Verifier', 'dg-step-t', { size: 28 }) + bot(872, 210, 64) +
        T(872, 270, 'Checks the diagnosis.', 'dg-cap', { size: 18 }) + T(872, 296, 'It does not see how.', 'dg-cap', { size: 18 }) + T(872, 322, 'It only reports.', 'dg-cap', { size: 18 })) +
      arrow('M1026 210 H 1074', 'dg-arrow dg-arrow-o') + T(1050, 196, 'report', 'dg-note', { size: 17 }) +
      step(4, box(1080, 110, 190, 200, 'dg-gate', 20) + T(1175, 150, 'HUMAN', 'dg-role dg-orange', { size: 19 }) + person(1175, 206, 1.6, 'dg-person dg-person-o') +
        T(1175, 262, 'accepts', 'dg-step-t dg-orange', { size: 28 }) + T(1175, 292, 'the result', 'dg-cap', { size: 18 })) +
      '<path class="dg-arrow-r dg-dash-r" d="M500 352 C 560 430, 1110 430, 1160 318" marker-end="url(#dg-head-r)"/>' + cross(830, 412, 'dg-x') +
      T(830, 452, never.body || '', 'dg-deny-t', { size: 21 }) +
      box(140, 486, 1000, 80, 'dg-callout dg-callout-o', 18) + T(640, 538, s.tagline || '', 'dg-big', { size: 32 });
    return { viewBox: '0 0 1280 576', svg, steps: 'highlight' };
  };

  /* ---- slide 53: eval, the bench ---- */
  D.eval = s => {
    const checks = ['proposal', 'severity', 'harmful?'];
    const svg = defs +
      step(1, box(10, 40, 270, 250, 'dg-box', 20) + T(145, 80, 'CASE', 'dg-role', { size: 19 }) + T(145, 108, 'bench/cases.json', 'dg-mono', { size: 17 }) +
        ['scenario', 'expected proposal', 'expected severity'].map((t, i) => box(34, 130 + i * 50, 222, 40, 'dg-chip', 10) + T(145, 157 + i * 50, t, 'dg-chip-t', { size: 18 })).join('')) +
      arrow('M286 165 H 340') +
      step(2, box(346, 40, 260, 250, 'dg-box', 20) + T(476, 80, 'INVESTIGATOR', 'dg-role', { size: 19 }) + bot(476, 140, 76) +
        T(476, 210, 'No model needed', 'dg-cap', { size: 18 }) + T(476, 238, 'Runs offline in CI', 'dg-cap', { size: 18 }) + T(476, 266, 'diagnosis + evidence', 'dg-cap dg-cyan', { size: 17 })) +
      arrow('M612 165 H 666') +
      step(3, box(672, 40, 250, 250, 'dg-box', 20) + T(797, 80, 'CHECKS', 'dg-role', { size: 19 }) +
        checks.map((t, i) => tick(712, 130 + i * 56) + T(742, 137 + i * 56, t, 'dg-item', { anchor: 'start', size: 22 })).join('')) +
      arrow('M928 165 H 982') +
      step(4, box(988, 40, 282, 250, 'dg-box dg-box-hi', 20) + T(1129, 80, 'BENCH GATE', 'dg-role dg-cyan', { size: 19 }) +
        T(1129, 124, 'rate ≥ floor', 'dg-mono dg-mono-big', { size: 22 }) + T(1129, 158, 'harmful ≤ 0', 'dg-mono dg-mono-big', { size: 22 }) +
        box(1008, 186, 112, 84, 'dg-pass', 14) + T(1064, 224, 'PASS', 'dg-pass-t', { size: 22 }) + T(1064, 252, 'CI green', 'dg-cap', { size: 15 }) +
        box(1138, 186, 112, 84, 'dg-fail', 14) + T(1194, 224, 'FAIL', 'dg-fail-t', { size: 22 }) + T(1194, 252, 'CI red', 'dg-cap', { size: 15 })) +
      step(5, '<path class="dg-arrow dg-arrow-cyan" d="M145 380 V 302" marker-end="url(#dg-head)"/>' + T(172, 352, 'Each incident becomes a case.', 'dg-note dg-cyan', { size: 22, anchor: 'start' }) +
        (() => { const x0 = 40, y0 = 560, bw = 58; const lv = [1, 1, 2, 2, 3, 4];
        const bars = lv.map((l, i) => '<rect class="dg-bar" x="' + (x0 + i * (bw + 16)) + '" y="' + (y0 - 30 - l * 28) + '" width="' + bw + '" height="' + (30 + l * 28) + '" rx="6"/>').join('');
        let d = 'M' + x0 + ' ' + (y0 - 24 - lv[0] * 28); lv.forEach((l, i) => { const y = y0 - 24 - l * 28; d += ' V ' + y + ' H ' + (x0 + (i + 1) * (bw + 16) - 8); });
        return T(x0, 416, 'THE RATCHET', 'dg-role', { anchor: 'start', size: 19 }) + bars + '<path class="dg-floor" d="' + d + '"/>' +
          T(x0 + 452, y0 - 130, 'floor', 'dg-note dg-orange', { anchor: 'start', size: 22 }) + T(x0 + 452, y0 - 100, 'only goes up', 'dg-cap', { anchor: 'start', size: 18 }); })() +
        '<path class="dg-arrow dg-arrow-r" d="M1194 296 V 398" marker-end="url(#dg-head-r)"/>' +
        box(620, 404, 650, 120, 'dg-callout dg-callout-o', 18) + T(945, 454, s.tagline || '', 'dg-big', { size: 27, wrap: 38 }));
    return { viewBox: '0 0 1280 570', svg, steps: 'highlight' };
  };

  window.ALS_DIAGRAMS = D;
})();
