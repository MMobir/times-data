---
type: entity
title: "NCAP_COM"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/rpc-capflo, entities/parameters/rpc-conly]
last_updated: 2026-04-11
---

# NCAP_COM

**Category:** User Input
**Indexes:** r, datayear, p, c, io

## Description

Emission (or land-use) of commodity c associated with the capacity of a process for each year said capacity exists.

## Details

Provided when the consumption or production of a commodity is tied to the level of the installed capacity.

## Units and Defaults

Commodity unit per capacity unit [open]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [rpc_capflo](../parameters/rpc-capflo.md)
- [rpc_conly](../parameters/rpc-conly.md)

## Affected Equations and Variables

Applied to the capacity variable (VAR_CAP) in the commodity balance (EQ_COMBAL).
