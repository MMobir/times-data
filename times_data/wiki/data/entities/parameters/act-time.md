---
type: entity
title: "ACT_TIME"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/act-minld, entities/parameters/act-cstup, entities/parameters/act-ups, entities/parameters/stg-sift]
last_updated: 2026-04-11
---

# ACT_TIME

**Category:** User Input
**Indexes:** r, datayear, p, lim

## Description

1) Minimum online (UP) / offline (LO) hours of a process with start-up costs modeled (lim=LO/UP) 2) Maximum number of start-up cycles within process time-slice cycles (lim=N). 3) Maximum delay or advance of load shift (lim=UP/LO/FX) or load balancing time (lim=N) for a load-shifting storage.

## Details

Can be used for standard processes when start-up costs have been modeled, using both ACT_MINLD and ACT_CSTUP at the DAYNITE/WEEKLY level. The lim type 'FX' is not supported for this use, and is ignored. Can also be used for load-shifting storage processes, for defining the maximum delay/advance of load shift, or the time-window for load balancing (cf. Sect. 4.3.9).

## Units and Defaults

Hours [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [ACT_MINLD](../parameters/act-minld.md)
- [ACT_CSTUP](../parameters/act-cstup.md)
- [ACT_UPS](../parameters/act-ups.md)
- [STG_SIFT](../parameters/stg-sift.md)

## Affected Equations and Variables

Generates instances of EQL_ACTUPC. For load-shifting storage processes, generates instances of EQ_SLSIFT.
