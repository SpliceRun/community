# Node-RED example

Node-RED is a flow-based tool for wiring together APIs, devices and services in a browser editor. This example runs one container with the editor login switched on (Node-RED has no login by default). No database is needed.

Images used: `nodered/node-red:5.0.9`. See the "Image versions" section for where the tags come from.

> These examples are provided as-is, without warranty. On 2026-10-22, on Docker Desktop 4.91.0 on macOS (Apple silicon, arm64), the author started this example with a throwaway `.env` and dummy values: the container became healthy, the front page answered HTTP 200, the admin API refused requests without a login and refused a wrong password, the right password gave a token, and a deployed flow was still there after `docker compose stop` / `start` and after `docker compose down` / `up -d` (volume persisted). The only warnings in the logs are "Projects disabled" and "Encrypted credentials not found" (no credentials existed yet). Nothing else was tested (no flows were run, no HTTPS, no upgrade or restore; the backup commands in this README were not run). Read the files, test on a throwaway machine first, and keep backups. This is not a claim of production readiness.

## Requirements

- A Linux machine (or any machine) with Docker Engine and the Docker Compose plugin (v2).
- Memory use was not measured. The test machine gave Docker about 8 GB; start with at least 4 GB free and watch `docker stats`. Disk: the images alone are roughly 1 to 4 GB for this example. Real needs depend on your workflows.
- For HTTPS: a domain name you own and ports 80 and 443 open (see below).

## Start

```sh
cp .env.example .env
```

Edit `.env` and fill in the required secrets: `NODE_RED_ADMIN_PASSWORD` (`openssl rand -base64 24`) and `NODE_RED_CREDENTIAL_SECRET` (`openssl rand -hex 32`). Never use the placeholder or example values from any file as real secrets.

```sh
docker compose up -d
docker compose ps          # wait until the services show "healthy"
docker compose logs -f node-red
```

Open <http://localhost:1880>. The port is published on `127.0.0.1` only, so it is not reachable from other machines until you add the proxy below. Open the address and sign in with `NODE_RED_ADMIN_USER` and `NODE_RED_ADMIN_PASSWORD` from your `.env`.

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

Do not skip major versions without reading the upgrade notes.

## Backup

Stop Node-RED before copying (`docker compose stop node-red`) so that files are not changed while they are copied; `docker compose cp` also works on a stopped container. This is a plain file copy, not a snapshot.

Application files (volume `node_red_data`):

```sh
docker compose cp node-red:/data ./node-red-data-backup
docker compose start node-red
```

All flows, credentials (encrypted with `NODE_RED_CREDENTIAL_SECRET`) and installed nodes are in the data volume. Keep a copy of `.env` separate from the backup. Store backups on another machine. Test a restore before you rely on it.

## Put it behind HTTPS

This example does not do HTTPS itself. Use the Caddy example in `../caddy`: set `UPSTREAM=127.0.0.1:1880` and your own `DOMAIN` there, then start it.

No setting changes are needed in `.env`. Just start the Caddy example and point it at this port. Node-RED itself speaks plain HTTP to the proxy.

## Known limits

- There is one login and no limit on failed attempts, so use the long random password from the Start step. Login protects the editor and admin API only. Endpoints made with "http in" nodes are public by design; add your own checks inside the flow.
- Anyone who can edit flows can run code on the container (Function and Exec nodes, and installing extra nodes from the palette). Only give editor access to people you trust. There is a single login; roles and multi-user setups need a different `adminAuth` configuration.
- The palette manager can install npm packages from the internet at runtime. To forbid that, add `editorTheme: { palette: { editable: false } }` to `settings.js`.
- `settings.js` is mounted read-only and replaces the default one in the data volume. If you change the settings, edit the file and run `docker compose restart`.
- The credential secret encrypts credentials stored in your flows. If you lose it, those credentials cannot be recovered.
- Resource limits (CPU, memory) are not set, so the container may use all the machine offers. Add `mem_limit` or `cpus` to the services if you share the machine.
- Do not run two of these examples on the same machine without changing `HOST_PORT` in `.env`.

## Image versions

See the pinned tags in `compose.yaml`. They were the current stable tags on the public registries (Docker Hub and the GitHub container registry) on 2026-10-22. Check for newer versions and security advisories before you deploy.

## Licence

Node-RED is under the [Apache License 2.0](https://github.com/node-red/node-red/blob/master/LICENSE).

This example (the files in this folder) is not a licence to the software it deploys. Each project's own licence applies to that software.

## No warranty

These examples are provided as-is, without warranty of any kind.
