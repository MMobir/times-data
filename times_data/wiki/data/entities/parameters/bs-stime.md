---
type: entity
title: "BS_STIME"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# BS_STIME

**Category:** User Input
**Indexes:** r, p, b, bd

## Description

Defines the times for reserve provision from storage process p for reserve b in region r(in hours): ·bd='LO': Time required to ramp up in order to provide reserve b ·bd='UP': Duration of provision for reserve b including time to ramp up

## Details

Required that 'UP' ≥ 'LO'. See the ABS documentation for details

## Units and Defaults

Unit: hours (0,∞); default value: none

## Related Parameters and Sets

None documented.

## Affected Equations and Variables

EQ_BS22, EQ_BS23
