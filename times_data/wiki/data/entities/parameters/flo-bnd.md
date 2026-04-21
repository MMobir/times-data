---
type: entity
title: "FLO_BND"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# FLO_BND

**Category:** User Input
**Indexes:** r, datayear, p, cg, s, bd

## Description

Bound on the flow of a commodity or the sum of flows within a commodity group.

## Details

If the bound is specified for a timeslice s being above the flow timeslice resolution (rtpcs_varf), the bound is applied to the sum of the flow variables (VAR_FLO) according to the timeslice tree, otherwise directly to the flow variable. No aggregation.

## Units and Defaults

Commodity unit [0,∞); default: none; Default i/e: MIG

## Related Parameters and Sets

None documented.

## Affected Equations and Variables

Flow activity limit constraint (EQ(l)_FLOBND) when s is above rtpcs_varf Direct bound on activity variable (VAR_FLO) when at the rtpcs_varf level.
