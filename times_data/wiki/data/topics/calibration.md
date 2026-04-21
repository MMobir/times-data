---
type: topic
title: "Model Calibration"
aliases: []
tags: [methodology, practical]
sources:
  - raw/docs/part-4/03-demos-models.md
related: []
last_updated: 2026-04-11
---

# Model Calibration

## Overview

Calibration is the process of aligning a TIMES model with historical data for a base year. A well-calibrated model reproduces observed energy balances, installed capacities, and emissions for the base year.

## Steps for Calibration

1. **Set base year demands:** Match observed energy service consumption
2. **Define existing capacity (STOCK):** Use residual capacity (`NCAP_PASTI`) to represent installed equipment
3. **Fix base year activity:** Use `ACT_BND` or `FLO_BND` with 'FX' to fix flows to observed values
4. **Verify commodity balances:** Check that base year production and consumption match statistics
5. **Validate emissions:** Compare model emissions with inventory data

## Key Parameters for Calibration

- `NCAP_PASTI(r,v,p)`: Past investments (existing capacity by vintage)
- `NCAP_TLIFE`: Technical lifetime of existing capacity
- `COM_PROJ(r,y,c)`: Demand projections
- `ACT_BND(r,y,p,s,'FX')`: Fix activity in base year

## Common Pitfalls

- Mismatched energy balances due to conversion factor errors
- Existing capacity with wrong vintage year assignments
- Missing technologies in the base year RES
- Ignoring seasonal patterns in the base year

## Sources

- [Part IV, Ch.3: Demo Models](../../raw/docs/part-4/03-demos-models.md)
