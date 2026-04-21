---
type: entity
title: "NCAP_OLIFE"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-tlife]
last_updated: 2026-04-11
---

# NCAP_OLIFE

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Maximum operating lifetime of a process, in terms of full-load years.

## Details

Requires that early retirements are enabled and the process is vintaged.

## Units and Defaults

Years (0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [NCAP_TLIFE](../parameters/ncap-tlife.md)

## Affected Equations and Variables

EQL_SCAP
