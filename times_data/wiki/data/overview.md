---
type: concept
title: "TIMES Overview"
aliases: [TIMES at a glance, what is TIMES]
tags: [overview, introduction]
sources:
  - raw/docs/part-1/01-introduction.md
  - raw/docs/part-1/02-basic-structure.md
related:
  - concepts/reference-energy-system
  - concepts/objective-function
  - concepts/scenarios
last_updated: 2026-04-11
---

# TIMES -- The Integrated MARKAL-EFOM System

## What is TIMES?

TIMES is a bottom-up, technology-rich energy system optimization model generator developed and maintained by the IEA-ETSAP (Energy Technology Systems Analysis Programme). It computes a dynamic partial equilibrium over a multi-period time horizon, finding the least-cost (or maximum surplus) configuration of an energy system that meets all demands and constraints.

## Key Characteristics

- **Technology-rich:** Every technology (power plant, vehicle, appliance, etc.) is modeled individually with its own costs, efficiency, lifetime, and constraints
- **Multi-period:** Models evolve over decades (typically 2020-2060 or beyond) with investment and retirement decisions in each period
- **Multi-regional:** Can model trade and interactions between regions
- **Linear programming:** At its core, TIMES is an LP (with optional MIP for lumpy investments and learning curves)
- **Scenario-based:** Designed for exploring alternative futures under different policy and technology assumptions

## Core Concepts

1. **[Reference Energy System (RES)](concepts/reference-energy-system.md):** The network of processes and commodities representing the entire energy system
2. **[Processes](concepts/processes.md):** Technologies that transform commodities (power plants, refineries, vehicles, etc.)
3. **[Commodities](concepts/commodities.md):** Energy carriers (NRG), demands (DEM), materials (MAT), emissions (ENV), financial flows (FIN)
4. **[Commodity Balance](concepts/commodity-balance.md):** The fundamental constraint ensuring supply meets demand
5. **[Objective Function](concepts/objective-function.md):** Total discounted system cost, minimized by the optimizer
6. **[Timeslices](concepts/timeslices.md):** Sub-annual time resolution (seasons, day/night)
7. **[Time Periods](concepts/time-periods.md):** Multi-year model periods

## The Four Components of a TIMES [Scenario](concepts/scenarios.md)

1. **Demands:** Energy service demands driven by GDP, population, etc.
2. **Supply:** Primary resource potentials and costs
3. **Policy:** Emission caps, taxes, subsidies, portfolio standards
4. **Technologies:** Current and future technology characteristics

## Extensions

- **[Elastic Demand](concepts/elastic-demand.md):** Price-responsive demands
- **[Stochastic Programming](topics/stochastic-programming.md):** Decision-making under uncertainty
- **[Lumpy Investments](topics/lumpy-investments.md):** Discrete capacity additions (MIP)
- **[Endogenous Technological Learning](topics/technology-learning.md):** Cost reductions through deployment
- **Limited Foresight (Myopic):** Step-by-step decision-making without perfect foresight

## Implementation

TIMES is implemented in **GAMS** (General Algebraic Modeling System). The standard user interface is **[VEDA 2.0](topics/veda-workflow.md)**, developed by KanORS-EMR, which manages data input (via Excel templates) and results analysis.

## This Wiki

This wiki contains:
- **288 parameter pages** documenting every TIMES input parameter
- **178 set pages** documenting all model sets
- **37 index pages** documenting fundamental dimensions
- **14 concept pages** explaining core TIMES ideas
- **7 topic pages** with practical deep-dives
- **FAQ pages** synthesized from the [VEDA/TIMES forum](https://forum.kanors-emr.org/)

See the [full index](index.md) for a complete catalog.
