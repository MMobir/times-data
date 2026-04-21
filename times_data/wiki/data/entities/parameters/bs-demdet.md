---
type: entity
title: "BS_DEMDET"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# BS_DEMDET

**Category:** User Input
**Indexes:** r, datayear, rsp, b, s

## Description

Parameters for deterministic demands of reserves (rsp = EXOGEN or WMAXSI)

## Details

rsp='EXOGEN': Exogenous reserve demand for reserve b, in region r, timeslice s. rsp='WMAXSI': Weight of the contribution of the largest system element in deterministic reserve demand b, in region r, timeslice s. See the ABS documentation for details

## Units and Defaults

Unit for EXOGEN: capacity unit; Unit for WMAXSI: dimensionless (fraction of capacity); Default value: none

## Related Parameters and Sets

None documented.

## Affected Equations and Variables

EQ_BS04
