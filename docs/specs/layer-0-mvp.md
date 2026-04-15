# Layer 0 MVP — Implementation Spec

**Status:** In progress
**Architecture:** [wiki/topics/layer-0-architecture-spec.md](../../wiki/topics/layer-0-architecture-spec.md)

## Scope

Build the deterministic core of `times-data`: typed schema, canonical model graph, YAML I/O, validation, and CLI. Prove it works on the TIMES DemoS_001 model structure.

## Package Layout

```text
times_data/
  schema/           # Auto-generated TIMES parameter/set/index definitions
    __init__.py
    parameters.py   # ParameterDef dataclasses for all 288 params
    sets.py         # SetDef dataclasses for all 178 sets
    indexes.py      # IndexDef dataclasses for all 37 indexes
    generate.py     # Script to regenerate schema from raw/reference/*.json
  model/            # Core model graph
    __init__.py
    config.py       # ModelConfig: regions, periods, timeslices, currencies
    commodity.py    # Commodity class
    process.py      # Process class with topology
    parameter.py    # ParameterTable: typed indexed values
    model.py        # Model: the top-level container
  io/               # Import/export
    __init__.py
    yaml_io.py      # Read/write model as YAML directory
  validation/       # Validation engine
    __init__.py
    schema_check.py # Level 1: type/range/index validation
    structural.py   # Level 2: RES connectivity, orphans, topology
  compiler/         # DD file generation (post-MVP, stub for now)
    __init__.py
  cli/              # CLI commands
    __init__.py
    main.py         # Click CLI: validate, info, new
```

## Build Order

### Step 1: Schema generation

Read `raw/reference/parameters.json`, `sets.json`, `indexes.json` and generate typed Python dataclasses. Each parameter becomes a `ParameterDef` with name, indexes, units, range, default i/e, and affected equations.

**Acceptance:** `from times_data.schema.parameters import PARAMETER_REGISTRY; assert len(PARAMETER_REGISTRY) == 288`

### Step 2: Core model classes

Build `ModelConfig`, `Commodity`, `Process`, `ParameterTable`, and `Model`.

- `Model` holds all commodities, processes, and parameter data.
- `Process` knows its input/output topology.
- `ParameterTable` validates values against the schema from Step 1.

**Acceptance:** Can construct a model programmatically with processes, commodities, and parameter values. Invalid parameter names or index patterns raise immediately.

### Step 3: YAML I/O

Write and read a model as a directory of YAML files:

```text
model-dir/
  config.yaml
  commodities/electricity.yaml
  processes/coal-pp.yaml
  parameters/ncap-cost.yaml
```

**Acceptance:** Round-trip: write model to YAML, read it back, compare. Identical.

### Step 4: Validation

- Level 1: schema checks on every parameter assignment.
- Level 2: structural checks run as a batch — orphan commodities, disconnected processes, invalid topology, missing required parameters.

**Acceptance:** A deliberately broken model produces clear, specific error messages.

### Step 5: CLI

```bash
times-data new demo --regions REG1 --periods 2020,2030,2040,2050
times-data validate ./demo
times-data info ./demo
```

**Acceptance:** CLI works end-to-end on a small hand-built model.

## Out of Scope for MVP

- VEDA Excel importer
- Parquet parameter tables
- DD/DDS compiler
- Results reader
- Feasibility pre-checks (Level 3 validation)
