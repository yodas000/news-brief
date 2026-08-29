# الموجز اليومي — Daily Arabic News Brief

An Arabic news brief covering the last 24 hours across the Gulf, the wider
Middle East, and energy markets. Regenerated every morning at 08:00 Asia/Riyadh
by a scheduled Claude cloud agent, which prepends the new entry and pushes.

## Files

| File | Purpose |
|---|---|
| `news-brief.md` | The archive. Newest entry on top, older entries kept forever. Source of truth. |
| `index.html` | The website. Fetches `news-brief.md` at runtime and renders it. |
| `agent-prompt.md` | Instructions the scheduled agent follows each run. |

The agent only ever edits `news-brief.md`. The site reads that file live, so a
new brief appears on the website without the HTML being touched.

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
