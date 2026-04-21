---
type: entity
title: "ACT_SDTIME"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/act-cstsd, entities/parameters/act-maxnon]
last_updated: 2026-04-11
---

# ACT_SDTIME

**Category:** User Input
**Indexes:** r, datayear, p, upt, bd

## Description

Defines the duration of start-up (bd=UP) and shut-down (bd=LO) phases, by start-up type, in hours.

## Details

Can only be used when ACT_CSTSD is specified for the process (advanced unit commitment option). When specifying the duration of the shut-down phase, only the tuple (upt,bd)=(HOT,LO) is valid

## Units and Defaults

hours [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [ACT_CSTSD](../parameters/act-cstsd.md)
- [ACT_MAXNON](../parameters/act-maxnon.md)

## Affected Equations and Variables

Activates generation of EQ_SUDTIME, and used also in the equations EQ_ACTPL, EQ_SDSLANT, EQ_SDMINON, EQ_SUDPLL
