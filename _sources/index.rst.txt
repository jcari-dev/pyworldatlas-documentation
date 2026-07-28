PyWorldAtlas
============

.. container:: atlas-hero

   .. container:: atlas-hero-text

      :atlas-kicker:`Offline · source-aware · made for learning`

      .. container:: atlas-hero-title

         Geography data that feels like ordinary Python.

      .. container:: atlas-hero-copy

         Explore country profiles, names and writing systems, capitals, cities,
         physical geography, climate classes, optional interactive 3D maps,
         coordinates, distances, reviewed land neighbors, rankings, and learning
         tools from one bundled database.
         Built for classrooms, curious learners, and developers. No API key and
         no runtime download.

   .. container:: atlas-hero-map

      .. image:: /_static/iceland-standard-map.svg
         :alt: PyWorldAtlas Standard 3D elevation map of Iceland
         :target: maps.html

**Documented version:** 0.9.0 | **Dataset:** 2026.07.22.7 |
**Python:** 3.10–3.14 | **Profiles:** 248

.. raw:: html

   <nav class="atlas-project-links" aria-label="PyWorldAtlas links">
     <a class="atlas-project-link atlas-project-link-primary" href="playground.html">Open playground</a>
     <a class="atlas-project-link" href="maps.html">3D maps</a>
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

Open the terrain
----------------

.. container:: atlas-map-showcase

   .. image:: /_static/iceland-standard-map.svg
      :alt: PyWorldAtlas Standard 3D elevation map of Iceland
      :target: maps.html

   .. container:: atlas-map-showcase-copy

      **Iceland in the Standard map edition.** This is real package output,
      shown at an angled elevation view with the coastline, Reykjavík, a river
      overlay, and source notes. Select the image for the complete map guide.

.. code-block:: python

   from pyworldatlas import Atlas

   with Atlas() as atlas:
       atlas.map("Iceland").show()

The map opens as a rotatable local browser view. Switch between Elevation and
Climate, zoom into the surface, or export a standalone HTML file. Install it
with ``python -m pip install "pyworldatlas[maps]"``.

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

   .. container:: atlas-card atlas-card-blue

      .. rubric:: Open the terrain

      Launch an offline, rotatable country surface with elevation, climate,
      rivers, and the capital in one call. See :doc:`maps`.

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
      multiple-choice questions, and Unicode-preserving JSON with
      :doc:`learning`, :doc:`discovery`, and :doc:`serialization`.

Choose your next step
---------------------

.. container:: atlas-card-grid

   .. container:: atlas-card atlas-card-blue

      .. rubric:: New to PyWorldAtlas?

      Follow the concise :doc:`quickstart` to install the package, open an
      atlas, and make your first useful queries.

   .. container:: atlas-card atlas-card-teal

      .. rubric:: Want to try it first?

      Open the :doc:`playground` and run the package in your browser with no
      local setup.

   .. container:: atlas-card atlas-card-gold

      .. rubric:: Ready to build?

      Copy a complete program from :doc:`recipes` or browse the focused guides
      under **Explore the atlas**.

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
   * - Overview and Standard 3D maps
     - 248 / 248 each

Designed for exploration
------------------------

PyWorldAtlas supports exact lookup and ranked search, immutable typed models,
Unicode local names and flag emoji, WGS84 coordinates, distance/bearing/midpoint
calculations, deterministic samples and flashcards, land-border paths, profile
filters, physical-feature searches, rankings, nearest-capital queries, and
optional offline 3D maps.
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

   quickstart
   playground
   installation

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Examples and learning

   learning
   recipes

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Explore the atlas

   country_profile
   maps
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

   why
   educational_principles
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
