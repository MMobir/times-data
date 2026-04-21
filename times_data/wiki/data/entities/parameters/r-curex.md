---
type: entity
title: "R_CUREX"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/g-curex]
last_updated: 2026-04-11
---

# R_CUREX

**Category:** User Input
**Indexes:** r, cur1, cur2

## Description

Conversion factor from currency cur1 to currency cur2 in region r, in order to use cur2 in the objective function.

## Details

The target currency cur2 must have a discount rate defined with G_DRATE.

## Units and Defaults

Scalar (0,∞); Default value: none

## Related Parameters and Sets

- [G_CUREX](../parameters/g-curex.md)

## Affected Equations and Variables

Affects cost coefficients in EQ_OBJ
