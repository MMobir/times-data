---
type: entity
title: "prc_grp"
aliases: []
tags: [set, internal]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# prc_grp

**Category:** Internal
**Aliases:** None

## Description

List of process groups; internally established in MAPLIST.DEF as: CHP, DISTR, DMD, ELE, HPL, IRE, MISC, PRE, PRV, PRW, REF, RENEW, XTRACT, NST, STG, STK, STS. The user may augment this list with any additional groups desired. The following predefined groups affect the data processing carried out by the model generator, and should not be deleted by the user: CHP, DISTR, DMD, ELE, HPL, IRE, PRE, PRV, PRW, REF, NST, STG, STK and STS.

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
