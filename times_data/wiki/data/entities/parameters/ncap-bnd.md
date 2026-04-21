---
type: entity
title: "NCAP_BND"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

# NCAP_BND

**Category:** User Input
**Indexes:** r, datayear, p, bd

## Description

Bound on the permitted level on investment in new capacity

## Details

Provided for each process to have its overall installed capacity (VAR_NCAP) limited in a period.

## Units and Defaults

Capacity unit [0,∞); default value: none; Default i/e: MIG

## Related Parameters and Sets

None documented.

## Affected Equations and Variables

Imposes an indirect limit on the capacity transfer equation (EQ_CPT) by means of a direct bound on the new investments capacity variable (VAR_NCAP).
