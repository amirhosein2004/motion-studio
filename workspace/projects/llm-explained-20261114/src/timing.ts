import timing from './timeline.json';
import config from '../project.json';
export const scenes=timing.scenes.map((s,i)=>({...s,from:Math.round(timing.scenes.slice(0,i).reduce((v,s)=>v+s.durationSeconds,0)*config.video.fps),durationInFrames:Math.round(s.durationSeconds*config.video.fps)}));
export const totalFrames=scenes.reduce((n,s)=>n+s.durationInFrames,0);
export const cue=(scene:string,id:string)=>{const s=scenes.find(s=>s.id===scene);const c=s?.cues.find(c=>c.id===id);if(!c)throw new Error(`Missing cue: ${scene}/${id}`);return c.at;};
