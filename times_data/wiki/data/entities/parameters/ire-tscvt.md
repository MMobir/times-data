---
type: entity
title: "IRE_TSCVT"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ire-ccvt, entities/parameters/top-ire]
last_updated: 2026-04-11
---

# IRE_TSCVT

**Category:** User Input
**Indexes:** r1, s1, r2, s2

## Description

Matrix for mapping timeslices; the value for (r1,s1,r2,s2) gives the fraction of timeslice s2 in region r2 that falls in timeslice s1 in region r1.

## Details

Used for mapping timeslices in different regions. Required if timeslice definitions are different in the regions.

## Units and Defaults

Scalar (0,∞); default value: 1 if timeslice tree and names are the same in both regions; I/e: N/A

## Related Parameters and Sets

- [IRE_CCVT](../parameters/ire-ccvt.md)
- [top_ire](../parameters/top-ire.md)

## Affected Equations and Variables

The conversion factor is applied to the flow variable (VAR_IRE) in the inter-regional balance constraint (EQ_IRE). Similarly, applied to the flow variable (VAR_IRE) when an inter-regional exchange is bounded in the limit constraint (EQ(l)_IREBND). Similarly, applied to the flow variable (VAR_IRE) when an exchange with an external region is bounded (EQ(l)_XBND).
