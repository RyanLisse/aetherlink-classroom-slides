export const STATIONS = Object.freeze([
  { id: "think", label: "THINK", position: [0, -62], note: "model turn" },
  { id: "tool", label: "TOOL", position: [62, 0], note: "tool_use" },
  { id: "observe", label: "OBSERVE", position: [0, 62], note: "tool_result" },
  { id: "result", label: "RESULT", position: [-62, 0], note: "result" },
]);

const station = (s) => [`${s.id}-deck`, `${s.id}-riser`, `${s.id}-tool`, `${s.id}-lamp`, `${s.id}-terminal`, `${s.id}-label`];

export const PARTS = Object.freeze([
  "foot-nw", "foot-ne", "foot-sw", "foot-se", "base-plate", "base-groove", "corner-screws", "label-plate", "label-rules",
  "turntable-lower", "turntable-upper", "turntable-hub", "turntable-index", "track-outer", "track-inner",
  ...STATIONS.flatMap(station),
  "token", "token-carriage",
  "pawl-housing", "pawl-arm", "pawl-pivot", "rim-notch",
  "operator-pedestal", "operator-console", "operator-screen", "aetherbot",
  "counter-post", "counter-bracket", "counter-knob", "counter-knob-ticks", "dial-base", "dial-face", "dial-bezel", "dial-ticks", "dial-needle", "dial-pin", "dial-limit",
]);

export const partCount = PARTS.length;
if (new Set(PARTS).size !== partCount) throw new Error("duplicate agent-loop part");
if (partCount < 40) throw new Error(`agent-loop needs 40 parts, has ${partCount}`);
