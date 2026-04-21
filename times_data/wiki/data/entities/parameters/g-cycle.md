---
type: entity
title: "G_CYCLE"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ts-cycle]
last_updated: 2026-04-11
---

# G_CYCLE

**Category:** User Input
**Indexes:** tslvl

## Description

Defines the total number of cycles on level tslvl, in a year. Provides default values for TS_CYCLE (see entry for that).

## Details

Not recommended to be changed; use TS_CYCLE instead, whenever the timeslice cycles are different from the default, because changing G_CYCLE would change the meaning of storage availability factors.

## Units and Defaults

Number of cycles [1,∞); Default values: · 1 for ANNUAL · 1 for SEASON · 52 for WEEKLY · 365 for DAYNITE

## Related Parameters and Sets

- [TS_CYCLE](../parameters/ts-cycle.md)

## Affected Equations and Variables

Affects interpretation of availability factors for the storage level, whenever capacity represents the maximum nominal output level (EQ(l)_CAPACT, EQL_CAPFLO).
