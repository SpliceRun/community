---
title: Dedicated server
description: "Dedicated is not open for orders. How the lane is designed to work: a VPS for your instance alone, rented and operated by us."
sidebar_position: 4
---

# Dedicated server

:::caution[Not available]
Dedicated is **not open for orders**, and the dashboard does not offer it. Today only
[Bring your own server](./bring-your-own-server.md) can be ordered, and it is free during early
access (see [How pricing works](../billing/how-pricing-works.md)). This page describes the design
of the Dedicated lane so you can compare options. It is not an offer, and nothing here is a
promise that the lane will open.
:::

In the Dedicated design, SpliceRun rents and operates a VPS for your instance alone - not shared
with other customers - and still manages the software on it. You would not SSH in or manage
Docker; the day-to-day surface is the same dashboard as the other plans.

## Who looks after what

| | Dedicated (design) |
|---|---|
| **Server hardware / provider account** | SpliceRun |
| **OS security patching** | SpliceRun |
| **Installed stack (containers, TLS, database)** | SpliceRun - same boundary as in [What we manage](./what-we-manage.md) |
| **Workflows and credentials inside the product** | You |

## Dedicated vs Bring your own server

| | Dedicated | Bring your own server |
|---|---|---|
| Orderable today | No | Yes |
| Who pays the VPS provider | SpliceRun | You |
| Who holds the provider login | SpliceRun | You |
| Root / SSH for day-to-day ops | Us | You grant us a key; you can revoke it |

## If you want your own hostname

Custom domains cannot be set up on Dedicated, because Dedicated cannot be ordered. If you want
to use your own domain today, use [Bring your own server](./bring-your-own-server.md) and follow
[Custom domains](../networking/custom-domains.md).

## What happens to a Dedicated instance that is not paid for

The design differs from the other plans because the server is rented from a provider for you.
The exact windows, and the restore fee, are set out in the
[Billing, Cancellation, and Data Policy](../billing/cancellation-data-policy.md#dedicated). That
page is the authority; nothing here overrides it.
