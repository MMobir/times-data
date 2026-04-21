---
type: entity
title: "DAM_BQTY"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/dam-cost]
last_updated: 2026-04-11
---

# DAM_BQTY

**Category:** User Input
**Indexes:** r, c

## Description

Base quantity of emissions for damage cost accounting

## Details

Only effective when DAM_COST has been defined for commodity c.

## Units and Defaults

Commodity unit [0,∞); default value: none; Default i/e: N/A

## Related Parameters and Sets

- [DAM_COST](../parameters/dam-cost.md)

## Affected Equations and Variables

EQ_DAMAGE, EQ_OBJDAM
