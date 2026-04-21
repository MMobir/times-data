---
type: entity
title: "NCAP_FSUB"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/obj-fsb, entities/parameters/cst-fixx, entities/parameters/cst-pvp]
last_updated: 2026-04-11
---

# NCAP_FSUB

**Category:** User Input
**Indexes:** r, datayear, p, cur

## Description

Subsidy per unit of installed capacity.

## Details

Provided when there is a subsidy for associated with the level of installed capacity.

## Units and Defaults

Monetary unit per capacity unit [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [OBJ_FSB](../parameters/obj-fsb.md)
- [CST_FIXX](../parameters/cst-fixx.md)
- [CST_PVP](../parameters/cst-pvp.md)

## Affected Equations and Variables

Fixed subsidy associated with total installed capacity (VAR_NCAP+NCAP_PASTI) when entering the objective function component (EQ_OBJFIX) with a minus sign.
