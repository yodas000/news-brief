# الموجز اليومي — the only reference for this project

**One file. There is no second document.** `README.md` and `agent-prompt.md` were
folded into this one on 2026-09-13, because the same facts written in two places
drift apart and the one that gets read is whichever was opened first.

---

## STATUS — read this before assuming anything runs

**The routine runs, daily, and has not missed a day.** Briefs exist through
2026-09-12, each pushed around 05:12 UTC — the 08:00 Asia/Riyadh schedule, on
time. If a local clone looks stale, it is the clone: `git fetch` before
concluding anything about whether this project is alive. That mistake was made
on 2026-09-13 and very nearly deleted a working project's documentation on the
strength of it.

**The scheduled task's own prompt is a second spec, and it disagrees with this
repo.** The archive notes record the agent flagging this on at least three runs
(1, 2 and 4 September) and nobody acting on it: the scheduled task text still
instructs it to produce a file called `trends.md` and a page `trends.html`, which
have not existed since the trends page was replaced. Each run correctly followed
the repo spec instead and said so in its note — *"يلزم تحديث نص المهمة المجدولة
نفسها (لا الملف)"*, the scheduled task text needs updating, not the file — and
each time it recurred.

**The routine's prompt needs editing, and it is the one thing here an agent
cannot reach.** It should say exactly one thing: read `CLAUDE.md` in this repo
and follow it. No file names, no section lists, no rules restated in the task
text. Anything a routine prompt repeats becomes a second source that drifts,
which is precisely what happened. As it stands it names `trends.md` and
`trends.html`, which never existed here, and `agent-prompt.md`, which was
deleted on 2026-09-13 — so tomorrow's run will be told to read a file that is
gone. **Fix the routine text before the next run.**

**The jobs and training board was removed on 2026-09-13.** `opportunities.md`,
`opportunities.html` and `check-links.sh` are gone, with the board's CSS and its
half of `app.js`. Its one rule was that an application link must be fetched and
confirmed before being written — and every Saudi job and training domain it
needed (`doroob.sa`, `hrdf.org.sa`, `taqat.sa`, `sans.com.sa`, `saudipaths.com`
and fourteen more) is blocked at the proxy from the run environment. Every item
degraded to a plain-text route, and the link checker passed by having nothing
left to check. **A board of unverifiable deadlines is worse than no board: it
looks checked.** Do not re-add it unless link verification actually works.

---

## GOAL

One output: `news-brief.md` — today's Arabic news brief, PREPENDED to the top.
Never overwrite or delete older entries. Separate entries with `---` on its own
line.

Do not touch `index.html`, `style.css` or `app.js`. The page reads the markdown
at runtime, so new content appears without the HTML being edited.

Commit message: `brief: <YYYY-MM-DD>`, then `git push`.

## METHOD — fetch first, then corroborate

1. FETCH these front pages directly for dated headlines. This is the reliable
   step; keyword search does NOT respect a 24-hour window.
   - https://www.aljazeera.net/news/            (الجزيرة)
   - https://www.skynewsarabia.com/middle-east  (سكاي نيوز عربية)
   - https://ajel.sa/local                      (عاجل — أخبار محلية سعودية مؤرخة)
   - https://www.arabnews.com/saudiarabia       (عرب نيوز)
   - https://aawsat.com/                        (الشرق الأوسط)
   - https://www.argaam.com/                    (أرقام — أسواق واقتصاد سعودي)
   - https://www.bbc.com/arabic                 (بي بي سي عربي)
   - https://www.aleqt.com/                     (الاقتصادية — النفط والأسواق)
2. THEN run web searches only to find a SECOND source for each candidate line.
3. Aim for 6-10 searches total. Do not combine sections into one query.

Known-unreachable, do not waste a call: `spa.gov.sa`, `alarabiya.net` and
`reuters.com` all refuse fetches (403 or blocked) — reach them via search results
instead. `alarabiya.net` returns 403 from the site itself, so no network
allowlist entry will fix it; do not retry it.

## RULES

- Only events from the last 24 hours, except where a section says otherwise.
  If a section has nothing, write `لا جديد`.
- Never invent a fact, a date, or a source.
- Prefer original sources (news agencies, government statements, filings) over
  aggregators.
- **6 to 9 bullet lines total across sections 1-3.** If you cannot reach 6 with
  real news, write fewer and add the shortfall note at the bottom. Never pad.
- **NO SPORTS.** Zero interest. Not results, not transfers, not as filler when
  news is thin. If a sports story is the only thing left, write fewer lines.
- **NO WEATHER.** No forecasts, no rain reports.
- Do not let the brief drift longer over time. Short enough to finish every
  morning beats comprehensive. This is a reading habit, not an archive.

### Disagreement between sources is REPORTED, not resolved

The reader's stated method is to compare sources and watch where they differ. So
when two sources conflict on a fact — a casualty count, who did what, a number, a
date — do NOT quietly pick the more plausible one, and do NOT blur them into a
vague sentence that is true of neither. Give both versions and attribute each:

`- السبت 29 أغسطس — ... (رويترز: 12 قتيلا / الجزيرة: 17 قتيلا — المصدران متعارضان)`

Two aggregators reprinting the same agency copy are ONE source, not two. That is
false corroboration; do not count it as a second source.

## SECTIONS (in this order)

1. `## 1. الخليج والسعودية`
2. `## 2. الشرق الأوسط والحروب`
3. `## 3. الاقتصاد والنفط`
4. `## 4. الذكاء الاصطناعي والتقنية` — dedicated rules below. Not counted in the 6-9.
5. `## 5. الجوف وسكاكا — عاجل` — urgent local news ONLY. Not counted in the 6-9.
6. `## 6. ثقافة` — dedicated rules below. Not counted in the 6-9.
7. `## 7. مواعيد قادمة` — future events with confirmed dates (OPEC+ meetings,
   summits, deadlines, data releases, expiring agreements). Not counted in the 6-9.
8. `## 8. قراءة اليوم` — EXACTLY ONE item, 3 to 5 sentences. Not counted in the
   6-9. This is the only place in the file that is prose.

### About `الذكاء الاصطناعي والتقنية`

Added 2026-09-13, his request: AI news and large technology news.

- **0 to 3 lines.** Never more. If nothing real happened, write `لا جديد`.
  This sector produces announcements daily and almost none of them are events.
- **What he actually cares about, in this order — it is not the technology for
  its own sake:**
  1. **Jobs.** Layoffs attributed to automation, hiring freezes, roles being
     cut or created, union and regulatory responses, studies with real numbers.
  2. **The bubble.** Funding rounds, valuations, capital spending on data
     centres, write-downs, an earnings miss at a company the story depends on,
     anyone reputable saying the money does not add up.
  3. Everything else: a model release that changes what is possible, a major
     acquisition, regulation that has actually passed, a large breach or
     outage, chip supply and export controls.
- **Not events, do not write them:** a product announcement that is marketing,
  a benchmark score, a demo, a partnership with no money named, a rumour, a
  roadmap, a prediction, an executive's opinion about the future. "Company X
  says AI will…" is not news.
- **Never write a number you did not read in a source.** Valuations and layoff
  counts are the most-repeated wrong numbers in this sector, and a figure
  recalled from memory is a fabrication like any other.
- Two sources, same as everything else. **English-language sources are fine
  here** — Arabic technology coverage is thin and often a translation of the
  same wire copy. The line itself stays in Arabic. Watch for false
  corroboration especially hard in this sector: five sites reprinting one press
  release is one source.
- No hype and no alarm. State what happened, who reported it, and stop.

### About `الجوف وسكاكا — عاجل`

The reader lives in Sakaka, Al-Jouf. Only things that actually affect residents:
emergencies, service disruptions, major incidents, official announcements with
real consequences. NOT municipal press releases, NOT routine events, NOT weather.
Most days there will be none. Write `لا جديد` and move on.

Hiring and training notices do not go here and no longer go anywhere — the board
that held them was removed.

### About `ثقافة`

Film, television, anime, music. These are real standing interests, not filler.

- **0 to 2 lines.** Never more. If nothing real happened, write `لا جديد`.
- **48-hour window, not 24.** Arabic culture desks publish thinly and a strict 24
  hours would leave this empty most days. Every line still carries its own date,
  so nothing is presented as newer than it is.
- Report events, not opinions: a release or release date, a death, a festival
  award or jury decision, a restoration, a cancellation, a confirmed adaptation,
  an album or single release, a rights or copyright ruling, a production shutdown.
- **Never a review, a rating, a ranking, or a "best of" list.** No box-office
  tables. No recommendations.
- Two sources, same as everything else. **English-language sources are fine
  here** — Arabic coverage of anime and international film is thin, and a real
  second source in English beats a fake one in Arabic. The line stays in Arabic.
- No sports. The rule holds here too; entertainment coverage of athletes is
  still sports.

### About `قراءة اليوم`

The reader consumes by listening and is deliberately building a reading habit.
Sections 1-7 are for scanning; this one item is meant to actually be read. So it
must be worth the minute it costs.

- Draw it from his interests: **film, television, anime, music, philosophy** — or
  give a real news story from today the context a headline cannot carry.
- Do not simply restate the `ثقافة` or `الذكاء الاصطناعي` line in longer form. If
  the day's best reading item is cultural or technological, put it here and drop
  it from that section.
- It must be about something REAL and sourced: a release, a death, an
  anniversary, a restoration, a published essay, a court ruling. Two sources.
- **Report, do not opine.** Give facts a headline had no room for. This is not a
  review, an essay, or your take.
- Tone: unsentimental and clear-eyed. His philosophical taste is **philosophical
  pessimism / realism** (التشاؤم الفلسفي) — Schopenhauer, Cioran, Zapffe,
  Ligotti, with absurdism at its edge. No uplift, no moral, no "reminds us
  that…" ending. State what happened and stop.
- If nothing real and worth reading exists today, write `لا جديد` and move on. A
  skipped day is better than a manufactured one.

## FORMAT

- Arabic, simple vocabulary. The reader is a native Arabic speaker.
- Headlines only in sections 1-7. No paragraphs, no analysis, no commentary.
  Section 8 (`قراءة اليوم`) is the sole exception.
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

Facts over softening. No hedging, no filler, no encouragement. No opening or
closing remarks in the file.

## UNATTENDED

Nobody is present. Never ask a question. If information is missing, make the most
conservative choice and note it in one line at the bottom of the entry. If fewer
than 6 lines were found, say so explicitly in that note.

---

## The page

| File | |
|---|---|
| `news-brief.md` | The archive. Newest entry on top, older entries kept forever. The only file a run edits. |
| `index.html` | The page. Fetches `news-brief.md` at runtime. |
| `style.css` / `app.js` | Look and renderer. |

- **Reading it:** GitHub Pages from the `main` branch root. Locally,
  `python3 -m http.server 8000` then open `http://localhost:8000` — opening
  `index.html` as a `file://` URL will NOT work, the browser blocks the fetch.
- **Click any item** to mark it read; the header counter tracks today's entry
  only. Click the counter to reset.
- **Older days are folded.** Click a day's heading to open it.
- **Search** filters every entry in the archive at once and unfolds the days that
  matched.
- **New since your last visit** is marked with a `جديد` badge on the heading.
- **Theme** follows the system setting until the ☾ / ☀ button is used; the choice
  is then remembered.
- All of that is stored in the browser only. It never leaves the device and does
  not sync between devices.
