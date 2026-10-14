// Pure model of the Workshop 4 permission layers. Values come from the deck text
// (slides 41–43); the repo has no transaction-guard.mjs yet, see the build report.
export const AUTO_APPROVE_TRANSACTION_AMOUNT = 100;

export const TOOLS = Object.freeze([
  { id: "get_customer", kind: "read" },
  { id: "get_transaction", kind: "read" },
  { id: "list_transactions", kind: "read" },
  { id: "save_reply_draft", kind: "draft" },
  { id: "update_transaction", kind: "write" },
  { id: "add_transaction", kind: "write" },
  { id: "delete_transaction", kind: "write" },
]);

export const AGENTS = Object.freeze([
  { id: "risk-agent", tools: ["get_transaction", "list_transactions"] },
  { id: "customer-context-agent", tools: ["get_customer"] },
  { id: "customer-reply-agent", tools: ["save_reply_draft"] },
  { id: "transaction-agent", tools: ["get_transaction", "update_transaction", "add_transaction", "delete_transaction"] },
  // allowedTools of the orchestrator: reads only; writes are delegated.
  { id: "orchestrator", tools: ["get_transaction", "list_transactions"], orchestrator: true },
]);

const kindOf = (tool) => TOOLS.find((t) => t.id === tool)?.kind;

// input: { agent, tool, amount?, fraud?, terminal (default true), answer? ('y'|'N') }
// result: { layer, decision, audit, delegate, reason }
//   decision: 'allow' | 'ask' | 'deny' | 'blocked'
export function evaluate(input) {
  const agent = AGENTS.find((a) => a.id === input.agent);
  if (!agent) throw new Error(`unknown agent ${input.agent}`);
  const kind = kindOf(input.tool);
  if (!kind) throw new Error(`unknown tool ${input.tool}`);
  const terminal = input.terminal ?? true;
  if (!agent.tools.includes(input.tool)) {
    if (agent.orchestrator && kind === "write") {
      return { layer: 2, decision: "blocked", audit: 0, delegate: true, reason: "no write tool in allowedTools: delegate to transaction-agent" };
    }
    return { layer: 1, decision: "blocked", audit: 0, delegate: false, reason: "tool is not in the agent's tools list" };
  }
  if (kind === "read") return { layer: 3, decision: "allow", audit: 0, delegate: false, reason: "read" };
  if (kind === "draft") return { layer: 3, decision: "allow", audit: 1, delegate: false, reason: "draft saved for human review" };
  const small = input.tool === "update_transaction" && (input.amount ?? 0) < AUTO_APPROVE_TRANSACTION_AMOUNT && !input.fraud;
  if (small) return { layer: 3, decision: "allow", audit: 1, delegate: false, reason: `update below ${AUTO_APPROVE_TRANSACTION_AMOUNT}` };
  if (input.fraud === "hold") return { layer: 3, decision: "deny", audit: 0, delegate: false, reason: "fraud hold: ESCALATE" };
  if (!terminal) return { layer: 4, decision: "deny", audit: 0, delegate: false, reason: "no person to ask (claude -p): ESCALATE" };
  if (input.answer === "y") return { layer: 4, decision: "allow", audit: 1, delegate: false, reason: "person answered y: applied" };
  if (input.answer === "N") return { layer: 4, decision: "deny", audit: 0, delegate: false, reason: "person answered N: ESCALATE, no retry" };
  return { layer: 4, decision: "ask", audit: 0, delegate: false, reason: "a person decides: y/N" };
}

export const PRESETS = Object.freeze([
  { id: "quiz", label: "orchestrator · update_transaction", input: { agent: "orchestrator", tool: "update_transaction", amount: 49.99 }, readout: "orchestrator · update_transaction → no write key · delegate to transaction-agent" },
  { id: "blocked", label: "risk-agent · update_transaction", input: { agent: "risk-agent", tool: "update_transaction", amount: 49.99 }, readout: "risk-agent · update_transaction → blocked (not in tools list)" },
  { id: "read", label: "risk-agent · get_transaction", input: { agent: "risk-agent", tool: "get_transaction" }, readout: "risk-agent · get_transaction → allow · read" },
  { id: "draft", label: "customer-reply-agent · save_reply_draft", input: { agent: "customer-reply-agent", tool: "save_reply_draft" }, readout: "customer-reply-agent · save_reply_draft → allow · audit +1 · human reads the draft" },
  { id: "small", label: "transaction-agent · update 49.99", input: { agent: "transaction-agent", tool: "update_transaction", amount: 49.99 }, readout: "transaction-agent · update_transaction 49.99 → allow · audit +1" },
  { id: "large-ask", label: "transaction-agent · update 899", input: { agent: "transaction-agent", tool: "update_transaction", amount: 899 }, readout: "transaction-agent · update_transaction 899 → ask · y/N?" },
  { id: "large-y", label: "update 899 · y", input: { agent: "transaction-agent", tool: "update_transaction", amount: 899, answer: "y" }, readout: "transaction-agent · update_transaction 899 → ask → y → applied · audit +1" },
  { id: "large-n", label: "update 899 · N", input: { agent: "transaction-agent", tool: "update_transaction", amount: 899, answer: "N" }, readout: "transaction-agent · update_transaction 899 → ask → N → deny · ESCALATE · no retry" },
  { id: "add", label: "transaction-agent · add", input: { agent: "transaction-agent", tool: "add_transaction", amount: 120 }, readout: "transaction-agent · add_transaction → ask · y/N?" },
  { id: "delete", label: "transaction-agent · delete", input: { agent: "transaction-agent", tool: "delete_transaction", amount: 60 }, readout: "transaction-agent · delete_transaction → ask · y/N?" },
  { id: "fraud", label: "fraud medium · update 60", input: { agent: "transaction-agent", tool: "update_transaction", amount: 60, fraud: "medium" }, readout: "fraud-check-agent: medium · update_transaction 60 → ask · y/N?" },
  { id: "hold", label: "fraud hold · update 60", input: { agent: "transaction-agent", tool: "update_transaction", amount: 60, fraud: "hold" }, readout: "fraud-check-agent: hold · update_transaction → deny · ESCALATE" },
  { id: "headless", label: "claude -p · delete", input: { agent: "transaction-agent", tool: "delete_transaction", amount: 60, terminal: false }, readout: "claude -p · delete_transaction → deny · ESCALATE (nobody to ask)" },
]);

export function assertModel() {
  const expect = { quiz: "blocked", blocked: "blocked", read: "allow", draft: "allow", small: "allow", "large-ask": "ask", "large-y": "allow", "large-n": "deny", add: "ask", delete: "ask", fraud: "ask", hold: "deny", headless: "deny" };
  const audit = { draft: 1, small: 1, "large-y": 1 };
  for (const p of PRESETS) {
    const r = evaluate(p.input);
    if (r.decision !== expect[p.id]) throw new Error(`${p.id}: expected ${expect[p.id]}, got ${r.decision}`);
    if (r.audit !== (audit[p.id] ?? 0)) throw new Error(`${p.id}: audit lines ${r.audit}`);
  }
  if (!evaluate(PRESETS[0].input).delegate) throw new Error("orchestrator write must delegate");
  if (evaluate({ agent: "transaction-agent", tool: "update_transaction", amount: AUTO_APPROVE_TRANSACTION_AMOUNT }).decision !== "ask") throw new Error("threshold is inclusive");
  if (evaluate({ agent: "transaction-agent", tool: "update_transaction", amount: AUTO_APPROVE_TRANSACTION_AMOUNT - 0.01 }).decision !== "allow") throw new Error("just below threshold allows");
  if (AGENTS.filter((a) => a.tools.includes("update_transaction")).map((a) => a.id).join() !== "transaction-agent") throw new Error("only transaction-agent may update");
  return PRESETS.length;
}

if (process.argv[1]?.endsWith("model.mjs")) console.log(`permissions model: ${assertModel()} presets ok`);
