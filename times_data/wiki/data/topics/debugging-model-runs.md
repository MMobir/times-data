---
type: topic
title: "Debugging TIMES Model Runs"
aliases: []
tags: [practical, troubleshooting]
sources:
  - raw/docs/part-3/02-model-run.md
  - raw/docs/part-3/03-switches.md
related: []
last_updated: 2026-04-11
---

# Debugging TIMES Model Runs

## Overview

When a TIMES model fails to solve or produces unexpected results, systematic debugging is essential. This page covers common errors, diagnostic approaches, and GAMS-level troubleshooting.

## Common Error Types

### Infeasible Model
The model has no solution satisfying all constraints.
- **Check:** Are demands feasible given available capacity and resources?
- **Check:** Are bounds too tight (ACT_BND, FLO_BND, CAP_BND)?
- **Check:** Are there missing supply technologies for required commodities?
- **Diagnostic:** Use IER (infeasibility relaxation) to identify binding constraints

### Unbounded Model
The model has no finite minimum cost.
- Usually indicates a missing cost or a negative cost cycle
- Check for processes with negative costs and no bounds

### Domain Violations
GAMS compilation errors due to data referencing undefined set elements.
- Check that all referenced processes and commodities are properly defined
- Look for typos in process/commodity names

## GAMS Log Analysis

The GAMS log file (*.lst) contains:
1. Compilation messages (syntax errors, domain violations)
2. Execution messages (data issues)
3. Solver status and solution summary
4. Equation listing (for debugging specific constraints)

## Useful Switches

- `SOLPRINT=YES`: Print solution values in LST file
- `LIMROW/LIMCOL`: Control equation/variable listing detail
- `DEBUG`: Enable additional TIMES diagnostic output

## Sources

- [Part III, Ch.2: Model Run Process](../../raw/docs/part-3/02-model-run.md)
- [Part III, Ch.3: Switches](../../raw/docs/part-3/03-switches.md)
