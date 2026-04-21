---
type: entity
title: "REG_BDNCAP"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/reg-fixt]
last_updated: 2026-04-11
---

# REG_BDNCAP

**Category:** User Input
**Indexes:** all_r, bd

## Description

Defines the year up to which capacities are to be bounded by previous solution, by model region. One can choose FX/UP/LO bounds, as well as lower bounds only for selected processes.

## Details

Only taken into account when a previous solution is loaded by using the LPOINT control variable. If several bound types are specified, one can use NCAP_BND(r,'0',p,'N')=±1 for assigning only an UP/LO bound for any process p.

## Units and Defaults

Year [1000, ∞); default value: none

## Related Parameters and Sets

- [REG_FIXT](../parameters/reg-fixt.md)

## Affected Equations and Variables

VAR_NCAP
