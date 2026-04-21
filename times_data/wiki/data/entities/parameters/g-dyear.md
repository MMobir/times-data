---
type: entity
title: "G_DYEAR"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/obj-disc, entities/parameters/coef-pvt]
last_updated: 2026-04-11
---

# G_DYEAR

**Category:** User Input
**Indexes:** 

## Description

Base year for discounting.

## Details

No additional details available.

## Units and Defaults

Year [BOTIME,EOTIME]; default value = M(MIYR_1), i.e. the first milestone year

## Related Parameters and Sets

- [OBJ_DISC](../parameters/obj-disc.md)
- [COEF_PVT](../parameters/coef-pvt.md)

## Affected Equations and Variables

The year to which all costs are to be discounted is taken into consideration when constructing the objective function discounting multiplier (OBJ_DISC), which is applied in each of the components of the objective function (EQ_OBJVAR, EQ_OBJINV, EQ_OBJFIX, EQ_OBJSALV, EQ_OBJELS).
