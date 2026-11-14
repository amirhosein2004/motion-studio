import React,{useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player,type PlayerRef} from '@remotion/player';
import {Video} from './Video';
import {scenes,totalFrames} from './timing';
import config from '../project.json';
import guide from '../narration/guide.json';
import {fontReady} from './fonts';

declare global {interface Window {reviewPlayer:PlayerRef|null;reviewReady:boolean;}}
const clock=(frame:number)=>{
  const seconds=Math.floor(frame/config.video.fps);
  return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
};
const App=()=>{
  const ref=useRef<PlayerRef>(null);
  const [frame,setFrame]=useState(0);
  const [playing,setPlaying]=useState(false);
  const [muted,setMuted]=useState(false);
  useEffect(()=>{
    const player=ref.current!;
    Object.defineProperty(window,'reviewPlayer',{configurable:true,get:()=>ref.current});window.reviewReady=true;
    const update=()=>setFrame(player.getCurrentFrame());
    const play=()=>setPlaying(true),pause=()=>setPlaying(false);
    const mute=(event:{detail:{isMuted:boolean}})=>setMuted(event.detail.isMuted);
    player.addEventListener('frameupdate',update);
    player.addEventListener('play',play);player.addEventListener('pause',pause);
    player.addEventListener('ended',pause);player.addEventListener('mutechange',mute);
    return ()=>{player.removeEventListener('frameupdate',update);player.removeEventListener('play',play);player.removeEventListener('pause',pause);player.removeEventListener('ended',pause);player.removeEventListener('mutechange',mute);Object.defineProperty(window,'reviewPlayer',{configurable:true,value:null});};
  },[]);
  const active=scenes.findIndex(scene=>frame>=scene.from&&frame<scene.from+scene.durationInFrames);
  return <main>
    <header><div><p className="eyebrow">پیش‌نمایش آموزشی</p><h1>{guide.title}</h1></div><a className="guide-link" href="./recording-guide.html">راهنمای ضبط <span aria-hidden="true">↗</span></a></header>
    <section className="viewer" dir="ltr" aria-label="پلیر موشن">
      <Player ref={ref} component={Video} durationInFrames={totalFrames} fps={config.video.fps} compositionWidth={config.video.width} compositionHeight={config.video.height}
        controls={false} clickToPlay={false} doubleClickToFullscreen spaceKeyToPlayOrPause style={{width:'100%',aspectRatio:'16 / 9',direction:'ltr'}}
        errorFallback={({error}:{error:Error})=><p className="error" role="alert">پخش باز نشد: {error.message}</p>}/>
    </section>
    <div className="transport">
      <button className="play" aria-label={playing?'توقف':'پخش'} onClick={()=>ref.current?.toggle()}>{playing?'❚❚':'▶'}</button>
      <input className="scrubber" aria-label="زمان ویدیو" type="range" dir="ltr" min={0} max={totalFrames-1} value={frame} onChange={event=>ref.current?.seekTo(Number(event.target.value))}/>
      <span className="clock" dir="ltr">{clock(frame)} / {clock(totalFrames)}</span>
      <button aria-label={muted?'وصل صدا':'قطع صدا'} onClick={()=>{const player=ref.current!;const next=!muted;setMuted(next);if(next)player.mute();else player.unmute();}}>{muted?'صدا خاموش':'صدا روشن'}</button>
      <button aria-label="تمام صفحه" onClick={()=>ref.current?.requestFullscreen()}>⛶</button>
    </div>
    <nav className="chapters" aria-label="سکانس‌ها">{guide.scenes.map((scene,i)=><button key={scene.id} aria-current={active===i?'step':undefined} onClick={()=>ref.current?.seekTo(scenes[i].from)}><span className="chapter-number">{String(i+1).padStart(2,'0')}</span>{scene.title}</button>)}</nav>
    <footer><span>زمان‌بندی موقته؛ گویندگی هنوز اضافه نشده.</span><span><bdi dir="ltr">{config.version}</bdi> · با افکت صوتی</span></footer>
  </main>;
};
void fontReady.then(()=>createRoot(document.getElementById('app')!).render(<App/>));
