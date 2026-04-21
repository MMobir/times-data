---
type: entity
title: "COM_BNDNET"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/rhs-combal, entities/parameters/rcs-combal]
last_updated: 2026-04-11
---

# COM_BNDNET

**Category:** User Input
**Indexes:** r, datayear, c, s, bd

## Description

Limit on the net amount of a commodity (variable VAR_COMNET) within a region for a particular timeslice.

## Details

Remark: All VAR_COMNET variables are by default non-negative, i.e. have lower bounds of zero. Since inter-/extrapolation default is MIG, a bound must be specified for each period desired, if no explicit inter-/extrapolation option is given. If the bound is specified for a timeslice s above the commodity timeslice resolution (com_tsl), the bound is applied to the sum of the net commodity variables (VAR_COMNET) below it, according to the timeslice tree. Standard aggregation.

## Units and Defaults

Commodity unit [open]; default value: none; Default i/e: MIG

## Related Parameters and Sets

- [rhs_combal](../parameters/rhs-combal.md)
- [rcs_combal](../parameters/rcs-combal.md)

## Affected Equations and Variables

The balance constraint is set to an equality (EQE_COMBAL). Either the finer timeslice variables are summed (EQ(l)_BNDNET) or the bound applied direct to the commodity net variable(VAR_COMNET) when at the commodity level (com_tsl).
