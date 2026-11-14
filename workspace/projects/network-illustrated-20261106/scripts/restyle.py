from pathlib import Path
import json, shutil
root=Path(__file__).resolve().parents[1]
p=root/'src/Shared.tsx'
s=p.read_text(encoding='utf-8')
s=s.replace("import {D} from './design';", "import {D} from './design';\nimport {Device} from './scenes/Device';")
start=s.index('export const Node=')
end=s.index('export const Line=', start)
s=s[:start]+'''export const Node=({x,y,label,kind='laptop',color=D.cyan,sub,at=0}:{x:number;y:number;label:string;kind?:string;color?:string;sub?:string;at?:number})=><Beat at={at}><g transform={`translate(${x-76} ${y-62})`}><Device kind={kind} color={color}/></g><Label x={x} y={y+83} w={260}>{label}</Label>{sub&&<Label x={x} y={y+140} w={310} size={28} color={color} ltr>{sub}</Label>}</Beat>;
'''+s[end:]
# Arrowheads follow the path vector, including return packets and diagonals.
s=s.replace('strokeWidth={5} fill="none" strokeDasharray', 'strokeWidth={6} fill="none" strokeDasharray')
s=s.replace('d={`M${b[0]-12} ${b[1]-10}l12 10l-12 10`}', 'transform={`translate(${b[0]} ${b[1]}) rotate(${Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI})`} d="M-15-11L0 0l-15 11"')
s=s.replace('<rect x={x-49} y={y-24} width={98} height={48} rx={10} fill={color}/>', '<path d={`M${x-51} ${y-26}l99-4 6 50-101 5Z`} fill={color} stroke={D.edge} strokeWidth={3} style={{filter:`drop-shadow(5px 6px 0 ${D.shadow})`}}/>')
s=s.replace('rx={28} fill={D.panel} stroke={color} strokeWidth={2}', 'rx={9} fill={D.panel} stroke={color} strokeWidth={3} style={{filter:`drop-shadow(7px 9px 0 ${D.shadow})`}}')
s=s[:s.index('export const Frame=')]+'''export const Frame=({n,title,kicker,children}:{n:number;title:React.ReactNode;kicker:string;children:React.ReactNode})=>{const t=useSeconds();return <AbsoluteFill style={{background:D.bg,color:D.ink,fontFamily:D.font,overflow:'hidden'}}><style>{`@font-face{font-family:Vazirmatn;src:url('${staticFile('fonts/Vazirmatn-Regular.woff2')}')}@font-face{font-family:Vazirmatn;src:url('${staticFile('fonts/Vazirmatn-Bold.woff2')}');font-weight:700}`}</style>
<svg width="1920" height="1080" style={{position:'absolute',inset:0}} viewBox="0 0 1920 1080" aria-hidden="true"><defs><filter id="paper"><feTurbulence type="fractalNoise" baseFrequency=".013 .026" numOctaves="3" seed="12"/><feColorMatrix type="saturate" values="0"/><feBlend in="SourceGraphic" mode="multiply"/></filter><radialGradient id="glow"><stop stopColor="#f34d12"/><stop offset="1" stopColor="#b32309"/></radialGradient></defs><rect width="1920" height="1080" fill="url(#glow)"/><rect width="1920" height="1080" opacity=".2" fill="#cf390e" filter="url(#paper)"/>
{Array.from({length:18},(_,i)=><path key={i} d={`M${i*127-70} -30l-33 175 45 165-21 156 44 197-60 240 40 220`} fill="none" stroke={i%2?'#ffe39b':'#641908'} strokeWidth={i%3+1} opacity={.08}/>)}
{Array.from({length:80},(_,i)=><circle key={i} cx={(i*317+41)%1920} cy={(i*193+17)%1080} r={i%3+.5} fill="#ffc16a" opacity=".15"/>)}
</svg>
<div style={{position:'absolute',left:96,top:59,color:D.orange,fontSize:29,fontWeight:700}}><span style={{fontSize:52,lineHeight:1}}>{String(n).padStart(2,'0')}</span><span style={{marginLeft:18,fontSize:22,color:D.ink}}> / 15</span></div>
<div dir="rtl" style={{position:'absolute',right:105,top:58,color:D.ink,fontSize:26,textAlign:'right'}}>{mixed(kicker)}</div>
<h1 dir="rtl" style={{position:'absolute',right:100,left:95,top:116,color:D.orange,fontSize:68,fontWeight:700,margin:0,textAlign:'right',lineHeight:1.5,textShadow:`4px 5px 0 ${D.shadow}`,opacity:ramp(t,0),translate:`0 ${(1-ramp(t,0))*20}px`}}>{mixed(title)}</h1>
<svg width={1920} height={760} viewBox="0 0 1920 760" style={{position:'absolute',top:260}}>{children}</svg>
<div style={{position:'absolute',bottom:35,left:100,right:100,height:3,background:'#7e230f'}}><div style={{height:'100%',width:`${n/15*100}%`,background:D.orange,marginLeft:'auto'}}/></div>
</AbsoluteFill>};
'''
p.write_text(s,encoding='utf-8')
# Keep supplied original text under inputs, not the code directory.
inputs=root.parents[1]/'assets'/root.name
inputs.mkdir(parents=True,exist_ok=True)
shutil.copy2(Path(r'C:\Users\Asus\.codex\attachments\f68bb658-9811-41eb-ac7a-f6a3a8db3b55\Pasted text.txt'),inputs/'USER-REQUEST.txt')
assets=json.loads((root/'ASSET-SOURCES.json').read_text(encoding='utf-8'))
assets['reference']={'type':'chat image','description':'Anime Halloween icons pack cover: orange textured field, yellow typography, faceted dark silhouettes, cast shadows','status':'Viewed in chat; visual reference only; no reference pixels or stock illustrations imported','local_file':None}
assets['assets'].append({'type':'illustration','source':'src/scenes/Device.tsx; original SVG phone, laptop, router, server, printer and network cloud','license':'project source'})
assets['assets'].append({'type':'texture','source':'Deterministic inline SVG turbulence, creases and speckles in src/Shared.tsx','license':'project source'})
(root/'ASSET-SOURCES.json').write_text(json.dumps(assets,ensure_ascii=False,indent=2),encoding='utf-8')
