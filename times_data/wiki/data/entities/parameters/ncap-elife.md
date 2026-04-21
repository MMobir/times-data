---
type: entity
title: "NCAP_ELIFE"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-tlife, entities/parameters/cor-salvi, entities/parameters/obj-crf]
last_updated: 2026-04-11
---

# NCAP_ELIFE

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Economic lifetime of a process.

## Details

Provided only when the economic lifetime differs from the technical lifetime (NCAP_TLIFE).

## Units and Defaults

years (0,∞); default value: NCAP_TLIFE; Default i/e: STD

## Related Parameters and Sets

- [NCAP_TLIFE](../parameters/ncap-tlife.md)
- [COR_SALVI](../parameters/cor-salvi.md)
- [OBJ_CRF](../parameters/obj-crf.md)

## Affected Equations and Variables

Economic lifetime of a process when costing investment (VAR_NCAP+NCAP_PASTI) or capacity in the objective function components (EQ_OBJINV, EQ_OBJSALV, EQ_OBJFIX).
