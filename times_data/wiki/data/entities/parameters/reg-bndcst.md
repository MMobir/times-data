---
type: entity
title: "REG_BNDCST"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/reg-cumcst]
last_updated: 2026-04-11
---

# REG_BNDCST

**Category:** User Input
**Indexes:** r, datayear, agg, cur, bd

## Description

Bound on regional costs by type of cost aggregation.

## Details

The cost aggregations (agg) supported are listed in the set COSTAGG (see Table 1).

## Units and Defaults

Monetary unit [0,∞); default value: none; Default i/e: MIG

## Related Parameters and Sets

- [REG_CUMCST](../parameters/reg-cumcst.md)

## Affected Equations and Variables

EQ_BNDCST, VAR_CUMCST
