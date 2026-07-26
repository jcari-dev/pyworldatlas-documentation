Capitals and major cities
=========================

Explore primary capitals and the bundled populated-place collection as typed,
coordinate-bearing records. Lookups remain local and require no mapping
service.

Capital records
---------------

The current snapshot provides 241 primary-capital records for 248 UN M49
countries and areas. The schema supports multiple capitals so later releases
can represent administrative, legislative, judicial, and other roles without
redesigning the runtime model.

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()
   >>> capital = atlas.country("Dominican Republic").capital
   >>> capital.name
   'Santo Domingo'
   >>> capital.coordinates.as_tuple()
   (18.47186, -69.89232)
   >>> capital.role
   'official'
   >>> capital.primary
   True

Coordinates are signed WGS84 decimal degrees. Positive latitude is north;
positive longitude is east.

Missing capitals
~~~~~~~~~~~~~~~~

``Country.capital`` returns ``None`` when the source intersection has no usable
capital record. This currently applies to Antarctica, Bouvet Island, British
Indian Ocean Territory, Heard Island and McDonald Islands, Tokelau, United
States Minor Outlying Islands, and Western Sahara.

.. doctest::

   >>> atlas.country("Antarctica").capital is None
   True

Major cities
------------

The current dataset retains populated places at or above the configured
100,000-person threshold and always retains capitals. Results are ordered by
population, then name. The current snapshot contains 6,265 records.

.. doctest::

   >>> cities = atlas.major_cities("Japan", limit=3)
   >>> [city.name for city in cities]
   ['Tokyo', 'Yokohama', 'Osaka']
   >>> cities[0].geonames_id
   1850147
   >>> atlas.close()

Population values describe the captured source snapshot. They are not live
estimates and should not be interpreted as a synchronized census series.

Search city names
-----------------

Use :meth:`~pyworldatlas.Atlas.search_cities` when only part of a place name is
known. Exact names rank first, then prefix and substring matches; population
breaks ties.

.. doctest::

   >>> with Atlas() as atlas:
   ...     matches = atlas.search_cities("santo", country="DO", limit=3)
   ...     print([city.label for city in matches])
   ['Santo Domingo (DO)', 'Santo Domingo Oeste (DO)', 'Santo Domingo Este (DO)']

Search returns an empty tuple when no bundled place matches. Use
:meth:`~pyworldatlas.Atlas.city` when one exact result is required; that method
raises a clear missing or ambiguous-place exception instead.

Find nearby cities
------------------

:meth:`~pyworldatlas.Atlas.nearest_cities` accepts the same origin types as the
distance API. ``within_country`` can turn it into a local exploration activity:

.. doctest::

   >>> with Atlas() as atlas:
   ...     nearby = atlas.nearest_cities(
   ...         "Santo Domingo",
   ...         origin_country="DO",
   ...         within_country="DO",
   ...         limit=3,
   ...     )
   ...     print([(item.city.name, round(item.distance)) for item in nearby])
   [('Santo Domingo Este', 5), ('Bella Vista', 6), ('Santo Domingo Oeste', 12)]

Each :class:`~pyworldatlas.CityDistance` contains a compact country reference,
the city record, distance, and unit. Values are great-circle measurements, not
road or travel distances.
