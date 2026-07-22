Filters, rankings, and nearby capitals
======================================

Version 0.6 adds small, composable discovery methods. They return immutable
models and never contact a remote service.

Profile filters
---------------

:meth:`Atlas.countries <pyworldatlas.Atlas.countries>` supports exact,
case-insensitive profile filters:

.. code-block:: python

   atlas.countries(continent="Europe")
   atlas.countries(region="Caribbean")
   atlas.countries(currency_code="EUR")
   atlas.countries(language_code="es")
   atlas.countries(script_code="Arab")
   atlas.countries(timezone_id="Asia/Tokyo")

Multiple arguments are combined with ``AND``. Language values describe the
captured GeoNames country metadata; they are not promoted to legal-language
claims.

Country rankings
----------------

:meth:`Atlas.rank_countries <pyworldatlas.Atlas.rank_countries>` and its short
alias :meth:`Atlas.rank <pyworldatlas.Atlas.rank>` support these metrics:

.. list-table:: Ranking metrics
   :header-rows: 1

   * - Metric
     - Value
     - Unit
   * - ``population``
     - Captured country population snapshot
     - ``people``
   * - ``area`` / ``area_km2``
     - Captured total area
     - ``km²``
   * - ``population_density`` / ``density``
     - Population divided by total area
     - ``people/km²``
   * - ``border_count``
     - Accepted reviewed land-border relationships
     - ``countries``
   * - ``major_city_count``
     - Bundled populated-place records
     - ``places``

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()
   >>> results = atlas.rank("area", limit=3)
   >>> [(row.position, row.country.name, row.unit) for row in results]
   [(1, 'Russia', 'km²'), (2, 'Antarctica', 'km²'), (3, 'Canada', 'km²')]
   >>> smallest = atlas.rank("density", limit=2, descending=False)
   >>> smallest[0].value <= smallest[1].value
   True

Rankings are descriptions of bundled values, not judgments about countries or
people. Equal values use country name as a stable tie-breaker, and missing
values are excluded.

Nearest capitals
----------------

:meth:`Atlas.nearest_capitals <pyworldatlas.Atlas.nearest_capitals>` accepts an
exact city name, a country, a capital or city object, a
:class:`~pyworldatlas.Coordinate`, or a ``(latitude, longitude)`` tuple.

.. doctest::

   >>> origin = atlas.country("Dominican Republic")
   >>> nearest = atlas.nearest_capitals(origin, limit=3)
   >>> [(item.capital.name, item.country.alpha2) for item in nearest]
   [('Port-au-Prince', 'HT'), ('Cockburn Town', 'TC'), ('San Juan', 'PR')]
   >>> nearest[0].unit
   'km'
   >>> atlas.close()

Distances are spherical great-circle results, not road, air-route, or travel
distances. ``include_origin=False`` excludes a capital at the origin itself.

.. literalinclude:: ../../examples/rankings.py
   :language: python
   :linenos:
