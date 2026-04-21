---
type: concept
title: "Objective Function"
aliases: []
tags: [core, optimization]
sources:
  - raw/docs/part-1/03-economic-rationale.md
  - raw/docs/part-1/05-times-optimisation.md
related: []
last_updated: 2026-04-11
---

The objective function is what TIMES minimizes (or maximizes total surplus). It represents the total discounted system cost over the entire model horizon across all regions.

## Cost Components

The objective function includes:

1. **Investment costs (INVCOST):** Capital costs for new capacity, annualized over the technology's economic lifetime
2. **Fixed O&M costs (FIXOM):** Annual costs proportional to installed capacity
3. **Variable O&M costs (VAROM/ACT_COST):** Costs proportional to activity or commodity flows
4. **Fuel/commodity costs:** Costs of primary resource extraction and commodity purchases
5. **Taxes and subsidies:** On investments, fixed costs, or commodity flows
6. **Salvage value:** Credit for remaining lifetime of investments beyond the model horizon (subtracted)
7. **Elastic demand loss:** When demand is elastic, lost consumer/producer surplus

## Discounting

All costs are discounted to a base year using the general discount rate `G_DRATE(r,y)`. Technology-specific discount rates can be used via `NCAP_DRATE` to represent different hurdle rates for different sectors.

## The Surplus Interpretation

When demands are price-elastic, TIMES maximizes total surplus (consumer surplus + producer surplus) rather than minimizing cost. This is equivalent to finding the competitive equilibrium.

## Sources

- [Part I, Ch.3: Economic Rationale](../../raw/docs/part-1/03-economic-rationale.md)
- [Part I, Ch.5: Optimization](../../raw/docs/part-1/05-times-optimisation.md)
- [Part II, Ch.6: Equations](../../raw/docs/part-2/06-equations.md) -- EQ_OBJ*
