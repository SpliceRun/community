---
title: Bring your own server
description: "Run your automation on hardware you own, and let SpliceRun operate the software on it. You keep the server and the primary copy of your data."
sidebar_position: 5
---

# Bring your own server

Run your automation on hardware you own, and let SpliceRun operate the software on it. You
keep the server, the provider relationship and the primary copy of your data. We handle
installation, keeping the application patched, backups and monitoring.

:::tip[Right now: every app is free]
SpliceRun is in early access: every app is free, for everyone, until at least 31 May 2027. It
covers every server and every app on it, it is applied automatically at checkout, and no card
is needed. Nothing is ever charged automatically, and if we introduce pricing, you'll get at
least 30 days' notice by email first.

Full terms, including what happens after 31 May 2027:
[Early access](../billing/how-pricing-works.md#early-access-every-app-is-free).
:::

:::note[One line worth reading twice]
We keep **the app** patched - n8n and everything we installed alongside it. We will also keep
**the operating system** patched, including the restart that some fixes need, but only if you
tell us we may. We ask you that question once, when you hand the server over, and
[Keeping the server itself patched](#keeping-the-server-itself-patched) below explains both
answers. Say no and the job is yours - it is two commands.
:::

## What you need before you start

| | Minimum | Notes |
|---|---|---|
| **CPU** | 1 vCPU | 2 or more if you run many workflows at once |
| **Memory** | 1 GB | 2 GB+ is more comfortable for heavier use |
| **Free disk** | 10 GB | Covers the app, its database, logs and backup staging |
| **Operating system** | Any current Ubuntu or Debian | We test on Ubuntu 22.04, 24.04 and 26.04, and Debian 12 and 13. A newer release still works, and setup notes that we have not tested it yet before carrying on |
| **Architecture** | x86_64 or arm64 | |
| **Network** | A public IP address, with ports **22**, **80** and **443** reachable | 80 and 443 are how your workflows and webhooks are reached |
| **Docker** | Not required | We install and manage it as part of setup |
| **Ports 80 and 443** | Free, or already served by your own web server | If another web server is using either one, setup puts the app behind it instead - see [If your server already runs a website](#if-your-server-already-runs-a-website) |

Any provider works. There is nothing provider-specific in what we do - we only need a
reachable server running a supported operating system.

## A web address - ours, or one you own

You need an address to open your app at. There are two ways, and setup asks you to
pick one.

**Use a free SpliceRun address.** We own `splicerun.net`, so you choose a name -
`yourcompany.splicerun.net` - and we create the record ourselves. There is nothing
to do at a registrar and nothing to wait for. This is what setup offers first,
and it is the quickest way to get running.

**Use a domain you already own.** For example `automation.yourcompany.com`. You add
one **A record** pointing at your server's IP address, at the company you bought the
domain from. Setup shows you the exact three values to enter and links to your
registrar's own instructions. It usually takes effect within minutes.

Either way the HTTPS certificate is requested and renewed automatically once the
address resolves - there is nothing for you to buy or install. If you use your own
domain, the record has to be in place before the certificate can be issued.

## Setting it up

Setup is one page with four steps, and each one opens when the step above it is
answered. You can reopen any of them afterwards to change what you entered.

### 1. Where is your server?

Three boxes: your server's **address**, the **SSH port**, and the **SSH user**. All
three come from your hosting provider's control panel.

Leave the port at `22` and the user at `root` unless you changed them yourself, or
your provider gave you a different login name. The user must be `root`, or a user
with passwordless `sudo` - we need that to install Docker and to bind ports 80 and
443.

### 2. Let us onto it

Only now do we generate an SSH key pair for your instance and show you the public
half, with the command already written using the address you just gave us.

You run two lines on your own computer - Terminal on a Mac, PowerShell on Windows.
First you log in to your server:

```bash
ssh root@your-server-address
```

It asks for a password, which is in your hosting provider's panel and nowhere in
SpliceRun. **Nothing appears on screen while you type it** - no dots, no stars. That
is normal.

Then you paste the line your dashboard shows into that same window:

```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo '<the key shown in your dashboard>' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys
```

**It prints nothing at all. That is what success looks like.** The key can be viewed
again at any time from the instance page, so there is no need to save it now.

### 3. Pick your web address

Choose the free `splicerun.net` address or enter a domain you own - see
[A web address](#a-web-address---ours-or-one-you-own) above. If you use your own
domain, this step prints the exact **Type**, **Name** and **Points to** values for
your registrar's form, and tells you which of them is the one people usually get
wrong.

### 4. Updates, and one permission

Two separate decisions.

First, **when we may update your app**: a day and an hour. Updating takes the app
offline for a minute or two, so pick a time when nothing important is running. The
hour is given in UTC with your own local time shown beside it.

Second, **what should happen when the whole server needs restarting**. Some security
fixes only take effect after a restart, and that takes the machine down for a few
minutes - including anything else you run on it. It is your machine, so this one is
your call:

- **SpliceRun restarts it, inside the window above.** Never while a workflow is
  running, never twice in one day, and we tell you before and after.
- **Email me and I will restart it myself.** We still install the fixes, but
  **they stay inactive until you restart**, so a server that is never restarted keeps
  running the old software.

**Neither is chosen for you.** Nothing is pre-ticked and you cannot finish this step
without answering, because a box that arrives ticked records agreement nobody gave.
You can change the answer later.
[Keeping the server itself patched](#keeping-the-server-itself-patched) explains both
answers in full.

### Then: run the check

Press **Test my server**. We connect and check:

- The SSH key works
- The operating system is supported
- There is enough CPU, memory and disk
- The user can install software
- Whether ports 80 and 443 are free, or already served by your own web server
- Your address resolves to this server

Each result names what to fix if it fails, and only the failing ones get an
instruction. **Nothing is installed and nothing is charged at this stage** - run it
as many times as you like.

### Confirm and let setup run

Once payment is confirmed, setup begins. We install Docker if it is not already
there, set up the application, its database and a web server, request your
certificate, and run a health check.

You can watch the whole thing on the instance page - every step is logged in plain
language as it happens.

## After setup

Your instance page shows what we see: whether the app is running, how much CPU and memory it
is using, how full the server's disk is, recent logs, and a record of every action we have taken
on your server.

From there you can back up on demand, restore any snapshot, check for updates, and revoke our
access.

**The disk is yours, so we watch it for you.** Every five minutes the check reads how much of
the server's disk is in use and how much is free, and the Disk cell on your instance page shows
the same percentage `df -h` prints on the server itself. At **85%** an alert appears on your dashboard and we email you; at **95%** we
email once more and say it is the last one. We do not repeat either while the disk stays where
it is, and the record clears once it drops back under 80%, so a disk that hovers around the line
does not fill your inbox. When a disk does fill, two things stop: we refuse to update because there
is no room to pull the new version, and the app can no longer write, so runs start failing. Your
backups are not affected; they are streamed off the server as they are taken and stored
elsewhere. If several of your apps share one server, that is one email naming all of them. We
never delete anything on your server to make room.

You can also change your instance's own settings - the execution time limit, how long run
history is kept, the payload ceiling, and the **timezone your scheduled workflows use**. See
[Settings you can change](../account/managing-your-instance.md#settings-you-can-change), and
check the timezone before you rely on a schedule: n8n defaults to UTC, and a run set for 9am
fires at 2:30pm if you are in India with nothing to tell you.

**Because the machine is yours, this lane can do something the shared platform cannot: run
your workflows on separate worker processes.** By default n8n executes inside the same
process that serves the editor, so one heavy run slows everything down no matter how many
cores the box has. Workers give execution its own processes - the editor stays responsive and
runs happen in parallel. Choose 1, 2 or 3 on your instance page; each uses roughly 400 MB of
your server's memory. See
[Running workflows on separate workers](../account/managing-your-instance.md#running-workflows-on-separate-workers).

## Running more than one app on the same server

You can. One server can hold several of the apps we manage, each on its own
address, and we handle the routing between them.

Two things to know before you do:

**The listed price for the first app on a server is $12 a month. Each additional app on that
same server is listed at $5.** So three apps on one server are listed at $22 a month, not $36.

:::tip[Early access covers every app]
During early access additional apps are free too, and so is any second server: you are
charged $0 for all of them. The $12 and $5 above are the listed prices, shown struck through
next to $0.
:::

The split follows what the work actually is. Looking after the machine - security patches,
restarts, the firewall, the web server in front, watching the box - costs the same whether one
app or five are sitting on it. What genuinely scales is the app-shaped work: updates, backups,
restores, and answering your questions. So the machine is charged once and each app after the
first is charged for its own share.

Putting apps together on one server saves you the cost of the extra servers, which is yours and
never ours, and it lowers our fee too.

**They share the machine, so they share its limits.** Memory, CPU and disk are finite and the
apps compete for them. If one app is busy, the others feel it. We tell you on each instance
page what that machine is using, but only you can decide whether it is enough - it is your
server and your sizing decision.

Each app is still fully separated from the others: its own database, its own storage, and its
own private network. One app cannot reach another app's data, even on the same machine.

## Limits we set so one app cannot take down the server

**Each app set up or moved since 27 September 2026 has a memory limit, and it comes from your
server.** (An app set up before then gets it the next time we set it up again or move it.) When we set an app up we read how
much memory the server has and let the app use all of it except a share kept back for the server
itself: the larger of 1 GB and a fifth of the memory. The limit never goes below the app's own
minimum (1 GB for n8n), so on a server at that minimum it is no tighter
than the server. If your server has swap, the app can also use swap up to the same size, so it
slows down before it reaches the limit. If an app reaches its limit, the process in that app using
the most memory is stopped, and the next five-minute check writes a line in that app's Work log
saying when. The app normally starts that process again by itself. We also tell the operating system that, if the whole server runs out of
memory, an app is what it stops first - not its database, and not your SSH access. With separate
workers switched on (n8n), the app's limit is shared between its main process and its workers. The
limit is not divided between apps: each may use everything but the share kept back, so two busy apps can
still run the server short, and the answer then is a bigger server.

**The web front door limits requests from any one address.** When our front door serves your app
(not when it sits behind your own web server, where the limits are yours to set), each visitor
address may make at most:

| Requests | Limit |
|---|---|
| Sign-in attempts to the app, and the one-click Open link | 20 a minute |
| Webhooks, forms, MCP and OAuth callbacks | 600 a second |
| Everything else, including the n8n editor | 600 every 10 seconds |

Past a limit the visitor gets `429 Too Many Requests` with a `Retry-After` header until their
count drops. Each app on the server counts separately. This stops one address flooding your
server; it is not protection against an attack from many addresses at once. If you put your own
hostname behind a proxy such as Cloudflare, the counts are per proxy address, not per visitor. If
your server also answers on IPv6, visitors arriving over IPv6 may be counted together, depending on
how Docker passes those connections on.

**A restart affects all of them.** Operating system security updates sometimes need the server
to restart, and a restart takes down every app on it plus anything you run yourself. That is
why we ask you, once, what we may do about that - see
[Keeping the server itself patched](#keeping-the-server-itself-patched) below. We will not
restart your server until you have answered.

## If your server already runs a website

You do not have to move it, stop it, or give us the whole machine.

Most setup guides for self-hosted software quietly assume they own the server. Ours does not.
When we run the check in step 4 and find something already serving on port 80 or 443 - your
own site, a control panel, anything - we leave those ports exactly where they are and set up
the app (n8n) behind whatever is already there.

What changes:

- n8n runs on your server, listening only on `127.0.0.1` - not reachable from the internet on
  its own, which is what you want when something else is the front door.
- Your instance page shows the exact configuration to add to your web server, for **nginx**,
  **Caddy** or **Traefik**. Copy it, paste it, reload. That is the whole job.
- Your existing certificate keeps working, because your web server is still the one handling
  it. We do not touch your certificates and we do not ask for your DNS.

The configuration we give you is not a generic reverse-proxy snippet. It carries the four
settings n8n specifically needs and that a hand-written one usually misses: the WebSocket
upgrade, without which the editor loads but never shows a workflow running; the long timeouts,
without which any run over a minute is cut off; the upload limit, without which file webhooks
fail with an error n8n cannot explain; and the forwarded-address headers, without which every
entry in your n8n audit log records your proxy instead of the real caller.

Nothing else about your instance differs. Backups, updates, monitoring, workers and support
all work exactly the same way.

## What stays yours

The server is yours: the machine, its disk, your hosting account and your relationship with
your provider stay your responsibility, as does anything else you install on it. We look after
the software we installed, and at setup we also harden the server: a firewall, fail2ban and the
operating system's automatic security updates. The full boundary is in
[What we manage](./what-we-manage.md).

## Keeping the server itself patched

Whether this job is yours or ours is your choice, so it is worth being precise about.

**What we patch either way:** the app, in your maintenance window - see
[Updates and maintenance windows](../account/updates.md).

**The operating system is the part we ask about.** Ubuntu and Debian ship security fixes for
the kernel, OpenSSL, systemd and everything else on the machine, and some of those only start
working once the server has been restarted. Restarting a machine we do not own is not a
decision we will make without being told, so we ask you once, at the point you hand the server
over, and we record your answer.

### The question we ask you, once

It is a choice between two answers on the screen where you give us your server details, and
neither is picked for you:

> **SpliceRun restarts it, inside the window above.**
>
> **Email me and I will restart it myself.**

**Choose SpliceRun restarts it** and the operating system stops being your job. We install security updates
and carry out the restart they need, and we do it carefully:

- only inside the maintenance window you choose
- never while one of your apps is busy: an n8n workflow running
- never twice in the same day
- one server at a time across our whole fleet, never a sweep, so a bad kernel update can only
  ever affect one customer before we stop

**Choose Email me** and security fixes are still installed, by the operating system's own
automatic security updates, which setup switches on for every server, but we will never restart
your server. We email you when your server says a restart is due and you do it yourself. Be aware
of what that means: the fixes sit installed and inactive until the restart happens, so a server
that is never restarted keeps running the old, vulnerable software however many updates it has
installed.

Either way you can change your mind later, on the instance page, and you can pick **Leave the
operating system alone entirely** there too.

:::caution[The one thing we cannot do]
A restart takes down the **whole machine** for a few minutes - every app on it, including
anything you run on it yourself that we cannot see from here.

And if the server does not come back, **only you can reach its rescue console**, because the
server belongs to your hosting account and not to us. We will tell you immediately if that
happens, but we cannot fix it for you. That is the honest trade of owning the hardware, and it
is why we ask rather than assume.
:::

### If you would rather do it yourself - two commands

On any current Ubuntu or Debian:

```bash
sudo apt update && sudo apt install -y unattended-upgrades
```

```bash
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

Answer **Yes**. That is the whole job. Your server will install security updates on its own,
which is exactly what we do on our own machines.

To check it is working:

```bash
sudo unattended-upgrades --dry-run --debug | tail -20
```

### The part people miss: reboots

Some updates - kernel and core library fixes especially - **only take effect after a
reboot**. A server can be fully patched and still running the old, vulnerable kernel.

To see whether yours is waiting on one:

```bash
[ -f /var/run/reboot-required ] && cat /var/run/reboot-required || echo "no reboot needed"
```

Rebooting takes your instance offline for a minute or two while the machine comes back. Pick a
quiet time and do it deliberately.

If you chose SpliceRun restarts it, this is the part you have handed to us and you can stop
reading here - we watch for it and do it in your window.

### Why we ask instead of just deciding

| | What you get | What it costs |
|---|---|---|
| **You let us do it** (SpliceRun restarts it) | The operating system stops being your job. Fixes are installed *and* activated, in your window, one server at a time | We restart a machine that may be running things we cannot see. If it does not come back, only you can reach the console |
| **You keep it** (Email me) | Nothing we run ever restarts your server. You choose the moment | You have to reboot deliberately, and until you do, every kernel fix your server installs is inactive |

Neither answer is wrong. What would be wrong is us picking one for you silently, which is why
the question exists and why we record who answered it and when.

If you would rather not think about the server at all, that is exactly what **Shared** and
**Dedicated** are - on those the machine is ours, we patch it daily, and there is nothing to
answer. See [Choosing a hosting option](./choosing-a-plan.md).

## Removing our access

You can remove our SSH key at any time from the instance page. Your instance keeps running - removing the key only stops us managing it, so updates, backups and monitoring stop with it.

When you cancel, we remove the key automatically (straight away during early access, or 30 days
after the app stops on a paid term), check that it no longer works, and record the result in the
Work log. See
[Data and access](../security/data-and-access.md).

## Common problems

**"Could not connect over SSH."** The key is not in `authorized_keys` for the user you told
us, the SSH port is different from what you entered, or a firewall is blocking us. Check the
port first - it is the most common cause.

**"Ports 80 or 443 are in use."** Something else is already serving web traffic - usually
nginx or Apache from a previous setup. Stop it, then run the check again.

**"Your domain does not point at this server."** The DNS A record is missing, or still
propagating. This one is only a warning, not a blocker - but the certificate cannot be issued
until it resolves, so your instance will not be reachable over HTTPS until then.

**"The user needs root or passwordless sudo."** We cannot install Docker or bind port 443
without it.

**"Your server is below the minimum spec."** The check reports what it found. Resize the
server at your provider and run the check again.
