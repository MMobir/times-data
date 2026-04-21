---
type: entity
title: "NCAP_DCOST"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-dlag, entities/parameters/cor-salvd, entities/parameters/obj-dcost, entities/parameters/cst-decc, entities/parameters/cst-pvp]
last_updated: 2026-04-11
---

# NCAP_DCOST

**Category:** User Input
**Indexes:** r, datayear, p, cur

## Description

Cost of dismantling a facility after the end of its lifetime.

## Details

Provided when there are decommissioning costs associated with a process.

## Units and Defaults

Monetary unit per capacity unit [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [NCAP_DLAG](../parameters/ncap-dlag.md)
- [COR_SALVD](../parameters/cor-salvd.md)
- [OBJ_DCOST](../parameters/obj-dcost.md)
- [CST_DECC](../parameters/cst-decc.md)
- [CST_PVP](../parameters/cst-pvp.md)

## Affected Equations and Variables

Applied to the current capacity subject to decommissioning (VAR_NCAP+NCAP_PASTI) when entering the objective function (EQ_OBJNV).
