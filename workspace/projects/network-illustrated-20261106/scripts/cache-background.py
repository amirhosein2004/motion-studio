from pathlib import Path
r=Path(__file__).resolve().parents[1]
p=r/'src/Shared.tsx';s=p.read_text(encoding='utf-8')
start=s.index('<svg width="1920" height="1080"')
end=s.index('</svg>',start)+len('</svg>')
svg='<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><defs><filter id="paper"><feTurbulence type="fractalNoise" baseFrequency=".013 .026" numOctaves="3" seed="12"/><feColorMatrix type="saturate" values="0"/><feBlend in="SourceGraphic" mode="multiply"/></filter><radialGradient id="glow"><stop stop-color="#f34d12"/><stop offset="1" stop-color="#b32309"/></radialGradient></defs><rect width="1920" height="1080" fill="url(#glow)"/><rect width="1920" height="1080" opacity=".2" fill="#cf390e" filter="url(#paper)"/>'
for i in range(18):svg+=f'<path d="M{i*127-70} -30l-33 175 45 165-21 156 44 197-60 240 40 220" fill="none" stroke="{chr(35)+("ffe39b" if i%2 else "641908")}" stroke-width="{i%3+1}" opacity=".08"/>'
for i in range(80):svg+=f'<circle cx="{(i*317+41)%1920}" cy="{(i*193+17)%1080}" r="{i%3+.5}" fill="#ffc16a" opacity=".15"/>'
svg+='</svg>'
(r/'public/assets').mkdir(exist_ok=True)
(r/'public/assets/paper.svg').write_text(svg,encoding='utf-8')
s=s[:start]+'''<div style={{position:'absolute',inset:0,backgroundImage:`url('${staticFile('assets/paper.svg')}')`,backgroundSize:'cover'}}/>'''+s[end:]
s=s.replace("dashed?'12 12':1", "dashed?'.025 .025':1")
p.write_text(s,encoding='utf-8')
