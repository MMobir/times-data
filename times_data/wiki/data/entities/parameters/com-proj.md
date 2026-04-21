---
type: entity
title: "COM_PROJ"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/com-fr]
last_updated: 2026-04-11
---

# COM_PROJ

**Category:** User Input
**Indexes:** r, datayear, c

## Description

Projected annual demand for a commodity.

## Details

In standard usage, only applicable to demand commodities (com_type = ‘DEM’). In advanced usage, may also be specified for other commodities for defining an exogenous demand. Demand is allocated to sub-annual timeslices according to COM_FR.

## Units and Defaults

Commodity unit [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [COM_FR](../parameters/com-fr.md)

## Affected Equations and Variables

Serves as the RHS (after COM_FR applied) of the commodity balance constraint (EQ(l)_COMBAL). Enters the peaking equation (EQ_PEAK), if a peaking commodity. Applied when setting the upper bound of an elastic demand step (VAR_ELAST).
