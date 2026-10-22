---
title: Quickstart
sidebar_label: Quickstart
sidebar_position: 1
description: Create an account, bring a server, and get a working automation instance.
---

# Quickstart

SpliceRun runs your automation app so you can focus on the work - not on Docker,
certificates and night-time restarts.

The app today is **n8n**, and it runs on a server you own:
**Bring your own server** is the only plan open for new orders.

## 1. Bring a server

You rent a VPS from any provider (or use one you already have), and we install and run n8n on
it. Your provider bills you for the server; we charge one flat fee per app. What the server needs,
and the one line you paste to let us in, are on
[Bring your own server](../plans/bring-your-own-server.md).

Still comparing? [Choosing a plan](../plans/choosing-a-plan.md) walks through
the trade-offs, and [What we manage](../plans/what-we-manage.md) is the exact
boundary between our job and yours.

## 2. Run through the setup

1. Create an account at [app.splicerun.com](https://app.splicerun.com).
2. Read the [setup guide](./setup.md) for **before pay / after pay** per lane - what you need ready before you can deploy, and what happens after.
3. Deploy, complete payment, and follow the instance page. Provisioning finishes
   when the instance page says so; we do not publish a fixed "minutes" promise.
4. Open the app and create the **first owner user** there. We never email you an
   initial admin password.
5. Build a small test workflow, then grow.

## 3. Before you build anything real

Three things catch most people out in the first week:

- **Reaching the outside world.** How your workflows call APIs and resolve
  hostnames: [Outbound connections and DNS](../networking/outbound-connections.md).
- **Backups.** What is captured, how often, and how to get it back:
  [Backups and recovery](../data/backups-and-recovery.md).
- **Getting out.** You can take a complete copy at any time:
  [Exporting your data](../apps/n8n/export-your-data.md).

## Already running n8n somewhere else?

Do not rebuild it by hand. [Migrating to SpliceRun](../apps/n8n/migrate-an-existing-n8n.md)
covers the free migration service - what it moves, what it cannot move, and what
we need from you.

## Next steps

- [Setup guide](./setup.md)
- [How pricing works](../billing/how-pricing-works.md)
- [Custom domains and HTTPS](../networking/custom-domains.md)
- [Getting help](../troubleshooting/getting-help.md): open a support ticket from your dashboard
