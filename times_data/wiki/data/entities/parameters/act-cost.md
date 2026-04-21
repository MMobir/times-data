---
type: entity
title: "ACT_COST"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/obj-acost, entities/parameters/cst-actc, entities/parameters/cst-pvp]
last_updated: 2026-04-11
---

# ACT_COST

**Category:** User Input
**Indexes:** r, datayear, p, cur

## Description

Variable costs associated with the activity of a process.

## Details

No additional details available.

## Units and Defaults

Monetary unit per unit of activity [open]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [OBJ_ACOST](../parameters/obj-acost.md)
- [CST_ACTC](../parameters/cst-actc.md)
- [CST_PVP](../parameters/cst-pvp.md)

## Affected Equations and Variables

Applied to the activity variable (VAR_ACT) as a component of the objective function (EQ_OBJVAR). May appear in user constraints (EQ_UC*) if specified in UC_NAME.
