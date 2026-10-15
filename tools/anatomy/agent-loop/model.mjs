import assert from "node:assert/strict";

// The SDK loop: prompt → model turn → tool_use → tool_result → next model turn → result.
// maxTurns caps model turns (n8n: Options → Max Iterations).
export const STATIONS = Object.freeze(["think", "tool", "observe", "result"]);

export const PRESETS = Object.freeze([
  { id: "msg-01", label: "MSG-01 · one agent, no tool", maxTurns: 4, tools: [] },
  { id: "msg-05", label: "MSG-05 · orchestrator", maxTurns: 4, tools: ["Agent → risk-agent", "Agent → customer-reply-agent"] },
  { id: "msg-05-cut", label: "MSG-05 · maxTurns 2", maxTurns: 2, tools: ["Agent → risk-agent", "Agent → customer-reply-agent"] },
]);

export function runOf(preset, maxTurns = preset.maxTurns) {
  const steps = [{ station: "think", turn: 0, event: `[system:init] maxTurns ${maxTurns}` }];
  let turn = 0;
  const think = () => {
    if (turn + 1 > maxTurns) {
      steps.push({ station: "result", turn, event: `[result] error_max_turns · ${turn} turns`, done: true, subtype: "error_max_turns" });
      return false;
    }
    turn += 1;
    steps.push({ station: "think", turn, event: `[assistant] model turn ${turn}` });
    return true;
  };
  think();
  for (const tool of preset.tools) {
    if (steps.at(-1).done) break;
    steps.push({ station: "tool", turn, event: `[tool_use] ${tool}` });
    steps.push({ station: "observe", turn, event: `[tool_result] ${tool.split(" → ").at(-1)}` });
    think();
  }
  if (!steps.at(-1).done) steps.push({ station: "result", turn, event: `[result] success · ${turn} turn${turn === 1 ? "" : "s"}`, done: true, subtype: "success" });
  return steps;
}

export function assertModel() {
  const [a, b, c] = PRESETS;
  assert.deepEqual(runOf(a).at(-1), { station: "result", turn: 1, event: "[result] success · 1 turn", done: true, subtype: "success" });
  assert.equal(runOf(b).at(-1).subtype, "success");
  assert.equal(runOf(b).at(-1).turn, 3);
  assert.equal(runOf(c).at(-1).subtype, "error_max_turns");
  assert.equal(runOf(c).at(-1).turn, 2);
  assert.deepEqual(runOf(b, 2), runOf(c));
  assert.deepEqual(runOf(c, 4), runOf(b));
  for (const p of PRESETS) for (const m of [1, 2, 3, 4, 5, 6]) for (const s of runOf(p, m)) assert.ok(s.turn <= m && STATIONS.includes(s.station));
  assert.equal(runOf(b).filter((s) => s.station === "tool").length, 2);
  return PRESETS.length;
}

if (process.argv[1]?.endsWith("model.mjs")) console.log(`agent-loop model: ${assertModel()} presets ok`);
