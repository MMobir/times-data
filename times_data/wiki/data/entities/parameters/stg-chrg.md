---
type: entity
title: "STG_CHRG"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/prc-nstts, entities/parameters/prc-stgips, entities/parameters/prc-stgtss]
last_updated: 2026-04-11
---

# STG_CHRG

**Category:** User Input
**Indexes:** r, datayear, p, s

## Description

Annual exogenous charging of a storage technology in a particular timeslice s.

## Details

Only applicable to storage processes (STG): timeslice storage, inter-period storage or night storage devices.

## Units and Defaults

Storage unit [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [prc_nstts](../parameters/prc-nstts.md)
- [prc_stgips](../parameters/prc-stgips.md)
- [prc_stgtss](../parameters/prc-stgtss.md)

## Affected Equations and Variables

Exogenous charging of storage enters storage equations (EQ_STGTSS, EQ_STGIPS) as right-hand side constant.
