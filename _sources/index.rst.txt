PyWorldAtlas
============

PyWorldAtlas is a compact, source-aware world atlas for Python. It provides
typed country, capital, and city records from one bundled SQLite database and
works without an API key, runtime download, or third-party dependency.

**Documented version:** 0.2.1 | **Dataset:** 2026.07.20.1 | **Python:** 3.10–3.14 |
**Runtime dependencies:** 0

.. note::

   The 0.2.1 checkout contains 248 countries and areas from the captured UN M49
   scope, 241 GeoNames capital records, and 6,265 populated-place records. Later
   milestones deepen the available facts and geographic operations. Official
   local names currently have pilot coverage for Brazil and Switzerland.

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
- Use the :doc:`playground` to audit and explore every bundled record.
- Read :doc:`country_profile` for the complete current data model.
- Build lessons with :doc:`discovery` cards, stable samples, and flashcards.
- Explore the reviewed :doc:`local_names` records and coverage boundary.
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
- Official local short and formal names for the Brazil/Switzerland pilot.
- Rich profile fields including population snapshot, currency, calling codes,
  language codes, internet domain, observed timezones, and capital coordinates.
- Exact city lookup plus latitude/longitude distance, bearing, and midpoint calculations.
- Flag emoji, calculated density, compact discovery cards, deterministic country
  sampling, and structured geography flashcards.

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

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Start here

   why
   installation
   quickstart
   playground

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Explore the atlas

   country_profile
   discovery
   local_names
   capitals_cities
   coordinates_distances
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
