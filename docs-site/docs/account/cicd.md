---
title: CI/CD pipelines
description: "Push-to-deploy is built but switched off. Why we will not turn it on until we can build your code somewhere safe."
sidebar_position: 7
---

# CI/CD pipelines

**This is not available, and we would rather tell you why than leave a page describing it.**

Push-to-deploy is written. A pipeline would link a GitHub repository and branch to one of
your instances, and a push would rebuild and restart it. The code exists, it has tests, and
it does not run.

## Why it is switched off

Building your repository means running your build on a machine. Today the only machine we
could run it on is the one your instance already lives on - and on the shared platform,
other customers live there too.

A build step is arbitrary code. That is the whole point of it. Running arbitrary code
next to somebody else's database is not a risk we are willing to take on your behalf, or on
theirs. **It needs an isolated builder that throws itself away afterwards, and we have not
built one yet.**

So the worker refuses to start, and a test fails our build if anyone schedules it. That
guard is deliberate. It is there so this cannot be switched on by accident during unrelated
work.

## What you can do today

- **Deploy by hand.** Your instance is yours - update it the way you would update any
  server you control, and we will keep running it.
- **Use the app's own import.** For n8n, workflows can be moved with its API or by exporting
  and importing them, which is what most people were using a pipeline for anyway.
- **Ask us.** If push-to-deploy is the reason you would or would not buy, say so in a
  [support ticket](https://app.splicerun.com/dashboard/support). What customers actually block on
  decides what gets built first.

## When it comes back

When there is a builder that runs your code in a sandbox with nothing else in it, this page
becomes a how-to again and the pipeline screen turns on. **We are not going to ship it
before then, and we are not going to pretend it exists in the meantime.**

## Related

- [Managing your instance](./managing-your-instance.md)
- [Updates and maintenance windows](./updates.md)
- [What we manage](../plans/what-we-manage.md)
