import { AGENTS, TOOLS } from "./model.mjs";
const fixed = ["base-plate", "base-groove", "base-screws", "cabinet-body", "cabinet-cap", "cap-groove", "cap-screws", "label-plate",
  "lock-bar", "lock-cylinder", "lock-ring", "key-bow", "key-grip", "pawl-guide", "deny-pawl", "key-tray", "tray-screws", "handoff-rail", "delegate-line", "delegate-dots",
  "dial-body", "dial-knurl", "dial-face", "dial-ticks", "dial-threshold", "dial-needle", "dial-hub", "relay-block", "relay-seam", "relay-wires",
  "switch-base", "switch-lever", "switch-knob", "switch-text", "terminal-lamp-base", "terminal-lamp", "ticker-housing", "audit-tape"];
const feet = [1, 2, 3, 4].map((i) => `foot-${i}`);
const drawers = TOOLS.flatMap((t) => [`drawer-${t.id}`, `plate-${t.id}`, `screws-${t.id}`, ...(t.kind === "draft" ? [`lip-${t.id}`] : [`pull-${t.id}`, `pull-post-${t.id}-a`, `pull-post-${t.id}-b`]), ...(t.kind === "write" ? [`lock-${t.id}`] : [])]);
const keys = AGENTS.flatMap((a) => [`slot-${a.id}`, `bow-${a.id}`, `shank-${a.id}`, ...a.tools.map((_, i) => `bit-${a.id}-${i + 1}`)]);
const lamps = ["allow", "ask", "deny"].flatMap((id) => [`lamp-base-${id}`, `lamp-${id}`, `lamp-text-${id}`]);
const relayScrews = [1, 2, 3, 4].map((i) => `relay-screw-${i}`);
const audit = [1, 2, 3, 4, 5, 6].map((i) => `audit-line-${i}`);
export const PARTS = Object.freeze([...fixed, ...feet, ...drawers, ...keys, ...lamps, ...relayScrews, ...audit]);
