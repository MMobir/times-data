---
type: entity
title: "COEF_CPT"
aliases: []
tags: [parameter, internal]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-iled, entities/parameters/ncap-tlife, entities/parameters/d, entities/parameters/b, entities/parameters/e, entities/parameters/m]
last_updated: 2026-04-11
---

# COEF_CPT

**Category:** Internal
**Indexes:** r, v, t, p

## Description

Fraction of capacity built in period v that is available in period t; might be smaller than 1 due to NCAP_ILED in vintage period or the fact that the lifetime ends within a period.

## Details

No additional details available.

## Units and Defaults

Not specified.

## Related Parameters and Sets

- [NCAP_ILED](../parameters/ncap-iled.md)
- [NCAP_TLIFE](../parameters/ncap-tlife.md)
- [D](../parameters/d.md)
- [B](../parameters/b.md)
- [E](../parameters/e.md)
- [M](../parameters/m.md)

## Affected Equations and Variables

EQ(l)_CPT, EQ_OBJINV
