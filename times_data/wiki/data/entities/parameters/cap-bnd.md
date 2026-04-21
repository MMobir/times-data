---
type: entity
title: "CAP_BND"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/par-caplo, entities/parameters/par-capup]
last_updated: 2026-04-11
---

# CAP_BND

**Category:** User Input
**Indexes:** r, datayear, p, bd

## Description

Bound on investment in new capacity. Imposes an indirect limit on the capacity transfer equation (EQ_CPT) by means of a direct bound on the capacity variable (VAR_CAP).

## Details

Since inter-/extrapolation is default is MIG, a bound must be specified for each period desired, if no explicit inter-/extrapolation option is given. Relaxed if upper bound less than existing non-retirable capacity.

## Units and Defaults

Capacity unit [0,∞); default value: none

## Related Parameters and Sets

- [PAR_CAPLO](../parameters/par-caplo.md)
- [PAR_CAPUP](../parameters/par-capup.md)

## Affected Equations and Variables

none
