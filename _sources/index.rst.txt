PyWorldAtlas
============

PyWorldAtlas is a compact, source-aware world atlas for Python. It provides
typed country, capital, and city records from one bundled SQLite database and
works without an API key, runtime download, or third-party dependency.

It is a purely educational package for offline access to factual geographic
data. It does not provide political commentary or opinion. See
:doc:`educational_principles` for the formal policy.

**Documented version:** 0.5.0 | **Dataset:** 2026.07.21.5 | **Python:** 3.10–3.14 |
**Runtime dependencies:** 0

.. note::

   The 0.5.0 release contains 248 countries and areas, 241 capital records,
   6,265 populated-place records, and 319 reviewed land-border relationships.
   Local identity names cover all 248 records across 80 languages and 21
   scripts. Ten selected records currently include reviewed UNGEGN national
   short and formal names. A separate sourced English formal-name layer covers
   240 profiles.

Installation
------------

Install the current source checkout from the repository root:

.. code-block:: console

   python -m pip install -e .

Quick example
-------------

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()
   >>> japan = atlas.country("Japan")
   >>> japan.capital.name
   'Tokyo'
   >>> japan.capital.coordinates.as_tuple()
   (35.6895, 139.69171)
   >>> atlas.close()

The installed wheel contains ordinary Python source and one read-only SQLite
database. Constructing :class:`~pyworldatlas.Atlas` never contacts a server and
does not load the complete dataset into memory.

Documentation
-------------

- Follow the :doc:`quickstart` for a guided first session.
- Read :doc:`educational_principles` for the project's purpose and publication
  boundaries.
- Explore immediate neighbors and shortest land routes in :doc:`borders`.
- Read :doc:`country_profile` for the complete current data model.
- Build lessons with :doc:`discovery` cards, stable samples, and flashcards.
- Explore complete :doc:`local_names` coverage and its evidence levels.
- See :doc:`data_sources` and :doc:`data_quality` for provenance and limitations.
- Consult the :doc:`api` for the generated public reference.

What works in this checkout
---------------------------

- Exact lookup by common name, alias, ISO alpha-2, ISO alpha-3, and M49 code.
- Accent- and case-insensitive country search.
- Immutable typed country, capital, city, coordinate, and source objects.
- Country collection behavior: indexing, membership, length, and iteration.
- UN region and subregion filters.
- Primary capitals with WGS84 coordinates, population, timezone, and GeoNames ID.
- Populated places at or above 100,000 population, plus retained capitals.
- Explicit ``None`` for areas without a usable primary-capital record.
- JSON-compatible serialization and explicit source references.
- One sourced local-language identity for every country and area, plus reviewed
  national official short/formal names, romanization, and exact source locators
  where UNGEGN evidence is complete.
- Sourced English formal names for 240 profiles, exact long-name lookup, and
  explicit ``None`` values outside the captured source intersection.
- Rich profile fields including population snapshot, currency, calling codes,
  language codes, internet domain, observed timezones, and capital coordinates.
- Exact city lookup plus latitude/longitude distance, bearing, and midpoint calculations.
- Flag emoji, calculated density, compact discovery cards, deterministic country
  sampling, and structured geography flashcards.
- Reviewed land neighbors, shared neighbors, shortest border paths, crossing
  counts, reachability, connected components, borderless-entity discovery, and
  graph flashcards.

Current coverage
----------------

.. list-table:: Bundled dataset
   :header-rows: 1

   * - Records
     - Count
   * - Countries and areas
     - 248
   * - Primary capitals
     - 241 / 248
   * - Capital coordinates
     - 241 / 241
   * - Populated places
     - 6,265, including retained capitals
   * - Selected local-language identities
     - 248 / 248
   * - Sourced English formal names
     - 240 / 248
   * - Reviewed national official short/formal names
     - 10 / 248
   * - Reviewed land borders
     - 319 undirected relationships
   * - Countries and areas without an accepted land border
     - 85

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Start here

   why
   educational_principles
   installation
   quickstart

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Explore the atlas

   country_profile
   discovery
   local_names
   capitals_cities
   coordinates_distances
   borders
   searching
   serialization

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Data and trust

   data_sources
   data_quality
   _generated/project_status
   roadmap

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Reference

   api
   changelog
