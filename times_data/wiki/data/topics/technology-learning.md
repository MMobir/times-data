---
type: topic
title: "Endogenous Technological Learning (ETL)"
aliases: []
tags: [advanced, mip]
sources:
  - raw/docs/part-1/11-tech-learning.md
  - raw/docs/part-2/09-etl/01-introduction.md
related: []
last_updated: 2026-04-11
---

# Endogenous Technological Learning (ETL)

## Overview

Endogenous Technological Learning (ETL) allows TIMES to model cost reductions that occur as cumulative experience with a technology grows. Instead of exogenously specifying future costs, costs decrease endogenously based on deployment.

## Learning Curve

The classic learning curve relates unit cost to cumulative production/capacity:

Cost(cumulative) = Cost_initial * (cumulative / initial)^(-learning_index)

The **learning rate** is the percentage cost reduction for each doubling of cumulative capacity. A 20% learning rate means costs drop to 80% of their previous level with each doubling.

## Key Parameters

- `CLUSTER(r,p,p_cluster)`: Groups technologies that share learning
- `PAT_GROW/PAT_DROP`: Learning curve parameters
- `SC0(r,p)`: Initial cumulative capacity
- `SEG(r,p)`: Number of segments for piecewise linear approximation

## Technical Details

ETL introduces non-convexity (the learning curve is concave), which requires MIP formulation. The learning curve is approximated by piecewise linear segments.

## Sources

- [Part I, Ch.11: Technological Learning](../../raw/docs/part-1/11-tech-learning.md)
