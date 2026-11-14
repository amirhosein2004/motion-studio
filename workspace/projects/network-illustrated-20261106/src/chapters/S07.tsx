import React from 'react';
import {Frame,Node,Line,Packet,Box,Beat,Label,EN,useSeconds,ramp} from '../Shared';
import {D} from '../design';
export const S07=()=> <Frame n={7} title="IP خصوصی، عمومی و NAT" kicker="از شبکهٔ خانه تا SSH">
<Box x={140} y={10} w={650} h={250} title="خانهٔ دوم؛ شبکهٔ جدا" color={D.muted}><Label x={465} y={110} w={570}>گوشی: <EN>192.168.1.5</EN></Label></Box>
<Box x={140} y={330} w={650} h={370} title="خانهٔ اول" color={D.cyan}/><Node x={315} y={500} kind="phone" label="گوشی" sub="192.168.1.5" scale={0.86}/><Node x={600} y={500} label="لپ‌تاپ" sub="192.168.1.8" at={8} scale={0.86}/>
<Node x={1040} y={420} kind="router" label="روتر / NAT" at={14}/><Node x={1600} y={420} kind="server" label="سرور اینترنت" at={19}/><Line a={[750,420]} b={[920,420]} at={16}/><Line a={[1170,420]} b={[1460,420]} at={19} color={D.purple}/>
<Beat at={19}><Label x={1380} y={225} w={700} color={D.purple}>یک آدرس عمومی مشترک در این مثال</Label></Beat>
<Box x={890} y={25} w={840} h={185} title="روتر، ارتباط‌ها را پیگیری می‌کند" titleSize={32} at={25}><Label x={1310} y={125} w={780} size={28}>ارتباط A ↔ گوشی · ارتباط B ↔ لپ‌تاپ</Label></Box>
<Packet a={[780,420]} b={[850,420]} at={29} duration={1} label="درخواست"/><Packet a={[1220,420]} b={[1440,420]} at={30} duration={2} label="درخواست"/>
<Line a={[1460,325]} b={[1170,325]} at={35} dashed/><Line a={[920,325]} b={[320,325]} at={37} dashed/><Line a={[320,350]} b={[320,395]} at={39} dashed/>
<Packet a={[1460,325]} b={[1170,325]} at={35} duration={2} label="پاسخ A" color={D.cyan}/><Packet a={[920,325]} b={[320,325]} at={37} duration={2} label="پاسخ A" color={D.cyan}/>
<Beat at={41}><Label x={1370} y={620} w={850} color={D.red}>اتصال ورودی مستقیم، تضمین‌شده نیست</Label></Beat>
</Frame>;
