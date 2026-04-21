---
type: entity
title: "FLO_SUM"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/flo-func, entities/parameters/flo-funcx, entities/parameters/coef-ptrans, entities/parameters/fs-emis, entities/parameters/rpc-emis, entities/parameters/rpc-ffunc, entities/parameters/rpcg-ptran]
last_updated: 2026-04-11
---

# FLO_SUM

**Category:** User Input
**Indexes:** r, datayear, p, cg1, c, cg2, s

## Description

Multiplier applied for commodity c of group cg1 corresponding to the flow rate based upon the sum of individual flows defined by the commodity group cg2 of process p. Most often used to define the emission rate, or to adjust the overall efficiency of a technology based upon fuel consumed.

## Details

If a FLO_SUM is specified and no corresponding FLO_FUNC, the FLO_FUNC is set to 1. If FLO_FUNC is specified for a true commodity group cg1, and no FLO_SUM is specified for the commodities in cg1, these FLO_SUM are set to 1. The derived parameter COEF_PTRANS is inherited/aggregated to the timeslice level of the flow variable of the commodity c.

## Units and Defaults

Commodity unit of cg2/commodity unit of c [open]; default value: see details; Default i/e: STD

## Related Parameters and Sets

- [FLO_FUNC](../parameters/flo-func.md)
- [FLO_FUNCX](../parameters/flo-funcx.md)
- [COEF_PTRANS](../parameters/coef-ptrans.md)
- [fs_emis](../parameters/fs-emis.md)
- [rpc_emis](../parameters/rpc-emis.md)
- [rpc_ffunc](../parameters/rpc-ffunc.md)
- [rpcg_ptran](../parameters/rpcg-ptran.md)

## Affected Equations and Variables

The FLO_SUM multiplier is applied along with FLO_FUNC parameter in the transformation coefficient (COEF_PTRANS), which is applied to the flow variable (VAR_FLO) in the transformation equation (EQ_PTRANS).
