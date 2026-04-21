---
type: entity
title: "BS_OMEGA"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/bs-delta, entities/parameters/bs-lambda]
last_updated: 2026-04-11
---

# BS_OMEGA

**Category:** User Input
**Indexes:** r, datayear, b, s

## Description

Indicator denoting if the demand for reserve b is the weighted sum of the deterministic and probabilistic component ( ω=2), the maximum of the two (ω=1), or their difference ( ω=3)

## Details

Required for enabling reserve provision formulation. Levelized to COM_TSL of b. See the ABS documentation for details

## Units and Defaults

Unit: dimensionless {1,2,3}; default value: none

## Related Parameters and Sets

- [BS_DELTA](../parameters/bs-delta.md)
- [BS_LAMBDA](../parameters/bs-lambda.md)

## Affected Equations and Variables

EQ_BS03
