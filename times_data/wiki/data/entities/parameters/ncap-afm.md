---
type: entity
title: "NCAP_AFM"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-af, entities/parameters/ncap-afa, entities/parameters/ncap-afs, entities/parameters/multi, entities/parameters/coef-af]
last_updated: 2026-04-11
---

# NCAP_AFM

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Period sensitive multiplier curve (MULTI) to be applied to the availability factor parameters (NCAP_AF/AFA/AFS) of a process.

## Details

Provided when multiplication of NCAP_AF / NCAP_AFS based upon year is desired. Note: Multiplier index 1 is reserved for constant 1.

## Units and Defaults

Integer number; Default value: 0 (no multiplier applied); Default extrapolation: MIG

## Related Parameters and Sets

- [NCAP_AF](../parameters/ncap-af.md)
- [NCAP_AFA](../parameters/ncap-afa.md)
- [NCAP_AFS](../parameters/ncap-afs.md)
- [MULTI](../parameters/multi.md)
- [COEF_AF](../parameters/coef-af.md)

## Affected Equations and Variables

none
