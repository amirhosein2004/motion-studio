import React, {useId} from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {D} from './design';
import {cue} from './timing';
import {SceneAudio} from './SceneAudio';

export const clamp = (x: number) => Math.max(0, Math.min(1, x));
export const ease = (x: number) => Easing.bezier(...D.motion.ease)(clamp(x));
export function useScene(id: string) {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = f / fps;
  return {f, s, p: (key: string, d = D.motion.enter) => ease((s - cue(id, key)) / d), at: (key: string) => cue(id, key)};
}

export const Text: React.FC<{
  x: number; y: number; w: number; size?: number; color?: string;
  weight?: number; children: React.ReactNode; style?: React.CSSProperties;
}> = ({x, y, w, size = D.size.body, color = D.color.white, weight = 400, children, style}) =>
  <div data-qa="text" dir="rtl" style={{
    position: 'absolute', left: x, top: y, width: w, fontSize: size,
    fontWeight: weight, color, lineHeight: 1.4, textAlign: 'right',
    boxSizing: 'border-box', ...style,
  }}>{children}</div>;

export const Appear: React.FC<{p: number; children: React.ReactNode; dy?: number}> =
  ({p, children, dy = 14}) => <AbsoluteFill style={{opacity: p, translate: `0px ${(1-p)*dy}px`}}>{children}</AbsoluteFill>;

export const Panel: React.FC<{
  x: number; y: number; w: number; h: number; color?: string;
  children?: React.ReactNode; style?: React.CSSProperties;
}> = ({x, y, w, h, color = D.color.line, children, style}) =>
  <div data-qa="panel" style={{
    position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 30,
    boxSizing: 'border-box', border: `1.5px solid ${color}`,
    background: `linear-gradient(140deg, ${D.color.panelLight}, ${D.color.panel})`,
    boxShadow: '0 16px 40px #00000020', ...style,
  }}>{children}</div>;

export const Cable: React.FC<{
  path: string; p: number; color?: string;
  dot?: {x1: number; y1: number; x2: number; y2: number}; dash?: boolean;
}> = ({path, p, color = D.color.blue, dot, dash = false}) => {
  const id = useId().replace(/:/g, '');
  return <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, pointerEvents: 'none', opacity: p > 0 ? 1 : 0}}>
    <defs><marker id={id} viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1L6 4L1 7" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker></defs>
    <path d={path} pathLength={1} fill="none" stroke={color} strokeWidth={3.5}
      strokeDasharray={dash && p > .99 ? '8 12' : '1'}
      strokeDashoffset={dash && p > .99 ? 0 : 1-p} strokeLinecap="round"
      opacity={.8} markerEnd={p > .99 ? `url(#${id})` : undefined}/>
    {dot && p > 0 && p < .97 && <circle cx={dot.x1+(dot.x2-dot.x1)*p} cy={dot.y1+(dot.y2-dot.y1)*p} r={8} fill={color}/>}
  </svg>;
};

type IconName = 'chat' | 'search' | 'globe' | 'document' | 'chef' | 'bowl' | 'check';
export const Icon = ({name, x, y, size = 100, color = D.color.blue}: {name: IconName; x: number; y: number; size?: number; color?: string}) =>
  <svg data-qa="icon" viewBox="0 0 64 64" width={size} height={size}
    style={{position: 'absolute', left: x, top: y}} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    {name === 'chat' && <><path d="M14 12H50A7 7 0 0 1 57 19V38A7 7 0 0 1 50 45H30L16 55V45H14A7 7 0 0 1 7 38V19A7 7 0 0 1 14 12Z"/><path d="M19 25H45M19 34H36"/></>}
    {name === 'search' && <><circle cx="27" cy="27" r="17"/><path d="M40 40L56 56"/><path d="M20 25H34M27 18V32"/></>}
    {name === 'globe' && <><circle cx="32" cy="32" r="24"/><ellipse cx="32" cy="32" rx="10" ry="24"/><path d="M8 32H56M13 19H51M13 45H51"/></>}
    {name === 'document' && <><path d="M17 7H38L50 19V56H17Z"/><path d="M38 7V20H50M24 30H42M24 38H42M24 46H35"/></>}
    {name === 'chef' && <><path d="M16 37C0 34 6 13 20 17C23 3 43 3 46 17C61 12 67 34 50 37V52H16Z"/><path d="M16 45H50M25 34V40M40 34V40"/></>}
    {name === 'bowl' && <><path d="M7 30H57C55 46 47 54 32 54S9 46 7 30Z"/><path d="M25 8C17 16 32 16 24 24M40 8C32 16 47 16 39 24"/></>}
    {name === 'check' && <><circle cx="32" cy="32" r="24"/><path d="M20 32L28 40L45 23"/></>}
  </svg>;

export const Chip = ({
  x, y, size = 250, active = 0, label = 'مدل زبانی', fixed = false, labelWidth = size,
}: {x: number; y: number; size?: number; active?: number; label?: string; fixed?: boolean; labelWidth?: number}) => {
  const id = useId().replace(/:/g, '');
  return <div style={{position: 'absolute', left: x, top: y, width: size, height: size}}>
    <svg data-qa="icon" viewBox="0 0 300 300" width={size} height={size} style={{overflow: 'visible'}}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#9dddf6"/><stop offset=".55" stopColor="#4a91b3"/><stop offset="1" stopColor="#294f6c"/></linearGradient></defs>
      {[0,1,2,3,4].map(i=><path key={i} d={`M${78+i*36} 30V8 M${78+i*36} 270V292 M30 ${78+i*36}H8 M270 ${78+i*36}H292`} stroke="#83bfd9" strokeWidth="5" strokeLinecap="round"/>)}
      <rect x="31" y="38" width="238" height="238" rx="49" fill="#071019"/>
      <rect x="31" y="26" width="238" height="238" rx="49" fill={`url(#${id})`} stroke="#c7edff" strokeOpacity=".65"/>
      <rect x="60" y="55" width="180" height="180" rx="30" fill="#132a3c" stroke="#9bd8f2" strokeOpacity=".3"/>
      {Array.from({length:16},(_,i)=>{
        const changed=!fixed && active>.2 && i%3===0;
        return <rect key={i} x={84+(i%4)*35} y={79+Math.floor(i/4)*35} width={22} height={22} rx={6}
          fill={changed?D.color.green:`rgba(137,211,245,${.22+(i%5)*.1})`}/>;
      })}
      <path d="M78 48H165" stroke="#effaff" strokeOpacity=".38" strokeWidth="2" strokeLinecap="round"/>
    </svg>
    {label && <Text x={(size-labelWidth)/2} y={size+24} w={labelWidth} size={36} weight={700} color={D.color.blue}>{label}</Text>}
  </div>;
};

export const Frame: React.FC<{n: number; title: React.ReactNode; kicker: string; note?: string; children: React.ReactNode}> =
  ({n, title, kicker, note, children}) => {
    const frame=useCurrentFrame();
    const {fps}=useVideoConfig();
    const enter=interpolate(frame,[0,.55*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(...D.motion.ease)});
    return <AbsoluteFill data-qa="stage" dir="rtl" style={{background:D.color.bg,fontFamily:D.font,color:D.color.white,textAlign:'right',overflow:'hidden'}}>
      <SceneAudio scene={`S${String(n).padStart(2,'0')}`}/>
      <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 48%,#213c502b,transparent 65%)'}}/>
      <Text x={112} y={90} w={180} size={26} color={D.color.muted}><bdi dir="ltr">{String(n).padStart(2,'0')} / 08</bdi></Text>
      <div style={{opacity:enter,translate:`0px ${(1-enter)*14}px`}}>
        <Text x={520} y={74} w={1288} size={29} color={D.color.blue}>{kicker}</Text>
        <Text x={360} y={130} w={1448} size={D.size.title} weight={700}
          style={{clipPath:`inset(0 0 ${(1-enter)*100}% 0)`}}>{title}</Text>
      </div>
      {children}
      <div style={{position:'absolute',left:112,right:112,top:951,height:1,background:D.color.line,opacity:.6}}/>
      {note && <Text x={112} y={978} w={1696} size={D.size.note} color={D.color.muted}>{note}</Text>}
    </AbsoluteFill>;
  };

