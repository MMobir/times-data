---
type: entity
title: "uc_name"
aliases: []
tags: [set, internal]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# uc_name

**Category:** Internal
**Aliases:** None

## Description

List of internally fixed indicators for attributes able to be referenced as coefficients in user constraints (e.g. the flow variable may be multiplied by the attribute FLO_COST in a user constraint if desired): COST, DELIV, TAX, SUB, EFF, NET, BUILDUP, CAPACT, CAPFLO, GROWTH, NEWFLO, ONLINE, PERIOD, PERDISC, INVCOST, INVTAX, INVSUB, CUMSUM, SYNC, YES See Section 6.4.6 for more detailed information.

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
