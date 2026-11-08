import {useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Background, Controls, Handle, MarkerType, Position, ReactFlow} from '@xyflow/react';
import {routeIds, routeNodes, sideEdges} from './route.mjs';

const byId = new Map(routeNodes.map(node => [node.id,node]));
const steps = routeIds.map(id => [id, `${byId.get(id).label}: ${byId.get(id).output}`]);
const initialEdges = [...routeIds.slice(0,-1).map((source,index) => [source,routeIds[index + 1]]),...sideEdges]
  .map(([source,target]) => ({id: `${source}-${target}`,source,target,markerEnd:{type:MarkerType.ArrowClosed}}));

function RouteNode({data, selected}) {
  return <button className={`route-node ${data.kind} ${data.active ? 'active' : ''} ${selected ? 'selected' : ''}`} aria-label={`${data.label}. ${data.description}`}>
    <Handle type="target" position={Position.Left}/>
    <span className="kind">{data.kind}</span>
    <strong>{data.label}</strong>
    <Handle type="source" position={Position.Right}/>
  </button>;
}

const nodeTypes = {route: RouteNode};

function App() {
  const [step, setStep] = useState(-1);
  const [selected, setSelected] = useState('orchestrator');
  const nodes = useMemo(() => routeNodes.map(node => ({
    id:node.id, type:'route', position:node.position,
    data:{...node,active:step >= 0 && steps[step]?.[0] === node.id}
  })), [step]);
  const current = nodes.find(node => node.id === selected) || nodes[1];
  const advance = () => setStep(value => {
    const next = value >= steps.length - 1 ? -1 : value + 1;
    setSelected(next < 0 ? 'orchestrator' : steps[next][0]);
    return next;
  });
  const reset = () => { setStep(-1); setSelected('orchestrator'); };
  return <main>
    <header>
      <div><span className="eyebrow">DAY 4 · VISUAL REFERENCE</span><h1>One ticket. Three specialists. One human gate.</h1></div>
      <span className="simulation">Teaching simulation · no model calls</span>
    </header>
    <section className="canvas" aria-label="Interactive Day 4 agent route">
      <ReactFlow nodes={nodes} edges={initialEdges} nodeTypes={nodeTypes} onNodeClick={(_,node) => setSelected(node.id)} fitView fitViewOptions={{padding:.12}} minZoom={.6} maxZoom={1.6} nodesConnectable={false} nodesDraggable={false} elementsSelectable deleteKeyCode={null} colorMode="dark">
        <Background color="#25475a" gap={22}/>
        <Controls showInteractive={false}/>
      </ReactFlow>
    </section>
    <aside className="detail" aria-live="polite">
      <div className="detail-copy"><span className={`badge ${current.data.kind}`}>{current.data.kind}</span><h2>{current.data.label}</h2><p>{current.data.description}</p></div>
      <dl><div><dt>Responsibility</dt><dd>{current.data.responsibility}</dd></div><div><dt>Input</dt><dd>{current.data.input}</dd></div><div><dt>Output</dt><dd>{current.data.output}</dd></div></dl>
      <div className="demo"><strong>{step < 0 ? 'Ready' : `Step ${step + 1} of ${steps.length}`}</strong><span>{step < 0 ? 'Select a node or play the route.' : steps[step][1]}</span></div>
      <div className="detail-actions"><div className="buttons"><button onClick={advance}>{step < 0 ? 'Play route' : step === steps.length - 1 ? 'Reset' : 'Next step'}</button><button className="secondary" onClick={reset}>Reset</button></div><div className="legend"><span className="agent">Agent</span><span className="contract">Code / contract</span><span className="file">File</span><span className="human">Human</span></div></div>
    </aside>
  </main>;
}

createRoot(document.getElementById('root')).render(<App/>);
