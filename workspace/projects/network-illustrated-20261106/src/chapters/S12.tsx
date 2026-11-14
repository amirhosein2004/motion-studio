import React from 'react';
import {Frame,Node,Line,Packet,Box,Beat,Label,EN,useSeconds,ramp} from '../Shared';
import {D} from '../design';
export const S12=()=> <Frame n={12} title="بازکردن سایت؛ مسیر کامل" kicker="از شبکهٔ خانه تا SSH">
<Node x={230} y={350} label="مرورگر"/><Node x={700} y={350} kind="router" label="خانه"/><Node x={1140} y={350} kind="cloud" label="ISP و شبکه‌ها"/><Node x={1620} y={350} kind="server" label="سایت"/>
<Box x={140} y={10} w={500} h={115} title={<EN>example.com</EN>} color={D.orange}/><Box x={800} y={10} w={750} h={115} title="نام‌یابی → اتصال امن" at={7}/>
<Line a={[230,280]} b={[230,245]} at={16}/><Line a={[230,245]} b={[1620,245]} at={16}/><Line a={[1620,245]} b={[1620,280]} at={16}/>
<Line a={[700,245]} b={[700,280]} at={16}/><Line a={[1140,245]} b={[1140,280]} at={16}/>
<Beat at={20}><rect x={130} y={220} width={1590} height={380} rx={40} fill="none" stroke={D.purple} strokeWidth={3} strokeDasharray="15 10"/><Label x={1150} y={150} w={1000} color={D.purple}>محدودهٔ رمزگذاری محتوای HTTPS</Label></Beat>
<Packet a={[230,245]} b={[1620,245]} at={23} duration={4} label="درخواست"/>
<Line a={[1620,560]} b={[230,560]} at={30} color={D.cyan}/><Packet a={[1620,560]} b={[230,560]} at={30} duration={4} label="پاسخ" color={D.cyan}/>
<Box x={140} y={620} w={700} h={95} title="مرورگر صفحه را نمایش می‌دهد" at={39} color={D.cyan}/>
</Frame>;
