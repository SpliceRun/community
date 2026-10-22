---
title: API access
description: "Create an API token and drive your instances programmatically."
sidebar_position: 6
---

# API access

An API token lets a script do what you would otherwise do by clicking in the
dashboard: check an instance's status, power it on or off, change its settings,
apply or roll back a version change, and start or restore a backup.

A token belongs to one team. It can only see and act on that team's instances.

## Creating a token

1. Go to **Settings → API tokens**.
2. Give the token a name that says what will use it - you will see this name in
   the list later, and nothing else identifies it.
3. Choose the scopes it needs (see below).
4. Optionally set an expiry date.
5. Create the token and copy it.

The list shows each token's name, its prefix, its scopes, when it was created,
its expiry if it has one, and when it was last used.

:::caution[The token is shown once]
The full token appears only at the moment you create it. It is not stored in a
form we can show you again, so if you lose it you must create a new token and
revoke the old one.
:::

## Scopes

Every endpoint requires a scope. The three scopes rank from lowest to highest:

| Scope | Grants |
|---|---|
| `read` | Read-only endpoints |
| `write` | Everything `read` grants, plus endpoints that change something |
| `admin` | Everything `write` grants |

A token is accepted if any of its scopes ranks at or above the scope the
endpoint requires. An `admin` token therefore satisfies a `read` endpoint, but a
`read` token never satisfies a `write` endpoint.

Scopes are not the only check. Endpoints that change something also require the
person who created the token to hold the **owner** or **admin** role in the
team. A token cannot do anything its owner could not do in the dashboard, and a
token created by a member or viewer will be refused on write endpoints even if
its scope says `write`.

## Authenticating

Send the token as a bearer token in the `Authorization` header. The base URL is
`https://app.splicerun.com`.

```bash
export SPLICERUN_TOKEN="sr_your_token_here"

curl -s \
  -H "Authorization: Bearer $SPLICERUN_TOKEN" \
  https://app.splicerun.com/api/instances
```

Keep the token out of your shell history and out of source control. Read it from
an environment variable or a secret store, as above.

## Endpoints

These are the endpoints that accept an API token. Anything not listed here is
browser-session only.

| Method and path | Scope | Notes |
|---|---|---|
| `GET /api/instances` | `read` | List the team's instances |
| `GET /api/instances/{requestId}/power` | `read` | Current power state |
| `POST /api/instances/{requestId}/power` | `write` | Also requires the owner or admin team role |
| `GET /api/instances/{requestId}/settings` | `read` | Read instance settings |
| `POST /api/instances/{requestId}/settings` | `write` | Also requires the owner or admin team role |
| `GET /api/instances/{requestId}/updates` | `read` | Available and applied version changes |
| `PATCH /api/instances/{requestId}/updates` | `write` | Also requires the owner or admin team role |
| `POST /api/instances/{requestId}/updates` | `write` | Also requires the owner or admin team role |
| `POST /api/instances/{requestId}/updates/rollback` | `write` | Also requires the owner or admin team role |
| `GET /api/instances/{requestId}/owner-credentials` | `write` | Also requires the owner or admin team role |
| `GET /api/backups` | `read` | Backups and recent backup jobs for the team |
| `POST /api/backups` | `write` | Start a backup, restore, or export. Also requires the owner or admin team role |

`GET /api/instances/{requestId}/owner-credentials` reads as though it should need
only `read`. It requires `write` on purpose, because it returns the credentials
for the instance - a token you hand to a read-only monitoring script should not
be able to retrieve them.

`requestId` is the instance's request ID, which `GET /api/instances` returns for
each instance.

## Revoking a token

Go to **Settings → API tokens** and revoke the token. Revocation takes effect
immediately, and any script still using that token starts failing on its next
call.

Before revoking, check the **last used** column. It is the only reliable way to
tell whether a token is still in service - a token with a recent timestamp is
being used by something, even if you no longer remember what. If in doubt,
create the replacement token first, roll the script over to it, then confirm the
old token's last-used timestamp has stopped moving.

:::note[The API surface is deliberately small]
Only the operations listed above are exposed to tokens. If you need an endpoint
that is not here, open a support ticket describing what you are automating - we
would rather add a specific endpoint than widen a general one.
:::
