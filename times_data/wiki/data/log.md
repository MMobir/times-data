---
type: log
title: "Wiki Log"
last_updated: 2026-04-11
---

# Wiki Log

## [2026-04-11] ingest | Initial Wiki Build
- **Parameters:** 288 entity pages generated from raw/reference/parameters.json
- **Sets:** 178 entity pages generated from raw/reference/sets.json
- **Indexes:** 37 entity pages generated from raw/reference/indexes.json
- **Concepts:** 14 concept pages created
- **Topics:** 7 topic pages created
- **Source summaries:** 7 source summary pages created
- **Documentation:** 45 chapters scraped from times.readthedocs.io into raw/docs/
- Updated: wiki/index.md, wiki/overview.md

## [2026-04-12] ingest | Forum Scrape Complete
- **Forum threads:** 1,502 threads scraped from forum.kanors-emr.org into raw/forum/threads/
- **Total posts:** 39,608 posts across all threads
- **FAQ pages:** 16 FAQ pages generated from forum content, classified into 16 topic categories
- Largest categories: Results Analysis (718 threads), Installation & Setup (527), Errors & Debugging (370), Trade (352), Renewables & Availability (280)
- Updated: wiki/faq/, wiki/index.md, wiki/overview.md

## [2026-04-12] query | How does the TIMES modeling flow work today?
- Filed answer as new page: wiki/topics/modeling-flow.md
- Synthesized from: raw/docs/part-3/01-introduction.md, raw/docs/part-4/02-intro-to-veda.md, and multiple wiki pages
- Covers: full 8-step pipeline from Excel templates through VEDA, GAMS, solver, and results analysis
- Includes: architecture diagram, pain points assessment, solver compatibility table
- Updated: wiki/index.md

## [2026-04-12] design | Layer 0 deterministic data layer
- Filed architecture spec as new page: wiki/topics/layer-0-architecture-spec.md
- Scope: canonical model graph, hybrid storage model, validation layers, compiler boundary, collaboration model, and rollout plan
- Explicitly addresses: large-model handling for EU-TIMES scale, Parquet/DuckDB strategy, Access/MDB limitations, and LLM-on-top deterministic workflows
- Sources include: TIMES documentation, VEDA workflow pages, and forum threads on large databases and large result-file handling
- Updated: wiki/index.md

## [2026-04-12] design | Product direction — agentic model builder
- Filed as: wiki/topics/product-direction.md
- Core thesis: model creation speed (6-12 months -> 1 day) is the primary pain; debugging and collaboration are downstream
- Defined: user funnel (open-source -> agent -> full workflow -> platform), revenue model, key metric
- Next build: the agentic model builder interface on top of times-data + wiki
