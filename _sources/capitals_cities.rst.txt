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
