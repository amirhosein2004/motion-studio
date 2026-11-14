import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,openBrowser} from '@remotion/renderer';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const config=JSON.parse(await fs.readFile(path.join(root,'project.json'),'utf8'));
const timing=JSON.parse(await fs.readFile(path.join(root,'src/timeline.json'),'utf8'));
const qa=path.resolve(root,config.paths.renders,config.version,'qa');
await fs.mkdir(qa,{recursive:true});
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),publicDir:path.join(root,config.paths.public)});
// Use an installed browser; never download a browser during QA.
const candidates=[process.env.CHROME_PATH,path.resolve(root,'../../../installation/tools/remotion/node_modules/.remotion/chrome-headless-shell/win64/chrome-headless-shell-win64/chrome-headless-shell.exe'),path.join(process.env.ProgramFiles??'C:/Program Files','Google/Chrome/Application/chrome.exe')].filter(Boolean);
let browserExecutable;
for(const candidate of candidates){try{await fs.access(candidate);browserExecutable=candidate;break;}catch{}}
if(!browserExecutable)throw new Error('No installed Chrome found. Set CHROME_PATH to an existing executable.');
const browser=await openBrowser('chrome',{browserExecutable});
try{
 const composition=await selectComposition({serveUrl,id:'LLM-Explained',puppeteerInstance:browser});
 let start=0;const frames=[];
 const only=process.argv.find(a=>a.startsWith('--only='))?.split('=')[1].split(',');
 for(const s of timing.scenes){
   if(only&&!only.includes(s.id)){start+=Math.round(s.durationSeconds*config.video.fps);continue;}
   const beats=process.argv.includes('--all-cues')?s.cues.map(c=>({name:c.id,second:Math.min(s.durationSeconds-.5,c.at+.8)})):[{name:'settled',second:s.durationSeconds-1.1}];
   if(s.id==='S02'&&!process.argv.includes('--all-cues'))beats.push({name:'before-update',second:7.2});
   if(s.id==='S04'&&!process.argv.includes('--all-cues'))beats.push({name:'first-selection',second:9.7},{name:'feedback',second:14});
   if(s.id==='S06'&&!process.argv.includes('--all-cues'))beats.push({name:'request',second:2.6},{name:'source-return',second:7.5});
   for(const b of beats){const frame=start+Math.round(b.second*config.video.fps);const name=`${s.id}-${b.name}.png`;await renderStill({serveUrl,composition,frame,output:path.join(qa,name),imageFormat:'png',puppeteerInstance:browser});frames.push({scene:s.id,localSeconds:b.second,frame,file:name});console.log(name,frame);}
   start+=Math.round(s.durationSeconds*config.video.fps);
 }
 await fs.writeFile(path.join(qa,only?`frames-${only.join('-')}.json`:'frames.json'),JSON.stringify(frames,null,2));
 console.log('QA PNG stills only; no video export.');
}finally{await browser.close({silent:true});}
