import {Composition,Folder} from 'remotion';
import './fonts';
import config from '../project.json';
import {Video} from './Video';
import {scenes,totalFrames} from './timing';
import {S01} from './chapters/S01';
import {S02} from './chapters/S02';
import {S03} from './chapters/S03';
import {S04} from './chapters/S04';
import {S05} from './chapters/S05';
import {S06} from './chapters/S06';
import {S07} from './chapters/S07';
import {S08} from './chapters/S08';
export const Root=()=> <>
<Composition id="LLM-Explained" component={Video} durationInFrames={totalFrames} {...config.video}/>
<Folder name="Scenes">
<Composition id="S01" component={S01} durationInFrames={scenes[0].durationInFrames} {...config.video}/>
<Composition id="S02" component={S02} durationInFrames={scenes[1].durationInFrames} {...config.video}/>
<Composition id="S03" component={S03} durationInFrames={scenes[2].durationInFrames} {...config.video}/>
<Composition id="S04" component={S04} durationInFrames={scenes[3].durationInFrames} {...config.video}/>
<Composition id="S05" component={S05} durationInFrames={scenes[4].durationInFrames} {...config.video}/>
<Composition id="S06" component={S06} durationInFrames={scenes[5].durationInFrames} {...config.video}/>
<Composition id="S07" component={S07} durationInFrames={scenes[6].durationInFrames} {...config.video}/>
<Composition id="S08" component={S08} durationInFrames={scenes[7].durationInFrames} {...config.video}/>
</Folder></>;
