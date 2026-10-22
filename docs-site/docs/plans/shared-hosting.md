---
title: Shared hosting
description: "We run your automation app on our multi-tenant host. No VPS, SSH, Docker or OS packages for you to manage."
sidebar_position: 3
---

# Shared hosting

:::caution[Not open for new orders]
Today only [Bring your own server](./bring-your-own-server.md) can be ordered. This page describes how the Shared lane works; the dashboard does not offer it
for a new app, and [Pricing](https://splicerun.com/pricing/) lists only the plan you can buy.
:::

You pay SpliceRun. We run your automation app on **our** multi-tenant host.
You do not manage a VPS, SSH, Docker or OS packages for this lane.

## Before you pay

| Required | Notes |
|---|---|
| SpliceRun account | Sign up at [app.splicerun.com](https://app.splicerun.com) |
| Payment method | Card, via Razorpay |
| Domain | **Not required before pay.** We assign `*.splicerun.com` at launch |

You do **not** need a VPS, root access or DNS ready before checkout on Shared.

## What happens when you pay

1. Checkout creates a provisioning request and a payment.
2. When the payment is confirmed, the **provisioning worker** creates the
   instance automatically - no ticket and no human step on our side for a
   normal Shared order.
3. The instance page shows progress. **We do not promise a fixed “ready in
   2-3 minutes” time.** Provisioning is usually quick on a quiet host; it can
   take longer when images are pulled or the queue is busy.
4. **We do not email initial admin credentials.** When the instance is live,
   open its URL from the dashboard. Complete the app’s first-user signup
   yourself - that becomes the owner account.

## What you do next

1. Open the instance from **Dashboard → Instances**.
2. Create the owner account in the app if you have not already.
3. Build and activate workflows.
4. Your address is a `*.splicerun.com` hostname we assign. **Not available yet**
   for Shared: pointing a domain you own at the instance - see
   [Custom domains](../networking/custom-domains.md) for the BYOS case and the Shared/Dedicated
   status.

## Who patches what

| | Shared |
|---|---|
| **OS security patching** | SpliceRun (unattended security updates on the shared host) |
| **Installed stack (containers, TLS, database)** | SpliceRun |
| **Workflows and credentials inside the product** | You |

See [What we manage](./what-we-manage.md) for the full boundary.

## If something stalls

- Payment succeeded but the instance stays “provisioning”: open a support
  ticket from your dashboard (**Support**, or
  [app.splicerun.com/dashboard/support](https://app.splicerun.com/dashboard/support))
  and include the instance id. We investigate platform-side first, at no charge
  for our failures.
- You cannot complete first signup: open a support ticket with the instance URL.

Ticket replies are best-effort, with no promised reply time. See
[Getting help](../troubleshooting/getting-help.md).
