---
type: entity
title: "UC_RHST"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/uc-n, entities/parameters/uc-r-sum, entities/parameters/uc-t-each, entities/parameters/uc-t-succ, entities/parameters/uc-ts-sum]
last_updated: 2026-04-11
---

# UC_RHST

**Category:** User Input
**Indexes:** uc_n, datayear, lim

## Description

RHS constant with bound type of bd (lim) of a user constraint.

## Details

Used in user constraints.

## Units and Defaults

None [open]; default value: none; Default i/e: MIG

## Related Parameters and Sets

- [uc_n](../parameters/uc-n.md)
- [uc_r_sum](../parameters/uc-r-sum.md)
- [uc_t_each](../parameters/uc-t-each.md)
- [uc_t_succ](../parameters/uc-t-succ.md)
- [uc_ts_sum](../parameters/uc-ts-sum.md)

## Affected Equations and Variables

RHS constant of user constraints, which are generated for each specified period (uc_t_each) and are summing over regions (uc_r_sum) and timeslices (uc_ts_sum) (EQ(l)_UCT). If dynamic, constraints will be generated between two successive periods (EQ(l)_UCSU).
