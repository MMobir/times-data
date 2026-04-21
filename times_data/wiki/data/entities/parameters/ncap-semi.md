---
type: entity
title: "NCAP_SEMI"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-disc]
last_updated: 2026-04-11
---

# NCAP_SEMI

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Semi-continuous new capacity, lower bound. (See Section 5.9)

## Details

Upper bound for the capacity must be defined by NCAP_BND; if not defined, assumed to be equal to the lower bound. Requires MIP.

## Units and Defaults

Capacity unit (0,∞); default value: none; Default i/e: MIG

## Related Parameters and Sets

- [NCAP_DISC](../parameters/ncap-disc.md)

## Affected Equations and Variables

Applied to the semi-continuous investment variable VAR_SNCAP in the discrete investment equation EQ_DSCNCAP
