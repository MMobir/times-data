---
type: entity
title: "IRE_XBND"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/top-ire]
last_updated: 2026-04-11
---

# IRE_XBND

**Category:** User Input
**Indexes:** all_r, datayear, c, s, ie, bd

## Description

Bound on the total IMPort (EXPort) (index ie) of commodity c in region all_r with all sources (destinations).

## Details

Only applicable for inter-regional exchange processes (IRE). Provide whenever a trade flow is to be constrained. Note that the limit is either imposed by summing lower or splitting higher flow variables (VAR_IRE) when specified at other than the actual flow level (as determined by the commodity and process levels (COM_TSL/ PRC_TSL )).

## Units and Defaults

Commodity unit [0,∞); default value: none; Default i/e: MIG

## Related Parameters and Sets

- [top_ire](../parameters/top-ire.md)

## Affected Equations and Variables

The trade limit equation EQ(l)_XBND generated either sums lower flow variables (VAR_IRE) or splits (according to the timeslice tree) coarser variables.
