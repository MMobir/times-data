---
type: entity
title: "NCAP_PASTY"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-pasti]
last_updated: 2026-04-11
---

# NCAP_PASTY

**Category:** User Input
**Indexes:** r, pastyear, p

## Description

Number of years to go back to calculate a linear build-up of past investments

## Details

Provided to spread a single past investment (NCAP_PASTI) back over several years (e.g., cars in the period before the 1st milestoneyr were bought over the previous 15 years). If overlaps with other past investments, the capacity values are added.

## Units and Defaults

Years [1,999]; default value: none

## Related Parameters and Sets

- [NCAP_PASTI](../parameters/ncap-pasti.md)

## Affected Equations and Variables

{See NCAP_PASTI}
