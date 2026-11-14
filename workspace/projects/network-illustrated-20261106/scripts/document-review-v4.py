from pathlib import Path
import json
r=Path(__file__).resolve().parents[1]
q=r.parents[1]/'renders'/r.name/'qa-v4'
coverage=json.loads((q/'motion-sfx-coverage.json').read_text(encoding='utf-8'))
count=coverage['eventCount']
p=r/'README.md';s=p.read_text(encoding='utf-8').replace('visual draft v3 with supplied SFX','visual draft v4 — reviewed layout and SFX').replace('66 selective frame-based events',f'{count} frame-based events');s+='''
Version 4 review: docs/REVIEW-V4.md. Typography, panel spacing, packet labels and paths were corrected. Updated cue coverage is generated from the actual TSX syntax tree, including mapped arrays. Simultaneous visual changes share a cue; static reading holds stay silent.

```powershell
npm run audit:sfx
npm run check
npm run qa:review
```

Review artifacts: workspace/renders/network-illustrated-20261106/qa-v4/ . The browser layout audit sampled 181 positions across all 15 scenes; see layout-audit.json. Final render approval is still pending. Do not rerun the one-time place-sfx.py migration over the reviewed cue sheet; use audit:sfx instead.
''';p.write_text(s,encoding='utf-8')
p=r/'docs/REVIEW.md';s=p.read_text(encoding='utf-8');s=s.replace('</div>','<h2>نسخهٔ ۴ — بازبینی تصویر و تکمیل افکت‌ها</h2><p>به درخواست کاربر، جاافتادگی صدا و چیدمان بررسی و اصلاح شد. گزارش تفصیلی در REVIEW-V4.md است. ۱۵ سکانس و ۱۸۱ موقعیت زمانی از نظر متن و تداخل بررسی شدند. این نسخه برای بازبینی تازه آماده است؛ هنوز تأیید رندر ندارد.</p></div>');p.write_text(s,encoding='utf-8')
p=r/'docs/QA.md';s=p.read_text(encoding='utf-8');s=s.replace('</div>','<h2>بازبینی تازهٔ نسخهٔ ۴</h2><p>نتایج پیشین مربوط به نسخه‌های قبلی‌اند. وضعیت جاری و اصلاحات واقعی در REVIEW-V4.md و گزارش‌های qa-v4 ثبت شده‌اند. بررسی TypeScript، ۴۵ PNG یکتا و اندازه‌گیری ۱۸۱ موقعیت زمانی انجام شد؛ تعداد cue فعلی ۱۶۲ است.</p></div>');p.write_text(s,encoding='utf-8')
p=r/'docs/SFX.md';s=p.read_text(encoding='utf-8');note=f'<h1>وضعیت جاری نسخهٔ ۴</h1><p>فهرست زیر آرشیو نسخهٔ ۳ با ۶۶ cue است. تعداد جاری {count} cue است؛ فهرست دقیق و منبع هر رویداد در src/sfx-cues.json و گزارش qa-v4/motion-sfx-coverage.json قرار دارد. فرمان بازتولید: npm run audit:sfx.</p>'
s=s.replace('<h1>جایگذاری افکت‌ها — نسخهٔ ۳</h1>',note+'<h1>آرشیو جایگذاری افکت‌ها — نسخهٔ ۳</h1>');p.write_text(s,encoding='utf-8')
p=r/'docs/STORYBOARD.md';s=p.read_text(encoding='utf-8');s=s.replace('</div>','<h2>اصلاح مسیرها در نسخهٔ ۴</h2><p>در S04 درخواست و پاسخ بین شبکه‌های میانی مرحله‌به‌مرحله جلو می‌روند؛ در S06 انتقال در دو طرف روتر جدا نمایش داده می‌شود. در S07 برگشت از مسیر بالایی به گوشی می‌رسد. در S12 مسیر درخواست در بالا و پاسخ در پایین شکل‌ها قرار دارد؛ دو انتهای HTTPS همچنان مرورگر و سایت‌اند و شاخهٔ اتصال شبکه‌های میانی حفظ شده است.</p><p>در S02 قطع اینترنت با شکست مسیر و ضربدر نشان داده می‌شود؛ مسیر چاپ محلی باقی است. در S14 ماندن کلید خصوصی و نتیجهٔ سرور در کادرهای مستقل پایین دیده می‌شوند. زمان‌ها همچنان پیش‌نویس‌اند و پس از ضبط واقعی بازتنظیم می‌شوند.</p></div>');p.write_text(s,encoding='utf-8')
print('Version 4 review documentation updated')
