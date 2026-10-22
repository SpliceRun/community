---
title: Data and Access
description: "How instances are isolated from each other, and who at SpliceRun can reach your data."
sidebar_position: 1
---

# Data and Access

## Isolated by design

Each app runs in its own container and network - not a shared
instance with other customers' workflows sitting next to yours. Your database is a
separate database and role of its own, never a shared table with anyone else's data.

## Hardening enabled by default

Every n8n instance ships with the following enabled from the start, not as an optional
upgrade:

- Code in your workflows runs in n8n's separate task runner, not inside the n8n
  process itself
- `N8N_BLOCK_ENV_ACCESS_IN_NODE` - workflows can't read environment variables/secrets
  outside their own instance
- File nodes (Read/Write Files from Disk) can only read and write one folder.
  On your own server (BYOS), that folder is
  `N8N_RESTRICT_FILE_ACCESS_TO` pointing at the `.n8n-files` folder in the `node` user's home
  directory (`~node/.n8n-files`), n8n's own default folder. It
  is kept through updates and restarts, and it is included in your backups. This
  applies to BYOS instances set up on or after 24 September 2026. BYOS instances set
  up before that still use `/tmp`, which is cleared on every update.
  [Open a support ticket](https://app.splicerun.com/dashboard/support) and we will move yours
  over.
- `N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES` - workflows can't read n8n's own internal files
- Workflow HTTP requests can't reach private or internal addresses (SSRF protection).
  On your own server (BYOS) you can allow specific internal services yourself, by
  name or by IP range, under **Settings** on your instance page.
- Community nodes are **off by default** - third-party nodes aren't silently available
  to every workflow. On your own server (BYOS) you can switch them on under
  **Settings** on your instance page.

## SSL and updates

- SSL/TLS is configured by default on every instance - HTTPS for webhooks, logins, and
  day-to-day use, with no manual certificate setup required.
- The **operating system** gets its security fixes automatically: setup switches on its
  own automatic security updates. We restart the server only if you ask us to - see
  [If you bring your own server](#if-you-bring-your-own-server-byos) below.

## If you bring your own server (BYOS)

Only Bring your own server is on sale today, so the server is always yours: it sits in
your hosting account and you keep root access to it. We look after more than the app on
it.

- **At setup we harden the server:** a firewall that blocks incoming connections except
  SSH, HTTP and HTTPS (rules you already had are kept), fail2ban to block repeated
  failed SSH logins, the operating system's automatic security updates (security fixes
  only), and password login switched off if you already sign in with your own SSH key
  (if you sign in with a password, we leave it on so you are never locked out).
- **We never restart your server on our own.** Setup asks who restarts it when an
  update needs a restart, and you can change the answer on your instance page. We
  restart it only if you chose to let us (**SpliceRun restarts it** at setup, or
  **Patch and restart it for me** on your instance page), and then only inside your
  maintenance window. See
  [Updates](../account/updates.md#on-bring-your-own-server-the-choice-is-yours).
- **You look after the machine and your provider account:** power, disk space,
  hardware, billing, and anything else you install on it. The full split is in
  [What we manage](../plans/what-we-manage.md#where-the-line-falls-on-bring-your-own-server).

We hold an SSH key on your server so we can do this. It is locked to SpliceRun's own
control server: the line we give you starts with `from="<our address>",restrict`, so
the key does not work from anywhere else. You can remove it at any time from your
instance page. When you cancel, we remove it automatically (straight away during early
access, or 30 days after the app stops on a paid term) and check that it no longer works.

### Encryption of your server's disk

**SpliceRun does not encrypt your server's disk. Whether the data stored on it is
encrypted at rest depends on your server provider and the options you chose when you
created the server.** That data includes your app's database, its files and its stored
credentials. Backups are handled separately: they leave your server over an encrypted
SSH connection, are held briefly on our backup host while the job runs, and are
encrypted before they go into backup storage (see
[Backups & Data Recovery](../data/backups-and-recovery.md)). They are not encrypted on
your server first.

If encryption at rest matters to you, check it before you buy the server:

- Look in the provider's documentation or security page for "encryption at rest" for
  server disks and block storage.
- Check that it covers the server's own disk, not only extra volumes you attach.
- Check whether it is on by default or has to be chosen when you create the server. It
  often cannot be switched on later for a disk that already exists.
- If your provider does not offer it for the server's own disk, pick one that does. An
  extra encrypted volume on its own is not enough: we keep your app's data in Docker
  volumes on the server's main disk, and we do not set up moving it elsewhere.
  Encrypting the disk yourself (for example with LUKS) usually means reinstalling the
  server and typing a passphrase at every restart, so it does not suit a server that
  should come back on its own.

## Several client instances

If you manage automations for several clients, each client's app is a separate instance with
its own container, database and storage. See
[Choosing a hosting option](../plans/choosing-a-plan.md) for plan details.

## Your data, your control

- Your workflows, credentials, and execution history belong to you.
- Running the service does not involve reading the contents of your workflows. To tell you when an automation breaks, we can
  read execution **metadata** - whether a run failed, when, and the workflow's name - but only
  if you switch that on, and it is **off by default**. The monitoring login is denied access
  to the table your run data lives in. That limits the monitor only: as the operator we hold an SSH key
  on your server and take backups, which could in principle reach more. See
  [What our monitoring can see](./monitoring-what-we-can-see.md) for the full picture, including the query you can
  run to check the login yourself.
- You can export everything at any time your account is active. See
  [Backups & Data Recovery](../data/backups-and-recovery.md) for how that works, and
  [Billing, Cancellation, and Data Policy](../billing/cancellation-data-policy.md) for
  what happens to your data if you cancel.

## Not affiliated with the tools we host

SpliceRun is an independent hosting provider. We're not an official product, partner,
or reseller of n8n or any other tool we host - we run them reliably and are upfront
about that rather than implying an official status we don't have.

---

**Questions about security or access?** [Open a support ticket](https://app.splicerun.com/dashboard/support)
from your dashboard. To report a security problem, email support@splicerun.com.
