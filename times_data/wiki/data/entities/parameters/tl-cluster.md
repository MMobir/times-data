---
type: entity
title: "TL_CLUSTER"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/alias-cluster, entities/parameters/tl-mrclust]
last_updated: 2026-04-11
---

# TL_CLUSTER

**Category:** User Input
**Indexes:** r, teg, prc

## Description

Indicator that a technology (teg) is a learning component that is part of another technology (prc) in region r; teg is also called key component.

## Details

Requires using ETL (MIP). Provided to model clustered endogenous technology learning. Each of the learning parameters must also be specified for the key learning technology.

## Units and Defaults

Decimal fraction [0-1]; default value: none

## Related Parameters and Sets

- [(Alias: CLUSTER)](../parameters/alias-cluster.md)
- [TL_MRCLUST](../parameters/tl-mrclust.md)

## Affected Equations and Variables

EQ_CLU
