import {Sequence,useVideoConfig} from 'remotion';
import {scenes} from './timing';
import {S01} from './chapters/S01';
import {S02} from './chapters/S02';
import {S03} from './chapters/S03';
import {S04} from './chapters/S04';
import {S05} from './chapters/S05';
import {S06} from './chapters/S06';
import {S07} from './chapters/S07';
import {S08} from './chapters/S08';
export const Video=()=>{const {fps}=useVideoConfig();return <>
  <Sequence name="S01-Model" from={scenes[0].from} durationInFrames={scenes[0].durationInFrames} premountFor={fps}><S01/></Sequence>
  <Sequence name="S02-Training" from={scenes[1].from} durationInFrames={scenes[1].durationInFrames} premountFor={fps}><S02/></Sequence>
  <Sequence name="S03-Tokens" from={scenes[2].from} durationInFrames={scenes[2].durationInFrames} premountFor={fps}><S03/></Sequence>
  <Sequence name="S04-Generation" from={scenes[3].from} durationInFrames={scenes[3].durationInFrames} premountFor={fps}><S04/></Sequence>
  <Sequence name="S05-PostTraining" from={scenes[4].from} durationInFrames={scenes[4].durationInFrames} premountFor={fps}><S05/></Sequence>
  <Sequence name="S06-Search" from={scenes[5].from} durationInFrames={scenes[5].durationInFrames} premountFor={fps}><S06/></Sequence>
  <Sequence name="S07-Patterns" from={scenes[6].from} durationInFrames={scenes[6].durationInFrames} premountFor={fps}><S07/></Sequence>
  <Sequence name="S08-Recap" from={scenes[7].from} durationInFrames={scenes[7].durationInFrames} premountFor={fps}><S08/></Sequence>
</>;};
