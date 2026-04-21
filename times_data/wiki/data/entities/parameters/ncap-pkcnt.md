---
type: entity
title: "NCAP_PKCNT"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/com-peak, entities/parameters/com-pkts, entities/parameters/prc-pkaf, entities/parameters/prc-pkno]
last_updated: 2026-04-11
---

# NCAP_PKCNT

**Category:** User Input
**Indexes:** r, datayear, p, s

## Description

Fraction of capacity that can contribute to peaking equations.

## Details

If the indicator PRC_PKAF is specified, the NCAP_PKCNT is set equal to the availabilities NCAP_AF. Direct inheritance. Weighted aggregation.

## Units and Defaults

Decimal fraction [0,1]; default value: 1; Default i/e: STD

## Related Parameters and Sets

- [com_peak](../parameters/com-peak.md)
- [com_pkts](../parameters/com-pkts.md)
- [prc_pkaf](../parameters/prc-pkaf.md)
- [prc_pkno](../parameters/prc-pkno.md)

## Affected Equations and Variables

Applied to investments in capacity (VAR_NCAP, NCAP_PASTI) in the peaking constraint (EQ_PEAK).
