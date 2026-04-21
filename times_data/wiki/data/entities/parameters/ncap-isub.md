---
type: entity
title: "NCAP_ISUB"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/obj-isub, entities/parameters/objscc, entities/parameters/cst-invx, entities/parameters/cst-salv, entities/parameters/cst-pvp]
last_updated: 2026-04-11
---

# NCAP_ISUB

**Category:** User Input
**Indexes:** r, datayear, p, cur

## Description

Subsidy per unit of new installed capacity.

## Details

Provided when there is a subsidy for new investments in a period.

## Units and Defaults

monetary unit per capacity unit [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [OBJ_ISUB](../parameters/obj-isub.md)
- [OBJSCC](../parameters/objscc.md)
- [CST_INVX](../parameters/cst-invx.md)
- [CST_SALV](../parameters/cst-salv.md)
- [CST_PVP](../parameters/cst-pvp.md)

## Affected Equations and Variables

Applied to the investment variable (VAR_NCAP) when entering the objective function (EQ_OBJINV) with a minus sign. May appear in user constraints (EQ_UC*) if specified in UC_NAME.
