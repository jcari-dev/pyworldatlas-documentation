API reference
=============

The supported classes and exceptions are exported from ``pyworldatlas``.
Database and normalization helpers are private implementation details.

Profile conventions
-------------------

- Public records are frozen dataclasses.
- Optional scalar fields use ``None`` when the captured source has no value.
- Repeated fields use tuples and are empty when no values are bundled.
- ``Country.status`` is ``CountryStatus.OTHER`` for the current dataset because
  political entity type has not yet been sourced.
- ``Country.sources`` identifies sources used somewhere in the profile; it is
  not a field-by-field provenance map.

Distance input contract
-----------------------

``Atlas.distance_between`` accepts ``Coordinate`` objects, two-item
``(latitude, longitude)`` tuples, ``City`` objects, ``Capital`` objects, and
``Country`` objects. String inputs are exact bundled city names. A ``Country``
input uses its primary-capital coordinates.

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

.. autoclass:: pyworldatlas.CountryStatus
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
