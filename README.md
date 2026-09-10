# ishaquelab.github.io

Lab website, built with Jekyll and served by GitHub Pages at https://ishaquelab.github.io.

## Editing

- People: `_data/people.yml`
- Software: `_data/software.yml`
- Research areas: `_data/projects.yml`
- Navigation: `_data/nav.yml`
- Page text: the `.md` files in the root
- Colours and layout: `assets/css/main.css`

Publications are fetched in the browser from OpenAlex using the ORCID in `_config.yml`; nothing to maintain.

## Assets to add

- `assets/img/logo.png` (the lab logo, ideally with a transparent background)
- `assets/img/favicon.png`
- `assets/img/people/*.jpg` (optional photos, square, ~300 px)

## Local preview (optional)

```
gem install bundler jekyll
bundle init && bundle add jekyll github-pages --group jekyll_plugins
bundle exec jekyll serve
```
