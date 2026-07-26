Coordinates and distances
=========================

PyWorldAtlas stores signed WGS84 latitude and longitude on every bundled
capital and populated-place record. Exact lookup, friendly display helpers, and
dependency-free great-circle calculations all work offline.

Look up coordinates
-------------------

Constrain city lookups by country whenever a name may be shared:

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()
   >>> tokyo = atlas.city("Tokyo", country="Japan")
   >>> tokyo.coordinates.as_tuple()
   (35.6895, 139.69171)
   >>> paris_coordinates = atlas.coordinates("Paris", country="FR")
   >>> paris_coordinates.as_tuple()
   (48.85341, 2.3488)

An unconstrained exact name that matches multiple stored cities raises
:class:`~pyworldatlas.AmbiguousPlaceError` instead of choosing silently.

String inputs are resolved as bundled city names, not country names.
``first_country`` and ``second_country`` only disambiguate those city-name
strings. Pass :class:`~pyworldatlas.Country` objects for country distance.

Distance between places
-----------------------

.. doctest::

   >>> paris = atlas.city("Paris", country="France")
   >>> round(atlas.distance_between(tokyo, paris))
   9713
   >>> round(atlas.distance_between(tokyo, paris, unit="mi"))
   6035
   >>> round(atlas.distance_between(
   ...     "Tokyo", "Paris", first_country="JP", second_country="FR"
   ... ))
   9713

``unit`` accepts ``"km"``, ``"mi"``, or ``"nmi"``. Calculations use the
standard haversine formula and the WGS84 mean Earth radius. Results represent
surface great-circle distance, not road, rail, or flight-routing distance.

Country and model inputs
------------------------

Country inputs use the selected primary capital. Capital and city objects use
their own coordinates:

.. doctest::

   >>> japan = atlas.country("Japan")
   >>> france = atlas.country("France")
   >>> round(atlas.distance_between(japan, france))
   9713
   >>> round(atlas.distance_between(japan.capital, france.capital))
   9713

An area without primary-capital coordinates raises
:class:`~pyworldatlas.CapitalNotFoundError` when used as a country input.

Raw latitude and longitude
--------------------------

Use :class:`~pyworldatlas.Coordinate` directly or pass ``(latitude, longitude)``
tuples to the atlas helper:

.. doctest::

   >>> from pyworldatlas import Coordinate
   >>> london = Coordinate(51.5074, -0.1278)
   >>> paris_center = Coordinate(48.8566, 2.3522)
   >>> round(london.distance_to(paris_center), 1)
   343.6
   >>> round(london.bearing_to(paris_center), 1)
   148.1
   >>> london.compass_direction_to(paris_center)
   'SSE'
   >>> midpoint = london.midpoint_to(paris_center)
   >>> (round(midpoint.latitude, 4), round(midpoint.longitude, 4))
   (50.1886, 1.1466)
   >>> start = (51.5074, -0.1278)
   >>> finish = (48.8566, 2.3522)
   >>> round(atlas.distance_between(start, finish), 1)
   343.6
   >>> atlas.close()

Latitude must be from -90 through 90 and longitude from -180 through 180.
Invalid coordinates and unsupported units raise :class:`ValueError`.
Initial bearing is undefined for coincident or antipodal coordinates, and a
unique spherical midpoint is undefined for antipodal coordinates; those cases
also raise :class:`ValueError`.

Friendly coordinate labels
--------------------------

Decimal degrees are compact; degrees/minutes/seconds are useful for teaching
how a coordinate is composed:

.. doctest::

   >>> tokyo_coordinates = Coordinate(35.6895, 139.6917)
   >>> tokyo_coordinates.hemispheres
   ('N', 'E')
   >>> tokyo_coordinates.format()
   '35.6895° N, 139.6917° E'
   >>> tokyo_coordinates.dms()
   '35° 41′ 22.2″ N, 139° 41′ 30.1″ E'

``compass_direction_to`` converts the initial bearing to a 4-, 8-, or 16-point
compass label. It describes the beginning of the same great-circle path and is
not a navigation instruction.

Country coordinates
-------------------

``country.capital_coordinates`` exposes the primary capital position when one
is available. Passing a :class:`~pyworldatlas.Country` to
``atlas.distance_between`` uses that position. Country inputs therefore produce
capital-to-capital distances, not centroid distances.
