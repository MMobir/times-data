---
type: entity
title: "STG_SIFT"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/act-time]
last_updated: 2026-04-11
---

# STG_SIFT

**Category:** User Input
**Indexes:** r, datayear, prc, com, ts

## Description

Defines process prc as a load-shifting process, and limits the load shifting of demand com in timeslice ts to at most the fraction specified by the parameter value.

## Details

Can only be used for a timeslice storage process.

## Units and Defaults

Decimal fraction [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [ACT_TIME](../parameters/act-time.md)

## Affected Equations and Variables

Activates generation of load shifting constraints (EQ(l)_SLSIFT).
