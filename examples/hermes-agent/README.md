# Hermes Agent example

Hermes Agent is an open-source AI agent that runs on a machine you control. It keeps memory and skills between sessions, can run commands and browse the web, and can be reached from its web dashboard or from chat apps such as Telegram. This example runs one container: the Hermes gateway plus its web dashboard, with the dashboard reachable on `127.0.0.1` only.

This is an unofficial example. Hermes Agent belongs to [Nous Research](https://nousresearch.com) and is released under the MIT licence ([source](https://github.com/NousResearch/hermes-agent), [documentation](https://hermes-agent.nousresearch.com/docs/)). SpliceRun did not make it and is not affiliated with Nous Research. The upstream documentation is the authority; where this README and upstream differ, follow upstream.

Image used: `nousresearch/hermes-agent:v0.22.5`. See the "Image versions" section.

> These examples are provided as-is, without warranty. **Test record (23 October 2026, arm64 Mac, Docker Desktop, image v0.22.5, dummy keys):** the container started and reached "healthy" with the reduced permissions in `compose.yaml`; the health endpoint answered; the dashboard redirected to its login, refused a wrong password and accepted the right one; `hermes doctor` ran; a file-copy backup and a restore into a fresh volume worked once the ownership step below was added. **Not tested:** a real model reply (no real provider key was used), amd64, `hermes import`, a version-to-version upgrade, and Telegram or other chat apps. This is not a claim of production readiness: test on a throwaway machine first and keep backups.

## Requirements

- A Linux machine (or any machine) with Docker Engine and the Docker Compose plugin (v2). The image is published for amd64 and arm64.
- Upstream gives 1 GB RAM and 1 CPU as the minimum and 2 to 4 GB and 2 CPUs as the recommendation; browser tools need at least 2 GB. This example sets `mem_limit: 4g` and `cpus: 2.0` (upstream's own example values), so use a machine with room for that. Disk: upstream suggests 2 GB or more for the data volume; the image is large because it contains a full Chromium, so expect several GB in total. Not measured here.
- **Your own model provider key.** Hermes does not include a model. You create a key with a provider (this example uses OpenRouter), and you pay that provider directly. Set a spending limit in the provider's console on the day you create the key: an agent that works on its own can use far more than a chat window.

## Start

```sh
cp .env.example .env
chmod 600 .env
```

Edit `.env` and fill in every empty value: `OPENROUTER_API_KEY` (your key), `DASHBOARD_USERNAME`, `DASHBOARD_PASSWORD` (long, unique), `DASHBOARD_SESSION_SECRET` and `API_SERVER_KEY` (`openssl rand -hex 32` for each). Never use a value from any example file as a real secret. If any required value is empty, `docker compose` stops at once and prints which one, instead of starting a half-working agent.

```sh
docker compose up -d
docker compose ps          # wait until the service shows "healthy"
docker compose logs -f hermes
```

Open <http://localhost:9119> and sign in with the dashboard username and password from `.env`. The port is published on `127.0.0.1` only. On a remote machine, use an SSH tunnel (also what upstream suggests for a local-only dashboard):

```sh
ssh -N -L 9119:127.0.0.1:9119 you@your-server
```

Then open <http://localhost:9119> on your own computer.

In the dashboard, choose the model on the models page. The key from `.env` is used by the provider you pick; if you choose a different provider, add that provider's key on the dashboard's keys page (it is written to the data volume).

## Chat apps (optional)

To talk to the agent from Telegram or another chat app, follow upstream's page for that app and add the bot token through the dashboard or `docker compose exec hermes hermes setup`. **Set the list of allowed user IDs** (for Telegram, `TELEGRAM_ALLOWED_USERS`, or `GATEWAY_ALLOWED_USERS` for all apps) before you share the bot name with anyone: whoever can message the agent can ask it to run commands. Upstream documents that with no list and no allow-all switch, unknown users are denied; do not turn on an allow-all switch.

## What the agent can do on the machine

By default Hermes runs commands the agent decides on inside this container (terminal backend `local`), guarded by its own approval setting (`approvals.mode`, `smart` by default per upstream's security page). Treat the container as the boundary: the agent can read and use everything inside it, including the keys in the data volume, and can reach any network the container can reach. Do not mount host folders you care about into it, do not run it on a machine that holds other people's data, and read upstream's [security page](https://hermes-agent.nousresearch.com/docs/user-guide/security) before turning approvals off.

## Stop

```sh
docker compose stop     # stop, keep everything
docker compose down     # remove the container, keep the data volume
```

`docker compose down -v` also deletes the data volume (all config, keys, memory and history). Only use it if you want to erase everything. Do not run two Hermes containers against the same data volume; upstream says not to.

## Upgrade

1. Read the project's release notes for the version you are moving to.
2. Make a backup (see below).
3. Change the image tag in `compose.yaml` (see "Image versions").
4. Run:

```sh
docker compose pull
docker compose up -d
```

Upstream documents automatic configuration migrations on startup, with timestamped configuration backups written first. The dashboard cannot update a Docker install in place; update the image tag instead. If an upgrade fails, stop the container and keep the failed state for diagnosis. Restore the pre-upgrade backup into an empty volume using the restore procedure below, including the ownership step, and use the previous image tag. Do not assume an older image can safely read migrated data. Version-to-version upgrades and rollbacks were not tested here.

## Backup

Hermes stores persistent application data under `/opt/data` in the `hermes_data` volume, including configuration, sessions, memories, skills and any credentials saved there. The host `.env` supplies this example's provider key and dashboard credentials; back it up separately. **Treat both backups as credential stores:** keep them encrypted and off the machine.

For a copy that matches itself, stop the agent first (`docker compose cp` also works on a stopped container):

```sh
docker compose stop hermes
docker compose cp hermes:/opt/data ./hermes-data-backup-$(date +%F)
docker compose start hermes
```

Check that the folder is not empty and contains `state.db` and `config.yaml`. Keep a copy of your `.env` too (the dashboard login values are in it).

Hermes also has its own command, `hermes backup`, which writes a zip of the data folder (`--quick` for state only) and leaves out caches, browser profiles and database side files; `hermes import` restores it. Upstream's [CLI reference](https://hermes-agent.nousresearch.com/docs/reference/cli-commands) documents both. Run it as the `hermes` user so the file is not owned by root: `docker compose exec -u hermes hermes hermes backup`. In the test it wrote the zip inside the data folder (`/opt/data/hermes-backup-DATE.zip`), so copy it out with `docker compose cp` and delete it from the volume; `hermes import` itself was not tested.

Restore into an empty setup:

```sh
docker compose up -d --no-start
docker compose cp ./hermes-data-backup-DATE/. hermes:/opt/data
docker compose run --rm --no-deps -u root --entrypoint chown hermes -R 10000:10000 /opt/data
docker compose up -d
```

The `chown` line matters. Files copied in with `docker compose cp` do not get the image's ownership (in the test they kept the host user's ID), and that can stop the runtime `hermes` user (UID 10000) from writing them. In the recorded restore test, startup failed with "Permission denied" errors in `docker compose logs hermes` until ownership was changed to `10000:10000`. After it starts, sign in and confirm your sessions and memory are there. Test a restore before you rely on it.

## What to check

- `docker compose ps` shows `healthy`. The health check asks Hermes' internal health endpoint; it shows the process answers, not that your model key works.
- Send one short message from the dashboard and make sure you get an answer. If not, look at `docker compose logs hermes` first (a wrong or empty-credit key shows there).
- `docker compose exec hermes hermes doctor` runs upstream's own diagnostics (exit code 0 means no unresolved problems).
- `docker stats`: browser tools use a lot of memory.
- Check your provider's usage page once a week at first.

## Known limits

- One container, one data volume, one login. The dashboard login is a single shared username and password with no second factor and no separate accounts; upstream says this login is for trusted networks or a VPN, not for the open internet. For that reason this example does not show how to put the dashboard on a public HTTPS address. If you need that, use one of upstream's other dashboard login types (Nous Portal or your own OIDC provider) and read upstream's dashboard page first.
- The dashboard can read and edit the `.env` in the data volume and can run agent commands. Anyone who gets into the dashboard has everything the agent has.
- The API server inside the container is enabled only so the health check works. Upstream warns that it gives full access to the agent's tools; no port is published for it. Do not publish it.
- No telemetry setting was found in upstream's environment-variable reference; read upstream's documentation about what it sends before you use it with private data.
- Reaching a model provider means your prompts and the agent's tool output go to that provider. Choose a provider whose terms fit your data.
- `cap_drop: ALL`, the five added capabilities and `no-new-privileges` are this example's hardening choices. Container startup and health checks worked with them on arm64 using v0.22.5; model replies and browser or other agent tools were not tested. Future versions or tool workflows may need different permissions; inspect failures and upstream guidance before changing them.
- Do not run two of these examples on the same machine without changing `HOST_PORT` in `.env`.

## Image versions

This example uses `nousresearch/hermes-agent:v0.22.5`, the tag recorded in the test record above. Tags can move. Upstream recommends a digest for an exact deployment pin. Inspect the image with `docker buildx imagetools inspect nousresearch/hermes-agent:v0.22.5` and record its digest before deployment (you can then use `tag@sha256:...` in `compose.yaml`). Check upstream's releases and security advisories before upgrading.

## When to use SpliceRun instead

If you want help operating Hermes Agent, see [SpliceRun's documentation](https://docs.splicerun.com) for its currently supported services and responsibilities. If you are comfortable managing Docker yourself, this example is a starting point.

## Licence

Hermes Agent is MIT-licensed software by Nous Research. The container image also includes other software under its own licences. This example does not replace or alter those licences. The Hermes Agent and Nous Research names identify the upstream project; their use here does not imply endorsement or affiliation.

## No warranty

These examples are provided as-is, without warranty of any kind.
