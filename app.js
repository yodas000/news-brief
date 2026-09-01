/* Shared renderer for the brief and the opportunities board.
   Both read a markdown file at runtime; neither is edited by the agent. */
(function(){

  /* ---------- theme: system by default, an explicit choice overrides it ---------- */
  var THEME = 'newsbrief:theme';

  function applyTheme(t){
    if (t) document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
  }
  function systemIsDark(){
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  function initTheme(){
    var saved = null;
    try { saved = localStorage.getItem(THEME); } catch (e) {}
    applyTheme(saved);

    var btn = document.getElementById('themetog');
    if (!btn) return;

    function label(){
      var cur = document.documentElement.getAttribute('data-theme');
      var dark = cur ? cur === 'dark' : systemIsDark();
      btn.textContent = dark ? '☀' : '☾';
      btn.title = dark ? 'الوضع الفاتح' : 'الوضع الداكن';
    }
    btn.addEventListener('click', function(){
      var cur = document.documentElement.getAttribute('data-theme');
      var dark = cur ? cur === 'dark' : systemIsDark();
      var next = dark ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(THEME, next); } catch (e) {}
      label();
    });
    label();
  }

  /* ---------- read-state: the brief is read in pieces across the day ----------
     Per-browser only, never leaves the device. */
  var STORE = 'newsbrief:read';
  var SEEN  = 'newsbrief:lastseen';

  function idOf(s){
    var h = 0;
    for (var i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    return 'i' + (h >>> 0).toString(36);
  }
  function loadRead(){
    try { return JSON.parse(localStorage.getItem(STORE) || '[]'); }
    catch (e) { return []; }          // private window, blocked storage, bad JSON
  }
  function saveRead(list){
    try { localStorage.setItem(STORE, JSON.stringify(list.slice(-400))); }
    catch (e) { /* storage unavailable - tracking degrades, page still works */ }
  }

  /* Only today's entry is tracked. Counting the whole archive would make the
     "x of y read" figure meaningless as the archive grows. */
  function trackReading(scope, updatedEl){
    var items = Array.prototype.slice.call(
      scope.querySelectorAll('li, p:not(.note)'));
    if (!items.length) return;

    var read = loadRead();
    var pill = document.createElement('button');
    pill.className = 'progress';
    pill.type = 'button';

    function refresh(){
      var done = items.filter(function(el){ return el.classList.contains('read'); });
      pill.textContent = done.length + ' من ' + items.length + ' مقروء';
      pill.classList.toggle('done', done.length === items.length);
    }

    items.forEach(function(el){
      var id = idOf(el.textContent.trim());
      el.dataset.rid = id;
      el.classList.add('track');
      if (read.indexOf(id) !== -1) el.classList.add('read');
      el.addEventListener('click', function(ev){
        if (ev.target.closest && ev.target.closest('a')) return;   // let links through
        el.classList.toggle('read');
        var cur = loadRead();
        var at = cur.indexOf(id);
        if (el.classList.contains('read')) { if (at === -1) cur.push(id); }
        else if (at !== -1) { cur.splice(at, 1); }
        saveRead(cur);
        refresh();
      });
    });

    pill.title = 'إعادة تعيين كل البنود إلى غير مقروء';
    pill.addEventListener('click', function(){
      items.forEach(function(el){ el.classList.remove('read'); });
      saveRead([]);
      refresh();
    });

    refresh();
    updatedEl.parentNode.insertBefore(pill, updatedEl.nextSibling);
  }

  /* ---------- news decoration ---------- */
  function decorateNews(root){
    Array.prototype.slice.call(root.querySelectorAll('li')).forEach(function(li){
      var html = li.innerHTML;

      // Trailing parenthetical = sources
      html = html.replace(/\(([^()]*)\)\s*$/, function(_, inner){
        var weak = /مصدر واحد|إعلان طرف|الشرط غير مذكور|متعارض/.test(inner);
        return '<span class="src' + (weak ? ' one' : '') + '">' + inner + '</span>';
      });

      // Leading date stamp, up to the first em dash
      var had = false;
      html = html.replace(/^([^—]{2,40}?)\s*—\s*/, function(_, label){
        had = true;
        return '<span class="d">' + label + '</span> — ';
      });
      if (!had) html = html.replace(/^([^:—]{2,20}):\s/, '<span class="d">$1</span>: ');

      li.innerHTML = html;
    });
  }

  /* ---------- opportunities decoration ---------- */
  var MS_DAY = 86400000;
  var K_DEADLINE = 'آخر موعد';
  var K_APPLY    = 'التقديم';
  var K_ELIG     = 'الشرط';

  function daysUntil(iso){
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
    if (!m) return null;
    var due = new Date(+m[1], +m[2] - 1, +m[3]);
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((due - today) / MS_DAY);
  }

  function deadlineChip(value){
    var span = document.createElement('span');
    var iso = (value.match(/\d{4}-\d{2}-\d{2}/) || [null])[0];
    var d = iso ? daysUntil(iso) : null;

    if (d === null){                       // open-ended, or an unparseable date
      span.className = 'chip';
      span.innerHTML = K_DEADLINE + ': <b>' + value + '</b>';
      return { el: span, expired: false };
    }
    span.className = 'chip dl';
    if (d < 0){
      span.classList.add('expired');
      span.textContent = 'انتهى ' + iso;
      return { el: span, expired: true };
    }
    if (d <= 3) span.classList.add('urgent');
    else if (d <= 14) span.classList.add('soon');

    span.textContent = d === 0
      ? 'آخر يوم للتقديم'
      : 'باقٍ ' + d + ' يوم · ' + iso;
    return { el: span, expired: false };
  }

  function decorateOpps(root){
    Array.prototype.slice.call(root.querySelectorAll('li')).forEach(function(li){
      var raw = li.innerHTML;
      var sources = null;

      raw = raw.replace(/\(([^()]*)\)\s*$/, function(_, inner){
        sources = { text: inner, weak: /مصدر واحد|غير مذكور/.test(inner) };
        return '';
      });

      var cut = raw.indexOf('—');
      if (cut === -1) return;                       // not in the expected shape
      var title = raw.slice(0, cut).trim();
      var meta  = raw.slice(cut + 1).trim();

      var titleEl = document.createElement('span');
      titleEl.className = 'otitle';
      titleEl.innerHTML = title;

      var metaEl = document.createElement('span');
      metaEl.className = 'ometa';
      var expired = false;

      meta.split('·').forEach(function(part){
        part = part.trim();
        if (!part) return;
        var at = part.indexOf(':');
        var key = at === -1 ? '' : part.slice(0, at).trim();
        var val = at === -1 ? part : part.slice(at + 1).trim();

        if (key === K_DEADLINE){
          var dl = deadlineChip(val);
          expired = dl.expired;
          metaEl.appendChild(dl.el);
          return;
        }

        if (key === K_APPLY){
          var url = (val.match(/https?:\/\/[^\s<"']+/) || [null])[0];
          if (url){
            var a = document.createElement('a');
            a.className = 'apply';
            a.textContent = 'رابط التقديم';
            a.href = url;
            a.rel = 'noopener';
            a.target = '_blank';
            metaEl.appendChild(a);
          } else {
            var c = document.createElement('span');
            c.className = 'chip';
            c.innerHTML = K_APPLY + ': <b>' + val + '</b>';
            metaEl.appendChild(c);
          }
          return;
        }

        var chip = document.createElement('span');
        if (key === K_ELIG){
          chip.className = 'chip elig' + (/غير مذكور/.test(val) ? ' unknown' : '');
          chip.textContent = val;
        } else if (key){
          chip.className = 'chip';
          chip.innerHTML = key + ': <b>' + val + '</b>';
        } else {
          chip.className = 'chip';
          chip.innerHTML = part;
        }
        metaEl.appendChild(chip);
      });

      if (sources){
        var s = document.createElement('span');
        s.className = 'src' + (sources.weak ? ' one' : '');
        s.innerHTML = sources.text;
        metaEl.appendChild(s);
      }

      li.innerHTML = '';
      li.appendChild(titleEl);
      li.appendChild(metaEl);
      // A missed run can leave a passed deadline on the page; grey it out anyway.
      if (expired) li.classList.add('expired');
    });
  }

  function markNotes(root){
    Array.prototype.slice.call(root.querySelectorAll('p')).forEach(function(p){
      if (/^\s*ملاحظة/.test(p.textContent)) p.className = 'note';
    });
  }

  /* ---------- archive folding + "new since your last visit" ---------- */
  function setupArchive(entries){
    var last = null;
    try { last = localStorage.getItem(SEEN); } catch (e) {}

    entries.forEach(function(entry, i){
      var h1 = entry.querySelector('h1');
      if (!h1 || i === 0) return;                   // today stays open
      entry.classList.add('fold');
      h1.addEventListener('click', function(){ entry.classList.toggle('open'); });
    });

    var top = entries[0] && entries[0].querySelector('h1');
    var newest = top ? top.textContent.trim() : null;

    // Everything above the entry that was newest last visit is new.
    if (last !== null && last !== newest){
      for (var i = 0; i < entries.length; i++){
        var h = entries[i].querySelector('h1');
        if (!h) continue;
        if (h.textContent.trim() === last) break;
        var b = document.createElement('span');
        b.className = 'badge-new';
        b.textContent = 'جديد';
        h.appendChild(b);
      }
    }
    if (newest){ try { localStorage.setItem(SEEN, newest); } catch (e) {} }
  }

  /* ---------- search across every entry in the file ---------- */
  function setupSearch(content, entries){
    var box = document.getElementById('search');
    if (!box) return;

    var hits = document.createElement('div');
    hits.className = 'hits';
    content.parentNode.insertBefore(hits, content);

    box.addEventListener('input', function(){
      var q = box.value.trim().toLowerCase();

      if (!q){
        hits.textContent = '';
        entries.forEach(function(e){
          e.style.display = '';
          e.classList.remove('open');
          Array.prototype.slice.call(e.querySelectorAll('li, p')).forEach(function(el){
            el.style.display = '';
          });
        });
        return;
      }

      var n = 0;
      entries.forEach(function(e){
        var any = false;
        Array.prototype.slice.call(e.querySelectorAll('li, p')).forEach(function(el){
          var match = el.textContent.toLowerCase().indexOf(q) !== -1;
          el.style.display = match ? '' : 'none';
          if (match){ any = true; n++; }
        });
        e.style.display = any ? '' : 'none';
        e.classList.toggle('open', any);       // unfold days that matched
      });
      hits.textContent = n ? n + ' نتيجة' : 'لا نتائج';
    });
  }

  window.renderFeed = function(opts){
    initTheme();
    var content = document.getElementById(opts.mount);
    var updated = document.getElementById(opts.updated);

    fetch(opts.file + '?t=' + Date.now())
      .then(function(r){ if(!r.ok) throw new Error(r.status); return r.text(); })
      .then(function(md){
        var parts = md.split(/\n-{3,}\n/).filter(function(s){ return s.trim(); });
        content.innerHTML = '';
        var entries = [];

        parts.forEach(function(part){
          var div = document.createElement('div');
          div.className = 'entry';
          div.innerHTML = marked.parse(part.trim());
          if (opts.mode === 'opps') decorateOpps(div); else decorateNews(div);
          markNotes(div);
          content.appendChild(div);
          entries.push(div);
        });

        var first = content.querySelector('.entry h1');
        updated.textContent = first
          ? 'آخر تحديث: ' + first.textContent.replace(/^.*?—\s*/, '')
          : 'آخر تحديث غير معروف';

        if (opts.archive) setupArchive(entries);
        setupSearch(content, entries);
        // Only today's entry is tracked; the archive below it is reference.
        if (opts.track && entries[0]) trackReading(entries[0], updated);
      })
      .catch(function(e){
        content.innerHTML = '<div class="status">تعذّر تحميل المحتوى (' + e.message + ')</div>';
        updated.textContent = 'غير متاح';
      });
  };
})();
