---
type: entity
title: "NCAP_CPX"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/coef-cpt]
last_updated: 2026-04-11
---

# NCAP_CPX

**Category:** User Input
**Indexes:** r, datayear, prc

## Description

Defines a shape index for shaping the capacity transfer coefficients by the age of each process vintage. As a result, the capacity will have a survival rate as a function of age.

## Details

Provided when shaping based upon age is desired.

## Units and Defaults

Integer number; Default value: 0; Default extrapolation: MIG

## Related Parameters and Sets

- [COEF_CPT](../parameters/coef-cpt.md)

## Affected Equations and Variables

Impacts all calculations that are dependent upon the availability of capacity (VAR_NCAP), most directly the capacity transfer (EQ_CPT), and capacity availability equations (EQ(l)_CAPACT).
