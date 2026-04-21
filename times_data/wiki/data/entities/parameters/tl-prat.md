---
type: entity
title: "TL_PRAT"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/alias-prat, entities/parameters/alph, entities/parameters/beta, entities/parameters/ccapk, entities/parameters/ccost0, entities/parameters/pat, entities/parameters/pbt]
last_updated: 2026-04-11
---

# TL_PRAT

**Category:** User Input
**Indexes:** r, teg

## Description

Progress ratio indicating the drop in the investment cost each time there is a doubling of the installed capacity.

## Details

Requires using ETL. Provided for learning technologies (teg) when ETL is used.

## Units and Defaults

Scalar [0,1]; default value none

## Related Parameters and Sets

- [(Alias: PRAT)](../parameters/alias-prat.md)
- [ALPH](../parameters/alph.md)
- [BETA](../parameters/beta.md)
- [CCAPK](../parameters/ccapk.md)
- [CCOST0](../parameters/ccost0.md)
- [PAT](../parameters/pat.md)
- [PBT](../parameters/pbt.md)

## Affected Equations and Variables

Fundamental factor to describe the learning curve and thus effects nearly all equations and variables related to endogenous technology learning (ETL).
