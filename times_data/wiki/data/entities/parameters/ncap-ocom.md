---
type: entity
title: "NCAP_OCOM"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-valu, entities/parameters/rpc-capflo, entities/parameters/rpc-conly]
last_updated: 2026-04-11
---

# NCAP_OCOM

**Category:** User Input
**Indexes:** r, datayear, p, c

## Description

Amount of commodity c per unit of capacity released during the dismantling of a process.

## Details

Provided when there is a commodity release associated with the decommissioning.

## Units and Defaults

Commodity unit per capacity unit [open]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [NCAP_VALU](../parameters/ncap-valu.md)
- [rpc_capflo](../parameters/rpc-capflo.md)
- [rpc_conly](../parameters/rpc-conly.md)

## Affected Equations and Variables

Applied to the investment variable (VAR_NCAP) in the appropriate commodity constraints (EQ(l)_COMBAL) as part of production in the appropriate period.
