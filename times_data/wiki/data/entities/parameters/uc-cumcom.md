---
type: entity
title: "UC_CUMCOM"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/com-cumnet, entities/parameters/com-cumprd]
last_updated: 2026-04-11
---

# UC_CUMCOM

**Category:** User Input
**Indexes:** uc_n, r, type, c, y1, y2

## Description

Multiplier of cumulative commodity variable in user constraint.

## Details

Used in cumulative user constraints only. Type=NET/PRD determines the variable referred to (CUMNET/ CUMPRD).

## Units and Defaults

Dimensionless [open]; default value: none; I/e: N/A

## Related Parameters and Sets

- [COM_CUMNET](../parameters/com-cumnet.md)
- [COM_CUMPRD](../parameters/com-cumprd.md)

## Affected Equations and Variables

EQ(l)_UC, EQ(l)_UCR, VAR_CUMCOM
