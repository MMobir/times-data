---
type: entity
title: "G_ILEDNO"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-iled]
last_updated: 2026-04-11
---

# G_ILEDNO

**Category:** User Input
**Indexes:** 

## Description

If the ratio of lead-time (NCAP_ILED) to the period duration (D) is below this threshold then the lead-time consideration will be ignored in the objective function

## Details

Only provided when the costs associated with the lead-time for new capacity (NCAP_ILED) are not to be included in the objective function. Not taken into account if the OBLONG switch or any alternative objective formulation is used.

## Units and Defaults

Decimal fraction [0,1]; default value: 0.1

## Related Parameters and Sets

- [NCAP_ILED](../parameters/ncap-iled.md)

## Affected Equations and Variables

Prevents the investment costs associated with investment lead-times from energy the investment component of the objective function (EQ_OBJINV).
