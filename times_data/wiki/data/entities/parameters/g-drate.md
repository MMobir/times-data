---
type: entity
title: "G_DRATE"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/obj-disc, entities/parameters/obj-dceoh, entities/parameters/ncap-drate, entities/parameters/cor-salvi, entities/parameters/cor-salvd, entities/parameters/coef-pvt, entities/parameters/vda-disc]
last_updated: 2026-04-11
---

# G_DRATE

**Category:** User Input
**Indexes:** r, allyear, cur

## Description

System-wide discount rate in region r for each time-period.

## Details

A value must be provided for each region. Interpolation is dense (all individual years included).

## Units and Defaults

Decimal fraction (0,1]; default value = none; Default i/e: STD

## Related Parameters and Sets

- [OBJ_DISC](../parameters/obj-disc.md)
- [OBJ_DCEOH](../parameters/obj-dceoh.md)
- [NCAP_DRATE](../parameters/ncap-drate.md)
- [COR_SALVI](../parameters/cor-salvi.md)
- [COR_SALVD](../parameters/cor-salvd.md)
- [COEF_PVT](../parameters/coef-pvt.md)
- [VDA_DISC](../parameters/vda-disc.md)

## Affected Equations and Variables

The discount rate is taken into consideration when constructing the objective function discounting multiplier (OBJ_DISC), which is applied in each components of the objective function (EQ_OBJVAR, EQ_OBJINV, EQ_OBJFIX, EQ_OBJSALV, EQ_OBJELS).
