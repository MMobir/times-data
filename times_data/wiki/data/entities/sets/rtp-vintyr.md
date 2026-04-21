---
type: entity
title: "rtp_vintyr (r,v,t,p)"
aliases: []
tags: [set, internal]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# rtp_vintyr (r,v,t,p)

**Category:** Internal
**Aliases:** None

## Description

An indication of for which periods (t) a process (p) in a region (r) is available since it was first installed (v); for vintaged processes (prc_vint) identical to rtp_cptyr, for non-vintaged processes the v index in the rtp_cptyr entries is ignored by setting it to t (v = t).

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
