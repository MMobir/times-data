---
type: entity
title: "NCAP_CHPR"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/flo-shar]
last_updated: 2026-04-11
---

# NCAP_CHPR

**Category:** User Input
**Indexes:** r, datayear, p, lim

## Description

Heat-to-power ratio of a CHP technology (fixed / minimum / maximum ratio). If no ratio equations should be generated, one can define any I/E value with lim='N'.

## Details

The parameter is only taken into account when the process is defined to be of type CHP.

## Units and Defaults

Decimal fraction [0,∞); default value: 1; Default i/e: STD

## Related Parameters and Sets

- [FLO_SHAR](../parameters/flo-shar.md)

## Affected Equations and Variables

Activates the generation of output share equations, implemented with EQ(l)_OUTSHR
