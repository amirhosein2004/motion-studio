import React from 'react';
import {Frame,Node,Line,Packet,Box,Beat,Label,EN,useSeconds,ramp} from '../Shared';
import {D} from '../design';
export const S01=()=> <Frame n={1} title="شبکه؛ از یک عکس شروع کنیم" kicker="از شبکهٔ خانه تا SSH">
<Node x={350} y={280} label="گوشی" kind="phone"/><Node x={1050} y={280} label="لپ‌تاپ" at={3}/><Box x={150} y={40} w={400} h={110} title="عکس روی گوشی" color={D.orange}/>
<Line a={[465,280]} b={[910,280]} at={7}/><Packet a={[465,280]} b={[910,280]} at={12} label="عکس"/>
<Box x={920} y={40} w={280} h={110} title="عکس رسید" at={15} color={D.orange}/>
<Node x={1550} y={280} kind="printer" label="پرینتر مشترک" at={18}/><Line a={[1190,280]} b={[1410,280]} at={20}/>
<Beat at={23}><Label x={1070} y={570} w={1350} size={38}>فایل · وسیلهٔ مشترک · تماس · سایت · کنترل از راه دور</Label></Beat>
</Frame>;
