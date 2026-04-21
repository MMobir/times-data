---
type: entity
title: "NCAP_MSPRF"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/com-mshgv]
last_updated: 2026-04-11
---

# NCAP_MSPRF

**Category:** User Input
**Indexes:** r, datayear, c, p, lim

## Description

In the logit market sharing mechanism, defines preference weights (lim='N') and intangible costs (lim='LO')

## Details

Optional parameter for the logit market sharing mechanism, for process p supplying market c.

## Units and Defaults

Unit: dimensionless (0,∞); Default value: none; Default i/e: STD

## Related Parameters and Sets

- [COM_MSHGV](../parameters/com-mshgv.md)

## Affected Equations and Variables

EQ_MSNCAPB
