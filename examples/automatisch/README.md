# Automatisch example

Automatisch is an open-source workflow automation tool. This example runs the web/API container, one worker, PostgreSQL and Redis.

Images used: `automatischio/automatisch:0.15.0`, `postgres:16.15-alpine` and `redis:7.4.11-alpine`. See the "Image versions" section for where the tags come from.

> These examples are provided as-is, without warranty. On 2026-10-22, on Docker Desktop 4.91.0 on macOS (Apple silicon, arm64), the author started this example with a throwaway `.env` and dummy values: main, Postgres and Redis became healthy, the worker stayed running, the front page answered HTTP 200, the default admin could sign in, and a flow created through the internal API was still there after `docker compose stop` / `start` and after `docker compose down` / `up -d` (volumes persisted). The compose file adds `DAC_OVERRIDE` to Redis so it can restart with all capabilities dropped (the same fix that Activepieces needed). The logs show only package-licence and experimental-loader warnings. Nothing else was tested (no flow was run, no HTTPS, no upgrade or restore; the backup commands in this README were not run). Read the files, test on a throwaway machine first, and keep backups. This is not a claim of production readiness.

## Requirements

- A Linux machine (or any machine) with Docker Engine and the Docker Compose plugin (v2).
- Memory use was not measured. The test machine gave Docker about 8 GB; start with at least 4 GB free and watch `docker stats`. Disk: the images alone are roughly 1 to 4 GB for this example. Real needs depend on your workflows.
- For HTTPS: a domain name you own and ports 80 and 443 open (see below).

## Start

```sh
cp .env.example .env
```

Edit `.env` and fill in the required secrets: `ENCRYPTION_KEY`, `WEBHOOK_SECRET_KEY`, `APP_SECRET_KEY` (`openssl rand -hex 32` each) and `POSTGRES_PASSWORD`. Never use the placeholder or example values from any file as real secrets.

```sh
docker compose up -d
docker compose ps          # wait until the services show "healthy"
docker compose logs -f main
```

Open <http://localhost:3000>. The port is published on `127.0.0.1` only, so it is not reachable from other machines until you add the proxy below. Open the address. **Important:** on first start Automatisch creates an admin account with the well-known default login `user@automatisch.io` / `sample`. Sign in right away and change the email and password (Settings > Profile) before you add HTTPS and expose it to the internet. Until then the port is only reachable from this machine.

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

The database dump and the file copy below are two separate steps, not a coordinated snapshot. To make them match, stop the application first (`docker compose stop main worker`; leave `postgres` running), take the dump and the file copy, then start the application again. Without that, the files can be newer or older than the database. `docker compose cp` also works on a stopped container. See the Redis note below before stopping.

Database:

```sh
f=automatisch-db-$(date +%F).sql
if docker compose exec -T postgres pg_dump -U automatisch automatisch > "$f"; then gzip "$f"; else echo "pg_dump failed; do not use $f" >&2; fi
```

The dump is written to a file first and compressed only if `pg_dump` succeeded, so a failed dump is not hidden by the compression step (piping `pg_dump` straight into `gzip` would hide it unless `set -o pipefail` is set, which needs Bash or Zsh). Check that the resulting `.sql.gz` is not empty.

Application files (volume `automatisch_storage`):

```sh
docker compose cp main:/automatisch/storage ./automatisch-data-backup
docker compose start main worker
```

Redis holds the job queue (flow runs waiting to be processed). If the Redis data is lost, queued and in-flight jobs are lost with it, so some runs may never happen or may be cut off half-way. Before maintenance (upgrades, restores, moving the volumes), stop whatever starts new runs (disable triggers and schedules, pause incoming webhooks), wait until the queue is empty and no run is in progress, and only then stop the stack; or keep the `redis_data` volume intact and do not use `docker compose down -v`. This example does not back up Redis. Keep a copy of `.env` (it holds the encryption key) separate from the database backup. Store backups on another machine. Test a restore before you rely on it.

Restore the database into an empty one with:

```sh
gunzip -k automatisch-db-DATE.sql.gz
docker compose exec -T postgres psql -v ON_ERROR_STOP=1 -U automatisch automatisch < automatisch-db-DATE.sql
```

Check that `psql` reports no errors.

## Put it behind HTTPS

This example does not do HTTPS itself. Use the Caddy example in `../caddy`: set `UPSTREAM=127.0.0.1:3000` and your own `DOMAIN` there, then start it.

In `.env` set:

```
AUTOMATISCH_HOST=automations.example.com
AUTOMATISCH_PROTOCOL=https
WEB_APP_URL=https://automations.example.com
WEBHOOK_URL=https://automations.example.com
```

Then run `docker compose up -d` again.

## Known limits

- The newest release published by the project at the time of writing is 0.15.0 (August 2025). Check the [project page](https://github.com/automatisch/automatisch) for maintenance status before relying on it.
- The default admin account (`user@automatisch.io` / `sample`) is created on first start. Change it immediately.
- The image is pinned to the release tag; the upstream compose file builds a small wrapper image instead. This example passes the secrets as environment variables and uses the image's own entrypoint; this was run on the date above (see the note at the top) and worked.
- Files with `.ee.` in the name are enterprise features under a separate licence and are not enabled here.
- Redis 7.4 is under the Redis source-available licences (RSALv2 / SSPL), not an open-source licence. Redis 8 adds an AGPLv3 option. Swap the image if that matters to you; it holds the job queue.
- Anonymous telemetry is off by default here (`TELEMETRY_ENABLED=false`).
- `ENCRYPTION_KEY` protects stored connections. If you lose it, they cannot be recovered.
- Resource limits (CPU, memory) are not set, so the containers may use all the machine offers. Add `mem_limit` or `cpus` to the services if you share the machine.
- Do not run two of these examples on the same machine without changing `HOST_PORT` in `.env`.

## Image versions

See the pinned tags in `compose.yaml`. They were the current stable tags on the public registries (Docker Hub and the GitHub container registry) on 2026-10-22. Check for newer versions and security advisories before you deploy.

## Licence

Automatisch is under the [GNU AGPL-3.0](https://github.com/automatisch/automatisch/blob/main/LICENSE) except for files with `.ee.` in their name, which fall under a separate enterprise licence; if you modify it and let others use it over a network, the AGPL requires you to offer them your modified source.

This example (the files in this folder) is not a licence to the software it deploys. Each project's own licence applies to that software.

## No warranty

These examples are provided as-is, without warranty of any kind.
