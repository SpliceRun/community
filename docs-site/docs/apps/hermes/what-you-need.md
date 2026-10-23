---
title: What your server needs
description: "Upstream resource guidance for running Hermes Agent."
sidebar_position: 2
---

# What your server needs

These are upstream container requirements, not a specification for SpliceRun's provisioning.

## What Nous Research says the agent needs

These are the numbers from Hermes Agent's own documentation, the Docker page at
[hermes-agent.nousresearch.com/docs/user-guide/docker](https://hermes-agent.nousresearch.com/docs/user-guide/docker),
as read on 2026-09-15. These figures describe the container.

| | Nous minimum | Nous recommended |
|---|---|---|
| **Memory** | 1 GB | **2 to 4 GB**. In their words: "Browser automation (Playwright/Chromium) is the most memory-hungry feature. If you don't need browser tools, 1 GB is sufficient. With browser tools active, allocate at least 2 GB." |
| **CPU** | 1 core | 2 cores |
| **Disk (data volume)** | 500 MB | 2 GB or more, which their table notes "grows with sessions/skills" |

The same page recommends shared memory for browser use (`--shm-size=1g`).
