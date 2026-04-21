---
type: concept
title: "Commodities"
aliases: []
tags: [core, topology]
sources:
  - raw/docs/part-1/02-basic-structure.md
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

Commodities in TIMES represent anything that flows between processes: energy carriers, materials, demands, emissions, and financial flows.

## Commodity Types

Every commodity belongs to exactly one type (set `com_type`):

| Type | Code | Description | Default Balance |
|------|------|-------------|-----------------|
| Demand | DEM | End-use energy services | Production >= Consumption |
| Energy | NRG | Energy carriers (electricity, gas, oil, etc.) | Production >= Consumption |
| Material | MAT | Physical materials | Production = Consumption |
| Emission | ENV | Environmental outputs (CO2, NOx, etc.) | Production >= Consumption |
| Financial | FIN | Monetary/financial flows | Production = Consumption |

## Commodity Groups

Commodities can be grouped into user-defined commodity groups (`cg`). Groups are used for:
- Defining process topology (which commodities a process uses)
- Applying constraints to groups of commodities
- Defining peaking constraints across related commodities

## Key Sets

- `c (cg)`: All commodities (subset of commodity groups)
- `com_tmap(r,com_type,c)`: Maps each commodity to its type
- `com_ts(r,c,s)`: Timeslices at which the commodity is tracked
- `com_lim(r,c,lim)`: Balance equation type

## Sources

- [Part I, Ch.2: Basic Structure](../../raw/docs/part-1/02-basic-structure.md)
- [Part II, Ch.2: Sets](../../raw/docs/part-2/02-sets.md)
