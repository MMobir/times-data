---
type: entity
title: "G_YRFR"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/rtcs-tsfr, entities/parameters/rs-stgprd]
last_updated: 2026-04-11
---

# G_YRFR

**Category:** User Input
**Indexes:** all_r, s

## Description

Duration of timeslice s as fraction of a year. Used for shaping the load curve and lining up timeslice duration for inter-regional exchanges.

## Details

Must be provided for each region and timeslice.

## Units and Defaults

Fraction [0,1]; default value: none; only for the ANNUAL timeslice a value of 1 is predefined

## Related Parameters and Sets

- [RTCS_TSFR](../parameters/rtcs-tsfr.md)
- [RS_STGPRD](../parameters/rs-stgprd.md)

## Affected Equations and Variables

Applied to various variables (VAR_NCAP+PASTI, VAR_COMX, VAR_IRE, VAR_FLO, VAR_SIN/OUT) in the commodity balance equation (EQ(l)_COMBAL).
