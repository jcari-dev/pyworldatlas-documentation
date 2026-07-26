Python recipe gallery
=====================

These programs are complete, editable starting points rather than isolated
one-line calls. Copy one into a Python file or open its matching recipe in the
browser playground. Every example uses the public API and the bundled dataset.

.. raw:: html

   <p><a class="atlas-recipe-launch atlas-recipe-launch-primary" href="playground.html#recipe=world-snapshot">Open the interactive recipe library →</a></p>

Build a world snapshot
----------------------

Combine collection behavior with ordinary Python tools to summarize the whole
atlas.

.. code-block:: python

   from collections import Counter
   from pyworldatlas import Atlas

   with Atlas() as atlas:
       info = atlas.dataset_info()
       by_continent = Counter(
           country.continent or "Other"
           for country in atlas
       )

       print(f"Dataset: {info.dataset_version}")
       print(f"Profiles: {len(atlas):,}")
       print(f"Populated places: {sum(c.major_city_count for c in atlas):,}")

       for continent, count in sorted(by_continent.items()):
           print(f"{continent:<12} {count:>3}")

.. raw:: html

   <p><a class="atlas-recipe-launch" href="playground.html#recipe=world-snapshot">Load World snapshot in the playground →</a></p>

Print a country dossier
-----------------------

Mix cultural reference facts with physical geography without flattening the
profile into an unstructured dictionary.

.. code-block:: python

   from pyworldatlas import Atlas

   with Atlas() as atlas:
       country = atlas.country("Brazil")
       print(country.summary())

.. raw:: html

   <p><a class="atlas-recipe-launch" href="playground.html#recipe=postcard">Load Country dossier in the playground →</a></p>

Cross four writing systems
--------------------------

Local names preserve Unicode text and expose the script recorded with each
selected identity.

.. code-block:: python

   from pyworldatlas import Atlas

   with Atlas() as atlas:
       for country_name, language_code in (
           ("Dominican Republic", "es"),
           ("China", "zh"),
           ("India", "hi"),
           ("Japan", "ja"),
       ):
           country = atlas.country(country_name)
           local = country.local_name(language_code)
           print(country.flag, local.short_name, f"[{local.script_code}]")

.. raw:: html

   <p><a class="atlas-recipe-launch" href="playground.html#recipe=names">Load Names and scripts in the playground →</a></p>

Create a comparison table
-------------------------

Because every profile uses the same typed model, a compact comparison needs no
country-specific branching.

.. code-block:: python

   from pyworldatlas import Atlas

   with Atlas() as atlas:
       countries = [
           atlas.country(name)
           for name in (
               "Brazil",
               "Japan",
               "Switzerland",
               "Dominican Republic",
           )
       ]

       print(f"{'COUNTRY':<22} {'CAPITAL':<17} {'AREA KM²':>12}")
       for country in countries:
           print(
               f"{country.flag} {country.name:<19} "
               f"{country.capital.name:<17} "
               f"{country.area_km2:>12,.0f}"
           )

.. raw:: html

   <p><a class="atlas-recipe-launch" href="playground.html#recipe=compare">Load Compare countries in the playground →</a></p>

Build a distance toolkit
------------------------

The coordinate model calculates great-circle distance, initial bearing, and
spherical midpoint without an additional geospatial dependency.

.. code-block:: python

   from pyworldatlas import Atlas

   with Atlas() as atlas:
       tokyo = atlas.coordinates("Tokyo", country="JP")
       paris = atlas.coordinates("Paris", country="FR")
       midpoint = tokyo.midpoint_to(paris)

       print("Tokyo:", tokyo.format())
       print("DMS:", tokyo.dms())
       print(f"Distance: {tokyo.distance_to(paris):,.0f} km")
       print("Initial direction:", tokyo.compass_direction_to(paris))
       print(f"Bearing: {tokyo.bearing_to(paris):.1f}°")
       print(
           "Midpoint:",
           f"{midpoint.latitude:.3f}, {midpoint.longitude:.3f}",
       )

.. raw:: html

   <p><a class="atlas-recipe-launch" href="playground.html#recipe=distance">Load Distance toolkit in the playground →</a></p>

Search and explore nearby cities
--------------------------------

Combine partial city-name search with nearby-place discovery.

.. code-block:: python

   from pyworldatlas import Atlas

   with Atlas() as atlas:
       matches = atlas.search_cities("santo", country="DO", limit=3)
       print("Search results:", ", ".join(city.label for city in matches))

       nearby = atlas.nearest_cities(
           "Santo Domingo",
           origin_country="DO",
           within_country="DO",
           limit=5,
       )
       for result in nearby:
           print(f"{result.city.name:<24} {result.distance:>6.1f} km")

.. raw:: html

   <p><a class="atlas-recipe-launch" href="playground.html#recipe=cities">Load City explorer in the playground →</a></p>

Trace geographic relationships
------------------------------

The border graph and physical-feature index answer different kinds of
connection questions.

.. code-block:: python

   from pyworldatlas import Atlas

   with Atlas() as atlas:
       path = atlas.border_path("Portugal", "China")
       print(" → ".join(path.names))
       print("Crossings:", path.crossings)

       amazon = atlas.countries_with_river("Amazon")
       print(
           "Source-listed Amazon profiles:",
           ", ".join(country.name for country in amazon),
       )

       geneva = atlas.countries_with_lake("Geneva")
       print(
           "Source-listed Lake Geneva profiles:",
           ", ".join(country.name for country in geneva),
       )

.. raw:: html

   <p><a class="atlas-recipe-launch" href="playground.html#recipe=shared-waters">Load Shared waters in the playground →</a></p>

Explore a climate profile
-------------------------

Represented climate classes include a source-derived share suitable for
compact text visualizations.

.. code-block:: python

   from pyworldatlas import Atlas

   with Atlas() as atlas:
       japan = atlas.country("Japan")
       print(japan.climate.summary)

       for zone in japan.climate.koppen_geiger_zones:
           bar = "█" * max(1, round(zone.share_percent / 4))
           print(
               f"{zone.code:<3} {zone.share_percent:>5.1f}% "
               f"{bar}  {zone.name}"
           )

       cfb = atlas.countries(koppen_geiger_code="Cfb")
       print(f"Cfb appears in {len(cfb)} profiles.")

.. raw:: html

   <p><a class="atlas-recipe-launch" href="playground.html#recipe=climate">Load Climate breakdown in the playground →</a></p>

Compose search, filters, and rankings
-------------------------------------

Use ranked search for human input, exact filters for collections, and ranking
methods for comparisons.

.. code-block:: python

   from pyworldatlas import Atlas

   with Atlas() as atlas:
       for match in atlas.search_countries("guinea"):
           print(match.country.alpha2, match.country.name, match.score)

       selection = atlas.countries(
           continent="Americas",
           language_code="es",
           coastal=True,
       )
       print(", ".join(country.name for country in selection))

       print("Longest sourced coastlines:")
       for row in atlas.rank("coastline", limit=5):
           print(
               row.position,
               row.country.name,
               f"{row.value:,.0f} {row.unit}",
           )

.. raw:: html

   <p><a class="atlas-recipe-launch" href="playground.html#recipe=search-filter">Load Search and filter in the playground →</a></p>

Create a repeatable lesson
--------------------------

Stable seeds make questions, choices, and answer positions reproducible across
machines when the dataset version is the same.

.. code-block:: python

   from pyworldatlas import Atlas

   with Atlas() as atlas:
       questions = atlas.quiz(
           topic="local_names",
           count=5,
           choices=4,
           seed="classroom-demo",
       )

   for number, question in enumerate(questions, 1):
       print(f"{number}. {question.prompt}")
       for choice_number, choice in enumerate(question.choices, 1):
           print(f"   {choice_number}. {choice}")
       print(f"   Answer: {question.answer_number}\n")

.. raw:: html

   <p><a class="atlas-recipe-launch" href="playground.html#recipe=quiz">Load Quiz studio in the playground →</a></p>

Export a portable Unicode profile
---------------------------------

Discovery cards keep useful profile structure while remaining detached from
the database and directly JSON serializable.

.. code-block:: python

   import json
   from pyworldatlas import Atlas

   with Atlas() as atlas:
       card = atlas.country("Japan").discovery_card()

   print(card.to_json(indent=2))

.. raw:: html

   <p><a class="atlas-recipe-launch" href="playground.html#recipe=json-export">Load JSON export in the playground →</a></p>

Continue exploring
------------------

The :doc:`playground` contains fourteen ready-to-run programs, including a
nearest-capital radar, city explorer, multilingual name inspector, and
multi-metric leaderboard. Consult :doc:`api` when you want the complete method
and return-type contracts.
