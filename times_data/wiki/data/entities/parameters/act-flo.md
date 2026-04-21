---
type: entity
title: "ACT_FLO"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# ACT_FLO

**Category:** User Input
**Indexes:** r, datayear, p, cg, s

## Description

Flow of commodities in cg in proportion to the process activity, in timeslice s. Non-vintaged variant available for vintaged processes by using a negative FLO_FUNCX.

## Details

Inherited/aggregated to the timeslice levels of the the process flow (cg=com) or the process activity (when cg=genuine group). Direct inheritance. Weighted aggregation.

## Units and Defaults

Flow unit per activity unit [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

None documented.

## Affected Equations and Variables

Establishes a transformation relationship (EQ_PTRANS) between the flows in the PCG and one or more input (or output) commodities.
