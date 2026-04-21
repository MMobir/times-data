---
type: entity
title: "FLO_TAX"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/obj-ftax, entities/parameters/cst-flox, entities/parameters/cst-pvp]
last_updated: 2026-04-11
---

# FLO_TAX

**Category:** User Input
**Indexes:** r, datayear, p, c, s, cur

## Description

Tax on a process flow.

## Details

Direct inheritance. Weighted aggregation.

## Units and Defaults

Monetary unit per commodity unit [0,∞); default: none; Default i/e: STD

## Related Parameters and Sets

- [OBJ_FTAX](../parameters/obj-ftax.md)
- [CST_FLOX](../parameters/cst-flox.md)
- [CST_PVP](../parameters/cst-pvp.md)

## Affected Equations and Variables

Applied to the flow variable (VAR_FLO) when entering the objective function (EQ_OBJVAR). May appear in user constraints (EQ_UC*) if specified in UC_NAME.
