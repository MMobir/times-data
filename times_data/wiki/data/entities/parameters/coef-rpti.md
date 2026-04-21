---
type: entity
title: "COEF_RPTI"
aliases: []
tags: [parameter, internal]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-tlife, entities/parameters/ncap-iled, entities/parameters/d]
last_updated: 2026-04-11
---

# COEF_RPTI

**Category:** Internal
**Indexes:** r, v, p

## Description

Number of repeated investment of process p in period v when the technical lifetime minus the construction time is shorter than the period duration; Rounded to the next largest integer number.

## Details

No additional details available.

## Units and Defaults

Not specified.

## Related Parameters and Sets

- [NCAP_TLIFE](../parameters/ncap-tlife.md)
- [NCAP_ILED](../parameters/ncap-iled.md)
- [D](../parameters/d.md)

## Affected Equations and Variables

EQ_OBJINV
