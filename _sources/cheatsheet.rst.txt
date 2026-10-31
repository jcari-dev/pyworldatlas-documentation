Cheat sheet
===========

The calls you will use most, on one page. Print it for a classroom wall or
keep it open next to your editor. Every line below runs as a test, so the
answers are exactly what you will see.

Start with three lines:

.. doctest::

   >>> from datetime import date
   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()

Stuck? ``atlas.help()`` prints a short tour, and ``pyworldatlas tour`` does the
same in a terminal.

Look things up
--------------

.. rst-class:: atlas-try-these

.. doctest::

   >>> atlas.country("Japan").capital.name
   'Tokyo'
   >>> atlas.country("NZ").name
   'New Zealand'
   >>> print(atlas.city("Lima"))
   Lima (PE)
   >>> print(atlas.find("Kilimanjaro", limit=1)[0])
   Mount Kilimanjaro, mountain (TZ)

Filter and rank
---------------

.. rst-class:: atlas-try-these

.. doctest::

   >>> [country.name for country in atlas.countries(river="Danube")][:3]
   ['Austria', 'Bulgaria', 'Croatia']
   >>> [country.name for country in atlas.countries(region="Western Europe", coastal=False)]
   ['Austria', 'Liechtenstein', 'Luxembourg', 'Switzerland']
   >>> print(atlas.rank("area", region="Western Europe", limit=1)[0])
   #1 France: 643,801 km²

Measure
-------

.. rst-class:: atlas-try-these

.. doctest::

   >>> print(atlas.distance_between("Paris", "Tokyo"))
   9,713 km
   >>> print(atlas.capitals_near("Oslo", limit=1)[0])
   Stockholm, Sweden · 417 km
   >>> atlas.sun((64.15, -21.94), date(2026, 6, 21)).daylight
   '21 h 09 min'

Borders
-------

.. rst-class:: atlas-try-these

.. doctest::

   >>> [country.name for country in atlas.neighbors("Portugal")]
   ['Spain']
   >>> atlas.shares_border("Spain", "France")
   True
   >>> print(atlas.border_path("Portugal", "Poland"))
   Portugal → Spain → France → Germany → Poland (4 border crossings)

Learn
-----

.. rst-class:: atlas-try-these

.. doctest::

   >>> print(atlas.quiz("capitals", region="Western Europe", seed=1)[0])
   What is the capital of Germany?  1) Berlin  2) Bern  3) Vienna  4) Brussels
   >>> card = atlas.flashcards("capitals", region="Western Europe", count=3, seed=2)[0]
   >>> card.prompt, card.answer
   ('What is the capital of Liechtenstein?', 'Vaduz')

With the optional packs
-----------------------

These need a :term:`pack` first, such as ``pyworldatlas get statistics``. See
:doc:`installation`.

.. doctest::

   >>> print(atlas.statistic("Japan", "population"))
   123,366,734 people (2025)
   >>> print(atlas.rank("life_expectancy", limit=1)[0])
   #1 Monaco: 86.5 years (2024)
   >>> print(atlas.world_heritage_site("Machu Picchu"))
   Historic Sanctuary of Machu Picchu, mixed

.. code-block:: python

   atlas.map("Iceland").show()              # a 3D map in your browser
   atlas.world_map("life_expectancy").show()  # every country, colored by one number

In a terminal
-------------

.. code-block:: console

   pyworldatlas country Japan
   pyworldatlas find Kilimanjaro
   pyworldatlas near -12.05 -77.04
   pyworldatlas tour

.. testcleanup::

   atlas.close()

Next, try the :doc:`quests`, or look up any call in the :doc:`api`.
