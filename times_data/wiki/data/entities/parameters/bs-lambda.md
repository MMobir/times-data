---
type: entity
title: "BS_LAMBDA"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/bs-delta]
last_updated: 2026-04-11
---

# BS_LAMBDA

**Category:** User Input
**Indexes:** r, datayear, b

## Description

Fudge factors for dependencies in the reserve requirements calculated for reserve b in region r, in year datayear

## Details

Required. If not defined, then the demand for reserve b cannot be calculated. See the ABS documentation for details.

## Units and Defaults

dimensionless (0,1]; default value: none

## Related Parameters and Sets

- [BS_DELTA](../parameters/bs-delta.md)

## Affected Equations and Variables

EQ_BS03
