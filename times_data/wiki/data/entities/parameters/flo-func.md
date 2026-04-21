---
type: entity
title: "FLO_FUNC"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/flo-sum, entities/parameters/flo-funcx, entities/parameters/coef-ptran, entities/parameters/rpc-ffunc, entities/parameters/rpcg-ptran]
last_updated: 2026-04-11
---

# FLO_FUNC

**Category:** User Input
**Indexes:** r, datayear, p, cg1, cg2, s

## Description

A key parameter describing the basic operation of or within a process. Sets the ratio between the sum of flows in commodity group cg2 to the sum of flows in commodity group cg1, thereby defining the efficiency of producing cg2 from cg1 (subject to any FLO_SUM). cg1 and cg2 may be also single commodities.

## Details

If for the same indexes the parameter FLO_SUM is specified but no FLO_FUNC, the FLO_FUNC is set to 1. Important factor in determining the level at which a process operates in that the derived transformation parameter (COEF_PTRAN) is inherited/aggregated to the timeslice levels of the flow variables associated with the commodities in the group cg1.

## Units and Defaults

Commodity unit of cg2/commodity unit of cg1 [open]; default value: see details; Default i/e: STD

## Related Parameters and Sets

- [FLO_SUM](../parameters/flo-sum.md)
- [FLO_FUNCX](../parameters/flo-funcx.md)
- [COEF_PTRAN](../parameters/coef-ptran.md)
- [rpc_ffunc](../parameters/rpc-ffunc.md)
- [rpcg_ptran](../parameters/rpcg-ptran.md)

## Affected Equations and Variables

Establishes the basic transformation relationship (EQ_PTRANS) between one or more input (or output) commodities and one or more output (or input) commodities. Establishes the relationship between storage charging / discharging and a related commodity flow (VAR_FLO) in the auxiliary storage flow equation (EQ_STGAUX).

## Usage Notes

- In VDA mode (`$SET VDA YES`), TIMES auto-derives flow relationships from process topology (the TOP set). You do NOT need to explicitly define FLO_FUNC for simple processes with a single input and output.
- The official DemoS_012 model does not use FLO_FUNC at all. It relies on VDA mode and uses PRC_ACTFLO for activity-flow conversion where needed.
- FLO_FUNC has 6 indexes (r, datayear, p, cg1, cg2, s). Using fewer indexes causes GAMS Error 148 (dimension mismatch).
- For simple conversion processes, the topology alone is sufficient. Only use FLO_FUNC when you need non-default conversion ratios between commodity groups.
