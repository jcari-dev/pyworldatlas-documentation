Data sources and freshness
==========================

PyWorldAtlas separates source collection from package use. The development
pipeline downloads raw snapshots, records checksums, normalizes independent
records, validates them, and generates the SQLite database. The installed
runtime never contacts these services.

The 0.9 core reuses dataset ``2026.07.22.7``. Optional map editions add
separately installed, integrity-checked visualization records derived from
pinned elevation, climate, outline, and river snapshots. Neither the core nor
the installed map viewer contacts a source service at runtime.

Field-specific source policy
----------------------------

Each source is selected for a specific field. The project prefers established
standards bodies, international statistical and naming publications, openly
licensed geographic datasets, and primary institutional records when they are
appropriate for that field. Commentary, anonymous compilations, unsupported
claims, and advocacy material are not used as dataset authorities.

No source is presented as universally neutral or complete. A source may reflect
a particular date or naming convention. PyWorldAtlas records those limitations,
uses independent cross-checks where useful, and publishes review decisions.
Including a source value is not an endorsement of the source organization or a
broader interpretation. See :doc:`educational_principles`.

United Nations M49
------------------

**Purpose**
   Canonical country and area identities, M49 numeric codes, ISO alpha-2 and
   alpha-3 codes, regions, and subregions.

**Official location**
   https://unstats.un.org/unsd/methodology/m49/

**Current snapshot**
   Captured 2026-07-20 as raw HTML with a SHA-256 manifest.

**Known limitation**
   Formal statistical names are not always the most familiar English atlas
   names. Reviewed common-name mappings retain the formal source value.

**Current scope**
   248 country and area identities. GeoNames-only identities outside the
   captured UN M49 scope are excluded rather than inferred.

GeoNames
--------

**Purpose**
   Capitals, populated places, WGS84 coordinates, city population snapshots,
   country population snapshots, currency metadata, language codes, calling
   codes, internet domains, postal-code formats, elevation where present,
   timezone identifiers, GeoNames IDs, and an area fallback for this milestone.

**Official location**
   https://download.geonames.org/export/dump/

**Current snapshot**
   ``countryInfo.txt`` and ``cities15000.zip`` captured 2026-07-20 with SHA-256
   manifests. The complete ``timeZones.txt`` table was captured 2026-07-22 in
   a separate manifest.

**License**
   Creative Commons Attribution 4.0. See the repository's
   ``THIRD_PARTY_NOTICES.md`` for attribution.

**Known limitation**
   Capital feature codes do not express every multi-capital constitutional
   arrangement. Those roles are reviewed in later milestones.

**Current coverage**
   241 usable primary capitals and 6,265 populated places: records at or above
   100,000 population, plus retained capitals. The timezone table covers 246
   profiles with 417 records; 176 profiles have postal-code formats.

Natural Earth
-------------

**Purpose**
   Independent land-border topology derived from shared segments in the 1:50m
   Admin 0 map-unit polygons. Country polygons and land boundary lines are also
   retained with the source capture for review. The map-unit polygons support
   build-time aggregation of Köppen-Geiger raster cells into country profiles.
   Optional maps use pinned 1:10m map units and river centerlines; Overview
   uses the smaller 1:50m river layer.

**Official location**
   https://www.naturalearthdata.com/downloads/50m-cultural-vectors/

**Current snapshot**
   Boundary lines version 5.1.0 and country/map-unit archives version 5.1.1,
   captured 2026-07-21 with SHA-256 checksums. The 1:10m map-unit and river
   archives used by optional maps were captured 2026-07-28; the 1:50m river
   archive was captured 2026-07-21.

**Terms**
   Natural Earth data is in the public domain. The official terms permit
   personal, educational, and commercial use without permission.

**Known limitation**
   Natural Earth is generalized cartographic data. Very small territories and
   enclaves may not retain a shared segment at 1:50m, and its map units express
   a documented map convention. It is used as a cross-check, not as an
   unreviewed authority. Map geometry is simplified into private display
   records and is not exposed as GeoJSON or public boundary coordinates.

Reviewed border decisions
-------------------------

The accepted graph begins with the 315 relationships on which GeoNames and
Natural Earth agree. ``build_data/reviewed/border_decisions.csv`` accounts for
all six source differences: four explicit inclusions and two exclusions. Any
new unreviewed difference fails the build. The resulting dataset contains 319
undirected land-border relationships.

Unicode CLDR 48.2
-----------------

**Purpose**
   One localized territory display name and a deterministic language selection
   for every country or area, plus English currency/language labels, common
   currency symbols, currency minor-unit digits, and likely language scripts.

**Official location**
   https://unicode.org/Public/cldr/48.2/

**Current snapshot**
   A compact 248-row extraction from ``cldr-common-48.2.zip``. The source
   archive URL and checksum, Unicode License v3, extractor, selected locale,
   and exact XPath locator are retained. A second deterministic compact
   extraction contains only the currency and language metadata used by the
   current profiles.

**Current coverage**
   248 / 248 local identity names across 80 languages and 21 scripts. Of these,
   244 use an official, de-facto official, or regional official language. Four
   remote or uninhabited areas retain explicit administrative or
   non-applicable status.

CLDR territory names are interface/display labels. They are not automatically
treated as diplomatic formal names.

IANA Language Subtag Registry
-----------------------------

**Purpose**
   English description fallback for language codes used by the captured
   GeoNames metadata but not labelled by CLDR.

**Official location**
   https://www.iana.org/assignments/language-subtag-registry/

**Current snapshot**
   Registry file dated 2026-06-14 and captured 2026-07-22 with an exact
   checksum. No registry value is treated as an official-language claim.

**Terms**
   IANA and IETF state that applicable rights in their protocol registry data
   are dedicated under CC0 1.0. See https://www.iana.org/help/licensing-terms.

CIA World Factbook structured country profiles
------------------------------------------------

**Purpose**
   Base English formal-name layer, national-anthem titles, English demonym
   noun/adjective forms, total/land/water area, coastline, mean elevation,
   named highest and lowest points, source-listed major rivers and lakes, and
   short climate descriptions.

**Locations**
   https://www.cia.gov/the-world-factbook/ and
   https://github.com/factbook/factbook.json

**Source revision**
   ``factbook.json`` commit
   ``8662a8b17a784841ab4528631b04090eb2f183eb``. The standard-library
   extractor retains only the documented identity, reference, and structured
   physical-geography fields. It excludes lyrics, audio, contributor credits,
   adoption histories, political narrative, and general profile narrative.

**Terms**
   Public domain under the CIA site policy and the structured repository's
   public-domain dedication.

**Current coverage**
   240 profiles: 195 distinct long forms and 45 cases where the source supplies
   the short form as the formal identity. AX, BQ, GF, GP, MQ, RE, UM, and YT
   remain outside the formal-name source intersection. The same capture yields
   234 anthem-title profiles and 227 English demonym profiles. Physical coverage
   is 238 total-area, land-area, and coastline profiles; 233 numeric water-area
   profiles; 240 highest-point, lowest-point, and climate-summary profiles; 166
   mean-elevation profiles; 188 river records across 80 profiles; and 187 lake
   records across 69 profiles.

Köppen-Geiger climate classification maps
------------------------------------------

**Purpose**
   Broad physical-climate classification for country and area profiles.

**Official publication and data**
   https://doi.org/10.1038/s41597-023-02549-6 and
   https://doi.org/10.6084/m9.figshare.21937571.v1

**Current snapshot**
   The 0.1-degree 1991–2020 historical raster and its 30-class legend from
   Beck et al. dataset version 1. The source archive, compact inputs, extractor,
   and generated country-zone snapshot all have pinned checksums.

**Terms**
   The Figshare data release is dedicated under CC0 1.0. The accompanying
   Scientific Data article documents the method and validation.

**Derivation**
   The development extractor samples raster cell centres against pinned Natural
   Earth 1:50m map-unit polygons, weights represented cells by latitude, groups
   them by country profile, and omits classes below 0.1% of represented area.
   It publishes rounded class shares, the 1991–2020 reference period, source
   resolution, threshold, and provenance. The runtime does not load the raster
   or polygon files.

**Current coverage and limits**
   241 / 248 profiles. BV, GI, MH, MV, TK, TV, and UM have no represented raster
   cells after the pinned geometry/intersection rules. Class shares are
   generalized, area-weighted estimates suitable for broad education; they are
   not a local forecast or property-boundary result.

NOAA NCEI ETOPO 2022
--------------------

**Purpose**
   Elevation surfaces for the optional Overview and Standard 3D map editions.

**Official dataset and access service**
   https://doi.org/10.25921/fd45-gt74 and the NOAA PIFSC ERDDAP dataset
   ``ETOPO_2022_v1_60s``.

**Current snapshot**
   The global 60 arc-second ice-surface elevation model, sampled every five
   source cells and captured 2026-07-28 as NetCDF classic with a SHA-256
   manifest. Standard retains 5 arc-minute sampling; Overview uses 20
   arc-minutes.

**Terms and limits**
   CC0 1.0. Heights use the EGM2008 vertical reference in metres, positive
   upward. These are generalized educational relief surfaces, not navigation,
   engineering, hazard, property, or site-level elevation data.

Wikidata national-motto statements
----------------------------------

**Purpose**
   A conservative reviewed layer of source-listed national motto text and
   selected labels.

**Official locations**
   https://query.wikidata.org/sparql and
   https://www.wikidata.org/wiki/Wikidata:Licensing

**Current snapshot**
   A 2026-07-22 SPARQL response containing item-valued national-motto
   statements, statement ranks, and multilingual labels. The exact query,
   response checksum, and statement IDs are retained.

**Terms**
   Wikidata structured data is released under Creative Commons CC0 1.0.

**Review boundary**
   Every captured statement has an explicit include or exclude decision in
   ``build_data/reviewed/national_motto_decisions.csv``. Thirty-two profiles
   are included. The runtime does not infer constitutional, statutory,
   traditional, or current legal status, and it does not ingest tourism slogans.

United Nations Protocol and Liaison Service
-------------------------------------------

**Purpose**
   Five short current English formal-name excerpts where the final Factbook
   snapshot differs from current UN usage.

**Official document**
   *Official Names of the United Nations Membership*, dated 2025-02-05.
   The source PDF is not redistributed; its URL, checksum, and used page
   locators are recorded in the manifest and reviewed override table.

**Official location**
   https://www.un.org/dgacm/sites/www.un.org.dgacm/files/Documents_Protocol/officialnamesofcountries.pdf

**Current scope**
   Afghanistan, Italy, Niger, Türkiye, and Viet Nam.

**Review-only comparison**
   A current UNTERM country-name export was inspected for the 193 UN-member
   entries. It is not redistributed, and no package record is sourced from the
   workbook.

Wikidata official-name statements
---------------------------------

**Purpose**
   Three exact reviewed English formal-name corrections.

**Current snapshot**
   A 2026-07-21 SPARQL result with the exact query, file checksum, statement
   IDs, ranks, values, and qualifiers retained.

**Official locations**
   https://query.wikidata.org/sparql and
   https://www.wikidata.org/wiki/Wikidata:Licensing

**Terms**
   Wikidata structured data is released under Creative Commons CC0 1.0.

**Current scope**
   Guyana, Saint Kitts and Nevis, and Myanmar. Wikidata is not used as an
   unreviewed bulk source.

UNGEGN List of Country Names
----------------------------

**Purpose**
   National official short and formal country names, with language context.

**Official location**
   https://unstats.un.org/unsd/ungegn/working_groups/wg1.cshtml

**Current snapshot**
   ``E/CONF.105/13/CRP.13`` dated 2017-07-17, captured as the exact PDF with a
   SHA-256 manifest. Reviewed rows retain entry and page locators.

**Current coverage**
   Ten selected records with reviewed national official short and formal
   names. This development batch is not complete local national-official
   coverage.

Derived discovery values
------------------------

Flag emoji are calculated from the UN/ISO alpha-2 code. Population density is
the captured GeoNames population divided by the captured area value. Discovery
cards, deterministic samples, and flashcards only select, arrange, or calculate
from already attributed profile fields; they add no external country facts.

The sampling algorithm ranks M49 identifiers with SHA-256 and never calls a
remote service. Flashcard wording is package code; answers retain the
provenance, coverage, and freshness limits of their underlying profile fields.
Neighbor and border-count flashcards are calculated from the reviewed graph and
introduce no additional border claims.

Source priority in the 0.9.0 release
------------------------------------

.. list-table::
   :header-rows: 1
   :widths: 34 33 33

   * - Field family
     - Primary source
     - Current fallback
   * - Identity and standard codes
     - UN M49
     - GeoNames cross-check
   * - English long/formal name
     - CIA World Factbook country-name fields
     - Five reviewed UN Protocol excerpts and three Wikidata CC0 statements
   * - Region and subregion
     - UN M49
     - None
   * - Capital and coordinates
     - GeoNames
     - None
   * - Populated places
     - GeoNames
     - None
   * - Total area
     - CIA World Factbook structured area field
     - GeoNames for profiles outside the source intersection
   * - Land/water area, coastline, elevation extremes, mean elevation
     - CIA World Factbook structured physical fields
     - None
   * - Source-listed major rivers and lakes
     - CIA World Factbook structured physical-feature fields
     - None; missing lists remain empty rather than inferred
   * - Plain-language climate summary
     - CIA World Factbook climate field
     - None
   * - Köppen-Geiger climate classes and shares
     - Beck et al. 1991–2020 raster aggregated with Natural Earth map units
     - None
   * - Local-language display name
     - Unicode CLDR 48.2
     - None; all 248 records are covered
   * - National official short/formal name
     - UNGEGN country-names list
     - CLDR display name remains available but is not promoted to a formal name
   * - Anthem title and English demonym
     - CIA World Factbook structured fields
     - None
   * - Reviewed source-listed motto
     - Wikidata item-valued statements
     - Explicit include/exclude review; no inferred legal status
   * - Currency and language labels
     - Unicode CLDR 48.2
     - IANA description fallback for missing language labels
   * - Country timezone and postal format
     - GeoNames
     - None
   * - Land-border relationships
     - GeoNames and Natural Earth agreement
     - Explicit reviewed decision for each source difference
   * - Optional map elevation
     - NOAA NCEI ETOPO 2022
     - None
   * - Optional map display outlines and rivers
     - Natural Earth
     - Overview uses the smaller 1:50m river layer

Inspect sources in Python
-------------------------

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     sources = atlas.country("Japan").sources
   >>> [source.id for source in sources]
   ['cia-world-factbook-2025', 'geonames', 'geonames-timezones-2026-07-22', 'koppen-geiger-1991-2020', 'natural-earth', 'reviewed-borders', 'un-m49', 'ungegn-country-names-2017', 'unicode-cldr-48.2-reference']

``Country.sources`` is a profile-level summary. Fact-bearing models also
expose their direct ``source``. Use
``country.local_name(language_code).source`` and ``source_locator`` for the
exact local-identity record provenance and inspect ``kind`` before describing a
value as a national official name. Physical records expose their direct source
through ``country.physical.source``, ``country.climate.summary_source``, and
``country.climate.classification_source``.
