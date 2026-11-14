import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill} from '@remotion/renderer';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const timeline=JSON.parse(await fs.readFile(path.join(root,'src/timeline.json'),'utf8'));
const pace=JSON.parse(await fs.readFile(path.join(root,'src/pace.json'),'utf8'));
const beatFrame=(scene,seconds)=>scene.fromFrame+Math.round(seconds*pace.pace*timeline.fps);
const folder=process.argv.includes('--review-v4')?'qa-v4':'qa';
const out=path.resolve(root,'../../renders/network-illustrated-20261106',folder);
await fs.mkdir(out,{recursive:true});
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),publicDir:path.join(root,'public')});
const composition=await selectComposition({serveUrl,id:'NetworkFoundations'});
const requested=Number(process.argv.find(a=>a.startsWith('--frames='))?.split('=')[1]??15);
const only=process.argv.find(a=>a.startsWith('--only='))?.split('=')[1];
const indices=(requested>=15?timeline.scenes.map((_,i)=>i):Array.from({length:requested},(_,i)=>Math.round(i*14/Math.max(1,requested-1)))).filter(i=>!only||timeline.scenes[i].id===only);
const results=[];
for(const i of indices){const scene=timeline.scenes[i];const frame=scene.fromFrame+scene.durationInFrames-45;await renderStill({serveUrl,composition,frame,output:path.join(out,`${scene.id}.png`),imageFormat:'png'});results.push({scene:scene.id,frame});console.log(scene.id,frame);}
if(process.argv.includes('--beats')){
  for(const [i,seconds] of [[0,13],[1,30],[3,18],[6,30],[6,36],[6,38],[9,13],[9,19],[10,9],[10,21],[12,19],[12,23],[13,31],[13,35],[13,39]]){
    if(only&&timeline.scenes[i].id!==only)continue;
    const scene=timeline.scenes[i];const frame=beatFrame(scene,seconds);
    await renderStill({serveUrl,composition,frame,output:path.join(out,`${scene.id}-${seconds}s.png`),imageFormat:'png'});
    results.push({scene:scene.id,frame,localSecond:seconds});console.log(scene.id,seconds);
  }
}
if(process.argv.includes('--review-v4')){
  for(const [i,seconds] of [[1,19.9],[3,16.6],[3,17.8],[3,19.1],[5,19.7],[5,21.2],[6,25.9],[6,29.5],[6,31],[6,36],[6,38],[9,32.5],[10,21.5],[11,25],[11,32],[12,7],[13,43]]){
    if(only&&timeline.scenes[i].id!==only)continue;
    const scene=timeline.scenes[i];const frame=beatFrame(scene,seconds);
    await renderStill({serveUrl,composition,frame,output:path.join(out,`${scene.id}-${seconds}s.png`),imageFormat:'png'});
    results.push({scene:scene.id,frame,localSecond:seconds});console.log(scene.id,seconds);
  }
}
await fs.writeFile(path.join(out,only?`frames-${only}.json`:'frames.json'),JSON.stringify(results,null,2));
console.log('Still PNGs only. No video generated.');

