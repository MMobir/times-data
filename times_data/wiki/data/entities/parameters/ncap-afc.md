---
type: entity
title: "NCAP_AFC"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-afcs]
last_updated: 2026-04-11
---

# NCAP_AFC

**Category:** User Input
**Indexes:** r, datayear, p, cg, tsl

## Description

Commodity-specific availability of capacity for commodity group cg, at given timeslice level. Applies also matching NCAP_AF / AFS / AFA as a multiplier, unless the independent option is used.

## Details

If the commodities are in the PCG, constraint is applied to the flows in the PCG as a whole (linear combination of flows). Independent equations are generated for commodities not in the PCG, or when NCAP_AFC(r,’0’,p,’ACT’,tsl) =–1 is also specified.

## Units and Defaults

Decimal fraction [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [NCAP_AFCS](../parameters/ncap-afcs.md)

## Affected Equations and Variables

Generates instances of EQ(l)_CAFLAC (thereby disabling EQ(l)_CAPACT generation), or EQL_CAPFLO.
