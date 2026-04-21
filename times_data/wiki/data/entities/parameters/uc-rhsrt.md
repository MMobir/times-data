---
type: entity
title: "UC_RHSRT"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/uc-n, entities/parameters/uc-r-each, entities/parameters/uc-t-each, entities/parameters/uc-t-succ, entities/parameters/uc-ts-sum]
last_updated: 2026-04-11
---

# UC_RHSRT

**Category:** User Input
**Indexes:** r, uc_n, datayear, lim

## Description

RHS constant with bound type of bd (lim) of a user constraint.

## Details

Used in user constraints.

## Units and Defaults

None [open]; default value: none; Default i/e: MIG

## Related Parameters and Sets

- [uc_n](../parameters/uc-n.md)
- [uc_r_each](../parameters/uc-r-each.md)
- [uc_t_each](../parameters/uc-t-each.md)
- [uc_t_succ](../parameters/uc-t-succ.md)
- [uc_ts_sum](../parameters/uc-ts-sum.md)

## Affected Equations and Variables

RHS constant of user constraints, which are generated for each region (uc_r_each) and period (uc_t_each) and are summing over timeslices (uc_ts_sum) (EQ(l)_UCRT). If dynamic, constraints will be generated between two successive periods (EQ(l)_UCRSU).
