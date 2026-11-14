import {Appear,Cable,Frame,Icon,Panel,Text,useScene} from '../Shared';
import {D} from '../design';
export const S07=()=>{
  const {p}=useScene('S07');
  return <Frame n={7} kicker="یک مثال • آشپز و دستورها" title="الگوهای قبلی، ترکیب تازه" note="این فقط یک تشبیهه؛ مدل مزه را تجربه نمی‌کنه و پیشنهادش تضمین‌شده نیست.">
    <Appear p={p('patterns')}>
      <Panel x={1320} y={330} w={430} h={200}/>
      <Text x={1360} y={367} w={350} size={35} color={D.color.blue}>الگوهای آموخته‌شده</Text>
      <Text x={1360} y={446} w={350} size={32}>دستورهای آشپزی</Text>
    </Appear>
    <Appear p={p('ingredients')}>
      <Panel x={1320} y={590} w={430} h={250}/>
      <Text x={1360} y={619} w={350} size={30} color={D.color.muted}>مواد همین درخواست</Text>
      <svg width={340} height={80} viewBox="0 0 340 80" style={{position:'absolute',left:1362,top:681}}>
        <ellipse cx="43" cy="40" rx="23" ry="30" fill="#e6e1d1"/><circle cx="43" cy="44" r="11" fill="#e8c68b"/>
        <circle cx="167" cy="43" r="26" fill="#c67b73"/><path d="M154 15L166 24L182 13L176 29L160 28Z" fill="#9abda2"/>
        <path d="M279 65C247 61 254 23 282 21C311 22 312 63 279 65Z" fill="#9d91bc"/><path d="M270 24L283 10L293 25" fill="#94bca9"/>
      </svg>
      <Text x={1350} y={772} w={105} size={28}>تخم‌مرغ</Text>
      <Text x={1480} y={772} w={100} size={28}>گوجه</Text>
      <Text x={1610} y={772} w={100} size={28}>بادمجان</Text>
    </Appear>
    <Cable path="M1285 430H1160Q1120 430 1120 470V510H1080" p={p('combine',1)}/>
    <Cable path="M1285 710H1160Q1120 710 1120 670V565H1080" p={p('combine',1)} color={D.color.green}/>
    <Appear p={p('combine')}>
      <div style={{position:'absolute',left:800,top:420,width:240,height:240,borderRadius:'50%',background:'radial-gradient(circle at 35% 25%,#33566d,#1d3547)',border:'1px solid #4f7990'}}/>
      <Icon name="chef" x={848} y={465} size={145}/>
      <Text x={760} y={708} w={320} size={35}>ترکیب الگوها</Text>
    </Appear>
    <Cable path="M760 540H620" p={p('suggestion',1)} dot={{x1:760,y1:540,x2:620,y2:540}}/>
    <Appear p={p('suggestion')}>
      <Panel x={180} y={395} w={400} h={335} color="#345f60" style={{background:'#142c35'}}/>
      <Text x={220} y={430} w={320} size={30} color={D.color.green}>یک پیشنهاد ممکن</Text>
      <Icon name="bowl" x={325} y={492} size={100} color={D.color.green}/>
      <Text x={220} y={631} w={320} size={45}>میرزاقاسمی</Text>
    </Appear>
    <Appear p={p('memorization')}><Text x={220} y={875} w={1490} size={34} color={D.color.amber}>بعضی متن‌های آموزش ممکنه عیناً بازتولید بشن.</Text></Appear>
  </Frame>;
};

