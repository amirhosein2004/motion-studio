import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import pace from '../pace.json';
import {Device} from './Device';

// Keeps the original layered illustrations exactly as drawn, but presents each
// one on a real CSS 3D stage: perspective, a slow yaw/pitch parallax and a
// shadow that follows the rotation. Same shapes, now with genuine depth.

const STAGE = {
  phone: {yaw: -15, pitch: 7, seed: 1.1},
  laptop: {yaw: -17, pitch: 9, seed: 0.4},
  router: {yaw: -13, pitch: 11, seed: 2.2},
  server: {yaw: -16, pitch: 7, seed: 3.1},
  printer: {yaw: -14, pitch: 10, seed: 4.4},
  cloud: {yaw: -9, pitch: 6, seed: 5.2},
} as const;

export const Device3D = ({kind, color, zoom = 1}:{kind: string; color: string; zoom?: number}) => {
  const t = useCurrentFrame() / useVideoConfig().fps / pace.pace;
  const s = STAGE[kind as keyof typeof STAGE] ?? STAGE.laptop;
  const yaw = s.yaw + Math.sin(t * 0.5 + s.seed) * 3.2;
  const pitch = s.pitch + Math.sin(t * 0.37 + s.seed * 1.7) * 1.8;
  const roll = Math.sin(t * 0.29 + s.seed * 2.3) * 0.9;
  const shadowX = 9 + yaw * 0.22;
  const shadowY = 12 + pitch * 0.16;

  return <foreignObject x={-30} y={-40} width={240} height={232} style={{overflow:'visible'}}>
    <div style={{width:240, height:232, perspective:880, perspectiveOrigin:'50% 58%'}}>
      <div style={{width:'100%', height:'100%', transform:`scale(${zoom})`, transformOrigin:'50% 62%'}}>
      <div style={{
        position:'relative',
        width:'100%', height:'100%',
        transform:`rotateX(${pitch}deg) rotateY(${yaw}deg) rotateZ(${roll}deg)`,
        transformStyle:'preserve-3d',
        transformOrigin:'50% 58%',
      }}>
        {[4, 3, 2, 1].map(i => <div key={i} style={{
          position:'absolute', inset:0,
          transform:`translateZ(${-i * 2.1}px)`,
          transformStyle:'preserve-3d',
          opacity: 0.62,
        }}>
          <svg width={240} height={232} viewBox="-16 -20 208 190"
            style={{overflow:'visible', filter:'brightness(0.42)'}}>
            <Device kind={kind} color={color} shadow={false}/>
          </svg>
        </div>)}
        <svg width={240} height={232} viewBox="-16 -20 208 190"
          style={{position:'relative', overflow:'visible', filter:`drop-shadow(${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 2px rgba(66,22,9,0.55))`}}>
          <Device kind={kind} color={color} shadow={false}/>
        </svg>
      </div>
      </div>
    </div>
  </foreignObject>;
};
