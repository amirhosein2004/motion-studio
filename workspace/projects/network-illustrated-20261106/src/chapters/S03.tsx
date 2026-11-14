import React from 'react';
import {Frame,Node,Line,Packet,Box,Beat,Label,EN,useSeconds,ramp} from '../Shared';
import {D} from '../design';
export const S03=()=> <Frame n={3} title="LAN؛ یک محدودهٔ مشترک" kicker="از شبکهٔ خانه تا SSH">
<Box x={180} y={20} w={1240} h={640} title={<><EN>LAN</EN> · شبکهٔ خانه</>} color={D.cyan}/>
<Node x={380} y={270} kind="phone" label="گوشی"/><Node x={800} y={270} label="لپ‌تاپ" at={5}/><Node x={1210} y={270} kind="printer" label="پرینتر" at={8}/>
<Line a={[490,270]} b={[660,270]} at={13}/><Line a={[940,270]} b={[1070,270]} at={15}/><Packet a={[490,270]} b={[660,270]} at={17} label="فایل"/>
<Beat at={23}><Label x={850} y={510} w={950} color={D.orange}>اشتراک فایل نیاز به تنظیم و اجازه دارد</Label></Beat>
<Node x={1650} y={270} kind="cloud" label="اینترنت" at={27} color={D.muted}/>
</Frame>;
