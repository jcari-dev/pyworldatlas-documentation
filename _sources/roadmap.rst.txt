Roadmap and visible progress
============================

Each release has a defined feature boundary, source review, test gate, and
documentation update. A planned feature is not part of the public contract
until its release is built and published.

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
     - Reviewed borders, neighbors, shortest land paths, learning utilities
     - Published
   * - 0.5.0
     - Complete
     - Complete selected local identities, English formal names, editorial policy
     - Published
   * - 0.6.0
     - Release candidate
     - Anthem titles, reviewed mottos, demonyms, richer currency/language/timezone/postal metadata, filters, rankings, nearest capitals
     - Local release gate passed; publication pending
   * - 0.7.0
     - Planned
     - Physical geography: land/water area, coastline, elevation extremes, named rivers/lakes/mountains, reviewed Köppen climate, physical rankings
     - —
   * - Later release
     - Deferred
     - Boundary geometry, GeoJSON, bounding boxes, centroids, point-in-country
     - —
   * - 1.0.0
     - Planned
     - Stable offline atlas contract
     - —

Version 0.6 boundary
--------------------

The 0.6 release intentionally includes anthem titles without lyrics, audio,
credits, or adoption dates. Mottos use a conservative reviewed source-listed
layer and do not infer legal status. Demonyms preserve structured English source
forms. Currency, language, timezone, and postal objects gain practical labels
and provenance. Filters, rankings, and nearest-capital results make those facts
easy to explore.

Version 0.7 boundary
--------------------

The next release is about physical geography, not polygons. It will require
field-specific source decisions and coverage gates for land and water area,
coastline, highest and lowest points, elevation, named major physical features,
and reviewed Köppen climate classifications. Physical rankings will be derived
only after the corresponding source fields pass review.

Explicitly deferred
-------------------

Boundary geometry, GeoJSON export, bounding boxes, centroids, and
point-in-country lookup are not part of 0.6 or 0.7. Reference dates and anthem
contributors/adoption histories are also outside the current source contract.
This keeps each release useful without mixing distinct licensing, modeling, and
interpretation problems.
