---
type: entity
title: "G_NOINTERP"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/all-parameters-that-are-normally-subjected-to-interpolation-extrapolation]
last_updated: 2026-04-11
---

# G_NOINTERP

**Category:** User Input
**Indexes:** 

## Description

Switch for generally turning-on (= 0 ) and turning-off (= 1 ) sparse inter- / extrapolation.

## Details

Only provide when interpolation / extrapolation is to be turned off for all parameters. Interpolation of cost parameters is always done.

## Units and Defaults

Binary indicator [0 or 1]; default value = 0

## Related Parameters and Sets

- [All parameters that are normally subjected to interpolation / extrapolation](../parameters/all-parameters-that-are-normally-subjected-to-interpolation-extrapolation.md)

## Affected Equations and Variables

none
