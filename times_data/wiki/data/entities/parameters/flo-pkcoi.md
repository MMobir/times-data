---
type: entity
title: "FLO_PKCOI"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/com-pkrsv, entities/parameters/com-pkflx, entities/parameters/com-peak, entities/parameters/com-pkts]
last_updated: 2026-04-11
---

# FLO_PKCOI

**Category:** User Input
**Indexes:** r, datayear, p, c, s

## Description

Factor that permits attributing more (or less) demand to the peaking equation (EQ_PEAK) than the average demand calculated by the model, to handle the situation where peak usage is typically higher (or lower) due to coincidental (or non-coincidental) loads at the time of the peak demand.

## Details

FLO_PKCOI is specified for individual processes p consuming the peak commodity c. Direct inheritance. Weighted aggregation. Used when the timeslices are not necessarily fine enough to pick up the actual peak within the peak timeslices.

## Units and Defaults

Scalar [open]; default value: 1; Default i/e: STD

## Related Parameters and Sets

- [COM_PKRSV](../parameters/com-pkrsv.md)
- [COM_PKFLX](../parameters/com-pkflx.md)
- [com_peak](../parameters/com-peak.md)
- [com_pkts](../parameters/com-pkts.md)

## Affected Equations and Variables

Applied to the flow variable (VAR_FLO) to adjust the amount of a commodity consumed when considering the average demand contributing to the peaking constraint (EQ_PEAK).
