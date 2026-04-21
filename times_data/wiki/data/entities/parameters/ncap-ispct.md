---
type: entity
title: "NCAP_ISPCT"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-isub, entities/parameters/obj-isub, entities/parameters/cst-invx]
last_updated: 2026-04-11
---

# NCAP_ISPCT

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Unit investment subsidy as a fraction of unit investment costs, in the same currency unit, per unit of new capacity.

## Details

Provided when defining an investment subsidy in proportion to the investment cost. Requires that NCAP_COST is defined.

## Units and Defaults

Decimal fraction (−∞,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [NCAP_ISUB](../parameters/ncap-isub.md)
- [OBJ_ISUB](../parameters/obj-isub.md)
- [CST_INVX](../parameters/cst-invx.md)

## Affected Equations and Variables

Applied to the investment variable (VAR_NCAP) when entering the objective function (EQ_OBJINV) with a minus sign.
