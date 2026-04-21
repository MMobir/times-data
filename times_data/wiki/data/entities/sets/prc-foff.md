---
type: entity
title: "prc_foff (r,p,c,s,y1,y2)"
aliases: []
tags: [set, user-input]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# prc_foff (r,p,c,s,y1,y2)

**Category:** User Input
**Aliases:** None

## Description

Set of sextuples specifying that the flow of commodity c at process p and timeslice s is not available between the years y1 and y2 in region r; note that y1 may be 'BOH' for first year of first period and y2 may be 'EOH' for last year of last period.

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
