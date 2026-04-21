---
type: entity
title: "COM_ELASTX"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/com-elast]
last_updated: 2026-04-11
---

# COM_ELASTX

**Category:** User Input
**Indexes:** r, datayear, c, bd

## Description

Shape index for the elasticity of demand

## Details

Provided when shaping of elasticity based upon demand level is desired. Note: Shape index 1 is reserved for constant 1.

## Units and Defaults

Integer scalar [1,999]; default value: none; Default i/e: MIG

## Related Parameters and Sets

- [COM_ELAST](../parameters/com-elast.md)

## Affected Equations and Variables

Affects the demand elasticities applied in EQ_OBJELS
