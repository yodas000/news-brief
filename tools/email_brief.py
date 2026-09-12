"""Email the newest entry of news-brief.md.

Run by .github/workflows/email-brief.yml after a push changes the brief.

    python3 tools/email_brief.py            # send
    python3 tools/email_brief.py --dry-run  # print the HTML, send nothing

Everything sensitive comes from the environment, never from a file in this
repo - the repo is public:

    SMTP_SERVER  SMTP_PORT  SMTP_USER  SMTP_PASS  MAIL_TO  [MAIL_FROM]

Stdlib only, on purpose. A marketplace action would run with the mail password
in its environment, and this is 80 lines.
"""
import os
import re
import smtplib
import sys
from email.message import EmailMessage

BRIEF = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                     "news-brief.md")


def latest_entry(text):
    """The newest entry only. Entries are separated by --- on its own line."""
    return re.split(r"^---$", text, maxsplit=1, flags=re.M)[0].strip()


def to_html(md):
    """Markdown to HTML for the fixed shape this file actually uses.

    Deliberately not a general converter: the brief is # header, ## sections,
    - lines, and one ملاحظة paragraph, all specified in CLAUDE.md. A parser for
    a format that cannot vary is a parser that can break on something that will
    not happen.
    """
    def esc(s):
        return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))

    out, in_list = [], False
    for line in md.splitlines():
        line = line.rstrip()
        if not line:
            continue
        if line.startswith("# "):
            if in_list:
                out.append("</ul>"); in_list = False
            out.append("<h1>%s</h1>" % esc(line[2:]))
        elif line.startswith("## "):
            if in_list:
                out.append("</ul>"); in_list = False
            out.append("<h2>%s</h2>" % esc(line[3:]))
        elif line.startswith("- "):
            if not in_list:
                out.append("<ul>"); in_list = True
            out.append("<li>%s</li>" % esc(line[2:]))
        else:
            if in_list:
                out.append("</ul>"); in_list = False
            cls = ' class="note"' if line.startswith("ملاحظة") else ""
            out.append("<p%s>%s</p>" % (cls, esc(line)))
    if in_list:
        out.append("</ul>")

    return """<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<style>
 body{{margin:0;padding:24px 18px;background:#faf9f7;color:#23211e;
   font:16px/1.9 "Segoe UI",Tahoma,system-ui,sans-serif}}
 .wrap{{max-width:680px;margin:0 auto;background:#fff;padding:26px 24px;
   border:1px solid #e6e2dc;border-radius:10px}}
 h1{{font-size:21px;margin:0 0 18px;padding-bottom:12px;
   border-bottom:2px solid #1f6f5c}}
 h2{{font-size:15px;color:#1f6f5c;margin:22px 0 8px}}
 ul{{margin:0;padding-inline-start:20px}}
 li{{margin-bottom:11px}}
 .note{{font-size:13.5px;color:#6b655d;background:#f4f2ee;padding:12px 14px;
   border-radius:8px;margin-top:22px;line-height:1.8}}
 .foot{{max-width:680px;margin:14px auto 0;font-size:12.5px;color:#8a847b;
   text-align:center}}
 .foot a{{color:#1f6f5c}}
</style></head><body>
<div class="wrap">{body}</div>
<p class="foot"><a href="https://yodas000.github.io/news-brief/">الأرشيف الكامل</a></p>
</body></html>""".format(body="\n".join(out))


def main():
    dry = "--dry-run" in sys.argv

    with open(BRIEF, encoding="utf-8") as f:
        entry = latest_entry(f.read())
    if not entry:
        sys.exit("news-brief.md is empty - nothing to send")

    subject = entry.splitlines()[0].lstrip("# ").strip() or "الموجز اليومي"
    html = to_html(entry)

    if dry:
        print(html)
        return

    need = ["SMTP_SERVER", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "MAIL_TO"]
    missing = [k for k in need if not os.environ.get(k)]
    if missing:
        # Names only. Never echo a value from this list.
        sys.exit("missing secrets: " + ", ".join(missing))

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = os.environ.get("MAIL_FROM") or os.environ["SMTP_USER"]
    msg["To"] = os.environ["MAIL_TO"]
    msg.set_content(entry)                       # plain-text fallback
    msg.add_alternative(html, subtype="html")

    server, port = os.environ["SMTP_SERVER"], int(os.environ["SMTP_PORT"])
    if port == 465:
        smtp = smtplib.SMTP_SSL(server, port, timeout=30)
    else:
        smtp = smtplib.SMTP(server, port, timeout=30)
        smtp.starttls()
    with smtp:
        smtp.login(os.environ["SMTP_USER"], os.environ["SMTP_PASS"])
        smtp.send_message(msg)

    print("sent: %s" % subject)


if __name__ == "__main__":
    main()
