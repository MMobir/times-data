---
type: entity
title: "com_pkts (r,cg,s)"
aliases: []
tags: [set, user-input]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# com_pkts (r,cg,s)

**Category:** User Input
**Aliases:** None

## Description

Set of triplets {r,cg,s} such that a peaking constraint for a single commodity or a group of commodities cg (e.g. if the model differentiates between three electricity commodities: electricity on high, middle and low voltage ) is to be generated for the timeslice s; Default: all timeslices of com_ts; note that the peaking constraint will be binding only for the timeslice with the highest load.

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
