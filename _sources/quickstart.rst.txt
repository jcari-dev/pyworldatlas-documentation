60-second quickstart
====================

Create the atlas
----------------

Use a context manager when practical so the read-only SQLite connection closes
promptly:

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     country = atlas.country("Japan")
   ...     print(country.name)
   ...     print(country.capital.name)
   Japan
   Tokyo

Look up countries naturally
---------------------------

The same country can be resolved by familiar names and standard codes:

.. doctest::

   >>> atlas = Atlas()
   >>> atlas.country("Japan") == atlas.country("JP")
   True
   >>> atlas.country("JPN") == atlas.country("392")
   True
   >>> atlas.country("Holy See").name
   'Vatican City'

Use it like a Python collection
-------------------------------

.. doctest::

   >>> atlas["DO"].name
   'Dominican Republic'
   >>> "France" in atlas
   True
   >>> "Atlantis" in atlas
   False
   >>> len(atlas)
   248
   >>> europe = atlas.countries(continent="Europe")
   >>> len(europe)
   51
   >>> {"FR", "DE", "VA"}.issubset({country.alpha2 for country in europe})
   True

Inspect the dataset version
---------------------------

Library, schema, and data versions change independently:

.. doctest::

   >>> info = atlas.dataset_info()
   >>> (info.library_version, info.schema_version, info.dataset_version)
   ('0.1.0', 1, '2026.07.20')
   >>> atlas.close()

Executable example
------------------

.. literalinclude:: ../../examples/quick_start.py
   :language: python
   :linenos:
