Data quality and limitations
============================

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
- Required language/script metadata and source locators for every local name.
- Unique country/language pairs and explicit romanization values.
- Non-negative population snapshots and validated profile collection types.
- Coordinate constructor bounds and known-route geodesic reference checks.
- Canonical undirected border edges with valid country endpoints and no self-edges.
- Exact accounting for every difference between the two pinned border sources.
- Symmetric neighbor behavior and shortest-path consistency across the graph.

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
   * - Official local names
     - 5
     - 2 reviewed countries
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
   * - Reviewed land-border relationships
     - 319
     - 315 cross-source agreements plus 4 reviewed inclusions
   * - Countries and areas with no accepted land border
     - 85
     - 248-entity package scope

Missing data is a valid value
-----------------------------

``None`` means the current sources did not provide a field or that its roadmap
milestone has not been implemented. It does not mean zero, false, or an inferred
fact. PyWorldAtlas never fills a gap with an unsourced assumption.

Interpretation cautions
-----------------------

- Population fields are source snapshots rather than a synchronized census.
- The GeoNames area value is a milestone fallback, not the final area-priority
  implementation.
- Release 0.1.0 selects one GeoNames primary capital per country; nuanced
  multi-capital roles arrive later.
- Seven areas have no usable primary-capital record in the current source
  intersection, so their capital is ``None``.
- GeoNames-only identities outside the captured UN M49 scope are excluded.
  This is a source-priority rule, not a statement about sovereignty.
- Political entity type is not classified by the current source model. Every
  profile therefore uses ``CountryStatus.OTHER``.
- Border relationships are topological claims, not boundary geometry. Border
  length, point-in-country, and map rendering remain outside this release.
- Political names and classifications follow documented source conventions and
  do not imply a position on disputed sovereignty.

Run the validation suite
------------------------

The maintainer command runs the runtime, graph, and pipeline tests:

.. code-block:: console

   python maintain.py test
