---
title: How pricing works
description: "The structure behind the numbers: what you are paying for, what is included, and what costs extra."
sidebar_position: 1
---

# How pricing works

Current prices are always on the [pricing page](https://splicerun.com/pricing). This page
explains the *structure* - what you're paying for, what's included, and what costs extra - so
there are no surprises.

## One price per instance

You pay per instance, per month. An instance is one running app - one n8n, for example.

What that price covers depends on which hosting option you chose:

| | What the price includes |
|---|---|
| **Shared** | Your instance, its resources, and the machine it runs on |
| **Dedicated** | Your instance, and a whole server nobody else uses |
| **Bring your own server** | Your instance only - you pay your own provider for the server |

Bring your own server has the lowest SpliceRun fee because we're not supplying hardware. It's a
flat fee whatever size your server is: managing a large machine is the same work as managing a
small one.

## Early access: every app is free

SpliceRun is in early access: every app is free, for everyone, until at least 31 May 2027.
That covers your first app, every additional app on the same server, and any further server.
There is no limit on how many customers it covers. It is applied automatically at checkout,
and it needs no code and no card.

Everywhere a price is shown, both numbers appear: the listed price struck through, and the $0
you are actually charged. The listed price is $12 a month for the first app on a server and $5
for each additional app. What we charge after early access is not decided yet, and plans may
later be split into a free plan and a paid plan.

**What happens at the end.** 31 May 2027 is the earliest pricing could start, not an end
date: everything stays free after it until we announce pricing. If we introduce pricing, you'll get at least
30 days' notice by email first. Nothing is ever charged automatically, because we do not store
your card - see [Renewals and payment](#renewals-and-payment) below. If you decide not to
continue, you do not need to do anything; nothing is taken.

Early access covers Bring your own server, the only option on sale today. Shared and Dedicated
are not open for new orders.

## Renewals and payment

**Nothing renews automatically, and we never store your card.** During early access nothing is charged, so there is nothing to renew; the rest of this section describes how paid terms work once pricing starts. Each paid term is 30 days. We
email you 30 days, 7 days and 24 hours before it ends, and whether to renew is your choice.

To renew, open the instance page and choose **Renew early** any time in the 30 days before the
term ends. The new 30 days start when the current term ends, so renewing early costs you no days.
You can be at most one term ahead. An invoice is issued when you pay.

If you do not renew, the plan becomes past due when the term ends and we send reminders before
anything changes. After that the instance is paused, not deleted straight away - see the
[Billing, Cancellation, and Data Policy](./cancellation-data-policy.md) for the exact windows, including when paused data is finally deleted.

This is why you will not find a "cancel subscription" button that stops a recurring charge:
there is no recurring charge to stop. Not renewing is simply not paying for the next term.

## What every plan includes

No plan is missing these, and none of them are upsells:

- Automatic setup and provisioning
- **HTTPS certificates**, issued and renewed automatically
- **OS security patching** on the server your instance runs on
- **Daily backups** with self-service restore
- **Health monitoring** and alerts if your instance stops responding
- An **activity log** of everything we've done to your instance
- **Support tickets** from your dashboard, best-effort - the free plan doesn't include human
  support. See [Getting help](../troubleshooting/getting-help.md)

We deliberately don't gate any of the above behind a higher tier. Backups in particular are a
data-safety feature, not a premium feature.

## What costs extra

Two categories, and the distinction is deliberate.

**Things that cost us something to provide:**

- Longer backup retention - 30 or 90 daily restore points instead of the 7 every plan includes
- **Rebuilding a Dedicated instance after its server was returned - $10, once.**
  This applies only on Dedicated, and only if an invoice went unpaid and the server was
  handed back to the provider. Coming back then is not un-pausing: it needs a new machine
  and a full restore. It is set below one month of service on purpose, so recovering your
  data always costs less than starting over, and there is no equivalent fee on the other
  plans because nothing is returned on them. See
  [Cancellation & data policy](/billing/cancellation-data-policy).

**Not offered right now:** paid help inside your application - hourly help with your
workflows, integrations or credentials, the monthly App-level help allowance, and onboarding
calls.

## Support on the free plan

The free plan doesn't include human support. Start with these docs. Support is through support
tickets only: open one from your dashboard (**Support**, or
[app.splicerun.com/dashboard/support](https://app.splicerun.com/dashboard/support)). Ticket replies are
best-effort, and we don't promise a reply time. Email support@splicerun.com
only for important matters a ticket can't cover; other emails may not get a reply. The
automatic work that keeps your instance running (health checks, backups, updates and
certificates) still runs for everyone.

Helping build or debug the automations *inside* your instance is a different job, and we do
not offer it as a paid service right now.

The full boundary, with examples, is in [What we manage](../plans/what-we-manage.md).

## Changing plans

You can move between hosting options and sizes. Because every option runs the same application
and the same backup format, moving is a restore into the new place rather than a rebuild - your workflows and credentials come with you.

Open a support ticket before you move so we can sequence it with minimal downtime.

## Currency and tax

Prices on this site are in US dollars, and the total you approve before paying is always
the total you are charged.

What you are charged is the amount shown at checkout. How tax applies depends on where you
are and your status as a customer, and the invoice shows any tax that was applied. Your own bank
may add its own foreign-transaction fee to a card payment; that is between you and your bank,
and we neither charge nor receive it.

## Cancelling

You can cancel at any time - no contract, no cancellation fee. During early access there is
no billing period to wait for, so cancelling removes the app straight away. What happens to
your data afterwards is set out in the
[Billing, Cancellation, and Data Policy](./cancellation-data-policy.md).

If you're on Bring your own server, cancelling also removes our access key from your machine
automatically: straight away during early access, or 30 days after the app stops on a paid
term (the same window in which you can change your mind).
We then check the key no longer works and record the result in the instance's Work log. Your
instance data stays exactly where it is - on your server.

---

**Not sure which option fits?** [Choosing a hosting option](../plans/choosing-a-plan.md) walks through
it, or [open a support ticket](https://app.splicerun.com/dashboard/support) and we'll tell you honestly -
including if the answer is that you don't need us.
