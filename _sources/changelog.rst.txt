Changelog
=========

This record summarizes user-visible package, data, documentation, and release
changes. The newest published release appears first.

0.12.1
------

A more welcoming atlas, honest licensing, and up-to-date documentation.

- **Welcome:** a "Look up anything" search on the home page, starting points
  for students, teachers, and developers, and a new :doc:`teaching` guide.
- **Playground:** Surprise me, a five-question quiz with a score, and three
  challenge recipes. See :doc:`playground`.
- **Shorter pages:** a shorter README, "In 30 seconds" examples, real output in
  guides, and Copy buttons on every code block.
- **Maps:** place markers rest on the ground; the blue layer is now "Water and
  ice".
- **Licensing:** the package metadata reads
  ``MIT AND CC-BY-4.0 AND Unicode-3.0 AND CC0-1.0``, matching the data it
  ships. The wheel includes the CC BY 4.0 text and the third-party notices,
  which list every source with its terms and the changes made.
- **Removed:** six fields that were always empty (``Area.disputed_km2``,
  ``Geography.centroid``, ``CountryCodes.wikidata``,
  ``Capital.largest_city``, ``Capital.alternate_names``,
  ``City.alternate_names``) and the ``include_history`` argument of
  ``Country.to_dict`` and ``to_json``, which had no effect.
- **Documentation:** a refreshed home page, package description, quickstart,
  installation guide, and API overview.

0.12.0
------

The world in numbers, landmarks, and a new playground.

- **Statistics pack:** eleven basic World Bank indicators for every country
  since 1960, such as population, life expectancy, forest area, and access to
  electricity. Time series, one-line charts, plain-language summaries, and
  sorting without judgement. See :doc:`statistics`.
- **Landmarks pack:** airports with scheduled flights and UNESCO World
  Heritage sites, found by code, name, category, or distance. See
  :doc:`landmarks`.
- **New playground:** look up any country or place and open the Python behind
  each answer; four new recipes. See :doc:`playground`.
- **Learning:** place quizzes (kinds of places, which is higher, which is
  closer to the equator) and antipodes ("dig through the Earth").
- **Runs on small computers:** every place pack now unpacks in under 300 MB of
  memory, and ``import pyworldatlas`` is faster.

0.11.1
------

Travel basics and the sun.

- **Travel basics** for 245 countries and areas: ``Country.travel`` gives plug
  types (IEC letters A to N), the household mains voltage and frequency, and
  the driving side, from CC0 Wikidata statements. Country summaries show a
  "Travel" line, and three new learning topics (``driving_sides``,
  ``plug_types``, ``mains_electricity``) feed flashcards and quizzes.
- **Sun and seasons:** :meth:`~pyworldatlas.Atlas.sun` and ``pyworldatlas
  sun`` give sunrise, sunset, day length, and the noon sun height for any
  place and date, worked out offline. See :doc:`sun`.
- Dataset ``2026.10.27.1``, schema 8.

0.11.0
------

Every place on Earth.

- **A school atlas in every install.** 207,664 places chosen by educational
  value, in about 2 MB: every country, region, and town of 5,000 people or
  more, and the mountains, volcanoes, lakes, rivers, deserts, islands, and
  landmarks people around the world know. Search by local or English name with
  :meth:`~pyworldatlas.Atlas.search_places` and
  :meth:`~pyworldatlas.Atlas.place`, and list what is nearby with
  :meth:`~pyworldatlas.Atlas.places_near`.
- **11 million places with packs.** ``pyworldatlas get places-explorer
  places-world`` adds every other place in the GeoNames gazetteer.
- **One search for everything.** :meth:`~pyworldatlas.Atlas.lookup` and
  ``pyworldatlas find`` return countries first, then cities, regions,
  mountains, lakes, and landmarks.
- **Places on 3D maps.** Maps mark each country's best-known towns,
  mountains and islands, lakes and seas, and landmarks as layers with their
  own shape, color, and toggle, plus a **Find a place** box.
  :meth:`~pyworldatlas.Atlas.places_in` lists the same places.
- **New commands:** ``pyworldatlas find``, ``place``, and ``near``.
- Places are stored in a compact column format (6 to 10 bytes each) with only
  the standard library and unpacked once into a local index on first search.

0.10.0
------

A big step toward 1.0. The public API is now guarded by a snapshot test, so
any change to it is deliberate and listed here.

- **Instant lookups.** Every ``Atlas`` keeps its own caches. Ranking by border
  count, neighbor quizzes, and nearest-place searches drop from hundreds of
  milliseconds to a few. Closing one atlas no longer slows the others.
- **Maps with zero dependencies.** The 3D viewer is part of PyWorldAtlas and
  needs no Plotly. Map data installs once as a checksummed data pack with
  ``pyworldatlas get maps`` (or ``maps-lite``), or offline from a file with
  ``pyworldatlas add``. All 496 maps match the 0.9 output.
- **A new map page.** The map fills the window beside one control panel (color,
  terrain height, labels, rotation, reset view, Save PNG), with light and dark
  themes and a phone layout.
- **Accessible maps and docs.** Maps work from the keyboard, carry a
  plain-language description for screen readers, and announce changes. The
  documentation adds a skip link and WCAG AA colors.
- **Everyday country names** such as "UK", "Britain", "Burma", "UAE", "DRC",
  "Netherlands", "The Gambia", and "St. Lucia" now resolve. Dataset
  ``2026.10.26.1`` adds the reviewed aliases.
- **For developers:** a typed package (``py.typed``), notebook fact cards,
  ``Atlas(data_dir=...)``, :mod:`pyworldatlas.packs`, ``CountryMap.to_dict()``,
  and plain-text ``llms.txt`` documentation indexes.
- **Packaging:** one PyPI project. The ``pyworldatlas-mapview`` and
  ``pyworldatlas-mapdata-*`` packages are retired; the ``maps`` extras remain
  so older install commands still work. See :doc:`migration`.

0.9.5
-----

- Added an installed ``pyworldatlas`` command with version, country lookup,
  search, dataset metadata, JSON output, and concise error messages.
- Distinguished missing country queries from genuinely ambiguous exact names,
  and added regression coverage for both outcomes.
- Strengthened clean-wheel checks so the console command and module command
  are exercised from the built artifact before release.
- Reviewed the public documentation, examples, docstrings, package metadata,
  repository guidance, and release instructions for accuracy and readability.

0.9.4
-----

- Added play, pause, and adjustable-speed rotation controls to standalone 3D
  maps while respecting reduced-motion preferences.
- Added an explicit high-resolution PNG download for the current map view and
  configured Plotly's existing image action to use the same crisp output.
- Added ``auto_rotate`` and ``rotation_speed`` options to HTML export and
  browser display without changing map data or core-package dependencies.
- Added a maintainer GIF utility for producing optimized project-page
  animations from real map figures.
- Expanded the README, map guide, API documentation, and release tests around
  motion, export, accessibility, and documentation media.

0.9.3
-----

- Reorganized the API reference around common tasks and gave every generated
  class, method, and property a consistent, readable layout.
- Clarified first-time installation, optional map editions, and the separate
  command for upgrading an existing installation.
- Refreshed the Explore section and polished the shared GitHub and PyPI project
  page without changing the public API or dataset.
- Kept documentation deployment aligned with PyPI so the browser playground
  never advertises an unpublished package version.

0.9.2
-----

- Added terrain-height controls and selectable capital and river labels to the
  interactive 3D map viewer.
- Strengthened capital markers and labels for clear presentation at varied
  camera angles.
- Corrected the downstream Þjórsá label in the Standard Iceland map using a
  reviewed national source.

0.9.1
-----

- Published the optional map viewer and both global map editions through
  isolated Trusted Publishing jobs.
- Kept the 0.9 map API and dataset unchanged while correcting the coordinated
  package release configuration.

0.9.0
-----

- Added optional offline 3D country maps through
  :meth:`~pyworldatlas.Atlas.map` and
  :meth:`pyworldatlas.maps.CountryMap.show`.
- Added Overview and Standard global editions covering all 248 profiles with
  20 and 5 arc-minute elevation sampling.
- Added elevation and Köppen-Geiger climate surface modes, generalized
  outlines, source-provided river centerlines, and primary-capital markers.
- Added standalone offline HTML export and direct Plotly figure access.
- Kept the core wheel dependency-free through separate viewer and map-data
  distributions.
- Added deterministic builders, integrity checks, complete map coverage tests,
  clean multi-wheel installation, and coordinated release automation.
- Added complete map installation, source, resolution, and interpretation
  guidance.
- Added a real Standard-edition Iceland render to the shared README and
  documentation front page, linked directly to this map guide.

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

0.4.0 (reserved tag, not published to PyPI)
-------------------------------------------

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

0.2.0 (unpublished candidate)
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
