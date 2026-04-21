---
type: entity
title: "ts_map (all_r,s,ts)"
aliases: []
tags: [set, user-input]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# ts_map (all_r,s,ts)

**Category:** User Input
**Aliases:** None

## Description

Set of triplets {all_r,s,ts} such that s is an intermediate node s of the timeslice tree (neither 'ANNUAL' nor the lowest level), and ts is a node directly under s in region r; the set is further extended by allowing ts = s (see figure 1).

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
