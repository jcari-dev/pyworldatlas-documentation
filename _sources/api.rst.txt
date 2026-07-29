API reference
=============

Use this page to check an exact class, property, method, return type, or
exception. If you are learning the package, begin with the :doc:`quickstart`
or a focused guide under **Explore the atlas**, then return here for details.

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
     - ``Country``, ``City``, rankings, distances, paths, and tuples of results
   * - :ref:`Country <api-country-models>`
     - Reading one country or area profile
     - Names, codes, capital, reference facts, physical geography, and sources
   * - :ref:`Coordinate and place models <api-geographic-models>`
     - Working with locations and physical features
     - ``Coordinate``, ``Capital``, ``City``, ``River``, ``Lake``, and climate
       records
   * - :ref:`Result models <api-results>`
     - Inspecting structured calculations and learning material
     - Rankings, distances, border paths, flashcards, quizzes, and metadata
   * - :ref:`Exceptions <api-exceptions>`
     - Handling missing, ambiguous, closed, or incompatible data
     - Specific subclasses of ``AtlasError``
   * - :ref:`Optional maps <api-maps>`
     - Opening or exporting an installed 3D map edition
     - ``CountryMap`` and map-data errors

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

The main entry point. ``Atlas`` handles country and city lookup, filtering,
distance calculations, border paths, rankings, learning helpers, dataset
metadata, and optional maps.

.. autoclass:: pyworldatlas.Atlas
   :members:
   :special-members: __getitem__, __contains__, __len__, __iter__, __enter__, __exit__
   :exclude-members: __weakref__

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

.. _api-maps:

Optional maps
-------------

These objects are installed by ``pyworldatlas[maps]`` or
``pyworldatlas[maps-overview]``. See :doc:`maps` before depending on the
experimental map API.

.. autoclass:: pyworldatlas_mapview.CountryMap
   :members:

.. autofunction:: pyworldatlas_mapview.available_map_qualities

.. autoexception:: pyworldatlas_mapview.MapDataError

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

``Country.summary()`` is presentation-ready text that omits unavailable facts.
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
``nearest_cities()`` orders results by great-circle distance. Optional country
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
