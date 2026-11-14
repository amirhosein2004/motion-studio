<div dir="rtl" style="text-align:right">
<h1>محل نگهداری ابزارهای صدا</h1>
<p>وضعیت به‌روزشده در ۱۲ نوامبر ۲۰۲۶. طبق درخواست جدید و صریح کاربر، کتابخانه‌های پروژه‌ای <bdi dir="ltr">PyTorch / Transformers</bdi> و مدل فارسی <bdi dir="ltr">Wav2Vec2</bdi> حذف شدند. درخواست قبلیِ حفظ این سه مورد با دستور جدید جایگزین شده است. دوباره نصب یا دانلود نشوند، مگر کاربر صریحاً بخواهد. این فایل فقط وضعیت ابزارها را ثبت می‌کند.</p>

<h2>کتابخانه‌های مخصوص پروژهٔ پایتون و بایت‌کد</h2>
<p>ریشهٔ محیط: <bdi dir="ltr">C:\Users\Asus\Desktop\PYTHON\Motion Graphic</bdi></p>
<table>
<tr><th>مورد</th><th>محل نسبت به ریشهٔ محیط</th><th>وضعیت</th></tr>
<tr><td><bdi dir="ltr">PyTorch 2.6.0+cpu</bdi></td><td>مسیر سابق: <bdi dir="ltr">workspace/projects/python-bytecode-20261111/.python-packages/torch/</bdi></td><td>حذف شد؛ پوشه‌های همراه <bdi dir="ltr">torchgen / functorch</bdi>، اطلاعات نصب و اجراگرهای مربوط هم حذف شدند</td></tr>
<tr><td><bdi dir="ltr">Transformers 4.57.1</bdi></td><td>مسیر سابق: <bdi dir="ltr">workspace/projects/python-bytecode-20261111/.python-packages/transformers/</bdi></td><td>حذف شد؛ اطلاعات نصب هم حذف شد</td></tr>
<tr><td>سایر وابستگی‌ها، از جمله <bdi dir="ltr">tokenizers / numpy / huggingface_hub</bdi></td><td><bdi dir="ltr">workspace/projects/python-bytecode-20261111/.python-packages/</bdi></td><td>خارج از سه مورد درخواستی بودند و حذف نشدند</td></tr>
</table>
<p>این نصب‌ها مخصوص پروژه بودند و حذفشان محیط مشترک پایتون را تغییر نداده است. اسکریپت قدیمیِ تشخیص گفتار و فایل دستور نصب مخصوص همین مسیر هم حذف شدند تا فرمان بازنصبِ منسوخ باقی نماند. رونوشت‌ها و زمان‌های استخراج‌شدهٔ قبلی برای استفاده و سابقهٔ پروژه محفوظ‌اند.</p>

<h2>مدل فارسیِ حذف‌شده</h2>
<p>مدل <bdi dir="ltr">jonatasgrosman/wav2vec2-large-xlsr-53-persian</bdi> از مسیر سابق زیر حذف شد:</p>
<pre dir="ltr" style="text-align:left">installation/tools/alignment-models/models--jonatasgrosman--wav2vec2-large-xlsr-53-persian/</pre>
<p>وزن کامل حدود ۱٫۲۶ گیگابایتی، فایل‌های ناقص همان مدل، تنظیمات، پیوندها و قفل‌های مختص همان مدل حذف شدند. مدل منبع مشترک همین پوشهٔ کاری بود؛ هیچ مسیر خارج از محیط کاری حذف نشد.</p>

<h2>مفسر و محیط مشترک</h2>
<p>اسکریپت‌های آماده‌سازی همچنان با مفسر <bdi dir="ltr">installation/tools/manim/.venv/Scripts/python.exe</bdi> اجرا می‌شوند. در این محیط مشترک هم کتابخانه‌های <bdi dir="ltr">torch</bdi> و <bdi dir="ltr">transformers</bdi> نصب نیستند. مفسر پایتون و ابزارهای آماده‌سازی صدا حفظ شده‌اند.</p>
<p>بستهٔ تولید گفتار <bdi dir="ltr">edge-tts</bdi> از قبل در <bdi dir="ltr">installation/tools/manim/.venv/Lib/site-packages/edge_tts/</bdi> موجود است. برای موشنِ صدای خود کاربر استفاده نشده و حفظ می‌شود.</p>
<p>در محل‌های بررسی‌شدهٔ نصب معمول <bdi dir="ltr">Python312</bdi> و بسته‌های کاربری پایتون، نصب دیگری از این ابزارهای تشخیص گفتار پیدا نشد. این بررسی، ادعای جست‌وجوی تمام محیط‌های احتمالیِ برنامه‌های دیگر در رایانه نیست.</p>

<h2>ابزارهای صرفاً معرفی‌شده</h2>
<p><bdi dir="ltr">WhisperX</bdi> و <bdi dir="ltr">faster-whisper</bdi> در کتابخانه‌های همین پروژه یا محیط مشترک پایتون نصب نشده‌اند. معرفی آن‌ها در گفتگو به معنی نصب نیست. هیچ مدل یا ابزار جایگزینی بدون درخواست صریح نصب یا دانلود نشود.</p>

<h2>زمان استفاده</h2>
<p>روال فعلی، دریافت ویس اصلی و متن زمان‌دار کاربر، مانند SRT است. از بازه‌های معتبر و زمان‌های ذخیره‌شده استفاده شود. اگر دقت کلمه‌ایِ لازم در ورودی نیست، محدودیت دقیق اعلام شود؛ زمان حدسی تولید یا مدل حذف‌شده خودکار نصب نشود. پخش موشن، فایل‌های صوتی و زمان‌بندی موجود به این مدل‌ها وابسته نیستند و حفظ شده‌اند.</p>
</div>
