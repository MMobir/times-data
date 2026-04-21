---
type: entity
title: "IRE_FLOSUM"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/top-ire]
last_updated: 2026-04-11
---

# IRE_FLOSUM

**Category:** User Input
**Indexes:** r, datayear, p, c1, s, ie, c2, io

## Description

Auxiliary consumption (io = IN, owing to the commodity entering the process) or production/ emission (io = OUT, owing to the commodity leaving the process) of commodity c2 due to the IMPort / EXPort (index ie) of the commodity c1 in region r

## Details

Only applicable for inter-regional exchange processes (IRE). Since the efficiency IRE_FLO can only be used for exchange between internal regions, IRE_FLOSUM may be used to define an efficiency for an import/export with an external region by specifying the same commodity for c1 and c2 and the value 1-efficiency as auxiliary consumption. Direct inheritance. Weighted aggregation.

## Units and Defaults

Commodity unit c2/commodity unit c1 [open]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [top_ire](../parameters/top-ire.md)

## Affected Equations and Variables

The multiplier is applied to the flow variable (VAR_IRE) associated with an inter-regional exchange in the commodity balance constraint (EQ(l)_COMBAL). If a flow share (FLO_SHAR) is provided for an inter-regional exchange process then the multiplier is applied to the flow variable (VAR_IRE) in the share constraint (EQ(l)_IN/OUTSHR). If a cost is provided for the flow (FLO_COST or FLO_DELIV) then the factor is applied to the flow variable (VAR_IRE) in the variable component of the objective function (EQ_OBJVAR).
