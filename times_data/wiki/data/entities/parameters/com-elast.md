---
type: entity
title: "COM_ELAST"
aliases: []
tags: [parameter, user-input]
sources:
  - raw/reference/parameters.json
  - raw/docs/part-2/03-parameters.md
related: [entities/parameters/com-bprice, entities/parameters/com-step, entities/parameters/com-voc, entities/parameters/com-agg]
last_updated: 2026-04-11
---

# COM_ELAST

**Category:** User Input
**Indexes:** r, datayear, c, s, lim

## Description

Elasticity of demand indicating how much the demand rises/falls in response to a unit change in the marginal cost of meeting a demand that is elastic. See also Appendix D for additional details on defining demand functions.

## Details

The control parameter $SET TIMESED YES must be set to activate elastic demands. An elasticity is required for each direction the demand is permitted to move. The index lim = 'LO' corresponds to demand decrease, while lim = 'UP' denotes the direction for demand increase. A different value may be provided for each direction, thus curves may be asymmetric. Substitution elasticities can be defined with lim='N', among a group of demands aggregated by COM_AGG.

## Units and Defaults

Dimensionless [open]; default value: none; Default i/e: STD

## Related Parameters and Sets

- [COM_BPRICE](../parameters/com-bprice.md)
- [COM_STEP](../parameters/com-step.md)
- [COM_VOC](../parameters/com-voc.md)
- [COM_AGG](../parameters/com-agg.md)

## Affected Equations and Variables

Controls the inclusion of the elastic demand variable (VAR_ELAST) in the commodity balance equation(EQ(l)_COMBAL). Applied to the elastic demand variable (VAR_ELAST) in the objective function costs (EQ_OBJELS).
