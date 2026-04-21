---
type: entity
title: "NCAP_DLAG"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/coef-ocom, entities/parameters/dur-max, entities/parameters/obj-dlagcy]
last_updated: 2026-04-11
---

# NCAP_DLAG

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Number of years delay before decommissioning can begin after the lifetime of a technology has ended.

## Details

Provided when there is a lag in the decommissioning of a process (e.g., to allow the nuclear core to reduce its radiation).

## Units and Defaults

Years [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [COEF_OCOM](../parameters/coef-ocom.md)
- [DUR_MAX](../parameters/dur-max.md)
- [OBJ_DLAGCY](../parameters/obj-dlagcy.md)

## Affected Equations and Variables

Delay applied to a decommissioning flow (VAR_FLO) in the balance equation (EQ(l)_COMBAL) as production. Delay applied to the current capacity subject to decommissioning (VAR_NCAP+NCAP_PASTI) when entering the objective function components (EQ_OBJINV, EQ_OBJFIX, EQ_OBJSALV).
