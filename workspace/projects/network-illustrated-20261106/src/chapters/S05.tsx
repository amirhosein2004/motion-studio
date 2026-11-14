import React from 'react';
import {Frame,Node,Line,Packet,Box,Beat,Label,EN,useSeconds,ramp} from '../Shared';
import {D} from '../design';
export const S05=()=> <Frame n={5} title="یک جعبه؛ چند نقش متفاوت" kicker="از شبکهٔ خانه تا SSH">
<Box x={140} y={30} w={1610} h={610} title="داخل دستگاه خانگی؛ نقش‌ها را جدا ببین" color={D.muted}/>
<Box x={205} y={155} w={330} h={320} title="نقطهٔ دسترسی" at={7} color={D.cyan}><Node x={370} y={304} kind="phone" label="اتصال بی‌سیم"/></Box>
<Box x={590} y={155} w={330} h={320} title="سوئیچ" at={13} color={D.cyan}><Node x={755} y={304} label="اتصال سیمی"/></Box>
<Box x={975} y={155} w={330} h={320} title="روتر" at={22} color={D.orange}><Node x={1140} y={304} kind="router" label="بین شبکه‌ها" color={D.orange}/></Box>
<Box x={1360} y={155} w={330} h={320} title="مودم" at={30} color={D.purple}><Node x={1525} y={304} kind="cloud" label="ارتباط با بستر" color={D.purple}/></Box>
<Beat at={39}><Label x={1060} y={540} w={1300}>ممکن است چند نقش، داخل یک دستگاه باشند</Label></Beat>
</Frame>;
