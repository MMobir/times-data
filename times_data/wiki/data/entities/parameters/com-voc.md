---
type: entity
title: "COM_VOC"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/com-bprice, entities/parameters/com-step, entities/parameters/com-elast]
last_updated: 2026-04-11
---

# COM_VOC

**Category:** User Input
**Indexes:** r, datayear, c, bd

## Description

Possible variation of demand in both directions when using the elastic demand formulation.

## Details

The control parameter $SET TIMESED ‘YES’ to be set to activate elastic demands must be set. A number is required for each direction the demand is permitted to move. The index bd = LO corresponds to the direction of decreasing the demand, while bd = UP denotes the direction for demand increase. A different value may be provided for each direction, thus curves may be asymmetric.

## Units and Defaults

Dimensionless [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [COM_BPRICE](../parameters/com-bprice.md)
- [COM_STEP](../parameters/com-step.md)
- [COM_ELAST](../parameters/com-elast.md)

## Affected Equations and Variables

Applied when setting the bound of an elastic demand step (VAR_ELAST). Applied to the elasticity variable in the objective function costs (EQ_OBJELS).
