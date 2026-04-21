---
type: entity
title: "NCAP_BPME"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-cdme]
last_updated: 2026-04-11
---

# NCAP_BPME

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Back pressure mode efficiency (or total efficiency in full CHP mode).

## Details

The parameter is only taken into account when the process is of type CHP, and NCAP_CDME has been also defined.

## Units and Defaults

Decimal fraction [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [NCAP_CDME](../parameters/ncap-cdme.md)

## Affected Equations and Variables

Process transformation equation, either EQE_ACTEFF or EQ_PTRANS
