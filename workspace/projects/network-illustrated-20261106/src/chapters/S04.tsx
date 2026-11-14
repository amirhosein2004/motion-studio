import React from 'react';
import {Frame,Node,Line,Packet,Box,Beat,Label,EN,useSeconds,ramp} from '../Shared';
import {D} from '../design';
export const S04=()=> <Frame n={4} title="اینترنت؛ شبکه‌ای از شبکه‌ها" kicker="از شبکهٔ خانه تا SSH">
<Node x={260} y={300} label="خانه" kind="router"/><Node x={710} y={300} label="شرکت اینترنت" kind="cloud" at={5}/><Node x={1160} y={300} label="شبکه‌های دیگر" kind="cloud" at={9}/><Node x={1610} y={300} label="سرور سایت" kind="server" at={13}/>
<Line a={[380,300]} b={[580,300]} at={6}/><Line a={[830,300]} b={[1030,300]} at={10}/><Line a={[1280,300]} b={[1480,300]} at={14}/>
<Packet a={[440,290]} b={[530,290]} at={16} duration={1.1} label="درخواست"/><Packet a={[890,290]} b={[980,290]} at={17.3} duration={1.1} label="درخواست"/><Packet a={[1340,290]} b={[1430,290]} at={18.6} duration={1.1} label="درخواست"/>
<Packet a={[1430,330]} b={[1340,330]} at={24} duration={1.1} label="پاسخ" color={D.cyan}/><Packet a={[980,330]} b={[890,330]} at={25.3} duration={1.1} label="پاسخ" color={D.cyan}/><Packet a={[530,330]} b={[440,330]} at={26.6} duration={1.1} label="پاسخ" color={D.cyan}/>
<Beat at={7}><Label x={720} y={510} ltr color={D.purple}>ISP</Label></Beat>
</Frame>;
