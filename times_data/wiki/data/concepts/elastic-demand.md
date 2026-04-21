---
type: concept
title: "Elastic Demand"
aliases: []
tags: [core, economics]
sources:
  - raw/docs/part-1/03-economic-rationale.md
  - raw/docs/part-1/04-times-math.md
related: []
last_updated: 2026-04-11
---

Elastic demand is a feature that allows TIMES to endogenously adjust energy service demands in response to price changes. When enabled, the model maximizes total surplus (consumer + producer) rather than minimizing cost.

## How It Works

1. The user specifies reference demands and own-price elasticities
2. TIMES constructs a demand curve for each energy service
3. The model finds the equilibrium where supply meets demand at the optimal price
4. Demands may increase or decrease compared to the reference, depending on costs

## Key Parameters

- `COM_ELAST(r,datayear,c,s,lim)`: Own-price elasticity of demand
- `COM_BPRICE(r,datayear,c,s,cur)`: Base price for the demand (reference scenario shadow price)
- `COM_VOC(r,datayear,c,bd)`: Variance of elastic demand (controls step function approximation)
- `COM_STEP(r,c,lim)`: Number of steps in demand curve linearization

## Mathematical Formulation

The demand curve is linearized into steps. Each step has a quantity and a willingness-to-pay price. The objective function includes lost consumer surplus when demand is reduced below the reference level.

## Practical Considerations

- Elastic demand requires first solving a fixed-demand run to obtain reference shadow prices
- Elasticities are typically in the range of -0.1 to -0.5 for energy services
- The number of steps (COM_STEP) affects accuracy vs. solution time

## Sources

- [Part I, Ch.3: Economic Rationale](../../raw/docs/part-1/03-economic-rationale.md)
- [Part I, Ch.4: Mathematics](../../raw/docs/part-1/04-times-math.md)
