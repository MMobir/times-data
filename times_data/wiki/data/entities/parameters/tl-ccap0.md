---
type: entity
title: "TL_CCAP0"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/alias-ccap0, entities/parameters/pat, entities/parameters/ccost0]
last_updated: 2026-04-11
---

# TL_CCAP0

**Category:** User Input
**Indexes:** r, teg

## Description

Initial cumulative capacity of a learning technology.

## Details

Requires using ETL. For learning technologies teg when ETL is used.

## Units and Defaults

Capacity unit [open]; default value: none

## Related Parameters and Sets

- [(Alias: CCAP0)](../parameters/alias-ccap0.md)
- [PAT](../parameters/pat.md)
- [CCOST0](../parameters/ccost0.md)

## Affected Equations and Variables

Cumulative investment constraint (EQ_CUINV) and cumulative capacity variable (VAR_CCAP) in endogenous technological learning formulation.
