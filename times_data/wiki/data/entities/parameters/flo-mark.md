---
type: entity
title: "FLO_MARK"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/prc-mark]
last_updated: 2026-04-11
---

# FLO_MARK

**Category:** User Input
**Indexes:** r, datayear, p, c, bd

## Description

Process-wise market share in total commodity production.

## Details

The same given fraction is applied to all timeslices of the commodity (this could be generalized to allow time-slice-specific fractions, if deemed useful). If an ANNUAL level market-share is desired for a timesliced commodity, PRC_MARK can be used instead.

## Units and Defaults

Decimal fraction [0,1]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [PRC_MARK](../parameters/prc-mark.md)

## Affected Equations and Variables

The individual process flow variables (VAR_FLO, VAR_IN, VAR_STGIN/OUT) are constrained (EQ(l)_FLOMRK) to a fraction of the total production of a commodity (VAR_COMPRD). Forces the commodity production variable (VAR_COMPRD) to be included in the equality balance constraint (EQE_COMBAL).
