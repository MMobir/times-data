---
type: entity
title: "NCAP_CEH"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-chpr, entities/parameters/act-eff]
last_updated: 2026-04-11
---

# NCAP_CEH

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Coefficient of electricity to heat along the iso-fuel line in a pass-out CHP technology.

## Details

The parameter is only taken into account when the process is defined to be of type CHP.

## Units and Defaults

Decimal fraction [–1,∞]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [NCAP_CHPR](../parameters/ncap-chpr.md)
- [ACT_EFF](../parameters/act-eff.md)

## Affected Equations and Variables

Process transformation equation, either EQE_ACTEFF or EQ_PTRANS
