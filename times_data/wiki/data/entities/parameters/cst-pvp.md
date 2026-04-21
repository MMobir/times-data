---
type: entity
title: "CST_PVP"
aliases: []
tags: [parameter, reporting]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/cst-invc, entities/parameters/cst-invx, entities/parameters/cst-fixc, entities/parameters/cst-fixx, entities/parameters/cst-actc, entities/parameters/cst-floc, entities/parameters/cst-flox, entities/parameters/cst-irec]
last_updated: 2026-04-11
---

# CST_PVP

**Category:** Reporting
**Indexes:** uc_n, r, p

## Description

Total discounted costs by process (optional, activate by setting RPT_OPT('OBJ','1')=1): Total present value of process-related costs in the base year, by type (with types INV, INV+, FIX, ACT, FLO, IRE, where INV+ is only used for the split according to hurdle rate). See Part III, Section 3.10 on the reporting options, and Table 16 below for acronym explanations.

## Details

No additional details available.

## Units and Defaults

Currency

## Related Parameters and Sets

- [CST_INVC](../parameters/cst-invc.md)
- [CST_INVX](../parameters/cst-invx.md)
- [CST_FIXC](../parameters/cst-fixc.md)
- [CST_FIXX](../parameters/cst-fixx.md)
- [CST_ACTC](../parameters/cst-actc.md)
- [CST_FLOC](../parameters/cst-floc.md)
- [CST_FLOX](../parameters/cst-flox.md)
- [CST_IREC](../parameters/cst-irec.md)

## Affected Equations and Variables

Not documented.
