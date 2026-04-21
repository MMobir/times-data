---
type: entity
title: "NCAP_AFS"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-af, entities/parameters/ncap-afa, entities/parameters/ncap-afm, entities/parameters/ncap-afsx, entities/parameters/coef-af]
last_updated: 2026-04-11
---

# NCAP_AFS

**Category:** User Input
**Indexes:** r, datayear, p, s, bd

## Description

Availability factor relating the activity of a process in a timeslice s being at or above the process timeslice level (prc_tsl) to the installed capacity. If for example the process timeslice level is ‘DAYNITE’ and NCAP_AFS is specified for timeslices on the ‘SEASONAL’ level, the sum of the ‘DAYNITE’ activities within a season are restricted, but not the ‘DAYNITE’ activities directly.

## Details

NCAP_AF, NCAP_AFA and NCAP_AFS can be applied simultaneously. Direct inheritance. Weighted aggregation. (Important remark: No inheritance/aggregation if any value is specified at process timeslices.)

## Units and Defaults

Decimal fraction [0,1]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [NCAP_AF](../parameters/ncap-af.md)
- [NCAP_AFA](../parameters/ncap-afa.md)
- [NCAP_AFM](../parameters/ncap-afm.md)
- [NCAP_AFSX](../parameters/ncap-afsx.md)
- [COEF_AF](../parameters/coef-af.md)

## Affected Equations and Variables

The corresponding capacity-activity constraint (EQ(l)_CAPACT)
