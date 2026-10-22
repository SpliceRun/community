---
title: Activity on your server
description: "Who logged in to your server, and anything that changed there that was not us - side by side on the instance page, next to the Work log of everything SpliceRun did, so a question about what happened is answered in one look."
sidebar_position: 4
---

# Activity on your server

On a **Bring your own server** instance you keep root. So do we, through one SSH key you
added. When something changes on the machine, the useful question is not "who is to
blame" but "what happened, and when". The instance page answers it without a ticket.

Open the instance and choose the **Work log** tab. Under the app's own log you will find
**Activity on this server**.

## What SpliceRun did

Every action we took on this server - health checks, backups, updates,
restores, moves - is the **Work log** itself, directly above this panel. If it is not in
the Work log, we did not do it.

## Logins to your server

SpliceRun's own SSH logins to your machine for **this app**, read from the server's log on
our last health check (every five minutes). For each one: when, which user, from which
address, and whether the server accepted it.

- **SPLICERUN** marks our own logins. A login is labelled ours only when **both** the key
  is the one you added for this instance **and** the connection came from SpliceRun's own
  address. Our key is fenced to that address (`from=` in the line you pasted), so it cannot
  be used from anywhere else even if someone had a copy.

**Other logins are not shown.** That includes your own SSH keys, password logins and
failed attempts. A server's login log covers everything on the machine, and one server
can run more than one app, sometimes for different SpliceRun accounts. SpliceRun cannot
tell which of those logins belonged to this app, so it shows none of them rather than risk
showing you someone else's. For the same reason the panel does not count failed logins.
Your server's own log (`journalctl -u ssh`) still has every login if you need it.

## Changes we did not make

On each health check we also compare the server with what we last set up:

| We report | Meaning |
|---|---|
| Compose file or environment edited | The app's configuration on the server differs from what we last wrote. Someone edited it by hand. |
| Container removed | A container we deployed is no longer in the project. |
| Volume missing | The data volume we created is gone. |
| Extra container | A container is running in our project that we did not deploy. |

When nothing differs, the line reads **Changes outside SpliceRun: none detected.** A
change we made ourselves (an update, a move) becomes the new baseline; only edits made by
someone else show up here.

## What this is for

- **Peace of mind.** You can see that the only thing touching your server is the work you
  are paying for, and when.
- **Faster support.** If something breaks, open a ticket from the instance page and we look
  at the same panel you do. A change made outside SpliceRun three hours before the outage
  is visible to both of us in one line, and the fix is usually the **Restore** button.
- **Security.** Password guessing against your server is visible instead of silent.

## What it is not

- Not live. It is read on our last health check, so it can be up to five minutes behind.
- Not a full audit log of the operating system. It covers SSH logins and the parts of the
  server we set up, not every file on the disk.
- Not available while your server is unreachable to us. If our key was removed or the
  server is off the network, the panel shows the last reading and the instance page says
  we cannot reach the server.

## Related

- [What we manage](../plans/what-we-manage.md): the line between what we do and what you do.
- [Audit trail](./activity-trail.md): every action taken in your dashboard, by whom.
- [Data and access](./data-and-access.md): what our key can and cannot do.
