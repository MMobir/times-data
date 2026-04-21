---
type: topic
title: "Modeling Emissions in TIMES"
aliases: []
tags: [emissions, env, policy]
sources:
  - raw/docs/part-1/02-basic-structure.md
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# Modeling Emissions in TIMES

## Overview

Emissions in TIMES are modeled as environmental (ENV) commodities produced by processes. This guide covers how to set up emission tracking, apply constraints, and analyze results.

## Setting Up Emissions

1. **Define emission commodities:** Create ENV-type commodities (e.g., CO2, NOx, SO2)
2. **Define emission coefficients:** Use `FLO_EMIS(r,y,p,cg,c,s)` to specify emissions per unit of process flow
3. **Alternatively, use ENV_ACT:** Use `ENV_ACT(r,y,p,c)` for emissions per unit of activity

## Emission Constraints

- **Global cap:** Use `COM_BNDNET(r,y,c,s,bd)` to bound total net emissions
- **Sector caps:** Use user constraints (UC_*) to cap emissions from specific sectors
- **Carbon tax:** Use `COM_TAXNET(r,y,c,s,cur)` to apply a tax per unit of emission
- **Cumulative limits:** Use `COM_CUMNET(r,c,y1,y2,bd)` for cumulative emission budgets

## Common Issues (from forum)

- Emissions not appearing in results: Check that FLO_EMIS is defined on the correct flow group
- Double counting: Be careful with emission factors at different levels of the supply chain
- Dummy imports: The model may import emissions to satisfy balance constraints -- use `COM_LIM` = 'UP' for ENV commodities

## Sources

- [Part I, Ch.2: Basic Structure](../../raw/docs/part-1/02-basic-structure.md)
- [Part II, Ch.3: Parameters](../../raw/docs/part-2/03-parameters.md) -- FLO_EMIS, ENV_ACT
