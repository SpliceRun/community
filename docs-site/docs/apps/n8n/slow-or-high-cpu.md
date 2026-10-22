---
title: n8n is slow or using high CPU
description: "Workflows taking longer, a sluggish editor, or executions queueing behind each other - and how to tell a workload problem from a plan problem."
sidebar_position: 6
---

# n8n is slow or using high CPU

Workflows take longer than they used to, the editor feels sluggish, or executions queue
up behind each other.

Almost always this is one workflow doing more work than it looks like it's doing. The
fastest way to find it is n8n's own execution history - start there before changing
anything.

## Find which workflow is responsible

Open **Executions** in n8n. It lists every run with its duration, so sort by longest and
look at what's at the top. Two patterns account for most cases:

- **One workflow that's slow every time.** Something inside it is expensive - see below.
- **A workflow that's fine alone but runs constantly.** A polling trigger set to a short
  interval, or a webhook firing far more often than expected. Check how many executions
  it has recorded in the last 24 hours, not just how long each one takes.

Open the slowest execution and look at the per-node timings. The node holding the time
is usually obvious once you look.

## The common causes

**Loops over large item sets.** A node that runs once per item will run a thousand times
for a thousand items. Where the service supports it, send items in bulk instead - one
request with many records rather than many requests with one record each.

**Waiting on someone else's API.** If an external service takes two seconds to respond
and you call it two hundred times, that's nearly seven minutes of pure waiting and none
of it is your instance's fault. Batch these calls, or cache results you'll need again.

**Large binary data.** Files moving through a workflow are held in memory. Big
attachments or images processed in a loop will consume far more memory than the item
count suggests.

**Execution history that's grown very large.** Every execution is stored, and a busy
workflow saving full data on every run builds a large database over time - which slows
down the executions list itself. Reducing what's retained for high-frequency workflows
often fixes "the UI got slow" specifically. You control how much is kept from the
**Limits** panel on your instance page - see
[Settings you can change](../../account/managing-your-instance.md#settings-you-can-change).

**Everything is taking turns through one process.** n8n runs your workflows inside the
same process that serves the editor, and that process handles one thing at a time. So a
single heavy run makes the editor sluggish and holds up everything behind it - even on a
machine with cores to spare and nothing near its memory limit. This is the cause people
most often mistake for "the plan is too small", because adding CPU changes nothing on its
own.

On [Bring your own server](../../plans/bring-your-own-server.md) you can move execution onto
separate worker processes, which is the actual fix for this one: the editor stays
responsive and runs happen in parallel instead of queueing. See
[Running workflows on separate workers](../../account/managing-your-instance.md#running-workflows-on-separate-workers).

**The instance is genuinely at its limit.** If workflows grew steadily and nothing else
explains it, you may simply need more resources than your current plan provides. See
[Choosing a hosting option](../../plans/choosing-a-plan.md).

## Before you change anything

**Take a manual backup first.** The button is on your instance page, and the snapshot is
available to restore immediately. Restructuring a workflow you depend on is exactly the
kind of change worth being able to undo - see
[Backups & Data Recovery](../../data/backups-and-recovery.md).

## When it's not the workflows

If your instance is **unresponsive, restarting repeatedly, or down** - as opposed to
slow - that's a different problem and it's ours. Don't spend time optimising workflows
first; send it to us.

## Where the line falls

Worth being straight about this so there's no surprise:

- **Your instance being down, restarting, or broken by something we changed** is on
  our side. Our checks catch it, and a failed update is rolled back automatically.
- **Making a specific workflow faster** is application-level work - it's your workflow,
  and paid help inside the application is not offered right now.

Either way, you can open a support ticket from your dashboard, but the free plan doesn't
include human support, so ticket replies are best-effort, and we don't
promise a reply time.

Full detail: [What we manage](../../plans/what-we-manage.md).

---

**Not sure which it is?** [Open a support ticket](https://app.splicerun.com/dashboard/support) -
send it over and we'll tell you which side of the line it's on.
