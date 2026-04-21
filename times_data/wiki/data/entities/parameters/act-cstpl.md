---
type: entity
title: "ACT_CSTPL"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/act-minld, entities/parameters/act-lospl]
last_updated: 2026-04-11
---

# ACT_CSTPL

**Category:** User Input
**Indexes:** r, datayear, p, cur

## Description

Partial load cost penalty, defined as an additional cost per activity at the minimum operating level, corresponding to the efficiency loss at that load level. Added as an extra term to variable costs in the objective and reporting.

## Details

Used as an alternative or supplement to using ACT_LOSPL(r,y,p,'FX'). When used as an alternative, the fuel increase at the minimum operating level that should be included in the cost penalty must be embedded in the ACT_CSTPL coefficient.

## Units and Defaults

Monetary unit per unit of activity [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [ACT_MINLD](../parameters/act-minld.md)
- [ACT_LOSPL](../parameters/act-lospl.md)

## Affected Equations and Variables

Generates an additional term in EQ_OBJVAR for the increase in operating cost.
