Roadmap and visible progress
============================

PyWorldAtlas grows through small, installable releases with explicit data,
documentation, and compatibility boundaries. Planned work is not part of the
public API until it is implemented, tested, documented, and published.

.. container:: atlas-card-grid

   .. container:: atlas-card atlas-card-blue

      .. rubric:: Current release

      **0.7.0** completes the first rich offline profile with physical
      geography, climate classes, rankings, and learning tools.

   .. container:: atlas-card atlas-card-teal

      .. rubric:: Next milestone

      **0.8.0** focuses on education and usability: simpler exploration,
      friendlier output, classroom activities, and beginner-focused examples.

   .. container:: atlas-card atlas-card-gold

      .. rubric:: Stable destination

      **1.0.0** represents a dependable offline atlas contract after API,
      packaging, typing, and documentation hardening.

.. list-table:: Release train
   :header-rows: 1
   :widths: 14 20 50 16

   * - Version
     - Status
     - Visible improvement
     - Release state
   * - 0.1.0
     - Complete
     - 248-profile core, lookup, capitals, cities, generated database
     - Published
   * - 0.2.1
     - Complete
     - Rich profiles, coordinates, distances, flags, discovery, flashcards
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
     - Planned
     - Education, city discovery, readable summaries, and usability polish
     - —
   * - 0.9.0
     - Planned
     - API, typing, performance, packaging, and documentation hardening
     - —
   * - 1.0.0
     - Planned
     - Stable offline atlas contract
     - —

What 0.7 established
--------------------

The current release combines country identity, practical reference facts,
physical geography, source-listed rivers and lakes, broad climate classes,
coordinates, land-border topology, rankings, and repeatable learning prompts.
It keeps source gaps explicit and does not present derived rankings as judgments
about countries or people.

What 0.8 should improve
-----------------------

The next milestone should make the existing atlas easier and more enjoyable to
use, especially for learners and teachers. The leading candidates are:

- simple city search and nearby-city discovery;
- readable country summaries for terminals, notebooks, and lessons;
- friendly coordinate helpers for common geography activities;
- deterministic multiple-choice questions built from sourced facts;
- beginner-focused examples, classroom recipes, and playground improvements;
- API naming, error-message, typing, accessibility, and browser-runtime polish.

This list is a planning boundary, not a published contract. Each item must have
clear behavior, tests, documentation, and a useful example before release.

Deferred work
-------------

Boundary geometry, GeoJSON export, bounding boxes, polygon centroids, and
point-in-country lookup are not scheduled for 0.8. They add meaningful package
size, licensing, modeling, and boundary-interpretation work and may be better
suited to an optional post-1.0 extension.

Anthem lyrics, audio, contributor histories, and adoption dates remain outside
the current source contract.
