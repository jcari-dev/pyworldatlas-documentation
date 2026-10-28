Sun and seasons
===============

:meth:`~pyworldatlas.Atlas.sun` works out sunrise, sunset, day length, and how
high the sun climbs at noon, for any place and any date, with no internet and
no extra data. It uses the NOAA solar position equations, which agree with
almanac times to about a minute between latitudes 72° north and south. Times
are in UTC.

.. doctest::

   >>> from datetime import date
   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()
   >>> print(atlas.sun("London", date(2026, 6, 21)).summary)
   On 21 June 2026 the sun rises at 03:43 UTC and sets at 20:21 UTC, giving 16 h 38 min of daylight. At noon it is 62° above the horizon.
   >>> atlas.sun("London", date(2026, 12, 21)).daylight
   '7 h 49 min'

Why seasons happen
------------------

The Earth's axis is tilted, so through the year the sun climbs higher at noon
in one hemisphere and lower in the other. Compare the same day in Oslo and in
Cape Town:

.. doctest::

   >>> for city in ("Oslo", "Cape Town"):
   ...     print(city, atlas.sun(city, date(2026, 12, 21)).daylight)
   Oslo 5 h 54 min
   Cape Town 14 h 25 min

Close to the poles the sun can stay up or down all day:

.. doctest::

   >>> print(atlas.sun("Tromsø", date(2026, 6, 21)).summary)
   On 21 June 2026 the sun does not set: this is the midnight sun.
   >>> atlas.sun("Tromsø", date(2026, 12, 21)).day_length_hours
   0.0

``where`` can be a city or place name (``"Mount Everest"``), a country (its
capital), any model with coordinates, or a ``(latitude, longitude)`` tuple.
``on`` defaults to today.

.. doctest::

   >>> atlas.sun((0, 0), date(2026, 3, 20)).daylight
   '12 h 07 min'
   >>> atlas.close()

From the command line:

.. code-block:: bash

   pyworldatlas sun Reykjavik --date 2026-06-21
