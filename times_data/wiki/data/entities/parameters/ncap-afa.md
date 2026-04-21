---
type: entity
title: "NCAP_AFA"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-af, entities/parameters/ncap-afs, entities/parameters/ncap-afm, entities/parameters/ncap-afx, entities/parameters/coef-af]
last_updated: 2026-04-11
---

# NCAP_AFA

**Category:** User Input
**Indexes:** r, datayear, p, bd

## Description

Annual availability factor relating the annual activity of a process to the installed capacity.

## Details

Provided when ‘ANNUAL’ level process operation is to be controlled. NCAP_AF, NCAP_AFA and NCAP_AFS can be applied simultaneously. NCAP_AFA is always assumed to be non-vintage dependent, even if the process is defined as a vintaged one; for vintage dependent annual availability NCAP_AFS with s=’ANNUAL’ can be used.

## Units and Defaults

Decimal fraction [0,1]; default value: none; Default i/e: STD. Remark: In special cases values >1 can also be used (when PRC_CAPACT has been chosen not to represent the max. technical level of activity per unit of capacity).

## Related Parameters and Sets

- [NCAP_AF](../parameters/ncap-af.md)
- [NCAP_AFS](../parameters/ncap-afs.md)
- [NCAP_AFM](../parameters/ncap-afm.md)
- [NCAP_AFX](../parameters/ncap-afx.md)
- [COEF_AF](../parameters/coef-af.md)

## Affected Equations and Variables

The corresponding capacity-activity constraint (EQ(l)_CAPACT) will be generated for the ‘ANNUAL’ timeslice. If the process timeslice level (PRC_TSL) is below said level, the activity variables will be summed.
