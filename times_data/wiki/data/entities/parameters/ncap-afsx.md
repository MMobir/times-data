---
type: entity
title: "NCAP_AFSX"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-afs, entities/parameters/shape, entities/parameters/coef-af]
last_updated: 2026-04-11
---

# NCAP_AFSX

**Category:** User Input
**Indexes:** r, datayear, p, bd

## Description

Age-based shaping curve (SHAPE) to be applied to the seasonal availability factor parameters (NCAP_AFS) of a process.

## Details

Provided when shaping based upon age is desired.

## Units and Defaults

Integer number; Default value: 0; Default extrapolation: MIG

## Related Parameters and Sets

- [NCAP_AFS](../parameters/ncap-afs.md)
- [SHAPE](../parameters/shape.md)
- [COEF_AF](../parameters/coef-af.md)

## Affected Equations and Variables

none
