export const routeIds = ['input','orchestrator','context','risk','priority','reply','adapter','switch','human'];

export const routeNodes = [
  {id:'input',kind:'entry',label:'Chat or command',description:'Both entry points trigger the same ticket flow.',responsibility:'Accept one ticket_id and message.',input:'chat text or command',output:'ticket input',position:{x:0,y:20}},
  {id:'orchestrator',kind:'agent',label:'Orchestrator',description:'Runs the three specialists in the source order.',responsibility:'Coordinate one bounded ticket run.',input:'ticket input',output:'specialist trace',position:{x:230,y:20}},
  {id:'context',kind:'agent',label:'Customer Context',description:'Reads customer data first through read-only tools.',responsibility:'Return known customer facts or OPEN.',input:'customer_id',output:'customer context',position:{x:460,y:20}},
  {id:'risk',kind:'agent',label:'Risk',description:'Adds an internal risk note before priority is final.',responsibility:'Assess impact and urgency.',input:'ticket + context',output:'internal risk note',position:{x:690,y:20}},
  {id:'priority',kind:'contract',label:'Priority decision',description:'Chooses low, medium or high before Reply writes.',responsibility:'Apply the accepted priority policy.',input:'ticket + context + risk',output:'priority',position:{x:920,y:20}},
  {id:'reply',kind:'agent',label:'Customer Reply',description:'Writes the customer draft last. It cannot reclassify priority.',responsibility:'Draft one bounded response.',input:'ticket + priority',output:'message draft',position:{x:920,y:185}},
  {id:'adapter',kind:'contract',label:'Output adapter',description:'Builds the exact workflow output after Reply exists.',responsibility:'Return the public data shape.',input:'priority + message draft',output:'output: { priority, message }',position:{x:690,y:185}},
  {id:'switch',kind:'contract',label:'Switch',description:'Fixed code routes priority without case sensitivity.',responsibility:'Select the fixed route in code.',input:'output.priority',output:'auto_reply · investigate · escalate',position:{x:460,y:185}},
  {id:'human',kind:'human',label:'Human review',description:'Draft only. A person approves before customer use.',responsibility:'Review evidence and decide what happens next.',input:'draft + route + evidence',output:'human decision',position:{x:230,y:185}},
  {id:'memory',kind:'file',label:'ticket memory.md',description:'Local exercise extension. The Agent SDK does not read this file.',responsibility:'Keep approved durable ticket context outside the n8n parity flow.',input:'manual review of source facts',output:'sourced summary + OPEN questions',position:{x:0,y:350}},
  {id:'logs',kind:'file',label:'technical logs',description:'Append-only execution evidence. Logs are not curated memory.',responsibility:'Record technical events without rewriting them.',input:'execution events',output:'append-only evidence',position:{x:460,y:350}}
];

export const sideEdges = [['orchestrator','logs']];
