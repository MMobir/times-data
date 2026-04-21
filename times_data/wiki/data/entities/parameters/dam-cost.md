---
type: entity
title: "DAM_COST"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/dam-bqty]
last_updated: 2026-04-11
---

# DAM_COST

**Category:** User Input
**Indexes:** r, datayear, c, cur

## Description

Marginal damage cost of emissions at Base quantity.

## Details

Damage costs are by default endogenous (included in the objective). To set them exogenous, use $SET DAMAGE NO

## Units and Defaults

Monetary unit per commodity unit [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [DAM_BQTY](../parameters/dam-bqty.md)

## Affected Equations and Variables

EQ_DAMAGE, EQ_OBJDAM
