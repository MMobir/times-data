---
type: entity
title: "uc_r_sum (all_r,uc_n)"
aliases: []
tags: [set, user-input]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# uc_r_sum (all_r,uc_n)

**Category:** User Input
**Aliases:** None

## Description

Set of pairs {all_r,uc_n} indicating that the user constraint uc_n is summing over all specified regions all_r (that is these constraints do not have a region index). Note that depending on the specified regions in uc_r_sum, the summation may be done only over a subset of all model regions. For example if the model contains the regions FRA, GER, ESP and one wants to create a user constraint called GHG summing over the regions FRA and GER but not ESP, the set uc_r_sum contains has the two entries {'FRA', 'GHG'} and {'GER', 'GHG'}.

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
