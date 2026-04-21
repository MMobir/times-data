---
type: entity
title: "NCAP_FDR"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-cost]
last_updated: 2026-04-11
---

# NCAP_FDR

**Category:** User Input
**Indexes:** r, datayear, prc

## Description

Defines an annual rate of additional depreciation in the salvage value.

## Details

Provided when the effect of functional depreciation is considered significant to justify accelerated decrease in salvage value.

## Units and Defaults

Decimal fraction (0,∞); default value:none; Default i/e: STD

## Related Parameters and Sets

- [NCAP_COST](../parameters/ncap-cost.md)

## Affected Equations and Variables

Affects the salvage value coefficients in EQ_OBJSALV
