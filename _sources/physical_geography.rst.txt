Physical geography
==================

Version 0.7 turns each covered profile into a compact physical-geography
reference: land and water area, coastline, elevation, named highest and lowest
points, source-listed major rivers and lakes, a plain-language climate summary,
and represented Köppen-Geiger climate classes. Everything works offline.

.. container:: atlas-stat-grid

   .. container:: atlas-stat

      **240**

      elevation-extreme profiles

   .. container:: atlas-stat

      **375**

      source-listed river and lake records

   .. container:: atlas-stat

      **241**

      Köppen-Geiger profiles

A country in four lines
-----------------------

.. container:: atlas-card atlas-card-teal

   |flag-br| **Brazil at a glance**

   **8,358,140 km²** land · **157,630 km²** water · **7,491 km** coastline ·
   highest point **Pico da Neblina** · dominant represented class **Aw**

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     brazil = atlas.country("Brazil")
   ...     print(f"{brazil.flag} {brazil.name}")
   ...     print(f"Land {brazil.land_area_km2:,.0f} km² | Water {brazil.water_area_km2:,.0f} km²")
   ...     print(brazil.highest_point.name, f"{brazil.highest_point.elevation_m:,.0f} m")
   ...     print(brazil.climate.summary)
   🇧🇷 Brazil
   Land 8,358,140 km² | Water 157,630 km²
   Pico da Neblina 2,994 m
   mostly tropical, but temperate in south

Area and coastline
------------------

``Country.area_km2`` is total area. ``land_area_km2`` and ``water_area_km2``
are its source components when available, while ``water_percent`` is calculated
from water divided by total area. ``coastline_km`` is the source-reported
coastline length.

.. doctest::

   >>> with Atlas() as atlas:
   ...     japan = atlas.country("Japan")
   ...     print(japan.area_km2, japan.land_area_km2, japan.water_area_km2)
   ...     print(round(japan.water_percent, 2), japan.coastline_km)
   ...     print(japan.is_coastal, japan.is_landlocked)
   377915.0 364485.0 13430.0
   3.55 29751.0
   True False

The boolean conveniences remain ``None`` when coastline data is unavailable.
They never treat a missing coastline as zero. A coastline value of zero means
the source describes the profile as landlocked; it is not a measurement of
international boundaries.

Elevation and named extremes
----------------------------

The highest and lowest points are :class:`~pyworldatlas.ElevationPoint`
objects. Elevations use metres relative to sea level, so a negative lowest
point is below sea level.

.. doctest::

   >>> with Atlas() as atlas:
   ...     japan = atlas.country("Japan")
   ...     print(japan.mean_elevation_m)
   ...     print(japan.highest_point.name, japan.highest_point.elevation_m)
   ...     print(japan.lowest_point.name, japan.lowest_point.elevation_m)
   438.0
   Mount Fuji 3776.0
   Hachiro-gata -4.0

``source_label`` preserves the compact source wording. ``is_approximate`` is
true only when the source explicitly marked its measurement as approximate.
This release does not publish a separate “major mountains” inventory: a named
highest point is not automatically labelled as a mountain.

Rivers and lakes
----------------

Rivers and lakes are immutable typed records. Search helpers make shared
features easy to discover:

.. doctest::

   >>> with Atlas() as atlas:
   ...     print([country.name for country in atlas.countries_with_river("Amazon")])
   ...     print([country.name for country in atlas.countries_with_lake("Geneva")])
   ['Brazil', 'Peru']
   ['France', 'Switzerland']

The feature tuples are **source-listed major features, not exhaustive
inventories**. An empty tuple means the source did not list a feature for that
profile. It does not mean that no river or lake exists.

For a shared river, ``River.length_km`` is the full source-reported river
length, not the portion inside one country. Likewise, ``Lake.area_km2`` is the
full lake area rather than the area inside one profile. The original compact
wording remains available in ``source_label``.

Climate profiles
----------------

``Country.climate`` combines two deliberately separate views:

- ``summary`` is a short source-provided description.
- ``koppen_geiger_zones`` contains classes derived from the 1991–2020 global
  Köppen-Geiger raster.

.. doctest::

   >>> with Atlas() as atlas:
   ...     brazil = atlas.country("Brazil")
   ...     print(brazil.climate.reference_period)
   ...     print(brazil.climate.zone_codes[:4])
   ...     zone = brazil.climate.dominant_zone
   ...     print(zone.code, zone.name, round(zone.share_percent, 2))
   1991-2020
   ('Aw', 'Am', 'Af', 'BSh')
   Aw Tropical, savannah 46.33

Zone shares are latitude-area-weighted estimates from a 0.1-degree raster and
pinned map-unit polygons. Classes below the documented 0.1% extraction
threshold are omitted. They are useful for broad educational comparison, not
site-level climate determination.

.. doctest::

   >>> with Atlas() as atlas:
   ...     print(len(atlas.countries_in_climate_zone("Af")))
   ...     print(atlas.climate_zone_codes()[-2:])
   73
   ('ET', 'EF')

Physical filters and rankings
-----------------------------

Physical filters compose with the existing region and metadata filters:

.. code-block:: python

   atlas.countries(continent="Europe", coastal=False)
   atlas.countries(koppen_geiger_code="Af")
   atlas.countries(has_rivers=True, has_lakes=True)

Physical ranking metrics include ``land_area``, ``water_area``,
``water_percent``, ``coastline``, ``mean_elevation``, ``highest_elevation``,
``lowest_elevation``, ``river_count``, ``lake_count``, and
``climate_zone_count``.

.. doctest::

   >>> with Atlas() as atlas:
   ...     rows = atlas.rank("coastline", limit=5)
   ...     print([(row.country.name, row.value) for row in rows])
   [('Canada', 202080.0), ('Indonesia', 54716.0), ('Greenland', 44087.0), ('Russia', 37653.0), ('Philippines', 36289.0)]

Rankings describe the bundled source fields; they do not judge countries.
Missing values are excluded and ties use the country name for deterministic
ordering. Feature-count rankings count source-listed records, not every feature
on the ground.

Learning prompts
----------------

The deterministic flashcard API now supports ``climate_zones``,
``coastlines``, ``highest_points``, ``rivers``, and ``lakes``. These are
structured prompts and answers that can be used in a notebook, command-line
lesson, or application without adding game state to the package.

Executable example
------------------

.. literalinclude:: ../../examples/physical_geography.py
   :language: python
   :linenos:
