---
type: entity
title: "rpc_noflo (r,p,c)"
aliases: []
tags: [set, internal]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# rpc_noflo (r,p,c)

**Category:** Internal
**Aliases:** None

## Description

A subset of rpc_capflo indicating those processes (p) in a region (r) where a commodity (c) is only consumed or produced through capacity based flows, and thus has no flow variable for the commodity.

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
