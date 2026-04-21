---
type: entity
title: "UC_TIME"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# UC_TIME

**Category:** User Input
**Indexes:** uc_n, r, datayear

## Description

Multiplier for the number of years in model periods (static UCs), or between milestone years (dynamic UCs)

## Details

Used in user constraints.

## Units and Defaults

Dimensionless [open]; default value: none; Default i/e: STD

## Related Parameters and Sets

None documented.

## Affected Equations and Variables

Adds a time constant to the RHS side. EQ(l)_UCXXX
