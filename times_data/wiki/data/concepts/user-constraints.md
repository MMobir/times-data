---
type: concept
title: "User Constraints"
aliases: []
tags: [core, equations, advanced]
sources:
  - raw/docs/part-2/06-equations.md
  - raw/docs/part-2/03-parameters.md
related: []
last_updated: 2026-04-11
---

User constraints are a powerful TIMES feature that allows modelers to define custom linear constraints beyond the built-in model equations. They can express virtually any linear relationship between model variables.

## What Can Be Constrained

User constraints can reference:
- Activity variables (VAR_ACT)
- Flow variables (VAR_FLO)
- New capacity variables (VAR_NCAP)
- Installed capacity (VAR_CAP)
- Commodity net production (VAR_COMPRD)
- Trade flows (VAR_IRE)

## Defining User Constraints

User constraints are specified through a set of parameters prefixed with `UC_`:
- `UC_N`: Name/identifier of the constraint
- `UC_RHSRT(uc_n,r,t,bd)`: Right-hand side value
- `UC_ACT(uc_n,...,p,...)`: Coefficient on activity variables
- `UC_FLO(uc_n,...,p,c,...)`: Coefficient on flow variables
- `UC_NCAP(uc_n,...,p,...)`: Coefficient on new capacity
- `UC_CAP(uc_n,...,p,...)`: Coefficient on installed capacity
- And many more

## Common Uses

- **Renewable portfolio standards:** Minimum share of renewables in electricity generation
- **Emission caps:** Limits on total emissions
- **Market share constraints:** Preventing unrealistic dominance of a single technology
- **Land use constraints:** Limiting deployment based on available area
- **Fuel blending:** Minimum/maximum fuel mix ratios

## Sources

- [Part II, Ch.6: Equations](../../raw/docs/part-2/06-equations.md) -- EQ_UC*
- [Part II, Ch.3: Parameters](../../raw/docs/part-2/03-parameters.md) -- UC_* parameters
