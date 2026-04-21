---
type: entity
title: "prc_stgtss (r,p,c)"
aliases: []
tags: [set, internal]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# prc_stgtss (r,p,c)

**Category:** Internal
**Aliases:** None

## Description

Set of triplets {r,p,c} such that process p is a storage process between timeslices (e.g., seasonal hydro reservoir, day/night pumped storage) for commodity c in region r; commodity c enters and/or leaves the storage according to set top; the storage operates at the timeslice level prc_tsl.

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
