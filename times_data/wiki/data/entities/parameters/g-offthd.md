---
type: entity
title: "G_OFFTHD"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/prc-noff, entities/parameters/prc-aoff, entities/parameters/prc-foff, entities/parameters/com-off]
last_updated: 2026-04-11
---

# G_OFFTHD

**Category:** User Input
**Indexes:** datayear

## Description

Threshold for considering an *_OFF attribute disabling a process/commodity variable in period.

## Details

Setting G_OFFTHD=1 will make the *_OFF attributes effective only for periods fully included in the OFF range specified.

## Units and Defaults

Scalar [0,1]; Default value: 0; Default i/e: 5

## Related Parameters and Sets

- [PRC_NOFF](../parameters/prc-noff.md)
- [PRC_AOFF](../parameters/prc-aoff.md)
- [PRC_FOFF](../parameters/prc-foff.md)
- [COM_OFF](../parameters/com-off.md)

## Affected Equations and Variables

Affects availability of VAR_NCAP, VAR_ACT, VAR_FLO, VAR_COMNET/PRD
