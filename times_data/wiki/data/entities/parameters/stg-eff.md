---
type: entity
title: "STG_EFF"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/prc-nstts, entities/parameters/prc-stgips, entities/parameters/prc-stgtss]
last_updated: 2026-04-11
---

# STG_EFF

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Efficiency of storage process.

## Details

Only applicable to storage processes (STG): timeslice storage, inter-period storage or night storage devices.

## Units and Defaults

Decimal fraction [0,∞); default value: 1; Default i/e: STD

## Related Parameters and Sets

- [prc_nstts](../parameters/prc-nstts.md)
- [prc_stgips](../parameters/prc-stgips.md)
- [prc_stgtss](../parameters/prc-stgtss.md)

## Affected Equations and Variables

Applied to the storage output flow (VAR_SOUT) in the commodity balance (EQ(l)_COMBAL) for the stored commodity.
