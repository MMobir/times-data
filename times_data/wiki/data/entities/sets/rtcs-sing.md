---
type: entity
title: "rtcs_sing (r,t,c,s,io)"
aliases: []
tags: [set, internal]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# rtcs_sing (r,t,c,s,io)

**Category:** Internal
**Aliases:** None

## Description

Indicator that a commodity c is not available in a specific period t and timeslice s, since the all the processes producing (io='OUT') or consuming it (io='IN') are turned-off. In the case of io='OUT', the commodity is not available, meaning that processes having only this commodity as input cannot operate. Similar reasoning applies to the case io='IN'.

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
