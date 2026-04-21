---
type: entity
title: "P_OUT"
aliases: []
tags: [parameter, reporting]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/var-flo]
last_updated: 2026-04-11
---

# P_OUT

**Category:** Reporting
**Indexes:** r, t, p, c, s

## Description

Commodity Flow Levels by Process (set RPT_OPT(NRG_TYPE,'1')=1 to activate, see Part III): Output flow level (power level) of commodity (c) in period (t) and timeslice (s) of process (p). By default only Output levels are reported, but with RPT_OPT(NRG_TYPE,'3')=2, input levels are reported as negative values.

## Details

No additional details available.

## Units and Defaults

Power Units

## Related Parameters and Sets

- [VAR_FLO](../parameters/var-flo.md)

## Affected Equations and Variables

Not documented.
