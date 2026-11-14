import React from 'react';
import {Frame,Node,Line,Packet3D,Box,Beat,Label,useSeconds,ramp} from '../Shared';
import {MeshView,makeCube} from '../depth/engine';
import {D} from '../design';
const CUBE11=makeCube();
export const S11=()=> <Frame n={11} title="Packet؛ داده در قطعه‌های کوچک" kicker="از شبکهٔ خانه تا SSH">
<Node x={260} y={310} kind="phone" label="مبدأ"/><Node x={1620} y={310} label="مقصد"/>
<Box x={540} y={65} w={800} h={135} title="عکس → قطعه‌ها + اطلاعات انتقال" at={8} color={D.orange}/>
<Beat>{[0,1,2,3].map(i=><rect key={i} x={150+(i%2)*42} y={10+Math.floor(i/2)*42} width={40} height={40} rx={5} fill={[D.cyan,D.orange,D.purple,D.cyan][i]} style={{translate:`${ramp(useSeconds(),8)*i*45}px ${ramp(useSeconds(),8)*i*12}px`}}/>)}</Beat>
<Line a={[400,310]} b={[1480,310]} at={12}/>
{[0,1,2,3].map(i=><Packet3D key={i} a={[430,310]} b={[1460,310]} at={18+i*2} duration={3} label={String(i+1)} size={58}/>)}
<Beat at={30}>{[0,1,2,3].map(i=><MeshView key={i} mesh={CUBE11} x={1450+(i%2)*120} y={520+Math.floor(i/2)*120} size={64} color={[D.cyan,D.orange,D.purple,D.cyan][i]} speed={0.16} seed={i*1.3} float={0} opacity={0.95} shadow stroke={2.4}/>)}<Label x={1510} y={700} w={360} color={D.cyan}>داده بازسازی شد</Label></Beat>
</Frame>;
