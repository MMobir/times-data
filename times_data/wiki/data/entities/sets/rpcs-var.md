---
type: entity
title: "rpcs_var (r,p,c,s)"
aliases: []
tags: [set, internal]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# rpcs_var (r,p,c,s)

**Category:** Internal
**Aliases:** None

## Description

The list of valid timeslices for the flow variable (VAR_FLO) of commodity c associated with process p in region r; flow variables of commodities which are part of the primary commodity group have the timeslice resolution of the process (prc_tsl), while all other flow variables are created according to the rps_s1 timeslices.

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
