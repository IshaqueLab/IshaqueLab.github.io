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

These software are an approved de.NBI service (the [SpatialTranscriptomicsToolbox](https://www.surveymonkey.de/r/denbi-service?sc=hd-hub&tool=spatialtranscriptomicstoolbox)). [Please help us improve by taking our short user survey](https://www.surveymonkey.de/r/denbi-service?sc=hd-hub&tool=spatialtranscriptomicstoolbox).

<table>
  <thead><tr><th>Tool</th><th>What it does</th><th>Code</th><th>Publication</th></tr></thead>
  <tbody>
  {% for s in site.data.software %}
    <tr>
      <td>{{ s.name }}</td>
      <td>{{ s.summary }}</td>
      <td>{% if s.repo != "" %}<a href="{{ s.repo }}">GitHub</a>{% endif %}</td>
      <td>{% if s.doi != "" %}<a href="https://doi.org/{{ s.doi }}">{{ s.citation }}</a>{% endif %}</td>
    </tr>
  {% endfor %}
  </tbody>
</table>

These software are an approved de.NBI service (the [SpatialTranscriptomicsToolbox](https://www.surveymonkey.de/r/denbi-service?sc=hd-hub&tool=spatialtranscriptomicstoolbox)). [Please help us improve by taking our short user survey](https://www.surveymonkey.de/r/denbi-service?sc=hd-hub&tool=spatialtranscriptomicstoolbox).

## Community

We are actively involved in [ELIXIR](https://elixir-europe.org/), [ELIXIR-Germany](https://elixir-europe.org/about-us/who-we-are/nodes/germany)/[de.NBI](https://www.denbi.de/) and coordinate the [SpaceHack](https://spatialhackathon.github.io/) hackathon serie.
