# الموجز اليومي — Daily Arabic News Brief

An Arabic news brief covering the last 24 hours across the Gulf, the wider
Middle East, and energy markets. Regenerated every morning at 08:00 Asia/Riyadh
by a scheduled Claude cloud agent, which prepends the new entry and pushes.

## Files

| File | Purpose |
|---|---|
| `news-brief.md` | The news archive. Newest entry on top, older entries kept forever. |
| `trends.md` | The trends snapshot. **Overwritten** each run, not archived. |
| `index.html` | The brief page. Fetches `news-brief.md` at runtime. |
| `trends.html` | The trends page. Fetches `trends.md` at runtime. |
| `style.css` / `app.js` | Shared look and renderer for both pages. |
| `agent-prompt.md` | Instructions the scheduled agent follows each run. |

The agent only ever edits `news-brief.md` and `trends.md`. The pages read those
files live, so new content appears without the HTML being touched.

## Reading it

- Website: GitHub Pages, served from the `main` branch root.
- Locally: `python3 -m http.server 8000` in this folder, then open
  `http://localhost:8000`. Opening `index.html` as a `file://` URL will NOT
  work — the browser blocks the fetch.

## Source conventions

Every line ends with its sources. Two tags carry a warning:

- `— مصدر واحد` — only one source found; treat with caution.
- `— إعلان طرف` — a claim by a party to a conflict, not a confirmed event.

Outlets with a known lean are labelled inline (RT عربي, الميادين, Democracy Now,
Fox News).
