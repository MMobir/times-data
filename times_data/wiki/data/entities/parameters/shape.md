---
type: entity
title: "SHAPE"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/flo-funcx, entities/parameters/flo-sumx, entities/parameters/ncap-afx, entities/parameters/ncap-fomx, entities/parameters/ncap-fsubx, entities/parameters/ncap-ftaxx]
last_updated: 2026-04-11
---

# SHAPE

**Category:** User Input
**Indexes:** j, age

## Description

Multiplier table used for any shaping parameters (*_*X) to adjust the corresponding technical data as function of the age;

## Details

Provided for each age dependent shaping curve that is to be applied.

## Units and Defaults

Scalar [open]; default value: none; I/e: Full dense interpolation

## Related Parameters and Sets

- [FLO_FUNCX](../parameters/flo-funcx.md)
- [FLO_SUMX](../parameters/flo-sumx.md)
- [NCAP_AFX](../parameters/ncap-afx.md)
- [NCAP_FOMX](../parameters/ncap-fomx.md)
- [NCAP_FSUBX](../parameters/ncap-fsubx.md)
- [NCAP_FTAXX](../parameters/ncap-ftaxx.md)

## Affected Equations and Variables

{See Related Parameters}
