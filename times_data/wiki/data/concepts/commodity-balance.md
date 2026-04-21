---
type: concept
title: "Commodity Balance"
aliases: []
tags: [core, equations]
sources:
  - raw/docs/part-1/05-times-optimisation.md
  - raw/docs/part-2/06-equations.md
related: []
last_updated: 2026-04-11
---

The commodity balance is one of the most fundamental constraints in TIMES. For each commodity, in each region and timeslice, the model ensures that total production equals or exceeds total consumption (or is exactly equal, depending on the commodity type).

## Balance Types

The balance type is controlled by the set `com_lim(r,c,lim)`:

| Type | Meaning |
|------|---------|
| **UP** | Production >= Consumption (default for NRG, DEM, ENV) |
| **LO** | Production <= Consumption |
| **FX** | Production = Consumption (default for MAT, FIN) |
| **N**  | No balance constraint |

## Mathematical Form

For a commodity `c` at timeslice `s` in period `t` and region `r`:

Sum of all production flows into `c` >= (or =, <=) Sum of all consumption flows out of `c`

This includes process flows (VAR_FLO), trade flows (VAR_IRE), and storage flows (VAR_SIN/VAR_SOUT).

## The Shadow Price

The dual variable (shadow price) of the commodity balance equation represents the **marginal cost** of that commodity -- the cost of supplying one additional unit. This is one of the most important model outputs for analysis.

## Sources

- [Part I, Ch.5: Optimization](../../raw/docs/part-1/05-times-optimisation.md)
- [Part II, Ch.6: Equations](../../raw/docs/part-2/06-equations.md) -- EQ_COMBAL
