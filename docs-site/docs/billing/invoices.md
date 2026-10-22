---
title: Invoices and receipts
description: "Where to find your invoices, what each one shows, and how to save one as a PDF."
sidebar_position: 3
---

# Invoices and receipts

Go to **Settings → Billing**. The page has three sections: your current plan,
your invoices, and your payment history.

## Finding an invoice

The **Invoices** section lists every invoice issued to your team, with:

| Column | What it shows |
|---|---|
| Number | The invoice number |
| Date | The date the invoice was issued |
| Type | Tax invoice, or the kind of document it is |
| Total | The total, in the currency you were charged in |

An invoice is created automatically when a payment succeeds. If the section is
empty, no payment has completed yet.

Click **View** on a row to open the invoice itself.

## What an invoice shows

An invoice opens as a one-page document, laid out for A4 paper. It carries:

- **From** - our legal name and address, and our GSTIN where we have one.
- **Billed to** - your name, email, and address, plus your GSTIN or VAT ID if
  your account has one recorded.
- **Date**, **place of supply**, and **country**, where they apply.
- **Line items** - description, quantity, rate, and amount. Tax invoices also
  show the HSN code for each line.
- **Totals** - subtotal, tax, and the grand total. Where Indian GST applies, the
  invoice breaks the tax out as IGST, or as CGST and SGST, at the rate shown.
- **Payment** - whether it is paid in full, which gateway took the payment, and
  the gateway's own reference. That reference is the string that also appears on
  your card or bank statement, so it is the one to quote when reconciling.

Which kind of document you get, and whether it shows tax, depends on your location and status
and on whether tax applied to that payment. It is titled **Tax invoice** when it is one, and
**Invoice** otherwise. The amount charged is the amount shown at checkout.

## Saving or printing an invoice

Open the invoice and use your browser's **Print** command. Choose *Save as PDF*
to keep a copy, or print it directly. The document is designed for this - it
prints as one page with its colours intact.

## Payment history

The **Payment history** section below the invoices lists your 50 most recent
payments, with the date, the gateway, the amount, and the status.

Two labels are worth knowing:

- **Wallet top-up or add-on** - the payment was not for a specific instance. See
  [Wallet and prepaid credit](./wallet.md).
- **Not completed** - a checkout was opened at the gateway and never paid.

:::note[A Not completed row is not a charge]
Nothing was taken for these rows. They exist because we opened an order at the
payment gateway, not because money moved. Only rows marked *paid* were charged,
and only those produce an invoice.
:::

## Related

- [How pricing works](./how-pricing-works.md)
- [Wallet and prepaid credit](./wallet.md)
