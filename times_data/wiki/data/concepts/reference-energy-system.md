---
type: concept
title: "Reference Energy System (RES)"
aliases: []
tags: [core, topology]
sources:
  - raw/docs/part-1/02-basic-structure.md
related: []
last_updated: 2026-04-11
---

The Reference Energy System (RES) is the foundational network representation in TIMES. It describes all the energy flows in a region, from primary resource extraction through conversion, transmission, and distribution, to end-use energy services.

## Key Elements

The RES consists of:
- **Processes (technologies):** Transform, transport, or store commodities. Each process has inputs and outputs.
- **Commodities:** Energy carriers (NRG), materials (MAT), demands (DEM), emissions (ENV), and financial flows (FIN).
- **Flows:** The connections between processes and commodities, quantifying how much of each commodity a process consumes or produces.

## How It Works

In TIMES, the modeler defines the RES by specifying:
1. The set of commodities (energy carriers, demands, emissions)
2. The set of processes (power plants, refineries, vehicles, etc.)
3. The topology: which processes consume or produce which commodities

The model then optimizes investments and operations across the entire RES to meet all demands at minimum total system cost (or maximum total surplus when demand is elastic).

## Relationship to Other Concepts

- Each process is defined by its [commodity flows](commodity-balance.md), capacity, efficiency, costs, and lifetime
- The RES spans all [timeslices](timeslices.md) and [time periods](time-periods.md)
- [User constraints](user-constraints.md) can impose additional limits on any part of the RES

## Sources

- [Part I, Ch.2: Basic Structure](../../raw/docs/part-1/02-basic-structure.md)
- [Part II, Ch.1: Introduction](../../raw/docs/part-2/01-introduction.md)
