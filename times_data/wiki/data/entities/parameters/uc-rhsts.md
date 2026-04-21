---
type: entity
title: "UC_RHSTS"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/uc-n, entities/parameters/uc-r-sum, entities/parameters/uc-t-each, entities/parameters/uc-t-succ, entities/parameters/uc-ts-each]
last_updated: 2026-04-11
---

# UC_RHSTS

**Category:** User Input
**Indexes:** uc_n, datayear, s, lim

## Description

RHS constant with bound type of bd (lim) of a user constraint.

## Details

Used in user constraints. No inheritance/aggregation. Binding user constraints are defined using bound types lim=UP/LO/FX. Non-binding (free) user constraints can be defined using the lim type lim=N.

## Units and Defaults

None [open]; default value: none; Default i/e: MIG

## Related Parameters and Sets

- [uc_n](../parameters/uc-n.md)
- [uc_r_sum](../parameters/uc-r-sum.md)
- [uc_t_each](../parameters/uc-t-each.md)
- [uc_t_succ](../parameters/uc-t-succ.md)
- [uc_ts_each](../parameters/uc-ts-each.md)

## Affected Equations and Variables

RHS constant of user constraints, which are generated for each period (uc_t_each) and timeslice (uc_ts_each) and are summing over regions (uc_r_sum) (EQ(l)_UCTS). If dynamic, constraints will be generated between two successive periods (EQ(l)_UCSUS).
