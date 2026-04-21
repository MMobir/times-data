---
type: entity
title: "NCAP_ILED"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-icom, entities/parameters/ncap-cost, entities/parameters/coef-cpt, entities/parameters/coef-icom, entities/parameters/dur-max]
last_updated: 2026-04-11
---

# NCAP_ILED

**Category:** User Input
**Indexes:** r, t, p

## Description

Lead time between investment decision and actual availability of new capacity (= construction time).

## Details

Provided when there is a delay between when the investment decision occurs and when the capacity (new capacity or past investment) is initially available.

## Units and Defaults

Years [open]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [NCAP_ICOM](../parameters/ncap-icom.md)
- [NCAP_COST](../parameters/ncap-cost.md)
- [COEF_CPT](../parameters/coef-cpt.md)
- [COEF_ICOM](../parameters/coef-icom.md)
- [DUR_MAX](../parameters/dur-max.md)

## Affected Equations and Variables

Applied to the investment variable (VAR_NCAP) balance constraints (EQ(l)_COMBAL) as part of consumption, if there is an associated flow (NCAP_ICOM). Used as to distinguish between small and large investments (VAR_NCAP) and thus influences the way the investment and fixed costs are treated in the objective function (EQ_OBJINV, EQ_OBJFIX, EQ_OBJSALV).
