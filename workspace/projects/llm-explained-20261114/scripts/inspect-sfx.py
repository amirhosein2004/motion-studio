"""Inspect supplied source files without modifying them or exporting video."""
from pathlib import Path
import array, json, math, subprocess, shutil

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / 'project.json').read_text(encoding='utf-8'))
ASSETS = (ROOT / CONFIG['paths']['assets'] / 'audio' / 'sfx').resolve()
REPORTS = (ROOT / CONFIG['paths']['renders'] / 'v2-sfx-draft' / 'reports').resolve()
REPORTS.mkdir(parents=True, exist_ok=True)
results=[]
for file in sorted(ASSETS.glob('*.mp3')):
    probe=json.loads(subprocess.check_output([shutil.which('ffprobe'),'-v','error','-show_format','-show_streams','-of','json',str(file)],text=True,encoding='utf-8'))
    pcm=subprocess.check_output([shutil.which('ffmpeg'),'-v','error','-i',str(file),'-ac','1','-ar','24000','-f','f32le','pipe:1'])
    data=array.array('f');data.frombytes(pcm)
    step=2400
    windows=[]
    for i in range(0,len(data),step):
        chunk=data[i:i+step]
        rms=math.sqrt(sum(x*x for x in chunk)/len(chunk))
        windows.append({'at':round(i/24000,3),'rmsDb':round(20*math.log10(max(rms,1e-10)),1),'peakDb':round(20*math.log10(max(max(abs(x) for x in chunk),1e-10)),1)})
    active=[w for w in windows if w['rmsDb']>-48]
    result={'name':file.name,'durationSeconds':len(data)/24000,'channels':probe['streams'][0].get('channels'),'sampleRate':probe['streams'][0].get('sample_rate'),'formatDuration':probe['format']['duration'],'activeStartApprox':active[0]['at'] if active else None,'activeEndApprox':round(active[-1]['at']+.1,3) if active else None,'windows':windows,'probe':probe}
    results.append(result)
    print(json.dumps({k:v for k,v in result.items() if k not in ('windows','probe')},ensure_ascii=False))
(REPORTS/'source-inspection.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
