---
title: What we manage
description: "We keep your instance running. You own what runs inside it. The full boundary, including what is deliberately not included."
sidebar_position: 2
---

# What we manage

The short version:

> **We keep your instance running. You own what runs inside it.**

Everything below is that sentence in detail. The keeping-it-running part is automatic: health
checks, backups, updates and certificates run for every instance. The free plan doesn't include
human support; see [Response times](#response-times).

## Included

These are covered on every plan. The automatic checks and fixes run for everyone. Anything else
goes through a support ticket, and the free plan doesn't include human support, so ticket replies
are best-effort.

| | |
|---|---|
| **Your instance is down** | The app or its database is not running when it should be |
| **Setup did not complete** | Provisioning failed or stalled |
| **Restore a backup** | Any snapshot we hold, from your dashboard |
| **OS security patching** | Security updates on the server your instance runs on |
| **HTTPS certificates** | Issuing and renewing |
| **Outbound connectivity** | Your instance reaching the internet, including DNS - see [Outbound connections and DNS](../networking/outbound-connections.md) |
| **Something we changed broke it** | Any SpliceRun update, migration or maintenance action |
| **Billing and account** | Invoices, plan changes, cancellation |

Only **Bring your own server** is on sale today, so the machine itself is always yours. The next
section is where the line falls.

**What "monitoring" means here.** We watch whether your instance is up, whether it answers,
and whether its disk, memory and certificate are healthy. We do not watch whether an
individual workflow inside it is failing, silently skipping a run, or returning the wrong
result - n8n does not expose that to us, and only you know what "correct" looks like for
your workflow. If you want alerts for that too,
[Workflow reliability contracts](https://splicerun.com/pricing) adds it.

## Where the line falls on Bring your own server

On this option the server is yours, so the boundary sits at the software we installed.

| ✅ We look after | ❌ You look after |
|---|---|
| The application stack: containers, database, web server, TLS | The machine itself: hardware, disk space, the provider account |
| Updates, backups, restores, monitoring, moves to a new server | Your hosting provider - outages, billing, suspension |
| Server hardening at setup: firewall, brute-force protection, automatic security updates, password login off if you already sign in with your own key | Anything else you install or run on that machine |
| Operating-system patching, if you chose that option (at setup or later on your instance page) | Keeping our SSH key on the server |

If your server is powered off, out of disk, or your provider suspends the account, that one
needs to go to them. We will tell you clearly when that is what we are seeing.

### Who does what on a server you own

This is your server. You bought it, you own it, and you keep root access to it. SpliceRun
runs the app on it for you. Here is the line between us, in one place.

**SpliceRun does**

- Install the app, its database and the web server, with HTTPS.
- Harden the server at setup: firewall, brute-force protection, automatic security updates.
- Take an encrypted backup every night.
- Apply updates and security fixes in the window you choose, and roll back if an update fails.
- Check the app every five minutes and show the result on your instance page; alerts and emails for an app that is down are sent on a best-effort basis.
- Keep the operating system patched, if you chose that option.
- Move the instance to a new server when you ask, and restore a backup when you ask.
- Record every action we take on your server, with the time, in your dashboard.

**You do**

- Pay your server provider and keep the server running: power, disk, network, bills.
- Keep SpliceRun's SSH key on the server. Remove it and we can no longer back up, update
  or repair anything. You will be reminded by email after 3 days and again after 14.
- Everything inside the app: workflows, credentials, third-party accounts, what your
  automations do.
- Anything you change on the server yourself over SSH. We do not undo it, and we do not
  review it.

**When something breaks**

- App down and you changed nothing: the instance page shows it, and a failed update is rolled
  back automatically. If it stays down, open a support ticket from your dashboard; replies are
  best-effort.
- You changed something on the server or in the app and it broke: restore last night's
  backup yourself, free, from the Backups tab. Paid help beyond that is not offered right
  now.
- Server itself gone (provider trouble, disk failure): press
  [Move server](../data/move-server.md), give us a new server, and we restore your latest
  backup onto it. No charge.

**How we tell what happened**

Your dashboard shows our actions and the last logins to your server side by side:
[Activity on your server](../security/server-activity.md). Our key only works from
SpliceRun's own address, so a login from anywhere else was not us.

**What we do not do**

- Log in to your server for any reason other than the list above.
- Read your workflows, credentials or data as part of running the service. This is a rule we
  follow, not a technical barrier: our SSH key and our backups could in principle reach them. See
  [What our monitoring can see](../security/monitoring-what-we-can-see.md) for exactly what the
  monitoring login can and cannot read, and what SpliceRun could still reach as the operator.

## Not included

Everything inside your application is yours to run. **Paid help inside the application
(hourly help, the monthly App-level help allowance and onboarding calls) is not offered
right now.**

| | |
|---|---|
| Building, fixing or debugging **your workflows** | Yours. Not offered as a paid service right now |
| Third-party credentials and integrations | Yours. Not offered right now |
| Expressions, custom code, custom nodes | Yours. Not offered right now |
| Performance tuning for your specific workload | Yours. Not offered right now |
| Training and "how do I…" questions | Yours. Not offered right now |
| Importing workflows from another host | Free: [Migrating an existing n8n](../apps/n8n/migrate-an-existing-n8n.md) |
| Setup or onboarding session | Not offered right now |
| Alerting on a workflow that is failing or returning the wrong result | Included with [Workflow reliability contracts](https://splicerun.com/pricing), otherwise not monitored |

Current prices for everything we do sell are on the [pricing page](https://splicerun.com/pricing).

## How we work out which side a problem is on

Start with these docs, and with your instance page: it shows what our checks see, and the
Work log shows everything we did. If you still need help, open a support ticket from your
dashboard. Replies are best-effort, and we don't promise a reply time.

**We never bill for support without your agreement in writing.** No surprise invoices, ever.

## Response times

**We do not guarantee a reply time.** The free plan doesn't include human support. Start with
these docs. Support is through support tickets only: open one from your dashboard (**Support**,
or [app.splicerun.com/dashboard/support](https://app.splicerun.com/dashboard/support)). Ticket
replies are best-effort.

Email support@splicerun.com only for important matters a ticket can't cover, such as being
unable to sign in. Other emails may not get a reply. See
[Getting help](../troubleshooting/getting-help.md).

What runs without a person runs for everyone, every day: the health check and its alerts,
nightly backups, updates in your window, and certificate renewal.

**Published times are in UTC.** That covers maintenance windows and backup times.

None of this is a contractual service level with credits attached.

### Out of hours

Open a ticket from your dashboard any time. Replies are best-effort, with
no set days or hours. We are not a 24/7 NOC or SOC.

## Things we cannot do

Stated plainly, because the worst time to learn them is when you need them.

**We do not write the application.** We install, update, monitor and run it. If the software
itself has a bug, we can move you to a fixed version once one exists - that is the whole of
what anyone hosting it can do.

**We can only restore what we hold.** Backups run daily and are kept for the retention period
on your plan. Data created and deleted between two snapshots was never captured, and no
amount of paid work brings it back. If something matters, take a manual backup before you
change it - the button is in your dashboard.

**On Bring your own server we hold no copy of your live data.** It lives on your machine. Our
backups are exactly that - backups - not a second live copy.

## Fair use

The free plan assumes normal use. If usage is sustained far beyond that, we will talk to
you about a plan that fits rather than quietly degrade the service. We would always rather
have that conversation than let it become a surprise.
