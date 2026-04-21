---
type: concept
title: "Storage Technologies"
aliases: []
tags: [core, special-processes]
sources:
  - raw/docs/part-2/04-special-processes.md
related: []
last_updated: 2026-04-11
---

Storage processes in TIMES model technologies that store energy or materials across timeslices (e.g., batteries, pumped hydro, seasonal heat storage).

## How Storage Works

A storage process has three phases:
1. **Charging (STG_IN):** Commodity flows into storage
2. **Stored level:** Energy/material held in storage
3. **Discharging (STG_OUT):** Commodity flows out of storage

The model tracks the storage level across timeslices, ensuring it never goes negative and respects capacity limits.

## Storage Types

- **Timeslice storage (STG):** Stores across timeslices within a period (e.g., daily battery cycling)
- **Inter-period storage (STS):** Stores across periods (e.g., strategic reserves)
- **Night storage (NST):** Specialized storage for night-time charging

## Key Parameters

- `STG_EFF(r,y,p)`: Round-trip storage efficiency
- `STG_LOSS(r,y,p,s)`: Storage losses per unit time
- `STG_CHRG(r,y,p,s)`: Fraction of output capacity available for charging
- `STG_MAXCYC(r,y,p)`: Maximum number of storage cycles
- `NCAP_AF`: Availability factor (limits output capacity)

## Common Modeling Pitfalls

From forum discussions:
- Storage capacity (NCAP_COST) refers to the discharge power capacity, not energy capacity
- Use `NCAP_COST` for power capacity cost and activity-related costs for energy capacity
- `STG_EFF` is the full round-trip efficiency, not one-way

## Sources

- [Part II, Ch.4: Special Processes](../../raw/docs/part-2/04-special-processes.md)
- Forum: Multiple threads on storage modeling
