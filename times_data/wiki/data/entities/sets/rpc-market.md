---
type: entity
title: "rpc_market (all_r,p,c,ie)"
aliases: []
tags: [set, internal]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# rpc_market (all_r,p,c,ie)

**Category:** Internal
**Aliases:** None

## Description

List of market regions (subset of all_r) that trade a commodity (c) through a process (p) either by only multidirectional export links (ie='EXP') or by both import and export links (ie='IMP'). The market structure is user-defined through the set top_ire.

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
