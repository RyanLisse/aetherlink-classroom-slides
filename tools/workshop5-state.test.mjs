import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=name=>readFileSync(path.join(root,name),'utf8');
const expectedStateIds=[
 '0:AI-native SDLC: more than generating code',
 'w5:recap-w4',
 '1:The lifecycle: AI assists, humans decide',
 '2:Your assignment and definition of done',
 '3:The practice system: two agents, one shop',
 '4:Working boundaries',
 '5:Open Claude Code',
 '6:First assignment: understand before editing',
 '7:Start the lab and check your starting point',
 '8:Break',
 '9:Specify: start with an observed problem',
 '10:Create one fault and observe detection',
 '11:Check the diagnosis against the evidence',
 '12:Turn the finding into an intent',
 '13:Accept the assignment before building',
 '14:Lunch',
 '15:Establish a reviewable starting point',
 '16:Ask for a small plan, then review it',
 '17:Understand the tool before repair',
 '18:Repair the tool: red → green',
 '19:Check the change on the same incident',
 '20:Understand the human approval gate',
 '21:Repair the gate: refuse unsafe actions',
 '22:Verify the complete change',
 '23:Break',
 '24:Review the actual diff',
 '25:Prepare the PR and make a release decision',
 '26:Observe runtime with separate permission',
 '27:Recovery: confirmed or not confirmed?',
 '28:Turn the observation into the next task',
 '29:Continue independently',
 '30:Show the completed lifecycle',
 '31:skills',
 '32:External skills: read first',
 '33:Hooks: allow, ask, deny',
 '34:subagents',
 '35:Extend the bench without weakening it',
 '36:CI: repeat the checks',
 '37:Production: different signals, same boundaries',
];

const loadSlides=()=>{
 const context={window:{}};
 vm.runInNewContext(read('workshop5-slides.js'),context);
 return context.window.SLIDES;
};
const memoryStorage=()=>{
 const values=new Map(),writes=[];
 return {
  getItem(key){return values.has(key)?values.get(key):null;},
  setItem(key,value){writes.push({key,value});values.set(key,String(value));},
  removeItem(key){values.delete(key);},
  writes,
 };
};
const element=tag=>({
 tag,children:[],className:'',textContent:'',hidden:false,value:'',
 style:{},classList:{toggle(){}},
 append(...items){this.children.push(...items);},
 addEventListener(){},setAttribute(){},
});
const loadTimerApi=(storage,now)=>{
 const context={
  window:{},localStorage:storage,Date:{now:()=>now},
  document:{activeElement:null,createElement:element,createTextNode:text=>element('#text')},
  setInterval(){return 1;},clearInterval(){},
 };
 vm.runInNewContext(read('timers.js'),context);
 return context.window.ALSTimer;
};
const runAppTimer=(api,slide,index)=>{
 const source=read('app.js'),start=source.indexOf('function renderTimer(stage, s) {');
 const end=source.indexOf('\nfunction renderLayout(stage, s)',start);
 assert.ok(start>=0&&end>start);
 const context={
  ALSTimer:api,current:index,
  slideController:{signal:{addEventListener(){}}},
 };
 const render=vm.runInNewContext(`${source.slice(start,end)}; renderTimer`,context);
 const stage={children:[],append(...items){this.children.push(...items);}};
 render(stage,slide);
 return stage.children[0];
};
const runPresenterTimer=(api,slide,index)=>{
 const source=read('presenter.js'),start=source.indexOf('function setupTimer(s) {');
 const end=source.indexOf('\nfunction renderSlide(index)',start);
 assert.ok(start>=0&&end>start);
 const elements=new Map([
  ['p-timer-slot',{children:[],hidden:false,replaceChildren(...items){this.children=items;},append(...items){this.children.push(...items);}}],
  ['p-timer',{hidden:false}],
  ['p-timer-label',{textContent:''}],
 ]);
 const context={
  ALSTimer:api,current:index,AbortController,
  $:id=>elements.get(id),
 };
 const setup=vm.runInNewContext(`let timerController=null;${source.slice(start,end)}; setupTimer`,context);
 setup(slide);
 return elements.get('p-timer-slot').children[0];
};
const runAppStateHelpers=(slides,current,sessionStorage)=>{
 const source=read('app.js'),start=source.indexOf('const stateKey =');
 const end=source.indexOf('\nfunction renderInstructions',start);
 const context={slides,current,sessionStorage};
 return vm.runInNewContext(`${source.slice(start,end)}; ({stateKey,loadState,saveState})`,context);
};
const runAppVisibility=(slides,localStorage)=>{
 const source=read('app.js'),start=source.indexOf('const hideId =');
 const end=source.indexOf('\nfunction visibleFrom',start);
 const context={slides,localStorage,DECK_ID:'workshop5.html',HIDDEN_KEY:'als:hidden:workshop5.html'};
 return vm.runInNewContext(`${source.slice(start,end)}; ({hideId,isHidden,toggleHidden})`,context);
};
const runPresenterVisibility=(slides,localStorage)=>{
 const source=read('presenter.js'),start=source.indexOf('function isHidden(i) {');
 const end=source.indexOf('\n\n/* ---- the timer',start);
 const context={slides,localStorage,HIDDEN_KEY:'als:hidden:workshop5.html',SHOWN_KEY:'als:shown:workshop5.html'};
 return vm.runInNewContext(`${source.slice(start,end)}; isHidden`,context);
};

test('Workshop 5 state IDs are explicit, frozen and unique',()=>{
 const slides=loadSlides();
 assert.deepEqual(Array.from(slides,s=>s.stateId),expectedStateIds);
 assert.equal(new Set(expectedStateIds).size,expectedStateIds.length);
 assert.notEqual(slides[9].stateId,slides[24].stateId);
});

test('Stable IDs preserve a running timer in the deck and presenter',()=>{
 const slides=loadSlides(),slide={...slides[19],title:'Repair tool (renamed)'};
 const id=expectedStateIds[19],key='als:timer:'+id,now=1700000000000;
 const seeded={total:900,left:90,running:true,endAt:now+90000};
 const storage=memoryStorage();storage.setItem(key,JSON.stringify(seeded));storage.writes.length=0;
 const api=loadTimerApi(storage,now);
 assert.equal(api.key(19,slide.title,slide.stateId),key);
 assert.equal(api.key(3,'Legacy title'),'als:timer:3:Legacy title');
 assert.equal(runAppTimer(api,slide,19).children[0].textContent,'01:30');
 assert.equal(runPresenterTimer(api,slide,19).children[0].textContent,'01:30');
 assert.deepEqual(JSON.parse(storage.getItem(key)),seeded);
 assert.equal(api.left(api.read(key,0)),90);
 assert.equal(storage.writes.length,0);
 const app=read('app.js'),presenter=read('presenter.js');
 assert.equal((app.match(/ALSTimer\.key\(current, s\.title, s\.stateId\)/g)||[]).length,4);
 assert.equal((presenter.match(/ALSTimer\.key\(current, s\.title, s\.stateId\)/g)||[]).length,1);
});

test('Checklist and hidden preferences survive reorder, rename and reload',()=>{
 const id=expectedStateIds[19],slide={...loadSlides()[19],title:'Repair tool (renamed)'};
 const slides=Array.from({length:21},()=>({title:'other'}));slides[20]=slide;
 const sessionStorage=memoryStorage();
 sessionStorage.setItem('als:'+id,JSON.stringify({done:[true,false],passed:true}));
 const state=runAppStateHelpers(slides,20,sessionStorage);
 assert.equal(state.stateKey(),'als:'+id);
 assert.deepEqual(JSON.parse(JSON.stringify(state.loadState())),{done:[true,false],passed:true});
 state.saveState({...state.loadState(),done:[true,true]});
 slide.title='Repair tool (renamed again)';
 assert.deepEqual(JSON.parse(JSON.stringify(state.loadState())),{done:[true,true],passed:true});
 const reloaded=runAppStateHelpers(slides,20,sessionStorage);
 assert.deepEqual(JSON.parse(JSON.stringify(reloaded.loadState())),{done:[true,true],passed:true});

 const hiddenKey='als:hidden:workshop5.html',shownKey='als:shown:workshop5.html';
 const storage=memoryStorage();storage.setItem(hiddenKey,JSON.stringify([id]));
 const app=runAppVisibility(slides,storage),presenter=runPresenterVisibility(slides,storage);
 assert.equal(app.hideId(20),id);assert.equal(app.isHidden(20),true);assert.equal(presenter(20),true);
 assert.equal(app.toggleHidden(20),false);assert.equal(app.isHidden(20),false);assert.equal(presenter(20),false);
 assert.equal(app.toggleHidden(20),true);assert.equal(app.isHidden(20),true);assert.equal(presenter(20),true);
 const appReload=runAppVisibility(slides,storage),presenterReload=runPresenterVisibility(slides,storage);
 assert.equal(appReload.isHidden(20),true);assert.equal(presenterReload(20),true);

 const hiddenSlide={...slide,hidden:true},shownStorage=memoryStorage();
 shownStorage.setItem(shownKey,JSON.stringify([id]));
 const shownApp=runAppVisibility(Object.assign(slides.slice(),{20:hiddenSlide}),shownStorage);
 const shownPresenter=runPresenterVisibility(Object.assign(slides.slice(),{20:hiddenSlide}),shownStorage);
 assert.equal(shownApp.isHidden(20),false);assert.equal(shownPresenter(20),false);
 assert.equal(shownApp.toggleHidden(20),true);assert.equal(shownPresenter(20),true);
 assert.equal(shownApp.toggleHidden(20),false);assert.equal(shownPresenter(20),false);
 assert.deepEqual(JSON.parse(shownStorage.getItem(shownKey)),[id]);

 const legacySlides=Array.from({length:4},()=>({title:'other'}));legacySlides[3]={title:'Legacy title'};
 assert.equal(runAppStateHelpers(legacySlides,3,memoryStorage()).stateKey(),'als:3:Legacy title');
 assert.equal(runAppVisibility(legacySlides,memoryStorage()).hideId(3),'3:Legacy title');
});
