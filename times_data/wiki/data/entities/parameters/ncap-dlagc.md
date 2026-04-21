---
type: entity
title: "NCAP_DLAGC"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-dlag, entities/parameters/obj-dlagc, entities/parameters/cst-decc, entities/parameters/cst-pvp]
last_updated: 2026-04-11
---

# NCAP_DLAGC

**Category:** User Input
**Indexes:** r, datayear, p, cur

## Description

Cost occurring during the lag time after the technical lifetime of a process has ended and before its decommissioning starts.

## Details

Provided when there is a cost during any lag in the decommissioning (e.g., security).

## Units and Defaults

Monetary unit per capacity unit [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [NCAP_DLAG](../parameters/ncap-dlag.md)
- [OBJ_DLAGC](../parameters/obj-dlagc.md)
- [CST_DECC](../parameters/cst-decc.md)
- [CST_PVP](../parameters/cst-pvp.md)

## Affected Equations and Variables

Cost during delay applied to the current capacity subject to decommissioning (VAR_NCAP+NCAP_PASTI) when entering the objective function components (EQ_OBJFIX, EQ_OBJSALV).
