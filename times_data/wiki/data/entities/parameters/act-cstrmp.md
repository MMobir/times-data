---
type: entity
title: "ACT_CSTRMP"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/act-ups]
last_updated: 2026-04-11
---

# ACT_CSTRMP

**Category:** User Input
**Indexes:** r, datayear, p, bd, cur

## Description

Defines ramp-up (L=UP) or ramp-down (L=LO) cost per unit of load change (in capacity units). For load-shifting processes defines the cost of shifting one unit of load by one hour, forward (UP) or backward (LO).

## Details

Can be used for standard processes in basic, advanced and discrete unit commitment extensions. Can also be used for load-shifting processes for defining the cost of shifting loads per unit of demand load by one hour.

## Units and Defaults

Currency unit per unit of capacity (change in load) [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [ACT_UPS](../parameters/act-ups.md)

## Affected Equations and Variables

Activates generation of EQ_ACTRMPC. Generates an additional term in EQ_OBJVAR for the increase in operating cost.
