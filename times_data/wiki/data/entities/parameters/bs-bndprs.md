---
type: entity
title: "BS_BNDPRS"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# BS_BNDPRS

**Category:** User Input
**Indexes:** r, datayear, p, b, s, lim

## Description

Absolute bound on the reserve provision b from process p.

## Details

Not levelized (inherited or aggregated), but applied only directly on the timeslice s specified. See the ABS documentation for details

## Units and Defaults

Capacity unit of the process [0,∞); default value: none

## Related Parameters and Sets

None documented.

## Affected Equations and Variables

EQ_BS27
