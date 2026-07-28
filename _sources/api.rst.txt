API reference
=============

The supported classes and exceptions are exported from ``pyworldatlas``.
Database and normalization helpers are private implementation details.

Profile conventions
-------------------

- Public records are frozen dataclasses.
- Optional scalar fields use ``None`` when the captured source has no value.
- Repeated fields use tuples and are empty when no values are bundled.
- The public model does not expose an entity-recognition or legal-status
  classification. The words *country* and *area* follow the documented source
  scope.
- ``Country.sources`` identifies sources used somewhere in the profile; it is
  not a field-by-field provenance map.

The public model focuses on stable geographic reference fields rather than
current affairs, opinion, or speculative narrative. See
:doc:`educational_principles` for the source and editorial review required for
a new field family.

Country identity provenance
---------------------------

English identity has three deliberately separate fields:

- ``Country.name`` is the familiar English display and lookup name.
- ``Country.official_name`` is the canonical English UN M49 identity.
- ``Country.formal_name`` is the sourced English long/formal identity for 240
  profiles. ``None`` means the profile is outside the captured source scope.
- ``Country.has_distinct_formal_name`` tests whether the sourced formal form
  differs from ``name``.
- ``Atlas.countries_with_formal_names`` returns all covered profiles.

English formal names are indexed for lookup and carry a Factbook, UN Protocol,
or Wikidata source in ``Country.sources``. The local-identity API is separate:

- ``Country.local_names`` contains one immutable sourced local identity.
- ``Country.local_name(language_code)`` returns the complete record or ``None``.
- ``name_in`` and ``official_name_in`` project its short and formal forms.
- ``romanized_name_in`` and ``romanized_official_name_in`` return only
  romanization printed by the source.
- ``local_name_languages`` lists the covered language codes for one country.
- ``Atlas.countries_with_local_names`` exposes complete local-name coverage and
  supports exact language, script, and evidence-kind filters.

Each ``LocalizedName`` carries ``kind`` and ``language_status`` plus its
``SourceReference`` and exact ``source_locator``. ``locale_display`` records
come from CLDR; ``national_official`` records are reviewed against UNGEGN. A
missing ``LocalizedName.formal_name`` means the national formal form is not in
the reviewed local layer. It says nothing about the English
``Country.formal_name`` field. No translation or romanization is generated at runtime. See
:doc:`local_names` for examples and evidence rules.

Reference-fact provenance
-------------------------

``Country.anthem``, ``motto``, and ``demonym`` are optional convenience views
over the corresponding tuples. Anthem, motto, and demonym records carry their
own ``SourceReference`` and exact source locator. Currency, language, timezone,
and postal objects also expose their contributing source when present.

Anthems contain titles only. Mottos are a conservative reviewed source-listed
layer and do not claim a particular legal status. See :doc:`reference_facts`
for coverage and interpretation rules.

Discovery calculations
----------------------

``Country.summary`` returns display-ready multiline text and deliberately
omits unavailable values. It is a presentation helper; use ``Country``
attributes, ``to_dict``, or ``discovery_card`` when a stable structured shape
matters.

``Atlas.rank_countries`` returns :class:`~pyworldatlas.CountryRanking` rows for
documented sourced or directly derived metrics. ``Atlas.rank`` is its compact
alias. ``Atlas.nearest_capitals`` returns
:class:`~pyworldatlas.CapitalDistance` rows ordered by great-circle distance.
These methods describe bundled values and geographic relationships; they do not
score or judge countries.

``Atlas.learning_topics`` lists the topics shared by ``flashcards`` and
``quiz``. ``Atlas.quiz`` adds deterministic distractors and answer positions
and returns :class:`~pyworldatlas.QuizQuestion` objects. These helpers do not
store learner answers, scores, or sessions.

Physical-geography provenance
-----------------------------

``Country.physical`` contains the source-reported coastline, elevation points,
mean elevation, source-listed rivers and lakes, and its climate profile.
``Country.geography.area`` contains total, land, and water area plus the
directly calculated water percentage.

``ClimateProfile.summary_source`` and ``classification_source`` keep the short
climate summary separate from the derived Köppen-Geiger classes. Class shares
come from the documented raster/polygon extraction and are not site-level
climate claims. ``River`` and ``Lake`` records preserve a ``source_label``;
their length or area describes the whole source feature, including a shared
feature, rather than the portion within one country.

Distance input contract
-----------------------

``Atlas.distance_between`` accepts ``Coordinate`` objects, two-item
``(latitude, longitude)`` tuples, ``City`` objects, ``Capital`` objects, and
``Country`` objects. String inputs are exact bundled city names. A ``Country``
input uses its primary-capital coordinates.

``Coordinate.format`` and ``Coordinate.dms`` provide display text without
changing the signed decimal-degree values. ``compass_direction_to`` converts
the initial bearing to a 4-, 8-, or 16-point compass label. It is an orientation
aid, not a route instruction.

City discovery
--------------

``Atlas.city`` performs an exact city lookup and raises a clear exception for
missing or ambiguous names. ``Atlas.search_cities`` performs accent-tolerant
partial matching and returns an empty tuple when there are no matches.
``Atlas.nearest_cities`` returns :class:`~pyworldatlas.CityDistance` rows
ordered by great-circle distance. Optional country arguments narrow either the
origin lookup or the returned places.

Border API provenance
---------------------

The border API separates stored relationships from runtime calculations:

- ``neighbors`` and ``shares_border`` read accepted edges from the generated
  SQLite graph.
- ``shared_neighbors`` intersects two stored neighbor sets.
- ``border_path`` performs deterministic breadth-first search.
- ``border_crossings`` reads the crossing count from that shortest path.
- ``has_land_route`` tests reachability in the graph.
- ``countries_reachable_by_land`` traverses a connected component.
- ``BorderPathResult.names`` and ``alpha2_codes`` are derived from its immutable
  ``CountryReference`` values.

These methods do not use boundary geometry, maritime relationships, transport
networks, or current border-access rules. The accepted-edge policy and source
exceptions are documented in :doc:`borders` and :doc:`data_sources`.

Profile field notes
-------------------

.. list-table:: Selected public values
   :header-rows: 1
   :widths: 28 72

   * - Value
     - Meaning
   * - ``Country.population``
     - Country population value from the captured GeoNames snapshot
   * - ``Country.population_density``
     - Population divided by sourced total area; ``None`` when unavailable
   * - ``Country.flag`` / ``Country.flag_emoji``
     - Regional-indicator Unicode sequence derived from the alpha-2 code
   * - ``Country.formal_name``
     - Sourced English long/formal identity; may equal ``name`` or be ``None``
   * - ``Currency.code`` / ``Currency.name``
     - Source currency identifier and CLDR English name; the whole value may be ``None``
   * - ``Currency.symbol`` / ``minor_unit_digits``
     - CLDR display symbol and standard fractional-digit count when available
   * - ``Language.code`` / ``name`` / ``script_code``
     - Source language code plus captured English name and likely script
   * - ``Country.observed_timezones``
     - Timezone IDs observed on bundled capital and city records
   * - ``Country.timezones``
     - Captured country-level timezone records and seasonal/raw UTC offsets
   * - ``Country.postal_code``
     - Source display format and optional validation expression
   * - ``Country.anthem`` / ``motto`` / ``demonym``
     - First optional typed record from the corresponding source-aware tuple
   * - ``Country.land_area_km2`` / ``water_area_km2``
     - Source area components; ``None`` when the component was not supplied
   * - ``Country.coastline_km`` / ``mean_elevation_m``
     - Source-reported physical measurements
   * - ``Country.highest_point`` / ``lowest_point``
     - Optional named :class:`~pyworldatlas.ElevationPoint` values
   * - ``Country.rivers`` / ``lakes``
     - Source-listed major features, not exhaustive inventories
   * - ``Country.climate``
     - Plain-language summary plus represented Köppen-Geiger classes
   * - ``Coordinate.latitude`` / ``longitude``
     - Signed WGS84 decimal degrees with constructor validation
   * - ``Capital`` / ``City`` population
     - Captured place population value, not a live estimate

Atlas
-----

.. autoclass:: pyworldatlas.Atlas
   :members:
   :special-members: __getitem__, __contains__, __len__, __iter__, __enter__, __exit__
   :exclude-members: __weakref__

Country models
--------------

.. autoclass:: pyworldatlas.Country
   :members:

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

.. autoclass:: pyworldatlas.NationalAnthem
   :members:

.. autoclass:: pyworldatlas.NationalMotto
   :members:

.. autoclass:: pyworldatlas.Demonym
   :members:

.. autoclass:: pyworldatlas.CountryReference
   :members:

.. autoclass:: pyworldatlas.CountryDiscoveryCard
   :members:

Geographic models
-----------------

.. autoclass:: pyworldatlas.Coordinate
   :members:

.. autoclass:: pyworldatlas.Area
   :members:

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

.. autoclass:: pyworldatlas.Capital
   :members:

.. autoclass:: pyworldatlas.City
   :members:

Results and metadata
--------------------

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

Exceptions
----------

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

Optional maps
-------------

These objects are installed by ``pyworldatlas[maps]`` or
``pyworldatlas[maps-overview]``.

.. autoclass:: pyworldatlas_mapview.CountryMap
   :members:

.. autofunction:: pyworldatlas_mapview.available_map_qualities

.. autoexception:: pyworldatlas_mapview.MapDataError
