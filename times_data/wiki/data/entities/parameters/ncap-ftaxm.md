---
type: entity
title: "NCAP_FTAXM"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-ftax, entities/parameters/multi]
last_updated: 2026-04-11
---

# NCAP_FTAXM

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Period sensitive multiplier curve (MULTI) applied to the tax (NCAP_FTAX).

## Details

Provided when shaping based upon the period is desired.

## Units and Defaults

Integer number; Default value: 0; Default extrapolation: MIG

## Related Parameters and Sets

- [NCAP_FTAX](../parameters/ncap-ftax.md)
- [MULTI](../parameters/multi.md)

## Affected Equations and Variables

none
