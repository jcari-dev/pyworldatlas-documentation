Learning activities
===================

PyWorldAtlas 0.8 turns the reviewed offline atlas into a small geography lab.
Every activity below is deterministic, works without an API key, and keeps the
underlying country, city, coordinate, and source objects available for deeper
exploration.

.. container:: atlas-card-grid

   .. container:: atlas-card atlas-card-blue

      .. rubric:: Readable

      Start with a country summary, then inspect any typed field behind it.

   .. container:: atlas-card atlas-card-teal

      .. rubric:: Repeatable

      A seed produces the same questions and answer key on every supported
      Python version using the same dataset.

   .. container:: atlas-card atlas-card-gold

      .. rubric:: Offline

      Activities use the bundled database and transparent calculations only.

A country in one friendly call
------------------------------

:atlas-example-label:`COUNTRY PROFILE`

.. code-block:: python

   from pyworldatlas import Atlas

   with Atlas() as atlas:
       brazil = atlas.country("Brazil")
       print(brazil.summary())

The summary brings together the flag, selected local identity, capital,
location, snapshot population, currencies and languages, anthem title,
reviewed motto, elevation, climate, rivers, and lakes when each value is
available. It is display text, not a replacement for structured access:

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     brazil = atlas.country("Brazil")
   ...     print(brazil.flag, brazil.name_in("pt"), "—", brazil.capital.name)
   ...     print(brazil.highest_point.name)
   ...     print(", ".join(river.name for river in brazil.rivers[:3]))
   🇧🇷 Brasil — Brasília
   Pico da Neblina
   Amazon, Río de la Plata/Paraná, Tocantins

A gallery of writing systems
----------------------------

:atlas-example-label:`NAMES AND SCRIPTS`

Each local record keeps its language, writing-system code, evidence kind, and
source locator. The package never manufactures a translation or romanization.

.. doctest::

   >>> with Atlas() as atlas:
   ...     for country_name, language_code in (
   ...         ("Dominican Republic", "es"),
   ...         ("China", "zh"),
   ...         ("India", "hi"),
   ...         ("Japan", "ja"),
   ...     ):
   ...         country = atlas.country(country_name)
   ...         local = country.local_name(language_code)
   ...         print(country.flag, local.short_name, f"[{local.script_code}]")
   🇩🇴 República Dominicana [Latn]
   🇨🇳 中国 [Hans]
   🇮🇳 भारत [Deva]
   🇯🇵 日本 [Jpan]

Turn coordinates into a compass activity
-----------------------------------------

:atlas-example-label:`COORDINATE LAB`

.. doctest::

   >>> with Atlas() as atlas:
   ...     tokyo = atlas.city("Tokyo", country="JP")
   ...     paris = atlas.city("Paris", country="FR")
   ...     print(tokyo.coordinates.format())
   ...     print(tokyo.coordinates.dms())
   ...     print(f"{tokyo.coordinates.distance_to(paris.coordinates):,.0f} km")
   ...     print(tokyo.coordinates.compass_direction_to(paris.coordinates))
   35.6895° N, 139.6917° E
   35° 41′ 22.2″ N, 139° 41′ 30.2″ E
   9,713 km
   NNW

The direction is the initial direction along a great-circle path. It is not a
road, rail, or flight instruction. See :doc:`coordinates_distances` for the
measurement contract.

Explore nearby cities
---------------------

:atlas-example-label:`CITY DISCOVERY`

.. doctest::

   >>> with Atlas() as atlas:
   ...     print([city.label for city in atlas.search_cities("santo", country="DO", limit=3)])
   ...     nearby = atlas.nearest_cities(
   ...         "Santo Domingo",
   ...         origin_country="DO",
   ...         within_country="DO",
   ...         limit=3,
   ...     )
   ...     print([(item.city.name, round(item.distance)) for item in nearby])
   ['Santo Domingo (DO)', 'Santo Domingo Oeste (DO)', 'Santo Domingo Este (DO)']
   [('Santo Domingo Este', 5), ('Bella Vista', 6), ('Santo Domingo Oeste', 12)]

Build a repeatable multiple-choice lesson
-----------------------------------------

:atlas-example-label:`QUIZ BUILDER`

.. code-block:: python

   from pyworldatlas import Atlas

   with Atlas() as atlas:
       questions = atlas.quiz(
           topic="local_names",
           count=5,
           choices=4,
           seed="world-languages",
       )

       for number, question in enumerate(questions, 1):
           print(f"{number}. {question.prompt}")
           for choice_number, choice in enumerate(question.choices, 1):
               print(f"   {choice_number}. {choice}")
           print(f"   Answer: {question.answer_number}\n")

Questions are ordinary immutable objects. They can be checked or serialized
without storing learner information:

.. doctest::

   >>> with Atlas() as atlas:
   ...     questions = atlas.quiz(topic="capitals", count=3, seed="lesson-8")
   ...     print(len(questions), all(q.answer in q.choices for q in questions))
   ...     print(questions == atlas.quiz(topic="capitals", count=3, seed="lesson-8"))
   3 True
   True

Discover the complete menu with :meth:`~pyworldatlas.Atlas.learning_topics`.
The same topics work with :meth:`~pyworldatlas.Atlas.flashcards` when answer
choices are not needed.

Where to go next
----------------

- Open :doc:`playground` to run these ideas directly in a browser.
- Copy the longer programs in :doc:`recipes`.
- Explore names and provenance in :doc:`local_names`.
- Follow rivers, lakes, elevation, and climate in :doc:`physical_geography`.
- Review every method and result object in :doc:`api`.
