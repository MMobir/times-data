---
type: entity
title: "NCAP_START"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/prc-noff]
last_updated: 2026-04-11
---

# NCAP_START

**Category:** User Input
**Indexes:** r, p

## Description

Start year for new investments

## Details

NCAP_START(r,p)=y is equivalent to PRC_NOFF(r,p,BOH,y–1).

## Units and Defaults

Year [1000, ∞); default value: none

## Related Parameters and Sets

- [PRC_NOFF](../parameters/prc-noff.md)

## Affected Equations and Variables

Affects the availability of investment variable (VAR_NCAP)
