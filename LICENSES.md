# Licence map

Different parts of this repository are under different licences. This file says which, as accurately as the maintainer can. If something seems to fall between two rows, or a file is missing from the map, open an issue; until it is answered, do not assume the more permissive reading.

| Material | Licence | Text |
|---|---|---|
| Original documentation text (the pages in `docs-site/docs/` and the top-level documents `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `LICENSES.md`, `BRAND.md`, `NOTICE`) | CC BY 4.0 | `LICENSE-docs` |
| Original code, configuration and the docs-site source (site config, components, styles, scripts, `.github/`, `.gitignore`, `.gitattributes`, `tool/`, and original example files unless a file says otherwise) | Apache-2.0 | `LICENSE` |
| Parts derived from Docusaurus (the swizzled component `docs-site/src/theme/MDXComponents/Img/` and the Docusaurus-generated site scaffolding) | MIT notice applies in addition; see `NOTICE` | `NOTICE` |
| Geist font files (`docs-site/static/fonts/`) | SIL Open Font License 1.1 | `docs-site/static/fonts/OFL-geist.txt`, also `fonts/geist/OFL.txt` |
| npm dependencies | Each keeps its own licence | Not redistributed here; they are only locked by name, version and checksum in `docs-site/package-lock.json` and are downloaded from the npm registry when you install them |
| SpliceRun logos and brand assets | Not licensed; a separate narrow permission | `BRAND.md` (no SpliceRun logo is included in this release) |

## Notes

- The hosted SpliceRun platform and its source code are proprietary and are not covered by any licence here.
- This repository is not licensed under the AGPL or any copyleft licence.
- CC BY 4.0 cannot grant rights that SpliceRun does not own. Screenshots of third-party interfaces are not included in this release. Names and logos of other companies' apps that are mentioned in the documentation belong to their owners and are not licensed by this repository.
- The name "SpliceRun" and any SpliceRun logo are not licensed by Apache-2.0 or CC BY 4.0. Apache-2.0 section 6 does not grant trademark rights.
- Fonts and Docusaurus-derived parts keep their original licence and copyright notice. They are not relicensed by being listed here. The Docusaurus MIT notice is reproduced in `NOTICE`.
- Crawler directives (robots.txt and similar) express preferences for the hosted site and do not restrict the rights granted under CC BY 4.0.
- Corrections to documentation sent as issues are accepted under CC BY 4.0 (see `CONTRIBUTING.md`).
