---
title: Move an existing n8n in
description: "Move a working n8n onto SpliceRun from your own VPS, Coolify, CapRover, Railway or Render."
sidebar_position: 2
---

# Migrating an existing n8n to SpliceRun

This is our **free migration service**. It moves a working n8n from another host - your own
VPS, Coolify, CapRover, Railway, Render - onto SpliceRun, at no charge.

There are **three things for you to do**, and none of them takes more than a minute.

## Before anything else: three promises

**1. We copy. We never move, and we never delete.**
Your old server keeps running throughout, untouched. At no point do we remove anything from it.
If you change your mind halfway through, you close the tab and nothing has happened to you.

**2. Your workflows arrive switched off.**
This matters more than it sounds. If we restored your workflows already running, your new server
would start firing the same schedules and webhooks as your old one, at the same time. For anyone
whose automations charge customers or send email, that means doing it twice. So everything
arrives paused, and we turn back on exactly what was on, at the moment you say go.

**3. You choose when to switch.**
We build the new instance alongside the old one and show you proof it worked. Nothing switches
over until you press the button.

## Step 1 - Tell us where your server is

In your dashboard, go to **Migrations → Start a migration**.

| Field | What it means |
|---|---|
| Your current server's address | Where n8n runs today - `n8n.yourdomain.com`, or its IP |
| SSH username | Almost always `root` |
| SSH port | Almost always `22` |

Then two choices.

### Where should the new instance run?

A migration always lands on an instance you already own; the form never builds a new server.
For a new customer that means **Bring your own server**: you buy a VPS from any provider you
like, or use one you already have, set it up with SpliceRun, and we migrate onto it. The server
stays in **your** name, on **your** account. If you ever leave SpliceRun, it keeps running.
Servers bought through SpliceRun are not on sale today.

:::tip[Keeping your own domain saves you the hard part]
Re-pointing webhooks and re-authorising OAuth apps is usually the biggest job in a migration - bigger than moving the data. If you keep your existing address, you skip all of it. Bringing your
own server is what makes that possible.
:::

### What should we move?

- **Workflows and data only** *(default)* - we copy everything except the key that unlocks your
  saved connections. You reconnect Google, Slack and so on yourself. The migration does not copy anything
  capable of unlocking your credentials.
- **Everything, including saved logins** - we also copy your instance's encryption key, so your
  connections keep working and you reconnect nothing.

Both cost the same. Neither is "the upgrade" - pick whichever you are comfortable with.

<details>
<summary><strong>What copying the key actually means, in plain terms</strong></summary>

Your credentials are already stored encrypted on your server. Think of them as a locked box. The
encryption key is the key to that box.

If you choose "Everything", we move the locked box and the key to your new instance. The
migration does not need to open the box, and it is not designed to. But be clear about what that
means: once the key is on your new server, your instance (and anyone who can reach that server, which
includes SpliceRun holding the SSH key, and our backups, which also contain the key) is in a position
to read the credentials. See [What our monitoring can see](../../security/monitoring-what-we-can-see.md).

If you would rather we did not touch it at all, choose "Workflows only". Everything else still
moves.

</details>

Finally, you type your server's address to confirm. That records your permission.

## Step 2 - Give us read access

We show you a single line to add to `~/.ssh/authorized_keys` on your old server:

```bash
echo 'PASTE_THE_LINE_FROM_YOUR_DASHBOARD' >> ~/.ssh/authorized_keys
```

About that line:

- It is **unique to your migration**. It is not a shared SpliceRun key.
- It only works **from SpliceRun's own IP address**. Copied off your screen, it is useless.
- We **delete our copy** once your migration is ready to switch over.
- You remove the line yourself afterwards. We tell you exactly which one.

That is the last thing you have to do until it is time to switch over.

## Step 3 - We check your server and report back

Within a couple of minutes we connect and take a **read-only look**. Nothing is copied yet and
nothing is changed.

You get a plain report: which n8n version you are on, how your setup is arranged, how much data
there is, roughly how long it will take, and **anything that will not come across, stated
plainly**.

If we find something we cannot move safely, we say so and **stop**. We would rather refuse a
migration than hand you a server that looks fine and quietly is not.

:::note[What we read, and what we deliberately do not]
We read your n8n version, how it is deployed, how big your database and data folder are, and a
short list of harmless settings such as your timezone and execution-history retention.

We deliberately **do not** read the value of any secret. Passwords, API keys, SMTP credentials
and your encryption key are recorded only as *"this exists, and it is N characters long"* - never
their contents. That holds even if you chose "Everything"; in that case the key is read later,
during the copy, and is not shown to anyone. (It does sit on the new server and in its backups; see the note above.)
:::

## Step 4 - We copy everything across

We pause your n8n for a few moments to take a clean copy of the database. This is the only time
we touch anything on your old server, it usually lasts under a minute, and it restarts
automatically afterwards - including if something goes wrong at our end.

Then we build your new instance and load your data into it. **Your workflows arrive switched
off.** Both servers now exist; only the old one is doing anything.

## Step 5 - We prove it worked

Before we tell you it is ready, we check the new instance against the old one:

| We check | Why |
|---|---|
| Every workflow arrived | Counted, not assumed |
| Every credential arrived | Counted, not assumed |
| Every user account arrived | Counted, not assumed |
| Your data folder arrived and is not empty | Custom nodes and attachments live here |
| Nothing is running yet | So nothing can fire twice |

If any of these fail, we do **not** hand it over. There is no "override" button, on purpose.

:::warning[Why “the site loads” is not evidence]
A migrated n8n with the wrong encryption key loads perfectly. Workflows list, pages render,
everything looks healthy - and every saved connection silently fails the moment it runs. So we
treat "it responded" as a hint, never as proof. Proof is counting your data.
:::

## Step 6 - You look at it, then you switch over

You get a link to the new instance and the verification report. Take as long as you like.

When you press **Switch over**, we turn back on exactly the workflows that were on before - not
everything, just what was actually live.

Then you:

1. Point your DNS at the new server, or start using the new address.
2. Update anything that calls your webhooks.
3. When you are happy, shut the old server down. **We never do this for you.**

## What we cannot do yet

We would rather tell you now than halfway through.

| Situation | Status |
|---|---|
| n8n using SQLite instead of PostgreSQL | Not automatic yet - ask us in a support ticket and we will schedule it |
| n8n installed directly on the server, no Docker | Not automatic yet - ask us in a support ticket |
| **n8n Cloud** (n8n's own hosted service) | Workflows export fine, but **credentials cannot** - n8n does not release the encryption key to anyone. You will re-enter connections. That is a limit of their platform, not ours. |
| PikaPods, and managed app hosts generally | No server access to give us, so the SSH route above doesn't apply - there is no automated route today. You move workflows by hand with n8n's own export and import, and you reconnect credentials yourself. See [Migrating from PikaPods](/apps/n8n/migrate-from-pikapods). |
| Moving between major n8n versions (1.x → 2.x) | We land you on the latest **1.x**. Upgrading to 2.x is a separate, reversible step afterwards. Doing both at once means an irreversible database upgrade during a move, and we will not risk that. |
| Databases over 20 GB | Ask us in a support ticket - we will offer to leave your old execution history behind, which is usually most of the size. Workflows and credentials are unaffected. |

## Common questions

**Will my old server be deleted?**
No. Not by us, not at any point. You shut it down yourself when you are ready.

**What if something goes wrong halfway?**
Your old server never stopped working. We restart it if we paused it, tell you what failed, and
nothing on it was changed.

**Can I cancel?**
Yes, any time before you switch over. We stop, clean up our side, and leave your old server
exactly as it was.

**How long does it take?**
Usually under an hour. Large data can take several hours - the check in Step 3 tells you before
you commit.

**Do you keep a copy of my data?**
The working copy is deleted after your migration completes. Our access key to your old server is
destroyed once your new instance is ready.

**What if I do not have root SSH?**
Tell us what you do have. Some hosts offer file access instead, which is usually enough. Some,
like n8n Cloud, do not - and then it is workflows-only.

## Need help?

[Open a support ticket](https://app.splicerun.com/dashboard/support) from your dashboard with
your migration reference. Ticket replies are best-effort, with no promised
reply time.
