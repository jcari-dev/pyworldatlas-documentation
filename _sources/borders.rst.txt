Land borders and paths
======================

PyWorldAtlas 0.3.0 includes a reviewed, undirected graph of 319 land-border
relationships. It supports immediate neighbors, shared neighbors, shortest
paths, connected land regions, and countries or areas with no accepted land
border. Every operation works from the bundled SQLite database.

API at a glance
---------------

.. list-table::
   :header-rows: 1
   :widths: 34 28 38

   * - Call
     - Returns
     - Meaning
   * - ``neighbors(country)``
     - ``tuple[Country, ...]``
     - Immediate reviewed land neighbors
   * - ``shares_border(first, second)``
     - ``bool``
     - Whether one accepted edge joins the entities
   * - ``shared_neighbors(first, second)``
     - ``tuple[Country, ...]``
     - Intersection of both neighbor sets
   * - ``border_path(origin, destination)``
     - ``BorderPathResult | None``
     - Deterministic shortest graph path
   * - ``border_crossings(origin, destination)``
     - ``int | None``
     - Minimum number of accepted edges crossed
   * - ``has_land_route(origin, destination)``
     - ``bool``
     - Whether both entities share a graph component
   * - ``countries_reachable_by_land(country)``
     - ``tuple[Country, ...]``
     - Other entities in the same component
   * - ``countries_with_no_land_borders()``
     - ``tuple[Country, ...]``
     - Entities with no accepted edge

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

Convenience properties avoid repeatedly unpacking the country references:

.. doctest::

   >>> path.names
   ('Portugal', 'Spain', 'France', 'Germany', 'Poland', 'Russia', 'China')
   >>> path.alpha2_codes
   ('PT', 'ES', 'FR', 'DE', 'PL', 'RU', 'CN')

The result is detached from the database and serializable. If no land route
exists, ``border_path`` and ``border_crossings`` return ``None``.

.. doctest::

   >>> with Atlas() as atlas:
   ...     print(atlas.border_path("Japan", "China"))
   ...     print(atlas.border_crossings("Japan", "China"))
   None
   None

Land connectivity
-----------------

:meth:`~pyworldatlas.Atlas.has_land_route` is a reachability test over the same
reviewed graph. It does not describe roads, border controls, ferries, visas, or
whether travel is possible. Identical endpoints return ``True`` because the
shortest graph path contains zero crossings.

.. doctest::

   >>> with Atlas() as atlas:
   ...     print(atlas.has_land_route("Portugal", "China"))
   ...     print(atlas.has_land_route("Japan", "China"))
   ...     print(atlas.has_land_route("Japan", "Japan"))
   True
   False
   True

Connected land regions
----------------------

``countries_reachable_by_land(country)`` returns the rest of the starting
country's connected component. The starting country is excluded. An island or
other borderless entity returns an empty tuple.

``countries_with_no_land_borders()`` returns all 85 entities that have no edge
in the reviewed graph. This classification follows the package entity scope and
border policy; it is not a general definition of an island country.

Border flashcards
-----------------

The deterministic flashcard API supports two graph topics:

.. doctest::

   >>> with Atlas() as atlas:
   ...     neighbor_card = atlas.flashcards(topic="neighbors", count=1, seed=42)[0]
   ...     count_card = atlas.flashcards(topic="border_counts", count=1, seed=42)[0]
   ...     print(neighbor_card.prompt)
   ...     print(neighbor_card.answer)
   ...     print(count_card.prompt)
   ...     print(count_card.answer)
   Which countries or areas share a reviewed land border with Kuwait?
   Iraq, Saudi Arabia
   How many reviewed land neighbors does Kuwait have?
   2

``neighbors`` cards exclude entities with no accepted land neighbor because
they would have no answer. ``border_counts`` cards include them and use ``0``.
Both topics inherit the stable seed-based sampling contract.

Where each value comes from
---------------------------

``neighbors`` and ``shares_border`` read the accepted relationships stored in
the generated SQLite database. ``shared_neighbors`` is a set intersection;
``border_path`` is breadth-first search; ``border_crossings`` is the path edge
count; ``has_land_route`` is graph reachability; and connected-component and
flashcard results are calculated from the same graph at runtime.

Country names and codes placed in results come from the ordinary country
profiles. They are not copied from Natural Earth labels. Source records and the
review policy are described below and in :doc:`data_sources`.

Data policy
-----------

The automatic acceptance rule requires agreement between the pinned GeoNames
neighbor field and shared polygon segments derived from Natural Earth 1:50m map
units. The current snapshots agree on 315 relationships. Six differences are
recorded in ``build_data/reviewed/border_decisions.csv``; four are included and
two are excluded, producing 319 accepted relationships in total.

This graph is an attributed source convention for educational topology. Other
institutions may use different conventions. Exceptional decisions remain
inspectable, and no broader interpretation should be drawn from the technical
mappings. See :doc:`educational_principles` and the root
``docs/project/BOUNDARIES_AND_DISPUTES.md`` policy.

The build fails if the sources develop an unreviewed difference, if an endpoint
is missing from the 248-entity scope, or if a duplicate, self-edge, or
non-canonical edge appears. Geometry, border length, point-in-country tests, and
route planning are outside this release.

Executable example
------------------

.. literalinclude:: ../../examples/borders.py
   :language: python
   :linenos:
