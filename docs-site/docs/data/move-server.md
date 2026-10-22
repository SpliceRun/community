---
title: Move to a new server
description: "Move a Bring-your-own-server instance to a different machine from your dashboard, with nobody at our end. Works whether or not the old server still exists. Your plan, payments and address do not change."
sidebar_position: 3
---

# Move to a new server

You can move a **Bring your own server** instance from one machine to another yourself,
from the instance page. We install a fresh copy of the app on the new server, restore your
latest backup into it, check it is healthy, and then, when you say so, point your address
at it. Your plan, your payments, your SSH key and your address stay exactly as they are.
It is the same instance on a new machine. **A move is not a new order and costs nothing.**

It does **not** need the old server to be
alive. The copy comes from our backup, not from the old machine, so this is also how you
recover if a provider loses your server.

:::info[When you would use this]
- Your provider raised prices, or you found a better one.
- The server is too small and you want a bigger one.
- The old server has died, been suspended, or lost its disk.
- You are consolidating or separating client instances across machines.
:::

## Before you start

You need **one thing**: a new server you can log in to as root (or a user with sudo), the
same kind of server you used the first time. Any provider, any size that meets the
[minimum for your app](../plans/bring-your-own-server.md). The old server keeps
running throughout. Nothing on it is deleted by us.

If your instance uses your own domain, check how it is pointed at the server. A **CNAME to
your `.splicerun.net` address** means the move needs nothing from you at all. An **A record
to the old IP** means one DNS change at the end, and the Switch screen tells you exactly
what to type. [How the two differ](../networking/custom-domains.md).

## Step 1: tell us about the new server

Open the instance: **Move server** is on its Overview, under the launch banner.

1. **Your new server's address**: its IP address or hostname.
2. **SSH port** and **SSH user**: usually `22` and `root`, exactly as for the first setup.
3. **Copy this backup**: the newest backup is selected. Pick an older one only if you want
   to move to an earlier state on purpose.
4. **Add this instance's existing key to the new server.** Copy the line shown, log in to
   the new server as root, paste it, press Enter. It prints nothing, and that is success.
   It is the same key your instance already uses, so nothing else about your access changes.
5. Press **Start move**.

Nothing has changed for your users at this point. The current server keeps serving until the
copy starts.

## Step 2: we build the new server

This part runs on its own and the card updates itself. You will see, in order:

| What the card says | What is happening |
|---|---|
| Setting up the new server | We install the app (and, for n8n, its database) and the web server on the new machine, exactly as we did the first time. Firewall and brute-force protection are applied. |
| Copying your data | Your chosen backup is restored into the new server: its database, files and encryption key. Workflows arrive **switched off** so nothing runs twice while both servers exist. |
| Ready. Check the new server, then press Switch | The new server answered a health check. Your current server is still the live one. |

Provisioning usually takes a few minutes; the copy depends on how much data you have. If a
step fails, the new server is rolled back to empty, your current server is untouched, and the card tells you why in plain words.

## Step 3: check, then press Switch

*The Move server card, once ready, says: "Ready. Check the new server, then press Switch on 198.51.100.9. Your instance is still serving at its current address (n8n.example.com), and nothing has been deleted." with the **Switch** button below it.*

This is your moment to look at the new server if you want to: its IP is shown on the
card. When you are happy, press **Switch**. In one step we:

1. point your instance record at the new server,
2. update your `.splicerun.net` address to the new IP (so a CNAME pointed at it follows
   automatically),
3. switch your n8n workflows back on, exactly the ones that were on before,
4. stop the app on the old server.

Within about a minute your address reaches the new machine. HTTPS is issued on the new
server automatically once your name resolves to it.

The old server is **stopped, not deleted**. Its data and the backups taken from it stay
restorable for the normal retention window. Cancel it with your provider whenever you are
ready.

## If your domain is an A record

If your own domain points at the old server's IP directly (an A record rather than a CNAME
to your `.splicerun.net` address), one more step is yours: change that A record to the
new IP shown on the Switch screen. Until you do, visitors still reach the old server.
Everything else is done. To avoid this next time, use the CNAME:
[custom domains](../networking/custom-domains.md#which-record-to-add).

## What does not change

- **Billing.** Same plan, same dates, same invoice. A move is not a sale.
- **Your address.** `yourname.splicerun.net` and your own domain keep working.
- **Your SSH key.** The same SpliceRun key; you added it to the new server yourself.
- **Your data.** Restored from the backup you chose. Anything created on the old server
  *after* that backup and before the switch is not on the new one. For a busy instance,
  take a fresh backup (Backups tab, **Back up now**) right before you start the move and
  choose it.

## What can go wrong, and what you see

| Situation | What happens |
|---|---|
| New server refuses our key | "Setting up the new server" fails with the reason. Re-run the key line on the new server and start again. |
| New server is the same machine as the old one | Refused before anything starts. |
| Backup cannot be read or does not belong to this instance | Refused before anything starts, with the reason. |
| Health check fails on the new server | The new server is rolled back to empty, the old one is untouched. The card says what failed. |
| Old server unreachable at Switch | The switch completes; we could not stop the old app and say so. Stop it yourself with your provider, or leave it. |

Every stage is recorded in the instance's **Work log** and in
[Activity on this server](../security/server-activity.md), with times.

## Related

- [Backups and recovery](./backups-and-recovery.md): what is in a backup and how restores work.
- [Custom domains and HTTPS](../networking/custom-domains.md): CNAME to your technical address so moves need nothing from you.
- [What we manage](../plans/what-we-manage.md): who does what on a server you own.
