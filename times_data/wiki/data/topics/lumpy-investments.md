---
type: topic
title: "Lumpy (Discrete) Investments"
aliases: []
tags: [advanced, mip]
sources:
  - raw/docs/part-1/10-lumpy-investment.md
related: []
last_updated: 2026-04-11
---

# Lumpy (Discrete) Investments

## Overview

The lumpy investment extension allows TIMES to model discrete investment decisions -- where capacity can only be added in fixed-size units (e.g., a 1000 MW nuclear plant, not 523.7 MW).

## How It Works

When lumpy investments are enabled, some capacity variables become integer (or binary), turning the LP into a Mixed Integer Program (MIP).

## Key Parameters

- `NCAP_DISC(r,y,p,unit_size)`: Specifies that a process uses discrete investments and the unit size
- `NCAP_SEMI(r,y,p)`: Semi-continuous investment (either zero or above a minimum size)

## Practical Implications

- MIP models are much harder to solve than LP models
- Solution time increases significantly with the number of integer variables
- Use sparingly: only for technologies where lumpiness truly matters
- Consider using for large infrastructure (nuclear, LNG terminals, pipelines)

## Sources

- [Part I, Ch.10: Lumpy Investment](../../raw/docs/part-1/10-lumpy-investment.md)
