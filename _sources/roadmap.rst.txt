Roadmap
-------

PyWorldAtlas grows through small, installable releases with explicit data,
documentation, and compatibility boundaries. Planned work is not part of the
public API until it is implemented, tested, documented, and published.

.. container:: atlas-card-grid

   .. container:: atlas-card atlas-card-blue

      .. rubric:: Current release

      **0.8.0** makes the rich offline atlas easier to explore, explain, and
      use in lessons without changing the reviewed dataset.

   .. container:: atlas-card atlas-card-teal

      .. rubric:: Next milestone

      **0.9.0** focuses on API consistency, typing, performance, packaging,
      compatibility, and documentation completeness.

   .. container:: atlas-card atlas-card-gold

      .. rubric:: Stable destination

      **1.0.0** represents a dependable offline atlas contract with clear
      upgrades and reproducible releases.

.. list-table:: Release train
   :header-rows: 1
   :widths: 14 14 54 18

   * - Version
     - Status
     - Main boundary
     - Publication
   * - 0.1.0
     - Complete
     - Rebuilt runtime, generated database, countries, capitals, and cities
     - Published
   * - 0.2.1
     - Complete
     - Rich profiles, coordinates, distances, and initial discovery tools
     - Published
   * - 0.3.1
     - Complete
     - Reviewed neighbors, shortest land paths, and border learning tools
     - Published
   * - 0.5.0
     - Complete
     - Local identities, English formal names, and editorial policy
     - Published
   * - 0.6.0
     - Complete
     - Reference facts, practical metadata, filters, and rankings
     - Published
   * - 0.7.0
     - Complete
     - Physical geography, climate classes, feature search, and learning prompts
     - Published
   * - 0.8.0
     - Complete
     - Summaries, city discovery, coordinate helpers, quizzes, and documentation UX
     - Published
   * - 0.9.0
     - Planned
     - API, typing, performance, packaging, and documentation hardening
     - —
   * - 1.0.0
     - Planned
     - Stable offline atlas contract
     - —

What 0.8 established
--------------------

The education-and-usability release adds a presentation layer without hiding
the typed data underneath it:

- :meth:`~pyworldatlas.Country.summary` assembles readable country introductions;
- :meth:`~pyworldatlas.Atlas.search_cities` and
  :meth:`~pyworldatlas.Atlas.nearest_cities` make place discovery approachable;
- :class:`~pyworldatlas.Coordinate` formats decimal and DMS labels and names
  initial compass directions;
- :meth:`~pyworldatlas.Atlas.learning_topics` exposes the complete learning menu;
- :meth:`~pyworldatlas.Atlas.quiz` creates repeatable multiple-choice material.

All five capabilities use existing reviewed facts or transparent calculations.
They add no learner tracking, scoring service, live API, or new source layer.

Deferred work
-------------

Boundary geometry, GeoJSON export, bounding boxes, polygon centroids, and
point-in-country lookup remain outside the current plan. They add meaningful
package size, licensing, modeling, and boundary-interpretation work and may be
better suited to an optional post-1.0 extension.

Anthem lyrics, audio, contributor histories, and adoption dates remain outside
the current source contract.
