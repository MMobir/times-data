---
type: entity
title: "top_ire (all_reg,com, all_r,c,p)"
aliases: []
tags: [set, user-input]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# top_ire (all_reg,com, all_r,c,p)

**Category:** User Input
**Aliases:** None

## Description

RES topology definition for trade between regions [Set of quintuples indicating that commodity com from region all_reg is traded (exported) via exchange process p (where it is imported) into region all_r as commodity c]; note: the name of the traded commodity may be different in the two regions. By using all_reg=all_r, one can also define bi-directional processes within a region, e.g. for modeling transmission lines.

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
