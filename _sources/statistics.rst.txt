The world in numbers
====================

The optional **statistics** pack (about 150 KB) adds eleven basic indicators
for every country from 1960, from the World Bank's World Development
Indicators: population, population density, urban population, life
expectancy, births and deaths, forest and agricultural land, access to
electricity and drinking water, and internet use.

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

Sorting
-------

:meth:`~pyworldatlas.Atlas.sort_by_statistic` lists countries by one
indicator. Sorting only orders the published numbers; it does not say which
is better.

.. doctest::

   >>> top = atlas.sort_by_statistic("forest_area", limit=3)
   >>> all(item.value > 90 for item in top)
   True
   >>> [indicator.key for indicator in atlas.indicators()][:3]
   ['birth_rate', 'death_rate', 'drinking_water']
   >>> atlas.close()

From the command line:

.. code-block:: bash

   pyworldatlas stat Kenya electricity_access

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
