---
type: entity
title: "PRC_ACTFLO"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/prc-capact, entities/parameters/prc-actunt, entities/parameters/prc-spg, entities/parameters/rpc-aire]
last_updated: 2026-04-11
---

# PRC_ACTFLO

**Category:** User Input
**Indexes:** r, datayear, p, cg

## Description

1) Conversion factor from units of activity to units of those flow variables that define the activity (primary commodity group), or, 2) Conversion multiplier representing the amount of flow(s) in the cg per 1 unit of activity.

## Details

Only (rarely) provided when either the activity and flow variables of a process are in different units, or if there is a conversion efficiency between the activity and the flow(s) in the PCG. The group (cg) can be the whole PCG or any individual commodity in the PCG, or 'ACT' (=PCG).

## Units and Defaults

Commodity unit / activity unit (0,∞); default value: 1; Default i/e: STD

## Related Parameters and Sets

- [PRC_CAPACT](../parameters/prc-capact.md)
- [prc_actunt](../parameters/prc-actunt.md)
- [prc_spg](../parameters/prc-spg.md)
- [rpc_aire](../parameters/rpc-aire.md)

## Affected Equations and Variables

Applied to the primary commodity (prc_pcg) flow variables (VAR_FLO, VAR_IRE) to relate overall activity (VAR_ACT in EQ_ACTFLO). When the Reduction algorithm activated it is applied to the activity variable (VAR_ACT) in those cases where the flow variable (VAR_FLO) can be replaced by the activity variable (e.g. the activity is defined by one commodity flow).
