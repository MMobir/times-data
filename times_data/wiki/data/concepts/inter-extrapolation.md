---
type: concept
title: "Interpolation and Extrapolation"
aliases: []
tags: [core, data-handling]
sources:
  - raw/docs/part-2/01-introduction.md
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

TIMES provides flexible interpolation and extrapolation (i/e) options for parameter data. Since modelers specify data for specific years (datayears), the model needs rules for determining values in years between or beyond the data points.

## I/E Options

| Code | Meaning |
|------|---------|
| **0 (STD)** | Standard: interpolate between data points, no extrapolation |
| **1** | Interpolation + extrapolation: fill leading and trailing |
| **2** | Interpolation + extrapolation backward only |
| **3** | Interpolation + extrapolation forward only |
| **5** | Interpolation + extrapolation forward (same as 3 in most cases) |
| **10** | Stepped interpolation (use preceding value) |
| **11** | Same as 10 + fill values outside data range |
| **MIG** | Migration: no interpolation -- value must be provided for each period |
| **N/A** | Not applicable (parameter not interpolated) |

## How It Works

1. The user provides data for specific `datayear` values
2. For model periods without explicit data, TIMES applies the i/e option
3. Standard interpolation uses linear interpolation between adjacent data points
4. Extrapolation extends the first/last data point's value

## Default by Parameter

Each parameter has a default i/e setting documented in its specification. For example:
- `ACT_BND`: Default MIG (must specify each period)
- `ACT_COST`: Default STD (interpolated)
- `NCAP_COST`: Default STD

## Sources

- [Part II, Ch.1: Introduction](../../raw/docs/part-2/01-introduction.md)
- [Part II, Ch.3: Parameters](../../raw/docs/part-2/03-parameters.md)
