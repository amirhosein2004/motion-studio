import {Appear,Cable,Chip,Frame,Icon,Panel,Text,useScene} from '../Shared';
import {D} from '../design';
export const S06=()=>{
  const {p}=useScene('S06');
  return <Frame n={6} kicker="وقتی ابزار جستجو در دسترسه" title="نتیجهٔ وب وارد زمینه می‌شه" note="این یک نمایش شماتیکه؛ جستجوی زنده اجرا نمی‌شه و خود منبع هم به بررسی نیاز داره.">
    <Panel x={750} y={315} w={1000} h={595} style={{background:'transparent',borderColor:'#2b4052'}}/>
    <Text x={1330} y={338} w={375} size={28} color={D.color.muted}>برنامهٔ دستیار</Text>
    <Chip x={1410} y={415} size={210} labelWidth={330} fixed/>
    <Panel x={815} y={395} w={325} h={265}/>
    <Text x={855} y={427} w={245} size={35}>ابزار جستجو</Text>
    <Icon name="search" x={930} y={515} size={84}/>
    <Icon name="globe" x={285} y={435} size={155}/>
    <Text x={200} y={645} w={320} size={40}>وب</Text>
    <Cable path="M1370 480H1180" p={p('request',1.1)} dot={{x1:1370,y1:480,x2:1180,y2:480}}/>
    <Cable path="M775 480H510" p={p('search',1.1)} dot={{x1:775,y1:480,x2:510,y2:480}}/>
    <Cable path="M510 595H775" p={p('source',1.1)} color={D.color.green} dot={{x1:510,y1:595,x2:775,y2:595}}/>
    <Appear p={p('source')}><Text x={540} y={640} w={225} size={28} color={D.color.green}>متن منبع</Text></Appear>
    <Cable path="M1180 595H1235V785H1310" p={p('context',1.2)} color={D.color.green}/>
    <Appear p={p('context')}>
      <Panel x={1340} y={743} w={360} h={86} color="#345f60" style={{background:'#142c35'}}/>
      <Text x={1375} y={764} w={290} size={31} color={D.color.green}>زمینه + متن منبع</Text>
    </Appear>
    <Appear p={p('answer')}><Text x={800} y={846} w={490} size={32} color={D.color.green}>پاسخ با کمک متن منبع</Text></Appear>
    <Appear p={p('boundary')}><Text x={185} y={779} w={470} size={38} color={D.color.amber}>جستجو، آموزش مجدد نیست.</Text></Appear>
  </Frame>;
};

