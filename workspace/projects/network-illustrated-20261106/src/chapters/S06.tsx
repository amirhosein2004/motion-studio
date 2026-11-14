import React from 'react';
import {Frame,Node,Line,Packet,Box,Beat,Label,EN,useSeconds,ramp} from '../Shared';
import {D} from '../design';
export const S06=()=> <Frame n={6} title="IP؛ آدرس مقصد را مشخص کن" kicker="از شبکهٔ خانه تا SSH">
<Node x={340} y={300} kind="phone" label="گوشی" sub="192.168.1.5" at={4}/><Node x={930} y={300} kind="router" label="روتر" sub="192.168.1.1"/><Node x={1530} y={300} label="لپ‌تاپ" sub="192.168.1.8" at={8}/>
<Line a={[470,300]} b={[800,300]} at={13}/><Line a={[1060,300]} b={[1390,300]} at={13}/><Beat at={15}><Label x={950} y={110} w={650} color={D.orange}>مقصد: <EN>192.168.1.8</EN></Label></Beat>
<Packet a={[470,300]} b={[780,300]} at={19} duration={1.5}/><Packet a={[1080,300]} b={[1370,300]} at={20.5} duration={1.5}/><Box x={630} y={520} w={650} h={125} title={<><EN>DHCP</EN> · آدرس‌دهی خودکار</>} at={30}/>
</Frame>;
