---
type: entity
title: "COM_BNDPRD"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/rhs-comprd, entities/parameters/rcs-comprd]
last_updated: 2026-04-11
---

# COM_BNDPRD

**Category:** User Input
**Indexes:** r, datayear, c, s, bd

## Description

Limit on the amount of a commodity produced (variable VAR_COMPRD) within a region for a particular timeslice.

## Details

Remark: All VAR_COMPRD variables are by default non-negative, i.e. have lower bounds of zero. Since inter-/extrapolation default is MIG, a bound must be specified for each period desired, if no explicit inter-/extrapolation option is given. If the bound is specified for a timeslice s being above the commodity timeslice resolution (com_tsl), the bound is applied to the sum of the commodity production variables (VAR_COMPRD) below it, according to the timeslice tree. Standard aggregation.

## Units and Defaults

Commodity unit [0,∞); default value: none; Default i/e: MIG

## Related Parameters and Sets

- [rhs_comprd](../parameters/rhs-comprd.md)
- [rcs_comprd](../parameters/rcs-comprd.md)

## Affected Equations and Variables

The balance constraint is set to an equality (EQE_COMBAL). Finer timeslice variables summed (EQ(l)_BNDPRD). or the bound is applied direct to the commodity production variable (VAR_COMPRD) when at the commodity level (com_tsl).
