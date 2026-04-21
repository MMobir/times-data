---
type: entity
title: "PRC_RESID"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-pasti]
last_updated: 2026-04-11
---

# PRC_RESID

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Residual existing capacity stock of process (p) still available in the year specified (datayear). PRC_RESID is most useful for describing the stock of capacity with mixed vintages, while NCAP_PASTI is suited for capacities of a certain vintages, such as an individual power plants.

## Details

If only a single data point is specified, linear decay of the specified residual capacity over technical lifetime is assumed. Used as an alternative to NCAP_PASTI, not to use both for the same process.

## Units and Defaults

Capacity unit [0,∞); default value: none; Default i/e: 1

## Related Parameters and Sets

- [NCAP_PASTI](../parameters/ncap-pasti.md)

## Affected Equations and Variables

EQ(l)_CAPACT, EQ(l)_CAFLAC, EQL_CAPFLO, EQ(l)_CPT, VAR_CAP
