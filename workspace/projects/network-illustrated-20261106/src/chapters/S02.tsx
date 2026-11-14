import React from 'react';
import {Frame,Node,Line,Packet,Box,Beat,Label,EN,useSeconds,ramp} from '../Shared';
import {D} from '../design';
export const S02=()=> <Frame n={2} title="کابل یا Wi-Fi؛ اینترنت کدام است؟" kicker="از شبکهٔ خانه تا SSH">
<Node x={300} y={120} label="لپ‌تاپ"/><Node x={300} y={440} kind="phone" label="گوشی" at={4}/><Node x={880} y={280} kind="router" label="دستگاه خانگی"/>
<Line a={[430,120]} b={[750,270]} at={3}/><Beat at={3}><Label x={580} y={30} ltr>Ethernet</Label></Beat>
<Line a={[430,440]} b={[750,300]} at={9} dashed/><Beat at={9}><Label x={580} y={510} ltr>Wi-Fi</Label></Beat>
<Node x={1510} y={150} kind="cloud" label="اینترنت" at={14}/>{useSeconds()<19?<Line a={[1010,240]} b={[1380,150]} at={14} color={D.purple}/>:<Beat at={19}><Line a={[1010,240]} b={[1150,206]} at={19} color={D.red} dashed/><Line a={[1260,180]} b={[1380,150]} at={19} color={D.red} dashed/><path d="M1188 180l30 30m0-30l-30 30" stroke={D.orange} strokeWidth={7} strokeLinecap="round"/></Beat>}
<Beat at={19}><Label x={1250} y={220} color={D.red}>اینترنت قطع است</Label></Beat>
<Node x={1510} y={470} kind="printer" label="چاپ محلی" at={24}/><Line a={[1010,330]} b={[1380,470]} at={25}/><Packet a={[1010,330]} b={[1380,470]} at={29} label="چاپ"/>
</Frame>;
