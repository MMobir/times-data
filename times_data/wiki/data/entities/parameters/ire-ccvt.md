---
type: entity
title: "IRE_CCVT"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ire-tscvt, entities/parameters/top-ire]
last_updated: 2026-04-11
---

# IRE_CCVT

**Category:** User Input
**Indexes:** r1, c1, r2, c2

## Description

Conversion factor between commodity units in region r1 and region r2. Expresses the amount of commodity c2 in region r2 equivalent to 1 unit of commodity c1 in region r1.

## Details

Required for mapping commodities involved in inter-regional exchanges between two regions whenever commodities traded are in different units in the regions.

## Units and Defaults

Scalar (0,∞); Default value: 1 if commodity names are the same in both regions; I/e: N/A

## Related Parameters and Sets

- [IRE_TSCVT](../parameters/ire-tscvt.md)
- [top_ire](../parameters/top-ire.md)

## Affected Equations and Variables

The conversion factor is applied to the flow variable (VAR_IRE) in the inter-regional balance constraint (EQ_IRE). Similarly, applied to the flow variable (VAR_IRE) when an inter-regional exchange is bounded in the limit constraint (EQ(l)_IREBND). Similarly, applied to the flow variable (VAR_IRE) when an exchange with an external region is bounded (EQ(l)_XBND).
