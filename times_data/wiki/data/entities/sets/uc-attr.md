---
type: entity
title: "uc_attr (r,uc_n,side, uc_grptype, uc_name)"
aliases: []
tags: [set, user-input]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# uc_attr (r,uc_n,side, uc_grptype, uc_name)

**Category:** User Input
**Aliases:** None

## Description

Set of quintuples such that the UC modifier specified by the uc_name (e.g., cost, conversion factor, etc.) will be applied to the coefficient for the variable identified by uc_grptype in the user constraint uc_n, for the side side ('LHS' or 'RHS') in region r; if uc_name='GROWTH' the user constraint represents a growth constraint.

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
