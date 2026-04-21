---
type: entity
title: "TL_SEG"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/alias-seg]
last_updated: 2026-04-11
---

# TL_SEG

**Category:** User Input
**Indexes:** r, teg

## Description

Number of segments.

## Details

Requires using ETL. For learning technologies teg when ETL is used.

## Units and Defaults

Integer [1-6]; default value: none

## Related Parameters and Sets

- [(Alias: SEG)](../parameters/alias-seg.md)

## Affected Equations and Variables

Influences the piecewise linear approximation of the cumulative cost curve (EQ_COS, EQ_LA1, EQ_LA2).
