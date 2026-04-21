---
type: concept
title: "Time Periods and Years"
aliases: []
tags: [core, time]
sources:
  - raw/docs/part-1/02-basic-structure.md
  - raw/docs/part-2/01-introduction.md
related: []
last_updated: 2026-04-11
---

TIMES models operate over a multi-period time horizon. Each period represents a span of years during which all technology characteristics and commodity flows are assumed constant (or follow prescribed patterns).

## Key Concepts

- **Milestone years (t):** The representative years for each period. Model decisions are made at these points.
- **Period duration (D(t)):** The number of years each period spans. Periods can have different durations.
- **Data years (datayear):** Years for which the user provides input data. TIMES interpolates/extrapolates between them.
- **Past years (pastyear):** Years before the first model period, used to define existing capacity vintage structure.

## Inter-/Extrapolation

TIMES supports several interpolation/extrapolation (i/e) options for parameters between data years:
- **STD**: Standard interpolation between data points, no extrapolation
- **MIG**: Migration -- must be specified for each period
- **5**: Interpolation + forward extrapolation
- Various other options for stepped interpolation, etc.

The default i/e method varies by parameter and is documented in each parameter's specification.

## Discounting

Costs in different years are discounted to a common base year using a discount rate (specified by `G_DRATE`). This makes future costs comparable to present costs in the objective function.

## Sources

- [Part I, Ch.2: Basic Structure](../../raw/docs/part-1/02-basic-structure.md)
- [Part II, Ch.1: Introduction](../../raw/docs/part-2/01-introduction.md)
