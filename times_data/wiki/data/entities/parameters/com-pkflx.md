---
type: entity
title: "COM_PKFLX"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/com-peak, entities/parameters/com-pkts, entities/parameters/com-pkrsv, entities/parameters/flo-pkcoi]
last_updated: 2026-04-11
---

# COM_PKFLX

**Category:** User Input
**Indexes:** r, datayear, c, s

## Description

Difference between the average demand and the peak demand in timeslice s, expressed as fraction of the average demand.

## Details

Direct inheritance. Weighted aggregation.

## Units and Defaults

Scalar [open]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [com_peak](../parameters/com-peak.md)
- [com_pkts](../parameters/com-pkts.md)
- [COM_PKRSV](../parameters/com-pkrsv.md)
- [FLO_PKCOI](../parameters/flo-pkcoi.md)

## Affected Equations and Variables

Applied to the total consumption of a commodity to raise the capacity needed to satisfy the peaking constraint (EQ_PEAK).
