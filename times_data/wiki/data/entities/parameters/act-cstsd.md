---
type: entity
title: "ACT_CSTSD"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/act-cstup, entities/parameters/act-sdtime, entities/parameters/act-maxnon]
last_updated: 2026-04-11
---

# ACT_CSTSD

**Category:** User Input
**Indexes:** r, datayear, p, upt, bd, cur

## Description

Defines start-up (bd=UP) and shutdown costs (bd=LO) per unit of started-up capacity, differentiated by start-up type (upt). The start-up type of a power plant depends on its non-operational time after shut-down, as defined by using ACT_MAXNON.

## Details

Activates the advanced unit commitment option. In the case of the shut-down costs, only the tuple (upt, bd) = (HOT, LO) is a valid instance for this parameter. Requires the parameter ACT_MAXNON to be defined as well.

## Units and Defaults

Currency units per unit of started-up capacity [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [ACT_CSTUP](../parameters/act-cstup.md)
- [ACT_SDTIME](../parameters/act-sdtime.md)
- [ACT_MAXNON](../parameters/act-maxnon.md)

## Affected Equations and Variables

Generates an additional term in EQ_OBJVAR for the increase in operating cost.
