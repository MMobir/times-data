---
type: entity
title: "COM_SUBNET"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/obj-comnt, entities/parameters/cst-comx, entities/parameters/cst-pvc, entities/parameters/rhs-combal, entities/parameters/rcs-combal]
last_updated: 2026-04-11
---

# COM_SUBNET

**Category:** User Input
**Indexes:** r, datayear, c, s, cur

## Description

Subsidy on the net amount of a commodity within a region for a particular timeslice.

## Details

Direct inheritance. Weighted aggregation.

## Units and Defaults

Monetary unit per commodity unit [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [OBJ_COMNT](../parameters/obj-comnt.md)
- [CST_COMX](../parameters/cst-comx.md)
- [CST_PVC](../parameters/cst-pvc.md)
- [rhs_combal](../parameters/rhs-combal.md)
- [rcs_combal](../parameters/rcs-combal.md)

## Affected Equations and Variables

Forces the net commodity variable (VAR_COMNET) to be included in the equality balance constraint (EQE_COMBAL). Applied (-) to said variable in the cost component of the objective function (EQ_OBJVAR).
