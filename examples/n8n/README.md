# n8n example

n8n is a workflow automation tool with a visual editor. This example runs one n8n instance (regular mode, no separate workers) with PostgreSQL.

Images used: `n8nio/n8n:2.44.5` and `postgres:16.15-alpine`. See the "Image versions" section for where the tags come from.

> These examples are provided as-is, without warranty. On 2026-10-22, on Docker Desktop 4.91.0 on macOS (Apple silicon, arm64), the author started this example with a throwaway `.env` and dummy values: both containers became healthy, the n8n front page and `/healthz/readiness` answered HTTP 200, an owner account was created and could sign in, and that account was still there after `docker compose stop` / `start` and after `docker compose down` / `up -d` (volumes persisted). No errors in the logs apart from a deprecation warning. Nothing else was tested (no workflows were run, no HTTPS, no upgrade or restore; the backup commands in this README were not run). Read the files, test on a throwaway machine first, and keep backups. This is not a claim of production readiness.

## Requirements

- A Linux machine (or any machine) with Docker Engine and the Docker Compose plugin (v2).
- Memory use was not measured. The test machine gave Docker about 8 GB; start with at least 4 GB free and watch `docker stats`. Disk: the images alone are roughly 1 to 4 GB for this example. Real needs depend on your workflows.
- For HTTPS: a domain name you own and ports 80 and 443 open (see below).

## Start

```sh
cp .env.example .env
```

Edit `.env` and fill in the required secrets: `N8N_ENCRYPTION_KEY` (`openssl rand -hex 32`) and `POSTGRES_PASSWORD`. Never use the placeholder or example values from any file as real secrets.

```sh
docker compose up -d
docker compose ps          # wait until the services show "healthy"
docker compose logs -f n8n
```

Open <http://localhost:5678>. The port is published on `127.0.0.1` only, so it is not reachable from other machines until you add the proxy below. Open the address and create the owner account on the first screen. Do this before you expose the address to the internet.

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

The database dump and the file copy below are two separate steps, not a coordinated snapshot. To make them match, stop the application first (`docker compose stop n8n`; leave `postgres` running), take the dump and the file copy, then start the application again. Without that, the files can be newer or older than the database. `docker compose cp` also works on a stopped container.

Database:

```sh
f=n8n-db-$(date +%F).sql
if docker compose exec -T postgres pg_dump -U n8n n8n > "$f"; then gzip "$f"; else echo "pg_dump failed; do not use $f" >&2; fi
```

The dump is written to a file first and compressed only if `pg_dump` succeeded, so a failed dump is not hidden by the compression step (piping `pg_dump` straight into `gzip` would hide it unless `set -o pipefail` is set, which needs Bash or Zsh). Check that the resulting `.sql.gz` is not empty.

Application files (volume `n8n_data`):

```sh
docker compose cp n8n:/home/node/.n8n ./n8n-data-backup
docker compose start n8n
```

The encryption key is in your `.env`; keep a copy of `.env` in a safe place (a password manager), separate from the database backup. Store backups on another machine. Test a restore before you rely on it.

Restore the database into an empty one with:

```sh
gunzip -k n8n-db-DATE.sql.gz
docker compose exec -T postgres psql -v ON_ERROR_STOP=1 -U n8n n8n < n8n-db-DATE.sql
```

Check that `psql` reports no errors.

## Put it behind HTTPS

This example does not do HTTPS itself. Use the Caddy example in `../caddy`: set `UPSTREAM=127.0.0.1:5678` and your own `DOMAIN` there, then start it.

In `.env` set:

```
N8N_HOST=n8n.example.com
N8N_PROTOCOL=https
N8N_EDITOR_BASE_URL=https://n8n.example.com
WEBHOOK_URL=https://n8n.example.com/
N8N_PROXY_HOPS=1
```

Then run `docker compose up -d` again so n8n picks up the new values. Webhook URLs shown in the editor are built from `WEBHOOK_URL`, so it must be the public address.

## Known limits

- Single instance in regular mode. Queue mode (separate workers, Redis) is not part of this example.
- Anyone who can edit workflows can run code on the container (Code node, Execute Command, HTTP requests to anything the container can reach). Only give editor access to people you trust.
- The editor uses secure cookies. Use `http://localhost` for a local trial or HTTPS for anything else; plain `http` on another hostname will not let you sign in.
- Some features (for example SSO and some permission and environment features) are enterprise-only and are not enabled here. Do not enter an enterprise licence key unless you have bought one.
- `N8N_ENCRYPTION_KEY` encrypts stored credentials. If you lose it, saved credentials cannot be recovered.
- Resource limits (CPU, memory) are not set, so the containers may use all the machine offers. Add `mem_limit` or `cpus` to the services if you share the machine.
- Do not run two of these examples on the same machine without changing `HOST_PORT` in `.env`.

## Image versions

See the pinned tags in `compose.yaml`. They were the current stable tags on the public registries (Docker Hub and the GitHub container registry) on 2026-10-22. Check for newer versions and security advisories before you deploy.

## Licence

n8n is source-available, not open source: it is under the [Sustainable Use License](https://github.com/n8n-io/n8n/blob/master/LICENSE.md), which lets you use it for your own internal business purposes or for non-commercial or personal use, allows sharing only free of charge for non-commercial purposes, and leaves files marked `.ee.` and the `.ee` directories to a separate n8n Enterprise licence; read the text yourself to check that your use fits, this is not legal advice.

This example (the files in this folder) is not a licence to the software it deploys. Each project's own licence applies to that software.

## No warranty

These examples are provided as-is, without warranty of any kind.
