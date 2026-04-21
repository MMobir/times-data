---
type: entity
title: "RCAP_BND"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/prc-rcap, entities/parameters/rcap-blk]
last_updated: 2026-04-11
---

# RCAP_BND

**Category:** User Input
**Indexes:** r, datayear, p, bd

## Description

Bound on the retired amount of capacity in a period (same bound for all vintages).

## Details

Unless the control variable DSCAUTO=YES, requires that PRC_RCAP is defined for process p.

## Units and Defaults

Capacity unit [0,∞); default value: none; Default i/e: MIG

## Related Parameters and Sets

- [PRC_RCAP](../parameters/prc-rcap.md)
- [RCAP_BLK](../parameters/rcap-blk.md)

## Affected Equations and Variables

VAR_RCAP, VAR_SCAP
