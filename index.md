---
layout: default
title: null
---
<div class="hero">
  <div>
    <h1>Computational methods for spatial and single-cell 'omics in cancer</h1>
    <p class="lead">We are the research group of Naveed Ishaque, Professor of Cancer Bioinformatics at Charité - Universitätsmedizin Berlin and the BIH Center of Digital Health.</p>
    <p>We study biological heterogeneity in disease by developing computational methods for 'omics data. Our focus is oncology, with active interests in immunology and neurodegeneration. We build open-source tools for spatially resolved transcriptomics, integrate molecular layers to resolve tumour and microenvironment heterogeneity, and work closely with experimental and clinical collaborators who generate the datasets that make this possible.</p>
    <div class="actions">
      <a class="button" href="{{ '/research/' | relative_url }}">Research and software</a>
      <a class="button secondary" href="{{ '/join/' | relative_url }}">Join the lab</a>
    </div>
  </div>
  <aside class="hero-side">
    <p><strong>Find us online</strong></p>
    <ul>
      <li><a href="{{ site.github_org }}">GitHub: IshaqueLab</a></li>
      <li><a href="{{ site.scholar }}">Google Scholar</a></li>
      <li><a href="https://orcid.org/{{ site.orcid }}">ORCID {{ site.orcid }}</a></li>
      <li><a href="https://www.hidih.org/research/computational-oncology">HiDiH group page</a></li>
    </ul>
  </aside>
</div>

<h2>Research areas</h2>
<ul class="areas">
{% for p in site.data.projects %}
  <li><h3>{{ p.name }}</h3><p>{{ p.summary }}</p></li>
{% endfor %}
</ul>

<h2>Recent publications</h2>
<div data-pubs data-orcid="{{ site.orcid }}" data-limit="5" data-mailto="{{ site.openalex_mailto }}" data-scholar="{{ site.scholar }}">
  <p class="pubs-status">Loading publications…</p>
</div>
<p><a href="{{ '/publications/' | relative_url }}">All publications</a> or <a href="{{ site.scholar }}">view on Google Scholar</a>.</p>

<script src="{{ '/assets/js/publications.js' | relative_url }}" defer></script>
