---
type: entity
title: "RCAP_BLK"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/prc-rcap, entities/parameters/rcap-bnd]
last_updated: 2026-04-11
---

# RCAP_BLK

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Retirement block size.

## Details

Only effective when lumpy early capacity retirements are active (RETIRE=MIP). Requires MIP.

## Units and Defaults

Capacity unit [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [PRC_RCAP](../parameters/prc-rcap.md)
- [RCAP_BND](../parameters/rcap-bnd.md)

## Affected Equations and Variables

EQ_DSCRET, VAR_DRCAP, VAR_SCAP
