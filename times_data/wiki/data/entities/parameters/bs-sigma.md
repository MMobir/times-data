---
type: entity
title: "BS_SIGMA"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# BS_SIGMA

**Category:** User Input
**Indexes:** r, datayear, b, grp, s

## Description

Standard deviation of forecast error for the imbalance source grp, in region r, timeslice s, used for calculating the demand for reserve b

## Details

Levelized to finest ts-level. See the ABS documentation for details

## Units and Defaults

Unit: dimensionless (0,∞); default value: none

## Related Parameters and Sets

None documented.

## Affected Equations and Variables

EQ_BS03
