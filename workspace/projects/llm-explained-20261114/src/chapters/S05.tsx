import {Appear,Chip,Frame,Text,useScene} from '../Shared';
import {D} from '../design';
export const S05=()=>{
  const {p}=useScene('S05');
  return <Frame n={5} kicker="آموزش و استفادهٔ روزمره" title="یادگیری با جواب‌دادن فرق داره" note="تغییر زمینهٔ گفت‌وگو با تغییر وزن‌ها فرق داره؛ ذخیره و آموزش بعدی به سرویس بستگی داره.">
    <div style={{position:'absolute',left:960,top:335,width:1,height:545,background:D.color.line}}/>
    <Text x={1060} y={335} w={650} size={43} color={D.color.blue}>آموزش تکمیلی</Text>
    <Text x={230} y={335} w={650} size={43} color={D.color.green}>پاسخ‌دهی معمول</Text>
    <Appear p={p('feedback')}>
      <Text x={1060} y={415} w={650} size={34} color={D.color.muted}>نمونهٔ پاسخ + بازخورد</Text>
      <Chip x={1280} y={505} size={210} label="" active={p('tune')}/>
    </Appear>
    <Appear p={p('tune')}>
      <Text x={1060} y={758} w={650} size={40} color={D.color.blue}>وزن‌ها تغییر می‌کنن</Text>
      <Text x={1060} y={835} w={650} size={31} color={D.color.muted}>برای پیروی بهتر از دستورها</Text>
    </Appear>
    <Appear p={p('inference')}>
      <Text x={230} y={415} w={650} size={34} color={D.color.muted}>همون مدل، با پیام ورودی</Text>
      <Chip x={460} y={505} size={210} label="" fixed/>
      <Text x={230} y={758} w={650} size={40} color={D.color.green}>وزن‌ها ثابت می‌مونن</Text>
    </Appear>
    <Appear p={p('context')}><Text x={230} y={835} w={650} size={31} color={D.color.muted}>پیام تازه، زمینهٔ تازه</Text></Appear>
  </Frame>;
};

