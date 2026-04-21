---
type: entity
title: "FLO_EFF"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/flo-emis, entities/parameters/prc-actflo]
last_updated: 2026-04-11
---

# FLO_EFF

**Category:** User Input
**Indexes:** r, datayear, p, cg, c, s

## Description

Defines the amount of commodity flow of commodity (c) per unit of other process flow(s) or activity (cg).

## Details

Inherited/aggregated to the timeslice levels of the flow variables of the commodities in group cg. All parameters with the same process (p) and target commodity (c) are combined in the same transformation equation. By using cg='ACT', the attribute will be defined per unit of activity, by applying it on all PCG flows with the value divided by any user-defined PRC_ACTFLO. FLO_EFF defined for an individual flow will override any value for a group.

## Units and Defaults

Commodity unit of c / commodity unit of cg [open]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [FLO_EMIS](../parameters/flo-emis.md)
- [PRC_ACTFLO](../parameters/prc-actflo.md)

## Affected Equations and Variables

Generates process transformation equation (EQ_PTRANS) between one or more input (or output) commodities and one output (or input) commodities.
