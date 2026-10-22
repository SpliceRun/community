---
title: Execution history and retries in n8n
description: "Two n8n defaults that surprise people: past runs are pruned after 14 days or 10,000 executions, and Retry On Fail is capped by n8n at 5 attempts and 5 seconds whatever you type."
sidebar_position: 8
---

# Execution history and retries in n8n

Two things n8n does by default that are worth knowing before you rely on either.
Neither is a SpliceRun restriction; the second one cannot be changed at all.

## Past runs are kept for 14 days, or 10,000 executions

Every n8n instance on SpliceRun starts with execution pruning **on**:

| Setting | Default | What it means |
|---|---|---|
| Keep execution history for | 336 hours (14 days) | Runs older than this are deleted |
| Maximum stored executions | 10,000 | Once there are more than this, the oldest go first |

Whichever limit is reached first wins. The workflows themselves, your credentials and
your settings are never pruned - only the log of past runs.

You can change both from your dashboard, under your instance's **Settings**
("Keep execution history for" accepts 1 to 365 days). Longer history uses more disk,
and on a Shared plan that disk is part of your plan allowance.

Two consequences that are easy to miss:

- **A backup contains the execution history that existed when it was taken.** Restoring a
  backup from last week brings back last week's history, not runs that had already been
  pruned before the backup ran. See [Backups and recovery](../../data/backups-and-recovery.md).
- **If you need runs from more than two weeks ago for an audit or a dispute, raise the
  limit before you need it.** Pruned executions cannot be recovered by us or by n8n.

## Retry On Fail is capped by n8n itself

A node's **Retry On Fail** setting offers two numbers: how many attempts, and how long to
wait between them. n8n clamps both, regardless of what the editor lets you type:

| | Minimum | Maximum |
|---|---|---|
| Max. Tries | 2 | 5 |
| Wait Between Tries | 0 ms | 5,000 ms |

So a node set to "retry 10 times, waiting 30 seconds" actually retries 5 times, 5 seconds
apart, and the editor does not say so. This is in n8n's workflow execution code, not in
anything SpliceRun configures, and it applies to every n8n installation.

If you need longer or more patient retries - waiting for a rate limit to reset, for
instance - build them into the workflow: a **Wait** node and a loop, or an **Error
Trigger** workflow that re-runs the failed execution later.

## Being told when a workflow fails

n8n's own mechanism is an **error workflow**: a second workflow that starts with the
**Error Trigger** node, which you name under *Options → Settings → Error workflow* on any
workflow you want covered. It runs whenever that workflow's execution fails and receives the
workflow name, the failing node, the error message and a link to the execution - so it can
email you, post to Slack, or retry. One error workflow can serve all your workflows. n8n's
guide: [Handle errors gracefully](https://docs.n8n.io/build/flow-logic/handle-errors-gracefully/).

Two things to know, both consequences of the settings above:

- **The execution link in an error alert only works while that run still exists.** Runs are
  pruned after 14 days (or 10,000 runs) by default, so an alert older than that points at
  nothing. Raise *Keep execution history for* if you file alerts for later.
- **If the failure is in the trigger node itself** (a webhook that could not register, a
  schedule that could not start), n8n does not create an execution at all, so the error
  workflow gets the trigger details instead of an execution link. That is n8n's behaviour on
  every installation, not something SpliceRun configures.

SpliceRun does not change any of this. On a server you own, n8n's error workflow is the way to
be told about a failed run; SpliceRun's own health checks watch whether the *instance* is
serving, not whether an individual workflow succeeded.
