---
type: entity
title: "ACT_BND"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# ACT_BND

**Category:** User Input
**Indexes:** r, datayear, p, s, bd

## Description

Bound on the overall activity a process.

## Details

Since inter-/extrapolation default is MIG, the bound must be explicitly specified for each period, unless an inter-/extrapolation option is set. If the bound is specified for a timeslice s above the process timeslice resolution (prc_tsl), the bound is applied to the sum of the activity variables according to the timeslice tree. Standard aggregation.

## Units and Defaults

Units of activity [0,∞); default value: none; Default i/e: MIG

## Related Parameters and Sets

None documented.

## Affected Equations and Variables

Activity limit constraint (EQ(l)_ACTBND) when s is above prc_tsl. Direct bound on activity variable (VAR_ACT) when at the prc_tsl level.
