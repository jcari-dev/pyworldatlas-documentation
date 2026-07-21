Data sources and freshness
==========================

PyWorldAtlas separates source collection from package use. The development
pipeline downloads raw snapshots, records checksums, normalizes independent
records, validates them, and generates the SQLite database. The installed
runtime never contacts these services.

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
   codes, internet domains, elevation where present, timezone identifiers,
   GeoNames IDs, and an area fallback for this milestone.

**Official location**
   https://download.geonames.org/export/dump/

**Current snapshot**
   ``countryInfo.txt`` and ``cities15000.zip`` captured 2026-07-20 with SHA-256
   manifests.

**License**
   Creative Commons Attribution 4.0. See the repository's
   ``THIRD_PARTY_NOTICES.md`` for attribution.

**Known limitation**
   Capital feature codes do not express every multi-capital constitutional
   arrangement. Those roles are reviewed in later milestones.

**Current coverage**
   241 usable primary capitals and 6,265 populated places: records at or above
   100,000 population, plus retained capitals.

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
   Five names across Brazil and Switzerland. This is not full-world coverage.

Derived discovery values
------------------------

Flag emoji are calculated from the UN/ISO alpha-2 code. Population density is
the captured GeoNames population divided by the captured area value. Discovery
cards, deterministic samples, and flashcards only select, arrange, or calculate
from already attributed profile fields; they add no external country facts.

The sampling algorithm ranks M49 identifiers with SHA-256 and never calls a
remote service. Flashcard wording is package code; answers retain the
provenance, coverage, and freshness limits of their underlying profile fields.

Source priority in the 0.2.1 checkout
-------------------------------------

.. list-table::
   :header-rows: 1
   :widths: 34 33 33

   * - Field family
     - Primary source
     - Current fallback
   * - Identity and standard codes
     - UN M49
     - GeoNames cross-check
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
   * - Official local names
     - UNGEGN country-names list
     - None; uncovered countries return an empty tuple

Inspect sources in Python
-------------------------

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     sources = atlas.country("Japan").sources
   >>> [source.id for source in sources]
   ['geonames', 'un-m49']
