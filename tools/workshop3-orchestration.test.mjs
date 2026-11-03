import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workflowPath = path.join(root, 'assets/day3-orchestration/n8n-triage-l3-orchestration.json');
const workflow = JSON.parse(readFileSync(workflowPath, 'utf8'));
const nodeByName = name => workflow.nodes.find(node => node.name === name);

const parseDecision = new Function(
  '$json',
  `"use strict";\n${nodeByName('Parse Decision').parameters.jsCode}`,
);

const renderSetOutput = (node, input) => {
  const template = node.parameters.jsonOutput;
  assert.ok(template.startsWith('='), `${node.name} must use a JSON expression`);
  const rendered = template.slice(1).replace(/\{\{([\s\S]*?)\}\}/g, (_, expression) => {
    const value = new Function('$json', `"use strict"; return (${expression.trim()});`)(input);
    return value === undefined ? 'null' : String(value);
  });
  return JSON.parse(rendered);
};

test('Parse Decision accepts only the three reviewable priorities', () => {
  for (const priority of ['low', 'medium', 'high']) {
    const result = parseDecision({
      output: JSON.stringify({
        ticket_id: 'WL-1026',
        priority,
        summary: 'Synthetic fixture',
        draft_only: false,
        human_approval_required: false,
      }),
    });
    assert.equal(result.json.priority, priority);
    assert.equal(result.json.draft_only, true);
    assert.equal(result.json.human_approval_required, true);
  }
});

test('Parse Decision rejects malformed, non-object, missing, and unexpected priorities', () => {
  const cases = [
    [{ output: '{"priority":"urgent"}' }, /priority must be exactly one of low, medium, or high/],
    [{ output: '{"ticket_id":"WL-1026"}' }, /priority must be exactly one of low, medium, or high/],
    [{ output: '{"priority":' }, /model output must be valid JSON/],
    [{ output: '[]' }, /model output must be a JSON object/],
  ];
  for (const [input, message] of cases) {
    assert.throws(() => parseDecision(input), message);
  }
});

test('Priority fallback terminates at a local Needs Review Set node', () => {
  const prioritySwitch = nodeByName('Priority Switch');
  assert.equal(prioritySwitch.parameters.options.fallbackOutput, 'extra');
  const outputs = workflow.connections['Priority Switch'].main;
  assert.equal(outputs.length, 4);
  assert.equal(outputs[3].length, 1);
  const fallbackTarget = outputs[3][0];
  assert.equal(fallbackTarget.node, 'Needs Review');
  assert.equal(nodeByName(fallbackTarget.node).type, 'n8n-nodes-base.set');
  assert.equal(workflow.connections['Needs Review'], undefined);
});

test('Priority Set outputs preserve routing context as reviewable proposals', () => {
  const fixture = {
    ticket_id: 'WL-1026',
    priority: 'urgent',
    summary: 'Synthetic fixture summary',
    customer_reply: 'Synthetic customer reply',
    risk_note: 'Synthetic risk note',
  };
  const expected = [
    ['Low Priority Action', 'low', 'PROPOSED_REPLY', 'Self-service support'],
    ['Medium Priority Action', 'medium', 'PROPOSED_INVESTIGATION', 'Support team'],
    ['High Priority Action', 'high', 'PROPOSED_ESCALATION', 'Payments escalation team'],
    ['Needs Review', 'urgent', 'NEEDS_REVIEW', 'Support review'],
  ];

  for (const [name, priority, action, team] of expected) {
    const output = renderSetOutput(nodeByName(name), fixture);
    assert.equal(output.ticket_id, fixture.ticket_id);
    assert.equal(output.priority, priority);
    assert.equal(output.action, action);
    assert.equal(output.team, team);
    assert.equal(output.summary, fixture.summary);
    assert.equal(output.customer_reply, fixture.customer_reply);
    assert.equal(output.risk_note, fixture.risk_note);
    assert.equal(output.draft_only, true);
    assert.equal(output.human_approval_required, true);
    assert.match(output.message, /review/i);
    assert.match(output.message, /proposal/i);
  }

  const highOutput = renderSetOutput(nodeByName('High Priority Action'), fixture);
  assert.equal(highOutput.sla, 'Respond within 30 minutes');
});
