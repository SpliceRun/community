---
title: What n8n is on SpliceRun
description: "Workflow automation, installed and operated by SpliceRun on Shared, Dedicated or your own server. What we run, what you own, and where the app-specific pages are."
sidebar_position: 1
---

# What n8n is on SpliceRun

n8n is a workflow automation tool: you build flows that connect APIs, move data between
systems and run scheduled or event-driven jobs. It is the app most SpliceRun customers run,
and it is the only one available on every plan.

We install it, harden the server it runs on (and keep that server patched, if you choose),
hold the certificate, take backups and watch it. You build the workflows and you own the data.

:::note[This is somebody else's software, and we say so plainly]
n8n is built by n8n GmbH. We do not make it and we do not rename it. What SpliceRun sells is
the hosting and the operating around it: installation, updates, HTTPS, backups, monitoring
and support.
:::

## Where it runs

| Plan | Who owns the server | Notes |
|---|---|---|
| **[Shared](../../plans/shared-hosting.md)** | SpliceRun | The quickest way to start |
| **[Dedicated](../../plans/dedicated-server.md)** | SpliceRun, on a VPS we rent for you | A machine of your own, operated by us |
| **[Bring your own server](../../plans/bring-your-own-server.md)** | You | Your hardware, your data, our operating |

What each plan includes is set out in
[What we manage](../../plans/what-we-manage.md), and the fees are in
[How pricing works](../../billing/how-pricing-works.md).

## The pages that are specific to n8n

Everything in this section applies to n8n and not to other apps:

- **[Move an existing n8n in](./migrate-an-existing-n8n.md)** - from your own VPS,
  Coolify, CapRover, Railway or Render.
- **[Move in from PikaPods](./migrate-from-pikapods.md)** - what moves across and what you
  reconnect yourself.
- **[Export your n8n data](./export-your-data.md)** - take a complete copy out whenever you
  want one.
- **[Reset your n8n password](./reset-your-password.md)** - do it yourself from the
  dashboard, without a ticket.
- **[n8n is slow or using high CPU](./slow-or-high-cpu.md)** - telling a workload problem
  from a plan problem.
- **[Community nodes](./community-nodes.md)** - off by default; how to switch them on on your own server
  instead.
- **[Execution history and retries](./execution-history-and-retries.md)** - past runs are
  pruned after 14 days by default, and Retry On Fail is capped by n8n at 5 attempts.

If you already bought a licence from n8n, you activate it yourself and we never see the key:
[Using an n8n licence you have bought](../../account/managing-your-instance.md#using-an-n8n-licence-you-have-bought).

## What is not on this page

Anything that is true whichever app you run lives outside this section, so it does not have
to be written twice and cannot drift apart:

- [Custom domains and HTTPS](../../networking/custom-domains.md)
- [Backups & data recovery](../../data/backups-and-recovery.md)
- [Managing your instance](../../account/managing-your-instance.md)
- [Updates and maintenance windows](../../account/updates.md)
- [Team management](../../account/team.md), [Add-ons](../../account/addons.md),
  [API access](../../account/api-access.md)
- [Security](../../security/data-and-access.md) and the
  [audit trail](../../security/activity-trail.md)
