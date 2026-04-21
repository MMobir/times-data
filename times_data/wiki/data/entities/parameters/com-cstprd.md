---
type: entity
title: "COM_CSTPRD"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/obj-compd, entities/parameters/cst-comc, entities/parameters/cst-pvc, entities/parameters/rhs-comprd, entities/parameters/rcs-comprd]
last_updated: 2026-04-11
---

# COM_CSTPRD

**Category:** User Input
**Indexes:** r, datayear, c, s, cur

## Description

Cost on the production of a commodity, within a region for a particular timeslice.

## Details

Direct inheritance. Weighted aggregation.

## Units and Defaults

Monetary unit per commodity unit [open]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [OBJ_COMPD](../parameters/obj-compd.md)
- [CST_COMC](../parameters/cst-comc.md)
- [CST_PVC](../parameters/cst-pvc.md)
- [rhs_comprd](../parameters/rhs-comprd.md)
- [rcs_comprd](../parameters/rcs-comprd.md)

## Affected Equations and Variables

Forces the commodity production variable (VAR_COMPRD) to be included in the equality balance constraint (EQE_COMBAL). Applied to said variable in the cost component of the objective function (EQ_OBJVAR).
