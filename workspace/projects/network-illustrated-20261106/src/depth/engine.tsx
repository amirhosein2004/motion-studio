import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {D} from '../design';
import pace from '../pace.json';

export type V3 = [number, number, number];
export type Mesh = {verts: V3[]; faces: number[][]};

const TAU = Math.PI * 2;

export const makeCube = (): Mesh => {
  const v: V3[] = [
    [-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, -0.5],
    [-0.5, -0.5, 0.5], [0.5, -0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5],
  ];
  return {verts: v, faces: [[0, 1, 2, 3], [1, 5, 6, 2], [5, 4, 7, 6], [4, 0, 3, 7], [4, 5, 1, 0], [3, 2, 6, 7]]};
};

export const makeOcta = (): Mesh => ({
  verts: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]],
  faces: [[0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4], [2, 0, 5], [1, 2, 5], [3, 1, 5], [0, 3, 5]],
});

export const makeIcosa = (): Mesh => {
  const p = (1 + Math.sqrt(5)) / 2;
  const raw: V3[] = [
    [-1, p, 0], [1, p, 0], [-1, -p, 0], [1, -p, 0],
    [0, -1, p], [0, 1, p], [0, -1, -p], [0, 1, -p],
    [p, 0, -1], [p, 0, 1], [-p, 0, -1], [-p, 0, 1],
  ];
  const len = Math.hypot(1, p);
  const verts = raw.map(([x, y, z]) => [x / len, y / len, z / len] as V3);
  return {
    verts,
    faces: [
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
    ],
  };
};

export const makeTorus = (segs = 20, sides = 8, tube = 0.24): Mesh => {
  const verts: V3[] = [];
  const faces: number[][] = [];
  for (let i = 0; i < segs; i++) {
    const u = (i / segs) * TAU;
    for (let j = 0; j < sides; j++) {
      const v = (j / sides) * TAU;
      const r = 0.62 + tube * Math.cos(v);
      verts.push([r * Math.cos(u), tube * Math.sin(v), r * Math.sin(u)]);
    }
  }
  for (let i = 0; i < segs; i++) {
    for (let j = 0; j < sides; j++) {
      const a = i * sides + j;
      const b = ((i + 1) % segs) * sides + j;
      const c = ((i + 1) % segs) * sides + ((j + 1) % sides);
      const d = i * sides + ((j + 1) % sides);
      faces.push([a, b, c, d]);
    }
  }
  return {verts, faces};
};

export const makePrism = (sides = 6): Mesh => {
  const verts: V3[] = [];
  const faces: number[][] = [];
  for (let i = 0; i < sides; i++) {
    const a = (i / sides) * TAU;
    verts.push([Math.cos(a) * 0.6, -0.5, Math.sin(a) * 0.6]);
  }
  for (let i = 0; i < sides; i++) {
    const a = (i / sides) * TAU;
    verts.push([Math.cos(a) * 0.6, 0.5, Math.sin(a) * 0.6]);
  }
  for (let i = 0; i < sides; i++) faces.push([i, (i + 1) % sides, sides + ((i + 1) % sides), sides + i]);
  faces.push(Array.from({length: sides}, (_, i) => i).reverse());
  faces.push(Array.from({length: sides}, (_, i) => sides + i));
  return {verts, faces};
};

export const makeSphere = (lat = 9, lon = 14): Mesh => {
  const verts: V3[] = [];
  const faces: number[][] = [];
  for (let i = 0; i <= lat; i++) {
    const phi = (i / lat) * Math.PI;
    for (let j = 0; j < lon; j++) {
      const theta = (j / lon) * TAU;
      verts.push([Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)]);
    }
  }
  for (let i = 0; i < lat; i++) {
    for (let j = 0; j < lon; j++) {
      const a = i * lon + j;
      const b = i * lon + ((j + 1) % lon);
      const c = (i + 1) * lon + ((j + 1) % lon);
      const d = (i + 1) * lon + j;
      faces.push([a, b, c, d]);
    }
  }
  return {verts, faces};
};

export const rotate3 = (v: V3, rx: number, ry: number, rz: number): V3 => {
  let [x, y, z] = v;
  let c = Math.cos(rx), s = Math.sin(rx);
  [y, z] = [y * c - z * s, y * s + z * c];
  c = Math.cos(ry); s = Math.sin(ry);
  [x, z] = [x * c + z * s, -x * s + z * c];
  c = Math.cos(rz); s = Math.sin(rz);
  [x, y] = [x * c - y * s, x * s + y * c];
  return [x, y, z];
};

const mix = (a: string, b: string, t: number) => {
  const parse = (c: string) => {
    if (c.startsWith('#')) return [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
    const m = c.match(/[\d.]+/g);
    return m ? m.slice(0, 3).map(Number) : [0, 0, 0];
  };
  const pa = parse(a), pb = parse(b);
  const k = Math.max(0, Math.min(1, t));
  const ch = pa.map((v, i) => Math.round(v + (pb[i] - v) * k));
  return '#' + ch.map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('');
};

type MeshViewProps = {
  mesh: Mesh;
  x: number;
  y: number;
  size: number;
  color: string;
  speed?: number;
  spin?: [number, number, number];
  seed?: number;
  opacity?: number;
  wire?: boolean;
  shadow?: boolean;
  float?: number;
  stroke?: number;
};

export const MeshView = ({
  mesh, x, y, size, color, speed = 0.18, spin = [0.42, 1, 0.16], seed = 0,
  opacity = 1, wire = false, shadow = false, float = 8, stroke = 2.4,
}: MeshViewProps) => {
  const t = useCurrentFrame() / useVideoConfig().fps / pace.pace;
  const rx = spin[0] + t * speed + seed * 0.31;
  const ry = spin[1] + t * speed * 0.82 + seed * 0.57;
  const rz = spin[2] + t * speed * 0.37 + seed * 0.19;
  const cx = x;
  const cy = y + Math.sin(t * 0.55 + seed * 2.1) * float;
  const focal = size * 5.2;
  const light: V3 = [-0.38, -0.66, -0.65];
  const ll = Math.hypot(...light);
  const L = light.map(v => v / ll) as V3;

  const projected = mesh.verts.map(v => {
    const r = rotate3(v, rx, ry, rz);
    const s = focal / (focal + r[2] * size);
    return {x: cx + r[0] * size * s, y: cy + r[1] * size * s, z: r[2], s};
  });

  const faces = mesh.faces.map((idx, fi) => {
    const a = mesh.verts[idx[0]], b = mesh.verts[idx[1]], c = mesh.verts[idx[2]];
    const n: V3 = [
      (b[1] - a[1]) * (c[2] - a[2]) - (b[2] - a[2]) * (c[1] - a[1]),
      (b[2] - a[2]) * (c[0] - a[0]) - (b[0] - a[0]) * (c[2] - a[2]),
      (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]),
    ];
    const nn = Math.hypot(...n) || 1;
    const lit = Math.max(0, (n[0] * L[0] + n[1] * L[1] + n[2] * L[2]) / nn);
    const z = idx.reduce((acc, i) => acc + projected[i].z, 0) / idx.length;
    const path = idx.map((i, k) => `${k === 0 ? 'M' : 'L'}${projected[i].x.toFixed(1)} ${projected[i].y.toFixed(1)}`).join('') + 'Z';
    const tone = (1 - lit) * 0.45;
    return {path, z, fill: mix(color, D.edge, tone), lit, fi};
  }).sort((a, b) => b.z - a.z);

  const outline = wire ? 0 : stroke;
  return <g opacity={opacity} style={{pointerEvents:'none'}}>
    {shadow && <g transform={`translate(${size * 0.1} ${size * 0.12})`} opacity={0.22}>
      {faces.map(f => <path key={f.fi} d={f.path} fill={D.shadow} stroke="none"/>)}
    </g>}
    {faces.map(f => <path key={f.fi} d={f.path}
      fill={wire ? 'none' : f.fill}
      stroke={D.edge} strokeWidth={wire ? 1.1 : outline} strokeOpacity={wire ? 0.35 : 0.55}
      strokeLinejoin="round"/>)}
  </g>;
};

export {mix as mixColors};
