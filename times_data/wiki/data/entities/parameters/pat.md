---
type: entity
title: "PAT"
aliases: []
tags: [parameter, internal]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/pbt, entities/parameters/sc0, entities/parameters/ccap0]
last_updated: 2026-04-11
---

# PAT

**Category:** Internal
**Indexes:** r, p

## Description

The internal parameter PAT describes the specific investment costs of the first unit. It is derived in COEF_ETL.ETL using PBT, SC0 and CCAP0. PAT does not occur directly in the equations, but is used in the calculation of equation coefficients.

## Details

No additional details available.

## Units and Defaults

Not specified.

## Related Parameters and Sets

- [PBT](../parameters/pbt.md)
- [SC0](../parameters/sc0.md)
- [CCAP0](../parameters/ccap0.md)

## Affected Equations and Variables

Not documented.
