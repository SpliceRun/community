---
title: Create your account and launch your first instance
sidebar_label: Create your account
sidebar_position: 2
description: Every screen from signing up to requesting your first instance, with a picture of each one.
---

# Create your account and launch your first instance

Every screen you will see, in the order you will see it. Nothing is created and
nothing is charged until the last step, so you can walk through this and stop at
any point.

## 1. Create your account

Go to [app.splicerun.com/signup](https://app.splicerun.com/signup).

You can sign up with **GitHub** or **Google** in one click, or with an email
address and password.

If you use email, the password must be at least 10 characters and contain an
uppercase letter, a lowercase letter, a number and a special character. The form
tells you which rule you have missed rather than just refusing.

:::note[This is a SpliceRun account, not your n8n login]
This account is for the SpliceRun dashboard - billing, instances, backups. The
login for n8n itself is separate, and you create it yourself the first time you
open your instance. We never email you an app password.
:::

Already signed up? [Log in](https://app.splicerun.com/login) instead - the login
page looks the same, minus the name field.

## 2. Your dashboard, before you have anything

Straight after signing up, the dashboard is deliberately almost empty. There is
one thing to do and it is the only thing on screen.

## 3. Choose your app

Open **Deploy** in the left sidebar.

The three steps across the top - **Choose app**, **Choose server**, **Domain &
launch** - stay visible the whole way through, so you always know how much is
left.

Pick **n8n**, the app open for orders. It runs on your own server.

Then press **Continue**.

## 4. Choose where it runs

**Bring your own server** is the only option on sale right now: you own the
server and keep paying your hosting company for it; we install the app and run
it for you over SSH. Shared and Dedicated hosting are not available yet.

[Choosing a plan](../plans/choosing-a-plan.md) explains what each option means.

## 5. Review, then request the launch

The last screen restates everything you chose and tells you what your instance
comes with - an SSL certificate, daily backups, and an isolated app environment.

It also asks **when we may install updates**. The default - any day, 05:00 UTC - suits most people, and you can change it later at any time. Updates restart your
instance for about a minute, so if you have quiet hours, say so here. See
[Updates and maintenance windows](../account/updates.md).

You pick the address during setup: a free `*.splicerun.net` name, or a domain
you already own. See [Custom domains and HTTPS](../networking/custom-domains.md).

Nothing exists until you press **Request launch**. That is the point of no
return, and it is clearly the last thing on the page.

## 6. Watch it come up

Your instance appears under **Instances**, and that page is where you follow
progress.

We do not publish a fixed number of minutes for provisioning. The instance page
tells you what stage it is at; wait for it to say it is ready rather than
watching a clock.

When it is ready, the instance page shows how to open and sign in to your app.
That login is separate from the SpliceRun account you made in step 1.

## What next

- [Setup guide](./setup.md) - the before-pay / after-pay detail
- [Outbound connections and DNS](../networking/outbound-connections.md) - read
  this before your first HTTP Request node
- [Backups and recovery](../data/backups-and-recovery.md) - what is captured,
  and how to get it back
- Already running n8n somewhere else? [Migrating to
  SpliceRun](../apps/n8n/migrate-an-existing-n8n.md) moves it for you
