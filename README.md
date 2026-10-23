# SpliceRun community

Selected documentation and deployment examples exported from a private product; the hosted platform remains proprietary. The hosted service at https://app.splicerun.com is in early access and currently free; see [How pricing works](https://docs.splicerun.com/billing/how-pricing-works).

This repository is a curated export. It is not the source code of SpliceRun, and it is not an open-source version of the platform.

## What is in here

- `docs-site/` : the public documentation site sources (documentation text CC BY 4.0; site code and configuration Apache-2.0).
- `examples/` : self-hosting examples (Docker Compose files, example settings and a README each) for n8n, Activepieces, Automatisch, Huginn, Node-RED and Hermes Agent (an unofficial example for the open-source project by Nous Research), plus a generic Caddy HTTPS reverse-proxy example. Original files are Apache-2.0. Each upstream app keeps its own licence; no upstream code is included, the files only name the upstream images. See `examples/<app>/README.md`.
- Font files used by the documentation (Geist, under `docs-site/static/fonts/`), shipped with their SIL OFL 1.1 licence text. `fonts/geist/` holds a copy of that licence text.
- Legal and community files: `LICENSE`, `LICENSE-docs`, `LICENSES.md`, `NOTICE`, `BRAND.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`.

`LICENSES.md` is the authoritative map of which licence covers which directory.

## What is not in here

- The SpliceRun platform source code (backend, dashboard, workers, billing, support tooling). It is proprietary.
- Customer data, credentials, infrastructure details and internal operations notes.
- Logos. The SpliceRun logo is in `brand/`; it is covered by `BRAND.md`, not by the general licences.
- Any promise that the hosted platform is, or will become, open source.

## Using the hosted service

The hosted service at https://app.splicerun.com is in early access and currently free. This may change; see [How pricing works](https://docs.splicerun.com/billing/how-pricing-works). Create an account there; nothing in this repository is needed to use it. The documentation in `docs-site/` describes how the hosted service works.

## Examples

`examples/` has one folder per app: `n8n`, `activepieces`, `automatisch`, `huginn`, `node-red`, `hermes-agent`, and `caddy` (a generic HTTPS reverse proxy for any of them). Each folder has a `compose.yaml`, a `.env.example` and a README with start, stop, upgrade and backup steps. The Hermes Agent example was tested separately on 2026-10-23; its README has its own test record.

What was tested: on 2026-10-22, on Docker Desktop on macOS (Apple silicon, arm64), each app was started with a throwaway `.env` of dummy values, its front page answered, and data kept in the volumes was still there after a stop/start and a down/up. Caddy was only checked with `caddy validate` and as a plain-HTTP proxy in front of Node-RED. Nothing more was tested: no workflows or flows were run, and there was no HTTPS, no upgrade, no restore and no run on a Linux server. Each example README states exactly what was run. The examples are provided as-is, without warranty, and are not a claim of production readiness. Read the files and try them on a throwaway machine first.

The apps are published by their own projects under their own licences (see `LICENSES.md`). SpliceRun is not affiliated with them.

The public CI checks that every `examples/*/compose.yaml` is a valid Compose file (`docker compose config`); it does not start any container.

## Contributing

Please read `CONTRIBUTING.md`. In short: open an issue. Use the "Bug" or "Docs fix" form.

## Maintainer absence notice

Issue replies are best-effort; no response time is promised.

- Use issues only. Outside pull requests are disabled for now.
- There is no response-time promise of any kind. A quiet issue is not a rejected issue.
- Security reports follow `SECURITY.md`, which has the same limits.

## Licence summary

Documentation is CC BY 4.0. Code and configuration (the documentation site setup and the original example files) are Apache-2.0. The apps named in the examples keep their own licences. Fonts keep their own SIL OFL 1.1. Brand assets are not under the general licences. See `LICENSES.md`.
