Airports and World Heritage
===========================

The optional **landmarks** pack (about 150 KB) adds every airport with
scheduled passenger flights and every site on the UNESCO World Heritage List.

.. admonition:: In 30 seconds
   :class: atlas-quick

   .. doctest::

      >>> from pyworldatlas import Atlas
      >>> with Atlas() as atlas:
      ...     print(atlas.airport("LHR"))
      ...     print(atlas.heritage_sites_near("Cusco", limit=1)[0].site.name)
      LHR · London Heathrow Airport (GB)
      Historic centre of Cusco

.. code-block:: bash

   pyworldatlas get landmarks

Airports
--------

Look an airport up by the three-letter IATA code on tickets and bags, or the
four-letter ICAO code pilots use:

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()
   >>> heathrow = atlas.airport("LHR")
   >>> str(heathrow), heathrow.icao_code, heathrow.size
   ('LHR · London Heathrow Airport (GB)', 'EGLL', 'large')
   >>> [airport.iata_code for airport in atlas.airports("Iceland")][:2]
   ['AEY', 'KEF']

:meth:`~pyworldatlas.Atlas.airports` lists the largest airports first; narrow
it with ``country`` and ``size`` (``"large"``, ``"medium"``, or ``"small"``).
Nearby-place searches and maps can use an airport's ``coordinates``.

World Heritage sites
--------------------

:meth:`~pyworldatlas.Atlas.world_heritage_sites` lists sites in list order,
with the year each was inscribed and whether it was chosen for cultural or
natural value, or both. :meth:`~pyworldatlas.Atlas.heritage_sites_near`
finds the sites closest to any city, place, or coordinate:

.. doctest::

   >>> site = atlas.world_heritage_site("Machu Picchu")
   >>> site.name, site.category, site.inscribed
   ('Historic Sanctuary of Machu Picchu', 'mixed', 1983)
   >>> nearest = atlas.heritage_sites_near("Cusco", limit=2)
   >>> 274 in [item.site.site_id for item in nearest]
   True
   >>> atlas.close()

From the command line:

.. code-block:: bash

   pyworldatlas airport LHR
   pyworldatlas heritage Cusco

Sources
-------

Airports come from OurAirports (public domain); an airport's
``country_code`` is the code OurAirports publishes. World Heritage sites come
from Wikidata (CC0) and are located by coordinates only. See
:doc:`data_sources`. PyWorldAtlas is not affiliated with UNESCO or OurAirports
and takes no position on any boundary or status. Locations are representative
points and are not suitable for navigation.
