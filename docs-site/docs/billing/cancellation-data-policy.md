---
title: Billing, Cancellation, and Data Policy
description: "What happens to your instance and your data on a missed payment, a cancellation, or a change of mind."
sidebar_position: 4
---

This page explains what happens to your instance and your data after a missed payment, a
cancellation, or a change of mind. What happens depends on **where your data lives**, so the page
is split that way. During early access everything is free, so there are no invoices to miss and
nothing is charged; the payment sections below describe how paid terms work once pricing starts.

## The four cases at a glance

| Where the data is | What SpliceRun does with it |
|---|---|
| **On your own server** (Bring your own server, the only option on sale today) | SpliceRun never deletes it. It is your machine. We stop the instance, then remove our access key. |
| **In backups SpliceRun holds** | Kept as restore points on the schedule described below. We do not publish a separate purge date for a stopped instance's backups. To have them erased, ask us. |
| **When you delete your workspace** | Immediate and irreversible, as described below. |
| **On a server SpliceRun runs for you** (Shared and Dedicated, not open for orders today) | A 30-day window after the instance stops, with email notices, then automatic deletion. |

## Cancelling

Cancel any time from your dashboard. On a paid term it takes effect at the end of your current
billing period, with no early-termination fee. During early access there is no billing period to
wait for, so it takes effect straight away. You can export your instance at any point, before or
after cancelling, while your account is active.

## Data on your own server

On Bring your own server your workflows, credentials and execution history live on your machine.
SpliceRun does not delete them, whether you cancel, stop paying, or do nothing. They stay exactly
where they are, under your control, and you can keep running n8n there yourself.

What does change when an instance stops is our access. On cancelling:

- During early access the instance is removed from SpliceRun straight away, and our SSH key is
  removed from your server automatically.
- On a paid term, the instance stays live until the end of the period, then stops, and the key is
  removed 30 days later. In that window you can change your mind and we bring the instance back.
- We then check the key no longer works and record the result in the instance's Work log.

### If an invoice goes unpaid (paid terms only)

We do not hold your card and nothing is ever charged automatically, so an unpaid invoice is
simply one that has not been paid - there is no failed payment to retry.

On a paid term we email you about **30 days**, **7 days** and **1 day** before the term ends,
naming the date and the amount. After the due date, on Bring your own server:

- **Day 0-7 - grace period.** Your instance keeps running normally while we email you.
- **Day 7 - suspension.** Your instance is **suspended** (stopped, not deleted). Your data is
  untouched, and the machine is yours throughout.
- **Day 7-37 - 30-day restore window.** Settle the balance any time in this window and your
  instance comes back exactly as it was - same workflows, same credentials, same data.
- **After the window**, our access key is removed from your server. Your data stays there.

## Backups SpliceRun holds

For as long as an instance is running, we keep its restore points on a fixed schedule: **7
daily**, **4 weekly** and **3 monthly**, on every plan. A longer daily window of 30 or 90 days
is available as an [add-on](../account/addons.md). Older restore points are removed automatically
as newer ones replace them. Details are in [Backups and recovery](../data/backups-and-recovery.md).

Backups are held by SpliceRun, not by you, so they are the part of your data that you cannot
delete yourself. For a cancelled or lapsed instance we do not state a separate deletion date for
its backups on this page. If you want them erased, open a support ticket and say so, and
[export your data](../apps/n8n/export-your-data.md) first if you may need it.

## If you delete your workspace

Only the workspace owner can do this, and it is **immediate and cannot be undone**. See
[Team management](../account/team.md). Export what you need first. A workspace can only be deleted
once it has no live instances or subscriptions, and it cannot be deleted at all if it has
invoices, because we are required to keep those; in that case you can delete your account
instead, which erases your personal data while the invoices stay.

Deleting a workspace is your decision and is not preceded by a notice period or a restore window.

## Servers SpliceRun runs for you (Shared and Dedicated)

Shared and Dedicated are not open for orders today. Where they apply, SpliceRun holds the data,
so a notice ladder and a deletion step exist, and these are the only places where the
automatic deletion described here applies.

### Dedicated

- **The due date - suspension, the same day.** There is no grace period on this plan. We take a
  final backup, and **the server is returned to the hosting provider.**
- **Up to 30 days after - restore window.** Your backup is held, encrypted and off the server.
  Settle the balance and pay the restore fee and we rebuild your instance on a new machine from
  that backup.
- **After 30 days**, the backup is deleted.

**Why Dedicated has no grace period.** On this plan SpliceRun buys a whole machine from the
provider and pays for it a month in advance, for you. Every day an unpaid instance keeps running
is a day we pay a hardware bill for someone who is not paying us.

**What is kept is a backup, not a paused instance.** Once the server is returned it no longer
exists and cannot be switched back on. Coming back means building a new instance and restoring
your data into it - which is why there is a fee. See [How pricing works](/billing/how-pricing-works).

### Shared (prepaid wallet)

Shared instances are funded from a prepaid wallet rather than a monthly charge.

- At around **seven days of balance remaining**, we email you once.
- At zero, your instances are **paused** - stopped, not deleted, and no longer costing you anything.
- Paused instances are kept for **30 days** while you top up or export.

### Cancelling or stopping on these plans

After a cancellation, an unpaid invoice or an empty wallet, the data we hold for you is kept
**30 days from the day the instance stops** and then deleted automatically. We email you about
**seven days** before the deadline, and again once the data has been deleted. If the first email
could not be delivered, the deletion is held rather than carried out. Your account stays open
either way, and you can start a new instance whenever you like.

## Why these specific numbers

Short, vague grace periods before data loss are a common complaint about budget hosting. Where
SpliceRun holds your data, we publish the windows plainly and give real time to fix a lapsed
card or change your mind. Where you hold it, we do not delete it at all.

## Statutory cancellation rights

If you're a consumer with a statutory cooling-off right, for example the 14-day right
under the EU Consumer Rights Directive, **you keep it.** We don't ask you to waive it at
checkout and we don't rely on any waiver.

## Refunds

During early access every app is free, so there is nothing to refund today; this section applies to payments made once pricing starts, or by anyone who paid before early access began.

**We refund what we haven't delivered yet**: not the part you've already used, and not
money we've already spent buying hardware on your instruction.

Every SpliceRun price is either a management fee or a server cost passed straight through
at what it costs us. Those behave differently when you leave, so refunds treat them
differently.

**Before we've built anything:** full refund, any time, no questions. If you've paid and
we haven't provisioned yet, nothing has been spent, so you get all of it back.

**Once your instance is running,** ask within 14 days of a payment and we refund the
unused part:

| Plan | We refund | We don't refund |
|---|---|---|
| **Shared** (prepaid wallet) | Your unused balance, in full | Days already run; bonus credit, which was a gift rather than a purchase |
| **Bring your own server** (flat fee) | Unused days of the current month, pro rata | Days already run. The server is yours, so no hardware cost either way |
| **Dedicated** (server + fee) | The **management fee** for unused days, pro rata | The **server cost for the current month**: we buy that machine for a whole month the moment you order, and it's already paid out |

This is shown to you on the purchase page before you pay, not only here.

Also not refundable: completed one-time services such as a finished migration, and any
other third-party cost already incurred on your instruction.

**Where a statutory right gives you more than this, the statutory right wins**, and note
most such rights are themselves proportionate, entitling you to a refund of what wasn't
supplied, which is what this already gives you.

**How to ask:** open a support ticket from your dashboard with your payment reference.
Refunds are handled by hand: there's no self-serve refund button, and that's the path rather
than a missing feature.

## Your data

- Your workflows, credentials, and execution history belong to you.
- We don't read the contents of your workflows. If you switch on failure monitoring, we read
  run **metadata** and, at the highest setting, the name of the step that failed. The monitoring
  login is refused access to the table your run data lives in; the one exception is a function
  that returns only a failed step's name. What is read, and what that does and does not
  protect, is set out in [What our monitoring can see](../security/monitoring-what-we-can-see.md).
  It is **off by default** and you can switch it off per instance.
- You can export your instance at any time while your account is active. See
  [Backups & Data Recovery](../data/backups-and-recovery.md) for how backups and
  exports work day-to-day, independent of cancellation.

## GDPR and data rights

We comply with GDPR and applicable data protection regulations. You have the right to
access, export, and request deletion of your data - email
[support@splicerun.com](mailto:support@splicerun.com) for any of these. Some records, such as
invoices, we are required to keep, and we will tell you if that applies. Data on your own
server is yours to delete; SpliceRun does not delete it when your service ends.

---

**Questions about billing or cancellation?** [Open a support ticket](https://app.splicerun.com/dashboard/support) - we'd rather explain it directly than have you guess.
