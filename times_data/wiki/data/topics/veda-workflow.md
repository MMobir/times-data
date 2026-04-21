---
type: topic
title: "Working with VEDA 2.0"
aliases: []
tags: [veda, workflow, practical]
sources:
  - raw/docs/part-4/01-overview.md
  - raw/docs/part-4/02-intro-to-veda.md
related: []
last_updated: 2026-04-11
---

# Working with VEDA 2.0

## Overview

VEDA 2.0 is the standard user interface for building and managing TIMES models. It handles data input, model execution (via GAMS), and results analysis.

## Key VEDA Concepts

- **Templates:** Excel workbooks containing model data. Types include:
  - **B-Y Templates:** Base year data
  - **SubRES Templates:** Technology definitions
  - **Scenario Templates (SysSettings, Demands, etc.):** Scenario-specific data
  - **Trade Templates:** Inter-regional trade definitions

- **Synchronization:** VEDA reads Excel templates and populates its internal database
- **Run Manager:** Configures and launches GAMS model runs
- **Results Browser:** Analyzes model output with tables, charts, and maps

## Data Flow

1. Modeler edits Excel templates
2. VEDA synchronizes (imports) the data
3. Run Manager creates GAMS input files (DD files)
4. GAMS solves the model
5. Results are imported back into VEDA for analysis

## Common Workflow Issues

- Always synchronize after editing templates
- Check the VEDA log for import errors
- Use the "Items" view to verify data was imported correctly
- The VTRUN.cmd file controls the GAMS run configuration

## Sources

- [Part IV, Ch.1: Overview](../../raw/docs/part-4/01-overview.md)
- [Part IV, Ch.2: Introduction to VEDA 2.0](../../raw/docs/part-4/02-intro-to-veda.md)
