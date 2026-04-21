---
type: entity
title: "DAM_VOC"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/dam-cost, entities/parameters/dam-bqty]
last_updated: 2026-04-11
---

# DAM_VOC

**Category:** User Input
**Indexes:** r, c, lim

## Description

Variance of emissions in the lower or upper direction from Base quantity as a fraction of Base quantity.

## Details

Only effective when DAM_COST is defined for c. Step sizes proportional to the Base quantity can be defined with lim='N'.

## Units and Defaults

Decimal fraction LO: [0,1]; UP: [0, ∞); default value: none; Default i/e: N/A

## Related Parameters and Sets

- [DAM_COST](../parameters/dam-cost.md)
- [DAM_BQTY](../parameters/dam-bqty.md)

## Affected Equations and Variables

EQ_OBJDAM
