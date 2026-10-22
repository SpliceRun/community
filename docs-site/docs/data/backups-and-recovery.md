---
title: Backups & Data Recovery
description: "Daily backups, self-service restore, and clear visibility into when the last backup actually ran."
sidebar_position: 2
---

# Backups & Data Recovery

Every SpliceRun plan includes daily backups, self-service restore, and clear visibility
into when the last backup actually ran. This page explains how it works day-to-day.

## Daily backups, on every plan

- Your instance is backed up automatically once a day - no setup, no add-on required, on
  every plan including Bring your own server.
- Your dashboard always shows exactly **when the last backup ran**, not a vague
  "we back up regularly" claim. If a scheduled backup fails, you'll see it on your
  dashboard immediately - it never passes silently.
- You can restore from any available backup yourself, from your dashboard, without
  waiting on support.

## What a backup actually contains

A usable backup is three things, and one missing piece makes the whole thing worthless.
Every snapshot captures all three:

| | Why it matters |
|---|---|
| **The database** | Your workflows, credentials and execution history (the runs that had not yet been pruned - n8n keeps 14 days by default, see [Execution history and retries](../apps/n8n/execution-history-and-retries.md)) |
| **The data volume** | Configuration, custom nodes and binary data |
| **The encryption key** | Without it, every stored credential restores as unreadable text |

That third item is the one most commonly missed by hand-rolled backups. A database dump
on its own will restore your workflows with every credential broken.

## How they're stored

Backups are **encrypted before they go into backup storage**, and backup storage only
ever holds them encrypted. While a backup job runs, its files are held unencrypted for a
short time on our backup host, and that staging copy is deleted when the job ends.
They're deduplicated, so keeping many restore points costs far less space than keeping
many full copies.

On Bring your own server, backups are pulled from your machine over the same encrypted
SSH connection we use to manage it, and encrypted on our backup host before they are
stored; they are not encrypted on your server first. For n8n nothing is written to your
disk in the process. The live
data on your server's own disk is a different matter: SpliceRun does not encrypt that
disk, and whether it is encrypted at rest depends on your server provider. See
[Encryption of your server's disk](../security/data-and-access.md#encryption-of-your-servers-disk).

On Dedicated the same thing happens, over the same connection, to the server we run
for you - so a Dedicated instance is backed up on exactly the schedule above, and
the copy lives off that machine. That matters most at the one moment it is hard to
think about: if a Dedicated invoice goes unpaid, the server is returned to the
provider on the due date, and **we take a final backup first**. For the next 30 days
that backup is the thing your instance can be rebuilt from. See
[Cancellation & data policy](/billing/cancellation-data-policy).

## Restoring your instance

Restoring puts your instance back to the state captured in the backup you choose - same workflows, same credentials, same execution history.

**Before anything changes, we take a fresh snapshot of your current state.** That's your
undo. Then:

1. Your instance is stopped
2. The chosen snapshot is applied - database, volume and encryption key together
3. Your instance is started again
4. We health-check it - and for n8n, we also confirm the restored credentials can actually be
   read with the instance's encryption key. A database restored under the wrong key looks
   perfectly healthy to n8n: every credential is listed, and every one is empty.

**If it doesn't come back up healthy, or its credentials cannot be read, we automatically put
it back exactly as it was** and tell you the restore was rolled back. A restore going wrong should never be the thing that
takes you offline.

## Back up before a risky change

If you're about to make a change you're unsure of, take a manual backup first. The button
is on your instance page, and the snapshot is available to restore immediately.

A manual backup is extra: it never replaces or pushes out one of your nightly restore points.
It is kept for at least your daily window (7 days, or 30 or 90 with the add-on), and your three
newest manual backups are always kept. Taking one never deletes anything; old restore points are
only cleared by the nightly run, by the rules below.

This is the single most useful habit for anyone building automations, and it costs nothing.

You can also have every nightly backup copied, free, into a Backblaze B2 bucket you own; see [Copy backups to your own Backblaze](./bring-your-own-backblaze.md).

## Retention

Every plan is backed up daily and keeps the same restore points, whatever you pay:
**7 daily**, **4 weekly** and **3 monthly**.

| Plan | Daily restore points | Weekly | Monthly |
| --- | --- | --- | --- |
| Shared (XS and S) | 7 days | 4 | 3 |
| Bring your own server | 7 days | 4 | 3 |
| Dedicated | 7 days | 4 | 3 |

So on any plan you can roll back to any of the last 7 days, then to any of the last 4 weeks,
then to any of the last 3 months. These slots are filled by the nightly backups only.

Safety copies we take before an update or a restore are kept for at least 7 days, on every plan, and
never take a nightly slot either.

Longer daily retention is available on any plan as an add-on - 30 or 90 days - see the
[pricing page](https://splicerun.com/pricing). If you buy one, it replaces the plan's daily
window rather than adding to it, and the longer of the two always wins.

### Why Shared is backed up at all

Shared does not mean shared data. Your instance has **its own database and its own storage
volume**, not a slice of a communal one, and a backup dumps exactly those - never a
snapshot of the whole machine. That is what makes a per-customer restore possible on
Shared, and it is why we include backups on the $5 plan rather than treating them as a
premium feature.

Every snapshot is encrypted before it is stored, and includes your instance's
encryption key, so a restore brings your stored credentials back working rather than
unreadable.

## Exporting your data

Any restore point can also be **exported** - a single archive holding the database, the data
volume and the encryption key, downloadable for 24 hours. That is everything needed to run
your instance somewhere else, and you can take one whenever you like without affecting your
running instance or using up a restore point.

See [Exporting Your Data](../apps/n8n/export-your-data.md) for what the archive contains and how to
import it, and [Billing, Cancellation, and Data Policy](../billing/cancellation-data-policy.md)
for how exports interact with cancellation timelines.

## Higher availability

Daily restore points suit most workloads, and they are what we offer today.

We do **not** currently sell a hot standby that takes over automatically. It was listed as
an add-on and has been withdrawn, because the failover it implied was not built - we would
rather not sell it than sell it and hope. If your workload genuinely cannot tolerate the
time a restore takes, tell us before you buy and we will be straight with you about whether
SpliceRun is the right host for it today.

What you can do now: take a manual backup before risky changes, keep a longer daily
retention window as an add-on, and export your data whenever you like.

## What backups can't do

**They capture a point in time.** Data created and then deleted between two snapshots was
never in a backup, and can't be recovered.

**They're not a live replica.** See above if you need continuous protection.

**On Bring your own server, they don't protect the server itself.** They protect the
application and its data. If the machine is lost you can restore onto a new one - but
provisioning that new machine is yours to do.

## If SpliceRun ever discontinues a service

Every active customer receives a full backup of their instance plus the standard
runtime for whichever app it runs, so you can self-host it elsewhere with
reasonable advance notice. Everything we host is standard software you can run yourself, so this
costs us nothing to promise - it's a real anti-lock-in commitment, not a marketing line.

---

**Questions about backups or a specific restore?** [Open a support ticket](https://app.splicerun.com/dashboard/support)
from your dashboard.
