---
layout: default
title: Software
description: Open-source software from the Ishaque Lab for spatial and single-cell 'omics.
---
# Software

We develop open-source computational methods to understand biological heterogeneity in disease, using single-cell, spatial and multi-omics data. Everything we release is open source, documented and free to use.

## Software

This software is part of the approved de.NBI service [Spatial Transcriptomics Toolbox](https://github.com/ishaquelab). [Please help us improve by taking our short user survey](https://www.surveymonkey.de/r/denbi-service?sc=hd-hub&tool=spatialtranscriptomicstoolbox).

{% for g in site.data.software %}
<section class="tools-group">
  <h2>{{ g.group }}</h2>
  <ul class="tools">
  {% for t in g.tools %}
    {% include tool.html t=t %}
  {% endfor %}
  </ul>
</section>
{% endfor %}

This software is part of the approved de.NBI service [Spatial Transcriptomics Toolbox](https://github.com/ishaquelab). [Please help us improve by taking our short user survey](https://www.surveymonkey.de/r/denbi-service?sc=hd-hub&tool=spatialtranscriptomicstoolbox).

<script src="{{ '/assets/js/metrics.js' | relative_url }}" data-bip-logo="{{ '/assets/img/bip_white.png' | relative_url }}" defer></script>
