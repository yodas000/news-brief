# الموجز اليومي — Daily Arabic News Brief

An Arabic news brief covering the last 24 hours across the Gulf, the wider
Middle East, energy markets and culture, plus a live board of jobs and training
that are still open to apply for. Regenerated every morning at 08:00
Asia/Riyadh by a scheduled Claude cloud agent, which rewrites both markdown
files and pushes.

## Files

| File | Purpose |
|---|---|
| `news-brief.md` | The news archive. Newest entry on top, older entries kept forever. |
| `opportunities.md` | The opportunities board. **Rewritten** each run: expired items dropped, open ones carried forward. Not an archive. |
| `index.html` | The brief page. Fetches `news-brief.md` at runtime. |
| `opportunities.html` | The opportunities page. Fetches `opportunities.md` at runtime. |
| `style.css` / `app.js` | Shared look and renderer for both pages. |
| `agent-prompt.md` | Instructions the scheduled agent follows each run. |
| `check-links.sh` | Audits every application link on the board. |

The agent only ever edits `news-brief.md` and `opportunities.md`. The pages
read those files live, so new content appears without the HTML being touched.

## Reading it

- Website: GitHub Pages, served from the `main` branch root.
- Locally: `python3 -m http.server 8000` in this folder, then open
  `http://localhost:8000`. Opening `index.html` as a `file://` URL will NOT
  work — the browser blocks the fetch.

## On the page

- **Click any item** to mark it read; the counter in the header tracks today's
  entry only. Click the counter to reset.
- **Older days are folded.** Click a day's heading to open it.
- **Search** filters every entry in the archive at once and unfolds the days
  that matched.
- **New since your last visit** is marked with a `جديد` badge on the heading.
- **Theme** follows the system setting until the ☾ / ☀ button is used; the
  choice is then remembered.
- All of the above is stored in the browser only. It never leaves the device
  and does not sync between devices.

## Opportunities board

Every line carries a deadline in ISO form, and the page turns it into a
countdown: amber at 14 days left, red at 3, struck through once passed. The
agent drops expired items on the next run; the strike-through is the safety net
for a run that did not happen.

Nothing appears on that page unless it is open to applicants **without a
university degree**. That filter is absolute, not a preference.

### Links are checked, not trusted

A dead or wrong application link costs a real opportunity, so the agent is
required to fetch every URL and confirm it returns 200 and shows the actual
listing before writing it. It may never write a URL from memory or assemble one
by hand; if a link cannot be confirmed, it writes the application route in words
instead, and the page renders that as plain text rather than a link.

That promise is enforced independently. Run the audit yourself any time:

```
./check-links.sh
```

It follows redirects and fails on a non-200, plain `http://`, a URL shortener,
a search-engine redirect, or tracking parameters. The agent must get a clean
exit from it before committing.

## Source conventions

Every line ends with its sources. Two tags carry a warning:

- `— مصدر واحد` — only one source found; treat with caution.
- `— إعلان طرف` — a claim by a party to a conflict, not a confirmed event.

Where two sources disagree, both versions are given and attributed, tagged
`المصادر متعارضة`. Disagreement is reported, not resolved away.

Outlets with a known lean are labelled inline (RT عربي, الميادين, Democracy Now,
Fox News).
