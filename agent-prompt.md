# الموجز اليومي — تعليمات المهمة المتكررة

Run daily at 08:00 Asia/Riyadh (05:03 UTC).

## GOAL
Two outputs in one run, one commit:

1. `news-brief.md` — today's Arabic news brief, PREPENDED to the top.
2. `opportunities.md` — the live board of still-open jobs and training,
   REWRITTEN in full.

Do not touch `index.html`, `opportunities.html`, `style.css` or `app.js`.
The pages read the markdown at runtime.

Commit message: `brief: <YYYY-MM-DD>`. Both files in the same commit. Then `git push`.

---

# OUTPUT 1 — `news-brief.md`

File: `news-brief.md` (repo root). Prepend today's entry to the TOP.
Never overwrite or delete older entries. Separate entries with `---` on its own line.

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
- Only events from the last 24 hours, except where a section says otherwise.
  If a section has nothing, write `لا جديد`.
- Never invent a fact, a date, or a source.
- Prefer original sources (news agencies, government statements, filings)
  over aggregators.
- **6 to 9 bullet lines total across sections 1-3.** If you cannot reach 6 with
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
4. `## 4. الجوف وسكاكا — عاجل` — urgent local news ONLY. Jobs and training
   no longer live here; they go in `opportunities.md`. Not counted in the 6-9.
5. `## 5. ثقافة` — see the dedicated rules below. Not counted in the 6-9.
6. `## 6. مواعيد قادمة` — future events with confirmed dates (OPEC+ meetings,
   summits, deadlines, data releases, expiring agreements). Not counted in the 6-9.
7. `## 7. قراءة اليوم` — EXACTLY ONE item, 3 to 5 sentences. Not counted in
   the 6-9. This is the only place in the file that is prose.

### About `الجوف وسكاكا — عاجل`
The reader lives in Sakaka, Al-Jouf. Only things that actually affect
residents: emergencies, service disruptions, major incidents, official
announcements with real consequences. NOT municipal press releases, NOT
routine events, NOT weather. Most days there will be none. Write `لا جديد`
and move on. Anything about hiring or training belongs in `opportunities.md`,
not here.

### About `ثقافة`
Film, television, anime, music. These are real standing interests, not filler.

- **0 to 2 lines.** Never more. If nothing real happened, write `لا جديد`.
- **48-hour window, not 24.** Arabic culture desks publish thinly and a strict
  24 hours would leave this empty most days. Every line still carries its own
  date, so nothing is presented as newer than it is.
- Report events, not opinions: a release or release date, a death, a festival
  award or jury decision, a restoration, a cancellation, a confirmed
  adaptation, an album or single release, a rights or copyright ruling, a
  production shutdown.
- **Never a review, a rating, a ranking, or a "best of" list.** No box-office
  tables. No recommendations.
- Two sources, same as everything else. **English-language sources are fine
  here** — Arabic coverage of anime and international film is thin, and a real
  second source in English beats a fake one in Arabic. The line itself stays
  in Arabic.
- No sports. The rule holds here too; entertainment coverage of athletes is
  still sports.

### About `قراءة اليوم`
The reader consumes by listening and is deliberately building a reading habit.
Sections 1-6 are for scanning; this one item is meant to actually be read. So
it must be worth the minute it costs.

- Draw it from his interests: **film, television, anime, music, philosophy** —
  or give a real news story from today the context a headline cannot carry.
- Do not simply restate the `ثقافة` line in longer form. If the day's best
  reading item is cultural, put it here and drop it from `ثقافة`.
- It must be about something REAL and sourced: a release, a death, an
  anniversary, a restoration, a published essay, a court ruling. Two sources,
  same as everything else.
- **Report, do not opine.** Give facts a headline had no room for. This is not
  a review, an essay, or your take.
- Tone: unsentimental and clear-eyed. His philosophical taste is
  **philosophical pessimism / realism** (التشاؤم الفلسفي) — the tradition of
  Schopenhauer, Cioran, Zapffe, Ligotti, with absurdism at its edge. No uplift,
  no moral, no "reminds us that…" ending. State what happened and stop.
- If nothing real and worth reading exists today, write `لا جديد` and move on.
  A skipped day is better than a manufactured one.

## FORMAT
- Arabic, simple vocabulary. Reader is a native Arabic speaker.
- Headlines only in sections 1-6. No paragraphs, no analysis, no commentary.
  Section 7 (`قراءة اليوم`) is the sole exception.
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

# OUTPUT 2 — `opportunities.md`

A live board of opportunities that are **still open right now**. Not an
archive, not a daily entry. The whole point is that an item stays visible for
as long as it can still be applied to, and disappears the moment it cannot.

## THE FILTER — absolute, read this before anything else

> **The reader holds a high school certificate (ثانوية عامة) and has NO
> university degree. Only list opportunities open to applicants without a
> bachelor's degree.**

- Stated requirement is بكالوريوس or above → **exclude it entirely.** Do not
  list it with a caveat, do not list it "just in case". It wastes his time.
- Requirement not stated anywhere → list it, and write `الشرط غير مذكور` in
  the الشرط field. Never assume eligibility in either direction.
- Commonly eligible: هدف (HRDF) training, منصة دروب free courses, طاقات
  listings filtered to ثانوية, diploma and vocational tracks, apprenticeships,
  on-the-job training schemes.
- تمهير (Tamheer) usually requires a degree — verify before listing.
- Prefer Al-Jouf / Sakaka. Remote or nationwide programmes he can do from
  Sakaka are also fine. Do not list anything requiring relocation unless the
  listing is unusually strong.

## PROCEDURE — rewrite, carrying forward
1. Read the current `opportunities.md`.
2. **Drop every item whose `آخر موعد` is earlier than today.** No grace period.
3. For each surviving item, **re-fetch its `التقديم` link** and re-check the
   listing. Drop it if the link is dead, if the listing is gone or closed, or
   if it now states a degree requirement. See LINKS below — this step is not
   optional and carrying an item forward is not a reason to skip it.
4. Search for new items and add them. Use web search freely here — job and
   training portals are not in the fetch allowlist.
5. Sort each section by deadline, **soonest first**. Items with `مفتوح` go last.
6. **Cap the board at 8 items total.** If more qualify, keep the 8 with the
   nearest deadlines. At most 3 of the 8 may be open-ended free courses —
   they never expire and would otherwise crowd out real deadlines.
7. Write the file from scratch. Do not prepend, do not keep old headers.

**This file is NOT bound to the 24-hour window.** What matters is whether
applications are still open, not when the listing appeared.

## LINE FORMAT — exact, the page parses it
```
- <العنوان> — الجهة: <الجهة> · المكان: <المكان> · الشرط: <المؤهل> · آخر موعد: <YYYY-MM-DD> · التقديم: <رابط> (<مصدر1>، <مصدر2>)
```

- The separator between fields is the middle dot `·`, and every field is
  `المفتاح: القيمة`. The keys `الجهة`, `المكان`, `الشرط`, `آخر موعد` and
  `التقديم` are read by name — do not rename or translate them.
- `التقديم` is governed by the LINKS section below. Read it before writing a
  single URL.
- **`آخر موعد` MUST be an ISO date, `YYYY-MM-DD`.** The page computes the days
  remaining from it: the chip turns amber at 14 days, red at 3 days, and is
  struck through once the date has passed. Any other date format silently
  loses the countdown. If the deadline is genuinely open-ended, write
  `آخر موعد: مفتوح` — that exact word.
- Sources in parentheses at the end, same rules as the brief: two sources,
  or tag `مصدر واحد`.

Example of a correct line:
```
- تدريب منتهٍ بالتوظيف في إدارة الموارد البشرية — الجهة: صندوق تنمية الموارد البشرية (هدف) · المكان: سكاكا · الشرط: ثانوية عامة · آخر موعد: 2026-09-18 · التقديم: https://www.hrdf.org.sa/... (هدف، طاقات)
```

## LINKS — the strictest rule in this file

A wrong link is worse than no link. If he taps an application link and it is
dead, or it opens a different programme, he has lost the opportunity AND stopped
trusting the page. There is no partial credit here.

### The governing rule
> **Never write a URL from memory, and never build one by hand.**
> A URL may only be written if it was returned by a fetch or a search result
> **in this run**, copied character for character, and then confirmed to load.

You will feel confident that you know a portal's address. That feeling is not
evidence. Domains change, paths get restructured, and a plausible-looking URL
that you assembled yourself is a fabrication even when the domain is real.
Guessing a path is the same offence as inventing a fact.

### Mandatory check before writing any link
1. Fetch the exact URL you intend to write.
2. It must return **200**. A 403, 404, 410, or a timeout means the link fails.
3. The page that comes back must be **the listing itself** — its text must
   contain the programme title, or the issuing body plus the deadline. A portal
   homepage, a search page, a login wall, or a generic "opportunities" index is
   NOT the listing.
4. Only then may the URL go in the line.

A redirect to a stable page is fine — record the URL you were redirected to,
not the one you started from.

### Banned link shapes — never write these
- **Search-engine and aggregator redirects.** Anything containing
  `google.com/url?`, `bing.com/ck/`, `duckduckgo.com/l/`, `r.search.yahoo`,
  `news.google.com/rss/articles`. Follow the redirect and write the real
  destination.
- **Shorteners.** `bit.ly`, `t.co`, `lnkd.in`, `goo.gl`, `tinyurl`, and any
  other. Resolve them and write the destination, or drop the item.
- **Tracking junk.** Strip `utm_*`, `fbclid`, `gclid`, `?ref=`, session ids and
  anything after `#` unless the fragment is load-bearing.
- **Plain `http://`.** HTTPS only. If a site offers only HTTP, describe how to
  apply in words instead.
- **Anything behind a login** that cannot be seen without an account.
- **A link to a news article about the programme** in the `التقديم` field. That
  is a source, and belongs in the parentheses. `التقديم` is where he applies.

### Domain has to belong to the issuing body
The domain must be the official one for the `الجهة` you named, and you must
have **seen that domain in this run's fetch or search results** — not recalled
it. If the issuing body is a government fund and the link is to a private job
board reposting it, prefer the official page; use the reposter only if the
official listing genuinely cannot be reached, and then tag it `مصدر واحد`.

Watch for lookalike domains: a hyphen added, `.com` where the real one is
`.gov.sa` or `.org.sa`, an extra word in the path. If two candidate domains
differ at all, you have not verified anything — go back to the source page and
copy the link from there.

### When a link cannot be verified — the degrade path
Do not drop the opportunity, and do not write a URL you could not confirm.
Write the instructions in words instead:

```
· التقديم: عبر بوابة طاقات، ابحث عن المسمى في قسم التدريب — تعذّر تأكيد رابط مباشر
```

The page renders a non-URL `التقديم` value as plain text rather than a link, so
this is a supported outcome, not a failure. An honest "here is how to find it"
beats a link that breaks.

### Re-check every carried-over link, every run
Carrying an item forward is not a reason to trust its link. Listings close and
get taken down without the deadline passing. On every run, re-fetch every URL
already in the file. If one now returns 404 or 403, or the page no longer shows
the listing, remove that item — do not leave it up because the date is still in
the future.

### Run the checker before committing — not optional
The repo ships `check-links.sh`. After writing `opportunities.md` and before
`git commit`, run it from the repo root:

```
./check-links.sh
```

It fetches every link in the file, follows redirects, and fails on a non-200,
on plain `http://`, on a shortener, on a search-engine redirect, and on
tracking parameters. **It must exit 0 before you commit.**

If it reports a failure, fix that line — replace the link with a verified one,
or take the degrade path and write the application route in words. Do not
commit a file the checker rejects, and never edit the checker to make it pass.

### A blocked host is NOT a dead link — tell them apart
This environment blocks outbound network access by default, and the allowlist
is configured per-environment, outside this repo. So a failure can mean either
"the link is dead" or "this environment cannot reach that host at all". These
demand opposite responses and must never be confused.

- The tell is the error itself: `EGRESS_BLOCKED`, a connection refused, or a
  DNS failure means the network stopped you. A clean `404`, `403` or `410` from
  the server means the link is genuinely bad.
- **Link genuinely dead → drop the item.**
- **Host blocked by the network → keep the item.** Take the degrade path: write
  the application route in words, and note in the closing `ملاحظة:` line that
  the link could not be checked from this environment and name the host.
- **Never drop a real opportunity because of a network restriction**, and never
  present a blocked host as a verified link either.
- List every host that was blocked in the closing note, so the allowlist can be
  updated. Note that `*.example.com` does not match a bare `example.com` — both
  forms have to be listed.

### Report it
The closing `ملاحظة:` line must state how many links were verified this run and
how many items were dropped or degraded because a link failed. If you wrote any
`التقديم` value that is not a verified URL, say which.

## SECTIONS
1. `## 1. الجوف وسكاكا`
2. `## 2. عن بُعد أو على مستوى المملكة`

If a section has nothing, write `لا فرص مفتوحة حاليا` as a plain line, not a
bullet.

## FILE HEADER AND NOTE
- Header: `# فرص مفتوحة — <اليوم> <DD> <الشهر> <YYYY>`
- End the file with a `ملاحظة:` line stating how many items were carried
  forward, how many were dropped as expired or closed, and how many are new.
  If a carried item could not be re-verified this run, say so and keep it,
  flagged `لم يُعد التحقق`.
- The same note must carry the link report required by the LINKS section: how
  many `التقديم` links were fetched and returned 200 this run, how many items
  were dropped because a link failed, and which items were written with a
  worded `التقديم` instead of a verified URL.

## RULES
- Never invent a deadline. If the listing does not state one, search for it;
  if it still cannot be found, write `آخر موعد: مفتوح` and note it.
- **An opportunity whose deadline has passed is worse than no opportunity.**
  Check the date against today before writing any line.
- Never list something requiring a bachelor's degree. There is no exception.
- **Never write an unverified URL.** A fabricated or stale application link is
  the worst failure this file can produce — it costs him the opportunity and
  the page its credibility. Fetch it, confirm 200, confirm it is the listing,
  or write words instead. See LINKS.
- Fewer verified items beat more unverified ones. Publishing three real
  opportunities with working links is a good run; eight with one dead link is
  a bad one.
