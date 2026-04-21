---
type: entity
title: "COM_CUMPRD"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/bohyear, entities/parameters/eohyear, entities/parameters/rhs-comprd, entities/parameters/rcs-comprd, entities/parameters/rtc-cumprd]
last_updated: 2026-04-11
---

# COM_CUMPRD

**Category:** User Input
**Indexes:** r, y1, y2, bd

## Description

Bound on the cumulative production of a commodity between the years y1 and y2 within a region over timeslices.

## Details

The years y1 and y2 may be any years of the set allyear; where y1 may also be ‘BOH’ for first year of first period and y2 may be ‘EOH’ for last year of last period.

## Units and Defaults

Commodity unit [0,∞); default value: none; Default i/e: N/A

## Related Parameters and Sets

- [bohyear](../parameters/bohyear.md)
- [eohyear](../parameters/eohyear.md)
- [rhs_comprd](../parameters/rhs-comprd.md)
- [rcs_comprd](../parameters/rcs-comprd.md)
- [rtc_cumprd](../parameters/rtc-cumprd.md)

## Affected Equations and Variables

Forces the net commodity variable (VAR_COMPRD) to be included in the balance equation (EQE_COMBAL). The cumulative constraint is generated (EQ(l)_CUMPRD).
