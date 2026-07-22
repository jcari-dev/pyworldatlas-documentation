60-second quickstart
====================

Open one atlas, look up a country, and combine profile facts with geographic
tools. Every example below runs from the installed package without an API key.

.. container:: atlas-card-grid

   .. container:: atlas-card atlas-card-blue

      .. rubric:: Look up

      Resolve a familiar name, alias, alpha-2, alpha-3, or M49 code to one
      immutable profile.

   .. container:: atlas-card atlas-card-teal

      .. rubric:: Explore

      Read names, capitals, cities, reference facts, physical geography, and
      source metadata offline.

   .. container:: atlas-card atlas-card-gold

      .. rubric:: Connect

      Filter, rank, measure, follow reviewed land paths, create flashcards, and
      serialize results.

Create the atlas
----------------

Use a context manager when practical so the read-only SQLite connection closes
promptly:

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     country = atlas.country("Japan")
   ...     print(country.name)
   ...     print(country.capital.name)
   Japan
   Tokyo

Look up countries naturally
---------------------------

The same country can be resolved by familiar names and standard codes:

.. doctest::

   >>> atlas = Atlas()
   >>> atlas.country("Japan") == atlas.country("JP")
   True
   >>> atlas.country("JPN") == atlas.country("392")
   True
   >>> atlas.country("Holy See").name
   'Vatican City'

Use it like a Python collection
-------------------------------

.. doctest::

   >>> atlas["DO"].name
   'Dominican Republic'
   >>> "France" in atlas
   True
   >>> "Atlantis" in atlas
   False
   >>> len(atlas)
   248
   >>> europe = atlas.countries(continent="Europe")
   >>> len(europe)
   51
   >>> {"FR", "DE", "VA"}.issubset({country.alpha2 for country in europe})
   True

Inspect the dataset version
---------------------------

Library, schema, and data versions change independently:

.. doctest::

   >>> info = atlas.dataset_info()
   >>> (info.library_version, info.schema_version, info.dataset_version)
   ('0.7.0', 7, '2026.07.22.7')
   >>> atlas.close()

Read profile metadata
---------------------

Profile fields are typed and may be absent when the captured sources do not
provide a value:

.. doctest::

   >>> with Atlas() as atlas:
   ...     japan = atlas.country("Japan")
   ...     print(japan.population)
   ...     print(japan.currency.code if japan.currency else None)
   ...     print([language.code for language in japan.languages])
   126529100
   JPY
   ['ja']

Add reference facts
-------------------

Optional facts remain typed and source-aware:

.. doctest::

   >>> with Atlas() as atlas:
   ...     japan = atlas.country("Japan")
   ...     print(japan.anthem.title, "—", japan.anthem.english_title)
   ...     print(japan.demonym.adjective)
   ...     print(japan.currency.name, japan.currency.symbol)
   ...     print(japan.timezone_ids)
   Kimigayo — His Majesty’s Reign
   Japanese
   Japanese Yen ¥
   ('Asia/Tokyo',)

Explore physical geography
--------------------------

Physical fields are typed, optional, and available without a network call:

.. doctest::

   >>> with Atlas() as atlas:
   ...     japan = atlas.country("Japan")
   ...     print(japan.highest_point.name, japan.highest_point.elevation_m)
   ...     print(japan.lowest_point.name, japan.lowest_point.elevation_m)
   ...     print(japan.coastline_km, japan.climate.dominant_zone.code)
   Mount Fuji 3776.0
   Hachiro-gata -4.0
   29751.0 Cfa

Discover a shared river or lake across profiles:

.. doctest::

   >>> with Atlas() as atlas:
   ...     print([country.name for country in atlas.countries_with_river("Amazon")])
   ...     print([country.name for country in atlas.countries_with_lake("Geneva")])
   ['Brazil', 'Peru']
   ['France', 'Switzerland']

See :doc:`physical_geography` for field meaning, climate methodology, coverage,
rankings, and the difference between source-listed features and exhaustive
inventories.

Read the three English name fields
----------------------------------

.. doctest::

   >>> with Atlas() as atlas:
   ...     turkey = atlas.country("TR")
   ...     print(turkey.name)
   ...     print(turkey.official_name)
   ...     print(turkey.formal_name)
   Turkey
   Türkiye
   Republic of Türkiye

``name`` is the familiar atlas label, ``official_name`` is the canonical UN
M49 identity, and ``formal_name`` is the sourced English long form. The formal
layer covers 240 profiles and remains ``None`` outside its source scope.

Meet countries in their own languages
-------------------------------------

Sourced local identities preserve their original writing systems:

.. doctest::

   >>> with Atlas() as atlas:
   ...     dominican = atlas.country("DO")
   ...     china = atlas.country("CN")
   ...     print(dominican.flag, dominican.name_in("es"))
   ...     print(china.name_in("zh"), china.romanized_name_in("zh"))
   🇩🇴 República Dominicana
   中国 Zhongguo

Every country or area has one selected local identity. A different requested
language returns ``None`` rather than a generated translation. See
:doc:`local_names` for evidence kinds, scripts, romanization, and coverage.

Build reproducible learning material
------------------------------------

Country samples and flashcards use a stable seed-based ordering:

.. doctest::

   >>> with Atlas() as atlas:
   ...     japan = atlas.country("Japan")
   ...     print(japan.flag_emoji, round(japan.population_density, 2))
   ...     print([country.alpha2 for country in atlas.sample_countries(count=3, seed=42)])
   ...     card = atlas.flashcards(topic="capitals", count=1, seed=42)[0]
   ...     print(card.prompt, card.answer)
   🇯🇵 334.81
   ['KW', 'BS', 'BI']
   What is the capital of Kuwait? Kuwait City

Rank profiles and discover nearby capitals
------------------------------------------

.. doctest::

   >>> with Atlas() as atlas:
   ...     print([row.country.alpha2 for row in atlas.rank("population", limit=3)])
   ...     print([row.capital.name for row in atlas.nearest_capitals("Tokyo", country="JP", limit=3)])
   ['CN', 'IN', 'US']
   ['Seoul', 'Pyongyang', 'Beijing']

Measure city-to-city distance
-----------------------------

String inputs to :meth:`~pyworldatlas.Atlas.distance_between` are exact bundled
city names. Country arguments disambiguate cities with shared names.

.. doctest::

   >>> with Atlas() as atlas:
   ...     distance = atlas.distance_between(
   ...         "Tokyo", "Paris", first_country="JP", second_country="FR"
   ...     )
   >>> round(distance)
   9713

Explore land connections
------------------------

.. doctest::

   >>> with Atlas() as atlas:
   ...     print([country.name for country in atlas.neighbors("Brazil")])
   ...     path = atlas.border_path("Portugal", "China")
   ...     print(path.crossings)
   ...     print(path.alpha2_codes)
   ...     print(atlas.has_land_route("Japan", "China"))
   ['Argentina', 'Bolivia', 'Colombia', 'French Guiana', 'Guyana', 'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela']
   6
   ('PT', 'ES', 'FR', 'DE', 'PL', 'RU', 'CN')
   False

Executable example
------------------

.. literalinclude:: ../../examples/quick_start.py
   :language: python
   :linenos:
