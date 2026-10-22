---
title: Add-ons
description: "Optional extras that extend your plan: extended backup retention, workflow contracts, and more."
sidebar_position: 5
---

# Add-ons

:::note[Early access]
During early access every app is free and nothing renews automatically. What is offered as an
add-on can change; the **Add-ons** page in your dashboard shows what is available to your
account today and is the authority over this page. Terms: see
[How pricing works](../billing/how-pricing-works.md).
:::

Add-ons extend what your base plan includes. Go to **Add-ons** in the left sidebar to
see what is available for your account.

## What add-ons exist

| Add-on | What it gives you |
|---|---|
| **Backup retention - 30 days** | Keeps daily restore points for 30 days instead of the 7 every plan includes. |
| **Backup retention - 90 days** | Keeps daily restore points for 90 days. |
| **Workflow contracts** | Tells you when a workflow **stops running**. See below. |

The available list and prices are shown in your dashboard. Prices shown there are
current - do not rely on a screenshot or a cached page for pricing.

## Workflow contracts

Failure alerts tell you when a workflow **ran and broke**. They cannot tell you when a
workflow **never ran at all** - nothing failed, so there is nothing to report. That is
usually the one that costs you money: the hourly sync that quietly stopped firing, and
nobody noticed for a week.

A workflow contract is you telling us what normal looks like - *"this should run at least
once an hour"*. We count the runs and tell you when reality stops matching.

**Two things must both be true for it to work:**

1. The add-on is active on that instance.
2. **Failure monitoring is switched on** for the instance. Contracts count runs, and with
   monitoring off we do not connect to your instance's database at all. If monitoring is
   off, the contract simply reports nothing - it does not switch monitoring on for you.

We count **how many times** a workflow ran. We do not read what it did, what data it moved,
or how many items it processed - the permission that would allow that is one PostgreSQL
refuses us. See [What our monitoring can see](../security/monitoring-what-we-can-see.md).

## How to request an add-on

1. Go to **Add-ons** in the sidebar.
2. Choose the add-on and the instance it applies to (where relevant).
3. Click **Request**.

**Requesting does not activate the add-on.** If the add-on has a price, it creates a payment
request, and the add-on becomes active only after you pay it. If it is free during early access,
the dashboard says so before you confirm.

## Renewal, removal and refunds

Nothing renews automatically and we do not store your card: a paid add-on lasts for the period
you paid for and is not charged again unless you choose to pay again. To remove an add-on, open a
support ticket from your dashboard. Refunds follow the
[Billing, Cancellation, and Data Policy](../billing/cancellation-data-policy.md#refunds).
