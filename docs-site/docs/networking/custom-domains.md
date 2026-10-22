---
title: Custom domains and HTTPS
description: "Pointing your own domain at your instance with a CNAME to your technical .splicerun.net address (so a server move never needs a DNS change from you), how the HTTPS certificate is issued and renewed, and which lanes support this today."
sidebar_position: 2
---

# Custom domains and HTTPS

:::caution[Not available yet on Shared]

Which lane you are on decides whether this page applies to you.

**Bring Your Own Server - available today.** You give us the hostname you have pointed
at your own box, we check the DNS resolves to it before installing anything, and the
certificate is issued and renewed for you. Everything below describes what actually
happens.

**Shared - not available.** Your instance runs on its own `yourname.splicerun.com`
address, with HTTPS issued and renewed automatically, and there is no way to put a
domain of your own in front of it yet. Your dashboard does not show an instance IP
address, so there is nothing to point a record at.

**Dedicated - not available.** The server side would honour a domain, but nothing in the
dashboard lets you set one, so in practice you get a `splicerun.com` address like Shared.

:::

Your instance runs on a domain you choose. This page explains how to point it, what
happens automatically, and why the order of steps matters.

## What you need

- A **domain or subdomain you control** - anything you can add a DNS record to
- The ability to add a **CNAME record** (or an A record, for a bare domain) at your DNS
  provider

That's it. You don't need to buy a certificate, install anything, or configure a web
server.

## Two addresses, one of them yours

Every Bring-your-own-server instance has a **technical address on our side**, like
`automations-example.splicerun.net`. It is created for you during setup and it always
points at your server. Your own domain points at *that* address, not at the server's IP.

Why it is done this way: when your server ever changes (a move to a new provider, a
bigger box, a replacement after a failure), we update our record and your domain follows
on its own. You never open your DNS panel a second time. [Move to a new server](../data/move-server.md)
depends on exactly this.

*Step 3 of the setup, "Pick your web address": choose **Use a domain I already own**, type your domain (for example `automations.example.com`), and the technical address field below it shows `automations-example.splicerun.net`, with a note that visitors never see it.*

During setup, when you choose **Use a domain I already own**, the technical address is
suggested from your domain. You can change the word if you like; it is checked to be free
as you type. Your visitors never see it.

## Which record to add

The setup screen shows you the exact record for the domain you typed. There are two
shapes, and the screen picks the right one.

*The setup screen then shows a record table: Type `CNAME`, Name `automations`, Points to `automations-example.splicerun.net`, with a note that this is the only DNS change you will make with us.*

**A subdomain, such as `automations.yourcompany.com` (almost everyone):**

| Field | Value |
|---|---|
| Type | `CNAME` |
| Name | The subdomain part only, e.g. `automations` |
| Points to | Your technical address, e.g. `automations-example.splicerun.net` |
| TTL | Default is fine |

**A bare domain, such as `yourcompany.com` with nothing in front:**

Most DNS providers do not allow a CNAME on a bare domain, so the screen shows an A record
instead, pointing at your server's IP address. It works exactly the same way today. The
one difference: if you ever move to a new server, the Switch screen will show you the new
IP to put in this record. A subdomain avoids that step entirely, which is why we suggest
one.

| Field | Value |
|---|---|
| Type | `A` |
| Name | `@` |
| Value | Your server's IP address, shown on the setup screen |

## Where to add it

At the company you bought the domain from (GoDaddy, Namecheap, Cloudflare, Hostinger,
Google, Route 53, and so on), in its DNS settings. Not on your server, and not with your
web host, unless that is also where your domain's DNS lives. The setup screen has a
"Who is that?" picker with a link to your provider's own instructions.

Every DNS provider supports CNAME records. Whether or not *you* use Cloudflare makes no
difference; `splicerun.net` is on our side.

## What happens automatically

Once your name resolves to your server, HTTPS is handled for you:

- A certificate is **issued automatically** from Let's Encrypt the first time your
  domain is reachable, on your server, for your own name
- It is **renewed automatically** before expiry - there is no cron job for you to run
  and no renewal date for you to track
- HTTP traffic is redirected to HTTPS

You do not need to supply a certificate, and there is nothing to configure. A CNAME does
not change what your visitors see: the address bar shows your name, and the certificate is
for your name.

## Why DNS has to come first

Certificate issuance works by proving you control the domain. The certificate authority
requests a specific file over **HTTP on port 80** at your hostname - so the domain has
to already resolve to your instance, and port 80 has to be reachable, *before* a
certificate can be issued.

This is why setup checks DNS before it runs, rather than after. If the domain isn't
pointing at the right place yet, issuing a certificate is impossible, not merely slow.

## DNS propagation

DNS changes are not instant. A new record usually resolves within a few minutes but can
take up to a few hours depending on your provider and the TTL on any previous record.

If you're changing an **existing** record rather than creating a new one, lower its TTL
a day beforehand if you can - the old value is cached for however long the old TTL said.

## Ports that must be open

| Port | Used for |
|---|---|
| **80** | Certificate issuance and renewal, then redirect to HTTPS |
| **443** | Your actual traffic |

Port 80 has to stay open permanently, not just during setup - renewals use it too.
Closing it after setup is a common cause of a certificate that works for a few weeks
and then fails.

## Changing your domain later

Open a support ticket before changing the *name* itself. A new hostname means a new certificate
has to be issued, and sequencing it properly avoids a window where the old name is broken
and the new one isn't ready yet.

Changing the *server* behind the name is different, and needs no support: that is
[Move to a new server](../data/move-server.md), and with a CNAME in place it needs no DNS
change from you either.

## If something goes wrong

See [Custom domain SSL certificate won't renew](../troubleshooting/custom-domain-ssl.md)
for the specific failure cases and what each one means.

---

**Stuck?** [Open a support ticket](https://app.splicerun.com/dashboard/support) from your
dashboard - we'll check what your domain is actually resolving to and tell you what we see.
Replies are best-effort.
