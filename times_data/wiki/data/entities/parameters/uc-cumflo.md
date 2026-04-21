---
type: entity
title: "UC_CUMFLO"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/flo-cum]
last_updated: 2026-04-11
---

# UC_CUMFLO

**Category:** User Input
**Indexes:** uc_n, r, p, c, y1, y2

## Description

Multiplier of cumulative process flow variable in user constraint.

## Details

Used in cumulative user constraints only.

## Units and Defaults

Dimensionless [open]; default value: none; I/e: N/A

## Related Parameters and Sets

- [FLO_CUM](../parameters/flo-cum.md)

## Affected Equations and Variables

EQ(l)_UC, EQ(l)_UCR, VAR_CUMFLO
