---
type: entity
title: "TL_MRCLUST"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/tl-cluster]
last_updated: 2026-04-11
---

# TL_MRCLUST

**Category:** User Input
**Indexes:** r, teg, reg, p

## Description

Mapping for multi-region clustering between learning key components (teg) and processes (p) that utilize the key component.

## Details

Requires using ETL (MIP).

## Units and Defaults

Decimal fraction [0-1]; default value: none

## Related Parameters and Sets

- [TL_CLUSTER](../parameters/tl-cluster.md)

## Affected Equations and Variables

EQ_MRCLU
