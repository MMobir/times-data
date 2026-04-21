---
type: entity
title: "NCAP_FTAX"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/obj-ftx, entities/parameters/cst-fixx, entities/parameters/cst-pvp]
last_updated: 2026-04-11
---

# NCAP_FTAX

**Category:** User Input
**Indexes:** r, datayear, p, cur

## Description

Tax per unit of installed capacity.

## Details

Provided when there is a fixed tax based upon the level of the installed capacity.

## Units and Defaults

monetary unit per capacity unit [open]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [OBJ_FTX](../parameters/obj-ftx.md)
- [CST_FIXX](../parameters/cst-fixx.md)
- [CST_PVP](../parameters/cst-pvp.md)

## Affected Equations and Variables

Fixed tax associated with total installed capacity (VAR_NCAP+NCAP_PASTI) when entering the objective function components (EQ_OBJFIX).
