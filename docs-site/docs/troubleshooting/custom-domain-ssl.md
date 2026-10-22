---
title: Custom domain SSL certificate won't renew
description: "A custom-domain certificate that will not renew on Bring your own server: what to check, in order."
sidebar_position: 2
---

# Custom domain SSL certificate won't renew

:::info[This page applies to Bring Your Own Server]

Custom domains work on **Bring Your Own Server**, where you point your own DNS at your
own box and we issue the certificate for it.

On **Shared**, your instance runs on a `yourname.splicerun.com` address and there is no
way to point a domain of your own at it yet - so if you are on Shared, nothing on this
page applies. See [Custom domains and HTTPS](../networking/custom-domains.md).

:::

Your browser shows a certificate warning, or HTTPS stopped working on a domain that
worked before.

Certificates renew automatically, so when renewal fails it's almost always because
something changed on the network path between the certificate authority and your
instance - not because the renewal itself is broken.

## The usual cause: port 80 was closed

Renewal proves you still control the domain, and that proof arrives over **HTTP on port
80**. A certificate issued successfully at setup will keep working for weeks after port
80 is closed, then fail at renewal - which makes the change that caused it look
unrelated, because it happened a month earlier.

If a firewall rule, security group, or proxy changed recently, this is the first thing
to check. Port 80 must stay reachable permanently, not just during initial setup.

## Other causes, in the order worth checking

**DNS no longer points at your instance.** If the A record was changed, or the domain
was transferred to a new registrar or DNS provider, the record may not have carried
over. Compare what your domain currently resolves to against the IP shown in your
dashboard.

**A proxy is intercepting the request.** If you put a CDN or proxy in front of your
instance after setup, the certificate challenge may be answered by the proxy instead of
your instance. Either let the proxy handle certificates entirely, or set it to
pass-through so the challenge reaches us.

**The domain expired.** Worth ruling out early - an expired registration stops
resolving, and the certificate error is downstream of that.

**CAA records.** If your DNS has a `CAA` record, it must permit `letsencrypt.org`. Most
domains have no CAA record at all, which is fine - this only applies if one was added.

## What not to do

Don't try to renew manually or run certificate commands on the server. On Shared and
Dedicated plans you don't have server access, and on any plan the certificate is managed
by the web server we install - manual renewal outside it won't take effect and can leave
conflicting state.

There's also nothing to fix in your n8n settings. Certificates sit in front of the
application and are not configured inside it.

## Send it to us

Certificate issuance and renewal is **automatic on every plan** - it's our responsibility, not
application-level work, so there's never a charge for it. See
[What we manage](../plans/what-we-manage.md).

[Open a support ticket](https://app.splicerun.com/dashboard/support) from your dashboard and
include your domain name. The free plan doesn't include human support, so ticket replies are
best-effort. When we look, we check what it
resolves to, whether the challenge is reaching your instance, and what the
last renewal attempt actually returned - and tell you plainly which side the problem is
on.

---

**Related:** [Custom domains and HTTPS](../networking/custom-domains.md) - how issuance and
renewal work, and what has to stay open.
