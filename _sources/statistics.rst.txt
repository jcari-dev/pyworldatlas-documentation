The world in numbers
====================

The optional **statistics** pack (about 150 KB) adds eleven basic indicators
for every country from 1960, from the World Bank's World Development
Indicators: population, population density, urban population, life
expectancy, births and deaths, forest and agricultural land, access to
electricity and drinking water, and internet use.

.. admonition:: In 30 seconds
   :class: atlas-quick

   .. doctest::

      >>> from pyworldatlas import Atlas
      >>> with Atlas() as atlas:
      ...     print(atlas.time_series("Kenya", "electricity_access").summary)
      Access to electricity in Kenya rose from 10.9% of people in 1993 to 77.0% of people in 2024.

.. code-block:: bash

   pyworldatlas get statistics

A country over time
-------------------

:meth:`~pyworldatlas.Atlas.time_series` returns the yearly values, a sentence
about the change, and a one-line chart you can print anywhere:

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()
   >>> japan = atlas.time_series("Japan", "life_expectancy")
   >>> japan.summary.startswith("Life expectancy at birth in Japan rose from 67.7 years in 1960")
   True
   >>> len(japan.sparkline(width=20)) <= 20
   True

Use ``"world"`` for the World Bank's world total:

.. doctest::

   >>> atlas.time_series("world", "population").latest.value > 8_000_000_000
   True

One value
---------

:meth:`~pyworldatlas.Atlas.statistic` returns the latest published value, or
the value for a year. Each value knows its unit and year:

.. doctest::

   >>> str(atlas.statistic("Brazil", "urban_population", 1960))
   '44.7% of people (1960)'

Ranking
-------

:meth:`~pyworldatlas.Atlas.rank` ranks countries by any indicator, the same
way it ranks area or coastline. Without a ``year`` each country uses its latest
published value, and every row says which year that is. Ranking only orders
the published numbers; it does not say which is better.

.. doctest::

   >>> top = atlas.rank("forest_area", limit=3)
   >>> all(row.value > 90 for row in top)
   True
   >>> top[0].unit, top[0].source.startswith("World Bank")
   ('% of land', True)
   >>> [indicator.key for indicator in atlas.indicators()][:3]
   ['birth_rate', 'death_rate', 'drinking_water']
   >>> atlas.close()

From the command line:

.. code-block:: console

   $ pyworldatlas stat Kenya electricity_access
   Access to electricity in Kenya rose from 10.9% of people in 1993 to 77.0% of people in 2024.
   1993 ▁▁▂▂▂▃▃▃▃▄▄▅▆▇██ 2024

   $ pyworldatlas stat Japan life_expectancy
   Life expectancy at birth in Japan rose from 67.7 years in 1960 to 84.0 years in 2024.
   1960 ▁▂▃▃▃▄▄▅▅▅▆▆▆▇▇▇▇▇████ 2024

On a world map
--------------

:meth:`~pyworldatlas.Atlas.world_map` colors every country by one
indicator, using each country's latest value or the value for one year. It
needs a map pack as well (``pyworldatlas get maps-lite``). Countries fall into
five classes that each hold about the same number of countries, from light
(smaller numbers) to dark (larger numbers). Countries without a value are
hatched and marked "No data".

.. doctest::

   >>> atlas = Atlas()
   >>> world = atlas.world_map("life_expectancy")
   >>> world.title
   'Life expectancy at birth (years), latest year'
   >>> world.to_svg().startswith("<svg")
   True
   >>> atlas.close()

``show()`` opens the map in your browser, ``write_html()`` saves a page with
the map and a table of every value, and ``write_svg()`` saves just the image.
In a notebook the map displays on its own. Hover over a country to see its
value and year. The map is drawn with plain SVG on the Equal Earth
projection, which keeps every country's area in proportion; nothing is
downloaded when it opens.

.. code-block:: console

   $ pyworldatlas world-map forest_area
   $ pyworldatlas world-map population --year 2000 --output population-2000.html

How the numbers are kept
------------------------

- Values are kept exactly as the World Bank publishes them, with the year
  they describe. Each indicator names its original source, such as the United
  Nations Population Division.
- A year with no published value stays empty; nothing is estimated or filled
  in. Small territories the World Bank does not cover have no values.
- Countries are matched by their ISO 3166 code. The World Bank's world total
  is included; its regional and income groupings are not.
- Numbers describe places, not people's worth. See the official statistics
  section of the editorial policy in the repository.

Source: World Bank, World Development Indicators, licensed under
`CC BY 4.0 <https://creativecommons.org/licenses/by/4.0/>`_. PyWorldAtlas is
not affiliated with or endorsed by the World Bank. See :doc:`data_sources`.
