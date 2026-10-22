---
title: Team management
description: "Invite members, manage roles, transfer ownership, and rename your workspace."
sidebar_position: 3
---

# Team management

Go to **Settings → Team** to manage everyone who has access to your SpliceRun workspace.

## Roles

Every member has one of three roles:

| Role | What they can do |
|---|---|
| **Owner** | Everything - billing, member management, ownership transfer, deleting the team |
| **Admin** | Invite and remove members, rename the workspace, manage instances and add-ons |
| **Member** | View instances, trigger restores, open support tickets |

There is exactly one owner per workspace. Billing is always tied to the owner's account.

## Inviting a member

1. Go to **Settings → Team**.
2. Under **Invite a member**, enter the person's email address.
3. They receive an invitation email with a link that expires after 48 hours.
4. Once they accept, they appear in the members list as a **Member** (you can change
   their role after they join).

Pending invitations are shown separately - you can cancel them before they are accepted.

## Changing a member's role

Only the **owner** can change roles. Click the role label beside any member's name to
change it. You cannot demote yourself if you are the only owner.

## Removing a member

The owner can remove any member. Removed members lose their SpliceRun access
immediately: every request re-checks team membership, so their next one fails.
They do not receive a notification.

Whether that also stops them reaching the instance itself depends on who runs the
front door in front of it:

- **We manage the front door** (the default). Our proxy checks each person on every
  request, so removing them stops them reaching the instance too.
- **You run your own web server in front of it.** Your web server decides who reaches
  the instance, and it does not ask us. Remove their access there as well.

## Transferring ownership

Go to **Settings → Team → Transfer ownership**, enter the new owner's email (they must
already be a member), and confirm. Ownership transfers immediately. You become an
**Admin** after the transfer - you are not removed from the workspace.

:::caution[Transfer ownership carefully]
The new owner controls billing and can remove any member, including you.
:::

## Renaming your workspace

Go to **Settings → Team → Team name** and enter the new name. This changes the
workspace name shown in the dashboard - it does not affect your domain, your instances,
or how billing appears on an invoice.

## Leaving a team

Go to **Settings → Team → Leave team**. You cannot leave if you are the only owner - transfer ownership first.

## Deleting the workspace

Only the owner can delete the workspace. Deletion is immediate and permanent, and there is
no restore window or notice period.

A workspace can only be deleted once it has no live instances or subscriptions, so cancel or
discard each instance first. What happens to an instance's data when you cancel it is set out in
[Billing, Cancellation, and Data Policy](../billing/cancellation-data-policy.md). If the
workspace has ever been invoiced it cannot be deleted outright, because we are required to keep
those records; you can still delete your account, which erases your personal data while the
invoices stay.

Before deleting, [export your data](../apps/n8n/export-your-data.md) from each instance.
Data deleted this way cannot be recovered.
