---
type: entity
title: "COEF_AF"
aliases: []
tags: [parameter, internal]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-af, entities/parameters/ncap-afa, entities/parameters/ncap-afs, entities/parameters/multi, entities/parameters/shape]
last_updated: 2026-04-11
---

# COEF_AF

**Category:** Internal
**Indexes:** r, v, t, p, s, bd

## Description

Availability coefficient of the capacity (new investment variable VAR_NCAP plus still existing past investments NCAP_PASTI) in EQ(l)_CAPACT; COEF_AF is derived from the availability input parameters NCAP_AF, NCAP_AFA and NCAP_AFS taking into account any specified MULTI or SHAPE multipliers.

## Details

No additional details available.

## Units and Defaults

Not specified.

## Related Parameters and Sets

- [NCAP_AF](../parameters/ncap-af.md)
- [NCAP_AFA](../parameters/ncap-afa.md)
- [NCAP_AFS](../parameters/ncap-afs.md)
- [MULTI](../parameters/multi.md)
- [SHAPE](../parameters/shape.md)

## Affected Equations and Variables

EQ(l)_CAPACT
