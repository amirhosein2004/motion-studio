import React from 'react';
import {Frame,Node,Line,Packet,Box,Beat,Label,EN,useSeconds,ramp} from '../Shared';
import {D} from '../design';
export const S14=()=> <Frame n={14} title="SSH روی همین مسیر کار می‌کند" kicker="از شبکهٔ خانه تا SSH">
<Node x={300} y={350} label="لپ‌تاپ شما"/><Node x={1570} y={350} kind="server" label="سرور مقصد"/>
<Box x={450} y={15} w={820} h={130} title={<EN>ssh ali@server.example.com</EN>} color={D.orange}/>
<Line a={[440,350]} b={[1430,350]} at={6}/><Beat at={9}><Label x={1000} y={200} w={900}>مقصد → سرویس SSH روی پورت 22</Label></Beat>
<Box x={650} y={470} w={700} h={100} title="هویت سرور → هویت کاربر" at={19}/>
<Box x={130} y={600} w={650} h={110} title="کلید خصوصی روی لپ‌تاپ می‌ماند" titleSize={30} color={D.orange} at={26}/>
<Packet a={[440,350]} b={[1430,350]} at={30} duration={3} label="ls"/>
<Box x={1370} y={20} w={400} h={140} title="اجرا روی سرور" at={34} color={D.cyan}/><Packet a={[1430,390]} b={[440,390]} at={38} duration={3} label="نتیجه" color={D.cyan}/>
<Box x={870} y={600} w={900} h={110} title={<EN>server: projects/  notes.txt</EN>} titleSize={30} color={D.cyan} at={42}/>
</Frame>;
