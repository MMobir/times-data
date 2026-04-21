---
type: entity
title: "UC_CUMACT"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/act-cum]
last_updated: 2026-04-11
---

# UC_CUMACT

**Category:** User Input
**Indexes:** uc_n, r, p, y1, y2

## Description

Multiplier of cumulative process activity variable in user constraint.

## Details

Used in cumulative user constraints only.

## Units and Defaults

Dimensionless [open]; default value: none; I/e: N/A

## Related Parameters and Sets

- [ACT_CUM](../parameters/act-cum.md)

## Affected Equations and Variables

EQ(l)_UC, EQ(l)_UCR, VAR_CUMFLO
