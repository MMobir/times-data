---
type: entity
title: "TS_CYCLE"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/g-cycle]
last_updated: 2026-04-11
---

# TS_CYCLE

**Category:** User Input
**Indexes:** r, ts

## Description

Defines the length of the timeslice cycles under timeslice ts, in days, and thereby also the number of timeslice cycles under each parent.

## Details

Recommended to be used whenever timeslice cycles are different from the default, instead of changing G_CYCLE.

## Units and Defaults

Number of days [1,∞); Default values: 365 for ts=ANNUAL, 7 for any ts above the WEEKLY level, 1 for any ts above the DAYNITE level

## Related Parameters and Sets

- [G_CYCLE](../parameters/g-cycle.md)

## Affected Equations and Variables

Affects the calculation of actual timeslice lengths and number of timeslice cycles in various equations, notably storage and dispatching equations.
