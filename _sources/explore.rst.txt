Explore the atlas in five minutes
=================================

PyWorldAtlas is most useful when country facts and geographic calculations can
be combined in ordinary Python. These examples run entirely from the bundled
database: no API key, network request, or third-party runtime package is used.

.. container:: atlas-card-grid

   .. container:: atlas-card atlas-card-blue

      .. rubric:: Profiles and names

      Flags, local names, capitals, reference facts, languages, currencies,
      timezones, and provenance.

   .. container:: atlas-card atlas-card-teal

      .. rubric:: Physical geography

      Area, coastlines, elevations, rivers, lakes, and climate classes.

   .. container:: atlas-card atlas-card-gold

      .. rubric:: Geographic tools

      Distances, bearings, midpoints, neighbors, paths, filters, and rankings.

Every result below comes from the same :class:`~pyworldatlas.Atlas` object.
The examples are tested during every documentation build.

Make a country postcard
-----------------------

Country profiles combine names, reference facts, physical geography, practical
metadata, and exact source references.

.. container:: atlas-flag-row

   |flag-br| **Brazil** · local display name **Brasil** · capital
   **Brasília**

Start with one readable overview, then reach into the typed profile for any
fact you want to compare or cite:

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()
   >>> brazil = atlas.country("Brazil")
   >>> brazil.summary().splitlines()[:3]
   ['🇧🇷 Brazil · Brasil', 'Formal name: Federative Republic of Brazil', 'Capital: Brasília']

.. doctest::

   >>> print(brazil.flag, brazil.name_in("pt"), "—", brazil.capital.name)
   🇧🇷 Brasil — Brasília
   >>> print(brazil.anthem.title)
   Hino Nacional Brasileiro
   >>> print(brazil.motto.text, "—", brazil.motto.english_text)
   Ordem e Progresso — Order and Progress
   >>> print(brazil.currency.name, brazil.currency.symbol)
   Brazilian Real R$
   >>> print(brazil.highest_point.name, f"{brazil.highest_point.elevation_m:,.0f} m")
   Pico da Neblina 2,994 m
   >>> print(brazil.climate.dominant_zone.code, brazil.climate.dominant_zone.name)
   Aw Tropical, savannah

Cross writing systems
---------------------

A local identity keeps its original Unicode text, language, script, evidence,
source locator, and source-provided romanization when available.

.. doctest::

   >>> china = atlas.country("China")
   >>> print(china.name_in("zh"))
   中国
   >>> print(china.official_name_in("zh"))
   中华人民共和国
   >>> print(china.romanized_name_in("zh"))
   Zhongguo

Follow a feature across profiles
--------------------------------

Source-listed rivers and lakes can connect more than one country profile:

.. doctest::

   >>> [country.name for country in atlas.countries_with_river("Amazon")]
   ['Brazil', 'Peru']
   >>> [country.name for country in atlas.countries_with_lake("Geneva")]
   ['France', 'Switzerland']

Rank the bundled snapshots
--------------------------

Rankings are deterministic views of sourced values or clearly documented
calculations. Missing values are excluded.

.. doctest::

   >>> largest = atlas.rank("population", limit=5)
   >>> [result.country.name for result in largest]
   ['China', 'India', 'United States', 'Indonesia', 'Pakistan']
   >>> [(result.position, result.unit) for result in largest[:2]]
   [(1, 'people'), (2, 'people')]
   >>> [result.country.name for result in atlas.rank("coastline", limit=3)]
   ['Canada', 'Indonesia', 'Greenland']

Find the nearest capitals
-------------------------

Pass a city, country, capital, coordinate object, or latitude/longitude tuple.
The result uses the same dependency-free great-circle calculation as
``distance_between``.

.. doctest::

   >>> nearby = atlas.nearest_capitals("Tokyo", country="JP", limit=3)
   >>> [(item.capital.name, round(item.distance)) for item in nearby]
   [('Seoul', 1153), ('Pyongyang', 1285), ('Beijing', 2093)]

Search nearby cities
--------------------

Partial search and nearest-place discovery make the bundled city table easy to
browse without knowing every exact spelling first.

.. doctest::

   >>> [city.label for city in atlas.search_cities("santo", country="DO", limit=3)]
   ['Santo Domingo (DO)', 'Santo Domingo Oeste (DO)', 'Santo Domingo Este (DO)']
   >>> nearby = atlas.nearest_cities(
   ...     "Santo Domingo",
   ...     origin_country="DO",
   ...     within_country="DO",
   ...     limit=3,
   ... )
   >>> [(result.city.name, round(result.distance)) for result in nearby]
   [('Santo Domingo Este', 5), ('Bella Vista', 6), ('Santo Domingo Oeste', 12)]

Measure and orient
------------------

Distance, initial bearing, and midpoint calculations accept coordinate objects
as well as named bundled places.

.. doctest::

   >>> tokyo = atlas.coordinates("Tokyo", country="JP")
   >>> paris = atlas.coordinates("Paris", country="FR")
   >>> round(tokyo.distance_to(paris))
   9713
   >>> round(tokyo.bearing_to(paris), 1)
   333.5
   >>> tokyo.format()
   '35.6895° N, 139.6917° E'
   >>> tokyo.compass_direction_to(paris)
   'NNW'

Follow a land path
------------------

The reviewed border graph supports deterministic shortest paths and explicit
crossing counts without pretending to be a road-routing service.

.. doctest::

   >>> path = atlas.border_path("Portugal", "China")
   >>> path.names
   ('Portugal', 'Spain', 'France', 'Germany', 'Poland', 'Russia', 'China')
   >>> path.crossings
   6

Build a small collection
------------------------

Filters can be combined to select profiles by geography, currency, language
metadata, script, timezone, coast, physical-feature coverage, or represented
climate class.

.. doctest::

   >>> [country.name for country in atlas.countries(currency_code="JPY")]
   ['Japan']
   >>> [country.name for country in atlas.countries(timezone_id="America/Santo_Domingo")]
   ['Dominican Republic']
   >>> atlas.countries(language_code="ja")[0].languages[0].name
   'Japanese'
   >>> len(atlas.countries(continent="Europe", coastal=False))
   14

Create a repeatable geography quiz
----------------------------------

Samples, flashcards, and multiple-choice questions use stable seeds, which
makes them suitable for lesson plans, examples, and tests.

.. doctest::

   >>> question = atlas.quiz(topic="highest_points", count=1, seed="Friday")[0]
   >>> question.prompt
   'What is the highest point listed for Austria?'
   >>> question.answer_number
   4
   >>> question.answer
   'Grossglockner (3798 m)'

Carry the data elsewhere
------------------------

Public models serialize to JSON-compatible values while preserving Unicode and
structured nested records.

.. doctest::

   >>> japan_card = atlas.country("Japan").discovery_card().to_dict()
   >>> japan_card["country"]["alpha2"]
   'JP'
   >>> japan_card["highest_point"]["name"]
   'Mount Fuji'
   >>> japan_card["climate_zone_codes"][:3]
   ['Cfa', 'Dfb', 'Dfa']
   >>> atlas.close()

Runnable tour
-------------

The repository includes the complete script used for the introductory tour:

.. literalinclude:: ../../examples/atlas_tour.py
   :language: python
   :linenos:

Continue with :doc:`learning`, explore :doc:`physical_geography`, or jump to
:doc:`api` for the complete method and return-type contracts.
