---
type: entity
title: "com_off (r,c,y1,y2)"
aliases: []
tags: [set, user-input]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# com_off (r,c,y1,y2)

**Category:** User Input
**Aliases:** None

## Description

Specifying that the commodity c in region r is not available between the years y1 and y2 [set of quadruplets {r,c,y1,y2} such that commodity c is unavailable from years y1 to y1 in region r] ; note that y1 may be 'BOH' for the first year of the first period and y2 may be 'EOH' for the last year of the last period.

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
