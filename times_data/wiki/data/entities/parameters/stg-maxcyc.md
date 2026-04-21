---
type: entity
title: "STG_MAXCYC"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-af]
last_updated: 2026-04-11
---

# STG_MAXCYC

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Defines the maximum number of storage cycles over the lifetime. Sets a limit for the total discharge divided by storage capacity.

## Details

Can only be used for genuine storage processes. The limit can be exceeded by paying for additional replacement capacity, with a penalty cost equal to the investment annuity.

## Units and Defaults

Number of cycles [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [NCAP_AF](../parameters/ncap-af.md)

## Affected Equations and Variables

Activates generation of the cycle limit/penalty equations (EQL_STGCCL).
