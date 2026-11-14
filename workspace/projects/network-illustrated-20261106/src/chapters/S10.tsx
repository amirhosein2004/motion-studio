import React from 'react';
import {Frame,Node,Line,Packet,Box,Beat,Label,EN,useSeconds,ramp} from '../Shared';
import {D} from '../design';
export const S10=()=> <Frame n={10} title="DNS؛ از نام به آدرس" kicker="از شبکهٔ خانه تا SSH">
<Node x={300} y={330} label="مرورگر"/><Node x={1040} y={180} kind="server" label="سامانهٔ DNS" at={7}/><Node x={1550} y={480} kind="server" label="سرور سایت" at={25}/>
<Box x={150} y={20} w={480} h={120} title={<EN>example.com</EN>} color={D.orange}/>
<Line a={[440,300]} b={[900,180]} at={8}/><Packet a={[440,300]} b={[900,180]} at={12} label="نام"/><Packet a={[900,215]} b={[440,330]} at={18} label="آدرس" color={D.purple}/>
<Beat at={22}><Label x={950} y={530} w={900} color={D.purple}>پاسخ ممکن است از حافظهٔ موقت بیاید</Label></Beat>
<Line a={[440,380]} b={[1410,480]} at={28}/><Packet a={[440,380]} b={[1410,480]} at={31} duration={3} label="درخواست"/>
</Frame>;
