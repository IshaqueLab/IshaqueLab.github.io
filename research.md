---
layout: default
title: Research & Software
---
# Research and software

We develop computational methods to understand biological heterogeneity in disease, using single-cell, spatial and multi-omics data. Most of our work is in oncology. We rely on close ties with experimental collaborators who profile large, high-dimensional datasets with state-of-the-art techniques, and we release our methods as open-source software.

## Research areas

<ul class="areas">
{% for p in site.data.projects %}
  <li><h3>{{ p.name }}</h3><p>{{ p.summary }}</p></li>
{% endfor %}
</ul>

## Software

All tools are open source and available on <a href="{{ site.github_org }}">GitHub</a>.

<table>
  <thead><tr><th>Tool</th><th>What it does</th><th>Links</th></tr></thead>
  <tbody>
  {% for s in site.data.software %}
    <tr>
      <td>{{ s.name }}</td>
      <td>{{ s.summary }}{% if s.venue != "" %}<br><small>{{ s.venue }}</small>{% endif %}</td>
      <td>{% if s.repo != "" %}<a href="{{ s.repo }}">Code</a>{% endif %}{% if s.doi != "" %} <a href="https://doi.org/{{ s.doi }}">Paper</a>{% endif %}</td>
    </tr>
  {% endfor %}
  </tbody>
</table>

## Community

We contribute to open benchmarking through <a href="https://openproblems.bio">openproblems.bio</a> and organise the SpaceHack hackathon series on spatial 'omics analysis.
