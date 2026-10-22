---
title: What our monitoring can see
description: "Exactly what SpliceRun reads from inside your instance, what it cannot read, and how to check that for yourself."
sidebar_position: 3
---

# What our monitoring can see

Your n8n keeps a record of every run in its own database, on your instance. We watch whether
your instance is **up**, which does not touch that database at all. Anything beyond that is
something you switch on yourself, and **nothing is on by default**.

## What you can switch on

Each setting is a separate tick box on your instance page, and each one adds exactly one thing
to the one before it. Ticking a box also ticks the ones above it.

| Setting | What we read | What we do not read |
|---|---|---|
| *(nothing - the default)* | Nothing at all. We do not open your database. | Everything. |
| **Tell me when a workflow fails** | Run metadata, to count how many runs failed: run id, workflow id, status, mode, and start and stop times. | Workflow names, what a workflow does, error messages, any of your data. |
| **...and tell me which workflow** | Also the workflow's **name**. A name you chose can itself say something, such as a client's name. | What the workflow does, error messages, any of your data. |
| **...and tell me which step failed** | Also the **name of the step** that failed, when exactly one step in the run is recorded as failed. | The error message, your workflow's contents, your credentials, and the data that flowed through the run. |

The step name is the one item that comes from inside the stored run, so it is read in a different
way from the rest. [The next section](#what-the-restricted-monitoring-login-can-read) explains how.

Leaving everything off does not reduce the service. Uptime monitoring, backups, restarts,
updates and certificate renewal all keep working, because those watch the container your
instance runs in rather than what is inside it.

We do not run these checks on Dedicated servers, which are not open for orders today. Where the
checks run, what they find is shown in your dashboard; emails, and alerts when a workflow goes
quiet, come with the [workflow contracts add-on](../account/addons.md).

### Workflow contracts read the same thing, and nothing more

If you buy the workflow contracts add-on, it counts **how many times** a workflow ran, and when,
so it can tell you when one stops running or runs far more often than expected. That uses the same
run metadata as the table above - run counts and times, not contents. It needs
**Tell me when a workflow fails** switched on first. With monitoring off it does not connect to
your database, so a contract simply reports nothing rather than switching anything on for you.

## What the restricted monitoring login can read

Our monitoring reads your database with a separate login, created when your instance is set up.
It is not the login your n8n uses, and it has no password: it can only be used from inside your
database container, which our monitor reaches over the SSH connection described below.

That login has three limits, and it is worth being clear about which are enforced by your
database and which are not.

1. **Enforced by your PostgreSQL: the table your run data is stored in.** The login is refused
   access to `execution_data`, the table that holds what flowed through each run.
2. **Enforced by your PostgreSQL: a short list of columns elsewhere.** The login may read seven
   columns of run metadata (id, workflow id, status, mode, started, stopped, deleted) and the
   workflow's id and name. Nothing else in those tables.
3. **Enforced by our monitoring code, not by the grants: which of those it reads at your chosen
   level.** The grants are the same whichever box you ticked. We check your setting before
   each read and read nothing if it is off, but that part is our software following your
   setting, not something your database enforces.

**One function reads inside the run data.** To find a failed step's name, the login is also
allowed to run a single function, `splicerun_failed_node`. The function runs with its owner's
rights, so it can open the stored run to look for the failed step. It returns only a status word
and the step's name, cut to 200 characters, and it reports the step as unknown if more than one
step failed or the run cannot be read. We only call it when you have ticked the third box. You
can read the function's source in your own database. What it returns is limited by that code and
by our choice to call it only at the third level, not by a grant.

**You can check the grants yourself.** Connect to your own database as its owner and run:

```sql
-- Table and column access held by SpliceRun's monitor:
SELECT table_name, column_name, privilege_type
  FROM information_schema.column_privileges
 WHERE grantee = 'n8n_failure_probe'
 ORDER BY table_name, column_name;

-- Access to the table holding your run data (expect 0):
SELECT count(*) AS grants_on_your_run_data
  FROM information_schema.table_privileges
 WHERE grantee = 'n8n_failure_probe'
   AND table_name = 'execution_data';

-- The one function the monitor may run:
SELECT routine_name, privilege_type
  FROM information_schema.routine_privileges
 WHERE grantee = 'n8n_failure_probe';
```

The first query returns nine rows: seven pieces of run *metadata* plus the workflow's id and name.
The second returns **0**. The third returns one row, `splicerun_failed_node`.

If monitoring is switched off, the monitor does not connect to your database at all - the
permissions above are simply never used.

## What this does not mean

The restricted login limits **the monitor**. It does not remove every other way SpliceRun, as
the operator of the service, could reach your data. Being specific:

| Route | What it means |
|---|---|
| **SSH to your server** | On Bring your own server, you give SpliceRun an SSH key so we can set up, update, back up and restore your instance. That access is what the service runs on. Technically, anyone holding it can run commands on your server, including reading your app's files and database. The key only works from SpliceRun's control server, you can revoke it at any time from your instance page, and your server's login history shows when it was used (see [Activity on your server](./server-activity.md)). If you remove the key, we have no access. |
| **Backups** | Backups are taken from your server over that SSH connection. A backup contains your database, your app's data volume and your instance's encryption key (see [Backups and recovery](../data/backups-and-recovery.md)). While a backup job runs its files sit unencrypted for a short time on our backup host; once stored they are encrypted, and SpliceRun holds the key to that storage. So SpliceRun's backup system can, in principle, produce a readable copy of your instance, including your saved credentials. |
| **Our own staff** | Our automated jobs are written not to read your workflow contents or credentials, and we do not log in to your server except for the work listed in [What we manage](../plans/what-we-manage.md). That is a rule we follow and show you evidence of in the activity log; it is not something the monitoring login enforces. |

On a server we operate instead (the Shared and Dedicated plans, which are not open for orders
today), there is no separate server for you to revoke access to, and the operator can reach what
is on the machine in the same way. That is true of every managed host.

## What stays under your control

- **Your server and your provider account.** You can remove our SSH key, stop the instance or delete
  the server at any time.
- **Your credentials.** The credentials you save inside n8n are yours to create, rotate and
  delete. Rotating a credential at the service that issued it (a new API key, a new OAuth grant)
  makes any older copy useless, including one in a backup.
- **Your encryption key.** Your instance's encryption key is what makes the saved credentials
  readable. The settings you change on your instance page are applied without sending that key
  to us. It is, however, included in the backups described above, so treat "who can read a
  backup" as part of your own risk assessment.
- **Monitoring itself.** It is off by default and you can switch it off per instance.

If your requirements are strict (for example, you must be able to show that no third party can read
a credential), treat SpliceRun as a party that can technically reach your server and backups, and
decide on that basis.

---

**Questions about what we can see?** [Open a support ticket](https://app.splicerun.com/dashboard/support)
from your dashboard. To report a security problem, email support@splicerun.com.
