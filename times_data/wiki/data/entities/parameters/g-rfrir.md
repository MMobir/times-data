---
type: entity
title: "G_RFRIR"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/g-drate, entities/parameters/ncap-drate, entities/parameters/cor-salvi, entities/parameters/cor-salvd]
last_updated: 2026-04-11
---

# G_RFRIR

**Category:** User Input
**Indexes:** r, allyear

## Description

Risk-free real interest rate in region r for each time-period. Provides the reference rate for NCAP_DRATE, such that the risk premium will be calculated against the risk-free rate.

## Details

Optional parameter. If value is not provided, G_DRATE is assumed as the risk-free rate. By providing G_RFRIR, the technology-specific risk premiums can be kept unchanged over any sensitivity analyses with different G_DRATE values.

## Units and Defaults

Decimal fraction (0,1]; default value = none; Default i/e: STD

## Related Parameters and Sets

- [G_DRATE](../parameters/g-drate.md)
- [NCAP_DRATE](../parameters/ncap-drate.md)
- [COR_SALVI](../parameters/cor-salvi.md)
- [COR_SALVD](../parameters/cor-salvd.md)

## Affected Equations and Variables

The rate is taken into consideration when constructing the objective function coefficients for investment costs. EQ_OBJINV, EQ_OBJSALV
