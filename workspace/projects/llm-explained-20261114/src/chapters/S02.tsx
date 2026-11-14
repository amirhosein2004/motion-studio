import {Appear,Cable,Chip,Frame,Icon,Panel,Text,useScene} from '../Shared';
import {D} from '../design';
export const S02=()=>{
  const {p}=useScene('S02');
  return <Frame n={2} kicker="پیش‌آموزش • یادگیری از متن" title="تمرین، خطا، اصلاح وزن‌ها" note="وزن یا پارامتر: یک عدد قابل تنظیم در شبکه. این چرخه شماتیک است.">
    <Appear p={p('data')}>
      <Icon name="document" x={1450} y={365} size={150}/>
      <Text x={1300} y={555} w={450} size={39}>دادهٔ آماده‌شده</Text>
      <Text x={1300} y={625} w={450} size={31} color={D.color.muted}>متن، گفت‌وگو و کد</Text>
    </Appear>
    <Cable path="M1350 500H1125" p={p('predict',1.1)} dot={{x1:1350,y1:500,x2:1125,y2:500}}/>
    <Appear p={p('predict')}>
      <Chip x={805} y={380} size={270} active={p('update')} label="وزن‌های شبکه" labelWidth={380}/>
      <Text x={740} y={755} w={390} size={32} color={D.color.muted}>پیش‌بینی ادامهٔ متن</Text>
    </Appear>
    <Cable path="M765 500H620" p={p('compare',1)} dot={{x1:765,y1:500,x2:620,y2:500}}/>
    <Appear p={p('compare')}>
      <Panel x={180} y={355} w={410} h={310}/>
      <Text x={220} y={390} w={330} size={37}>پیش‌بینی مدل</Text>
      <Text x={220} y={462} w={330} size={32} color={D.color.muted}>مقایسه با متن واقعی</Text>
      <div style={{position:'absolute',left:220,top:530,width:330,height:1,background:D.color.line}}/>
      <Text x={220} y={565} w={330} size={42} color={D.color.amber}>سنجش خطا</Text>
    </Appear>
    <Cable path="M385 690V780Q385 810 420 810H1150Q1180 810 1180 780V620H1105" p={p('update',1.2)} color={D.color.green}/>
    <Appear p={p('update')}><Text x={450} y={850} w={730} size={36} color={D.color.green}>بهینه‌سازی و اصلاح وزن‌ها</Text></Appear>
    <Appear p={p('repeat')}><Text x={1320} y={775} w={430} size={35} color={D.color.muted}>همین چرخه، بارها تکرار می‌شه.</Text></Appear>
  </Frame>;
};

