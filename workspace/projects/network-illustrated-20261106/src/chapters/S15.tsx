import React from 'react';
import {Frame,Node,Line,Packet,Box,Beat,Label,EN,useSeconds,ramp} from '../Shared';
import {D} from '../design';
export const S15=()=> <Frame n={15} title="مرور؛ هر جزء چه نقشی داشت؟" kicker="از شبکهٔ خانه تا SSH">
{['شبکه: مسیر','IP: مقصد','پورت: سرویس','پروتکل: قواعد'].map((s,i)=><Box key={s} x={180+i*410} y={65} w={360} h={140} title={s} at={i*1.5} color={[D.cyan,D.orange,D.purple,D.cyan][i]}/>)}
<Box x={250} y={285} w={1420} h={190} title="Wi-Fi وصل است؛ اینترنت قطع است. چاپ محلی ممکن است؟" at={8} color={D.orange}/>
<Beat at={15}><Label x={1100} y={390} w={1000} color={D.cyan}>بله؛ مسیر داخلی می‌تواند برقرار بماند</Label></Beat>
<Beat at={20}><Label x={1020} y={540} w={1300}>روی یک سرور، SSH و HTTPS چطور جدا می‌شوند؟</Label></Beat>
<Beat at={25}><Label x={1030} y={625} w={1250} color={D.purple}>با پورت سرویس‌ها؛ در این مثال 22 و 443</Label></Beat>
</Frame>;
