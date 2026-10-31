Every place on Earth
====================

Find any named place: towns, mountains, volcanoes, lakes, rivers, deserts,
islands, ruins, castles, and more. Every install includes the **school atlas**
of about 200,000 places, chosen by educational value, and two optional packs
add every other place in the GeoNames gazetteer. All searches run offline.

.. admonition:: In 30 seconds
   :class: atlas-quick

   .. doctest::

      >>> from pyworldatlas import Atlas
      >>> with Atlas() as atlas:
      ...     print(atlas.search_places("Machu Picchu", limit=1)[0])
      ...     print(atlas.places_near((48.8584, 2.2945), limit=1)[0].place)
      Machu Picchu, ruins (PE)
      Eiffel Tower, monument (FR)

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()
   >>> fuji = atlas.place("Mount Fuji")
   >>> fuji.name, fuji.kind, fuji.country_code
   ('Fujiyama', 'volcano', 'JP')
   >>> str(atlas.place("Lake Titicaca"))
   'Lake Titicaca, lake (BO)'

Searching by name
-----------------

:meth:`~pyworldatlas.Atlas.search_places` matches local and English names,
ignores case and accents, and puts the best-known places first. A place can be
found without its generic first or last word, so ``"Everest"`` finds Mount
Everest before the town of Everest, Kansas.

.. doctest::

   >>> [str(place) for place in atlas.search_places("Everest", limit=2)]
   ['Mount Everest, mountain (NP)', 'Everest, town (US)']
   >>> [str(place) for place in atlas.search_places("Kilimanjaro", limit=2)]
   ['Mount Kilimanjaro, mountain (TZ)', 'Kilimanjaro, state or province (TZ)']

:meth:`~pyworldatlas.Atlas.place` returns the single best-known place with
exactly that name. Narrow any search with ``kind`` (see
:meth:`~pyworldatlas.Atlas.place_kinds`), ``category`` (``"water"``,
``"landform"``, ``"town"``, ``"landmark"``, ...), or ``country``.

.. doctest::

   >>> [place.country_code for place in atlas.search_places("Paris", country="France", limit=2)]
   ['FR', 'FR']
   >>> atlas.search_places("Fuji", kind="volcano", limit=1)[0].english_name
   'Mount Fuji'

One search for everything
-------------------------

:meth:`~pyworldatlas.Atlas.find` searches countries and places together, for
a search box that accepts anything. A country named exactly comes first as its
full profile, then the best-known places.

.. doctest::

   >>> [str(item) for item in atlas.find("Luxembourg", limit=2)]
   ['Luxembourg', 'Luxembourg, capital city (LU)']
   >>> atlas.find("Luxembourg")[0].capital.name
   'Luxembourg'

The best-known places in a country
----------------------------------

:meth:`~pyworldatlas.Atlas.places_in` lists a country's best-known places,
narrowed by ``kind`` or ``category`` when wanted. 3D maps mark these places
(see :doc:`maps`).

.. doctest::

   >>> [place.english_name for place in atlas.places_in("Iceland", kind="volcano", limit=2)]
   ['Hekla', 'Laki']

What is near here?
------------------

:meth:`~pyworldatlas.Atlas.places_near` lists the nearest places to any city,
place, country, or coordinate. The answer is exact: the search widens until no
closer place can exist.

.. doctest::

   >>> nearest = atlas.places_near((48.8584, 2.2945), limit=1)
   >>> str(nearest[0].place)
   'Eiffel Tower, monument (FR)'
   >>> [result.place.category for result in atlas.places_near("Nairobi", category="water", limit=3)]
   ['water', 'water', 'water']
   >>> atlas.close()

What is in the school atlas
---------------------------

Places are ranked by educational value using only signals in the data: what a
place is, how big or high it is, and how widely it is known (named in other
writing systems and languages, with an English Wikipedia article). The school
atlas holds:

- every country, territory, state, and province, every capital and regional
  seat, the continents, oceans, and seas;
- every town of 5,000 people or more, and smaller towns that are widely known;
- every peak over 6,000 m, and mountains, volcanoes, lakes, rivers, deserts,
  islands, and forests that are widely known;
- ruins, castles, monuments, museums, and other landmarks named across
  cultures.

A short reviewed list keeps famous places whose source entries lack those
signals, such as the Grand Canyon and the Sahara.

More places with packs
----------------------

Two optional packs add everything else, so nothing is left out for those who
want it. Each pack adds to the ones before it.

.. list-table::
   :header-rows: 1

   * - Pack
     - Adds
     - Download
   * - school atlas (built in)
     - about 200,000 places
     - included
   * - ``places-explorer``
     - every town over 1,000 people and every named natural feature, about 3.3 million places
     - about 23 MB
   * - ``places-world``
     - every remaining village, stream, hill, and local area, about 7.6 million places
     - about 44 MB

.. code-block:: bash

   pyworldatlas get places-explorer places-world

Installed packs are searched automatically. Shops, hotels, farms, roads, and
similar spots are not included in any edition.

The command line has the same searches:

.. code-block:: bash

   pyworldatlas find Luxembourg
   pyworldatlas place "Lake Titicaca"
   pyworldatlas near -3.0674 37.3556 --kind peak

How it stays small and fast
---------------------------

Each place takes 6 to 10 bytes. Places are ordered along a Hilbert curve so
neighbours sit together, stored column by column as small varint differences,
and compressed with LZMA or bz2, all with the Python standard library. The
first search unpacks the data once into a SQLite index in the pack folder;
later searches take under a millisecond, and nearest-place lookups a few
milliseconds.

.. list-table::
   :header-rows: 1

   * - Edition
     - First search on a laptop (once)
     - Disk space once unpacked
   * - school atlas
     - about 2 seconds
     - about 25 MB
   * - with ``places-explorer``
     - about 25 seconds more
     - about 320 MB more
   * - with ``places-world``
     - about 55 seconds more
     - about 710 MB more

Coordinates are rounded to about 110 m and are not suitable for navigation.
Place data comes from GeoNames under CC BY 4.0; see :doc:`data_sources`.
