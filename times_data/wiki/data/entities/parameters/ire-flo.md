---
type: entity
title: "IRE_FLO"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/top-ire]
last_updated: 2026-04-11
---

# IRE_FLO

**Category:** User Input
**Indexes:** r1, datayear, p, c1, r2, c2, s2

## Description

Efficiency of exchange process from commodity c1 in region r1 to commodity c2 in the region2 in timeslice s2; the timeslice s2 refers to the r2 region.

## Details

Only applicable for inter-regional exchange processes (IRE) between two internal regions. Note that for each direction of trade a separate IRE_FLO needs to be specified. Similar to FLO_FUNC for standard processes. Direct inheritance. Weighted aggregation.

## Units and Defaults

Commodity unit c2/commodity unit c1 [0,∞); default value: 1; Default i/e: STD

## Related Parameters and Sets

- [top_ire](../parameters/top-ire.md)

## Affected Equations and Variables

Applied to the exchange flow variable (VAR_IRE) in the inter-regional trade equation (EQ_IRE). Applied to the exchange flow variable (VAR_IRE) when a bound on inter-regional trade is to be applied (EQ(l)_IREBND).
