---
layout: default
title: Publications
---
# Publications

## Selected {#selected}

<ul class="pubs selected">
{% for p in site.data.selected_publications %}
  <li>
    <span class="pub-title">{% if p.doi contains "verify" %}{{ p.title }}{% else %}<a href="https://doi.org/{{ p.doi }}">{{ p.title }}</a>{% endif %}</span>
    <span class="pub-meta">{{ p.citation }}</span>
    <span class="pub-why">{{ p.why }}</span>
    {% unless p.doi contains "verify" %}
    <span class="metrics" data-metrics data-doi="{{ p.doi }}"
          data-bip="{{ site.metrics.publications.bip | default: false }}"
          data-altmetric="{{ site.metrics.publications.altmetric | default: false }}"
          data-dimensions="{{ site.metrics.publications.dimensions | default: false }}"></span>
    {% endunless %}
  </li>
{% endfor %}
</ul>

## All publications

Listed from <a href="https://openalex.org">OpenAlex</a> using ORCID <a href="https://orcid.org/{{ site.orcid }}">{{ site.orcid }}</a>, newest first. For citation counts see <a href="{{ site.scholar }}">Google Scholar</a>.

<div data-pubs data-controls="true" data-orcid="{{ site.orcid }}" data-limit="200" data-mailto="{{ site.openalex_mailto }}" data-scholar="{{ site.scholar }}">
  <p class="pubs-status">Loading publications…</p>
</div>

<script src="{{ '/assets/js/publications.js' | relative_url }}" defer></script>
<script src="{{ '/assets/js/metrics.js' | relative_url }}" data-bip-logo="{{ '/assets/img/bip_white.png' | relative_url }}" defer></script>
