---
type: entity
title: "PRC_CAPACT"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/prc-actflo, entities/parameters/prc-actunt]
last_updated: 2026-04-11
---

# PRC_CAPACT

**Category:** User Input
**Indexes:** r, p

## Description

Conversion factor from capacity unit to activity unit assuming that the capacity is used for one year.

## Details

No additional details available.

## Units and Defaults

Activity unit / capacity unit (0,∞); default value: 1; Default i/e: none

## Related Parameters and Sets

- [PRC_ACTFLO](../parameters/prc-actflo.md)
- [PRC_ACTUNT](../parameters/prc-actunt.md)

## Affected Equations and Variables

Applied along with the availability factor (NCAP_AF) to the investment (VAR_NCAP + NCAP_PASTI) in the utilization equations (EQ(l)_CAPACT, EQ(l)_CAFLAC). Applied to the investment (VAR_NCAP + NCAP_PASTI) in the peak constraint (EQ_PEAK). Applied to the investment (VAR_NCAP + NCAP_PASTI) in the capacity utilization constraint for CHP plants (ECT_AFCHP) and peak constraint in the IER extension (see Part III).
