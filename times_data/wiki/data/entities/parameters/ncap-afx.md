---
type: entity
title: "NCAP_AFX"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-af, entities/parameters/ncap-afa, entities/parameters/ncap-afs, entities/parameters/shape, entities/parameters/coef-af]
last_updated: 2026-04-11
---

# NCAP_AFX

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Age-based shaping curve (SHAPE) to be applied to the availability factor parameters (NCAP_AF/AFA/AFS) of a process.

## Details

Provided when shaping based upon age is desired.

## Units and Defaults

Integer number; Default value: 0; Default extrapolation: MIG

## Related Parameters and Sets

- [NCAP_AF](../parameters/ncap-af.md)
- [NCAP_AFA](../parameters/ncap-afa.md)
- [NCAP_AFS](../parameters/ncap-afs.md)
- [SHAPE](../parameters/shape.md)
- [COEF_AF](../parameters/coef-af.md)

## Affected Equations and Variables

none
