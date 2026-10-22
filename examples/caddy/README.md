# Caddy HTTPS reverse proxy example

A minimal Caddy setup that serves one of the other examples (or any web app on the same machine) over HTTPS on a domain you own. Caddy gets and renews a free certificate automatically.

Image used: `caddy:2.11.7-alpine`. See the "Image versions" section.

> These examples are provided as-is, without warranty. On 2026-10-22, on Docker Desktop 4.91.0 on macOS (Apple silicon, arm64), the author ran `caddy validate` ("Valid configuration") and `caddy fmt --diff` (no changes) on this Caddyfile inside the pinned image, and ran the same Caddyfile with `DOMAIN=http://localhost` as a plain-HTTP proxy in front of a running Node-RED example: the request came back from Node-RED through Caddy (HTTP 200, gzip, `Strict-Transport-Security` and `X-Content-Type-Options` headers added, `Server` header removed, Node-RED login still enforced). Not tested: the backup command, HTTPS and certificate issuance (needs a public domain), and this `compose.yaml` itself, because `network_mode: host` does not reach the Mac on Docker Desktop (the container was run with `docker run` on a Docker network instead, with the same capability and security settings). Read the files, test on a throwaway machine first, and keep backups. This is not a claim of production readiness.

## Requirements

- A Linux machine with Docker Engine and the Docker Compose plugin (v2). The compose file uses `network_mode: host`, which works on Linux only.
- A domain name you own, with a DNS A (and/or AAAA) record pointing at this machine.
- Ports 80 and 443 (TCP, and 443 UDP for HTTP/3) open to the internet, and not used by anything else on the machine.
- One of the apps from this folder (or another web app) already listening on `127.0.0.1:<port>`.

## Start

```sh
cp .env.example .env
```

Edit `.env`:

- `DOMAIN`: your domain, for example `flows.example.com`.
- `UPSTREAM`: where the app listens on this machine (the list in `.env.example` gives the port for each example).
- `ACME_EMAIL`: your email address for the certificate authority.

```sh
docker compose up -d
docker compose logs -f caddy
```

When the logs show the certificate was obtained, open `https://<your domain>`. Remember to also update the app's own address settings (each app's README says how), for example `WEBHOOK_URL` in n8n.

## Stop

```sh
docker compose stop
docker compose down     # keeps the certificate volume
```

## Upgrade

Change the image tag in `compose.yaml`, then `docker compose pull && docker compose up -d`. Read the [Caddy release notes](https://github.com/caddyserver/caddy/releases) first.

## Backup

The certificates and account key live in the `caddy_data` volume. Without a backup Caddy simply requests new certificates after a rebuild (subject to Let's Encrypt rate limits). This is a plain file copy of live data, not a snapshot; for a consistent copy stop Caddy first (`docker compose stop caddy`; `docker compose cp` also works on a stopped container), copy, then start it again:

```sh
docker compose cp caddy:/data ./caddy-data-backup
```

## Changing the Caddyfile

The admin API is switched off on purpose. After editing `Caddyfile`, run `docker compose restart caddy`.

## One proxy, several apps

Add one more site block per domain to the `Caddyfile`, each with its own `reverse_proxy 127.0.0.1:<port>`, and replace the `{$DOMAIN}` / `{$UPSTREAM}` placeholders with real values (or add more variables).

## Known limits

- Linux only (host networking). On other systems run Caddy outside Docker or adapt the compose file.
- Anything on the machine that can reach `127.0.0.1` can reach the apps directly; the proxy adds HTTPS, not login.
- The proxy sends `Strict-Transport-Security` for a year. Only use it on a domain you intend to keep on HTTPS.
- There is no rate limiting, firewall or web application firewall.
- The certificate needs ports 80/443 reachable from the internet. For internal-only names you need Caddy's DNS challenge, which needs a Caddy build with a DNS plugin; that is not covered here.

## Image versions

See the pinned tag in `compose.yaml`: the current stable Caddy 2 tag on Docker Hub on 2026-10-22. Check for newer versions before you deploy.

## Licence

Caddy is under the [Apache License 2.0](https://github.com/caddyserver/caddy/blob/master/LICENSE).

This example (the files in this folder) is not a licence to the software it deploys.

## No warranty

These examples are provided as-is, without warranty of any kind.
