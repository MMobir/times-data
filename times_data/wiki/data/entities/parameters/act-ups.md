---
type: entity
title: "ACT_UPS"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/act-minld, entities/parameters/act-cstup, entities/parameters/act-cstpl, entities/parameters/act-lospl]
last_updated: 2026-04-11
---

# ACT_UPS

**Category:** User Input
**Indexes:** r, datayear, p, s, bd

## Description

Maximum ramp-rate (down/up) of process activity as a fraction of nominal on-line capacity per hour.

## Details

Inherited/aggregated to the timeslice levels of the process activity. Direct inheritance. Weighted aggregation. The ramp rates can only be specified with bd=LO/UP.

## Units and Defaults

Decimal fraction [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [ACT_MINLD](../parameters/act-minld.md)
- [ACT_CSTUP](../parameters/act-cstup.md)
- [ACT_CSTPL](../parameters/act-cstpl.md)
- [ACT_LOSPL](../parameters/act-lospl.md)

## Affected Equations and Variables

Generates instances of equation EQ_ACTRAMP.
