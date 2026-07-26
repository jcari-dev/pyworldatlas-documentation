PyWorldAtlas
============

.. container:: atlas-hero

   :atlas-kicker:`Offline · source-aware · made for learning`

   .. container:: atlas-hero-title

      Geography data that feels like ordinary Python.

   .. container:: atlas-hero-copy

      Explore country profiles, names and writing systems, capitals, cities,
      physical geography, climate classes, coordinates, distances, reviewed
      land neighbors, rankings, and learning tools from one bundled database.
      Built for developers, classrooms, and curious learners. No API key and
      no runtime download.

**Documented version:** 0.7.0 | **Dataset:** 2026.07.22.7 |
**Python:** 3.10–3.14 | **Profiles:** 248

.. raw:: html

   <nav class="atlas-project-links" aria-label="PyWorldAtlas links">
     <a class="atlas-project-link atlas-project-link-primary" href="playground.html">Open playground</a>
     <a class="atlas-project-link" href="api.html">API reference</a>
     <a class="atlas-project-link" href="https://github.com/jcari-dev/pyworldatlas">GitHub</a>
     <a class="atlas-project-link" href="https://pypi.org/project/pyworldatlas/">PyPI</a>
   </nav>

.. container:: atlas-stat-grid

   .. container:: atlas-stat

      **248**

      country and area profiles

   .. container:: atlas-stat

      **6,265**

      bundled populated places

   .. container:: atlas-stat

      **0**

      runtime dependencies

A small taste of the atlas
--------------------------

.. container:: atlas-flag-row

   |flag-br| Brazil · |flag-jp| Japan · |flag-ch| Switzerland ·
   |flag-cn| China · |flag-fr| France · |flag-ae| United Arab Emirates

Flag values are Unicode regional-indicator emoji derived from each alpha-2
code. The row above uses local documentation artwork for consistent display;
see :doc:`discovery` for the exact API and rendering contract.

Start with something interesting
--------------------------------

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     brazil = atlas.country("Brazil")
   ...     print(brazil.flag, brazil.name_in("pt"), "—", brazil.capital.name)
   ...     print(brazil.highest_point.name, f"{brazil.highest_point.elevation_m:,.0f} m")
   ...     print(", ".join(river.name for river in brazil.rivers[:3]))
   ...     print(brazil.climate.dominant_zone.code, brazil.climate.dominant_zone.name)
   🇧🇷 Brasil — Brasília
   Pico da Neblina 2,994 m
   Amazon, Río de la Plata/Paraná, Tocantins
   Aw Tropical, savannah

The installed wheel contains ordinary Python source and one read-only database.
Constructing :class:`~pyworldatlas.Atlas` never contacts a server and does not
load every country into memory.

See what you can build
----------------------

.. container:: atlas-card-grid

   .. container:: atlas-card atlas-card-blue

      .. rubric:: Meet a country

      Combine local names, flag emoji, capital, anthem title, motto, demonym,
      currency, languages, timezones, and source references in one typed
      profile. Start with :doc:`country_profile`.

   .. container:: atlas-card atlas-card-teal

      .. rubric:: Explore the physical world

      Read coastlines, area components, elevation extremes, source-listed
      rivers and lakes, and represented Köppen-Geiger classes. Visit
      :doc:`physical_geography`.

   .. container:: atlas-card atlas-card-gold

      .. rubric:: Measure between places

      Calculate great-circle distance, initial bearing, and spherical midpoint
      from cities, capitals, countries, or coordinates. Try
      :doc:`coordinates_distances`.

   .. container:: atlas-card atlas-card-teal

      .. rubric:: Follow land connections

      Discover reviewed neighbors, shared neighbors, shortest land-border
      paths, crossings, and connected components in :doc:`borders`.

   .. container:: atlas-card atlas-card-gold

      .. rubric:: Discover and compare

      Compose exact filters, inspect nearby capitals, and rank sourced or
      transparently derived values with :doc:`rankings`.

   .. container:: atlas-card atlas-card-blue

      .. rubric:: Teach and learn

      Create stable samples, deterministic flashcards, compact discovery cards,
      and Unicode-preserving JSON with :doc:`discovery` and
      :doc:`serialization`.

.. tip::

   Start with :doc:`explore` for a five-minute tour made entirely from
   executable examples.

Try these next
--------------

- :doc:`playground` — run the published package in your browser through
  fourteen guided, editable recipes.
- :doc:`recipes` — copy complete Python programs for profiles, comparisons,
  distances, climate, search, teaching, and JSON export.
- :doc:`physical_geography` — coastlines, elevation, rivers, lakes, climate,
  and physical rankings.
- :doc:`explore` — country postcards, rankings, nearby capitals, filters, and
  a repeatable quiz.
- :doc:`quickstart` — lookup, collections, names, coordinates, and borders in
  one guided session.
- :doc:`reference_facts` — anthem titles, reviewed mottos, demonyms, currencies,
  languages, timezones, postal formats, and provenance.
- :doc:`rankings` — exact filters, supported metrics, typed results, and distance
  semantics.

What is bundled
---------------

.. list-table:: Dataset 2026.07.22.7
   :header-rows: 1
   :widths: 62 38

   * - Records
     - Coverage
   * - Countries and areas
     - 248
   * - Primary capitals
     - 241 / 248
   * - Populated places
     - 6,265
   * - Selected local-language identities
     - 248 / 248
   * - Sourced English formal names
     - 240 / 248
   * - Anthem titles
     - 234 / 248
   * - Reviewed source-listed mottos
     - 32 / 248
   * - English demonym profiles
     - 227 / 248
   * - Country timezone profiles
     - 246 / 248, 417 records
   * - Country-language metadata
     - 722 records across 245 profiles
   * - Reviewed land-border relationships
     - 319
   * - Total-area profiles
     - 248 / 248
   * - Land area and coastline
     - 238 / 248 each
   * - Highest and lowest points
     - 240 / 248 each
   * - Source-listed river records
     - 188 across 80 profiles
   * - Source-listed lake records
     - 187 across 69 profiles
   * - Plain-language climate summaries
     - 240 / 248
   * - Köppen-Geiger climate profiles
     - 241 / 248

Designed for exploration
------------------------

PyWorldAtlas supports exact lookup and ranked search, immutable typed models,
Unicode local names and flag emoji, WGS84 coordinates, distance/bearing/midpoint
calculations, deterministic samples and flashcards, land-border paths, profile
filters, physical-feature searches, rankings, and nearest-capital queries.
Public results serialize to JSON-compatible dictionaries without losing their
source context.

Educational scope
-----------------

PyWorldAtlas provides offline factual geography for education and reference.
It does not provide political commentary or opinion. Values follow documented
source conventions, missing data remains explicit, and every field family has
a defined source role and publication boundary. Read :doc:`educational_principles`
for the formal policy and :doc:`data_sources` for exact provenance.

Install
-------

.. code-block:: console

   python -m pip install --upgrade pyworldatlas

The current source checkout can be installed with ``python -m pip install -e .``.

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Start here

   explore
   playground
   recipes
   quickstart
   why
   installation
   educational_principles

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Explore the atlas

   country_profile
   physical_geography
   reference_facts
   rankings
   local_names
   capitals_cities
   coordinates_distances
   borders
   discovery
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
