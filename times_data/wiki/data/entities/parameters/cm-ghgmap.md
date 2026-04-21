---
type: entity
title: "CM_GHGMAP"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# CM_GHGMAP

**Category:** User Input
**Indexes:** r, c, cm_var

## Description

Mapping and conversion of regional GHG emissions to global emissions in the climate module

## Details

The global emissions in the climate module (cm_var) are 'CO2-GtC' (GtC), 'CH4-Mt' (Mt) and 'N2O-Mt' (Mt). See Appendix on Climate Module for details.

## Units and Defaults

Units of climate module emissions per units of regional emissions [0,∞); default value: none

## Related Parameters and Sets

None documented.

## Affected Equations and Variables

EQ_CLITOT
