---
type: entity
title: "FLO_FR"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# FLO_FR

**Category:** User Input
**Indexes:** r, datayear, p, c, s, bd

## Description

1) Bounds the flow of commodity (c) entering or leaving process (p) in a timeslice, in proportion to annual flow. 2) If specified also at the ANNUAL level, bounds the flow level in proportion to the average level under the parent timeslice

## Details

FLO_FR may be specified as lower, upper or fixed bounds, in contrast to COM_FR. Can be specified for any flow variable having a subannual timeslice resolution. Weighted aggregation. Direct inheritance, if defined at the ANNUAL level.

## Units and Defaults

Decimal fraction [0,1] / [0, ∞); default value: none; Default i/e: MIG

## Related Parameters and Sets

None documented.

## Affected Equations and Variables

A share equation (EQ(l)_FLOFR) limiting the amount of commodity (c) is generated according to the bound type (bd = l indicator).
