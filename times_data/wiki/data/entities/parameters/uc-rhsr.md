---
type: entity
title: "UC_RHSR"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/uc-n, entities/parameters/uc-r-each, entities/parameters/uc-t-sum, entities/parameters/uc-ts-sum]
last_updated: 2026-04-11
---

# UC_RHSR

**Category:** User Input
**Indexes:** r, uc_n, lim

## Description

RHS constant with bound type of bd (lim) of a user constraint.

## Details

Used in user constraints.

## Units and Defaults

None [open]; default value: none; Default i/e: none

## Related Parameters and Sets

- [uc_n](../parameters/uc-n.md)
- [uc_r_each](../parameters/uc-r-each.md)
- [uc_t_sum](../parameters/uc-t-sum.md)
- [uc_ts_sum](../parameters/uc-ts-sum.md)

## Affected Equations and Variables

RHS constant of user constraints, which are generated for each region (uc_r_each) and are summing over periods (uc_t_sum) and timeslices (uc_ts_sum) (EQ(l)_UCR).
