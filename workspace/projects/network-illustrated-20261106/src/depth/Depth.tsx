import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {D} from '../design';
import pace from '../pace.json';
import {MeshView, makeCube, makeIcosa, makeOcta, makePrism, rotate3, type V3} from './engine';

const CUBE = makeCube();
const OCTA = makeOcta();
const ICO = makeIcosa();
const PRISM = makePrism();

const palette = [D.cyan, D.purple, D.ink, D.purple, D.cyan];

const rand = (scene: number, k: number) => {
  const v = Math.sin(scene * 127.1 + k * 311.7) * 43758.5453;
  return v - Math.floor(v);
};

// Large polyhedra are cropped by the frame edges: depth without stealing the
// reading area from the diagrams.
const SLOTS: Array<[number, number]> = [[-26, 300], [1946, 330], [-34, 880], [1954, 900]];
const MESHES = [ICO, OCTA, CUBE, PRISM, OCTA, ICO];

// A slowly rotating 3D constellation. Deterministic points on a sphere and
// short links between neighbours give a network that reads as a volume.
const NODES = 42;
const POINTS: V3[] = Array.from({length: NODES}, (_, i) => {
  const y = 1 - (i / (NODES - 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const a = i * 2.399963;
  return [Math.cos(a) * r, y, Math.sin(a) * r];
});
const LINKS: Array<[number, number]> = [];
for (let i = 0; i < NODES; i++) {
  const near: Array<[number, number]> = [];
  for (let j = i + 1; j < NODES; j++) {
    const d = Math.hypot(POINTS[i][0] - POINTS[j][0], POINTS[i][1] - POINTS[j][1], POINTS[i][2] - POINTS[j][2]);
    if (d < 0.52) near.push([d, j]);
  }
  near.sort((a, b) => a[0] - b[0]);
  for (const [, j] of near.slice(0, 2)) LINKS.push([i, j]);
}

const Constellation = ({scene}:{scene:number}) => {
  const t = useCurrentFrame() / useVideoConfig().fps / pace.pace;
  const rx = 0.3 + Math.sin(t * 0.05 + scene * 0.7) * 0.14;
  const ry = t * 0.055 + scene * 0.5;
  const R = 430, cx = 960, cy = 735, f = 1500;
  const p = POINTS.map(v => {
    const r = rotate3(v, rx, ry, 0);
    const s = f / (f + r[2] * R);
    return {x: cx + r[0] * R * s, y: cy + r[1] * R * s, z: r[2]};
  });
  return <g opacity={0.9}>
    {LINKS.map(([a, b], i) => {
      const depth = (p[a].z + p[b].z) / 2;
      return <line key={i} x1={p[a].x} y1={p[a].y} x2={p[b].x} y2={p[b].y}
        stroke={D.ink} strokeWidth={1.15} opacity={0.055 + (1 - depth) * 0.075}/>;
    })}
    {p.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r={2 + (1 - n.z) * 2.6}
      fill={i % 9 === 0 ? D.orange : D.ink} opacity={0.16 + (1 - n.z) * 0.16}/>)}
  </g>;
};

export const Depth = ({scene}:{scene:number}) => {
  const accents = [0, 1, 2].map(i => {
    const slot = SLOTS[Math.floor(rand(scene, i + 1) * SLOTS.length)];
    return {
      slot,
      mesh: MESHES[(scene + i * 2) % MESHES.length],
      size: 100 + rand(scene, i + 4) * 68,
      color: palette[(scene + i * 2) % palette.length],
      speed: 0.05 + rand(scene, i + 7) * 0.06,
      opacity: 0.4 + rand(scene, i + 9) * 0.18,
      seed: rand(scene, i + 11) * 6.28,
    };
  });

  return <AbsoluteFill style={{pointerEvents:'none'}}>
    <div style={{
      position:'absolute', inset:0,
      background:'radial-gradient(1300px 700px at 58% 62%, rgba(255,205,50,0.10), rgba(220,53,12,0) 70%)',
    }}/>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}>
      <Constellation scene={scene}/>
      {accents.map((a, i) => <MeshView key={`${scene}-${i}`} mesh={a.mesh} x={a.slot[0]} y={a.slot[1]}
        size={a.size} color={a.color} speed={a.speed} seed={a.seed} opacity={a.opacity}
        float={9} stroke={3} shadow/>)}
    </svg>
  </AbsoluteFill>;
};
