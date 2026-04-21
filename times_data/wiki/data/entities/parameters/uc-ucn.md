---
type: entity
title: "UC_UCN"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/uc-rhsrt]
last_updated: 2026-04-11
---

# UC_UCN

**Category:** User Input
**Indexes:** uc_n, side, r, datayear, ucn

## Description

Multiplier of user constraint variable in another user constraint.

## Details

Only taken into account if the user constraint is by region & period, and summing over timeslices and the RHS side is activated (EQ(l)_UCRSU).

## Units and Defaults

Dimensionless [open]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [UC_RHSRT](../parameters/uc-rhsrt.md)

## Affected Equations and Variables

EQ(l)_UCRSU, VAR_UCRT
