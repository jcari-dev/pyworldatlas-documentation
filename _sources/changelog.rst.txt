Changelog
=========

This record summarizes user-visible package, data, documentation, and release
changes. The newest published release appears first.

0.8.1
-----

- Added concise browser-tab titles, a globe favicon, canonical page metadata,
  social preview metadata, a generated sitemap, and crawler guidance for the
  public documentation site.
- Refined the shared GitHub and PyPI README introduction and made repository
  links portable across both renderers.

0.8.0
-----

- Added :meth:`~pyworldatlas.Country.summary` for readable multilingual
  country introductions assembled from existing sourced profile fields.
- Added deterministic multiple-choice questions through
  :meth:`~pyworldatlas.Atlas.quiz` and the immutable, serializable
  :class:`~pyworldatlas.QuizQuestion` model.
- Added :meth:`~pyworldatlas.Atlas.learning_topics` so lessons and applications
  can discover the topics shared by flashcards and quizzes.
- Added partial :meth:`~pyworldatlas.Atlas.search_cities` lookup and
  :meth:`~pyworldatlas.Atlas.nearest_cities` proximity discovery with typed
  :class:`~pyworldatlas.CityDistance` results.
- Added readable decimal degrees, degrees/minutes/seconds, hemisphere labels,
  and compass directions to :class:`~pyworldatlas.Coordinate`.
- Added compact human-readable city labels.
- Expanded beginner examples, classroom recipes, the browser playground, API
  documentation, and public docstrings around the education and usability
  workflows.
- Reorganized the documentation as a coherent learning path while preserving
  source, missingness, and geographic-interpretation guidance.

0.7.0
-----

- Added sourced total, land, and water area; coastline; mean elevation; and
  named highest and lowest points.
- Added 188 source-listed major river records across 80 profiles and 187
  source-listed major lake records across 69 profiles.
- Added 240 plain-language climate summaries and represented Köppen-Geiger
  classes for 241 profiles from the 1991–2020 0.1-degree raster.
- Added immutable ``ElevationPoint``, ``River``, ``Lake``, ``ClimateZone``,
  ``ClimateProfile``, and ``PhysicalGeography`` models.
- Added physical filters, river/lake discovery helpers, climate-zone discovery,
  physical rankings, discovery-card fields, and five physical flashcard topics.
- Added exact snapshot hashes, reproducible extraction, source coverage gates,
  physical-data validation, and source-role documentation.
- Reworked the documentation opening around offline physical-geography examples
  and added a dedicated interpretation guide.
- Kept country boundary geometry, GeoJSON, bounding boxes, centroids,
  point-in-country lookup, and a separate major-mountain inventory outside this
  release.

0.6.0
-----

- Added 234 source-provided anthem-title profiles, 32 explicitly reviewed
  source-listed mottos, and 227 English demonym profiles.
- Enriched currency and language models with CLDR metadata and source
  references.
- Added 417 country-level timezone records across 246 profiles and 176
  postal-code formats.
- Added exact currency, language, script, and timezone filters.
- Added typed rankings and nearest-capital discovery.
- Expanded discovery cards, serialization, provenance, coverage validation,
  runnable examples, and the generated API reference.
- Reworked the documentation opening around useful, fun, executable examples.
- Kept lyrics, audio, anthem credits/dates, reference dates, boundary geometry,
  GeoJSON, bounding boxes, centroids, and point-in-country outside this release.

0.5.0
-----

- Added one sourced local-language identity for all 248 countries and areas,
  spanning 80 languages and 21 writing systems.
- Added pinned Unicode CLDR 48.2 extraction with exact locale/XPath provenance,
  official-language selection metadata, and Unicode License v3 attribution.
- Kept 10 selected UNGEGN records as the higher-evidence national official
  short/formal layer.
- Added sourced English formal names for 240 profiles, exact reviewed source
  exceptions, lookup support, and explicit gaps for eight areas.
- Added ``Country.formal_name``, ``Country.has_distinct_formal_name``, and
  :meth:`~pyworldatlas.Atlas.countries_with_formal_names`.
- Added complete local-name record lookup, formal-name and formal-romanization
  conveniences, evidence kinds, language statuses, and exact source locators.
- Added country coverage discovery with language and script filters.
- Added multilingual examples, coverage reporting, an identity data contract,
  and a clearer official-names guide.
- Established a clear educational and editorial policy for the offline
  geographic dataset, documentation, examples, and contributions.
- Added a community code of conduct, factual-correction guidance, a dedicated
  documentation page, and automated policy and release-content checks.
- Removed an unused entity-classification field. The package now exposes only
  the sourced geographic fields it uses.
- Kept current affairs, opinion, comparisons of people or cultures, and
  speculative narrative outside the bundled dataset.
- Moved national symbols and reference facts to 0.6.0 for their own source review.

0.4.0 — Reserved tag; not published to PyPI
--------------------------------------------

- Preserved the public tag after it was created against the 0.3.1 commit before
  the country-identity candidate reached ``main``.
- Included the completed country-identity milestone in 0.5.0 rather than moving
  or reusing a public version tag.

0.3.1
-----

- Added :meth:`~pyworldatlas.Atlas.has_land_route` for explicit land-graph
  reachability checks.
- Added ``names`` and ``alpha2_codes`` conveniences to
  :class:`~pyworldatlas.BorderPathResult`.
- Added deterministic ``neighbors`` and ``border_counts`` flashcard topics.
- Expanded the border, discovery, API, serialization, and source guides with
  provenance, return-value, connectivity, and edge-case explanations.

0.3.0
-----

- Added 319 reviewed, undirected land-border relationships.
- Added neighbor lookup, shared neighbors, deterministic shortest border paths,
  crossing counts, land-connected components, and borderless-entity discovery.
- Added the immutable, serializable ``BorderPathResult`` model.
- Added a strict source-difference review gate using pinned GeoNames and Natural
  Earth snapshots.
- Upgraded the generated database to schema 3 and documented the complete
  border API, source policy, and limitations.
- Consolidated validation into focused executable examples and automated
  runtime, graph, and pipeline tests.

0.2.1
-----

- First production candidate for the complete 0.2 country-profile, coordinate,
  and discovery feature set.
- Supersedes the unpublished 0.2.0 candidate without changing its public API or
  bundled dataset.

0.2.0 — Unpublished candidate
-----------------------------

- Added rich profile fields for population snapshots, currency, language codes,
  calling codes, top-level domains, observed timezones, and capital coordinates.
- Added exact city lookup, coordinate validation, great-circle distance, initial
  bearing, spherical midpoint, and named-place distance helpers.
- Added five sourced official local-name records across Brazil and Switzerland.
- Added language and script metadata, formal names, explicit romanization
  fields, provenance, and no-fallback convenience methods.
- Added flag emoji, calculated population density, compact country references,
  and serializable discovery cards.
- Added deterministic country sampling and structured flashcards covering
  capitals, flags, codes, currencies, communications, regions, local names,
  and snapshot population/area facts.
- Upgraded the generated dataset to schema 2 while retaining the 0.1.0 country,
  capital, city, lookup, and collection behaviors.

0.1.0
-----

- Rebuilt the project from scratch around a standard-library runtime and one
  generated SQLite database.
- Added lookup, aliases, standard identifiers, and UN regions for 248 countries
  and areas.
- Added 241 primary-capital records and 6,265 major-city records from GeoNames,
  with explicit missing values for areas without usable capitals.
- Added a separate deterministic source-ingestion project with raw manifests,
  normalized records, provenance, validation, and reproducibility checks.
- Added clean-wheel installation tests, executable examples, and documentation
  generated from the installed wheel.
- Added automated all-record audits.
- Added Sphinx documentation with executable doctests.
