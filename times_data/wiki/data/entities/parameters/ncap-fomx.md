---
type: entity
title: "NCAP_FOMX"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-fom, entities/parameters/shape]
last_updated: 2026-04-11
---

# NCAP_FOMX

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Age-based shaping curve (SHAPE) to be applied to the fixed operating and maintenance cost.

## Details

Provided when shaping based upon age is desired.

## Units and Defaults

Integer number; Default value: 0; Default extrapolation: MIG

## Related Parameters and Sets

- [NCAP_FOM](../parameters/ncap-fom.md)
- [SHAPE](../parameters/shape.md)

## Affected Equations and Variables

none
