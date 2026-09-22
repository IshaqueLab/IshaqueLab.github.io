/*
 * Article-level metrics for any element with [data-metrics] and a data-doi attribute.
 *
 *   data-bip="true"         BIP! indicators fetched from the BIP! API and rendered by this
 *                           script (no third-party script, no cookies)
 *   data-altmetric="true"   Altmetric donut (loads embed.js from Altmetric once per page)
 *   data-dimensions="true"  Dimensions citation badge (loads badge.js from Dimensions once per page)
 *
 * Altmetric and Dimensions are third-party scripts: mention them in the privacy page.
 * BIP! API: https://bip-api.imsi.athenarc.gr/  (schema checked against the public docs; [verify])
 */
(function () {
  'use strict';

  var BIP_API = 'https://bip-api.imsi.athenarc.gr/paper/scores/';
  var BIP_SITE = 'https://bip.imsi.athenarc.gr/site/details?id=';
  var ALTMETRIC_JS = 'https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js';
  var DIMENSIONS_JS = 'https://badge.dimensions.ai/badge.js';

  var CLASS_LABEL = {
    C1: 'Top 0.01%', C2: 'Top 0.1%', C3: 'Top 1%', C4: 'Top 10%', C5: 'Average'
  };
  var BIP_LOGO = (document.currentScript && document.currentScript.dataset.bipLogo) || '/assets/img/bip_white.png';
  var ICON_GREY_FILTER = 'brightness(0) invert(46%)';   // turns a white PNG into #767676, the icon grey

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function loadOnce(src, attrs) {
    if (document.querySelector('script[src="' + src + '"]')) return;
    var s = document.createElement('script');
    s.src = src; s.async = true;
    Object.keys(attrs || {}).forEach(function (k) { s.setAttribute(k, attrs[k]); });
    document.head.appendChild(s);
  }

  function fetchBip(doi) {
    /* BIP! takes the DOI with a literal slash in the path; encodeURI keeps '/' intact */
    return fetch(BIP_API + encodeURI(doi), { headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (data) { return Array.isArray(data) ? data[0] : data; });
  }

  function renderBip(container, d, doi) {
    var a = el('a', 'metric bip');
    a.href = BIP_SITE + doi;
    a.rel = 'noopener';
    a.title = 'BIP! indicators (Athena RC): popularity, influence, impulse, citation count. Open the BIP! record.';
    var logo = el('img', 'metric-logo');
    logo.src = BIP_LOGO; logo.alt = 'BIP!'; logo.width = 34; logo.height = 14;
    logo.style.filter = ICON_GREY_FILTER;
    a.appendChild(logo);
    if (!d) {                                  /* API failed: link only, so the widget is never silently missing */
      a.appendChild(el('span', 'bip-key', 'view record'));
      container.appendChild(a);
      return;
    }
    [['Pop', d.pop_class, 'popularity'], ['Inf', d.inf_class, 'influence'], ['Imp', d.imp_class, 'impulse']].forEach(function (p) {
      if (!p[1]) return;
      var g = el('span', 'bip-item');
      g.title = p[2] + ' (' + p[1] + ')';
      g.appendChild(el('span', 'bip-key', p[0]));
      g.appendChild(el('span', 'bip-class bip-' + p[1], CLASS_LABEL[p[1]] || p[1]));
      a.appendChild(g);
    });
    if (d.cc !== undefined && d.cc !== null) a.appendChild(el('span', 'metric-value', d.cc + ' Cit.'));
    container.appendChild(a);
  }

  /* BIP! requests run through a small pool so the page is not flooded and the API not hammered. */
  var BIP_CONCURRENCY = 3;
  function runBipQueue(queue) {
    function next() {
      if (!queue.length) return;
      var job = queue.shift();
      fetchBip(job.doi)
        .then(function (d) { renderBip(job.container, d, job.doi); })
        .catch(function (err) { console.warn('[metrics] BIP! failed for', job.doi, err.message); renderBip(job.container, null, job.doi); })
        .then(next);
    }
    for (var i = 0; i < BIP_CONCURRENCY; i++) next();
  }

  function scaled(inner) {
    var w = el('span', 'badge-scale');
    w.appendChild(inner);
    return w;
  }

  function renderAltmetric(container, doi) {
    var d = el('div', 'altmetric-embed');
    d.setAttribute('data-badge-type', 'donut');
    d.setAttribute('data-badge-popover', 'right');
    d.setAttribute('data-hide-no-mentions', 'true');
    d.setAttribute('data-doi', doi);
    container.appendChild(scaled(d));
    loadOnce(ALTMETRIC_JS);
  }

  function renderDimensions(container, doi) {
    var s = el('span', '__dimensions_badge_embed__');
    s.setAttribute('data-doi', doi);
    s.setAttribute('data-style', 'small_circle');
    s.setAttribute('data-hide-zero-citations', 'true');
    container.appendChild(scaled(s));
    loadOnce(DIMENSIONS_JS, { charset: 'utf-8' });
  }

  var bipQueue = [];
  document.querySelectorAll('[data-metrics][data-doi]').forEach(function (c) {
    var doi = c.dataset.doi.trim().replace(/^https?:\/\/doi\.org\//, '');
    if (!doi) return;
    if (c.dataset.bip === 'true') bipQueue.push({ container: c, doi: doi });
    if (c.dataset.altmetric === 'true') renderAltmetric(c, doi);
    if (c.dataset.dimensions === 'true') renderDimensions(c, doi);
  });
  runBipQueue(bipQueue);
})();
