# Huginn example

Huginn builds agents that watch the web and act for you (feeds, scrapers, notifications, small automations). This example uses the single-process Huginn image: a web container, a background worker container and PostgreSQL.

Images used: `huginn/huginn-single-process:v2026.10.14` and `postgres:16.15-alpine`. See the "Image versions" section for where the tags come from.

> These examples are provided as-is, without warranty. On 2026-10-22, after the last change to `compose.yaml` (the worker now waits for web to be healthy), on Docker Desktop 4.91.0 on macOS (Apple silicon, arm64), the author started this example with a throwaway `.env` and dummy values: Postgres became healthy, then web became healthy, and only then did the worker start (Compose waits for the web health check; the worker started under a second after web reported healthy), and all three then stayed up, the front page and sign-in page answered HTTP 200, the seeded admin and a second account created with the invitation code could sign in, and the second account was still there after `docker compose stop` / `start` and after `docker compose down` / `up -d` (volumes persisted). In an earlier run of this example (before the worker-wait change) the bundled Smokescreen process was seen running in the web container, and Postgres logged one `database "huginn" already exists` error at every start; Huginn tries to create its database each time and the message is harmless. The database dump command in the Backup section was run once and produced a valid gzip file, and a failing dump (wrong user) was reported as a failure; the restore command was not run. Nothing else was tested (no agents were run, no email, no HTTPS, no upgrade or restore). Read the files, test on a throwaway machine first, and keep backups. This is not a claim of production readiness.

## Requirements

- A Linux machine (or any machine) with Docker Engine and the Docker Compose plugin (v2).
- Memory use was not measured. The test machine gave Docker about 8 GB; start with at least 4 GB free and watch `docker stats`. Disk: the images alone are roughly 1 to 4 GB for this example. Real needs depend on your workflows.
- For HTTPS: a domain name you own and ports 80 and 443 open (see below).

## Start

```sh
cp .env.example .env
```

Edit `.env` and fill in the required secrets: `APP_SECRET_TOKEN` and `POSTGRES_PASSWORD` (`openssl rand -hex 32` each), `SEED_PASSWORD` and `INVITATION_CODE`. Never use the placeholder or example values from any file as real secrets.

```sh
docker compose up -d
docker compose ps          # wait until the services show "healthy"
docker compose logs -f web
```

Open <http://localhost:3000>. The port is published on `127.0.0.1` only, so it is not reachable from other machines until you add the proxy below. Open the address and sign in with `SEED_USERNAME` and `SEED_PASSWORD` from your `.env` (the account is created on first start; changing these later does not change the existing account). New users need `INVITATION_CODE` to sign up.

## Stop

```sh
docker compose stop     # stop, keep everything
docker compose down     # remove containers, keep data volumes
```

`docker compose down -v` also deletes the data volumes. Only use it if you want to erase everything.

## Upgrade

1. Read the project's release notes for the version you are moving to.
2. Make a backup (see below).
3. Change the image tag in `compose.yaml`.
4. Run:

```sh
docker compose pull
docker compose up -d
```

Do not skip major versions without reading the upgrade notes. Databases (PostgreSQL) have their own major-version upgrade steps; do not just change that tag.

## Backup

Database:

```sh
f=huginn-db-$(date +%F).sql
if docker compose exec -T postgres pg_dump -U huginn huginn > "$f"; then gzip "$f"; else echo "pg_dump failed; do not use $f" >&2; fi
```

The dump is written to a file first and compressed only if `pg_dump` succeeded, so a failed dump is not hidden by the compression step (piping `pg_dump` straight into `gzip` would hide it unless `set -o pipefail` is set, which needs Bash or Zsh). Check that the resulting `.sql.gz` is not empty.

Huginn keeps everything in PostgreSQL, so the database dump is the whole backup (there are no application files to copy). Keep a copy of `.env` (it holds the secret token) separate from it. Store backups on another machine. Test a restore before you rely on it.

Restore the database into an empty one with:

```sh
gunzip -k huginn-db-DATE.sql.gz
docker compose exec -T postgres psql -v ON_ERROR_STOP=1 -U huginn huginn < huginn-db-DATE.sql
```

Check that `psql` reports no errors.

## Put it behind HTTPS

This example does not do HTTPS itself. Use the Caddy example in `../caddy`: set `UPSTREAM=127.0.0.1:3000` and your own `DOMAIN` there, then start it.

In `.env` set:

```
DOMAIN=huginn.example.com
FORCE_SSL=true
```

Then run `docker compose up -d` again.

## Known limits

- Huginn is not configured to send email. Add the `SMTP_*` and `EMAIL_FROM_ADDRESS` settings from the [upstream example env file](https://github.com/huginn/huginn/blob/master/.env.example) to the `environment` blocks if you need it.
- Agents fetch whatever URL their owner configures. The bundled Smokescreen egress proxy (`ENABLE_SMOKESCREEN=true`, on by default here) is meant to block private and link-local targets; in the test only its running process was seen, and blocking was not tested. Turn it off only if agents must reach your own network, and then trust your users.
- The JavaScript and shell-style agents can run code; only invite people you trust.
- The upstream project tags images by date (`vYYYY.MM.DD`). The upstream example uses a newer PostgreSQL major version (18) than this example (16); pairing Huginn with PostgreSQL 16 is our choice, not the combination upstream documents.
- Upstream also publishes a multi-process image that bundles MySQL; this example does not use it.
- Resource limits (CPU, memory) are not set, so the containers may use all the machine offers. Add `mem_limit` or `cpus` to the services if you share the machine.
- Do not run two of these examples on the same machine without changing `HOST_PORT` in `.env`.

## Image versions

See the pinned tags in `compose.yaml`. They were the current stable tags on the public registries (Docker Hub and the GitHub container registry) on 2026-10-22. Check for newer versions and security advisories before you deploy.

## Licence

Huginn is under the [MIT licence](https://github.com/huginn/huginn/blob/master/LICENSE).

This example (the files in this folder) is not a licence to the software it deploys. Each project's own licence applies to that software.

## No warranty

These examples are provided as-is, without warranty of any kind.
