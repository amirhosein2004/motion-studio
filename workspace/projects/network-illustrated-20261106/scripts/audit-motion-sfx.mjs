import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const timeline=JSON.parse(await fs.readFile(path.join(root,'src/timeline.json'),'utf8'));
const assets=JSON.parse(await fs.readFile(path.join(root,'src/sfx-assets.json'),'utf8'));
const previous=JSON.parse(await fs.readFile(path.join(root,'src/sfx-cues.json'),'utf8'));
const motions=[];
function numeric(node,vars={}){
 if(!node)return undefined;
 if(ts.isNumericLiteral(node))return Number(node.text);
 if(ts.isIdentifier(node))return vars[node.text];
 if(ts.isParenthesizedExpression(node))return numeric(node.expression,vars);
 if(ts.isPrefixUnaryExpression(node)&&node.operator===ts.SyntaxKind.MinusToken)return -numeric(node.operand,vars);
 if(ts.isBinaryExpression(node)){
  const a=numeric(node.left,vars),b=numeric(node.right,vars);if(a===undefined||b===undefined)return undefined;
  return ({[ts.SyntaxKind.PlusToken]:()=>a+b,[ts.SyntaxKind.MinusToken]:()=>a-b,[ts.SyntaxKind.AsteriskToken]:()=>a*b,[ts.SyntaxKind.SlashToken]:()=>a/b})[node.operatorToken.kind]?.();
 }
 return undefined;
}
function bindings(node){
 for(let p=node.parent;p;p=p.parent){
  if(ts.isArrowFunction(p)&&ts.isCallExpression(p.parent)&&ts.isPropertyAccessExpression(p.parent.expression)&&p.parent.expression.name.text==='map'){
   const array=p.parent.expression.expression;
   if(ts.isArrayLiteralExpression(array))return array.elements.map((value,i)=>Object.fromEntries(p.parameters.map((v,index)=>[v.name.getText(),index===1?i:numeric(value)])));
  }
 }
 return [{}];
}
for(let i=0;i<timeline.scenes.length;i++){
 const scene=timeline.scenes[i];
 const filename=path.join(root,'src/chapters',scene.id+'.tsx');
 const source=ts.createSourceFile(filename,await fs.readFile(filename,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 function visit(node){
  if(ts.isJsxSelfClosingElement(node)||ts.isJsxOpeningElement(node)){
   const kind=node.tagName.getText(source);
   if(['Node','Box','Line','Packet','Beat'].includes(kind)){
    const prop=name=>node.attributes.properties.find(p=>ts.isJsxAttribute(p)&&p.name.getText(source)===name)?.initializer;
    const at=prop('at');
    if(at&&ts.isJsxExpression(at))for(const vars of bindings(node)){
     const second=numeric(at.expression,vars);
     if(second===undefined)throw new Error(`Unresolved cue: ${scene.id} ${at.getText(source)}`);
     const duration=prop('duration');
     motions.push({id:`${scene.id}-${motions.length+1}`,scene:i+1,kind,second,duration:duration&&ts.isJsxExpression(duration)?numeric(duration.expression,vars):2,source:`src/chapters/${scene.id}.tsx:${source.getLineAndCharacterOfPosition(node.getStart()).line+1}`});
    }
   }
  }
  ts.forEachChild(node,visit);
 }
 visit(source);
}
const events=[];
const priority={Beat:1,Box:2,Node:2,Line:3,Packet:4};
const sounds={Beat:'piece',Box:'reveal',Node:'reveal',Line:'connect',Packet:'transfer'};
const purpose={Beat:'آشکارشدن توضیح یا تغییر وضعیت',Box:'ورود کادر آموزشی',Node:'ورود دستگاه',Line:'آشکارشدن مسیر',Packet:'حرکت داده'};
for(let scene=1;scene<=15;scene++){
 const groups=new Map();
 for(const m of motions.filter(m=>m.scene===scene)){
  const frame=Math.round(m.second*timeline.fps);const group=groups.get(frame)??[];group.push(m);groups.set(frame,group);
 }
 events.push({scene,second:0,sound:'transition',purpose:'ورود سکانس و عنوان',volume:.7,covers:[]});
 let lastTransfer=-Infinity;
 for(const [frame,group] of [...groups.entries()].sort((a,b)=>a[0]-b[0])){
  const m=[...group].sort((a,b)=>priority[b.kind]-priority[a.kind])[0];
  let sound=sounds[m.kind];
  if(m.kind==='Packet'){
   if(m.second-lastTransfer<1.2)sound='piece';else lastTransfer=m.second;
  }
  if(frame===0){events.find(e=>e.scene===scene).covers.push(...group.map(m=>m.id));continue;}
  events.push({scene,second:frame/timeline.fps,sound,purpose:purpose[m.kind],volume:sound==='transfer'?.65:.7,covers:group.map(m=>m.id)});
 }
}
// Explicit semantic overrides where the same visual primitive has another role.
for(const e of events){
 if(e.scene===2&&e.second===19)Object.assign(e,{sound:'disconnect',purpose:'قطع اینترنت',volume:.8});
 if(e.scene===14&&e.second===30)Object.assign(e,{sound:'enter',purpose:'Enter و ارسال دستور ls',volume:.9});
 if(e.scene===11&&(e.second===8||e.second===30))Object.assign(e,{sound:'piece',purpose:e.second===8?'تقسیم داده':'بازسازی داده'});
 if((e.scene===12&&e.second===39)||(e.scene===15&&[15,25].includes(e.second)))Object.assign(e,{sound:'complete',purpose:'آشکارشدن نتیجه یا پاسخ',volume:.65});
}
for(const second of [8.16,8.32,30.16,30.32])events.push({scene:11,second,sound:'piece',purpose:second<10?'جداشدن قطعه‌ها':'کنار هم قرارگرفتن قطعه‌ها',volume:.6,covers:[]});
events.push({scene:11,second:30.7,sound:'complete',purpose:'تکمیل بازسازی داده',volume:.6,covers:[]});
for(const m of motions.filter(m=>m.kind==='Packet')){
 const end=m.second+m.duration;
 const all=motions.filter(n=>n.scene===m.scene);
 if(all.some(n=>n!==m&&Math.abs(n.second-end)<.65))continue;
 if(events.some(e=>e.scene===m.scene&&Math.abs(e.second-end)<.65))continue;
 events.push({scene:m.scene,second:end,sound:'arrival',purpose:'رسیدن داده در انتهای مسیر',volume:.6,covers:[]});
}
events.sort((a,b)=>a.scene-b.scene||a.second-b.second);
events.forEach((e,i)=>{e.id=`SFX_${String(i+1).padStart(3,'0')}`;const scene=timeline.scenes[e.scene-1];if(Math.round(e.second*timeline.fps)+Math.ceil(assets[e.sound].duration*timeline.fps)>scene.durationInFrames)throw new Error(`SFX crosses scene: ${e.id}`);});
const covered=new Set(events.flatMap(e=>e.covers));
const uncovered=motions.filter(m=>!covered.has(m.id));
if(uncovered.length)throw new Error(JSON.stringify(uncovered));
const out=path.join(root,'../../renders',path.basename(root),'qa-v4');await fs.mkdir(out,{recursive:true});
try{await fs.access(path.join(out,'sfx-before.json'));}catch{await fs.writeFile(path.join(out,'sfx-before.json'),JSON.stringify(previous,null,2));}
await fs.writeFile(path.join(root,'src/sfx-cues.json'),JSON.stringify({version:'v4-reviewed',status:'provisional-awaiting-human-voice',masterVolume:.85,events},null,2));
await fs.writeFile(path.join(out,'motion-sfx-coverage.json'),JSON.stringify({motionCount:motions.length,eventCount:events.length,previousEventCount:previous.events.length,uncovered,motions,events},null,2));
const samples=[];
for(let i=0;i<timeline.scenes.length;i++){
 const scene=timeline.scenes[i];const seconds=new Set([1,scene.durationInFrames/timeline.fps-1.5]);
 for(const m of motions.filter(m=>m.scene===i+1)){seconds.add(m.second+.9);if(m.kind==='Packet')seconds.add(m.second+m.duration/2);}
 for(const second of [...seconds].sort((a,b)=>a-b))if(second<scene.durationInFrames/timeline.fps)samples.push({scene:i+1,second,frame:scene.fromFrame+Math.round(second*timeline.fps)});
}
await fs.writeFile(path.join(out,'audit-samples.json'),JSON.stringify(samples,null,2));
console.log(JSON.stringify({motions:motions.length,previousEvents:previous.events.length,events:events.length,uncovered:uncovered.length,samples:samples.length}));
