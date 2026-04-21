---
type: entity
title: "ACT_MAXNON"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/act-cstsd, entities/parameters/act-sdtime]
last_updated: 2026-04-11
---

# ACT_MAXNON

**Category:** User Input
**Indexes:** r, datayear, p, upt

## Description

Max. non-operational time before transition to next stand-by condition, by start-up type, in hours ·Defines the max. non-operational time before a subsequent start-up of type upt.

## Details

Can only be used when the advanced unit commitment option is used for the process (thus defining ACT_CSTSD is required)

## Units and Defaults

hours [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [ACT_CSTSD](../parameters/act-cstsd.md)
- [ACT_SDTIME](../parameters/act-sdtime.md)

## Affected Equations and Variables

Activates generation of EQ_SUDUPT
