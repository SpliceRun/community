---
title: Choosing a hosting option
description: "SpliceRun runs your automation apps three different ways. They are not tiers of the same thing - this is how to pick."
sidebar_position: 1
---

# Choosing a hosting option

:::caution[Only Bring your own server is open for new orders]
For a new app today, the choice is already made: n8n runs on
[Bring your own server](./bring-your-own-server.md), which is the only plan on
[Pricing](https://splicerun.com/pricing/). Shared and Dedicated are described below for reference;
the dashboard does not offer either for a new app.
:::

SpliceRun runs your automation apps three different ways. They are not tiers of the same
thing - they suit genuinely different situations, and picking the right one at the start
saves you moving later.

| | **Shared** | **Dedicated** | **Bring your own server** |
|---|---|---|---|
| Who owns the server | SpliceRun | SpliceRun, bought for you | **You** |
| Who it suits | Trying things out, small workloads | Production workloads | Teams with existing infrastructure |
| Resources | A fixed slice of a shared machine | A whole machine, yours alone | Whatever your server has |
| Neighbours | Other instances on the same host, isolated from each other | None | None |
| Server billing | Included | Included | You pay your provider directly |
| Support | Support tickets, best-effort, no human support on the free plan | Support tickets, best-effort, no human support on the free plan | Support tickets, best-effort, no human support on the free plan |
| Backups | Daily, included | Daily, included | Daily, included |

The deploy wizard shows one card today, **Bring your own server**, with its price on the card.

## Shared

Your instance runs in its own isolated container, with its own database and its own storage
volume, on a machine shared with other SpliceRun customers. You get a fixed allocation of
CPU, memory and disk.

### What you actually get

These are enforced limits, not guidelines. Your container is capped at exactly these
figures, which is also what stops a busy neighbour taking capacity from you:

| | **Shared XS** | **Shared S** |
| --- | --- | --- |
| CPU | 0.5 vCPU | 1 vCPU |
| Memory | 1 GB | 2 GB |
| Disk | 10 GB | 20 GB |
| Price | $5/mo | $9/mo |

Prices are in US dollars. What each fee does and does not cover is in
[How pricing works](../billing/how-pricing-works.md).

A vCPU is a full core's worth of scheduling time. 0.5 vCPU means your instance can use half
a core continuously, or burst against whatever is idle - n8n spends most of its life
waiting on webhooks and HTTP calls, so a light-to-moderate workflow set fits comfortably.

**Choose this if** you are evaluating, running a handful of workflows, or want the lowest
possible starting cost.

**Consider something else if** you need a lot of memory, run heavy or long workflows, or
have a compliance requirement about shared infrastructure. A workflow that processes large
files, holds big datasets in memory, or runs long CPU-bound loops will feel the 0.5 vCPU
cap - Shared S doubles it, and Dedicated removes the ceiling entirely.

If your instance is being throttled you will see it as slow executions rather than errors.
[Why is my n8n slow?](../apps/n8n/slow-or-high-cpu.md) walks through how to tell
the difference between a resource limit and a workflow problem.

## Dedicated

A whole server, provisioned for you and used by nobody else. You choose the provider and
the size; we buy it, set it up, and manage it.

**Choose this if** the automation matters to your business, you have real workflow volume,
or you want the predictable performance of hardware nobody else is using.

Because you pick the provider, you can weigh cost against network quality and data
location yourself rather than accepting one blended option.

## Bring your own server

You already have a server - at any provider, or in your own rack. You add our SSH key,
point a domain at it, and we install and run the app on your machine.

**Choose this if** you have infrastructure already, a data-residency requirement, an
existing provider relationship or credits, or a policy that the primary copy of your data
must stay on hardware you control.

**Worth knowing before you choose it:**

- The server is yours: the machine, its disk, your hosting account and your relationship
  with your provider stay your responsibility. At setup we also harden it: a firewall,
  fail2ban and the operating system's automatic security updates. See
  [What we manage](./what-we-manage.md).
- You need a domain you control, pointed at the server, before setup runs.
- We hold an SSH key on your machine so we can manage the app. You can revoke it at any
  time, and we remove it automatically when you cancel. See
  [Data and access](../security/data-and-access.md).

Full requirements: [Bring your own server](./bring-your-own-server.md).

## Moving between options

You are not locked in. Because every option runs the same application and the same backup
format, moving is a restore into the new place rather than a rebuild - your workflows and
credentials come with you.

Talk to us before you move so we can sequence it with minimal downtime.

## Which is cheapest?

It depends on more than the SpliceRun price:

- **Shared** has the lowest total cost - one price, nothing else to pay.
- **Dedicated** costs more because it includes a machine nobody else uses.
- **Bring your own server** has the lowest SpliceRun fee, because we are not supplying
  hardware - but you pay your own provider separately. Whether that works out cheaper
  overall depends entirely on what you are already paying them.

Current prices are on the [pricing page](https://splicerun.com/pricing).
