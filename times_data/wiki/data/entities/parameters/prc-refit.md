---
type: entity
title: "PRC_REFIT"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/prc-rcap]
last_updated: 2026-04-11
---

# PRC_REFIT

**Category:** User Input
**Indexes:** r, prc, p

## Description

Defines a mapping of host process prc to a retrofit or lifetime extension option p in region r, where p is another process representing the refurbishment option. The value of the parameter determines the type of the refurbishment option (see column on the left).

## Details

Requires that early retirements are allowed in the model. The parameter value determines the type of the refurbishment option

## Units and Defaults

Dimensionless [–3,3]; default value: none

## Related Parameters and Sets

- [PRC_RCAP](../parameters/prc-rcap.md)

## Affected Equations and Variables

Activates generation of the retrofit / lifetime extension equations (EQL_REFIT)
