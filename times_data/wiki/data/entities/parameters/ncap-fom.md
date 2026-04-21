---
type: entity
title: "NCAP_FOM"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/obj-fom, entities/parameters/cst-fixc, entities/parameters/cst-pvp]
last_updated: 2026-04-11
---

# NCAP_FOM

**Category:** User Input
**Indexes:** r, datayear, p, cur

## Description

Fixed operating and maintenance cost per unit of capacity according to the installation year.

## Details

Provided when there is a fixed cost associated with the installed capacity.

## Units and Defaults

Monetary unit per capacity unit [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [OBJ_FOM](../parameters/obj-fom.md)
- [CST_FIXC](../parameters/cst-fixc.md)
- [CST_PVP](../parameters/cst-pvp.md)

## Affected Equations and Variables

Fixed operating and maintenance costs associated with total installed capacity (VAR_NCAP+NCAP_PASTI) when entering the objective function components (EQ_OBJFIX).
