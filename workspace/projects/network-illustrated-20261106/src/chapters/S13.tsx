import React from 'react';
import {Frame,Node,Line,Packet,Box,Beat,Label,EN,useSeconds,ramp} from '../Shared';
import {D} from '../design';
export const S13=()=> <Frame n={13} title="سرعت و پینگ؛ دو معیار متفاوت" kicker="از شبکهٔ خانه تا SSH">
<Box x={170} y={20} w={1560} h={240} title="سرعت انتقال · مقدار داده در هر ثانیه" color={D.orange}/><Line a={[400,185]} b={[1480,185]} at={3} color={D.orange}/>{[0,1,2,3,4,5].map(i=><Packet key={i} a={[450,185]} b={[1430,185]} at={5+i*.6} duration={3} label="داده"/>)}
<Box x={170} y={300} w={1560} h={260} title="پینگ · زمان رفت‌وبرگشت" at={12}/><Line a={[400,460]} b={[1480,460]} at={15}/><Packet a={[450,440]} b={[1430,440]} at={18} duration={3} label="پیام"/><Packet a={[1430,490]} b={[450,490]} at={22} duration={3} label="پاسخ" color={D.purple}/>
<Beat at={28}><Label x={1070} y={620} w={1400} color={D.red}>پایداری و از دست رفتن بسته‌ها هم مهم‌اند</Label></Beat>
</Frame>;
