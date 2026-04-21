---
type: topic
title: "The Complete TIMES Modeling Flow"
aliases: [how TIMES works today, TIMES workflow, modeling pipeline]
tags: [workflow, practical, veda, gams, overview]
sources:
  - raw/docs/part-3/01-introduction.md
  - raw/docs/part-4/01-overview.md
  - raw/docs/part-4/02-intro-to-veda.md
  - wiki/topics/veda-workflow.md
  - wiki/topics/debugging-model-runs.md
  - wiki/concepts/reference-energy-system.md
  - wiki/concepts/objective-function.md
related:
  - topics/veda-workflow
  - topics/debugging-model-runs
  - concepts/reference-energy-system
  - concepts/objective-function
  - concepts/scenarios
last_updated: 2026-04-12
---

# The Complete TIMES Modeling Flow

This page describes the end-to-end workflow for building, running, and analyzing a TIMES model as it works today (2026). The process involves 5 software components, Excel-based data entry, and a rigid pipeline.

## Architecture Overview

The modeling pipeline consists of:

1. **Modeler** -- edits Excel workbooks (templates)
2. **VEDA 2.0** -- Windows-only .NET app by KanORS-EMR that manages data, submits runs, and displays results
3. **GAMS** -- proprietary modeling language that compiles data + TIMES source code into an LP/MIP matrix
4. **Solver** -- CPLEX, Gurobi, or XPRESS that finds the optimal solution
5. **VEDA Results** -- imports solution back for analysis

## Step 1: Define the Model Structure in Excel Templates

Everything starts in Excel. There are ~7 types of workbook templates, each with specific naming conventions and magic table tags that start with `~`:

- **SysSettings** -- declares regions, timeslices, start year, time periods. One file, fixed name. Contains tables like `~BookRegions_Map`, `~TimeSlices`, `~StartYear`, `~TimePeriods`.
- **B-Y Templates** (Base Year) -- define existing commodities, processes, and the base-year energy balance. Named `VT_<name>_<sector>_V<version>`. This is where you calibrate to real energy statistics.
- **SubRES Templates** -- introduce new future technologies not in the base year (solar PV, EVs, hydrogen, etc.). Region-independent, with a separate `Trans` file for region-specific data.
- **Scenario files** (`Scen_<name>`) -- modify or add attributes to existing processes/commodities. This is how you create policy scenarios (carbon tax, emission cap, subsidy).
- **Demand files** (`ScenDem_<name>`) -- project future energy service demands using drivers (GDP, population) and elasticities.
- **Trade files** (`ScenTrade_<name>`) -- define inter-regional trade links and parameters.
- **BY_Trans** -- transformation files that update base-year data.

All data is entered through VEDA-specific table tags: `~FI_T` (flexible import table), `~FI_PROCESS`, `~FI_COMM`, `~COMEMI`, `~TFM_INS`, `~TFM_UPD`, etc. Getting the right tag with the right column headers is a constant source of errors.

## Step 2: Synchronize in VEDA 2.0

Open VEDA 2.0 (Windows-only). The Navigator shows all templates. Files highlighted orange or red need re-importing. Hit the Sync button. VEDA reads every Excel sheet, parses the `~` tables, validates the data, and populates its internal database. This is where most data errors surface -- wrong column names, undefined processes, domain violations. Check the sync log for errors.

## Step 3: Browse and Verify Data

Using VEDA's Browse module (F7), view all imported data in pivot-table-like cubes. Items Detail (F8) shows the [RES](../concepts/reference-energy-system.md) network -- which processes connect to which commodities. This is the main way to verify the model makes sense before running it.

## Step 4: Configure and Submit a Run

In the Run Manager (F9):
1. Select which scenario files to include (base + policy scenarios)
2. Choose model settings (perfect foresight vs. myopic, which TIMES extensions)
3. Set GAMS/solver options
4. Hit "Solve"

VEDA generates:
- **DD files** -- ASCII data files that GAMS reads (one per data category)
- **RUN file** -- the GAMS control script
- **VTRUN.cmd** -- the Windows batch file that launches GAMS

## Step 5: GAMS Compiles and Generates the LP Matrix

GAMS reads the TIMES source code (~100+ .gms files) and the DD files. It:

1. **Compiles** -- validates all set memberships, checks for domain violations
2. **Executes** -- applies [interpolation/extrapolation](../concepts/inter-extrapolation.md), builds internal data structures, generates all equation coefficients
3. **Generates** -- creates the LP (or MIP) matrix with all variables, constraints, and the [objective function](../concepts/objective-function.md)

This is the TIMES Model Generator. For a national model, the matrix might have 500K-2M variables and constraints. For a global model like TIAM, it can be 10M+.

## Step 6: Solver Optimizes

GAMS passes the matrix to the solver (CPLEX, Gurobi, or XPRESS). The solver finds the optimal solution -- the least-cost energy system configuration that satisfies all demands and [commodity balances](../concepts/commodity-balance.md) over the entire time horizon.

Runtime ranges from seconds (small demo models) to hours (large multi-region models with MIP).

Supported solver types by TIMES variant:

| Model Variant | Problem Type | Recommended Solvers |
|---|---|---|
| Basic TIMES (incl. elastic demand, climate, stochastic) | LP | CPLEX, XPRESS, Gurobi |
| Discrete investment, retirement, ETL | MIP | CPLEX, XPRESS, Gurobi |
| MACRO, Micro, Damage cost | NLP | CONOPT, IPOPT |

## Step 7: TIMES Report Writer

After the solver returns, GAMS runs the TIMES report writer, which:
- Extracts all variable values (capacity, activity, flows, costs, prices)
- Computes derived quantities (levelized costs, marginal prices, emission totals)
- Writes results to VD files (VEDA-compatible) and optionally a GDX binary file

## Step 8: Import Results and Analyze

Back in VEDA, import the VD files into a results database. The Results module (F10) provides:
- Pivot tables of any result variable
- Charts and comparisons across scenarios
- Export to Excel for further analysis
- Side-by-side comparison of multiple runs

## Known Pain Points

1. **Excel as a database.** All model data lives in spreadsheets with magic `~` tags. One wrong column header and the data is silently ignored. No version control, no validation until sync time.

2. **VEDA is Windows-only.** A Visual Basic / .NET desktop app from the 2000s. No API, no scripting interface, no programmatic access. Cannot run on Mac or Linux natively.

3. **GAMS is proprietary and expensive.** A GAMS license costs $5K-15K, plus solver licenses (CPLEX: $10K+). Runtime licenses are cheaper but lock you out of modifying the TIMES source code.

4. **Debugging is brutal.** When the model is infeasible, you get a cryptic GAMS error pointing to an equation row name like `EQ_COMBAL_R1_ELCGEN_2035_WD`. Tracing back to the actual data problem requires deep expertise. See [Debugging Model Runs](debugging-model-runs.md) for approaches.

5. **No collaboration.** Excel files don't merge well in git. VEDA's database is single-user. Multiple modelers working on the same model is a coordination nightmare.

6. **The iteration cycle is slow.** Edit Excel -> Sync in VEDA -> Submit run -> Wait for GAMS + solver -> Import results -> Analyze -> Repeat. Each cycle takes minutes to hours depending on model size.

## Sources

- [Part III, Ch.1: Introduction](../../raw/docs/part-3/01-introduction.md) -- components of the TIMES modeling platform
- [Part IV, Ch.1: Overview](../../raw/docs/part-4/01-overview.md) -- VEDA 2.0 overview
- [Part IV, Ch.2: Introduction to VEDA 2.0](../../raw/docs/part-4/02-intro-to-veda.md) -- template types, Navigator, workflow
