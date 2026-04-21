---
type: entity
title: "PBT"
aliases: []
tags: [parameter, internal]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/prat]
last_updated: 2026-04-11
---

# PBT

**Category:** Internal
**Indexes:** r, p

## Description

The learning index PBT is an internal parameter calculated in COEF_ETL.ETL. It is derived from the progress ratio PRAT using the formula: PBT(r,p) = -log(PRAT(r,p))/log(2). PBT does not occur directly in the equations, but is used in the calculation of equation coefficients.

## Details

No additional details available.

## Units and Defaults

Not specified.

## Related Parameters and Sets

- [PRAT](../parameters/prat.md)

## Affected Equations and Variables

Not documented.
