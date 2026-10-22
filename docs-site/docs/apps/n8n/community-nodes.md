---
title: Community nodes
description: "Community nodes are off by default. On your own server (BYOS) you can switch them on yourself. This page explains the risk and how."
sidebar_position: 7
---

# Community nodes

Community nodes are extra n8n nodes that other people publish as npm packages. They
are **off by default** on every SpliceRun instance. If you open **Settings → Community
nodes** in n8n and the option is missing, this is why.

## On your own server (BYOS): you decide

It's your server, so you can switch them on:

1. Open your instance page in the SpliceRun dashboard and go to **Settings**.
2. Tick **Allow community nodes** and save. Your instance restarts briefly to pick
   up the change.
3. In n8n, open **Settings → Community nodes** and install the package you need.

Installed nodes are kept through updates and included in your backups.

**One limit:** community nodes can't be on at the same time as **queue mode**. In
queue mode your production runs happen on separate workers, and those workers don't
have a copy of the nodes you installed, so any production run that uses one would
fail. The dashboard won't let you switch on both. Turn one off before turning the
other on.

## Why they are off by default

A community node is code from npm that runs inside your n8n, with the same access
as your own workflows. That includes your saved credentials. A package with a
supply-chain compromise can read those credentials or disrupt your workflows. Malicious
npm packages posing as community nodes have been reported before, so treat any package as
code you are choosing to trust.

n8n marks some packages as verified. For anything else, check who publishes it
before you install it.

## On Shared: not available

On Shared, many customers' instances run on the same machine, so a bad package
isn't only your risk. Community nodes stay off there.

## Alternatives to a community node

**1. Use the HTTP Request node.** Most community nodes are thin wrappers over a
REST API. The HTTP Request node can call that API directly, with a few
expressions, without installing a package.

**2. Use the Code node.** If you need custom logic, the Code node runs
JavaScript directly, with `$input`, `$node` and the n8n expression helpers. It
can't read your server's environment variables, which is on purpose.

**3. Ask us.** Open a support ticket naming the node you need and what you are
trying to do, and we'll point you to the simplest safe route.
