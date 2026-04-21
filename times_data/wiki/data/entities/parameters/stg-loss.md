---
type: entity
title: "STG_LOSS"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/prc-nstts, entities/parameters/prc-stgips, entities/parameters/prc-stgtss]
last_updated: 2026-04-11
---

# STG_LOSS

**Category:** User Input
**Indexes:** r, datayear, p, s

## Description

STG_LOSS>0 defines the loss in proportion to the initial storage level during one year’s storage time. STG_LOSS<0 defines an equilibrium loss, i.e. how much the annual losses would be if the storage level is kept constant. Annual loss of a storage process per unit of average energy stored.

## Details

Only applicable to storage processes (STG): timeslice storage, inter-period storage or night storage devices.

## Units and Defaults

Decimal fraction [open]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [prc_nstts](../parameters/prc-nstts.md)
- [prc_stgips](../parameters/prc-stgips.md)
- [prc_stgtss](../parameters/prc-stgtss.md)

## Affected Equations and Variables

Timeslice storage process (EQ_STGTSS): applied to the average storage level (VAR_ACT) between two consecutive timeslices. Inter-period storage process (EQ_STGIPS): applied to the average storage level from the pre-period (VAR_ACT) and the net inflow (VAR_SIN-VAR_SOUT) of the current period.
