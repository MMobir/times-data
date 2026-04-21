---
type: entity
title: "COM_FR"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/com-proj, entities/parameters/com-ts, entities/parameters/com-tsl, entities/parameters/rtcs-tsfr]
last_updated: 2026-04-11
---

# COM_FR

**Category:** User Input
**Indexes:** r, datayear, c, s

## Description

Fraction of the annual demand (COM_PROJ) or commodity flow occurring in timeslice s; describes the shape of the load curve.

## Details

Normally defined only for demand commodities (com_type = 'DEM'), but can be applied to any commodity for defining load profiles. Affects timeslice resolution at which a commodity is tracked (RTCS_TSFR), and thereby may affect when a process cannot operate (rtps_off). Weighted inheritance. Weighted aggregation.

## Units and Defaults

Decimal fraction [0,1]; default value: timeslice duration (G_YRFR); Default i/e: STD

## Related Parameters and Sets

- [COM_PROJ](../parameters/com-proj.md)
- [com_ts](../parameters/com-ts.md)
- [com_tsl](../parameters/com-tsl.md)
- [RTCS_TSFR](../parameters/rtcs-tsfr.md)

## Affected Equations and Variables

Applied to the annual demand (COM_PROJ) as the RHS of the balance equation (EQ(l)_COMBAL). Enters the peaking equation (EQ_PEAK), if a peaking commodity. Applied to the bounds of elastic demand step variables (VAR_ELAST). Applied via RTFCS_FR in all equations to flows having a timeslice level coarser than target level.
