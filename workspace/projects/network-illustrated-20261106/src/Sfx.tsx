import {Audio} from '@remotion/media';
import {staticFile,useVideoConfig} from 'remotion';
import assets from './sfx-assets.json';
import cues from './sfx-cues.json';
import pace from './pace.json';

// A single authored cue sheet controls all reused sound instances, including
// the individual scene compositions. No loops, timers, or synthetic narration.
export const Sfx=({scene}:{scene:number})=>{
 const {fps}=useVideoConfig();
 return <>{cues.events.filter(c=>c.scene===scene).map(c=>{
  const asset=assets[c.sound as keyof typeof assets];
  return <Audio key={c.id} name={`${c.id} · ${c.purpose}`} src={staticFile(asset.file)}
   from={Math.round(c.second*pace.pace*fps)} durationInFrames={Math.ceil(asset.duration*fps)}
   premountFor={fps} volume={c.volume*cues.masterVolume}/>;
 })}</>;
};
