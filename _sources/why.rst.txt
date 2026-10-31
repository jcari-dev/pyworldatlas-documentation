Why PyWorldAtlas?
=================

Geographic software often begins with a network request, an API key, or a large
scientific stack. PyWorldAtlas takes a different approach: a useful world
reference should still work in a classroom with unreliable Wi-Fi, on a small
computer, inside a reproducible build, or during a flight.

The product promise
-------------------

PyWorldAtlas is designed around four constraints:

Offline by default
   Package use never makes a network request. Source downloads happen only in
   the separate development pipeline.

Small enough to understand
   The runtime uses the Python standard library and one normalized SQLite
   database. There is no ORM, dataframe layer, or GIS framework hidden beneath
   a simple call.

Missing values remain missing
   Published values must be traceable to a documented source. An unavailable
   scalar remains ``None`` and an unavailable collection remains empty.

Traceable to sources
   Country identity and regional classification come from UN M49. Profile,
   capital, and populated-place records come from GeoNames. Complete local
   display names come from Unicode CLDR, while reviewed national official forms
   come from UNGEGN. English formal names use a public-domain Factbook base with
   eight exact reviewed UN or Wikidata exceptions. Source references are
   exposed on profiles and local-name records.

Useful for learning
   Readable country summaries, flag emoji, multilingual names, friendly
   coordinate labels, city discovery, reproducible samples, flashcards, and
   multiple-choice questions turn the same attributed profiles into reusable
   lesson material without adding a game framework or hidden data source.

Who is it for?
--------------

- Students learning Python through real geographic data.
- Teachers preparing offline lessons and exercises.
- Developers prototyping quizzes, dashboards, or data tools.
- People working with limited connectivity or older hardware.
- Curious programmers who want an approachable atlas they can inspect.

What it is not
--------------

PyWorldAtlas is not a live-news service, professional GIS engine, routing
system, or replacement for authoritative statistical agencies. It is a scoped,
offline reference with explicit source and coverage boundaries.

It is also not a live commentary or opinion service. Source conventions are
attributed and their limitations are documented. The formal editorial
commitments and community standard are in :doc:`educational_principles`.

What is bundled
---------------

.. list-table:: Dataset 2026.10.27.1
   :header-rows: 1
   :widths: 62 38

   * - Records
     - Coverage
   * - Countries and areas
     - 248
   * - Primary capitals
     - 241 / 248
   * - Populated places
     - 6,265
   * - Selected local-language identities
     - 248 / 248
   * - Sourced English formal names
     - 240 / 248
   * - Anthem titles
     - 234 / 248
   * - Reviewed source-listed mottos
     - 32 / 248
   * - Travel basics (plugs, mains supply, driving side)
     - 245 / 248
   * - English demonym profiles
     - 227 / 248
   * - Country timezone profiles
     - 246 / 248, 417 records
   * - Country-language metadata
     - 722 records across 245 profiles
   * - Reviewed land-border relationships
     - 319
   * - Total-area profiles
     - 248 / 248
   * - Land area and coastline
     - 238 / 248 each
   * - Highest and lowest points
     - 240 / 248 each
   * - Source-listed river records
     - 188 across 80 profiles
   * - Source-listed lake records
     - 187 across 69 profiles
   * - Plain-language climate summaries
     - 240 / 248
   * - Köppen-Geiger climate profiles
     - 241 / 248
   * - Overview and Standard 3D maps
     - 248 / 248 each
