---
title: Managing your instance
description: "Day-to-day controls for a running instance: status, restart, stop and start, updates, rollback, SSL, and alerts."
sidebar_position: 1
---

# Managing your instance

Open **Instances** in the left sidebar to see every instance your team has. Click any row
to open its detail page - everything below lives there.

:::note[Which app this page is about]
Status, restart, SSL and alerts work the same for every app we run. The
settings, login-reset and licence sections further down are about **n8n**.
:::

## Instance status

The status badge tells you where your instance is in its lifecycle:

| Status | What it means |
|---|---|
| **Provisioning** | We are setting up the server and installing the software. Nothing for you to do. |
| **Awaiting host** | BYOS only - we are waiting for you to confirm the hostname before we can start. |
| **Live** | Running and reachable. |
| **Stopped** | The app process is stopped, but your data is still there. |
| **Restarting** | A restart was requested and is in progress. |
| **Failed** | Provisioning did not complete. Open a support ticket with the instance ID. |

The page refreshes automatically - you do not need to reload it to watch progress.

## Restart

A **Restart** button appears on live instances. Use it when n8n is unresponsive, after
changing an environment variable, or when a workflow is stuck in a state it should not
be in.

A restart does not affect your data, your workflows, or your credentials. Execution
history is preserved. The instance is unreachable for roughly 30-60 seconds during the
cycle.

:::note[Restart is not the same as reinstall]
Restart brings the app process down and up again on the same container. It does not
re-provision the server, re-apply configuration, or update the app.
:::

## Stop and Start

On Bring your own server, **Stop instance** sits next to Restart. It stops the app on your server
and keeps it stopped: anything running at that moment is interrupted, nothing is deleted, and the
database stays up so the nightly backup still runs. While it is stopped we do not start it for you,
not for an update and not for a restart, and a restore is refused until you press Start. Our
checks show it as **Stopped by you**, not as down. The same button then reads **Start instance**. Both are recorded in the Work log.

## Changing your app version

:::note[We keep this up to date for you]
New n8n releases are installed inside the **maintenance window** you set on this
page - or during SpliceRun's default hours if you have not set one. We check that
no workflow is running, take a backup, and put the old version back automatically
if the new one does not come up healthy.

Crossing a **major** version is the exception: that always waits for you to agree.
:::

When a newer release is available, the instance page shows it. **Update now**
installs it immediately rather than waiting for your window.

The **history** panel records every version change on that instance: what it moved
from and to, when, and whether it succeeded.

Your window, the default hours, security releases and going back are all covered in
**[Updates and maintenance windows](./updates.md)**.

## Going back to an earlier version

If a version change causes a problem - a workflow stops working, a credential breaks,
a node disappears - you can return the instance to a version it was running before.
This is for Shared and Dedicated. On Bring your own server there is no **Go back** button:
the only way back is the automatic one, when an update does not come up healthy.

1. Open the instance detail page.
2. Choose **Go back to \<version\>**, under the version panel.
3. Confirm.

Your workflows, credentials and execution history are not touched. Only the
application version changes. Updates then pause on that instance for 30 days, so it
does not move forward again while you are still investigating - security releases
still apply.

:::caution[7 days, and up to two versions back]
The option relies on the backup taken immediately before the change, so it is
available for **7 days**. You can return to either of the last two versions you were
running, choosing how far back to go. If you need to go further back than that, open
a support ticket rather than repeating it.
:::

## SSL certificate

Your instance comes with a TLS certificate managed by SpliceRun. The instance page
shows its status and expiry date. Certificates renew automatically - you do not need to
do anything.

If the SSL status shows a problem, it is almost always a DNS issue. See
[Custom domain SSL troubleshooting](../troubleshooting/custom-domain-ssl.md).

## Execution timeouts

n8n has a built-in execution time limit. If your workflows are hitting it regularly,
the instance page surfaces a timeout alert:

- **How often** timeouts are happening
- **Which workflows** are most affected
- **Whether an upgrade** (more CPU or memory) is likely to help, or whether the
  workflow itself needs to be redesigned

Timeouts cut executions short - they do not crash the instance or affect other
workflows running at the same time. [Why is my n8n slow?](../apps/n8n/slow-or-high-cpu.md)
has more on diagnosing the cause.

**You can raise the limit yourself**, up to the ceiling your plan allows - see
[Settings you can change](#settings-you-can-change) below. Redesigning the workflow
or moving to a larger plan are not the only two options.

## Settings you can change

The **Limits** panel on the instance page holds settings that belong to your instance
rather than to your plan. Change one, press save, and the instance restarts briefly to
pick it up - that restart is not optional, because these values are read when the
instance starts.

| Setting | What it controls |
|---|---|
| **Maximum workflow run time** | How long a single run may take before it is stopped. Your plan sets the ceiling. |
| **Maximum Code node run time** | How long one Code node may run. A separate limit from the one above. See the warning below. |
| **Timezone** | What your Schedule and Cron nodes think "9am" means. See the warning below. |
| **Keep execution history for** | How long past run data is kept before it is pruned. Anything from 1 day to a year. |
| **Maximum stored executions** | A cap on how many runs are kept, whichever limit is reached first. |
| **Maximum payload size** | The largest request body a webhook or HTTP node will accept. |
| **Concurrent workflow runs** | How many production runs happen at once. |
| **Database connections per process** | Raise this alongside concurrent runs, or runs queue behind each other. |
| **Allow webhook pages to run unsandboxed** | Only if you serve a page from a Webhook node and it stopped working. See below. |
| **Hide n8n's "Usage and plan" screen** | Turn this off if you have bought a licence from n8n and want to activate it. See below. |

:::warning[Check your timezone before you trust a schedule]
**n8n defaults to UTC.** If the Timezone field says UTC and you are not in UTC, every
scheduled workflow is firing at the wrong local time - a job set for 9am runs at 2:30pm
if you are in India.

Nothing fails and nothing is lost when this happens. The runs happen; they happen at the
wrong hour, with no error to notice. That is what makes it worth checking rather than
waiting to spot it.

Setting it correctly and saving fixes it from the next run onwards. It does not move runs
that are already scheduled until the workflow is saved again.
:::

Two of these interact, and it is worth knowing which way. **Raising concurrent runs
without raising database connections** makes runs wait on each other instead of running
in parallel. **Raising both far beyond what the machine can carry** trades one queue for
another. If you are unsure, raise them one step at a time and watch the instance.

:::warning[A Code node can stop with no error message at all]
**Maximum Code node run time is a separate limit from Maximum workflow run time**, and it
does not obey it. A Code node that runs past its own limit is stopped on its own, even
though the workflow as a whole still had time left.

What you see when this happens is the hard part: the run is marked failed and **the error
message is empty**. Not a timeout message, not a stack trace - nothing. People reasonably
report this as "it just stopped and there was no error", and they are describing it
accurately.

If a Code node is failing with nothing written against it, raise this setting before you
start rewriting the code. If the same node then succeeds, the limit was the cause.
:::

### Serving a page from a Webhook node

If you return HTML from a Webhook node, n8n serves that page in a **sandboxed frame**. That
is n8n's own behaviour and it is the safe default, but it has a consequence worth knowing:
scripts on that page are blocked, relative links stop resolving, and a browser request from
that page to another webhook on the same instance is no longer treated as same-origin, so it
fails.

The symptom is a page that used to work and now does not, with nothing on your side having
changed.

**Allow webhook pages to run unsandboxed** turns that protection off. Only turn it on if you
actually serve a page this way and it has broken - it lowers the protection on every page
your instance serves like that, so leave it off otherwise.

### Using an n8n licence you have bought

n8n sells paid self-hosted plans directly. If you buy one, you activate it **inside your own
n8n**, at **Settings → Usage and plan → Enter activation key**.

That menu is hidden by default on your instance, because on a self-hosted install the screen
is mostly about n8n's own cloud plans and is more confusing than useful. Turn **Hide n8n's
"Usage and plan" screen** off and it comes back, and you can paste your key in.

:::note[Your licence stays yours]
We never ask for, see or store your n8n licence key. You buy it from n8n, you activate it,
and it lives on your server. We deliberately do not offer to hold it for you - it is a
credential, and the fewer places a credential exists the better.

This is a **Bring your own server** matter in practice, since that is where you own the
machine the licence runs on.
:::

### Running workflows on separate workers

On [Bring your own server](../plans/bring-your-own-server.md) you can also move execution
off the main process entirely.

By default your workflows run inside the same process that serves the editor, so one
heavy run makes everything else feel slow. Turning on **workers** gives execution its own
processes: the editor stays responsive, and runs genuinely happen in parallel rather than
taking turns.

Pick **No workers**, or 1, 2 or 3, on your instance page. Each worker is a full n8n
process using roughly 400 MB of your server's memory, so choose what the machine can
carry - past three, a bigger machine is the honest answer rather than a fourth worker.

:::note[Availability]
Workers are a Bring-your-own-server feature. They need extra containers alongside n8n,
which the shared platform's isolation does not permit.

An instance created before **20 August 2026** needs its configuration refreshed before
workers can be switched on. If you turn them on and get told that, open a support ticket -
we will do it. We would rather tell you than switch something on that quietly does nothing.
:::

## Request limits: upload size and how long a request may take

These are limits of the **proxy in front of your instance**, not of n8n, and
they are the ones people hit first when a workflow handles files or calls a slow
API. On instances we host:

| | Limit | What hits it |
|---|---|---|
| **Request body size** | **100 MB** | A webhook posting a file, a form upload, an API call with a large payload |
| **How long one request may take** | **1 hour** | A workflow that responds to a webhook only after doing a lot of work |
| **Time to connect** | 15 minutes | Rarely relevant |

Both of the first two changed on **14 August 2026**. Before that the body limit
was the web server's stock **1 MB**, which rejected larger uploads with a
`413 Request Entity Too Large` before they ever reached n8n, and a single
request was cut at **15 minutes**.

Two things worth knowing:

- **Going over the body limit looks like a client error, not ours.** The sender
  gets `413` and n8n never sees the request, so nothing appears in your
  execution list. If a webhook seems to vanish only when the payload is large,
  this is the first thing to check.
- **The request limit is not the execution limit.** A workflow can run far
  longer than an hour when it is *triggered* by a schedule rather than by an
  HTTP request, and nothing is waiting on the other end of a connection. The hour
  applies to how long a caller will be held open. See
  [Execution timeouts](#execution-timeouts) for the separate, n8n-side limit.

:::note[On Bring your own server]
These limits come from the proxy configuration on the machine. On a
bring-your-own-server instance that machine is yours, so its own limits apply.
:::

## Workflow failures

If you switch on failure monitoring for an instance, the dashboard shows when its workflows
fail. How much it says depends on which box you ticked: a count of failed runs, then the
workflow's name, then the name of the step that failed. It never shows the error message or the
data in the run. With monitoring off, nothing here is read. What is read, and how, is set out in
[What our monitoring can see](../security/monitoring-what-we-can-see.md).

This covers only runs that n8n records as failed in its own database. It does not cover every
possible failure mode.

## Backups on the instance page

The instance detail page shows the last backup timestamp and the most recent restore
points available. You can trigger a restore directly from here. Full details are in
[Backups and recovery](../data/backups-and-recovery.md).

## Cancelling or discarding an instance

- **Before provisioning is complete**: use the **Discard** button to abandon the
  request and stop billing.
- **After provisioning**: use **Cancel** in the billing settings. On a paid
  term your instance stays live until the end of the current period, then is
  deprovisioned. During early access there is no period to wait for, so it is removed
  straight away. See
  [Cancellation and data policy](../billing/cancellation-data-policy.md).
