---
type: entity
title: "NCAP_DISC"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/rp-dscncap]
last_updated: 2026-04-11
---

# NCAP_DISC

**Category:** User Input
**Indexes:** r, datayear, p, unit

## Description

Size of capacity units that can be added.

## Details

Used for lumpy investments.

## Units and Defaults

Capacity unit [0,∞); default value: none; Default i/e: MIG

## Related Parameters and Sets

- [rp_dscncap](../parameters/rp-dscncap.md)

## Affected Equations and Variables

Applied to the lumpy investment integer variable (VAR_DNCAP) in the discrete investment equation (EQ_DSCNCAP) to set the corresponding standard investment variable level (VAR_NCAP).
