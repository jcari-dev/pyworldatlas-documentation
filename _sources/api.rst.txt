API reference
=============

Use this page to check an exact class, property, method, return type, or
exception. If you are learning the package, begin with the :doc:`quickstart`
or a focused guide under **Explore the atlas**, then return here for details.

The small installed ``pyworldatlas`` command is documented in the
:doc:`quickstart`. This page covers the complete Python API.

Find the right object
---------------------

.. list-table:: Public API map
   :header-rows: 1
   :widths: 24 36 40

   * - Start with
     - Use it for
     - Common results
   * - :ref:`Atlas <api-atlas>`
     - Opening the database and running lookups, searches, calculations, and
       learning helpers
     - ``Country``, ``Place``, ``City``, rankings, distances, paths, sun times,
       statistics, and tuples of results
   * - :ref:`Country <api-country-models>`
     - Reading one country or area profile
     - Names, codes, capital, reference facts, physical geography, and sources
   * - :ref:`Coordinate and place models <api-geographic-models>`
     - Working with locations, places, and physical features
     - ``Coordinate``, ``Place``, ``Capital``, ``City``, ``Airport``,
       ``WorldHeritageSite``, ``River``, ``Lake``, and climate records
   * - :ref:`Result models <api-results>`
     - Inspecting structured calculations, statistics, and learning material
     - Rankings, distances, border paths, sun times, antipodes, statistic
       series, flashcards, quizzes, and metadata
   * - :ref:`Exceptions <api-exceptions>`
     - Handling missing, ambiguous, closed, or incompatible data
     - Specific subclasses of ``AtlasError``
   * - :ref:`Optional maps <api-maps>`
     - Opening or exporting a 3D country map or a world map of a statistic
     - ``CountryMap``, ``WorldMap``, and map-data errors
   * - :ref:`Data packs <api-packs>`
     - Installing and listing optional packs from Python
     - ``pyworldatlas.packs`` functions and ``PackNotInstalledError``

How to read an entry
--------------------

Each blue heading is a public Python signature. A **property** is read as an
attribute, such as ``country.flag``. A **method** is called, such as
``country.name_in("ja")``. Text after the colon is the return type; ``| None``
means the value may be unavailable in the bundled source layer.

Public records are frozen dataclasses. Repeated values are tuples, and a
missing collection is empty. Use :meth:`~pyworldatlas.Country.to_dict` or the
corresponding model's ``to_dict()`` method when you need JSON-compatible data.

.. note::

   :class:`~pyworldatlas.Atlas` owns the read-only database connection. Use it
   as a context manager. Models already returned by the atlas remain usable
   after the context closes.

.. _api-atlas:

Atlas
-----

The main entry point. ``Atlas`` handles country, city, and place lookup;
nearby-place search; filtering; distances, sun times, and antipodes; border
paths and rankings; flashcards and quizzes; dataset metadata; and the optional
maps, landmarks, and statistics packs.

The examples on this page assume an open atlas, made with
``from pyworldatlas import Atlas`` and ``atlas = Atlas()``. Every example is run
as a test, so what you see is what you get.

.. testsetup:: *

   from pyworldatlas import Atlas
   atlas = Atlas()

.. testcleanup:: *

   atlas.close()

.. autoclass:: pyworldatlas.Atlas

   .. autoattribute:: PLACE_QUIZ_TOPICS

Look things up
~~~~~~~~~~~~~~

Find one country, city, or place by name or code.

.. automethod:: pyworldatlas.Atlas.country
.. automethod:: pyworldatlas.Atlas.get
.. automethod:: pyworldatlas.Atlas.find
.. automethod:: pyworldatlas.Atlas.search_countries
.. automethod:: pyworldatlas.Atlas.city
.. automethod:: pyworldatlas.Atlas.search_cities
.. automethod:: pyworldatlas.Atlas.major_cities
.. automethod:: pyworldatlas.Atlas.coordinates
.. automethod:: pyworldatlas.Atlas.place
.. automethod:: pyworldatlas.Atlas.search_places
.. automethod:: pyworldatlas.Atlas.places_in
.. automethod:: pyworldatlas.Atlas.place_kinds
.. automethod:: pyworldatlas.Atlas.place_categories
.. automethod:: pyworldatlas.Atlas.__getitem__
.. automethod:: pyworldatlas.Atlas.__contains__
.. automethod:: pyworldatlas.Atlas.__len__
.. automethod:: pyworldatlas.Atlas.__iter__

Filter and rank
~~~~~~~~~~~~~~~

Pick countries that match, and put them in order.

.. automethod:: pyworldatlas.Atlas.countries
.. automethod:: pyworldatlas.Atlas.rank
.. automethod:: pyworldatlas.Atlas.sample_countries
.. automethod:: pyworldatlas.Atlas.countries_with_local_names
.. automethod:: pyworldatlas.Atlas.countries_with_formal_names
.. automethod:: pyworldatlas.Atlas.climate_zone_codes
.. automethod:: pyworldatlas.Atlas.rank_countries

Measure
~~~~~~~

Distances, the nearest things, the sun, and the other side of the Earth.

.. automethod:: pyworldatlas.Atlas.distance_between
.. automethod:: pyworldatlas.Atlas.capitals_near
.. automethod:: pyworldatlas.Atlas.cities_near
.. automethod:: pyworldatlas.Atlas.places_near
.. automethod:: pyworldatlas.Atlas.heritage_sites_near
.. automethod:: pyworldatlas.Atlas.sun
.. automethod:: pyworldatlas.Atlas.antipode

Borders
~~~~~~~

Who touches whom by land, and how to get there.

.. automethod:: pyworldatlas.Atlas.neighbors
.. automethod:: pyworldatlas.Atlas.shares_border
.. automethod:: pyworldatlas.Atlas.shared_neighbors
.. automethod:: pyworldatlas.Atlas.border_path
.. automethod:: pyworldatlas.Atlas.border_crossings
.. automethod:: pyworldatlas.Atlas.has_land_route
.. automethod:: pyworldatlas.Atlas.countries_reachable_by_land

Learn
~~~~~

Quizzes, flashcards, and a short tour.

.. automethod:: pyworldatlas.Atlas.quiz
.. automethod:: pyworldatlas.Atlas.flashcards
.. automethod:: pyworldatlas.Atlas.learning_topics
.. automethod:: pyworldatlas.Atlas.help

Numbers and maps
~~~~~~~~~~~~~~~~

World Bank statistics, world maps, and 3D country maps. These need the statistics or a map pack.

.. automethod:: pyworldatlas.Atlas.indicators
.. automethod:: pyworldatlas.Atlas.statistic
.. automethod:: pyworldatlas.Atlas.time_series
.. automethod:: pyworldatlas.Atlas.world_map
.. automethod:: pyworldatlas.Atlas.map
.. automethod:: pyworldatlas.Atlas.sort_by_statistic

Landmarks
~~~~~~~~~

Airports and UNESCO World Heritage sites. These need the landmarks pack.

.. automethod:: pyworldatlas.Atlas.airport
.. automethod:: pyworldatlas.Atlas.airports
.. automethod:: pyworldatlas.Atlas.world_heritage_site
.. automethod:: pyworldatlas.Atlas.world_heritage_sites

The atlas itself
~~~~~~~~~~~~~~~~

Versions, and closing the database.

.. automethod:: pyworldatlas.Atlas.dataset_info
.. automethod:: pyworldatlas.Atlas.close
.. automethod:: pyworldatlas.Atlas.__enter__
.. automethod:: pyworldatlas.Atlas.__exit__

Older names
~~~~~~~~~~~

These still work and return the same results, but will be removed in 1.0. See :ref:`api-renamed`.

.. automethod:: pyworldatlas.Atlas.nearest_capitals
.. automethod:: pyworldatlas.Atlas.nearest_cities
.. automethod:: pyworldatlas.Atlas.world_heritage_sites_near
.. automethod:: pyworldatlas.Atlas.lookup
.. automethod:: pyworldatlas.Atlas.place_quiz
.. automethod:: pyworldatlas.Atlas.countries_with_river
.. automethod:: pyworldatlas.Atlas.countries_with_lake
.. automethod:: pyworldatlas.Atlas.countries_in_climate_zone
.. automethod:: pyworldatlas.Atlas.countries_with_no_land_borders

.. _api-country-models:

Country models
--------------

Country profile
~~~~~~~~~~~~~~~

``Country`` is the complete immutable profile returned by
:meth:`~pyworldatlas.Atlas.country`. Its convenience properties expose common
facts directly while preserving the typed records underneath them.

.. autoclass:: pyworldatlas.Country
   :members:

Names, codes, and administrative metadata
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

These records describe identity, language, currency, timezone, and postal
fields contained within a country profile.

.. autoclass:: pyworldatlas.CountryCodes
   :members:

.. autoclass:: pyworldatlas.LocalizedName
   :members:

.. autoclass:: pyworldatlas.Currency
   :members:

.. autoclass:: pyworldatlas.Language
   :members:

.. autoclass:: pyworldatlas.Timezone
   :members:

.. autoclass:: pyworldatlas.TravelBasics
   :members:

.. autoclass:: pyworldatlas.PostalCodeFormat
   :members:

Reference facts
~~~~~~~~~~~~~~~

Anthems contain titles only. Motto and demonym records are optional and retain
their own source reference when available.

.. autoclass:: pyworldatlas.NationalAnthem
   :members:

.. autoclass:: pyworldatlas.NationalMotto
   :members:

.. autoclass:: pyworldatlas.Demonym
   :members:

Compact country views
~~~~~~~~~~~~~~~~~~~~~

These smaller records are returned by border paths and discovery helpers when
a complete country profile would be unnecessary.

.. autoclass:: pyworldatlas.CountryReference
   :members:

.. autoclass:: pyworldatlas.CountryDiscoveryCard
   :members:

.. _api-geographic-models:

Geographic models
-----------------

Coordinates and area
~~~~~~~~~~~~~~~~~~~~

.. autoclass:: pyworldatlas.Coordinate
   :members:

.. autoclass:: pyworldatlas.Area
   :members:

Physical geography
~~~~~~~~~~~~~~~~~~

.. autoclass:: pyworldatlas.ElevationPoint
   :members:

.. autoclass:: pyworldatlas.River
   :members:

.. autoclass:: pyworldatlas.Lake
   :members:

.. autoclass:: pyworldatlas.ClimateZone
   :members:

.. autoclass:: pyworldatlas.ClimateProfile
   :members:

.. autoclass:: pyworldatlas.PhysicalGeography
   :members:

.. autoclass:: pyworldatlas.Geography
   :members:

Places
~~~~~~

``Capital`` and ``City`` include validated coordinates and captured population
values. Place populations are snapshot values, not live estimates.

.. autoclass:: pyworldatlas.Capital
   :members:

.. autoclass:: pyworldatlas.City
   :members:

``Place`` is any named place on Earth from the school atlas or an installed
place pack; see :doc:`places`.

.. autoclass:: pyworldatlas.Place
   :members:

.. _api-results:

Results and metadata
--------------------

Calculations and learning helpers return typed records rather than loosely
structured dictionaries. Their ``to_dict()`` methods provide portable output.

.. autoclass:: pyworldatlas.BorderPathResult
   :members:

.. autoclass:: pyworldatlas.CountryRanking
   :members:

.. autoclass:: pyworldatlas.CapitalDistance
   :members:

.. autoclass:: pyworldatlas.CityDistance
   :members:

.. autoclass:: pyworldatlas.Airport
   :members:

.. autoclass:: pyworldatlas.WorldHeritageSite
   :members:

.. autoclass:: pyworldatlas.SiteDistance
   :members:

.. autoclass:: pyworldatlas.Antipode
   :members:

.. autoclass:: pyworldatlas.PlaceQuestion
   :members:

.. autoclass:: pyworldatlas.Indicator
   :members:

.. autoclass:: pyworldatlas.StatisticSeries
   :members:

.. autoclass:: pyworldatlas.StatisticValue
   :members:

.. autoclass:: pyworldatlas.SunTimes
   :members:

.. autoclass:: pyworldatlas.PlaceDistance
   :members:

.. autoclass:: pyworldatlas.CountryMatch
   :members:

.. autoclass:: pyworldatlas.Flashcard
   :members:

.. autoclass:: pyworldatlas.QuizQuestion
   :members:

.. autoclass:: pyworldatlas.DatasetInfo
   :members:

.. autoclass:: pyworldatlas.SourceReference
   :members:

.. _api-renamed:

Newer names
-----------

Version 0.13 gave every method the same naming style. The older names still
work and return exactly the same results, so existing code keeps running. They
will be removed in 1.0, so new code should use the newer names.

.. list-table::
   :header-rows: 1

   * - Older name
     - Newer name
   * - ``nearest_capitals(...)``
     - :meth:`~pyworldatlas.Atlas.capitals_near`
   * - ``nearest_cities(...)``
     - :meth:`~pyworldatlas.Atlas.cities_near`
   * - ``world_heritage_sites_near(...)``
     - :meth:`~pyworldatlas.Atlas.heritage_sites_near`
   * - ``lookup(...)``
     - :meth:`~pyworldatlas.Atlas.find`
   * - ``rank_countries(...)`` and ``sort_by_statistic(...)``
     - :meth:`~pyworldatlas.Atlas.rank`, which ranks statistics too
   * - ``place_quiz("higher")``
     - :meth:`quiz("higher") <pyworldatlas.Atlas.quiz>`, which takes place topics too
   * - ``countries_with_river("Nile")``
     - ``countries(river="Nile")``
   * - ``countries_with_lake("Victoria")``
     - ``countries(lake="Victoria")``
   * - ``countries_in_climate_zone("Cfb")``
     - ``countries(climate_zone="Cfb")``
   * - ``countries_with_no_land_borders()``
     - ``countries(land_borders=False)``

New to the atlas? :meth:`atlas.help() <pyworldatlas.Atlas.help>` prints a short
tour of things to try, and ``pyworldatlas tour`` prints it on the command line.

.. _api-printing:

Printing results
----------------

Every result prints as one readable line, such as
``CountryRanking('#1 Canada: 202,080 km')``. Call
:func:`pyworldatlas.show_details` to print every field instead, or set the
environment variable ``PYWORLDATLAS_DETAILS=1``. Details change only how
results print; ``to_dict()`` always returns every field.

.. code-block:: python

   import pyworldatlas

   with pyworldatlas.show_details():
       print(repr(atlas.rank("area", limit=1)[0]))

.. autoclass:: pyworldatlas.show_details

.. autoclass:: pyworldatlas.Distance
   :members: text

.. autoclass:: pyworldatlas.models.units.SummaryText

.. _api-exceptions:

Exceptions
----------

Catch a specific exception when the distinction matters, or catch
``AtlasError`` for package-level lookup, dataset, and lifecycle failures.

.. autoexception:: pyworldatlas.AtlasError
.. autoexception:: pyworldatlas.AtlasClosedError
.. autoexception:: pyworldatlas.DatasetError
.. autoexception:: pyworldatlas.DatasetNotFoundError
.. autoexception:: pyworldatlas.DatasetVersionError
.. autoexception:: pyworldatlas.DatasetIntegrityError
.. autoexception:: pyworldatlas.CountryNotFoundError
.. autoexception:: pyworldatlas.AmbiguousCountryError
.. autoexception:: pyworldatlas.PlaceNotFoundError
.. autoexception:: pyworldatlas.AmbiguousPlaceError
.. autoexception:: pyworldatlas.CapitalNotFoundError
.. autoexception:: pyworldatlas.MapSupportNotInstalledError

.. autoexception:: pyworldatlas.PackNotInstalledError

.. _api-maps:

Optional maps
-------------

Maps read their data from an installed map pack (``pyworldatlas get maps`` or
``pyworldatlas get maps-lite``). See :doc:`maps` before depending on the
experimental map API.

.. autoclass:: pyworldatlas.maps.CountryMap
   :members:

.. autoclass:: pyworldatlas.maps.WorldMap
   :members:

.. autofunction:: pyworldatlas.maps.available_map_qualities

.. autoexception:: pyworldatlas.maps.MapDataError

.. _api-packs:

Data packs
----------

.. automodule:: pyworldatlas.packs
   :no-members:

.. autofunction:: pyworldatlas.packs.get
.. autofunction:: pyworldatlas.packs.add
.. autofunction:: pyworldatlas.packs.installed
.. autofunction:: pyworldatlas.packs.available
.. autofunction:: pyworldatlas.packs.remove
.. autofunction:: pyworldatlas.packs.pack_path
.. autofunction:: pyworldatlas.packs.data_dir
.. autofunction:: pyworldatlas.packs.default_data_dir
.. autoclass:: pyworldatlas.packs.PackInfo
   :members:
.. autoclass:: pyworldatlas.packs.InstalledPack
   :members:
.. autoexception:: pyworldatlas.packs.PackError

Data contracts and provenance
-----------------------------

Country identity
~~~~~~~~~~~~~~~~

``Country.name`` is the familiar English display and lookup name.
``Country.official_name`` is the canonical English UN M49 identity, while
``Country.formal_name`` is the sourced English long or formal identity when
that source layer covers the profile.

``Country.local_names`` contains the selected sourced local identity.
``name_in()``, ``official_name_in()``, and the romanization helpers project
values from that record; they do not translate or romanize text at runtime.
Each ``LocalizedName`` retains its language, script, evidence kind, source, and
source locator. See :doc:`local_names` for the complete evidence rules.

Reference and discovery facts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Anthem, motto, demonym, currency, language, timezone, and postal records expose
their contributing source when one is bundled. ``Country.sources`` lists
sources used somewhere in the profile; it is not a field-by-field provenance
map. See :doc:`reference_facts` for coverage and interpretation rules.

``Country.summary`` is presentation-ready text that omits unavailable facts.
Use model attributes, ``to_dict()``, or ``discovery_card()`` when a stable
structured shape matters. Rankings describe sourced or directly calculated
values; they do not score or judge countries. Quiz and flashcard helpers are
deterministic and do not store learner answers or sessions.

Physical geography
~~~~~~~~~~~~~~~~~~

``Country.physical`` contains coastline, elevation points, mean elevation,
source-listed rivers and lakes, and climate. ``Country.geography.area`` contains
total, land, and water area plus the directly calculated water percentage.

Köppen-Geiger shares describe the portion represented by the documented
raster and polygon extraction. They are not site-level climate claims. River
lengths and lake areas describe the complete source feature, including shared
features, rather than only the portion within one profile. See
:doc:`physical_geography` and :doc:`data_quality` for limits.

Coordinates, cities, and distance
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

``Atlas.distance_between()`` accepts coordinates, two-item latitude/longitude
tuples, cities, capitals, countries, and exact bundled city names. A country
uses its primary-capital coordinates. Distances are great-circle surface
measurements; compass labels are orientation aids, not route instructions.

``Atlas.city()`` performs exact lookup and reports ambiguous names.
``search_cities()`` performs accent-tolerant partial matching, while
``cities_near()`` orders results by great-circle distance. Optional country
arguments narrow the lookup or returned places.

Land borders
~~~~~~~~~~~~

Neighbor and path methods use the reviewed, undirected border graph. Shortest
paths are deterministic breadth-first searches over stored relationships. They
do not use boundary geometry, maritime relationships, transport networks, or
current crossing rules. See :doc:`borders` for the accepted-edge policy and
interpretation limits.

Publication scope
~~~~~~~~~~~~~~~~~

The public model focuses on stable geographic reference data rather than
current affairs, opinion, or speculative narrative. Missing scalar values are
``None`` and are never invented to fill a source gap. See
:doc:`educational_principles` and :doc:`data_sources` for the publication and
source policies.
