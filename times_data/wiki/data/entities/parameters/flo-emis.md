---
type: entity
title: "FLO_EMIS"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/flo-eff]
last_updated: 2026-04-11
---

# FLO_EMIS

**Category:** User Input
**Indexes:** r, datayear, p, cg, com, s

## Description

Defines the amount of emissions (c) per unit of process flow(s) or activity (cg).

## Details

See FLO_EFF. If com is of type ENV and is not in the process topology, it is added to it as an output flow.

## Units and Defaults

Commodity unit of c / commodity unit of cg [open]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [FLO_EFF](../parameters/flo-eff.md)

## Affected Equations and Variables

See FLO_EFF.
