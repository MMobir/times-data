---
type: entity
title: "COM_PKRSV"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/com-peak, entities/parameters/com-pkts, entities/parameters/com-pkflx, entities/parameters/flo-pkcoi]
last_updated: 2026-04-11
---

# COM_PKRSV

**Category:** User Input
**Indexes:** r, datayear, c

## Description

Peak reserve margin as fraction of peak demand, e.g. if COM_PKRSV = 0.2, the total installed capacity must exceed the peak load by 20%.

## Details

Requires that commodity c is also requested to have peaking constraints, by defining COM_PEAK or COM_PKTS

## Units and Defaults

Scalar [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [com_peak](../parameters/com-peak.md)
- [com_pkts](../parameters/com-pkts.md)
- [COM_PKFLX](../parameters/com-pkflx.md)
- [FLO_PKCOI](../parameters/flo-pkcoi.md)

## Affected Equations and Variables

Applied to the total consumption of a commodity to raise the capacity needed to satisfy the peaking constraint (EQ_PEAK).
