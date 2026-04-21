---
type: entity
title: "NCAP_VALU"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-ocom]
last_updated: 2026-04-11
---

# NCAP_VALU

**Category:** User Input
**Indexes:** r, datayear, p, c, cur

## Description

Value of a commodity released at decommissioning (NCAP_OCOM).

## Details

Provided when a released commodity has a value.

## Units and Defaults

Monetary unit / commodity unit [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [NCAP_OCOM](../parameters/ncap-ocom.md)

## Affected Equations and Variables

Applied to the investment related (VAR_NCAP, NCAP_PASTI) release flow at decommissioning in the objective function (EQ_OBJSALV).
