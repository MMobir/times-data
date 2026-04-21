---
type: topic
title: "Stochastic Programming in TIMES"
aliases: []
tags: [advanced, uncertainty]
sources:
  - raw/docs/part-1/08-stochastic-programming.md
related: []
last_updated: 2026-04-11
---

# Stochastic Programming in TIMES

## Overview

The stochastic programming extension allows TIMES to make decisions under uncertainty. Instead of a single deterministic future, multiple scenarios (states of the world) are considered simultaneously with assigned probabilities.

## How It Works

1. Define a scenario tree with branching points and probabilities
2. Before each branching point, the model must make the same decisions (non-anticipativity)
3. After branching, different scenarios diverge and different decisions are allowed
4. The objective minimizes the expected total cost across all scenarios

## Key Concepts

- **Scenario tree:** Defines when and how uncertainty resolves
- **Non-anticipativity:** Decisions before a branching point must be the same across branches
- **EVPI (Expected Value of Perfect Information):** Measures the value of knowing the future
- **VSS (Value of Stochastic Solution):** Measures the value of the stochastic approach over deterministic

## When to Use

Stochastic programming is valuable when:
- Key uncertainties significantly affect optimal strategy
- Hedging strategies are of interest
- The cost of wrong decisions is high

## Sources

- [Part I, Ch.8: Stochastic Programming](../../raw/docs/part-1/08-stochastic-programming.md)
