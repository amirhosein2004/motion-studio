import {Appear,Cable,Frame,Panel,Text,useScene} from '../Shared';
import {D} from '../design';
export const S08=()=>{
  const {p}=useScene('S08');
  return <Frame n={8} kicker="جمع‌بندی • پشت پاسخ طبیعی" title="ریاضی، الگوها و متنِ در دسترس" note="روانی متن، مدرک احساس یا تجربهٔ انسانی نیست.">
    <Appear p={p('learn')}>
      <Text x={1390} y={292} w={360} size={29} color={D.color.muted}>آموزش</Text>
      <Panel x={1360} y={355} w={390} h={120}/><Text x={1395} y={390} w={320} size={35}>داده + تمرین + خطا</Text>
      <Panel x={830} y={355} w={390} h={120} color="#416b82"/><Text x={865} y={390} w={320} size={35} color={D.color.blue}>وزن‌های آموخته</Text>
    </Appear>
    <Cable path="M1320 415H1260" p={p('learn',1.2)} dot={{x1:1320,y1:415,x2:1260,y2:415}}/>
    <Appear p={p('run')}>
      <Text x={1390} y={535} w={360} size={29} color={D.color.muted}>اجرای معمول</Text>
      {[{x:1360,t:'پیام و توکن‌ها'},{x:830,t:'محاسبه با وزن‌ها'},{x:240,t:'انتخاب ادامه و پاسخ'}].map(item=><div key={item.x}>
        <Panel x={item.x} y={610} w={390} h={120} color="#345f60" style={{background:'#142c35'}}/>
        <Text x={item.x+32} y={646} w={326} size={34} color={D.color.green}>{item.t}</Text>
      </div>)}
    </Appear>
    <Cable path="M1025 500V580" p={p('run',1)}/>
    <Cable path="M1320 670H1260" p={p('run',1.2)} dot={{x1:1320,y1:670,x2:1260,y2:670}}/>
    <Cable path="M790 670H670" p={p('run',1.8)} dot={{x1:790,y1:670,x2:670,y2:670}}/>
    <Appear p={p('tool')}><Text x={1360} y={815} w={390} size={31} color={D.color.blue}>ابزار، متن منبع رو اضافه می‌کنه.</Text></Appear>
    <Cable path="M1555 790V755" p={p('tool',1)}/>
    <Appear p={p('limit')}>
      <Text x={240} y={815} w={1050} size={48} color={D.color.amber} weight={700}>جواب روان ≠ جواب تضمین‌شده</Text>
      <Text x={240} y={894} w={1050} size={31} color={D.color.muted}>برای ادعای مهم، شواهد و منبع رو بررسی کن.</Text>
    </Appear>
  </Frame>;
};

