---
type: entity
title: "NCAP_TLIFE"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-elife, entities/parameters/coef-cpt, entities/parameters/coef-rpti, entities/parameters/dur-max]
last_updated: 2026-04-11
---

# NCAP_TLIFE

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Technical lifetime of a process.

## Details

Expected for all technologies that have investment costs. Values below 0.5 cannot be well accounted in the objective function, and should thus be avoided (they are automatically resetted to 1).

## Units and Defaults

Years (0,∞); default value: G_TLIFE; Default i/e: STD

## Related Parameters and Sets

- [NCAP_ELIFE](../parameters/ncap-elife.md)
- [COEF_CPT](../parameters/coef-cpt.md)
- [COEF_RPTI](../parameters/coef-rpti.md)
- [DUR_MAX](../parameters/dur-max.md)

## Affected Equations and Variables

Impacts all calculations that are dependent upon the availability of investments (VAR_NCAP) including capacity transfer (EQ_CPT), commodity flow (EQ(l)_COMBAL), costs (EQ_OBJINV, EQ_OBJFIX, EQ_OBJVAR, EQ_OBJSALV).
