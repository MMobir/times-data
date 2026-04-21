---
type: entity
title: "COM_CSTNET"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/obj-comnt, entities/parameters/cst-comc, entities/parameters/cst-pvc, entities/parameters/rhs-combal, entities/parameters/rcs-combal]
last_updated: 2026-04-11
---

# COM_CSTNET

**Category:** User Input
**Indexes:** r, datayear, c, s, cur

## Description

Cost on the net amount of a commodity within a region for a particular timeslice.

## Details

Direct inheritance. Weighted aggregation.

## Units and Defaults

Monetary unit per commodity unit [open]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [OBJ_COMNT](../parameters/obj-comnt.md)
- [CST_COMC](../parameters/cst-comc.md)
- [CST_PVC](../parameters/cst-pvc.md)
- [rhs_combal](../parameters/rhs-combal.md)
- [rcs_combal](../parameters/rcs-combal.md)

## Affected Equations and Variables

Forces the net commodity variable (VAR_COMNET) to be included in the equality balance constraint (EQE_COMBAL). Applied to said variable in the cost component of the objective function (EQ_OBJVAR).
