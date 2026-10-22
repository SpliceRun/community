---
title: Audit trail
description: "A read-only record of sensitive actions in your workspace: who did what, and when."
sidebar_position: 2
---

# Audit trail

The audit trail is a record of the sensitive actions taken in your workspace - invitations,
role and plan changes, credential views, instance controls, deploys, and more. It exists so
that when something changed and nobody remembers changing it, you can find out who did and
when, without asking support.

:::note[Available on every plan, to every member]
The audit trail is part of your account rather than any one instance, so it works the same
on Shared, Dedicated, and Bring-your-own-server plans. Every member of the workspace can
open it and read the full team record - owner, admin, and member alike. There is no
role restriction and nothing to enable.
:::

## Where to find it

Left sidebar → **Account** → **Audit**.

## What you see

| Column | Meaning |
|---|---|
| **When** | The time the action was recorded, shown in your browser's local timezone |
| **Action** | The event name, e.g. `invite_sent` |
| **Actor** | The email address of the person who did it |
| **IP** | The IP address the request came from, where it was captured |

Events are listed newest first, 25 to a page.

## Filtering

1. Open **Account → Audit**.
2. In **Action**, type the exact event name you want (see the table below). Leave it empty
   to see everything.
3. Set **From** and **To** to bound the date range. Either can be left empty.
4. Click **Filter**.

The filter is stored in the page URL, so you can bookmark a filtered view or send it to a
colleague on your team.

:::caution[The To date stops at the start of that day]
**From** and **To** are read as UTC dates at midnight. Setting **To** to today therefore
excludes everything that happened today. To include a day, set **To** to the day *after*
the last day you want.
:::

## Common event names

The **Action** filter is an exact match, not a search - `invite` finds nothing, `invite_sent`
finds the invitations. These are the names you are most likely to want:

| Action | What it records |
|---|---|
| `invite_sent` | A team invitation was sent |
| `invite_accepted` | Someone accepted an invitation and joined |
| `invite_revoked` | A pending invitation was cancelled |
| `password_changed` | A member changed their password |
| `api_token_created` / `api_token_revoked` | An API token was issued or revoked |
| `ssh_key_added` / `ssh_key_revoked` | An SSH key was added or revoked |
| `instance_owner_password_viewed` | Someone revealed an instance's first-login password |
| `instance_settings_changed` | An instance's settings were changed |
| `instance_plan_changed` | An instance was moved to a different plan |
| `instance_update_now` / `instance_update_window_set` | A version change was triggered, or the update window was changed |
| `instance_version_rollback` | An instance was rolled back to an earlier version |
| `instance_cancel_requested` / `instance_cancel_reverted` | A cancellation was requested, or undone |
| `backup_export_downloaded` | A backup export was downloaded |
| `volume_created` / `volume_mount_requested` / `volume_delete_requested` | Storage volume changes |
| `cicd_pipeline_created` / `cicd_manual_deploy` | Pipeline created, or a deploy triggered by hand |
| `wallet_topup_started` / `wallet_autorefill_changed` | Wallet activity |
| `support_ticket_created` / `support_ticket_replied` | Support ticket activity |
| `team_created` / `team_deleted` / `account_deleted` | Workspace and account lifecycle |

Related: [Team management](../account/team.md) for who holds which role, and
[Account security](../account/security.md) for passwords, sessions, and two-factor.

## Limits and things worth knowing

- **Records cannot be changed or removed.** The audit log is append-only and the database
  enforces it - not even SpliceRun can edit or delete an entry. A record that needs
  correcting is annotated with a new entry, never overwritten.
- **Records are kept for 24 months**, then removed by an automatic retention sweep.
- **Paging is done in the URL.** There are no next/previous buttons yet. To see older
  events, add `?page=2` (`?page=3`, and so on) to the address, or narrow the date range.
- **The IP column is usually blank.** It is captured for only a few event types and shows a
  dash otherwise. Its absence does not mean the event is incomplete.
- **The Actor column shows a dash** when the action was taken by an automated process rather
  than by a signed-in person.
- **Times are local, dates are UTC.** The **When** column uses your browser's timezone; the
  **From** and **To** filters use UTC. Near midnight the two disagree by a few hours.
- **This is not your n8n execution log.** It records actions taken in the SpliceRun
  dashboard, not what your workflows did. Workflow runs live inside n8n.

---

**Something in the trail you cannot explain?** [Open a support ticket](https://app.splicerun.com/dashboard/support)
with the timestamp and the action name. If you think someone else got into your account, email
support@splicerun.com as a security report.
