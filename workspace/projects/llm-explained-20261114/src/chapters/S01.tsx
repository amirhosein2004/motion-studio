import {Appear, Cable, Chip, Frame, Icon, Panel, Text, useScene} from '../Shared';
import {D} from '../design';
export const S01=()=>{
  const {p}=useScene('S01');
  return <Frame n={1} kicker="از بیرون به داخل" title="مدل زبانی چطور جواب می‌سازه؟" note="مدل زبانی یکی از بخش‌های دستیار است؛ هر هوش مصنوعی، مدل زبانی نیست.">
    <Appear p={p('place')}>
      <Panel x={280} y={315} w={1360} h={510} style={{background:'#142231',borderColor:'#304b5e'}}/>
      <Text x={1210} y={340} w={375} size={31} color={D.color.muted}>برنامهٔ دستیار</Text>
      <Chip x={830} y={435} size={260} labelWidth={380}/>
      <Text x={1260} y={866} w={380} size={33} color={D.color.blue}><bdi dir="ltr">LLM</bdi> = مدل زبانی بزرگ</Text>
    </Appear>
    <Appear p={p('boundary')}>
      <Icon name="chat" x={1340} y={475} size={105}/>
      <Text x={1200} y={646} w={355} size={37}>رابط گفت‌وگو</Text>
      <Icon name="search" x={495} y={475} size={105}/>
      <Text x={375} y={646} w={280} size={37}>ابزارها</Text>
    </Appear>
    <Cable path="M1295 535H1135" p={p('boundary',1)} dot={{x1:1295,y1:535,x2:1135,y2:535}}/>
    <Cable path="M785 535H655" p={p('boundary',1)} dot={{x1:785,y1:535,x2:655,y2:535}}/>
    <Appear p={p('scope')}><Text x={300} y={866} w={850} size={34} color={D.color.muted}>مدل، رابط و ابزارها نقش‌های جدا دارن.</Text></Appear>
  </Frame>;
};

