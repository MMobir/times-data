---
type: entity
title: "ACT_EFF"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# ACT_EFF

**Category:** User Input
**Indexes:** r, datayear, p, cg, s

## Description

Activity efficiency for process, i.e. amount of activity per unit of commodity flows in the group cg. For more information on usage, see Section 6.3 for details about EQE_ACTEFF.

## Details

The group cg may be a single commodity, group, or commodity type on the shadow side, or a single commodity in the PCG; cg='ACT' refers to the default shadow group. If no group efficiency is defined, shadow group is assumed to be the commodity type. Individual commodity efficiencies are multiplied with the shadow group efficiency (default=1). Levelized to the timeslice level of the flow variables in the shadow group. Direct inheritance. Weighted aggregation.

## Units and Defaults

Activity unit per flow unit [0,∞); Default value: none; Default group efficiency =1 when values are specified only for individual commodities. Default i/e: STD

## Related Parameters and Sets

None documented.

## Affected Equations and Variables

Generates instances of the activity efficiency constraint (EQE_ACTEFF)
