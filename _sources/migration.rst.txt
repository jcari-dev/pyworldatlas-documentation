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

Moving from 0.7 to 0.8
----------------------

Version 0.8 is additive. Existing profile, physical-geography, ranking,
distance, and border calls keep their 0.7 behavior. New convenience methods
make common presentation and classroom tasks shorter:

.. code-block:: python

   with Atlas() as atlas:
       print(atlas.country("Brazil").summary())
       print(atlas.coordinates("Tokyo", country="JP").format())
       cities = atlas.search_cities("santo", country="DO")
       questions = atlas.quiz(topic="capitals", count=5, seed=42)

No dataset migration is required. Reproducible quizzes depend on both the seed
and bundled dataset version, just like samples and flashcards.

Moving from 0.8 to 0.9
----------------------

The core API remains additive and dependency-free. Interactive maps are
installed only when requested:

.. code-block:: console

   python -m pip install --upgrade "pyworldatlas[maps]"

Existing code continues to use the same bundled country database. Map support
adds :meth:`~pyworldatlas.Atlas.map`; it does not change country models or
expose public boundary geometry. See :doc:`maps` for the smaller Overview
edition and the complete viewer API.
