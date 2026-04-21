---
type: entity
title: "UC_RHS"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/uc-n, entities/parameters/uc-r-sum, entities/parameters/uc-t-sum, entities/parameters/uc-ts-sum]
last_updated: 2026-04-11
---

# UC_RHS

**Category:** User Input
**Indexes:** uc_n, lim

## Description

RHS constant with bound type of bd (lim) of a user constraint.

## Details

Used in user constraints.

## Units and Defaults

None [open]; default value: none; Default i/e: none

## Related Parameters and Sets

- [uc_n](../parameters/uc-n.md)
- [uc_r_sum](../parameters/uc-r-sum.md)
- [uc_t_sum](../parameters/uc-t-sum.md)
- [uc_ts_sum](../parameters/uc-ts-sum.md)

## Affected Equations and Variables

RHS (right-hand side) constant of a user constraint, which is summing over regions (uc_r_sum), periods (uc_t_sum) and timeslices (uc_ts_sum) (EQ(l)_UC).
