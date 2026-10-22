# SpliceRun documentation site

The customer documentation for SpliceRun, built with [Docusaurus](https://docusaurus.io/).
Published at https://docs.splicerun.com.

## Develop

```bash
npm install
npm run start
```

## Build

```bash
npm run build
```

The static site is written to `build/`. Serve it with `npm run serve` or any static host.

## Layout

- `docs/` - the pages (Markdown), one folder per section; `_category_.json` sets a section's order and title.
- `src/` - theme overrides and styles.
- `static/` - fonts, images, `robots.txt` and response headers.
