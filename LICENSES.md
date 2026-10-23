# Licence map

Different parts of this repository are under different licences. This file says which, as accurately as the maintainer can. If something seems to fall between two rows, or a file is missing from the map, open an issue; until it is answered, do not assume the more permissive reading.

| Material | Licence | Text |
|---|---|---|
| Original documentation text (the pages in `docs-site/docs/` and the top-level documents `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `LICENSES.md`, `BRAND.md`, `NOTICE`) | CC BY 4.0 | `LICENSE-docs` |
| Original code, configuration and the docs-site source (site config, components, styles, scripts, `.github/`, `.gitignore`, `.gitattributes`, `tool/`) | Apache-2.0 | `LICENSE` |
| Parts derived from Docusaurus (the swizzled component `docs-site/src/theme/MDXComponents/Img/` and the Docusaurus-generated site scaffolding) | MIT notice applies in addition; see `NOTICE` | `NOTICE` |
| Geist font files (`docs-site/static/fonts/`) | SIL Open Font License 1.1 | `docs-site/static/fonts/OFL-geist.txt`, also `fonts/geist/OFL.txt` |
| Original files in `examples/` (compose files, `.env.example`, `Caddyfile`, `settings.js` and the example READMEs) | Apache-2.0 | `LICENSE` |
| The apps the examples deploy (no upstream code is redistributed here; the files only name upstream container images) | Each app keeps its own licence, listed below | The upstream project's own licence text |
| npm dependencies | Each keeps its own licence | Not redistributed here; they are only locked by name, version and checksum in `docs-site/package-lock.json` and are downloaded from the npm registry when you install them |
| SpliceRun logos and brand assets | Not licensed; a separate narrow permission | `BRAND.md` (the logo files are in `brand/`) |

## Licences of the apps named in the examples

These are summaries for orientation, not legal advice. Read each project's own licence text before you use its software.

| App or image | Licence |
|---|---|
| n8n | Sustainable Use License (source-available, not open source; files marked `.ee.` and the `.ee` directories are excluded from the Sustainable Use License terms and fall under a separate n8n Enterprise licence) |
| Activepieces | MIT, with `packages/ee/` and `packages/server/api/src/app/ee/` excluded from that grant and under a separate enterprise licence (the examples use the Community Edition) |
| Automatisch | GNU AGPL-3.0, with files marked `.ee.` under a separate enterprise licence |
| Huginn | MIT |
| Node-RED | Apache-2.0 |
| Caddy | Apache-2.0 |
| Redis 7.4 (used by the Activepieces and Automatisch examples) | Redis source-available licences (RSALv2 / SSPL), not an open-source licence |
| PostgreSQL (and the pgvector build used by the Activepieces example) | Their own licences (PostgreSQL licence; pgvector under its own licence) |

The Docker images pulled by the examples also contain other software (operating system packages, language runtimes and libraries) under many other licences. This repository does not redistribute any of it.

## Notes

- The hosted SpliceRun platform and its source code are proprietary and are not covered by any licence here.
- This repository itself is not licensed under the AGPL or any copyleft licence. That does not change the licence of an app you run from an example: for instance, Automatisch is AGPL-3.0, and that applies to Automatisch and anything you modify in it.
- CC BY 4.0 cannot grant rights that SpliceRun does not own. Screenshots of third-party interfaces are not included in this release. Names and logos of other companies' apps that are mentioned in the documentation belong to their owners and are not licensed by this repository.
- The name "SpliceRun" and any SpliceRun logo are not licensed by Apache-2.0 or CC BY 4.0. Apache-2.0 section 6 does not grant trademark rights.
- Fonts and Docusaurus-derived parts keep their original licence and copyright notice. They are not relicensed by being listed here. The Docusaurus MIT notice is reproduced in `NOTICE`.
- Crawler directives (robots.txt and similar) express preferences for the hosted site and do not restrict the rights granted under CC BY 4.0.
- Corrections to documentation sent as issues are accepted under CC BY 4.0 (see `CONTRIBUTING.md`).
