---
type: entity
title: "BS_MAINT"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# BS_MAINT

**Category:** User Input
**Indexes:** r, datayear, p, s

## Description

For endogenous maintenance scheduling, defines minimum continuous maintenance time of process p

## Details

Levelized to PRC_TSL. If defined on DAYNITE or WEEKLY level, requires start-ups explicitly enabled on that level (using ACT_CSTUP/ACT_CSTSD).

## Units and Defaults

hours (if over 24 hours, continuous over whole season) (0,∞); default value: none

## Related Parameters and Sets

None documented.

## Affected Equations and Variables

EQ_BS27, EQ_BS28
