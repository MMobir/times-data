---
type: entity
title: "G_CUREX"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/r-curex]
last_updated: 2026-04-11
---

# G_CUREX

**Category:** User Input
**Indexes:** cur1, cur2

## Description

Conversion factor from currency cur1 to currency cur2, with cur2 to be used in the objective function.

## Details

The target currency cur2 must have a discount rate defined with G_DRATE.

## Units and Defaults

Scalar (0,∞); Default value: none

## Related Parameters and Sets

- [R_CUREX](../parameters/r-curex.md)

## Affected Equations and Variables

Affects cost coefficients in EQ_OBJ
