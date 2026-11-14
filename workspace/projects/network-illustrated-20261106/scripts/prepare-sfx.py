"""Preserve originals; measure active audio and prepare quiet 48kHz playback WAVs."""
from pathlib import Path
import subprocess,json,shutil,hashlib,re,math
import numpy as np

ROOT=Path(__file__).resolve().parents[1]
INPUT=ROOT.parents[1]/'assets'/ROOT.name/'sfx'
OUTPUT=ROOT/'public/audio/sfx'
PROJECT_SOURCE=OUTPUT/'source'
FILES={
 'disconnect':'emircanalp-beep-125033.mp3',
 'arrival':'soundshelfstudio-ui-soft-glass-ping-526562.mp3',
 'reveal':'soundreality-pop-423717.mp3',
 'connect':'freesound_gamestudio-click-2-384920.mp3',
 'complete':'soundshelfstudio-ui-chime-notification-sound-553111.mp3',
 'transition':'dbsound-short-simple-whoosh-609448.mp3',
 'piece':'vadim_makes_sound-soft-app-button-tap-sound-2-547872.mp3',
 'transfer':'freesound_community-digital-91828.mp3',
 'enter':'vadim_makes_sound-single-mechanical-keyboard-enter-key-press-546557.mp3',
}
def run(args):return subprocess.run(args,check=True,capture_output=True)
INPUT.mkdir(parents=True,exist_ok=True);OUTPUT.mkdir(parents=True,exist_ok=True);PROJECT_SOURCE.mkdir(parents=True,exist_ok=True)
report={}
for key,name in FILES.items():
 project_copy=PROJECT_SOURCE/name
 source=project_copy if project_copy.exists() else Path('C:/Users/Asus/Downloads')/name
 original=INPUT/name
 if original.exists() and original.read_bytes()!=source.read_bytes():
  raise RuntimeError(f'Preserved original differs: {original}')
 if not original.exists():shutil.copy2(source,original)
 probe=json.loads(run(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(original)]).stdout)
 pcm=run(['ffmpeg','-v','error','-i',str(original),'-f','f32le','-ac','1','-ar','48000','-']).stdout
 data=np.frombuffer(pcm,dtype='<f4');block=240
 rms=np.array([np.sqrt(np.mean(data[i:i+block]**2)) for i in range(0,len(data),block)])
 active=np.flatnonzero(rms>10**(-45/20))
 if not len(active):raise RuntimeError(f'No audible signal: {name}')
 start=max(0,float(active[0]*block/48000)-.015)
 end=min(len(data)/48000,float((active[-1]+1)*block/48000)+.09)
 samples=data[int(start*48000):int(end*48000)]
 peak=float(np.max(np.abs(samples)));mean=float(np.sqrt(np.mean(samples**2)))
 # Bring short effects towards -28 dBFS RMS; keep peaks below -16 dBFS.
 gain_db=min(-28-20*math.log10(max(mean,1e-9)),-16-20*math.log10(max(peak,1e-9)),6)
 duration=end-start
 filters=f'atrim=start={start:.6f}:end={end:.6f},asetpts=PTS-STARTPTS,volume={gain_db:.3f}dB,afade=t=in:d=0.003,afade=t=out:st={max(0,duration-.035):.6f}:d=0.035'
 target=OUTPUT/(key+'.wav')
 run(['ffmpeg','-v','error','-y','-i',str(original),'-af',filters,'-ar','48000','-ac','2','-c:a','pcm_s16le',str(target)])
 final=json.loads(run(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(target)]).stdout)
 report[key]={'file':f'audio/sfx/{key}.wav','source':(str(source.relative_to(ROOT)).replace('\\','/') if source.is_relative_to(ROOT) else str(source)),'preservedOriginal':str(original),'sha256':hashlib.sha256(original.read_bytes()).hexdigest(),'originalDuration':float(probe['format']['duration']),'trimStart':round(start,6),'trimEnd':round(end,6),'gainDb':round(gain_db,3),'duration':float(final['format']['duration']),'sampleRate':48000,'channels':2,'license':'User-supplied file; license document not supplied; no license inferred from filename'}
 print(key,round(start,3),round(duration,3),round(gain_db,1))
(ROOT/'src/sfx-assets.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
(INPUT/'PREPARATION.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
