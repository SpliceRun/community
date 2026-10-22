---
title: Outbound connections and DNS
description: "How your workflows reach external services, and how hostnames are resolved from inside your instance."
sidebar_position: 1
---

# Outbound connections and DNS

The short version:

> **Your instance can reach the internet, and name resolution is provided by the platform.**
> You do not configure it, and there is nothing to switch on.

If an HTTP Request node, an outbound webhook or a credential test cannot reach a web address,
this page is the place to start.

## What your instance can reach

| | |
|---|---|
| **Outbound HTTPS and HTTP** | Any public address, on the normal ports |
| **Web addresses by name** | `api.example.com` resolves the same as it would anywhere |
| **Third-party credential tests** | Slack, Airtable, Notion and the rest connect normally |
| **Inbound to your instance** | Your own HTTPS address, which is a separate thing - see [What we manage](../plans/what-we-manage.md) |

You do not need to allowlist anything, open a port, or tell us which services you plan to call.

## Where DNS lookups go

Name lookups from your instance are answered by **Cloudflare (`1.1.1.1`)**, with **Google
(`8.8.8.8`)** as a fallback.

We are telling you this plainly because it is worth knowing: the *name* you look up - not the
contents of the request - is seen by a third-party resolver. If your organisation has a policy
about that, or a security questionnaire asks, this is the answer. The connection itself goes
directly from your instance to the service you are calling.

This is a platform setting. It is not configurable per instance, and you cannot point your
instance at your own DNS server.

## If a request is failing

The exact error text matters, because two very different faults look similar.

**Errors that mean a name could not be resolved:**

- `EAI_AGAIN`
- `getaddrinfo ENOTFOUND`
- "The service refused the connection"
- "Couldn't connect with these settings" on a credential test
- "The HTTP Request node fails but the URL works in my browser"

Check whether **every** address fails or only **one**:

- **One address fails, others work.** The problem is at the other end - that host is down,
  blocking us, or the address has a typo. Try the same URL from your own machine.
- **Every address fails.** That is ours. [Open a support ticket](https://app.splicerun.com/dashboard/support)
  from your dashboard and include the error text exactly as it appears.

**If the workflow instead runs for a while and then stops**, that is a different thing entirely - it is the run limit on your plan, not a connection problem. See
[Choosing a plan](../plans/choosing-a-plan.md).
