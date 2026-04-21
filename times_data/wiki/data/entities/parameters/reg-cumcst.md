---
type: entity
title: "REG_CUMCST"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/reg-bndcst]
last_updated: 2026-04-11
---

# REG_CUMCST

**Category:** User Input
**Indexes:** r, y1, y2, agg, cur, bd

## Description

Cumulative bound on regional costs by type of cost aggregation.

## Details

The cost aggregations (agg) supported are listed in the set COSTAGG (see Table 1).

## Units and Defaults

Monetary unit [0,∞); default value: none; Default i/e: N/A

## Related Parameters and Sets

- [REG_BNDCST](../parameters/reg-bndcst.md)

## Affected Equations and Variables

EQ_BNDCST, VAR_CUMCST
