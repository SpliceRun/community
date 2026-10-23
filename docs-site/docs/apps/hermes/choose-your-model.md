---
title: Choose your model
description: "How to test whether your chosen model is answering and change it in Hermes."
sidebar_position: 3
---

# Choose your model

**If your agent is installed, set up, and takes minutes to answer or never answers, change the
model first.** It is the most common cause by a wide margin, and it is a one-field change on your
agent, on Hermes' own **Models** page, under the bot you mean.

## How to tell with one message

Open your agent at its web address and send it one short message: `Reply with the single word
pong.` Count.

- **Under ten seconds:** the model is answering normally.
- **Over a minute, or nothing:** try another model on Hermes' **Models** page before reinstalling or changing your server.

If you want a second opinion before you switch, the model's own page on openrouter.ai lists the
providers serving it with their latency and throughput. A model with one provider and a long
latency figure is likely to be slow for your agent too.

## Changing the model later

Change it on Hermes' own **Models** page, under the right bot: use the **profile switcher at the
top left** first if your instance runs more than one.
