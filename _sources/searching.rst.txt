Lookup, search, and filtering
=============================

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
   >>> atlas.close()
