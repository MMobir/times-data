---
type: entity
title: "BS_SHARE"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/bs-omega]
last_updated: 2026-04-11
---

# BS_SHARE

**Category:** User Input
**Indexes:** r, datayear, b, grp, lim

## Description

Maximum (bd=UP) or minimum (bd=LO) share of process group grp in the demand for reserve b, in region r, where demand is measured as defined by BS_OMEGA

## Details

The group grp can be defined by GR_GENMAP, or implicitly for any single process prc=grp. See the ABS documentation for details

## Units and Defaults

Unit: dimensionless [0, 1]; default value: none

## Related Parameters and Sets

- [BS_OMEGA](../parameters/bs-omega.md)

## Affected Equations and Variables

EQ_BS01
