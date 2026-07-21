Land borders and paths
======================

PyWorldAtlas 0.3.0 includes a reviewed, undirected graph of 319 land-border
relationships. It supports immediate neighbors, shared neighbors, shortest
paths, connected land regions, and countries or areas with no accepted land
border. Every operation works from the bundled SQLite database.

Neighbors
---------

Country lookup follows the same name-and-code rules as the rest of the API.
Results are immutable tuples ordered by country name.

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     [country.name for country in atlas.neighbors("France")]
   ['Andorra', 'Belgium', 'Germany', 'Italy', 'Luxembourg', 'Monaco', 'Spain', 'Switzerland']

Maritime proximity is not a border. A country never shares a border with
itself.

.. doctest::

   >>> with Atlas() as atlas:
   ...     print(atlas.shares_border("Spain", "Morocco"))
   ...     print(atlas.shares_border("United States", "Cuba"))
   True
   False

Shared neighbors
----------------

.. doctest::

   >>> with Atlas() as atlas:
   ...     shared = atlas.shared_neighbors("Germany", "Italy")
   ...     [country.name for country in shared]
   ['Austria', 'France', 'Switzerland']

Shortest land paths
-------------------

:meth:`~pyworldatlas.Atlas.border_path` uses breadth-first search. Both
endpoints appear in the returned :class:`~pyworldatlas.BorderPathResult`, and
``crossings`` is one fewer than the number of countries. Alphabetic neighbor
order makes equal-length choices deterministic.

.. doctest::

   >>> with Atlas() as atlas:
   ...     path = atlas.border_path("Portugal", "China")
   ...     print(path.crossings)
   ...     print(" -> ".join(country.name for country in path.countries))
   6
   Portugal -> Spain -> France -> Germany -> Poland -> Russia -> China

The result is detached from the database and serializable. If no land route
exists, ``border_path`` and ``border_crossings`` return ``None``.

.. doctest::

   >>> with Atlas() as atlas:
   ...     print(atlas.border_path("Japan", "China"))
   ...     print(atlas.border_crossings("Japan", "China"))
   None
   None

Connected land regions
----------------------

``countries_reachable_by_land(country)`` returns the rest of the starting
country's connected component. The starting country is excluded. An island or
other borderless entity returns an empty tuple.

``countries_with_no_land_borders()`` returns all 85 entities that have no edge
in the reviewed graph. This classification follows the package entity scope and
border policy; it is not a general definition of an island country.

Data policy
-----------

The automatic acceptance rule requires agreement between the pinned GeoNames
neighbor field and shared polygon segments derived from Natural Earth 1:50m map
units. The current snapshots agree on 315 relationships. Six differences are
recorded in ``build_data/reviewed/border_decisions.csv``; four are included and
two are excluded, producing 319 accepted relationships in total.

The build fails if the sources develop an unreviewed difference, if an endpoint
is missing from the 248-entity scope, or if a duplicate, self-edge, or
non-canonical edge appears. Geometry, border length, point-in-country tests, and
route planning are outside this release.

Executable example
------------------

.. literalinclude:: ../../examples/borders.py
   :language: python
   :linenos:
