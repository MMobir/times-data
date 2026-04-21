---
type: entity
title: "ts_off (r,ts,y1,y2)"
aliases: []
tags: [set, user-input]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# ts_off (r,ts,y1,y2)

**Category:** User Input
**Aliases:** None

## Description

Set of quadruples {r,ts,y1,y2} such that the timeslice branch consisting of the timeslice ts and all the timeslices below it will not be taken into account in the model between the years y1 and y2 in region r; note that y1 may be 'BOH' for first year of first period and y2 may be 'EOH' for last year of last period. The timeslice ts specified in ts_off must be directly below ANNUAL in the timeslice tree specified (usually at the SEASON level).

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
