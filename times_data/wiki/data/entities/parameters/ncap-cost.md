---
type: entity
title: "NCAP_COST"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/obj-icost, entities/parameters/objscc, entities/parameters/cst-invc, entities/parameters/cst-pvp]
last_updated: 2026-04-11
---

# NCAP_COST

**Category:** User Input
**Indexes:** r, datayear, p, cur

## Description

Investment costs of new installed capacity according to the installation year.

## Details

Provided whenever there is a cost associated with putting new capacity in place.

## Units and Defaults

Monetary unit per capacity unit [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [OBJ_ICOST](../parameters/obj-icost.md)
- [OBJSCC](../parameters/objscc.md)
- [CST_INVC](../parameters/cst-invc.md)
- [CST_PVP](../parameters/cst-pvp.md)

## Affected Equations and Variables

Applied to the investment variable (VAR_NCAP) when entering the objective function (EQ_OBJINV). May appear in user constraints (EQ_UC*) if specified in UC_NAME.
