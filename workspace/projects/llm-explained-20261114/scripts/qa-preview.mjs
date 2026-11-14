import {openBrowser} from '@remotion/renderer';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const config=JSON.parse(await fs.readFile(path.join(root,'project.json'),'utf8'));
const timeline=JSON.parse(await fs.readFile(path.join(root,'src/timeline.json'),'utf8'));
const reports=path.resolve(root,config.paths.renders,config.version,'reports');
const qa=path.resolve(root,config.paths.renders,config.version,'qa');
await fs.mkdir(reports,{recursive:true});await fs.mkdir(qa,{recursive:true});
const browserExecutable=path.resolve(root,'../../../installation/tools/remotion/node_modules/.remotion/chrome-headless-shell/win64/chrome-headless-shell-win64/chrome-headless-shell.exe');
const browser=await openBrowser('chrome',{browserExecutable});
try{
 const logs=[];
 const page=await browser.newPage({context:()=>null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:log=>logs.push(log),onLog:()=>{}});
 await page.evaluateOnNewDocument(()=>{
   window.__qaAudio={blocks:0,nonSilentBlocks:0,contexts:[]};
   const original=AudioBufferSourceNode.prototype.start;
   AudioBufferSourceNode.prototype.start=function(...args){
     const qa=window.__qaAudio;qa.blocks++;
     if(!qa.contexts.includes(this.context))qa.contexts.push(this.context);
     if(this.buffer){const samples=this.buffer.getChannelData(0);if(samples.some(v=>Math.abs(v)>1e-6))qa.nonSilentBlocks++;}
     return original.apply(this,args);
   };
 });
 await page.setViewport({width:1920,height:1180,deviceScaleFactor:1});
 await page.goto({url:'http://localhost:3126/LLM-Explained',timeout:20000});
 // Discover the actual public root from the running Studio.
 let base;
 for(let i=0;i<30;i++){
   base=await page.evaluate(()=>window.remotion_staticBase);
   if(base)break;await new Promise(r=>setTimeout(r,100));
 }
 if(!base)throw new Error('Studio did not expose its actual public root.');
 const playerURL=new URL(base+'/preview.html',page.url()).href;
 await page.goto({url:playerURL,timeout:20000});
 let ready=false;
 for(let i=0;i<80;i++){
   ready=await page.evaluate(()=>!!window.reviewReady);
   if(ready)break;await new Promise(r=>setTimeout(r,150));
 }
 if(!ready){const state=await page.evaluate(()=>({body:document.body.innerText,html:document.getElementById('app')?.innerHTML,fonts:document.fonts.status}));throw new Error('Player not ready: '+JSON.stringify({state,logs}));}
 console.log('Player loaded:',playerURL);
 const controlsOnly=process.argv.includes('--controls-only');
 const snapshots=controlsOnly?JSON.parse(await fs.readFile(path.join(reports,'layout-samples.json'),'utf8')).snapshots:[];let start=0;
 if(!controlsOnly)for(const scene of timeline.scenes){
   for(const second of [...scene.cues.flatMap(c=>[c.at+.18,c.at+.8]),scene.durationSeconds-.5]){
     const frame=start+Math.round(Math.min(second,scene.durationSeconds-.1)*config.video.fps);
     await page.evaluate(frame=>window.reviewPlayer.seekTo(frame),frame);
     await new Promise(r=>setTimeout(r,55));
     const layout=await page.evaluate(()=>{
       const visible=el=>{for(let a=el;a;a=a.parentElement){const s=getComputedStyle(a);if(s.visibility==='hidden'||s.display==='none'||Number(s.opacity)<.08)return false;}return true;};
       const stage=[...document.querySelectorAll('[data-qa="stage"]')].find(visible);
       if(!stage)return {missingStage:true};
       const bounds=stage.getBoundingClientRect(),scale=bounds.width/1920;
       const nodes=[...stage.querySelectorAll('[data-qa="text"],[data-qa="vector"]')].filter(visible);
       const items=nodes.map(el=>{const range=document.createRange();range.selectNodeContents(el);return {text:el.textContent,dir:getComputedStyle(el).direction,align:getComputedStyle(el).textAlign,rects:[...range.getClientRects()].map(r=>({x:(r.left-bounds.left)/scale,y:(r.top-bounds.top)/scale,w:r.width/scale,h:r.height/scale}))};});
       const collisions=[];
       for(let i=0;i<items.length;i++)for(let j=i+1;j<items.length;j++){
         if(items[i].rects.some(a=>items[j].rects.some(b=>Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)>4&&Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)>3)))collisions.push([items[i].text,items[j].text]);
       }
       const outOfBounds=items.filter(item=>item.rects.some(r=>r.x<85||r.x+r.w>1835||r.y<35||r.y+r.h>1045)).map(item=>item.text);
       const rtlErrors=items.filter(item=>/[\u0600-\u06ff]/.test(item.text)&&(item.dir!=='rtl'||item.align!=='right')).map(item=>item.text);
       return {collisions,outOfBounds,rtlErrors,textCount:items.length};
     });
     snapshots.push({scene:scene.id,frame,second,...layout});
   }
   start+=Math.round(scene.durationSeconds*config.video.fps);
 }
 const issues=snapshots.filter(s=>s.missingStage||s.collisions.length||s.outOfBounds.length||s.rtlErrors.length);
 await fs.writeFile(path.join(reports,'layout-samples.json'),JSON.stringify({sampledStates:snapshots.length,issues,snapshots},null,2));
 await page.evaluate(()=>window.reviewPlayer.seekTo(267));
 await new Promise(r=>setTimeout(r,120));
 const shot=await page._client().send('Page.captureScreenshot',{format:'png'});
 await fs.writeFile(path.join(qa,'simple-player-desktop.png'),Buffer.from(shot.value?.data??shot.data,'base64'));
 const playback=await page.evaluate(async()=>{
   const player=window.reviewPlayer;
   player.seekTo(0);document.querySelector('[aria-label="پخش"]').click();
   await new Promise(r=>setTimeout(r,1500));
   const advanced=player.getCurrentFrame();document.querySelector('[aria-label="توقف"]').click();
   await new Promise(r=>setTimeout(r,100));
   const stopped=player.getCurrentFrame();await new Promise(r=>setTimeout(r,200));
   const stable=stopped===player.getCurrentFrame();
   const chapter=document.querySelectorAll('.chapters button')[5];chapter.click();
   await new Promise(r=>setTimeout(r,100));
   const sceneSeek=player.getCurrentFrame();
   document.querySelector('[aria-label="قطع صدا"]').click();
   await new Promise(r=>setTimeout(r,100));
   const muted=window.reviewPlayer.isMuted();
   document.querySelector('[aria-label="وصل صدا"]').click();
   await new Promise(r=>setTimeout(r,100));
   const r=document.querySelector('[data-qa="stage"]').getBoundingClientRect(),v=document.querySelector('.viewer').getBoundingClientRect();
   return {advanced,stable,sceneSeek,muted,unmuted:!window.reviewPlayer.isMuted(),stageFitsPlayer:Math.abs(r.left-v.left)<3&&Math.abs(r.width-v.width)<3};
 });
 const audio=await page.evaluate(async()=>{
   const p=window.reviewPlayer;p.seekTo(925);await new Promise(r=>setTimeout(r,120));
   const before=window.__qaAudio.nonSilentBlocks;p.play();await new Promise(r=>setTimeout(r,1000));
   const state=window.__qaAudio.contexts.map(c=>c.state);p.pause();await new Promise(r=>setTimeout(r,100));
   return {sample:'S03/ids newly covered cue',nonSilentBlocks:window.__qaAudio.nonSilentBlocks-before,contextStatesDuringPlayback:state};
 });
 await page.setViewport({width:390,height:844,deviceScaleFactor:1});
 await new Promise(r=>setTimeout(r,150));
 const mobile=await page.evaluate(()=>({viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>innerWidth,chapterButtons:document.querySelectorAll('.chapters button').length}));
 const mobileShot=await page._client().send('Page.captureScreenshot',{format:'png'});
 await fs.writeFile(path.join(qa,'simple-player-mobile.png'),Buffer.from(mobileShot.value?.data??mobileShot.data,'base64'));
 const guideURL=new URL(base+'/recording-guide.html',playerURL).href;
 await page.goto({url:guideURL,timeout:20000});
 const guide=await page.evaluate(async()=>{await document.fonts.ready;const link=document.querySelector('.player-link');return {sections:document.querySelectorAll('section').length,fields:document.querySelectorAll('section h3').length,font:document.fonts.check('17px Vazirmatn'),returnURL:link.href};});
 const report={version:config.version,playerURL,guideURL,sampledStates:snapshots.length,issues,playback,audio,mobile,guide,logs,snapshots};
 await fs.writeFile(path.join(reports,'preview-layout.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify({sampledStates:report.sampledStates,issues,playback,audio,mobile,guide,applicationErrors:logs.filter(log=>log.type==='error')}));
 if(issues.length||mobile.overflow||playback.advanced<=0||!playback.stable||!playback.muted||!playback.unmuted||!playback.stageFitsPlayer)process.exitCode=1;
}finally{await browser.close({silent:true});}
