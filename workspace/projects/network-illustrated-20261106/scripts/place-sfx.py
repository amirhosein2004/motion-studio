from pathlib import Path
import json,math
ROOT=Path(__file__).resolve().parents[1]
events=[]
def cue(scene,second,sound,purpose,volume=1):
 events.append({'id':f'SFX_{len(events)+1:03}','scene':scene,'second':second,'sound':sound,'purpose':purpose,'volume':volume})
# Selective transitions only: keep the voice-led lesson quiet between changes.
for scene in [1,4,6,10,12,14]:cue(scene,.1,'transition','ورود به فصل',.8)
for scene,second in [(1,3),(1,18),(2,4),(3,5),(4,13),(5,7),(5,13),(5,22),(5,30),(6,8),(8,8),(8,13),(9,3),(9,10),(9,18)]:
 cue(scene,second,'reveal','ورود دستگاه یا نقش تازه',.7)
for scene,second in [(1,7),(2,3),(2,9),(3,13),(6,13),(8,17),(8,25),(10,28),(14,6)]:
 cue(scene,second,'connect','آشکارشدن مسیر اتصال',.8)
for scene,second in [(1,12),(2,29),(3,17),(4,16),(4,24),(6,19),(7,29),(7,35),(10,12),(10,18),(11,18),(12,23),(12,30),(13,18),(13,22),(14,38)]:
 cue(scene,second,'transfer','حرکت داده یا درخواست و پاسخ',.65)
for scene,second in [(1,15),(2,31),(4,28),(6,22),(7,39),(10,20),(13,25),(14,42)]:
 cue(scene,second,'arrival','رسیدن داده به مقصد',.8)
cue(2,19,'disconnect','نمایش قطع اینترنت',.8)
cue(14,30,'enter','فشردن Enter و ارسال دستور ls',.9)
# Split/build gestures use supplied taps, not a made-up new sound asset.
for t in [8,8.16,8.32]:cue(11,t,'piece','جداشدن قطعه‌های داده',.7)
for t in [30,30.16,30.32]:cue(11,t,'piece','کنار هم قرارگرفتن قطعه‌ها',.65)
for scene,second in [(11,30.6),(12,39),(15,15),(15,25)]:
 cue(scene,second,'complete','تکمیل بازسازی یا آشکارشدن پاسخ',.65)
events.sort(key=lambda e:(e['scene'],e['second']))
data={'version':'v3-sfx-draft','status':'provisional-awaiting-human-voice','masterVolume':.85,'events':events}
(ROOT/'src/sfx-cues.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
p=ROOT/'src/Shared.tsx';s=p.read_text(encoding='utf-8')
if "import {Sfx}" not in s:s=s.replace("import {D} from './design';","import {D} from './design';\nimport {Sfx} from './Sfx';")
if '<Sfx scene={n}/>' not in s:s=s.replace('</AbsoluteFill>};','<Sfx scene={n}/></AbsoluteFill>};')
p.write_text(s,encoding='utf-8')
p=ROOT/'package.json';pkg=json.loads(p.read_text(encoding='utf-8-sig'));pkg['dependencies']['@remotion/media']='4.0.535';pkg['scripts']['prepare:sfx']='../../../installation/tools/manim/.venv/Scripts/python.exe scripts/prepare-sfx.py';p.write_text(json.dumps(pkg,indent=2),encoding='utf-8')
assets=json.loads((ROOT/'src/sfx-assets.json').read_text(encoding='utf-8'))
timeline=json.loads((ROOT/'src/timeline.json').read_text(encoding='utf-8'))
for e in events:
 scene=timeline['scenes'][e['scene']-1]
 assert e['second']*timeline['fps']+math.ceil(assets[e['sound']]['duration']*timeline['fps'])<=scene['durationInFrames'],e
timeline['version']='v3-sfx-draft'
(ROOT/'src/timeline.json').write_text(json.dumps(timeline,ensure_ascii=False,indent=2),encoding='utf-8')
sources=json.loads((ROOT/'ASSET-SOURCES.json').read_text(encoding='utf-8'))
sources['assets']=[a for a in sources['assets'] if a.get('type')!='sfx']
sources['assets'] += [dict(type='sfx',name=key,source=value['source'],original=value['preservedOriginal'],playback=value['file'],sha256=value['sha256'],license=value['license'],processing={'trimStart':value['trimStart'],'trimEnd':value['trimEnd'],'gainDb':value['gainDb']}) for key,value in assets.items()]
(ROOT/'ASSET-SOURCES.json').write_text(json.dumps(sources,ensure_ascii=False,indent=2),encoding='utf-8')
p=ROOT/'src/assets.json';a=json.loads(p.read_text(encoding='utf-8'));a['sfx']=[v['file'] for v in assets.values()];p.write_text(json.dumps(a,ensure_ascii=False,indent=2),encoding='utf-8')
lines=['<div dir="rtl" style="text-align: right">','<h1>جایگذاری افکت‌ها — نسخهٔ ۳</h1>',f'<p>۹ فایل اصلی، {len(events)} رویداد صوتی گزینشی. زمان‌ها موقت و نسبت به ابتدای هر سکانس‌اند؛ بعد از ضبط انسانی تغییر می‌کنند. gain هر فایل و برش‌ها در <bdi dir="ltr">src/sfx-assets.json</bdi> ثبت شده‌اند؛ ضریب کلی ۰٫۸۵ است.</p>','<p>ورودی‌ها در پوشهٔ assets پروژه محفوظ‌اند. نسخه‌های پخش WAV با نرخ 48kHz و دو کانال‌اند. تنها سکوت کناری، بلندی و محوشدن چند میلی‌ثانیه‌ای ویرایش شده‌اند؛ سرعت تغییر نکرده. مجوز فایل‌ها از نامشان استنباط نشده و سند مجوز همراه فایل‌های محلی دریافت نشده است.</p>','<p>فایل Enter برای ارسال دستور در ثانیهٔ ۳۰ سکانس ۱۴ است؛ به‌عنوان صدای تایپ یک جمله استفاده نشده. tapها برای تقسیم و بازسازی داده استفاده می‌شوند. افکت دیجیتال برای هر بستهٔ کوچک تکرار نمی‌شود تا بخش‌های پرتراکم شلوغ نشوند.</p>']
for i in range(1,16):
 lines.append(f'<h2>S{i:02}</h2>')
 for e in events:
  if e['scene']==i:lines.append(f'<p>{e["second"]} ثانیه — {e["purpose"]} — <bdi dir="ltr">{e["sound"]}.wav</bdi></p>')
lines+=['<p>بررسی فنی فایل و پخش مرورگر جای تأیید شنیداریِ کیفیت و میکس با صدای گوینده نیست. گویندگی هنوز دریافت نشده. هیچ خروجی ویدیویی ساخته نشده است.</p>','</div>']
(ROOT/'docs/SFX.md').write_text('\n'.join(lines),encoding='utf-8')
p=ROOT/'docs/REVIEW.md';s=p.read_text(encoding='utf-8');s=s.replace('</div>','<h2>نسخهٔ ۳ — افکت‌های کاربر</h2><p>به درخواست صریح کاربر، ۹ افکت محلی با زمان‌بندی فریم‌محور اضافه شد. این نسخه دارای SFX است و گویندگی ندارد؛ پیش‌نمایش کامل صوتی‌تصویری درس محسوب نمی‌شود. تأیید رندر دریافت نشده است.</p></div>');p.write_text(s,encoding='utf-8')
p=ROOT/'README.md';s=p.read_text(encoding='utf-8');s=s.replace('visual draft v2','visual draft v3 with supplied SFX').replace('This is a silent visual rehearsal draft','This is a visual rehearsal draft with user-supplied SFX');s+='\nSFX: 9 preserved MP3 originals, prepared quiet WAV playback files, and 66 selective frame-based events. See docs/SFX.md, src/sfx-cues.json and src/sfx-assets.json. Reprepare audio with `npm run prepare:sfx`; this does not alter the originals. No new packages were installed; @remotion/media uses the existing linked installation.\n';s=s.replace('66 selective',f'{len(events)} selective');p.write_text(s,encoding='utf-8')
print(f'{len(events)} SFX events from {len(assets)} preserved files')
