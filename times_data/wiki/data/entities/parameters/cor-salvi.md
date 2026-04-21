---
type: entity
title: "COR_SALVI"
aliases: []
tags: [parameter, internal]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-drate, entities/parameters/g-drate, entities/parameters/ncap-elife, entities/parameters/d, entities/parameters/m, entities/parameters/midyear]
last_updated: 2026-04-11
---

# COR_SALVI

**Category:** Internal
**Indexes:** r, v, p, cur

## Description

Correction factor for investment costs taking into account technical discount rates, economic lifetimes and a user-defined discount shift (triggered by the control switch MIDYEAR (see Section 6.2 EQ_OBJ)).

## Details

No additional details available.

## Units and Defaults

Not specified.

## Related Parameters and Sets

- [NCAP_DRATE](../parameters/ncap-drate.md)
- [G_DRATE](../parameters/g-drate.md)
- [NCAP_ELIFE](../parameters/ncap-elife.md)
- [D](../parameters/d.md)
- [M](../parameters/m.md)
- [MIDYEAR](../parameters/midyear.md)

## Affected Equations and Variables

EQ_OBJSALV
