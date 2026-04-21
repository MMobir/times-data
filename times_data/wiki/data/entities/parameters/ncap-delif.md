---
type: entity
title: "NCAP_DELIF"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-dlife, entities/parameters/cor-salvd, entities/parameters/dur-max, entities/parameters/obj-crfd, entities/parameters/salv-dec]
last_updated: 2026-04-11
---

# NCAP_DELIF

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Economic lifetime of the decommissioning activity.

## Details

Provided when the timeframe for paying for decommission is different from that of the actual decommissioning.

## Units and Defaults

Years (0,∞); default value: NCAP_DLIFE; Default i/e: STD

## Related Parameters and Sets

- [NCAP_DLIFE](../parameters/ncap-dlife.md)
- [COR_SALVD](../parameters/cor-salvd.md)
- [DUR_MAX](../parameters/dur-max.md)
- [OBJ_CRFD](../parameters/obj-crfd.md)
- [SALV_DEC](../parameters/salv-dec.md)

## Affected Equations and Variables

Applied to the investment variable (VAR_NCAP) when entering the salvage portion of the objective function (EQ_OBJSALV).
