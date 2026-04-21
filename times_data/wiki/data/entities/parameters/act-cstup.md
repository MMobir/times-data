---
type: entity
title: "ACT_CSTUP"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/act-minld, entities/parameters/act-ups]
last_updated: 2026-04-11
---

# ACT_CSTUP

**Category:** User Input
**Indexes:** r, datayear, p, tslvl, cur

## Description

Cost of process start-up per unit of started-up capacity. Added as an extra term to variable costs in the objective and reporting.

## Details

The tslvl level refers to the timeslice cycle for which the start-up cost is defined. Only applicable when the min. stable operating level has been defined with ACT_MINLD.

## Units and Defaults

Monetary unit per unit of capacity [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [ACT_MINLD](../parameters/act-minld.md)
- [ACT_UPS](../parameters/act-ups.md)

## Affected Equations and Variables

Activates generation of EQL_ACTUPS eqs. Generates an additional term in the variable operating costs included in EQ_OBJVAR.
