/*
 * Renders publications from OpenAlex into any element with [data-pubs].
 *
 * Attributes on the container:
 *   data-orcid   ORCID iD of the author (required)
 *   data-limit   number of works to show (default 5; use 200 for a full list)
 *   data-mailto  contact email for OpenAlex's polite pool (optional, faster)
 *   data-controls "true" to render the preprint toggle (full list page)
 *
 * OpenAlex API docs: https://docs.openalex.org/api-entities/works
 * The site does not talk to Google Scholar (no API, scraping is blocked).
 */
(function () {
  'use strict';

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function formatAuthors(authorships, maxN) {
    var names = (authorships || []).map(function (a) { return a.author && a.author.display_name; }).filter(Boolean);
    if (names.length === 0) return '';
    if (names.length <= maxN) return names.join(', ');
    return names.slice(0, maxN).join(', ') + ' and ' + (names.length - maxN) + ' others';
  }

  function render(container, works) {
    var list = el('ul', 'pubs');
    works.forEach(function (w) {
      var li = el('li');
      var title = el('span', 'pub-title');
      var href = w.doi || (w.primary_location && w.primary_location.landing_page_url) || w.id;
      var a = el('a', null, w.display_name || 'Untitled');
      a.href = href;
      a.rel = 'noopener';
      title.appendChild(a);
      li.appendChild(title);

      var venue = w.primary_location && w.primary_location.source && w.primary_location.source.display_name;
      var meta = [w.publication_year, venue, w.type === 'preprint' ? 'preprint' : null].filter(Boolean).join(' · ');
      li.appendChild(el('span', 'pub-meta', meta));

      var authors = formatAuthors(w.authorships, 8);
      if (authors) li.appendChild(el('span', 'pub-authors', authors));
      list.appendChild(li);
    });
    container.innerHTML = '';
    container.appendChild(list);
  }

  function load(container, includePreprints) {
    var orcid = container.dataset.orcid;
    var limit = parseInt(container.dataset.limit || '5', 10);
    var mailto = container.dataset.mailto;
    if (!orcid) { container.textContent = 'No ORCID configured.'; return; }

    var filter = 'author.orcid:' + orcid;
    if (!includePreprints) filter += ',type:!preprint';

    var url = 'https://api.openalex.org/works'
      + '?filter=' + encodeURIComponent(filter)
      + '&sort=publication_date:desc'
      + '&per-page=' + Math.min(limit, 200)
      + '&select=id,display_name,doi,publication_year,type,primary_location,authorships'
      + (mailto ? '&mailto=' + encodeURIComponent(mailto) : '');

    container.textContent = 'Loading publications…';
    fetch(url)
      .then(function (r) { if (!r.ok) throw new Error('OpenAlex returned ' + r.status); return r.json(); })
      .then(function (data) {
        if (!data.results || data.results.length === 0) {
          container.textContent = 'No publications found for this ORCID.';
          return;
        }
        render(container, data.results);
      })
      .catch(function (err) {
        container.innerHTML = '';
        var p = el('p', 'pubs-status', 'Publications could not be loaded (' + err.message + '). ');
        var a = el('a', null, 'View on Google Scholar');
        a.href = container.dataset.scholar || '#';
        p.appendChild(a);
        container.appendChild(p);
      });
  }

  document.querySelectorAll('[data-pubs]').forEach(function (container) {
    var wantControls = container.dataset.controls === 'true';
    var includePreprints = false;

    if (wantControls) {
      var controls = el('div', 'pubs-controls');
      var label = el('label');
      var cb = el('input');
      cb.type = 'checkbox';
      label.appendChild(cb);
      label.appendChild(document.createTextNode('Include preprints'));
      controls.appendChild(label);
      container.parentNode.insertBefore(controls, container);
      cb.addEventListener('change', function () { load(container, cb.checked); });
    }
    load(container, includePreprints);
  });
})();
