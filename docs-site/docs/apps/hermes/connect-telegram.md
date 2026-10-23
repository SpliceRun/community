---
title: Connect Telegram
description: "Talk to your agent from Telegram, using a bot you create. Optional, set up in Hermes' own dashboard, and it needs numeric user IDs rather than @usernames."
sidebar_position: 4
---

# Connect Telegram

You can talk to your agent from Telegram instead of, or as well as, its web dashboard. This is
optional. Your agent works without it.

## Step 1: create a bot

In Telegram, message **@BotFather** and send `/newbot`. Answer its two questions. At the end it
gives you a token that looks like `123456789:AA...`. Copy the whole line.

:::warning[Do not reuse a bot that is already running somewhere]
Do not reuse the same bot token in multiple running gateways; concurrent polling can cause conflicts. Create a fresh bot for this agent.

:::

## Step 2: find your Telegram user ID

Message **@userinfobot** in Telegram. It replies with your numeric user ID.

**Use your numeric Telegram user ID, not your @username.**

## Step 3: add the bot in Hermes

Open Hermes Agent, go to **Channels**, and add Telegram there. Give it the bot token BotFather gave you and the numeric
user IDs from step 2 of everyone the agent should answer. Add at least your own numeric user ID to allow yourself access.

**Use the profile switcher at the top left first** if your instance runs more than one bot. A token
entered under one bot is not visible to another; keys and channels do not cross profiles.

The allowed-user list restricts who can interact with the bot. If access is denied, check that the numeric user ID is listed.

## Changing or removing it later

Go back to Hermes' **Channels** page, under the right bot, and change or remove the Telegram entry.
To disconnect Telegram entirely, revoking the bot in @BotFather is the fastest and most complete way;
the token stops working immediately.
