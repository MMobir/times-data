---
type: entity
title: "com_lim (r,c,lim)"
aliases: []
tags: [set, user-input]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# com_lim (r,c,lim)

**Category:** User Input
**Aliases:** None

## Description

Definition of commodity balance equation type [set of triplets {r,c,lim} such that commodity c has a balance of type lim (lim='UP','LO','FX', 'N') in region r]; Default: for commodities of type NRG, DM and ENV production is greater or equal consumption, while for MAT and FIN commodities the balance is a strict equality.

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
