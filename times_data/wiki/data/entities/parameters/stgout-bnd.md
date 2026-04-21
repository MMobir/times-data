---
type: entity
title: "STGOUT_BND"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/prc-nstts, entities/parameters/prc-stgips, entities/parameters/prc-stgtss]
last_updated: 2026-04-11
---

# STGOUT_BND

**Category:** User Input
**Indexes:** r, datayear, p, c, s, bd

## Description

Bound on the output flow of a storage process in a timeslice s.

## Details

Only applicable to storage processes (STG): timeslice storage, inter-period storage or night storage devices.

## Units and Defaults

Commodity unit [0,∞); default value: none; Default i/e: MIG

## Related Parameters and Sets

- [prc_nstts](../parameters/prc-nstts.md)
- [prc_stgips](../parameters/prc-stgips.md)
- [prc_stgtss](../parameters/prc-stgtss.md)

## Affected Equations and Variables

Storage output bound constraint (EQ(l)_STGOUT) when s is above prc_tsl of the storage process. Direct bound on storage output flow variable (VAR_SOUT) when at the prc_tsl level.
