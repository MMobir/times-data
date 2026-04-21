---
type: entity
title: "VDA_EMCB"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/flo-emis, entities/parameters/flo-eff]
last_updated: 2026-04-11
---

# VDA_EMCB

**Category:** User Input
**Indexes:** r, datayear, c, com

## Description

Emissions (com) from the combustion of commodity (c) in region (r).

## Details

Available in the VEDA shell. Any process-specific FLO_EMIS / FLO_EFF with the commodities c and com will override VDA_EMCB.

## Units and Defaults

Emission units per flow units; default value: none; Default i/e: STD

## Related Parameters and Sets

- [FLO_EMIS](../parameters/flo-emis.md)
- [FLO_EFF](../parameters/flo-eff.md)

## Affected Equations and Variables

EQ_PTRANS
