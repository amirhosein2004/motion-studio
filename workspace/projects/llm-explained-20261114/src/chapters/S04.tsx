import {Appear,Cable,Frame,Panel,Text,useScene} from '../Shared';
import {D} from '../design';
export const S04=()=>{
  const {p,s,at}=useScene('S04');
  const nextRound=p('again')>.5;
  const choices=nextRound?['میرزا','یک','املت']:['می‌تونی','پیشنهاد','شاید'];
  const selected=nextRound?p('next')>.5:p('select')>.5;
  const response=s>at('next')+2.1?'می‌تونی میرزاقاسمی درست کنی.':s>at('next')+1?'می‌تونی میرزاقاسمی':p('next')>.3?'می‌تونی میرزا':'می‌تونی';
  return <Frame n={4} kicker="اجرای مدل • ساخت پاسخ" title="هر بار، احتمالِ تکهٔ بعدی" note="گزینه‌ها و مسیرها شماتیک‌اند. احتمال بیشتر، تضمین درستی نیست؛ انتخاب هم همیشه رتبهٔ اول نیست.">
    <Appear p={p('context')}>
      <Panel x={1340} y={330} w={410} h={360}/>
      <Text x={1380} y={365} w={330} size={32} color={D.color.muted}>متن در دسترس</Text>
      <Text x={1380} y={439} w={330} size={38}>بادمجان، گوجه، تخم‌مرغ دارم.</Text>
      <Text x={1380} y={585} w={330} size={30} color={D.color.blue}>{nextRound?'پاسخ تا اینجا: می‌تونی':'چی درست کنم؟'}</Text>
    </Appear>
    <Cable path="M1300 505H1160" p={p('attention',1)} dot={{x1:1300,y1:505,x2:1160,y2:505}}/>
    <Appear p={p('attention')}>
      <Panel x={800} y={330} w={320} h={360} color="#416b82"/>
      <Text x={835} y={365} w={250} size={34} color={D.color.blue}>ترانسفورمر</Text>
      <svg width={230} height={145} style={{position:'absolute',left:845,top:442}}>
        {[0,1,2].map(i=><g key={i}>
          {[0,1,2].filter(j=>i===j||i===1||j===1).map(j=><path key={j} d={`M24 ${22+i*49}L206 ${22+j*49}`} stroke={D.color.blue} strokeWidth={(i+j+(nextRound?1:0))%2?2:4} opacity={.45}/>)}
          <circle cx={24} cy={22+i*49} r={8} fill={D.color.blue}/><circle cx={206} cy={22+i*49} r={8} fill={D.color.green}/>
        </g>)}
      </svg>
      <Text x={835} y={614} w={250} size={31}>توجه + محاسبه</Text>
    </Appear>
    <Cable path="M760 505H650" p={p('scores',1)} dot={{x1:760,y1:505,x2:650,y2:505}}/>
    <Appear p={p('scores')}>
      <Panel x={160} y={330} w={450} h={360}/>
      <Text x={200} y={365} w={370} size={32} color={D.color.muted}>{nextRound?'احتمال‌های تازه':'گزینه‌های ادامه'}</Text>
      {choices.map((choice,i)=><div key={i}>
        <Text x={365} y={442+i*74} w={205} size={35} color={i===0&&selected?D.color.green:D.color.white}>{choice}</Text>
        <div style={{position:'absolute',left:210,top:464+i*74,width:(nextRound?[120,98,48][i]:128-i*30)*p('scores'),height:7,borderRadius:6,background:i===0&&selected?D.color.green:D.color.blue}}/>
      </div>)}
    </Appear>
    <Cable path="M160 505H120V800Q120 830 155 830H640" p={p('append',1)} color={D.color.green}/>
    <Appear p={p('append')}>
      <Panel x={680} y={775} w={1030} h={112} color="#345f60" style={{background:'#142c35'}}/>
      <Text x={720} y={804} w={950} size={40} color={D.color.green}>{response}</Text>
    </Appear>
    <Cable path="M1710 832H1785V515H1758" p={p('again',1.1)} color={D.color.green}/>
    <Appear p={p('again')}><Text x={870} y={906} w={830} size={29} color={D.color.green}>اضافه به متن؛ تکرار محاسبه با ورودی تازه.</Text></Appear>
  </Frame>;
};

