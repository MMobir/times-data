---
type: entity
title: "COM_BPRICE"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/com-elast, entities/parameters/com-step, entities/parameters/com-voc]
last_updated: 2026-04-11
---

# COM_BPRICE

**Category:** User Input
**Indexes:** r, t, c, s, cur

## Description

Base price of a demand commodity for the elastic demand formulation.

## Details

The control parameter $SET TIMESED ‘YES’ to activate elastic demands must be set.

## Units and Defaults

Monetary unit per commodity unit [open]; default value: none

## Related Parameters and Sets

- [COM_ELAST](../parameters/com-elast.md)
- [COM_STEP](../parameters/com-step.md)
- [COM_VOC](../parameters/com-voc.md)

## Affected Equations and Variables

Controls the inclusion of the elastic demand variable (VAR_ELAST) in the commodity balance equation(EQ(l)_COMBAL). Applied to the elastic demand variable (VAR_ELAST) in the objective function (EQ_OBJELS).
