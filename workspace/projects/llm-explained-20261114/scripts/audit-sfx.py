"""Validate PCM files and scene-relative event bounds; no video export."""
from pathlib import Path
import array, hashlib, json, math, wave

ROOT=Path(__file__).resolve().parents[1]
config=json.loads((ROOT/'project.json').read_text(encoding='utf-8'))
timeline=json.loads((ROOT/'src/timeline.json').read_text(encoding='utf-8'))
events=json.loads((ROOT/'src/sfx-events.json').read_text(encoding='utf-8'))
assets=json.loads((ROOT/'src/sfx-assets.json').read_text(encoding='utf-8'))
fps=config['video']['fps']; rate=48000
scenes={}; start=0
for scene in timeline['scenes']:
    scenes[scene['id']]={**scene,'startSeconds':start}
    start+=scene['durationSeconds']
mix=array.array('f',[0])*(round(start*rate)*2)
files={}; pcm={}
for key,asset in assets.items():
    with wave.open(str(ROOT/'public'/asset['runtime']),'rb') as w:
        assert w.getframerate()==rate and w.getnchannels()==2 and w.getsampwidth()==2
        a=array.array('h');a.frombytes(w.readframes(w.getnframes()))
    pcm[key]=a
    peak=max(abs(v) for v in a)/32768
    files[key]={'durationSeconds':len(a)/(2*rate),'peakDbFS':round(20*math.log10(max(peak,1e-10)),2),'nonzeroSamples':sum(v!=0 for v in a)}
    assert files[key]['nonzeroSamples']>0 and peak<1
scheduled=[]
for event in events:
    scene=scenes[event['scene']]
    cue=0 if event['cue']=='scene-start' else next(c['at'] for c in scene['cues'] if c['id']==event['cue'])
    local_frame=math.floor((cue+event['offset'])*fps+.5)
    clip_frames=math.ceil(assets[event['asset']]['durationSeconds']*fps)
    assert local_frame>=0 and local_frame+clip_frames<=round(scene['durationSeconds']*fps),event['id']
    global_frame=round(scene['startSeconds']*fps)+local_frame
    offset=round(global_frame/fps*rate)*2
    volume=event.get('volume',1)
    assert 0<=volume<=1
    for i,value in enumerate(pcm[event['asset']]):mix[offset+i]+=value/32768*volume
    scheduled.append({**event,'localFrame':local_frame,'globalFrame':global_frame,'globalSeconds':global_frame/fps,'durationInFrames':clip_frames})
peak=max(abs(v) for v in mix)
intake=json.loads((ROOT/config['paths']['assets']/'audio/sfx/INTAKE.json').read_text(encoding='utf-8-sig'))
for original in intake:
    assert hashlib.sha256(Path(original['destination']).read_bytes()).hexdigest()==original['sha256']
covered={(event['scene'],event['cue']) for event in events}
uncovered=[scene['id']+'/'+c['id'] for scene in timeline['scenes'] for c in scene['cues'] if (scene['id'],c['id']) not in covered]
report={'version':config['version'],'files':files,'eventCount':len(scheduled),'uncoveredVisualCues':uncovered,'allSixSourcesUsed':set(pcm)=={e['asset'] for e in events},'boundsValid':True,'sourceHashesMatchIntake':True,'mixPeakDbFS':round(20*math.log10(max(peak,1e-10)),2),'clippedSamples':sum(abs(v)>=1 for v in mix),'audioCoverage':'SFX only; human narration not supplied','listeningApproval':False,'events':scheduled}
assert report['allSixSourcesUsed'] and report['clippedSamples']==0 and not uncovered
out=(ROOT/config['paths']['renders']/config['version']/'reports').resolve();out.mkdir(parents=True,exist_ok=True)
(out/'sfx-audit.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
print(json.dumps({key:value for key,value in report.items() if key not in ('events','files')}))
