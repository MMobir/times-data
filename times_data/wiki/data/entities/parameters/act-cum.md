---
type: entity
title: "ACT_CUM"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/flo-cum]
last_updated: 2026-04-11
---

# ACT_CUM

**Category:** User Input
**Indexes:** r, p, y1, y2, bd

## Description

Bound on the cumulative amount of annual process activity between the years y1 and y2, within a region.

## Details

The years y1 and y2 may be any years of the set allyear; where y1 may also be 'BOH' for first year of first period and y2 may be 'EOH' for last year of last period.

## Units and Defaults

Activity unit [0,∞); default value: none; Default i/e: N/A

## Related Parameters and Sets

- [FLO_CUM](../parameters/flo-cum.md)

## Affected Equations and Variables

Generates an instance of the cumulative constraint (EQ_CUMFLO)
