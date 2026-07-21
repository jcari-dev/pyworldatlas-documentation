Why PyWorldAtlas?
=================

Geographic software often begins with a network request, an API key, or a large
scientific stack. PyWorldAtlas takes a different position: a useful world
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

Honest about uncertainty
   Missing values stay missing. Values are not invented from model knowledge,
   and later-roadmap features are not advertised as present.

Traceable to sources
   Country identity and regional classification come from UN M49. Capital and
   city records come from GeoNames. Source references travel with profiles.

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
system, or replacement for authoritative statistical agencies. Its job is to
make a carefully scoped offline atlas delightful to use.

