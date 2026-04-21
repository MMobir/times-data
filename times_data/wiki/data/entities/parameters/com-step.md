---
type: entity
title: "COM_STEP"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/com-bprice, entities/parameters/com-elast]
last_updated: 2026-04-11
---

# COM_STEP

**Category:** User Input
**Indexes:** r, c, bd

## Description

Number of steps to use for the approximation of change of producer/consumer surplus when using the linearized elastic demand formulations.

## Details

The control parameter $SET TIMESED ‘YES’ must be set.

## Units and Defaults

Integer number [1,∞); default value: none; Default i/e: N/A

## Related Parameters and Sets

- [COM_BPRICE](../parameters/com-bprice.md)
- [COM_ELAST](../parameters/com-elast.md)

## Affected Equations and Variables

Controls the instance of the elastic demand variable (VAR_ELAST).
