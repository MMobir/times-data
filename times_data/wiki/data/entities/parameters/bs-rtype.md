---
type: entity
title: "BS_RTYPE"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# BS_RTYPE

**Category:** User Input
**Indexes:** r, b

## Description

Type of reserve commodity b, positive or negative ± 1–4: ±1 : FCR reserve, ±2 : AFRR reserve, ±3 : MFRR reserve, ±4 : RR reserve

## Details

Required for enabling reserve provision calculations. See the ABS documentation for details

## Units and Defaults

Unit: dimensionless {±1, ±2, ±3, ±4}; default value: none

## Related Parameters and Sets

None documented.

## Affected Equations and Variables

EQ_BS00, EQ_BS01, EQ_BS11, EQ_BS18, EQ_BS19, EQ_BS26
