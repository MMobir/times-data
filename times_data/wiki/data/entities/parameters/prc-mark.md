---
type: entity
title: "PRC_MARK"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/flo-mark]
last_updated: 2026-04-11
---

# PRC_MARK

**Category:** User Input
**Indexes:** r, datayear, p, item, c, bd

## Description

Process group-wise market share, which defines a constraint for the combined market share of multiple processes in the total commodity production.

## Details

Combined limit on commodity production is derived as the sum of the process-specific productions multiplied by the inverse values of PRC_MARK. The constraint is applied to the annual production of commodity. Item can be any desired label identifying the group.

## Units and Defaults

Decimal fraction [open]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [FLO_MARK](../parameters/flo-mark.md)

## Affected Equations and Variables

EQ(l)_FLOMRK, VAR_COMPRD
