---
title: Storage volumes
description: "Create extra persistent storage, attach it to an instance, and snapshot or restore it."
sidebar_position: 4
---

# Storage volumes

A volume is a block of persistent storage you create yourself and attach to an instance. It
survives restarts and version changes, and it can be snapshotted and restored independently of
the instance it is attached to. Use one when a workflow writes files that need to outlive
the container they were written in.

:::note[Shared plans only, and only owners and admins]
Volumes are created on the SpliceRun shared host, so they can only be attached to an
instance running there. They cannot be attached to an instance on
[your own server](../plans/bring-your-own-server.md) or on a
[Dedicated server](../plans/dedicated-server.md) - on those, use the disk that already
belongs to the machine. If your team has no instance on a
[Shared plan](../plans/shared-hosting.md), creating a volume is refused with an explanation.

Only the workspace **owner** and **admins** can create, mount, snapshot, restore, or delete
a volume. Members see the list marked **Read only**. See
[Team management](../account/team.md).
:::

## Where to find it

Left sidebar → **Infrastructure** → **Volumes**.

## Creating a volume

1. Open **Infrastructure → Volumes**.
2. Under **Create volume**, enter a **Name**. Lowercase letters, digits, and hyphens only,
   starting with a letter or digit - for example `workflow-data`.
3. Enter a **Size** in GB, between 1 and 2048. The default is 10.
4. Click **Create volume**.

The volume appears in the **Storage library** with status *creating*, and becomes
*available* once it exists on the host.

## Attaching a volume to an instance

1. Find the volume in the **Storage library**. It must be *available*.
2. Choose the instance from the **Mount to…** list.
3. Click **Mount**.

The volume is mounted at `/data/extra` inside the instance. The **Mount** column shows the
path and the instance it is attached to once the mount completes.

To detach it, click **Unmount**. The data stays on the volume.

## Snapshots and restore

A snapshot is a point-in-time copy of a volume, listed in the same table and tagged
**Snapshot**.

**To take one:** click **Snapshot** on the volume. It can be mounted or available at the
time.

**To restore one:**

1. **Unmount** the target volume first - it must be *available*.
2. Choose the snapshot from the **Restore from…** list on that volume.
3. Click **Restore** and confirm.

:::caution[Restore overwrites the target volume]
Restoring replaces everything currently on the target volume with the contents of the
snapshot. There is no undo. Take a fresh snapshot first if the current contents still
matter.
:::

## Deleting a volume

Click **Delete** and confirm. A volume that is mounted, mounting, deleting, or restoring
cannot be deleted - unmount it first.

## Statuses

| Status | What it means |
|---|---|
| **creating** | The volume is being created on the host. |
| **available** | Ready to mount, snapshot, restore into, or delete. |
| **mounting** / **mounted** | Being attached, or attached to an instance. |
| **unmounting** | Being detached. |
| **restoring** | Data is being copied in from a snapshot. |
| **deleting** | Removal is in progress. |
| **failed** | Something went wrong; the reason is shown beside the status. |

## Limits and things worth knowing

- **The size you choose is recorded, not yet enforced as a hard quota.** Treat it as the
  size you intend to use rather than a ceiling the platform holds you to.
- **A volume attaches to one instance at a time.** To move it, unmount it from the first
  instance and mount it to the second.
- **You cannot restore into a snapshot.** Pick the data volume as the restore target.
- **Names must be unique within your team**, snapshots included.
- **A volume is not a backup.** Snapshots live on the same host as the volume. For the
  managed backups that cover your instance's database and workflows, see
  [Backups and recovery](./backups-and-recovery.md).
- **Rate limits per team:** 20 new volumes an hour, and 30 mount, unmount, snapshot,
  restore, or delete actions an hour.
- **Cloud provider volumes are not offered yet.** Volumes on Hetzner, Contabo, or
  DigitalOcean storage are not available; the API returns an explicit "not available" error
  rather than pretending otherwise.

For what your plan includes and anything that is charged separately, see the
[pricing page](https://splicerun.com/pricing) and
[How pricing works](../billing/how-pricing-works.md).
