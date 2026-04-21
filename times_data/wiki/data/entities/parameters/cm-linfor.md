---
type: entity
title: "CM_LINFOR"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# CM_LINFOR

**Category:** User Input
**Indexes:** datayear, item, lim

## Description

Parameters of linearized forcing functions

## Details

With lim types LO/UP, CO2 forcing function can be automatically linearized between the concentration levels given. For CH4 and N2O, lim types FX/N must be used (N=concentration multiplier, FX=constant term). See Appendix on Climate Module for details.

## Units and Defaults

Forcing unit per concentration unit [open]; default value: none

## Related Parameters and Sets

None documented.

## Affected Equations and Variables

EQ_CLITOT
