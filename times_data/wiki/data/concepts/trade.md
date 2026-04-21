---
type: concept
title: "Inter-Regional Trade"
aliases: []
tags: [core, multi-region]
sources:
  - raw/docs/part-2/04-special-processes.md
related: []
last_updated: 2026-04-11
---

Trade in TIMES represents the exchange of commodities between regions. It is modeled through special inter-regional exchange (IRE) processes.

## Trade Process Types

- **Bilateral trade:** Between exactly two regions, with explicit transport process
- **Multi-lateral trade (marketplace):** Multiple regions trade through a common pool
- **Unilateral imports/exports:** Fixed exogenous flows

## Key Variables

- `VAR_IRE(r,v,t,p,c,s,ie)`: Trade flow variable (import or export)
- The `ie` index is 'IMP' for imports and 'EXP' for exports

## Key Parameters

- `IRE_FLO(r1,y,p,c1,r2,c2,s)`: Efficiency of trade (accounts for transmission losses)
- `IRE_XBND(r,y,c,s,ie,bd)`: Bounds on total imports/exports of a commodity
- `IRE_BND(r,y,c,s,ie,bd)`: Bounds on bilateral trade flows
- `IRE_PRICE(r,y,c,s,ie,cur)`: Exogenous price for unilateral trade

## Defining Trade Links

Trade links require defining the exchange process in the `top_ire` set, specifying which commodities flow between which regions and through which process.

## Sources

- [Part II, Ch.4: Special Processes](../../raw/docs/part-2/04-special-processes.md)
- [Part II, Ch.2: Sets](../../raw/docs/part-2/02-sets.md) -- IRE-related sets
