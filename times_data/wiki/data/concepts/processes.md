---
type: concept
title: "Processes (Technologies)"
aliases: []
tags: [core, topology]
sources:
  - raw/docs/part-1/02-basic-structure.md
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

In TIMES, a **process** (also called a technology) is any device or activity that transforms, transports, or stores commodities. Processes are the core building blocks of the Reference Energy System.

## Process Types

TIMES supports several special process types, indicated by the `prc_map` set:

| Type | Description |
|------|-------------|
| **Standard (STD)** | Default: transforms input commodities into output commodities |
| **CHP** | Combined Heat and Power plants |
| **IRE** | Inter-regional exchange (trade) processes |
| **STG** | Storage processes (charge/discharge) |
| **NST** | Night storage devices |
| **DISC** | Discrete (lumpy) investment processes |

## Key Parameters

Each process is characterized by:
- **NCAP_COST:** Investment cost per unit of new capacity
- **NCAP_LIFE:** Technical lifetime
- **NCAP_TLIFE:** Economic lifetime (for annualizing investment)
- **NCAP_AF:** Availability factor
- **ACT_EFF / FLO_FUNC:** Efficiency and flow relationships
- **NCAP_BND:** Bounds on new capacity investment
- **ACT_BND:** Bounds on activity

## Primary Commodity Group (PCG)

Every process has a Primary Commodity Group that defines its activity. The activity variable (VAR_ACT) is the sum of flows in the PCG. For most processes, this is the main output.

## Sources

- [Part I, Ch.2: Basic Structure](../../raw/docs/part-1/02-basic-structure.md)
- [Part II, Ch.2: Sets](../../raw/docs/part-2/02-sets.md)
- [Part II, Ch.4: Special Processes](../../raw/docs/part-2/04-special-processes.md)
