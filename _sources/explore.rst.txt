Explore the atlas in five minutes
=================================

PyWorldAtlas is most useful when country facts and geographic calculations can
be combined in ordinary Python. These examples run entirely from the bundled
database: no API key, network request, or third-party runtime package is used.

Make a country postcard
-----------------------

Country profiles combine names, reference facts, physical geography, practical
metadata, and exact source references.

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()
   >>> brazil = atlas.country("Brazil")
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

Samples and flashcards use stable seeds, which makes them suitable for lesson
plans, examples, and tests.

.. doctest::

   >>> card = atlas.flashcards(topic="highest_points", count=1, seed="Friday")[0]
   >>> (card.prompt, card.answer)
   ('What is the highest point listed for Austria?', 'Grossglockner (3798 m)')
   >>> atlas.close()

Runnable tour
-------------

The repository includes the complete script used for the introductory tour:

.. literalinclude:: ../../examples/atlas_tour.py
   :language: python
   :linenos:

Continue with :doc:`quickstart`, explore :doc:`physical_geography`, or jump to
:doc:`rankings` for the complete method contracts.
