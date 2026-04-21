---
type: entity
title: "ACT_LOSPL"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/act-minld, entities/parameters/act-cstpl]
last_updated: 2026-04-11
---

# ACT_LOSPL

**Category:** User Input
**Indexes:** r, datayear, p, bd

## Description

Partial load efficiency parameters. 1) (bd='FX'): Proportional increase in specific fuel consumption at minimum operating level 2) (bd='LO'): Minimum operating level of partial load operation 3) (bd='UP'): Fraction of feasible load range above the minimum operating level, below which the efficiency losses are assumed to occur.

## Details

Endogenous partial load modeling can only be used for processes that have their efficiency modelled by the ACT_EFF parameter, which must be defined on the shadow side of the process. For other processes, the ACT_CSTPL parameter can be used for modeling a cost penalty at partial loads.

## Units and Defaults

Decimal fraction [0,∞); default values: FX: none, LO: default value is ACT_MINLD or 0.1 if that is not defined, UP: 0.6; Default i/e: STD

## Related Parameters and Sets

- [ACT_MINLD](../parameters/act-minld.md)
- [ACT_CSTPL](../parameters/act-cstpl.md)

## Affected Equations and Variables

Generates instances of the partial load efficiency constraint EQ_ACTPL.
