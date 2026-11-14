import React from 'react';
import {Frame,Node,Line,Packet,Box,Beat,Label,EN,useSeconds,ramp} from '../Shared';
import {D} from '../design';
export const S09=()=> <Frame n={9} title="پروتکل؛ قواعد مشترک ارتباط" kicker="از شبکهٔ خانه تا SSH">
<Box x={180} y={130} w={460} h={330} title={<EN>HTTPS</EN>} color={D.orange} at={3}><Label x={410} y={275} w={410}>ارتباط امن وب</Label></Box>
<Box x={730} y={130} w={460} h={330} title={<EN>SSH</EN>} color={D.cyan} at={10}><Label x={960} y={275} w={410}>دسترسی امن از راه دور</Label></Box>
<Box x={1280} y={130} w={460} h={330} title={<EN>DNS</EN>} at={18}><Label x={1510} y={275} w={410}>اطلاعات مربوط به نام</Label></Box>
<Beat at={24}><Label x={1170} y={540} w={1350}>پروتکل = قواعدی که دو طرف رعایت می‌کنند</Label></Beat>
</Frame>;
