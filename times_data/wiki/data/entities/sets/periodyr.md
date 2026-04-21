---
type: entity
title: "periodyr (v,y)"
aliases: []
tags: [set, internal]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# periodyr (v,y)

**Category:** Internal
**Aliases:** None

## Description

Mapping of individual years y to the modlyear (milestonyr or pastyear; v) period they belong to; if v is a pastyear, only the pastyear itself belongs to the period; for the last period of the model horizon also the years until the very end of the model accounting horizon (MIYR_VL + DUR_MAX) are elements of periodyr.

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
