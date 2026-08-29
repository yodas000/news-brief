# الموجز اليومي — تعليمات المهمة المتكررة

Run daily at 08:00 Asia/Riyadh (05:03 UTC).

## GOAL
Produce a short Arabic news brief covering the last 24 hours and PREPEND it to
the top of `news-brief.md` in this repository, then commit and push.

## OUTPUT
File: `news-brief.md` (repo root). Prepend today's entry to the TOP.
Never overwrite or delete older entries. Separate entries with `---` on its own line.
Commit message: `brief: <YYYY-MM-DD>`. Then `git push`.
Do not touch `index.html` — the website reads the markdown at runtime.

## METHOD — fetch first, then corroborate
1. FETCH these front pages directly for dated headlines (this is the reliable
   step; keyword search does NOT respect a 24-hour window):
   - https://www.aljazeera.net/news/            (الجزيرة)
   - https://www.skynewsarabia.com/middle-east  (سكاي نيوز عربية)
   - https://www.alarabiya.net/saudi-today      (العربية)
   - https://www.arabnews.com/saudiarabia       (عرب نيوز)
   - https://aawsat.com/                        (الشرق الأوسط)
   - https://www.alarabiya.net/aswaq            (العربية - اقتصاد)
   - https://www.bbc.com/arabic                 (بي بي سي عربي)
   - https://www.aleqt.com/                     (الاقتصادية - النفط والأسواق)
2. THEN run web searches only to find a SECOND source for each candidate line.
3. Aim for 6-10 searches total. Do not combine sections into one query.

Known-unreachable, do not waste a call: `spa.gov.sa` returns 403, and
`reuters.com` is blocked. Reach both via search results instead.

## RULES
- Only events from the last 24 hours. If a section has nothing, write `لا جديد`.
- Never invent a fact, a date, or a source.
- Prefer original sources (news agencies, government statements, filings)
  over aggregators.
- 6 to 10 bullet lines total across sections 1-3. If you cannot reach 6 with
  real news, write fewer and add the shortfall note at the bottom. Never pad.

## SECTIONS (in this order)
1. `## 1. الخليج والسعودية`
2. `## 2. الشرق الأوسط والحروب`
3. `## 3. الاقتصاد والنفط`
4. `## 4. مواعيد قادمة` — future events with confirmed dates (OPEC+ meetings,
   summits, deadlines, data releases, expiring agreements). Not counted in the
   6-10 total.

## FORMAT
- Arabic, simple vocabulary. Reader is a native Arabic speaker.
- Headlines only. No paragraphs, no analysis, no commentary.
- Every line: `- <اليوم> <DD> <الشهر> — <الخبر> (<المصادر>)`
  Example: `- السبت 29 أغسطس — ... (الجزيرة، رويترز)`
- Add clock time only when the source states it.
- Every line ends with at least two sources in parentheses.
- SINGLE SOURCE: keep it, but tag it `(الجزيرة — مصدر واحد)`. Max 2 per entry.
- CLAIMS BY A PARTY TO A CONFLICT are not confirmed events. Tag them
  `(هآرتس — إعلان طرف)`. Never state them as fact.
- POLITICAL LEAN — label these inline when used, and only these:
  - RT عربي → `(RT عربي — مصدر حكومي روسي)`
  - الميادين → `(الميادين — مصدر مقرب من محور المقاومة)`
  - Democracy Now → `(Democracy Now — مصدر يساري الميل)`
  - Fox News → `(Fox News — مصدر يميني الميل)`
- Do not quote more than a few words. Paraphrase.
- Entry header: `# موجز الأخبار — <اليوم> <DD> <الشهر> <YYYY>`

## TONE
Facts over softening. No hedging, no filler, no encouragement.
No opening or closing remarks in the file.

## UNATTENDED
Nobody is present. Never ask a question. If information is missing, make the
most conservative choice and note it in one line at the bottom of the entry.
If fewer than 6 lines were found, say so explicitly in that note.

---

# الاتجاهات — SECOND OUTPUT (same run)

After finishing `news-brief.md`, also produce the trends snapshot.

## OUTPUT
File: `trends.md` (repo root). **OVERWRITE it completely each run** — do not
prepend. Trends are a snapshot, not an archive; a growing list of stale hashtags
has no value and would make the page unreadable. Include both files in the same
commit.

## KEY DIFFERENCE FROM THE BRIEF
Trends are **not** bound to the 24-hour window. A topic can trend today because
of an event from last week. That is normal and worth reporting — say when the
underlying event happened.

## SOURCES
- https://getdaytrends.com/saudi-arabia/  (volumes + how long a trend has lasted)
- https://xtrends.in/saudi-arabia/        (momentum / rapidly rising)
- https://trends.google.com/trending?geo=SA&hl=ar
Known-unreachable: `trends24.in` returns 403. Reach it via search instead.

Aggregators disagree because they sample at different times. Use at least two,
and attribute each figure to the aggregator it came from.

## SECTIONS
1. `## 1. الأكثر تداولا على منصة X — السعودية` — top items WITH post counts.
   Format: `- #الوسم — 981 منشور · استمر 20 ساعة على القائمة (getdaytrends)`
   The website draws a bar scaled to the largest count, so keep the
   `NNN منشور` wording exactly.
2. `## 2. الأسرع صعودا` — momentum risers.
   Format: `- #الوسم — تصنيف صعود 90 (xtrends)`
3. `## 3. وراء الاتجاه` — 2 to 4 items only. Explain WHY a topic is trending,
   with two news sources. This is the section with actual reporting value.
4. `## 4. أسماء متداولة في الرياضة` — grouped lists, `الأندية:` and `الأسماء:`.
   Do not assert why a player is trending unless a news source says so.

## RULES
- EXCLUDE paid or advertising hashtags (e.g. `#اعلانك_ترند`, marketplace spam).
- Never invent a post count. Quote the aggregator's number or omit the number.
- End the file with a methodology note: snapshot timing, which aggregators were
  used, whether they disagreed, and that counts were not verified against X.
- Entry header: `# اتجاهات اليوم — <اليوم> <DD> <الشهر> <YYYY>`
