---
title: Export your n8n data
description: "Take a complete copy of your instance at any time and run it somewhere else. No ticket, no notice period, no export fee."
sidebar_position: 4
---

# Exporting Your Data

You can take a complete copy of your instance at any time and run it somewhere else - your
own server, another host, or your laptop. No ticket, no notice period, no export fee.

This page explains what you get and how to import it.

## Taking an export

From **Backups** in your dashboard, choose any restore point and press **Export**.

We package that snapshot into a single archive and put a **Download** link under Recent
activity, usually within a minute or two. The link stays valid for **24 hours**, then the
file is deleted from our servers.

You can take another export whenever you like. Exporting does not touch your running
instance, and it does not use up a restore point.

:::note[Who can export]
Exports are limited to **owners and admins** of your team. The archive contains your
encryption key, which decrypts every credential stored in your instance - so it carries the
same access as the instance itself, and it is gated the same way as taking a backup or
running a restore.
:::

## What is in the archive

The download is a `.tar.gz` containing one folder:

| File | What it is |
|---|---|
| `database.dump` | PostgreSQL dump of your n8n database - workflows, credentials, execution history |
| `volume.tar.gz` | Contents of `~node/.n8n` - config, custom nodes, binary data |
| `encryption-key.txt` | The encryption key for this instance |
| `manifest.json` | What the snapshot captured, and when it was taken |
| `README.txt` | A short copy of the instructions below |

**This is a full-instance export, not a workflow file.** If you only want one workflow to
move to another n8n, use n8n's own *Download* option on the workflow itself - that gives you
a small JSON file. What we produce here is everything, in a form you can stand up as a
complete working instance.

:::danger[Keep the encryption key]
`encryption-key.txt` is what makes the credentials inside `database.dump` readable. Without
it your workflows will import but every credential will be unusable - and nobody, including
us, can recover them from the dump alone.

With it, the archive is as sensitive as your live instance. Store it accordingly, and delete
the download when you are finished with it.
:::

## Importing into your own n8n

You will need a PostgreSQL database and somewhere to run n8n.

**1. Note your n8n version before you export.** Your instance page shows it as **App version**.
Write it down - the archive does not carry it, and it is the single most common reason an
import fails.

Start the new n8n on **that version or newer, never older**. n8n runs database migrations on
startup, so a database from a newer n8n will not load in an older one. If you want to move up
a version, import on the matching version first, confirm it works, then upgrade.

**2. Restore the database** into an empty database:

```bash
pg_restore --no-owner --no-privileges -d n8n database.dump
```

**3. Restore the data volume** into the `.n8n` folder of the user n8n runs as (`node` in the official Docker image):

```bash
tar xzf volume.tar.gz -C ~node/.n8n
```

**4. Set the encryption key.** `encryption-key.txt` contains a single line in
`NAME=value` form. Pass that value to n8n as `N8N_ENCRYPTION_KEY`, and set your database
connection variables to point at the database from step 2.

**5. Start n8n and check a credential.** Open a workflow that uses a stored credential and
confirm it still authenticates. That is the real test - if the key was set correctly the
credential works; if it was not, n8n will report the credential as undecryptable rather than
failing quietly.

## If something does not import

**Credentials appear but do not work.** The encryption key was not picked up. Check that
`N8N_ENCRYPTION_KEY` is set to the value from `encryption-key.txt` and not the whole
`NAME=value` line, and restart n8n.

**n8n will not start after restoring the database.** Almost always a version mismatch - you
are running an older n8n than the one the snapshot came from. Start on the version your
instance page showed as **App version**. If you no longer have it, open a support ticket and we
will tell you what that instance was running.

**The download link has expired.** Links last 24 hours. Take a fresh export; there is no
limit on how many you can take.

If you get stuck reading the archive or getting it started, you can open a support ticket from
your dashboard, within the normal [support scope](../../plans/what-we-manage.md). The free plan
doesn't include human support, so ticket replies are best-effort. Tuning or rebuilding workflows on the new host is app-level work rather
than hosting, so it falls outside that scope.

## Exporting because you are leaving

That is what this is for, and you do not need to tell us first. Take the export, confirm it
runs where you are going, and then cancel - in that order, so you are never between two
instances with no working copy.

Cancellation timelines and how long we keep your data afterwards are covered in
[Billing, Cancellation, and Data Policy](../../billing/cancellation-data-policy.md). Export
while your account is still active; once the retention window closes the data is gone from
our side.

Everything we host is standard software you can run yourself, so nothing in this archive depends
on us to keep working.

---

**Stuck importing an export?** [Open a support ticket](https://app.splicerun.com/dashboard/support)
from your dashboard.
