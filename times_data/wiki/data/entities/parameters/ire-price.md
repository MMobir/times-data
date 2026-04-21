---
type: entity
title: "IRE_PRICE"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/obj-ipric, entities/parameters/cst-comc, entities/parameters/cst-pvp, entities/parameters/top-ire]
last_updated: 2026-04-11
---

# IRE_PRICE

**Category:** User Input
**Indexes:** r, datayear, p, c, s, all_r, ie, cur

## Description

IMPort/EXPort price (index ie) for to/from an internal region of a commodity (c) originating from/heading to an external region all_r.

## Details

Only applicable for inter-regional exchange processes (IRE). Ignored if all_r is an internal region. Direct inheritance. Weighted aggregation.

## Units and Defaults

Monetary unit / commodity unit [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [OBJ_IPRIC](../parameters/obj-ipric.md)
- [CST_COMC](../parameters/cst-comc.md)
- [CST_PVP](../parameters/cst-pvp.md)
- [top_ire](../parameters/top-ire.md)

## Affected Equations and Variables

The price of the exchange commodity is applied to the trade flow variable (VAR_IRE) in the variable costs component of the objective function (EQ_OBJVAR).
