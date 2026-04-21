---
type: entity
title: "NCAP_AF"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-afa, entities/parameters/ncap-afs, entities/parameters/ncap-afm, entities/parameters/ncap-afx, entities/parameters/coef-af]
last_updated: 2026-04-11
---

# NCAP_AF

**Category:** User Input
**Indexes:** r, datayear, p, s, bd

## Description

Availability factor relating a unit of production (process activity) in timeslice s to the current installed capacity.

## Details

NCAP_AF, NCAP_AFA and NCAP_AFS can be applied simultaneously. Direct inheritance. Weighted aggregation. (Important remark: No inheritance/aggregation if any value is specified at process timeslices.)

## Units and Defaults

Decimal fraction [0,1]; default value: 1; Default i/e: STD. Remark: In special cases values >1 can also be used (when PRC_CAPACT does not represent the max. technical level of activity per unit of capacity).

## Related Parameters and Sets

- [NCAP_AFA](../parameters/ncap-afa.md)
- [NCAP_AFS](../parameters/ncap-afs.md)
- [NCAP_AFM](../parameters/ncap-afm.md)
- [NCAP_AFX](../parameters/ncap-afx.md)
- [COEF_AF](../parameters/coef-af.md)

## Affected Equations and Variables

The corresponding capacity-activity constraint (EQ(l)_CAPACT) will be generated for any timeslice s. If the process timeslice level (PRC_TSL) is below said level, the activity variables will be summed.
