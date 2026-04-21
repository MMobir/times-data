---
type: entity
title: "NCAP_DLIFE"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/dur-max]
last_updated: 2026-04-11
---

# NCAP_DLIFE

**Category:** User Input
**Indexes:** r, datayear, p

## Description

Technical time for dismantling a facility after the end its technical lifetime, plus any lag time (NCAP_DLAG).

## Details

Provided when a process has a decommissioning phase.

## Units and Defaults

Years (0,∞); default value: none; Default i/e: STD

## Related Parameters and Sets

- [DUR_MAX](../parameters/dur-max.md)

## Affected Equations and Variables

Decommissioning time impacting (VAR_NCAP+NCAP_PASTI) when entering the objective function components (EQ_OBJINV, EQ_OBJSALV).
