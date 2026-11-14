from pathlib import Path
import re,json
r=Path(__file__).resolve().parents[1]
def rtl(title,paras):
 return '<div dir="rtl" style="text-align: right">\n<h1>'+title+'</h1>\n'+''.join('<p>'+x+'</p>\n' for x in paras)+'</div>\n'
changes={
'درخواست از این مسیر به سرور سایت می‌رسه و پاسخ برمی‌گرده.':'سرور یعنی کامپیوتری که به دستگاه‌های دیگه خدمات می‌ده؛ اینجا سرور، محتوای سایت رو می‌فرسته. درخواست از مسیر شبکه‌ها بهش می‌رسه و پاسخ برمی‌گرده.',
'نگاشت آدرس و معمولاً پورت کمک می‌کنه':'ثبت ارتباط‌های خروجی و نگاشت آدرس‌ها کمک می‌کنه',
'رابط: اسم پورت اومد؛ این شماره دقیقاً چه چیزی رو انتخاب می‌کنه؟':'رابط: حالا که دستگاه مقصد مشخصه، ارتباط باید به کدوم برنامه روی اون دستگاه برسه؟',
'وقتی مسیر اینترنت قرمز می‌شه':'وقتی مسیر اینترنت روشن و قطع‌شدنش مشخص می‌شه',
'به نقطهٔ دسترسی وصل می‌شه.':'به بخش بی‌سیم دستگاه خانگی وصل می‌شه؛ این بخش همون نقطهٔ دسترسیه.',
}
for rel in ['narration/RECORDING-SCRIPT.md','docs/STORYBOARD.md','src/timeline.json']:
 p=r/rel;s=p.read_text(encoding='utf-8')
 for a,b in changes.items():s=s.replace(a,b)
 p.write_text(s,encoding='utf-8')
# Isolate numeric addresses in prose, preserving explicit RTL paragraph direction.
p=r/'narration/RECORDING-SCRIPT.md';s=p.read_text(encoding='utf-8')
s=re.sub(r'(?<![\w>])(192\.168\.1\.\d+)',r'<bdi dir="ltr">\1</bdi>',s)
s=s.replace('مسیر 22 رو برای <bdi dir="ltr">SSH</bdi> و 443 رو برای <bdi dir="ltr">HTTPS</bdi> روشن کن؛', 'دو کاربرد رو کوتاه معرفی کن: <bdi dir="ltr">SSH</bdi> برای دسترسی امن به دستگاه دیگه و <bdi dir="ltr">HTTPS</bdi> برای ارتباط امن وب. بعد مسیر 22 و 443 رو نشون بده؛')
s=s.replace('تنظیمات روتر، فایروال و گاهی', 'تنظیمات روتر، فایروال یعنی بخش کنترل ترافیک مجاز، و گاهی')
p.write_text(s,encoding='utf-8')
(r/'docs/BRIEF.md').write_text(rtl('بریف نسخهٔ تصویری ۲ — شکل‌های اختصاصی',[
'موضوع: شبکه از خانه تا SSH؛ مخاطب برنامه‌نویس، انتشار یوتیوب، استفادهٔ آموزشی غیرتجاری. قاب 1920×1080، نرخ ۳۰ فریم. پانزده سکانس با مدت تمرینی ۹:۵۴؛ مدت نهایی تابع ضبط واقعی است.',
'فیلد نام پروژه: ', 'فیلد رنگ و سبک بصری: ', 'فیلد لینک مرجع: ',
'خواستهٔ تکمیلی: درنظرگرفتن قالب عکس پیوست برای ساخت شکل‌ها. تصویر در چت مشاهده شد: زمینهٔ نارنجی بافت‌دار، تیترهای زرد، شکل‌های چندسطحی خاکستری، دورگیری تیره و سایهٔ افتاده. این زبان بصری برای دستگاه‌های شبکه بازطراحی شد؛ عناصر هالووین وارد درس نشدند. اصل تصویر به‌صورت فایل محلی در پوشهٔ پیوست موجود نبود؛ هیچ پیکسل یا دارایی آن کپی نشده است.',
'گوشی، لپ‌تاپ، روتر، سرور، پرینتر و ابر شبکه در src/scenes/Device.tsx با SVG اختصاصی ساخته شده‌اند. بافت کاغذ، شکست‌ها و لکه‌های ریز با SVG قطعی ساخته شده‌اند. رنگ‌ها و حرکت در design.ts متمرکزند. شکل‌ها دوبعدی‌اند.',
'مثال ثابت: گوشی 192.168.1.5، لپ‌تاپ 192.168.1.8 و روتر 192.168.1.1؛ آدرس‌های نمونهٔ خصوصی IPv4. ترتیب آموزش و کد سکانس‌ها از پروژهٔ موجود با همین موضوع به نسخهٔ مستقل منتقل و اصلاح شده؛ پروژهٔ قبلی دست‌نخورده مانده است.',
'منبع صدا ضبط انسانی کاربر است و هنوز دریافت نشده. این نسخه پیش‌نویس تصویری است؛ زمان‌ها برای تمرین‌اند. راهنمای توضیح‌دادن در narration/RECORDING-SCRIPT.md است. هم‌ترازی واقعی پس از دریافت فایل‌های VO انجام می‌شود.'
]),encoding='utf-8')
(r/'docs/REVIEW.md').write_text(rtl('بازبینی نسخهٔ تصویری ۲',[
'نسخه: v2-illustrated، ۲۰۲۶/۱۱/۰۶. پیش‌نویس تعاملی ۱۵ سکانس، ۹:۵۴ موقت، 1920×1080، 30fps. نشانی: http://localhost:3118/NetworkFoundations',
'برای بررسی شکل‌ها، ترتیب آموزش و راهنمای گفتن آماده است. ضبط انسانی هنوز دریافت نشده؛ این نسخه پیش‌نمایش کامل صوتی‌تصویری نیست.',
'تأیید این نسخه دریافت نشده؛ هیچ خروجی ویدیویی تولید نشده است. پس از دریافت و هم‌ترازی صدا، نسخهٔ کامل برای بازبینی ارائه می‌شود. رندر فقط پس از تأیید صریح همان نسخه و درخواست رندر انجام می‌شود.'
]),encoding='utf-8')
(r/'docs/NARRATIVE-REVIEW.md').write_text(rtl('بازبینی پیوستگی آموزش نسخهٔ ۲',[
'کل راهنمای پانزده بخش مرور شد. مثال انتقال عکس نخ شروع است؛ همان دستگاه‌ها در آدرس‌دهی و مسیر وب و SSH برمی‌گردند. پایان نقش مسیر، آدرس، پورت و پروتکل را با دو پرسش و پاسخ مرور می‌کند.',
'اصلاح واقعی: تعریف سرور هنگام اولین ورود سرور سایت اضافه شد؛ نقطهٔ دسترسی در بخش اتصال به‌عنوان بخش بی‌سیم دستگاه خانگی توضیح داده شد.',
'اصلاح واقعی: اشارهٔ زودهنگام به پورت از راهنمای NAT حذف شد؛ پل بخش بعد به انتخاب برنامه روی دستگاه مقصد تغییر کرد. سرویس پیش از شمارهٔ پورت تعریف می‌شود. SSH و HTTPS هنگام اولین مثال پورت با کاربردشان معرفی شدند؛ فایروال هم توضیح کوتاه دارد.',
'دقت فنی: Wi-Fi از اینترنت جداست؛ چاپ و اشتراک فایل شرط تنظیمات و مجوز دارند. NAT برای نمونهٔ رایج IPv4 شرح داده شده و به IPv6 تعمیم داده نمی‌شود. DNS محتوای صفحه را نمی‌فرستد. پورت با جای کابل فرق دارد. بسته‌ها قطعات داده‌اند، نه بریده‌های قابل‌مشاهدهٔ عکس.',
'اجرای دستور SSH روی سرور و بازگشت نتیجه جدا نمایش داده می‌شود؛ کلید خصوصی روی لپ‌تاپ می‌ماند. بررسی هویت سرور و کاربر دو نقش جدا هستند.',
'زمان‌های cue پیش‌نویس‌اند و الزام سرعت گوینده نیستند. بازبینی تلفظ، تداوم واقعی گفتار و هم‌ترازی شنیداری تا دریافت صدا انجام‌پذیر نیست.'
]),encoding='utf-8')
(r/'README.md').write_text('''# Network illustrated — visual draft v2

Independent 15-scene Remotion lesson. 1920×1080, 30fps; provisional duration 9:54.
Original layered SVG devices, orange paper texture, yellow titles and cast shadows, inspired by the supplied chat reference. Previous projects are preserved.

```powershell
cd workspace/projects/network-illustrated-20261106
npm start
npm run check
node scripts/qa-stills.mjs --frames=15 --beats
```

Preview: http://localhost:3118/NetworkFoundations . Use Play, Pause and timeline seeking. Individual scenes S01–S15 are in the Scenes folder. Start is bound to 127.0.0.1 by the existing launcher.

Read narration/RECORDING-SCRIPT.md alongside the preview. All VO recordings are pending. This is a silent visual rehearsal draft, not a complete audiovisual preview. Timings in src/timeline.json and scene cues are provisional; adjust to natural recorded delivery later. No synthetic voice or placeholder silence has been created.

QA PNGs: workspace/renders/network-illustrated-20261106/qa/ . No video was generated. Final export requires approval of the complete audiovisual version and an explicit render request.

Dependencies use a junction to installation/tools/remotion/node_modules. No installed tools or packages were modified. src/scenes/Device.tsx holds the original SVG drawings; src/design.ts holds design tokens. restyle.py and update-docs.py record one-time migration operations and must not be rerun over edited files.

Original pasted request: workspace/assets/network-illustrated-20261106/USER-REQUEST.txt . The reference image was visible in chat but no local image file was available; it was not imported as an asset. Future original recordings belong in workspace/assets/network-illustrated-20261106/ and playback copies in public/audio/.
''',encoding='utf-8')
