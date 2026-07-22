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

Distance input contract
-----------------------

``Atlas.distance_between`` accepts ``Coordinate`` objects, two-item
``(latitude, longitude)`` tuples, ``City`` objects, ``Capital`` objects, and
``Country`` objects. String inputs are exact bundled city names. A ``Country``
input uses its primary-capital coordinates.

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
     - Source currency identifier and name; the whole value may be ``None``
   * - ``Language.code``
     - Source language code; no display-name expansion is implied
   * - ``Country.observed_timezones``
     - Timezone IDs observed on bundled capital and city records
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

.. autoclass:: pyworldatlas.CountryMatch
   :members:

.. autoclass:: pyworldatlas.Flashcard
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
