---
type: entity
title: "MULTI"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-afm, entities/parameters/ncap-fomm, entities/parameters/ncap-fsubm, entities/parameters/ncap-ftaxm]
last_updated: 2026-04-11
---

# MULTI

**Category:** User Input
**Indexes:** j, allyear

## Description

Multiplier table used for any shaping parameters (*_*M) to adjust the corresponding technical data as function of the year; the table contains different multiplier curves identified by the index j.

## Details

Only provided when the related shaping parameters are to be used.

## Units and Defaults

Scalar [open]; default value: none; I/e: Full dense interpolation and extrapolation

## Related Parameters and Sets

- [NCAP_AFM](../parameters/ncap-afm.md)
- [NCAP_FOMM](../parameters/ncap-fomm.md)
- [NCAP_FSUBM](../parameters/ncap-fsubm.md)
- [NCAP_FTAXM](../parameters/ncap-ftaxm.md)

## Affected Equations and Variables

none
