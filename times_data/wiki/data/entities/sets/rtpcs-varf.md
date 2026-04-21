---
type: entity
title: "rtpcs_varf (r,t,p,c,s)"
aliases: []
tags: [set, internal]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# rtpcs_varf (r,t,p,c,s)

**Category:** Internal
**Aliases:** None

## Description

The list of valid timeslices (s) and periods (t) for the flow variable (VAR_FLO) of process (p) and commodity (c); taking into account the availability of the activity, capacity and flow (rtp_vara, rpcs_var and prc_foff). The timeslice level of a flow variable equals the process timeslice level (prc_tsl) when the flow is part of the primary commodity group of the process. Otherwise the timeslice level of a flow variable is set to the finest level of the commodities in the shadow group (SPG) or the process level, whichever is finer.

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
