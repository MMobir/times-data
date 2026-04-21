---
type: entity
title: "NCAP_PASTI"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/ncap-pasty, entities/parameters/obj-pasti, entities/parameters/par-pasti, entities/parameters/prc-resid]
last_updated: 2026-04-11
---

# NCAP_PASTI

**Category:** User Input
**Indexes:** r, pastyear, p

## Description

Investment in new capacity made before the beginning of the model horizon (in the year specified by pastyear).

## Details

Past investment can also be specified for milestone years, e.g. if the milestone year is a historic year, so that capacity additions are known or if planned future investments are already known.

## Units and Defaults

capacity unit [0,∞); default value: none

## Related Parameters and Sets

- [NCAP_PASTY](../parameters/ncap-pasty.md)
- [OBJ_PASTI](../parameters/obj-pasti.md)
- [PAR_PASTI](../parameters/par-pasti.md)
- [PRC_RESID](../parameters/prc-resid.md)

## Affected Equations and Variables

EQ(l)_COMBAL, EQ_CPT, EQ_OBJINV, EQ_OBJSALV, EQ_OBJFIX
