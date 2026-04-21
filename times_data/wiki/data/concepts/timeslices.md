---
type: concept
title: "Timeslices"
aliases: []
tags: [core, time]
sources:
  - raw/docs/part-1/02-basic-structure.md
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

Timeslices represent sub-annual time resolution in TIMES. They allow the model to capture seasonal and diurnal variations in energy supply and demand within each model period.

## Timeslice Tree

Timeslices are organized in a hierarchical tree:
- **ANNUAL** (top level)
  - **Seasons** (e.g., Winter, Summer, Intermediate)
    - **Day/Night** or **Daynite** (e.g., Day, Night, Peak)

The user defines the tree structure and the fraction of the year each timeslice represents via the `G_YRFR` parameter.

## Key Sets and Parameters

- `s` (all_ts): The set of all timeslices
- `tslvl`: Timeslice level (ANNUAL, SEASON, WEEKLY, DAYNITE)
- `ts_map(r,s1,s2)`: Parent-child mapping in the timeslice tree
- `G_YRFR(r,s)`: Fraction of the year for each timeslice
- `com_ts(r,c,s)`: Which timeslices each commodity is tracked at
- `prc_ts(r,p,s)`: Which timeslices each process operates at

## Timeslice Resolution

Different commodities and processes can operate at different timeslice levels:
- Base-load power plants might operate at ANNUAL level
- Electricity might be tracked at DAYNITE level
- Heating demands might be tracked at SEASON level

The `com_tsl(r,c,tslvl)` and `prc_tsl(r,p,tslvl)` sets control this.

## Sources

- [Part I, Ch.2: Basic Structure](../../raw/docs/part-1/02-basic-structure.md)
- [Part II, Ch.2: Sets](../../raw/docs/part-2/02-sets.md)
