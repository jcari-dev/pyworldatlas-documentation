Data quality and limitations
============================

Quality means more than having a value: each field needs a defined source,
validation rule, coverage boundary, and honest missing-data behavior. This page
documents those guarantees and their limits.

Version 0.8 adds presentation, city-discovery, coordinate-display, and learning
helpers over the existing reviewed dataset. It introduces no new source layer
and does not fill missing country facts. Summaries omit unavailable values;
quiz choices are generated only from answers already present in covered
profiles.

Educational and editorial quality
---------------------------------

PyWorldAtlas provides offline factual geography for education and reference.
It does not provide political commentary or opinion. Every field needs a clear
learning purpose, a defined source role, and documented limitations. Missing
values are not replaced with unsupported assumptions.

The current dataset intentionally excludes current affairs, political opinion,
identity-based generalizations, comparisons of people or cultures, and
speculative narrative. New field families must satisfy the review in
:doc:`educational_principles` before collection begins.

Validation layers
-----------------

The current build checks:

- Required country identifiers and canonical names.
- Latitude from -90 through 90 and longitude from -180 through 180.
- Non-negative city population values.
- Valid coordinates for every stored capital and city record.
- Explicit missing values where no usable capital record exists.
- Unique country codes and GeoNames place identifiers.
- Source references for every profile.
- SQLite ``integrity_check`` and foreign-key consistency.
- Reproducible database checksums from identical snapshots.
- Valid language and ISO 15924 script codes, Unicode NFC text, and exact CLDR
  locale/XPath or UNGEGN PDF locators for every local identity.
- Exactly 248 unique country identity rows, explicit evidence kinds and
  language statuses, and source-only romanization values.
- Exactly 240 sourced English formal names, validated source records, exact
  override locators, normalized Unicode, and the expected eight-code gap set.
- Non-negative population snapshots and validated profile collection types.
- Exact pinned checksums and expected coverage for anthem, demonym, currency,
  language, timezone, and motto source layers.
- A decision for every captured national-motto statement, with no unreviewed
  statement entering the runtime database.
- Resolved English labels for every captured country-language code and exact
  accounting for the two profiles outside the timezone-table intersection.
- Typed ranking results, deterministic ordering, documented units, and known
  nearest-capital fixtures.
- Coordinate constructor bounds and known-route geodesic reference checks.
- Canonical undirected border edges with valid country endpoints and no self-edges.
- Exact accounting for every difference between the two pinned border sources.
- Symmetric neighbor behavior and shortest-path consistency across the graph.
- Exact pinned checksums and expected coverage for the structured physical
  source layer and derived Köppen-Geiger country snapshot.
- Non-negative land/water/coastline measurements, valid elevation points,
  unique physical-feature records, and internally consistent water percentages.
- Known Köppen-Geiger codes, shares from 0 through 100, deterministic descending
  share order, the exact seven-profile gap set, and the documented 0.1% threshold.

Coverage
--------

.. list-table:: Current checkout coverage
   :header-rows: 1
   :widths: 50 25 25

   * - Measure
     - Available
     - Milestone scope
   * - Countries and areas
     - 248
     - 248 UN M49 records
   * - Primary capitals
     - 241
     - 248 countries and areas
   * - Capital coordinates
     - 241
     - 241 stored capitals
   * - Populated-place records
     - 6,265
     - At least 100,000 population, plus retained capitals
   * - Country source references
     - 248
     - 248
   * - Selected local identity names
     - 248
     - 248 countries and areas, 80 languages, 21 scripts
   * - Sourced English formal names
     - 240
     - 195 distinct long forms and 45 source-equal short/formal forms
   * - Reviewed national official forms
     - 10
     - UNGEGN short/formal records replacing the matching CLDR display name
   * - Coordinate-bearing cities
     - 6,265
     - Bundled populated-place records
   * - Population snapshots
     - 248
     - 248 profiles
   * - Currency records
     - 247
     - 248 profiles
   * - Language-code collections
     - 245
     - 248 profiles
   * - Calling-code collections
     - 243
     - 248 profiles
   * - Country-code top-level domains
     - 248
     - 248 profiles
   * - Profiles with observed timezones
     - 242
     - Zones found on bundled places
   * - Country timezone profiles
     - 246
     - 417 records from the complete captured timezone table
   * - Postal-code formats
     - 176
     - Source display formats; regular expressions when provided
   * - Anthem titles
     - 234
     - Structured title fields only
   * - Reviewed source-listed mottos
     - 32
     - Included statements after exact decision review
   * - English demonym profiles
     - 227
     - Structured noun/adjective fields
   * - Country-language metadata
     - 722 records across 245 profiles
     - English name and likely script when available
   * - Reviewed land-border relationships
     - 319
     - 315 cross-source agreements plus 4 reviewed inclusions
   * - Countries and areas with no accepted land border
     - 85
     - 248-entity package scope
   * - Total-area profiles
     - 248
     - Factbook values with GeoNames fallback for source gaps
   * - Land-area profiles
     - 238
     - Structured source intersection
   * - Numeric water-area profiles
     - 233
     - Structured source intersection
   * - Coastline profiles
     - 238
     - Source-reported length, including explicit zero
   * - Highest and lowest points
     - 240 each
     - Named source point and elevation
   * - Mean-elevation profiles
     - 166
     - Source value when present
   * - Source-listed river records
     - 188 across 80 profiles
     - Major features listed by the source
   * - Source-listed lake records
     - 187 across 69 profiles
     - Major features listed by the source
   * - Plain-language climate summaries
     - 240
     - Compact source descriptions
   * - Köppen-Geiger climate profiles
     - 241
     - 1991–2020 raster classes above the 0.1% threshold

Missing data is a valid value
-----------------------------

``None`` means the current sources did not provide a field or that its roadmap
milestone has not been implemented. It does not mean zero, false, or an inferred
fact. PyWorldAtlas never fills a gap with an unsourced assumption.

For ``Country.formal_name``, the eight explicit gaps are AX, BQ, GF, GP, MQ,
RE, UM, and YT. For covered profiles the formal value may legitimately equal
the short name; use ``has_distinct_formal_name`` only when that distinction is
the question.

Interpretation cautions
-----------------------

- Population fields are source snapshots rather than a synchronized census.
- Total area uses the structured Factbook value when available and the captured
  GeoNames value as an explicit fallback for profiles outside that intersection.
- Release 0.1.0 selects one GeoNames primary capital per country; nuanced
  multi-capital roles arrive later.
- Seven areas have no usable primary-capital record in the current source
  intersection, so their capital is ``None``.
- GeoNames-only identities outside the captured UN M49 scope are excluded.
  This is a source-scope decision.
- The public model does not expose an entity-recognition or legal-status
  classification.
- Anthem records contain titles only. Lyrics, audio, contributor credits, and
  adoption histories are not bundled.
- Motto coverage is intentionally partial. A missing motto means no statement
  entered the reviewed layer; it is not a claim that no motto exists.
- Language metadata records associations captured by GeoNames. They are not
  legal determinations of official-language status.
- Border relationships are topological claims, not boundary geometry. Border
  length, boundary geometry, point-in-country, and map rendering remain outside
  this release.
- River and lake tuples are source-listed major features, not exhaustive
  inventories. Empty tuples do not assert that a feature is absent.
- A river length or lake area describes the complete source feature, including
  a shared feature, not its portion inside one country profile.
- Köppen-Geiger shares are generalized raster/polygon estimates for broad
  education. They are not local forecasts, legal boundaries, or site-level
  classifications; classes below 0.1% are omitted.
- Highest and lowest points preserve the source label and measurement. They do
  not create a separate “major mountains” classification.
- Names and classifications follow documented source conventions.
- Terms such as *country* and *area* are practical dataset labels.

Run the validation suite
------------------------

The maintainer command runs the runtime, graph, and pipeline tests:

.. code-block:: console

   python maintain.py test
