---
type: entity
title: "FLO_SHAR"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# FLO_SHAR

**Category:** User Input
**Indexes:** r, datayear, p, c, cg, s, bd

## Description

Share of flow commodity c based upon the sum of individual flows defined by the commodity group cg belonging to process p.

## Details

Direct inheritance. Weighted aggregation. A common example of using FLO_SHAR is to specify the power-to-heat ratio of CHP plants in the backpressure point. For example, for a heat output of a CHP technology, the FLO_SHAR parameter would have the value CHPR/(1+CHPR), with CHPR being the heat-to-power ratio.

## Units and Defaults

Decimal fraction [0,1]; default value: none; Default i/e: MIG over milestoneyears, STD over pastyears

## Related Parameters and Sets

None documented.

## Affected Equations and Variables

When the commodity is an input an EQ(l)_INSHR equation is generated. When the commodity is an output an EQ(l)_OUTSHR equation is generated.
