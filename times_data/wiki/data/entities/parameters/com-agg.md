---
type: entity
title: "COM_AGG"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# COM_AGG

**Category:** User Input
**Indexes:** r, datayear, c1, c2

## Description

Aggregation of commodity NET/PRD production to the production side of the balance of another commodity.

## Details

When commodity lim_type is LO and commodity type is not DEM, VAR_COMNET of c1 is aggregated to c2; When commodity lim_type is FX/N or commodity type is DEM, VAR_COMPRD of c1 is aggregated to c2.

## Units and Defaults

Commodity units [open]; default value: none

## Related Parameters and Sets

None documented.

## Affected Equations and Variables

Adds a term in EQ(l)_COMBAL and EQ(l)_COMPRD.
