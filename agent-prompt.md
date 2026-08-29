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
   - https://ajel.sa/local                      (عاجل — أخبار محلية سعودية مؤرخة)
   - https://www.arabnews.com/saudiarabia       (عرب نيوز)
   - https://aawsat.com/                        (الشرق الأوسط)
   - https://www.argaam.com/                    (أرقام - أسواق واقتصاد سعودي)
   - https://www.bbc.com/arabic                 (بي بي سي عربي)
   - https://www.aleqt.com/                     (الاقتصادية - النفط والأسواق)
2. THEN run web searches only to find a SECOND source for each candidate line.
3. Aim for 6-10 searches total. Do not combine sections into one query.

Known-unreachable, do not waste a call: `spa.gov.sa`, `alarabiya.net` and
`reuters.com` all refuse fetches (403 or blocked) — reach them via search
results instead. `alarabiya.net` returns 403 from the site itself, so no
network allowlist entry will fix it; do not retry it.

## RULES
- Only events from the last 24 hours. If a section has nothing, write `لا جديد`.
- Never invent a fact, a date, or a source.
- Prefer original sources (news agencies, government statements, filings)
  over aggregators.
- 6 to 10 bullet lines total across sections 1-3. If you cannot reach 6 with
  real news, write fewer and add the shortfall note at the bottom. Never pad.
- **NO SPORTS.** Zero interest. Not results, not transfers, not as filler when
  news is thin. If a sports story is the only thing left, write fewer lines.
- **NO WEATHER.** No forecasts, no rain reports.
- Do not let the brief drift longer over time. Short enough to finish every
  morning beats comprehensive. This is a reading habit, not an archive.

### Disagreement between sources is REPORTED, not resolved
The reader's stated method is to compare sources and watch where they differ.
So when two sources conflict on a fact — a casualty count, who did what, a
number, a date — do NOT quietly pick the more plausible one, and do NOT blur
them into a vague sentence that is true of neither. Give both versions and
attribute each:

`- السبت 29 أغسطس — ... (رويترز: 12 قتيلا / الجزيرة: 17 قتيلا — المصدران متعارضان)`

Two aggregators reprinting the same agency copy are ONE source, not two.
That is false corroboration; do not count it as a second source.

## SECTIONS (in this order)
1. `## 1. الخليج والسعودية`
2. `## 2. الشرق الأوسط والحروب`
3. `## 3. الاقتصاد والنفط`
4. `## 4. مواعيد قادمة` — future events with confirmed dates (OPEC+ meetings,
   summits, deadlines, data releases, expiring agreements). Not counted in the
   6-10 total.
5. `## 5. قراءة اليوم` — EXACTLY ONE item, 3 to 5 sentences. Not counted in
   the 6-10 total. This is the only place in the file that is prose.

### About `قراءة اليوم`
The reader consumes by listening and is deliberately building a reading habit.
Sections 1-4 are for scanning; this one item is meant to actually be read. So
it must be worth the minute it costs.

- Draw it from his interests: **film, television, anime, music, philosophy** —
  or give a real news story from today the context a headline cannot carry.
- It must be about something REAL and sourced: a release, a death, an
  anniversary, a restoration, a published essay, a court ruling. Two sources,
  same as everything else.
- **Report, do not opine.** Give facts a headline had no room for. This is not
  a review, an essay, or your take.
- Tone: unsentimental and clear-eyed. He leans nihilist/realist in his
  philosophical taste. No uplift, no moral, no "reminds us that…" ending.
- If nothing real and worth reading exists today, write `لا جديد` and move on.
  A skipped day is better than a manufactured one.

## FORMAT
- Arabic, simple vocabulary. Reader is a native Arabic speaker.
- Headlines only in sections 1-4. No paragraphs, no analysis, no commentary.
  Section 5 is the sole exception.
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

Do not fetch these, they cannot work:
- `trends.google.com` renders its trend list with JavaScript, so a fetch
  returns only the page shell with no data. Verified, not assumed.
- `trends24.in` returns 403.

If BOTH aggregators above are unreachable in a given run, do not substitute
search results for them: search returns the same archived snapshot every time
(a giveaway is a stale marker such as a Ramadan date appearing in August).
Write `تعذّر رصد` for sections 1 and 2 and still deliver section 3, which is
sourced from news rather than aggregators.

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
