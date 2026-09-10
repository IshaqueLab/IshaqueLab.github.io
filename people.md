---
layout: default
title: People
---
# People

{% for g in site.data.people %}
<section class="people-group">
  <h2>{{ g.group }}</h2>
  <ul class="people">
  {% for p in g.members %}
    {% include person.html p=p %}
  {% endfor %}
  </ul>
</section>
{% endfor %}
