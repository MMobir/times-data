---
type: entity
title: "year"
aliases: ["allyear", "ll"]
tags: [index]
sources:
  - raw/reference/indexes.json
  - raw/docs/part-2/01-introduction.md
related: [entities/indexes/datayear, entities/indexes/pastyear, entities/indexes/modlyear, entities/indexes/milestonyr]
last_updated: 2026-04-11
---

# year

**Aliases:** allyear, ll

## Description

Years that can be used in the model; default range 1850-2200; under user control by the dollar control parameters $SET BOTIME <y> and $SET EOTIME <y> in the <case>.RUN file.

## Related Indexes

- [datayear](./datayear.md)
- [pastyear](./pastyear.md)
- [modlyear](./modlyear.md)
- [milestonyr](./milestonyr.md)

## Usage

This index is used as a dimension in various TIMES parameters, sets, and equations. See the [Reference Manual Introduction](../../raw/docs/part-2/01-introduction.md) for the full notation conventions.
