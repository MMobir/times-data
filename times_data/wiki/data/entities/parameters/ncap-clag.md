---
type: entity
title: "NCAP_CLAG"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-cled, entities/parameters/ncap-com]
last_updated: 2026-04-11
---

# NCAP_CLAG

**Category:** User Input
**Indexes:** r, datayear, p, c, io

## Description

Lagtime of a commodity after new capacity is installed.

## Details

Provided when there is a delay in commodity output after commissioning new capacity.

## Units and Defaults

Years [open]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [NCAP_CLED](../parameters/ncap-cled.md)
- [NCAP_COM](../parameters/ncap-com.md)

## Affected Equations and Variables

Applied to the investment variable (VAR_NCAP) in the commodity balance (EQ(l)_COMBAL) of the investment period or previous periods.
