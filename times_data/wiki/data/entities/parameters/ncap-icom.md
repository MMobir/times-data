---
type: entity
title: "NCAP_ICOM"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-cled, entities/parameters/rpc-capflo, entities/parameters/rpc-conly]
last_updated: 2026-04-11
---

# NCAP_ICOM

**Category:** User Input
**Indexes:** r, datayear, p, c

## Description

Amount of commodity (c) required for the construction of new capacity.

## Details

Provided when a commodity is needed in the period in which the new capacity is to be available,

## Units and Defaults

Commodity unit per capacity unit [open]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [NCAP_CLED](../parameters/ncap-cled.md)
- [rpc_capflo](../parameters/rpc-capflo.md)
- [rpc_conly](../parameters/rpc-conly.md)

## Affected Equations and Variables

Applied to the investment variable (VAR_NCAP) in the appropriate commodity balance constraints (EQ(l)_COMBAL).
