---
type: entity
title: "ACT_MINLD"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/act-ups, entities/parameters/act-cstup, entities/parameters/act-cstpl, entities/parameters/act-lospl]
last_updated: 2026-04-11
---

# ACT_MINLD

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Minimum stable operating level of a dispatchable process.

## Details

Can only be used for standard processes (not IRE or STG). Must be defined if ACT_CSTUP or ACT_TIME is specified.

## Units and Defaults

Decimal fraction [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [ACT_UPS](../parameters/act-ups.md)
- [ACT_CSTUP](../parameters/act-cstup.md)
- [ACT_CSTPL](../parameters/act-cstpl.md)
- [ACT_LOSPL](../parameters/act-lospl.md)

## Affected Equations and Variables

Generates instances of equations EQ_CAPLOAD and EQE_ACTUPS.
