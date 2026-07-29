Roadmap
*******

PyWorldAtlas grows through small, installable releases with explicit data,
documentation, and compatibility boundaries. Planned work is not part of the
public API until it is implemented, tested, documented, and published.

.. container:: atlas-card-grid

   .. container:: atlas-card atlas-card-blue

      .. rubric:: Current release

      **0.9.3** sharpens installation guidance, API readability, and the shared
      project presentation without changing the dataset or public API.

   .. container:: atlas-card atlas-card-teal

      .. rubric:: Next milestone

      Stable-API hardening will focus on consistency, typing, performance,
      packaging, compatibility, and complete reference coverage.

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
   * - 0.9.1
     - Complete
     - Optional 3D elevation and climate maps, river overlays, and HTML export
     - Published
   * - 0.9.2
     - Complete
     - Terrain-height controls, selectable labels, and sharper map presentation
     - Published
   * - 0.9.3
     - Complete
     - Installation, API-reference, Explore, and project-page polish
     - Published
   * - 1.0.0
     - Planned
     - Stable offline atlas contract
     - —

What 0.9 adds
-------------

The map release is an optional presentation layer over documented geographic
sources:

- :meth:`~pyworldatlas.Atlas.map` resolves any existing country query;
- :meth:`~pyworldatlas_mapview.CountryMap.show` opens a local browser view;
- :meth:`~pyworldatlas_mapview.CountryMap.figure` supports notebooks and
  direct Plotly customization;
- :meth:`~pyworldatlas_mapview.CountryMap.write_html` creates a standalone
  offline document; and
- Overview and Standard editions offer the same 248-profile API at different
  elevation sampling intervals.

See :doc:`maps` for installation, examples, sources, and interpretation limits.

Deferred work
-------------

Boundary geometry, GeoJSON export, bounding boxes, polygon centroids, and
point-in-country lookup remain outside the current plan. The 0.9 viewer uses
generalized outlines internally for display but does not expose them as a
public geographic geometry API.

Native desktop rendering, Detailed and Ultra map editions, anthem lyrics,
audio, contributor histories, and adoption dates also remain outside the
current release.
