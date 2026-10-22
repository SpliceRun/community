# Activepieces example

Activepieces is a no-code automation tool with a visual flow builder. This example runs the Community Edition as one app container (API, web UI and worker together) with PostgreSQL and Redis.

Images used: `ghcr.io/activepieces/activepieces:0.92.3`, `pgvector/pgvector:0.8.0-pg14` and `redis:7.4.11-alpine`. See the "Image versions" section for where the tags come from.

> These examples are provided as-is, without warranty. On 2026-10-22, on Docker Desktop 4.91.0 on macOS (Apple silicon, arm64), the author started this example with a throwaway `.env` and dummy values: all three containers became healthy, the front page and `/api/v1/flags` answered HTTP 200, an account was created through the API and could sign in, and it was still there after `docker compose stop` / `start` and after `docker compose down` / `up -d` (volumes persisted). The first restart test failed because Redis could not restart with all capabilities dropped; the compose file now adds `DAC_OVERRIDE` to Redis, and the app container runs with all capabilities dropped except `NET_BIND_SERVICE`; the tests were repeated with these settings and passed. The logs show two `Socket.IO connection error` lines during the first seconds of start-up, which stopped by themselves. Nothing else was tested (no flows were run, no HTTPS, no upgrade or restore; the backup commands in this README were not run). Read the files, test on a throwaway machine first, and keep backups. This is not a claim of production readiness.

## Requirements

- A Linux machine (or any machine) with Docker Engine and the Docker Compose plugin (v2).
- Memory use was not measured. The test machine gave Docker about 8 GB; start with at least 4 GB free and watch `docker stats`. Disk: the images alone are roughly 1 to 4 GB for this example. Real needs depend on your workflows.
- For HTTPS: a domain name you own and ports 80 and 443 open (see below).

## Start

```sh
cp .env.example .env
```

Edit `.env` and fill in the required secrets: `AP_ENCRYPTION_KEY` (`openssl rand -hex 16`, exactly 32 hex characters), `AP_JWT_SECRET`, `AP_API_KEY` (`openssl rand -hex 32` each) and `POSTGRES_PASSWORD`. Never use the placeholder or example values from any file as real secrets.

```sh
docker compose up -d
docker compose ps          # wait until the services show "healthy"
docker compose logs -f activepieces
```

Open <http://localhost:8080>. The port is published on `127.0.0.1` only, so it is not reachable from other machines until you add the proxy below. Open the address and sign up. Activepieces normally makes the first account the administrator (upstream behaviour, not checked in this test), so sign up before you expose the address to the internet.

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

The database dump and the file copy below are two separate steps, not a coordinated snapshot. To make them match, stop the application first (`docker compose stop activepieces`; leave `postgres` running), take the dump and the file copy, then start the application again. Without that, the files can be newer or older than the database. `docker compose cp` also works on a stopped container. See the Redis note below before stopping.

Database:

```sh
f=activepieces-db-$(date +%F).sql
if docker compose exec -T postgres pg_dump -U activepieces activepieces > "$f"; then gzip "$f"; else echo "pg_dump failed; do not use $f" >&2; fi
```

The dump is written to a file first and compressed only if `pg_dump` succeeded, so a failed dump is not hidden by the compression step (piping `pg_dump` straight into `gzip` would hide it unless `set -o pipefail` is set, which needs Bash or Zsh). Check that the resulting `.sql.gz` is not empty.

Application files (volume `activepieces_cache`):

```sh
docker compose cp activepieces:/usr/src/app/cache ./activepieces-data-backup
docker compose start activepieces
```

Redis holds the job queue (flow runs waiting to be processed). If the Redis data is lost, queued and in-flight jobs are lost with it, so some runs may never happen or may be cut off half-way. Before maintenance (upgrades, restores, moving the volumes), stop whatever starts new runs (disable triggers and schedules, pause incoming webhooks), wait until the queue is empty and no run is in progress, and only then stop the stack; or keep the `redis_data` volume intact and do not use `docker compose down -v`. This example does not back up Redis. Keep a copy of `.env` (it holds the encryption key) separate from the database backup. Store backups on another machine. Test a restore before you rely on it.

Restore the database into an empty one with:

```sh
gunzip -k activepieces-db-DATE.sql.gz
docker compose exec -T postgres psql -v ON_ERROR_STOP=1 -U activepieces activepieces < activepieces-db-DATE.sql
```

Check that `psql` reports no errors.

## Put it behind HTTPS

This example does not do HTTPS itself. Use the Caddy example in `../caddy`: set `UPSTREAM=127.0.0.1:8080` and your own `DOMAIN` there, then start it.

In `.env` set:

```
AP_FRONTEND_URL=https://flows.example.com
```

Then run `docker compose up -d` again. This URL is used for webhook and OAuth redirect addresses, so it must be the public address.

## Known limits

- `AP_EXECUTION_MODE` is `UNSANDBOXED` (the upstream default). Code steps run inside the app container and can see its environment, including the encryption key, the JWT secret and the database password. The sandbox modes need extra container privileges that this example deliberately does not grant. Only give access to people you trust.
- Only the Community Edition is enabled (`AP_EDITION=ce`). Enterprise features need a paid licence; do not set an enterprise edition or key unless you have one.
- The database image follows the upstream compose file (PostgreSQL 14 with pgvector). PostgreSQL 14 reaches end of life in November 2026; check upstream before moving to a newer major version.
- The app container runs with all capabilities dropped except `NET_BIND_SERVICE`. This was tested on the date above (start, sign-up, sign-in, restart); running flows was not tested, so if a piece or the engine needs more, add the capability it asks for.
- Redis 7.4 is under the Redis source-available licences (RSALv2 / SSPL), not an open-source licence. Redis 8 adds an AGPLv3 option. Swap the image if that matters to you; it holds the job queue.
- Telemetry is off by default here (`AP_TELEMETRY_ENABLED=false`).
- `AP_ENCRYPTION_KEY` protects stored connections. If you lose it, they cannot be recovered.
- Resource limits (CPU, memory) are not set, so the containers may use all the machine offers. Add `mem_limit` or `cpus` to the services if you share the machine.
- Do not run two of these examples on the same machine without changing `HOST_PORT` in `.env`.

## Image versions

See the pinned tags in `compose.yaml`. They were the current stable tags on the public registries (Docker Hub and the GitHub container registry) on 2026-10-22. Check for newer versions and security advisories before you deploy.

## Licence

Activepieces is open core: most of the code is under the [MIT licence](https://github.com/activepieces/activepieces/blob/main/LICENSE), but `packages/ee/` and `packages/server/api/src/app/ee/` are under a separate commercial enterprise licence that requires an agreement with Activepieces for production use; this example uses the Community Edition only.

This example (the files in this folder) is not a licence to the software it deploys. Each project's own licence applies to that software.

## No warranty

These examples are provided as-is, without warranty of any kind.
