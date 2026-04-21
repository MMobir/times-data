---
type: entity
title: "DAM_STEP"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/dam-cost, entities/parameters/dam-bqty]
last_updated: 2026-04-11
---

# DAM_STEP

**Category:** User Input
**Indexes:** r, c, lim

## Description

Number of steps for linearizing damage costs in the lower or upper direction from Base quantity.

## Details

Only effective when DAM_COST has been defined for commodity c.

## Units and Defaults

Integer number [1,∞); default value: none; Default i/e: N/A

## Related Parameters and Sets

- [DAM_COST](../parameters/dam-cost.md)
- [DAM_BQTY](../parameters/dam-bqty.md)

## Affected Equations and Variables

EQ_DAMAGE, EQ_OBJDAM
