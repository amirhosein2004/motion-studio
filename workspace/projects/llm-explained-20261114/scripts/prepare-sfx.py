"""Reproduce trimmed playback WAVs while preserving every original MP3."""
from pathlib import Path
import os
import array, hashlib, json, math, shutil, subprocess

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT/'project.json').read_text(encoding='utf-8'))
ASSETS = (ROOT/CONFIG['paths']['assets']/'audio'/'sfx').resolve()
PUBLIC = (ROOT/CONFIG['paths']['public']).resolve()
REPORTS = (ROOT/CONFIG['paths']['renders']/CONFIG['version']/'reports').resolve()
REPORTS.mkdir(parents=True,exist_ok=True)
PLAN = json.loads((ROOT/'narration/sfx-edit-plan.json').read_text(encoding='utf-8'))
FFMPEG=shutil.which('ffmpeg'); FFPROBE=shutil.which('ffprobe')
runtime={}; provenance=[]
sha=lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
for edit in PLAN['assets']:
    source=ASSETS/edit['source']; destination=PUBLIC/edit['runtime']
    destination.parent.mkdir(parents=True,exist_ok=True)
    source_info=json.loads(subprocess.check_output([FFPROBE,'-v','error','-show_format','-show_streams','-of','json',str(source)],text=True,encoding='utf-8'))
    duration=edit['end']-edit['start']
    filters=f"atrim=start={edit['start']}:end={edit['end']},asetpts=PTS-STARTPTS,aresample=48000,afade=t=in:st=0:d={edit['fadeIn']},afade=t=out:st={duration-edit['fadeOut']}:d={edit['fadeOut']}"
    floating=subprocess.check_output([FFMPEG,'-v','error','-i',str(source),'-af',filters,'-ac','2','-ar','48000','-f','f32le','pipe:1'])
    samples=array.array('f');samples.frombytes(floating)
    peak=max(abs(v) for v in samples)
    gain_db=edit['targetPeakDb']-20*math.log10(max(peak,1e-10))
    subprocess.run([FFMPEG,'-v','error','-y','-i',str(source),'-af',filters+f',volume={gain_db}dB','-ac','2','-ar','48000','-c:a','pcm_s16le',str(destination)],check=True)
    probe=json.loads(subprocess.check_output([FFPROBE,'-v','error','-show_format','-show_streams','-of','json',str(destination)],text=True,encoding='utf-8'))
    actual=float(probe['format']['duration'])
    runtime[edit['id']]={'runtime':edit['runtime'],'durationSeconds':actual}
    provenance.append({'type':'sfx','id':edit['id'],'source':Path(os.path.relpath(source,ROOT)).as_posix(),'runtime':edit['runtime'],'sourceSha256':sha(source),'runtimeSha256':sha(destination),'license':'User-supplied audio with explicit project-use authorization; no license document supplied; no license inferred from filename.','processing':{**edit,'gainDb':round(gain_db,5),'sampleRate':48000,'channels':2,'codec':'pcm_s16le','speed':1,'pitchChanged':False},'sourceDurationSeconds':float(source_info['format']['duration']),'runtimeDurationSeconds':actual,'probe':probe})
    print(f"{edit['id']}: {actual:.3f}s, gain {gain_db:.2f} dB, peak target {edit['targetPeakDb']} dBFS")
(ROOT/'src/sfx-assets.json').write_text(json.dumps(runtime,indent=2)+'\n',encoding='utf-8')
manifest_file=ROOT/'ASSET-SOURCES.json'
manifest=json.loads(manifest_file.read_text(encoding='utf-8'))
manifest['assets']=[a for a in manifest['assets'] if a.get('type')!='sfx']+provenance
manifest_file.write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
(REPORTS/'sfx-preparation.json').write_text(json.dumps(provenance,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
