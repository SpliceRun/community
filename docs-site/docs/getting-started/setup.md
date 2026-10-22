---
title: Setup guide
description: "The short map for after you create an account: pick your lane, then what you need before you pay and what happens after."
sidebar_position: 3
---

# Setting up your automation instance

This page is the short map for **after you create a SpliceRun account**. Pick your
lane, then follow the right guide. Nothing here invents a SLA or a credential
email that the product does not send.

## Three lanes

:::caution[Only Bring your own server is open for new orders]
For a new app today, go straight to [Bring your own server](#bring-your-own-server) below: it is
the only plan on [Pricing](https://splicerun.com/pricing/) and the only one the dashboard offers.
The Shared and Dedicated sections are kept for reference.
:::

| Lane | Who owns the server | Before you pay | After you pay |
|---|---|---|---|
| **[Shared](../plans/shared-hosting.md)** | SpliceRun | A SpliceRun account | Wait for provision; open the app; **you** create the first admin user |
| **[Dedicated](../plans/dedicated-server.md)** | SpliceRun (we rent the VPS) | Account + a domain you control (recommended) | We provision the box; you point DNS and claim the app owner |
| **[Bring your own server](../plans/bring-your-own-server.md)** | You | A VPS. A domain is optional - you can take a free `splicerun.net` address instead | You tell us where the server is, install the key we then generate, pick the address, and we preflight and install the stack |

If you are still choosing a lane, start with
[Choosing a plan](../plans/choosing-a-plan.md) and
[What we manage](../plans/what-we-manage.md).

## Shared (we host it)

1. Sign in at [app.splicerun.com](https://app.splicerun.com) and open **Deploy**.
2. Pick **Shared**, the size you want, and complete payment.

   **Continue stays greyed out until you have picked both** the hosting style
   and a size - that is the step people get stuck on.

3. Provisioning is automatic. Watch the instance page - there is **no fixed
   “ready in 2-3 minutes” promise**; load, queue depth and image pulls vary.
4. When the status is live, open the instance URL. **There is no email with
   admin credentials.** The first person to complete signup in the app becomes
   the owner (we seed that path so the instance is not left unclaimed).
5. Build workflows. OS security patching, HTTPS and backups are on us - see
   [What we manage](../plans/what-we-manage.md).

Full Shared onboarding: [Shared hosting](../plans/shared-hosting.md).

## Dedicated (we buy the server for you)

1. Have a domain or subdomain ready (A record will point at the server IP we
   show you after provision).
2. Deploy **Dedicated**, choose size/provider options offered at checkout, pay.
3. We create and harden the VPS, install the stack, and attach TLS when DNS is
   correct. Timing depends on the provider - watch the instance page, not a
   marketing estimate.
4. Claim the app owner the same way as Shared: open the URL and complete first
   signup when prompted. No separate “password by email”.

Full Dedicated onboarding: [Dedicated server](../plans/dedicated-server.md).

## Bring your own server

You need the VPS before you start. **A domain is optional**: setup offers a free
`yourname.splicerun.net` address, which we create the record for ourselves, so
there is nothing to do at a registrar and nothing to wait for. If you would
rather use a domain you own, you add one A record pointing at the server - and
that record has to be in place before the HTTPS certificate can be issued.

**You do not need our SSH key yet, and you are not asked for it first.** Setup
asks where the server is before anything else, because the command to install
the key is written using the address you give it. The key pair does not exist
until then; we generate it for your instance and show you the public half with a
ready-made command.

Spec, key install, preflight and post-setup are written in full here:

**[Bring your own server](../plans/bring-your-own-server.md)**

That guide is the product source of truth for BYOS (minimum 1 vCPU / 1 GB RAM /
10 GB free disk, any current Ubuntu or Debian, ports 22/80/443, root or
passwordless sudo).

## First workflow (any lane)

Once the app is open and you are signed in as owner:

1. Add a simple workflow (for example a webhook and a debug/log node).
2. Execute it once from the editor.
3. Activate it only when you are happy with the result.

## Next steps

- [Backups and recovery](../data/backups-and-recovery.md)
- [Custom domains](../networking/custom-domains.md)
- [Outbound connections and DNS](../networking/outbound-connections.md)
- [n8n documentation](https://docs.n8n.io)

---

**Need help?** [Open a support ticket](https://app.splicerun.com/dashboard/support) from your
dashboard. See [Getting help](../troubleshooting/getting-help.md).
