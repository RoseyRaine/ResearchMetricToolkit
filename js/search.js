// Homepage search over window.SEARCH_INDEX (built at generation time).
(function () {
  var input = document.getElementById('search');
  var list = document.getElementById('search-results');
  if (!input || !list || !window.SEARCH_INDEX) return;

  function snippet(text, q) {
    var i = text.toLowerCase().indexOf(q);
    if (i < 0) return text.slice(0, 90) + '…';
    var start = Math.max(0, i - 40);
    return (start > 0 ? '…' : '') + text.slice(start, i + q.length + 50) + '…';
  }

  function render(q) {
    list.innerHTML = '';
    if (!q) { list.hidden = true; return; }
    var matches = window.SEARCH_INDEX.filter(function (p) {
      return p.title.toLowerCase().indexOf(q) >= 0 || p.text.toLowerCase().indexOf(q) >= 0;
    }).sort(function (a, b) {
      var at = a.title.toLowerCase().indexOf(q) >= 0 ? 0 : 1;
      var bt = b.title.toLowerCase().indexOf(q) >= 0 ? 0 : 1;
      return at - bt;
    }).slice(0, 10);
    if (!matches.length) { list.hidden = true; return; }
    matches.forEach(function (p) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = p.url;
      var strong = document.createElement('strong');
      strong.textContent = p.title;
      var span = document.createElement('span');
      span.className = 'snippet';
      span.textContent = snippet(p.text, q);
      a.appendChild(strong);
      a.appendChild(span);
      li.appendChild(a);
      list.appendChild(li);
    });
    list.hidden = false;
  }

  input.addEventListener('input', function () {
    render(input.value.trim().toLowerCase());
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { list.hidden = true; }
  });
  document.addEventListener('click', function (e) {
    if (!list.contains(e.target) && e.target !== input) list.hidden = true;
  });
})();
