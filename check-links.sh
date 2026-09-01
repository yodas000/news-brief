#!/usr/bin/env bash
# Audit every application link on the opportunities board.
#
# The scheduled agent is told to verify each link before writing it. This is
# the independent check on that promise -- run it any time, it needs nothing
# but curl.
#
#   ./check-links.sh                 checks opportunities.md
#   ./check-links.sh some-file.md    checks another file

set -uo pipefail
FILE="${1:-opportunities.md}"

if [ ! -f "$FILE" ]; then
  echo "No such file: $FILE"
  exit 1
fi

# Pull every http(s) URL out of the file, trimming markdown and Arabic
# punctuation that can end up glued to the end of a link.
mapfile -t URLS < <(grep -oE 'https?://[^ )<>"]+' "$FILE" | sed 's/[.,،)]*$//' | sort -u)

if [ "${#URLS[@]}" -eq 0 ]; then
  echo "No links found in $FILE."
  exit 0
fi

echo "Checking ${#URLS[@]} link(s) in $FILE"
echo

bad=0
for url in "${URLS[@]}"; do
  note=""

  case "$url" in
    http://*)                                   note="INSECURE http, must be https" ;;
    *bit.ly/*|*t.co/*|*lnkd.in/*|*goo.gl/*|*tinyurl*)
                                                note="SHORTENER, must be resolved" ;;
    *google.com/url\?*|*bing.com/ck/*|*duckduckgo.com/l/*|*r.search.yahoo*)
                                                note="SEARCH REDIRECT, must be resolved" ;;
    *utm_*|*fbclid=*|*gclid=*)                  note="TRACKING PARAMS, should be stripped" ;;
  esac

  # -L follows redirects; report the status of where we actually land.
  code=$(curl -sS -L --max-time 20 -o /dev/null -w '%{http_code}' "$url" 2>/dev/null)
  final=$(curl -sS -L --max-time 20 -o /dev/null -w '%{url_effective}' "$url" 2>/dev/null)

  if [ "$code" = "200" ] && [ -z "$note" ]; then
    printf 'OK    %s  %s\n' "$code" "$url"
  else
    bad=$((bad + 1))
    printf 'FAIL  %s  %s\n' "${code:-000}" "$url"
    [ -n "$note" ]                  && printf '        ^ %s\n' "$note"
    [ "$final" != "$url" ] && [ -n "$final" ] && printf '        ^ lands on: %s\n' "$final"
  fi
done

echo
if [ "$bad" -eq 0 ]; then
  echo "All ${#URLS[@]} link(s) passed."
else
  echo "$bad of ${#URLS[@]} link(s) need attention."
  echo "A dead application link costs a real opportunity -- fix or remove it."
  exit 1
fi
