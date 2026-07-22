Data sources and freshness
==========================

PyWorldAtlas separates source collection from package use. The development
pipeline downloads raw snapshots, records checksums, normalizes independent
records, validates them, and generates the SQLite database. The installed
runtime never contacts these services.

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
   retained with the source capture for review.

**Official location**
   https://www.naturalearthdata.com/downloads/50m-cultural-vectors/

**Current snapshot**
   Boundary lines version 5.1.0 and country/map-unit archives version 5.1.1,
   captured 2026-07-21 with SHA-256 checksums.

**Terms**
   Natural Earth data is in the public domain. The official terms permit
   personal, educational, and commercial use without permission.

**Known limitation**
   Natural Earth is generalized cartographic data. Very small territories and
   enclaves may not retain a shared segment at 1:50m, and its map units express
   a documented map convention. It is used as a cross-check, not as an
   unreviewed authority.

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

CIA World Factbook country-name profiles
----------------------------------------

**Purpose**
   Base English formal-name layer, national-anthem titles, and English demonym
   noun/adjective forms.

**Locations**
   https://www.cia.gov/the-world-factbook/ and
   https://github.com/factbook/factbook.json

**Source revision**
   ``factbook.json`` commit
   ``8662a8b17a784841ab4528631b04090eb2f183eb``. The standard-library
   extractor retains only structured country-name, national-anthem-title, and
   nationality fields. It excludes lyrics, audio, contributor credits,
   adoption histories, and profile narrative text.

**Terms**
   Public domain under the CIA site policy and the structured repository's
   public-domain dedication.

**Current coverage**
   240 profiles: 195 distinct long forms and 45 cases where the source supplies
   the short form as the formal identity. AX, BQ, GF, GP, MQ, RE, UM, and YT
   remain outside the formal-name source intersection. The same capture yields
   234 anthem-title profiles and 227 English demonym profiles.

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

Source priority in the 0.6.0 release
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
     - GeoNames milestone fallback
     - World Bank planned later
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

Inspect sources in Python
-------------------------

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     sources = atlas.country("Japan").sources
   >>> [source.id for source in sources]
   ['cia-world-factbook-2025', 'geonames', 'geonames-timezones-2026-07-22', 'natural-earth', 'reviewed-borders', 'un-m49', 'ungegn-country-names-2017', 'unicode-cldr-48.2-reference']

``Country.sources`` is a profile-level summary. Fact-bearing 0.6 models also
expose their direct ``source``. Use
``country.local_name(language_code).source`` and ``source_locator`` for the
exact local-identity record provenance and inspect ``kind`` before describing a
value as a national official name.
