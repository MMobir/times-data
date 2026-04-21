---
type: entity
title: "NCAP_DRATE"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/g-drate, entities/parameters/cor-salvi, entities/parameters/cor-salvd]
last_updated: 2026-04-11
---

# NCAP_DRATE

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Technology specific discount rate.

## Details

Provided if the cost of borrowing for a process is different from the standard discount rate.

## Units and Defaults

Percent (0,∞); default value: G_DRATE; Default i/e: STD

## Related Parameters and Sets

- [G_DRATE](../parameters/g-drate.md)
- [COR_SALVI](../parameters/cor-salvi.md)
- [COR_SALVD](../parameters/cor-salvd.md)

## Affected Equations and Variables

Discount rate applied to investments (VAR_NCAP+NCAP_PASTI) when entering the objective function components (EQ_OBJINV, EQ_OBJSALV).
