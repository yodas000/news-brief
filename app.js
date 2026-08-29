/* Shared renderer for the brief and trends pages.
   Both read a markdown file at runtime; neither is edited by the agent. */
(function(){
  function decorate(root, mode){
    var items = Array.prototype.slice.call(root.querySelectorAll('li'));

    // Trends: find the largest post count so bars can be scaled against it.
    var max = 0;
    if (mode === 'trends') {
      items.forEach(function(li){
        var m = li.textContent.match(/(\d[\d,]*)\s*منشور/);
        if (m) max = Math.max(max, parseInt(m[1].replace(/,/g,''), 10));
      });
    }

    items.forEach(function(li){
      var html = li.innerHTML;

      // Trailing parenthetical = sources
      html = html.replace(/\(([^()]*)\)\s*$/, function(_, inner){
        var weak = /مصدر واحد|إعلان طرف/.test(inner);
        return '<span class="src' + (weak ? ' one' : '') + '">' + inner + '</span>';
      });

      // Leading "<label> — " = date stamp (news) or hashtag (trends)
      var cls = mode === 'trends' ? 'tag' : 'd';
      var had = false;
      html = html.replace(/^([^—]{2,40}?)\s*—\s*/, function(_, label){
        had = true;
        return '<span class="' + cls + '">' + label + '</span> — ';
      });
      // Fallback for "label: rest" lines with no dash
      if (!had) {
        html = html.replace(/^([^:—]{2,20}):\s/, '<span class="' + cls + '">$1</span>: ');
      }

      // Trends: grey out the metric tail
      if (mode === 'trends') {
        html = html.replace(/—\s*((?:\d[\d,]*\s*منشور|تصنيف صعود\s*\d+)[^<]*)/,
                            '— <span class="metric">$1</span>');
      }

      li.innerHTML = html;

      if (mode === 'trends' && max > 0) {
        var m = li.textContent.match(/(\d[\d,]*)\s*منشور/);
        if (m) {
          var pct = Math.round(parseInt(m[1].replace(/,/g,''), 10) / max * 100);
          var bar = document.createElement('span');
          bar.className = 'barfill';
          bar.style.width = pct + '%';
          li.insertBefore(bar, li.firstChild);
        }
      }
    });

    root.querySelectorAll('p').forEach(function(p){
      if (/^\s*ملاحظة/.test(p.textContent)) p.className = 'note';
    });
  }

  window.renderFeed = function(opts){
    var content = document.getElementById(opts.mount);
    var updated = document.getElementById(opts.updated);

    fetch(opts.file + '?t=' + Date.now())
      .then(function(r){ if(!r.ok) throw new Error(r.status); return r.text(); })
      .then(function(md){
        var parts = md.split(/\n-{3,}\n/).filter(function(s){ return s.trim(); });
        content.innerHTML = '';
        parts.forEach(function(part){
          var div = document.createElement('div');
          div.className = 'entry';
          div.innerHTML = marked.parse(part.trim());
          decorate(div, opts.mode);
          content.appendChild(div);
        });
        var first = content.querySelector('.entry h1');
        updated.textContent = first
          ? 'آخر تحديث: ' + first.textContent.replace(/^.*?—\s*/, '')
          : 'آخر تحديث غير معروف';
      })
      .catch(function(e){
        content.innerHTML = '<div class="status">تعذّر تحميل المحتوى (' + e.message + ')</div>';
        updated.textContent = 'غير متاح';
      });
  };
})();
