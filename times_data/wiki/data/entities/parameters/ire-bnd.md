---
type: entity
title: "IRE_BND"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/top-ire]
last_updated: 2026-04-11
---

# IRE_BND

**Category:** User Input
**Indexes:** r, datayear, c, s, all_r, ie, bd

## Description

Bound on the total import (export) of commodity (c) from (to) region all_r in (out of) region r.

## Details

Only applicable for inter-regional exchange processes (IRE). If the bound is specified for a timeslice (s) being above the commodity (c) timeslice resolution, the bound is applied to the sum of the imports/exports according to the timeslice tree. Standard aggregation.

## Units and Defaults

Commodity unit [0,∞); default value: none; Default i/e: MIG

## Related Parameters and Sets

- [top_ire](../parameters/top-ire.md)

## Affected Equations and Variables

Controls the instances for which the trade bound constraint (EQ(l)_IREBND) is generated, and the RHS.
