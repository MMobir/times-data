---
type: entity
title: "NCAP_AFCS"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-afc]
last_updated: 2026-04-11
---

# NCAP_AFCS

**Category:** User Input
**Indexes:** r, datayear, p, cg, ts

## Description

Commodity-specific availability of capacity for commodity group cg, timeslice-specific.

## Details

See NCAP_AFC. NCAP_AFCS is similar to NCAP_AFC but is defined on individual timeslices. Overrides NCAP_AFC.

## Units and Defaults

Decimal fraction [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [NCAP_AFC](../parameters/ncap-afc.md)

## Affected Equations and Variables

See NCAP_AFC.
