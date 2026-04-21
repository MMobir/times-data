---
type: entity
title: "NCAP_CDME"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-bpme]
last_updated: 2026-04-11
---

# NCAP_CDME

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Condensing mode efficiency

## Details

The parameter can only be used for standard processes having electricity output in the PCG.

## Units and Defaults

Decimal fraction [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [NCAP_BPME](../parameters/ncap-bpme.md)

## Affected Equations and Variables

Process transformation equation, either EQE_ACTEFF or EQ_PTRANS
