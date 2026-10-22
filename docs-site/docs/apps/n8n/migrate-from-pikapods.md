---
title: Move in from PikaPods
description: "What PikaPods gives you access to, which migration paths work, and exactly what moves across and what you reconnect yourself."
sidebar_position: 3
---

# Migrating from PikaPods to SpliceRun

If you run n8n on PikaPods and are thinking about moving, this page explains which routes
exist, which do not, and what you will need to redo by hand.

:::note[What this page is based on]
It reflects what we found on one PikaPods n8n pod running n8n 2.33.7 in August 2026, plus n8n's
own documentation. PikaPods and n8n change over time, so check what you see against this page and
trust your own screen if they differ.
:::

## The short answer

Moving from PikaPods works. It just doesn't work the same way it does from a VPS.

| Route | Works from PikaPods? |
|---|---|
| Our server-based migration (SSH into your old box) | **No.** PikaPods doesn't give out server access - see below |
| Manual export/import, one workflow at a time | **Yes** - no special access needed |
| Automated migration through n8n's API | **Not offered.** We have not shipped a SpliceRun tool for it |
| Saved credentials moving via export or API | **No** - n8n itself never returns the secret values |
| Full instance restore (Adminer DB export + SFTP files/key) | **Possible, by you** - that is PikaPods' own backup path |

## Why the server-based route doesn't apply

Our standard migration (the one on the
[main migration page](/apps/n8n/migrate-an-existing-n8n)) works by connecting to your old **server**
over SSH. That's the right tool when you rent a VPS - from Contabo, DigitalOcean, Hostinger
or anywhere else - because you hold root on that machine and can grant us read access.

PikaPods isn't a VPS. It's a managed app host: you get the app, they keep the server. On the pod we looked at:

- **PikaPods' SFTP is sandboxed to your app's data folder.** You land in a directory holding just
  your own app data. There is no `.ssh` folder, and creating one is refused with
  *"Permission denied"*, as is writing anywhere outside your app's own folder.
- **Their Postgres port isn't reachable from outside.** PikaPods offers a "Database Access"
  feature. It opens **Adminer**, a web SQL client, and their docs tell you to export the whole
  database from there. That is a real dump path for *you*. It is not a Postgres address a
  migration tool can attach to. We checked whether the database answers directly from outside -
  it doesn't.

Neither of those is PikaPods being awkward.

Sandboxing customer access is exactly what a managed
app host *should* do. It simply means the tool built for servers has nothing to hold onto.

:::note[If you're on a VPS instead, ignore all of this]
Running n8n on a VPS from Contabo, DigitalOcean, Hostinger, or your own hardware? You
have root, so the standard [server migration](/apps/n8n/migrate-an-existing-n8n) applies - including
the option to bring saved credentials across. This page is only for managed app hosts.
:::

## A word on n8n API keys

n8n has a public API, and you create keys for it in your own n8n (**Settings → n8n API**).
SpliceRun does not have a migration tool that uses one, and you do not need a key to move your
workflows by hand (below). If anyone, including someone claiming to be from SpliceRun, asks you
for an API key, read this first.

**What a key can do depends on your n8n edition.** Per n8n's documentation
([API authentication](https://docs.n8n.io/api/authentication/)):

- **On Enterprise plans** you can limit a key to chosen scopes, for example read-only access to
  workflows. A read-only key cannot change anything.
- **On every other edition, a key has full access to everything the account can do.** That means it
  can read **and change or delete** workflows and other resources, not only read them. There is no
  read-only option to rely on.

When we looked at a PikaPods pod in August 2026 the key dialog offered a read-only scope and an
expiry. Do not assume yours does: n8n documents scopes as an Enterprise feature, and PikaPods'
setup may differ from yours. Look at the dialog on your own screen. If it offers no scope choice,
treat the key as full access.

Whatever your edition:

- **Create a key only for the migration**, with the shortest expiry n8n offers.
- **Delete it** in **Settings → n8n API** as soon as you are done.
- **Never share it** in a ticket, email or chat. Anyone holding it can act as your account.
- You never need to give anyone your PikaPods password or your SFTP credentials.

## What moves, and what you reconnect

This is the part worth reading twice. It is true of the export and API routes this page is
about. A full Adminer dump plus the SFTP files is a different operation and is covered below.

| Moves across | Doesn't move |
|---|---|
| Each workflow itself - all its nodes, connections and settings | The secret values behind your saved connections |
| Workflow names, tags and settings | Execution history from past runs |
| Which credential each node expects (by name and type) | Files stored by previous executions |
| - | Links *between* workflows (Execute Workflow and error-workflow references) |
| - | Instance variables, data tables, and community nodes you installed |

:::caution[If one workflow calls another, check the links after importing]
An **Execute Workflow** node, and the error workflow set in a workflow's settings, both point at
an internal workflow **ID**, not at a name. Importing creates fresh IDs on the destination, so
those links arrive pointing at the copies you left behind.

In a test on two n8n 2.33.7 instances in August 2026, the child workflow arrived with a new ID,
the parent still referenced the old one, and running the parent failed with
**`Workflow does not exist.`**

Every workflow still comes across and each is complete in itself - you re-point the links by hand
afterwards. Same for **community nodes**: install them on the new instance *before* importing, or
those nodes arrive unrecognised.
:::

**Your saved connections - Google, Slack, Stripe and so on - need reconnecting on the new
instance if you move through n8n's export or API.** That isn't a SpliceRun shortcut. n8n's public
API documentation states that credential data (secrets) is not included. The workflow that *uses*
the credential comes across intact; the secret behind it doesn't.

PikaPods separately lets you export the PostgreSQL database from Adminer
and download the app files (including the encryption key) over SFTP. (`N8N_ENCRYPTION_KEY` is one of
the env vars PikaPods lets you set, but n8n only reads it when the key isn't already in the settings
file - so on a pod that has already started, the settings file wins.) Together those are a full instance backup, which
PikaPods documents as their restore path onto a new pod. That is a dump-and-restore you do
yourself. It is not what an API-key migration copies. If a service offers to move your logins
through n8n's API, ask which of these two routes they mean.

:::note[How the encryption key actually travels on a restore]
n8n's docs put the rule in one line: *"If the key isn't yet in the settings file, you can set it
using an environment variable."* On a pod that has already booted, n8n has written a key into the
settings file, and pasting a different one into Env Vars will **not** override it.

PikaPods' own restore path works around that by replacing the file: create the new pod, **stop
it**, restore the SFTP files (which puts the old settings file, and therefore the old key, back),
import the database dump, then start it. Setting `N8N_ENCRYPTION_KEY` before the pod's first boot
is the alternative route, and it's the one to use if you're restoring a database dump *without*
the files.

One thing a restore does not carry: **environment variables aren't in PikaPods' backups** - their
docs say so - so you set those again by hand.
:::

In practice: your workflows arrive complete, each showing which connection it's waiting for, and
you reconnect them once. For most setups that's a handful of clicks.

## Moving your workflows by hand, today

No waiting on anything, no special access:

1. **Open a workflow** in your PikaPods n8n.
2. Click the **`…` menu → Download**. You get a standard n8n JSON file.
3. **In your SpliceRun n8n, create a blank workflow first** - the `…` menu lives on the workflow
   canvas, not on the Overview list - then click **`…` menu → Import from file** and choose that
   file.
4. Repeat for each workflow.
5. **Reconnect your credentials** on the new instance. For OAuth credentials (the ones you set up
   by clicking "Sign in with Google", Microsoft, Slack and so on), add your new n8n URL as an
   authorised redirect URI in that provider's app settings first, or the sign-in will fail.

After import, the Credentials tab on your new instance will be empty. That is expected. This is
the step you do once, yourself.

6. **Publish each workflow** once you've checked it.

After import, the workflow appears in your workflow list unpublished, which is what stops it
firing twice.

:::note[n8n 2.0 renamed this control]
Since n8n 2.0 there is no Active/Inactive toggle. A workflow is **Published** or **Unpublished**.
**Publish** is the button in the top right of the canvas; **Unpublish** is in the `…` menu. If
you're following an older guide that says "activate", that's the control it means.

Published state does **not** travel. In a test in August 2026, a published scheduled workflow was
exported and imported into another instance: the exported file carried no published flag, and the
copy landed unpublished even though the original was live. That is the behaviour you want - it is what
stops a workflow firing from both instances at once.
:::

:::tip[Import them unpublished, then publish deliberately]
**Any** workflow with a trigger - a schedule, a webhook, a mailbox it polls, a queue it reads -
will fire from **both** instances at once if both are published while you're still testing. Double
emails, double charges, double rows. Import first, reconnect credentials, check it over, then
publish one at a time. Imports arrive unpublished by default; doing it by hand, it's on you to
keep them that way until you're ready.
:::

Got more than a few workflows? You can [open a support ticket](https://app.splicerun.com/dashboard/support) and ask
whether we can help. The free plan doesn't include human support, so any help is best-effort and
we promise no reply time.

## Common questions

**Is PikaPods doing something wrong?**
No. Sandboxing customers to their own app's data is good security practice for a managed app
host. It's only a limitation in the specific context of moving to a different provider - and
n8n's own export and import cover that gap.

**Does any of this touch my PikaPods pod?**
The manual route only reads from it (you download files from your own n8n). Your pod keeps
running until *you* decide to cancel it - we never do that for you.

**Do you need my PikaPods password?**
No. Do not send it to anyone. See [A word on n8n API keys](#a-word-on-n8n-api-keys) if you are ever asked for a key.

**Can I keep my webhook URLs?**
The path at the end of each webhook URL travels with the workflow; the hostname in front of it is
what changes, so anything calling your webhooks needs re-pointing.

If you point your own custom domain at your PikaPods pod today, whether you can carry it across
depends on which SpliceRun plan you land on. **Custom domains work today on Bring Your Own Server
(BYOS)** - you keep the hostname you already use. **On Shared and Dedicated they are not available
yet**, so your instance answers on a `splicerun.net` address and the callers need updating. See
[Custom domains](/networking/custom-domains) for the current state of each lane. Where a domain does come with you, keep
the old pod running until DNS has finished moving, so nothing is dropped in the gap.

**What about my execution history?**
It doesn't travel with workflow exports.

## Need help?

[Open a support ticket](https://app.splicerun.com/dashboard/support) from your dashboard with roughly how many
workflows you have. Help is best-effort, whichever route applies to you, with no promised reply time.
