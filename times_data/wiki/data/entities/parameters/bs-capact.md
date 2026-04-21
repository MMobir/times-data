---
type: entity
title: "BS_CAPACT"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/prc-capact]
last_updated: 2026-04-11
---

# BS_CAPACT

**Category:** User Input
**Indexes:** r

## Description

Conversion factor from exogenous reserve demand from capacity to activity / commodity flow units

## Details

Applied also for the reporting of reserves in terms of power levels. See the ABS documentation for details

## Units and Defaults

Flow unit / capacity unit; (0,∞); default value: PRC_CAPACT

## Related Parameters and Sets

- [PRC_CAPACT](../parameters/prc-capact.md)

## Affected Equations and Variables

EQ_BS04
