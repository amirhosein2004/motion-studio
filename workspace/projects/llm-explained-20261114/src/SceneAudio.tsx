import {Audio} from '@remotion/media';
import {staticFile,useVideoConfig} from 'remotion';
import events from './sfx-events.json';
import assets from './sfx-assets.json';
import {cue} from './timing';

// The same authored scene owns its audio in Studio and in the complete timeline.
// Every instance is intentionally controlled by this shared cue/asset template.
export const SceneAudio=({scene}:{scene:string})=>{
  const {fps}=useVideoConfig();
  return <>{events.filter(event=>event.scene===scene).map(event=>{
    const asset=assets[event.asset as keyof typeof assets];
    const seconds=(event.cue==='scene-start'?0:cue(scene,event.cue))+event.offset;
    return <Audio
      key={event.id}
      name={event.id}
      src={staticFile(asset.runtime)}
      from={Math.round(seconds*fps)}
      durationInFrames={Math.ceil(asset.durationSeconds*fps)}
      premountFor={fps}
      volume={event.volume}
      playbackRate={1}
    />;
  })}</>;
};
