---
type: entity
title: "NCAP_CLED"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-icom, entities/parameters/coef-icom]
last_updated: 2026-04-11
---

# NCAP_CLED

**Category:** User Input
**Indexes:** r, datayear, p, c

## Description

Lead time requirement for a commodity during construction (NCAP_ICOM), prior to the initial availability of the capacity.

## Details

Provided when a commodity must be available prior to availability of a process.

## Units and Defaults

Years [open]; default value: = NCAP_ILED; Default i/e: STD

## Related Parameters and Sets

- [NCAP_ICOM](../parameters/ncap-icom.md)
- [COEF_ICOM](../parameters/coef-icom.md)

## Affected Equations and Variables

Applied to the investment variable (VAR_NCAP) in the commodity balance (EQ(l)_COMBAL) of the investment period or previous periods.
