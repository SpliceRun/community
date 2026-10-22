---
title: Copy backups to your own Backblaze
description: "An optional, free extra copy of your nightly backup in a Backblaze B2 bucket you own. How to connect it, what happens each night, what to do when a copy fails, and how to restore from your bucket without us."
sidebar_position: 5
---

# Copy backups to your own Backblaze

You can have every nightly backup copied into a Backblaze B2 bucket that you own. It is an
optional extra, and it is free.

**Our own backup does not change.** Your instance is still backed up every night on the schedule
and retention described on [Backups & data recovery](./backups-and-recovery.md), and you still
restore from your dashboard as usual. The copy in your bucket is a second, independent copy that
you control. If a copy to your bucket fails, our backup is not affected.

## What you get

- After each nightly backup, the same restore point is also copied into your bucket.
- The copy is an **encrypted [restic](https://restic.net) repository**. Backblaze, and anyone
  else who reads your bucket, sees only encrypted data.
- You hold the password in a **recovery kit** you download from your dashboard. With it, you can
  open and restore the copy yourself with the free restic tool. You do not need us, and you do
  not need a SpliceRun account.

## Before you start

You need:

1. **A Backblaze account.**
2. **A private bucket** for your backups. Create it in the Backblaze web console under
   **Buckets**.
3. **A lifecycle rule on that bucket, so removed copies are really deleted.** This step is
   required. When old restore points are removed from your repository, restic deletes files. By
   default Backblaze does not delete them: it keeps every deleted file as a hidden version,
   forever, and **charges you for its storage**. So without this rule, your bucket only ever grows.
   In the Backblaze console, open **Buckets**, choose **Lifecycle Settings** on your bucket, and
   either:
   - choose **Keep only the last version of the file**, if the bucket holds nothing but these
     backups; or
   - choose **Use custom lifecycle rules** and add one rule for the file path `splicerun/` with
     **days till hide** left empty and **days till delete** set to `1`, if the bucket also holds
     other files you want kept differently.

   With the rule in place, Backblaze deletes a removed file about one day after restic removes it,
   so your storage bill falls a day or two after a copy expires, not straight away.
4. **An application key restricted to that bucket.** In the Backblaze console, go to
   **Application Keys** and add a new key:
   - Allow access to **only the bucket you just created**.
   - Type of access: **Read and Write**. We need to list, read, write and delete files
     (`listFiles`, `readFiles`, `writeFiles`, `deleteFiles`). A key limited to one bucket also
     needs `listAllBucketNames` to work through Backblaze's S3 API. A key made this way in the
     Backblaze web console has all five.
   - **Leave the file name prefix empty**, or set it to exactly `splicerun/`. Any other prefix
     stops us writing where the copy lives.

   Backblaze shows you a **keyID** and an **applicationKey**. The applicationKey is shown only
   once, so copy it somewhere safe before you close the page.

:::warning[Do not use your master application key]
Backblaze's S3 API does not accept the account's master key, so we refuse it. Create a separate
key limited to your bucket, as above. A key that can only touch one bucket is also far safer to
hand to anyone, including us.
:::

## Connect your bucket

1. In your dashboard, open **Backups** and choose the instance.
2. Choose **Copy to your own Backblaze**.
3. Enter the **bucket name**, the **key ID**, the **application key**, and **how many days** of
   restore points to keep in your bucket.
4. Confirm.

Before we save anything, **we test the key with a real write, read and delete** in your bucket.
If any of those fail, nothing is saved and we tell you why.

When the test passes, we:

- create an encrypted restic repository in your bucket, in the folder `splicerun/<instance id>`;
- copy your newest restore point into it straight away, so you have a first copy without waiting
  for the night.

## Download your recovery kit now

As soon as you are connected, **download the recovery kit** from the same panel and keep it
somewhere safe that is not your SpliceRun account, such as a password manager.

The kit is a small text file. It holds:

- the address of the repository in your bucket;
- **the repository password**;
- the exact commands to list and restore your backups with restic.

It does not contain your Backblaze application key. You already have that.

**Why this matters.** We keep an encrypted copy of the repository password so the nightly copy can
run. If you disconnect, we delete our copy. After that, the kit is the only way to open the data
in your bucket. **Without the kit, the copy cannot be opened by anyone**, including you and us.
You can download the kit again at any time while you are connected.

## What happens each night

1. Your instance is backed up by us, as it always is.
2. That same restore point is copied into your repository.
3. Your repository keeps one restore point per day for the number of days you chose, counted
   back from the newest copy, plus the three most recent copies. Older ones are removed from the
   repository. Backblaze then deletes their files about a day later, **if your bucket has the
   lifecycle rule** from [Before you start](#before-you-start). Without it, Backblaze keeps them as
   hidden files and bills you for them.

Each copy is recorded in the instance's **Work log**, and the **Backups** page shows when the last
copy to your bucket succeeded.

The number of days you keep in your bucket is separate from our own retention. You can keep more
days, or fewer, than we do.

## What it costs

The copy is free from us. It stays free.

Backblaze charges you for the storage in your bucket, under your own Backblaze account. Their
prices are on the [Backblaze B2 pricing page](https://www.backblaze.com/cloud-storage/pricing).
Backups are deduplicated, so keeping many daily restore points uses far less space than keeping
that many full copies. What you pay for depends on the bucket's lifecycle rule: without the rule
in [Before you start](#before-you-start), removed restore points stay in your bucket as hidden
files and you keep paying for them.

## If you cancel, move, or delete the instance

Copies to your bucket follow our own backup of the instance:

- **While a cancelled instance is in its retention period**, each backup we still take of it is
  also copied to your bucket, and **Copy now** still works. You can also connect a bucket during
  that time to take a copy of your data with you.
- **When the instance is deleted**, copying stops. We disconnect the bucket and delete the saved
  Backblaze key and repository password from SpliceRun, and the instance's **Work log** records
  it. The copies already in your bucket stay there. Open them with your recovery kit.
- **When you move the instance to a new server**, copies pause once the new server is ready,
  because we stop backing up the old one then. The connection is kept until you choose
  **Switch**. After the switch, the connection belonged to the old server's instance, so we
  disconnect it and delete its saved key and password in the same way. The new instance's
  **Work log** tells you. To keep copying, **connect your bucket again** from
  **Backups**. You can use the same bucket: the new instance gets its own folder,
  `splicerun/<new instance id>`, and the old copies stay in theirs. Download the new recovery kit;
  the old kit still opens the old folder.

## If a copy fails

When a copy to your bucket fails:

- the **Work log** and the **Backups** page show the reason in plain words;
- the instance owner gets an email, **at most once a day** while it keeps failing;
- **our backup is not affected**. Your instance is still backed up and you can still restore
  from your dashboard.

We try that restore point again by ourselves, first after about 15 minutes and then less often,
and each new night's restore point is tried as well. Once the cause is fixed you can also choose
**Copy now** instead of waiting.

Common reasons and what to do:

| What you see | What to do |
| --- | --- |
| The key was rejected, or has expired | The key was deleted or expired in Backblaze. Create a new key as in [Before you start](#before-you-start) and choose **Replace key**. |
| The key is your master key | Create an application key limited to this bucket with Read and Write access, and use that. |
| The key is missing a permission | The key needs Read and Write access (`listFiles`, `readFiles`, `writeFiles`, `deleteFiles`). Create a new key with that access and choose **Replace key**. |
| The key is limited to a different bucket, or to a different file name prefix | Create a key for this bucket, with no prefix or the prefix `splicerun/`. |
| The bucket was not found | The bucket was deleted or renamed. Disconnect, then connect again with a bucket that exists. |
| Backblaze reported a cap was reached | Your Backblaze account has hit a spending or usage cap you set. Raise the cap in the Backblaze console, then choose **Copy now**. |
| A repository already exists in that bucket | There is already a `splicerun/<instance id>` folder in that bucket, usually from an earlier connection. Use a new bucket, or delete that folder in Backblaze first. |
| Nothing to copy yet | The instance has no restore point yet. The first copy happens after its first backup. |

If the reason is on our side, such as our backup storage not being readable at that moment, we
say so, and it is retried without you doing anything.

## Replace the key, copy now, or disconnect

All three are on the same panel under **Backups**.

**Replace key.** Use this when you rotate your Backblaze key or the old one stopped working. Enter
the new key ID and application key. We test the new key and check that it opens your existing
repository before we switch to it. The bucket, the repository and your recovery kit stay the
same.

**Copy now.** Copies your newest restore point to your bucket without waiting for the night.
Between 01:15 and 04:30 UTC our own nightly backup runs, so a Copy now pressed then waits and
starts by itself as soon as that window ends.

**Disconnect.** Stops the nightly copy. We delete the key and our copy of the repository password.

- **The data already in your bucket stays there and stays yours.** We do not delete it.
- To open it later, you need your recovery kit. Download it before you disconnect if you have not
  already.
- To connect again to the **same bucket**, first delete the old `splicerun/<instance id>` folder
  in Backblaze, or use a new bucket. A new connection always creates a new repository with a new
  password, and we will not write over an existing one.

## Restore from your own bucket, without us

There is no button in the dashboard to restore from your bucket. You restore it yourself with
restic, on any computer. This is the point of the copy: it works even if SpliceRun is not there.

**1. Install restic.** Downloads and instructions are at [restic.net](https://restic.net).

**2. Set the connection details.** Your recovery kit has these lines ready to paste into a
terminal. Put in your own key ID and application key:

```bash
export AWS_ACCESS_KEY_ID='PUT-YOUR-KEY-ID-HERE'
export AWS_SECRET_ACCESS_KEY='PUT-YOUR-APPLICATION-KEY-HERE'
export AWS_DEFAULT_REGION=<region>
export RESTIC_REPOSITORY=s3:https://s3.<region>.backblazeb2.com/<bucket>/splicerun/<instance id>
export RESTIC_PASSWORD='<password from your kit>'
```

**3. List your restore points.**

```bash
restic snapshots
```

**4. Restore the newest one** (or use an ID from the list instead of `latest`):

```bash
restic restore latest --target ./splicerun-restore
```

The files land inside the folder you gave as `--target`, in a sub-folder named after
your instance id. That folder has a `manifest.json` that lists what is inside.

### What is inside

| File | What it is |
| --- | --- |
| `database.dump` | Your n8n database, in PostgreSQL custom format. Restore it with `pg_restore`, not `psql`. |
| `volume.tar.gz` | The n8n data directory (`~node/.n8n`). |
| `tenant.env` | Settings for the instance, including **`ENCRYPTION_KEY`**. |
| `manifest.json` | What is in this restore point. |

Next steps, in short: restore `database.dump` into an empty PostgreSQL database with `pg_restore`,
unpack `volume.tar.gz` into the n8n data directory, and start n8n with the **same
`ENCRYPTION_KEY`** as in `tenant.env`. If the key does not match, n8n starts and lists your
credentials, but none of them can be decrypted.

:::warning[Treat restored files as secrets]
`tenant.env` contains keys and tokens in plain text. Anyone who has
them can use them. Keep the restored folder private and delete it when you are done.
:::

---

**Questions about copying to your own bucket?** [Open a support ticket](https://app.splicerun.com/dashboard/support)
from your dashboard.
