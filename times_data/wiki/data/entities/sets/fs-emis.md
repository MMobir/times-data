---
type: entity
title: "fs_emis (r,p,cg,c,com)"
aliases: []
tags: [set, internal]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# fs_emis (r,p,cg,c,com)

**Category:** Internal
**Aliases:** None

## Description

Indicator that the flow variable (VAR_FLO) associated with emission com can be replaced by the flow variable of c multiplied by the emission factor FLO_SUM, which is used in the transformation equation (EQ_PTRANS) between the commodity group cg and the commodity com; used in the reduction algorithm (see Part III).

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
