import {Appear,Frame,Panel,Text,useScene} from '../Shared';
import {D} from '../design';
export const S03=()=>{
  const {p}=useScene('S03');
  return <Frame n={3} kicker="آماده‌سازی ورودی" title="از تکهٔ متن تا فهرست عددها" note="توکن‌ها، شناسه‌ها و عددها شماتیک‌اند. ترتیب توکن‌ها هم وارد محاسبه می‌شه.">
    <Appear p={p('text')}>
      <Text x={850} y={305} w={850} size={49}>بادمجان و گوجه</Text>
      <Text x={220} y={320} w={560} size={33} color={D.color.muted}>توکن لزوماً یک کلمهٔ کامل نیست.</Text>
    </Appear>
    {['باد','مجان','و','گوجه'].map((word,i)=>{
      const x=1300-i*360;
      return <div key={word}>
        <Appear p={p('tokens')}>
          <Panel x={x} y={435} w={300} h={110} color={D.color.line}/>
          <Text x={x+32} y={462} w={236} size={43} color={D.color.blue}>{word}</Text>
        </Appear>
        <Appear p={p('ids')}>
          <div style={{position:'absolute',left:x+150,top:565,width:1,height:40,background:D.color.line}}/>
          <Text x={x} y={626} w={300} size={32} color={D.color.muted}>شناسهٔ {['۱۰۱','۱۰۲','۱۰۳','۱۰۴'][i]}</Text>
        </Appear>
        <Appear p={p('vectors')}>
          <Panel x={x} y={710} w={300} h={122} style={{background:'#142c35',borderColor:'#34565b'}}/>
          <div data-qa="vector" dir="ltr" style={{position:'absolute',left:x+25,top:750,width:250,fontSize:32,textAlign:'left',color:D.color.green}}>
            {i%2===0?'[0.2, −0.4, 0.8]':'[0.5, 0.1, −0.3]'}
          </div>
        </Appear>
      </div>;
    })}
    <Appear p={p('vectors')}><Text x={1080} y={869} w={520} size={34} color={D.color.green}>بردار = فهرست عددها</Text></Appear>
  </Frame>;
};

