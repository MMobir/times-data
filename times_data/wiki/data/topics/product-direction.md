---
type: topic
title: "Product Direction: Agentic TIMES Model Builder"
aliases: [product strategy, what to build, monetization]
tags: [product, strategy, agentic, builder]
sources:
  - wiki/topics/layer-0-architecture-spec.md
  - wiki/topics/modeling-flow.md
  - wiki/faq/errors-and-debugging.md
  - raw/forum/threads/
related:
  - topics/layer-0-architecture-spec
  - topics/modeling-flow
  - topics/debugging-model-runs
last_updated: 2026-04-12
---

# Product Direction: Agentic TIMES Model Builder

## The Core Insight

The primary pain in the TIMES ecosystem is not debugging, not collaboration, not results analysis. Those are downstream symptoms. The root pain is:

> Building a TIMES model takes 6-12 months of specialized training and tedious data entry before you can run anything useful.

Every other problem flows from this:
- Debugging is hard because the modeler doesn't fully understand what they built
- Collaboration is poor because the model is too complex to hand off
- Results are confusing because the model structure isn't transparent

If we solve model creation -- making it 10x faster and 10x more accessible -- debugging and collaboration improve as natural side effects.

## The Product

An agentic model builder where a human describes an energy system in natural language and the agent produces a working, validated, runnable TIMES model.

The interaction looks like:

```
Human: "I need a model of Denmark's energy system. Two regions: 
        east and west. Power sector with coal, gas, wind, solar, 
        and battery storage. Industry and residential heat. 
        CO2 tracking. Time horizon 2025-2050 with 5-year periods."

Agent: [reads wiki for Denmark energy context]
       [uses times-data schema for parameter validation]
       [builds model with correct TIMES parameter names and topology]
       [validates: 0 errors]
       [compiles to DD files]
       
       "Built a model with 2 regions, 23 commodities, 45 processes.
        Here's the RES topology: [shows graph]
        
        Some choices I made:
        - Coal plants with 40-year lifetime, phasing out by 2035
        - Wind onshore/offshore with declining costs from NREL ATB
        - 4-hour Li-ion battery storage
        - CO2 emission tracking on all fossil processes
        
        Should I adjust anything before we run it?"
```

## Why This Works

Three things make this feasible that didn't exist before this project:

1. **The wiki** (551 pages) gives the agent deep TIMES domain knowledge -- what parameters mean, how processes connect, what common mistakes look like, what forum experts recommend.

2. **The typed schema** (288 parameters, 178 sets) prevents the agent from hallucinating invalid parameter names or index patterns. Every output is validated against the real TIMES specification.

3. **The DD compiler** means the agent's output is directly runnable in GAMS. Not a sketch, not a suggestion -- actual executable model files.

## What Makes This Defensible

- The wiki compounds. Every question asked, every model built, every bug diagnosed feeds back into the knowledge base. Over time, the agent gets better at TIMES modeling in a way that generic LLMs cannot.
- The deterministic layer (times-data) ensures correctness. Unlike a generic chatbot generating GAMS code, this system validates everything against the formal TIMES specification before output.
- The DD import/export means existing modelers can try it on their real models, not just toy demos.

## User Funnel

### Phase 1: Open-source credibility
- Release `times-data` as an open-source Python library
- Release the wiki as a public knowledge base
- Let the TIMES community validate the schema and DD compiler
- Build trust through transparency

### Phase 2: The agent
- Build the agentic model builder on top of times-data
- Start with simple models (DemoS_001 through DemoS_005 complexity)
- Let users describe what they want, agent builds it
- Every interaction improves the wiki

### Phase 3: Full workflow
- Model creation -> validation -> DD compilation -> GAMS solve -> results import -> analysis
- Debugging assistant that reads solver logs and explains infeasibilities
- Scenario management: "create a variant with a carbon tax of 50 EUR/tCO2 from 2030"
- Collaborative model editing with git-native files

### Phase 4: Platform
- Hosted solve (no need to install GAMS locally)
- Shared technology libraries ("import IEA power sector 2025")
- Model marketplace
- Results dashboard

## Revenue Model

- **Free tier:** times-data library, wiki, basic CLI tools (open source)
- **Pro tier:** Agentic model builder, advanced debugging, collaboration features
- **Enterprise:** Hosted solve, private models, custom technology databases, support

## Key Metric

Time from "I need an energy model" to "I have validated, runnable DD files."

Today with VEDA: 6-12 months.
Target with this product: 1 day for simple models, 1-2 weeks for complex ones.

## What to Build Next

The minimum viable agent needs:
1. A natural language interface that collects model requirements
2. Access to the wiki for domain knowledge
3. The times-data Python API for model construction
4. Schema validation to catch every mistake
5. DD compilation for runnable output
6. A feedback loop where the human reviews and the agent refines

Everything except #1 already exists in this project.
