---
type: entity
title: "PAR_CAPM"
aliases: []
tags: [parameter, reporting]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/var-capm, entities/parameters/coef-pvt]
last_updated: 2026-04-11
---

# PAR_CAPM

**Category:** Reporting
**Indexes:** r, t, p

## Description

Technology Capacity – Marginals: Undiscounted reduced costs of capacity variable (VAR_CAP); only reported in those cases, in which the capacity variable is generated (bound CAP_BND specified or endogenous technology learning is used); the reduced costs describe in the case, that the capacity variable is at its lower (upper) bound, the cost increase (decrease) of the objective function caused by an increase of the lower (upper) bound by one unit. The reduced cost is undiscounted with COEF_PVT.

## Details

No additional details available.

## Units and Defaults

Marginal Costs

## Related Parameters and Sets

- [VAR_CapM](../parameters/var-capm.md)
- [COEF_PVT](../parameters/coef-pvt.md)

## Affected Equations and Variables

Not documented.
