---
type: entity
title: "COM_CUMNET"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/bohyear, entities/parameters/eohyear, entities/parameters/rhs-combal, entities/parameters/rcs-combal, entities/parameters/rtc-cumnet]
last_updated: 2026-04-11
---

# COM_CUMNET

**Category:** User Input
**Indexes:** r, y1, y2, bd

## Description

Bound on the cumulative net amount of a commodity between the years y1 and y2, within a region over timeslices.

## Details

The years y1 and y2 may be any years of the set allyear; where y1 may also be ‘BOH’ for first year of first period and y2 may be ‘EOH’ for last year of last period.

## Units and Defaults

Commodity unit [0,∞); default value: none; Default i/e: N/A

## Related Parameters and Sets

- [bohyear](../parameters/bohyear.md)
- [eohyear](../parameters/eohyear.md)
- [rhs_combal](../parameters/rhs-combal.md)
- [rcs_combal](../parameters/rcs-combal.md)
- [rtc_cumnet](../parameters/rtc-cumnet.md)

## Affected Equations and Variables

Forces the net commodity variable (VAR_COMNET) to be included in the equality balance constraint (EQE_COMBAL). Generates the cumulative commodity constraint (EQ(l)_CUMNET).
