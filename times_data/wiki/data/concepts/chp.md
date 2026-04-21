---
type: concept
title: "Combined Heat and Power (CHP)"
aliases: []
tags: [core, special-processes]
sources:
  - raw/docs/part-2/04-special-processes.md
related: []
last_updated: 2026-04-11
---

CHP (Combined Heat and Power) processes in TIMES simultaneously produce electricity and heat. They require special modeling to capture the trade-off between electrical and thermal output.

## CHP Types

TIMES supports several CHP configurations:
- **Back-pressure CHP:** Fixed electricity-to-heat ratio
- **Extraction-condensing CHP:** Variable electricity-to-heat ratio within feasible region
- **Pass-out turbine:** Adjustable extraction of steam

## Key Parameters

- `NCAP_CHPR(r,y,p,bd)`: Electricity-to-heat ratio (at full CHP mode)
- `NCAP_CEH(r,y,p)`: Coefficient of electricity to heat
- `NCAP_BPME(r,y,p)`: Back-pressure mode efficiency
- `NCAP_CDME(r,y,p)`: Condensing mode efficiency
- `ACT_EFF`: Overall efficiency

## The CHP Feasible Region

For extraction-condensing CHP, the feasible operating region is defined by:
1. Maximum heat output (full back-pressure mode)
2. Maximum electricity output (full condensing mode)
3. The Cv line (relationship between E and H at partial extraction)

## Sources

- [Part II, Ch.4: Special Processes](../../raw/docs/part-2/04-special-processes.md)
