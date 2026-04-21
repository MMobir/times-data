---
type: entity
title: "ACT_LOSSD"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/act-lospl, entities/parameters/act-minld, entities/parameters/act-sdtime, entities/parameters/act-eff]
last_updated: 2026-04-11
---

# ACT_LOSSD

**Category:** User Input
**Indexes:** r, datayear, p, upt, bd

## Description

Used for modeling endogenous partial load efficiency losses during the start-up and shut-down phase. ·With bd=UP defines increase in specific fuel consumption at the start up load level defined by the ratio ACT_MINLD / ACT_SDTIME(upt,'UP') for start-up type upt; ·With bd=LO defines the increase in specific fuel consumption at the start up load level defined by the ratio ACT_MINLD / ACT_SDTIME('HOT', 'LO').

## Details

Can only be used when the advanced unit commitment option is used for the process (therefore, defining both ACT_CSTSD and ACT_MAXNON is required). Requires also that ACT_EFF has been used for defining the process efficiency (on the shadow side of the process).

## Units and Defaults

Dimensionless [0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [ACT_LOSPL](../parameters/act-lospl.md)
- [ACT_MINLD](../parameters/act-minld.md)
- [ACT_SDTIME](../parameters/act-sdtime.md)
- [ACT_EFF](../parameters/act-eff.md)

## Affected Equations and Variables

Activates generation of EQ_SUDPLL
