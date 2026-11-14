import React from 'react';
import {Frame,Node,Line,Packet,Box,Beat,Label,EN,useSeconds,ramp} from '../Shared';
import {D} from '../design';
export const S08=()=> <Frame n={8} title="پورت؛ کدام سرویس روی مقصد؟" kicker="از شبکهٔ خانه تا SSH">
<Node x={280} y={300} label="لپ‌تاپ"/><Box x={1040} y={30} w={700} h={610} title="یک سرور؛ چند سرویس"/>
<Box x={1190} y={180} w={400} h={130} title={<><EN>22 · SSH</EN></>} at={8} color={D.cyan}/><Box x={1190} y={390} w={400} h={130} title={<><EN>443 · HTTPS</EN></>} at={13} color={D.orange}/>
<Line a={[420,300]} b={[1040,300]} at={4}/><Beat at={4}><Label x={750} y={150} w={500}>اول: آدرس مقصد</Label></Beat>
<Line a={[1040,300]} b={[1180,245]} at={17}/><Packet a={[420,300]} b={[1180,245]} at={19} duration={3} label="SSH"/>
<Line a={[1040,330]} b={[1180,455]} at={25} color={D.orange}/><Packet a={[420,330]} b={[1180,455]} at={28} duration={3} label="HTTPS"/>
<Beat at={32}><Label x={970} y={650} w={1200} color={D.muted} size={32}>شماره‌های معمول؛ قابل تغییر با تنظیم سرویس</Label></Beat>
</Frame>;
