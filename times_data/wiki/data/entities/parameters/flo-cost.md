---
type: entity
title: "FLO_COST"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/obj-fcost, entities/parameters/cst-floc, entities/parameters/cst-pvc]
last_updated: 2026-04-11
---

# FLO_COST

**Category:** User Input
**Indexes:** r, datayear, p, c, s, cur

## Description

Variable cost of a process associated with the production/ consumption of a commodity.

## Details

Direct inheritance. Weighted aggregation

## Units and Defaults

Monetary unit per commodity unit [open]; default: none; Default i/e: STD

## Related Parameters and Sets

- [OBJ_FCOST](../parameters/obj-fcost.md)
- [CST_FLOC](../parameters/cst-floc.md)
- [CST_PVC](../parameters/cst-pvc.md)

## Affected Equations and Variables

Applied to the flow variable (VAR_FLO) when entering the objective function (EQ_OBJVAR). May appear in user constraints (EQ_UC*) if specified in UC_NAME.
