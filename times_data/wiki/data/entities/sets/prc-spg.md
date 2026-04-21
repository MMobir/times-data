---
type: entity
title: "prc_spg (r,p,cg)"
aliases: []
tags: [set, internal]
sources:
  - raw/reference/sets.json
  - raw/docs/part-2/02-sets.md
related: []
last_updated: 2026-04-11
---

# prc_spg (r,p,cg)

**Category:** Internal
**Aliases:** None

## Description

Shadow primary group (SPG) of a process p; all commodities on the opposite process side of the primary commodity group (PCG) which have the same commodity type as the PCG, usually internally determined (though it may be specified by the user under special circumstances (e.g., when not all the commodities on the opposite side of the process, which should be in the SPG, are of the same commodity type com_type). If no commodity of the same type is found: if PCG is of type 'DEM' and process is a material processing process (PRV or PRW), then the SPG contains all material commodities on the SPG side; otherwise the SPG is selected as the first type among the commodity types on the SPG side, in the flowing order: When PCG type is DEM: (NRG, MAT, ENV) When PCG type is NRG: (MAT, DEM, ENV) When PCG type is MAT: (NRG, DEM, ENV) When PCG type is ENV: (NRG, MAT, DEM)

## Usage Notes

See the [Sets chapter](../../raw/docs/part-2/02-sets.md) in the TIMES Reference Manual for full details on how this set is used in the model equations.
