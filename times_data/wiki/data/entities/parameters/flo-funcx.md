---
type: entity
title: "FLO_FUNCX"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/flo-func, entities/parameters/flo-sum, entities/parameters/coef-ptran]
last_updated: 2026-04-11
---

# FLO_FUNCX

**Category:** User Input
**Indexes:** r, datayear, p, cg1, cg2

## Description

Age-based shaping curve (SHAPE) to be applied to the flow parameters (ACT_EFF/ACT_FLO/ FLO_FUNC/FLO_SUM/ FLO_EMIS/FLO_EFF/ NCAP_COM)

## Details

Provided when shaping based upon age is desired. Vintaged processes only (or for NCAP_COM flows). Note: Shape index 1 is reserved for constant 1. ACT_EFF(cg): cg1=cg, cg2='ACT'; ACT_FLO(cg): cg1='ACT', cg2=cg; FLO_EMIS(cg,c): cg1=cg2=c; FLO_EFF(cg,c): cg1=cg2=c; FLO_FUNC(cg1,cg2): cgN=cgN; NCAP_COM(com): cg1='CAPFLO', cg2=com

## Units and Defaults

Integer scalar [1,999]; default value: none; Default extrapolation: MIG

## Related Parameters and Sets

- [FLO_FUNC](../parameters/flo-func.md)
- [FLO_SUM](../parameters/flo-sum.md)
- [COEF_PTRAN](../parameters/coef-ptran.md)

## Affected Equations and Variables

Applied to the flow variable (VAR_FLO) in a transformation equation (EQ_PTRANS / EQE_ACTEFF) to account for changes in the transformation efficiency according to the age of each process vintage.
