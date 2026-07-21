:orphan:

Migration from 0.0.x
====================

Version 0.1.0 is an intentional clean break. The legacy package returned nested
dictionaries assembled around a different database. The rebuild returns
immutable typed objects generated from a source-aware pipeline.

Core lookup
-----------

.. list-table::
   :header-rows: 1
   :widths: 42 58

   * - Legacy 0.0.x
     - Rebuild 0.1.0
   * - ``atlas.get_country_profile("Japan")``
     - ``atlas.country("Japan")``
   * - Dictionary keys
     - Typed properties with autocomplete
   * - ``profile["capital"]["name"]``
     - ``country.capital.name``
   * - Directional coordinate fields
     - Signed WGS84 ``Coordinate`` values
   * - Mutating returned dictionaries
     - ``country.to_dict()`` for a mutable copy

Before
------

.. code-block:: python

   import pyworldatlas as pwa

   atlas = pwa.Atlas()
   profile = atlas.get_country_profile("Japan")
   print(profile["capital"]["name"])

After
-----

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     country = atlas.country("Japan")
   ...     print(country.capital.name)
   Tokyo

Compatibility scope
-------------------

The legacy database schema and query code are not retained. This keeps the new
runtime simple and prevents two competing data models from drifting apart.
