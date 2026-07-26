Lookup, search, and filtering
=============================

Use exact identifiers when you know the profile, safe lookup when absence is
expected, ranked search for human input, and composable filters for discovery.

Exact lookup
------------

:meth:`Atlas.country <pyworldatlas.Atlas.country>` accepts common names,
aliases, sourced English formal names, ISO alpha-2 and alpha-3 identifiers, and
M49 numeric codes. Lookup is case- and accent-insensitive.

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()
   >>> atlas.country("usa").name
   'United States'
   >>> atlas.country("VAT").name
   'Vatican City'
   >>> atlas.country("Republic of Türkiye").alpha2
   'TR'

Safe lookup
-----------

Use :meth:`Atlas.get <pyworldatlas.Atlas.get>` when a missing query is an
ordinary possibility:

.. doctest::

   >>> atlas.get("Atlantis") is None
   True

Ranked search
-------------

.. doctest::

   >>> matches = atlas.search_countries("united")
   >>> len(matches)
   7
   >>> {"GB", "US"}.issubset({match.country.alpha2 for match in matches})
   True

City-name search
----------------

:meth:`~pyworldatlas.Atlas.search_cities` performs ranked partial-name lookup
over the 6,265 bundled populated places. Add a country when a lesson or
application has a known scope:

.. doctest::

   >>> [city.label for city in atlas.search_cities("santo", country="DO", limit=3)]
   ['Santo Domingo (DO)', 'Santo Domingo Oeste (DO)', 'Santo Domingo Este (DO)']

The method returns city objects rather than search-wrapper records. Exact names
rank first, population breaks ties, and no match returns an empty tuple.

Filtering
---------

.. doctest::

   >>> americas = atlas.countries(continent="Americas")
   >>> len(americas)
   57
   >>> caribbean = atlas.countries(region="Caribbean")
   >>> len(caribbean)
   28
   >>> {"CU", "DO"}.issubset({country.alpha2 for country in caribbean})
   True
   >>> [country.name for country in atlas.countries(currency_code="JPY")]
   ['Japan']
   >>> [country.name for country in atlas.countries(timezone_id="Asia/Tokyo")]
   ['Japan']
   >>> atlas.close()

``currency_code``, ``language_code``, ``script_code``, and ``timezone_id`` are
case-insensitive exact filters. Multiple filters are combined. See
:doc:`rankings` for the full discovery API and interpretation notes.
