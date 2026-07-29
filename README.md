# Research Metrics Toolkit (CSU-branded static recreation)

A clean, fully static recreation of [metrics-toolkit.org](https://web.archive.org/web/20241122181517/https://www.metrics-toolkit.org/) (as archived 22 Nov 2024), rebuilt for hosting on GitHub Pages and offline use, and re-branded for Charles Sturt University.

Original content by Robin Champieux, Heather Coates, Stacy Konkiel and the Metrics Toolkit Editorial Board, reused under the
[Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/) (the license shown in the original site's footer). The attribution and license notice are preserved in the footer of every page, and acknowledged on the About page.

## Contents

- `index.html` — homepage with site-wide search (works offline, no backend)
- `metrics.html` — browse all 26 metrics
- `metrics/*.html` — one page per metric
- `about.html`, `schema.html`, `resources.html`
- `css/`, `js/`, `img/` — self-contained assets (no CDNs, no external fonts)

Everything is plain HTML/CSS/JS with relative links — no database, no build step.
It works served from any subpath **or opened directly from a local folder** (double-click `index.html`).

## Publish on GitHub Pages

1. Create a new GitHub repository (e.g. `metrics-toolkit`).
2. Push this folder's contents to the `main` branch.
3. In the repo: **Settings → Pages → Source**: *Deploy from a branch*, branch `main`, folder `/ (root)`.
4. The site will appear at `https://<username>.github.io/metrics-toolkit/` within a minute or two.

The `.nojekyll` file is included so GitHub serves the files as-is.

## Test locally

```bash
python -m http.server 8123
```

Then open <http://localhost:8123>. (Opening `index.html` straight from the file system also works.)
