Quickstart
==========

Install PyWorldAtlas, open one atlas, and ask useful geography questions. The
package works from its bundled database, so these examples need no API key or
runtime network connection.

Install
-------

.. code-block:: console

   python -m pip install --upgrade pyworldatlas

Meet a country
--------------

Use :class:`~pyworldatlas.Atlas` as a context manager and look up a country by
name or standard code:

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     brazil = atlas.country("BR")
   ...     print(brazil.flag, brazil.name_in("pt"), "—", brazil.capital.name)
   ...     print(brazil.highest_point.name, f"{brazil.highest_point.elevation_m:,.0f} m")
   ...     print(", ".join(river.name for river in brazil.rivers[:3]))
   🇧🇷 Brasil — Brasília
   Pico da Neblina 2,994 m
   Amazon, Río de la Plata/Paraná, Tocantins

``country`` returns an immutable, typed profile. Facts stay available as
attributes, while :meth:`~pyworldatlas.Country.summary` provides a readable
introduction for a terminal, notebook, or lesson:

.. code-block:: python

   with Atlas() as atlas:
       print(atlas.country("Dominican Republic").summary())

Look up, search, and collect
----------------------------

Names, aliases, alpha-2, alpha-3, and M49 codes resolve to the same profile.
The atlas also behaves like a normal Python collection:

.. doctest::

   >>> with Atlas() as atlas:
   ...     print(atlas.country("Japan") == atlas.country("JPN"))
   ...     print(atlas["DO"].capital.name)
   ...     print([match.country.name for match in atlas.search_countries("guinea")[:3]])
   ...     print(len(atlas.countries(continent="Europe")))
   True
   Santo Domingo
   ['Guinea', 'Guinea-Bissau', 'Equatorial Guinea']
   51

Combine facts with geography
----------------------------

The same API connects country profiles, cities, coordinates, distances,
rankings, and reviewed land neighbors:

.. doctest::

   >>> with Atlas() as atlas:
   ...     japan = atlas.country("Japan")
   ...     print(japan.anthem.title)
   ...     print(japan.climate.dominant_zone.code)
   ...     print(round(atlas.distance_between("Tokyo", "Paris", first_country="JP", second_country="FR")))
   ...     print([country.alpha2 for country in atlas.neighbors("Brazil")[:4]])
   Kimigayo
   Cfa
   9713
   ['AR', 'BO', 'CO', 'GF']

What to remember
----------------

- Use ``with Atlas() as atlas`` so the read-only database closes promptly.
- Missing scalar facts are ``None`` and missing collections are empty. The
  package does not invent values to fill source gaps.
- Results are typed Python objects. Use ``to_dict()`` when you need portable,
  JSON-compatible data.
- :meth:`~pyworldatlas.Atlas.dataset_info` reports the installed library,
  schema, and dataset versions.

Where to go next
----------------

- Run fourteen editable programs in the :doc:`playground`.
- Copy complete projects from :doc:`recipes`.
- Try classroom activities in :doc:`learning`.
- Open :doc:`country_profile`, :doc:`physical_geography`, or
  :doc:`coordinates_distances` for focused guides.
- Use the :doc:`api` for every public class, property, and method.
