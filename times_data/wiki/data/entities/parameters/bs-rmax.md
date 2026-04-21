---
type: entity
title: "BS_RMAX"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# BS_RMAX

**Category:** User Input
**Indexes:** r, datayear, p, c, s

## Description

Maximum contribution of process p, in timeslice s to the provision of reserve commodity b.

## Details

Required for enabling reserve provision from any non-storage processes. Levelized to PRC_TSL. See the ABS documentation for details

## Units and Defaults

Unit: dimensionless (fraction of capacity) [0, 1]; default value: none

## Related Parameters and Sets

None documented.

## Affected Equations and Variables

EQ_BS11, EQ_BS19
