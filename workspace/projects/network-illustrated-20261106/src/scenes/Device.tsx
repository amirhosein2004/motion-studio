import React from 'react';
import {D} from '../design';

// Original, layered SVG drawings. Perspective is drawn into each silhouette;
// these are 2D illustrations, not rotatable 3D assets.
export const Device=({kind,color,shadow=true}:{kind:string;color:string;shadow?:boolean})=>{
 const common={stroke:D.edge,strokeWidth:3.5,strokeLinejoin:'round' as const,strokeLinecap:'round' as const};
 const photo=<><path d="M33 59l25-26 22 16 16-9 21 24" fill={color} stroke="none"/><circle cx="101" cy="25" r="7" fill={D.orange} stroke="none"/></>;
 return <g {...common}>
 {shadow&&<ellipse cx="91" cy="135" rx="85" ry="16" fill="#421609" opacity=".6" stroke="none" transform="rotate(-8 91 135)"/>}
 {kind==='phone'?<g transform="rotate(-7 76 62)">
  <path d="M39-4l62 4 17 12-3 111-15 10-65-5-7-14 3-108Z" fill="#4c5962"/>
  <path d="M101 0l17 12-3 111-15 10 3-115Z" fill="#273039"/>
  <path d="M39-4l62 4 2 117-66-3Z" fill="#b1bab4"/>
  <path d="M43 13l51 3 1 80-53-3Z" fill="#2c4149"/>
  <g transform="translate(27 23) scale(.55)">{photo}</g>
  <path d="M61 6l19 1M65 105h13" stroke={D.edge}/><path d="M40 17l-1 73" stroke="#e4e6cc" strokeWidth="2"/>
 </g>:kind==='server'?<g transform="rotate(3 76 62)">
  <path d="M18 2l99-11 26 19-3 120-105 8-19-18Z" fill="#45515e"/>
  <path d="M117-9l26 19-3 120-21-12Z" fill="#252a36"/>
  <path d="M18 2l99-11 2 126-103 3Z" fill="#7e8e94"/>
  {[12,47,82].map((y,i)=><g key={y}><path d={`M26 ${y}l82-7v27l-82 7Z`} fill="#303b46"/><path d={`M35 ${y+10}l39-3`} stroke="#a7b7b9" strokeWidth="2"/><circle cx="97" cy={y+8} r="4" fill={color}/></g>)}
  <path d="M22 7l-2 106" stroke="#dce0cd" strokeWidth="2"/>
 </g>:kind==='router'?<g>
  <path d="M21 53L13-7l10-5 12 64M115 49l9-58 10 3-6 63" fill="#889a90"/>
  <path d="M-2 65l25-25 113 4 20 28-10 46-137 2Z" fill="#566471"/>
  <path d="M-2 65l135-4 23 11-147 13Z" fill="#b6bdb0"/>
  <path d="M9 85l147-13-10 46-137 2Z" fill="#37424e"/>
  <path d="M23 94l72-5" stroke="#7e9299" strokeWidth="2"/>
  {[29,48,67].map(x=><circle key={x} cx={x} cy="106" r="4" fill={color}/>)}
  <path d="M111 91h22v13h-22Z" fill="#202c35"/><path d="M38 50l56 2M47 57l56 2" stroke="#35454e" strokeWidth="2"/>
 </g>:kind==='printer'?<g>
  <path d="M34 1l78-5 8 48-82 5Z" fill="#f3dfba"/>
  <path d="M47 13l52-3M49 24l46-3" stroke="#929a8b" strokeWidth="2"/>
  <path d="M5 42l121-6 25 23-7 57-132 6-12-18Z" fill="#687982"/>
  <path d="M5 42l121-6 25 23-133 9Z" fill="#a4b3ac"/>
  <path d="M18 68l133-9-7 57-132 6Z" fill="#475660"/>
  <path d="M32 86l85-5v18l-85 6Z" fill="#222d36"/>
  <path d="M40 93l70-4 13 48-77 6Z" fill="#f3dfba"/>
  <path d="M53 106l43-3M55 117l47-3" stroke="#9a9c88" strokeWidth="2"/><circle cx="132" cy="75" r="4" fill={color}/>
 </g>:kind==='cloud'?<g>
  <path d="M18 103C-13 97-9 54 20 48C17 10 54-7 80 15C107-6 143 15 137 44C175 49 172 97 143 105Z" fill="#637583"/>
  <path d="M18 93C-3 83 1 58 25 54C23 20 56 4 80 25C107 4 135 25 128 49C154 48 166 80 142 93Z" fill="#a9b9b5" stroke="none"/>
  <path d="M25 69L65 40l50 30-33 25Z" fill="none" stroke="#46545b" strokeWidth="2"/>
  {[[25,69],[65,40],[115,70],[82,95]].map(([x,y])=><circle key={x} cx={x} cy={y} r="6" fill={color}/>)}
 </g>:<g>
  <path d="M12 3l123-9 11 10-3 91-124 6-11-11Z" fill="#4d626b"/>
  <path d="M12 3l123-9-4 92-123 6Z" fill="#95a6a5"/>
  <path d="M22 13l101-7-3 67-101 6Z" fill="#253c43"/>
  {photo}
  <path d="M8 92l123-6 25 37-140 8-25-14Z" fill="#a1afa9"/>
  <path d="M-9 117l140-8 25 14-140 8Z" fill="#53626b"/>
  <path d="M21 99l98-6 7 12-108 7Z" fill="#4f6068" strokeWidth="2"/>
  <path d="M56 114l35-2 5 7-41 2Z" fill="#c4c8b1" strokeWidth="2"/>
  <path d="M16 6l-4 75" stroke="#dae0c6" strokeWidth="2"/>
 </g>}
 </g>;
};
