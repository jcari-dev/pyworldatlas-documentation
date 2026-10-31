Quests
======

Six small puzzles to solve with PyWorldAtlas. Each one names the call that
helps. Try it yourself first, in the :doc:`playground` or your own Python, then
open the answer to check.

Every quest starts from the same three lines:

.. doctest::

   >>> from datetime import date
   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()

1. The long way to Vienna
-------------------------

How many borders do you cross to travel by land from Portugal to Austria?

Hint: ``atlas.border_path()``

.. raw:: html

   <details class="atlas-answer"><summary>Show the answer</summary>

.. rst-class:: atlas-try-these

.. doctest::

   >>> print(atlas.border_path("Portugal", "Austria"))
   Portugal → Spain → France → Germany → Austria (4 border crossings)

.. raw:: html

   </details>

2. Next-door capitals
---------------------

Which capital city is closest to Vienna, and how far away is it?

Hint: ``atlas.capitals_near()``

.. raw:: html

   <details class="atlas-answer"><summary>Show the answer</summary>

.. rst-class:: atlas-try-these

.. doctest::

   >>> print(atlas.capitals_near("Vienna", limit=1)[0])
   Bratislava, Slovakia · 55 km

.. raw:: html

   </details>

3. The longest day
------------------

On 21 June, how much longer is the day in Reykjavik than in Lima?

Hint: ``atlas.sun()`` with a :term:`latitude` and :term:`longitude`

.. raw:: html

   <details class="atlas-answer"><summary>Show the answer</summary>

.. rst-class:: atlas-try-these

.. doctest::

   >>> reykjavik = atlas.sun((64.15, -21.94), date(2026, 6, 21))
   >>> lima = atlas.sun((-12.05, -77.04), date(2026, 6, 21))
   >>> reykjavik.daylight, lima.daylight
   ('21 h 09 min', '11 h 25 min')
   >>> round(reykjavik.day_length_hours - lima.day_length_hours, 1)
   9.7

Almost ten hours more. In June it is summer north of the equator and winter
south of it.

.. raw:: html

   </details>

4. Top of the Alps
------------------

Which country in Western Europe has the highest point, and how high is it?

Hint: ``atlas.rank()``

.. raw:: html

   <details class="atlas-answer"><summary>Show the answer</summary>

.. rst-class:: atlas-try-these

.. doctest::

   >>> print(atlas.rank("highest_elevation", region="Western Europe", limit=1)[0])
   #1 France: 4,810 m

That is Mont Blanc, on the border of France and Italy.

.. raw:: html

   </details>

5. Islands only
---------------

How many countries and areas in Oceania have no land border at all?

Hint: ``atlas.countries()`` with ``land_borders=False``

.. raw:: html

   <details class="atlas-answer"><summary>Show the answer</summary>

.. rst-class:: atlas-try-these

.. doctest::

   >>> len(atlas.countries(continent="Oceania", land_borders=False))
   28

.. raw:: html

   </details>

6. Dig straight down
--------------------

If you dug a tunnel straight through the Earth from Madrid, which country would
you come out in?

Hint: ``atlas.antipode()`` finds the :term:`antipode`

.. raw:: html

   <details class="atlas-answer"><summary>Show the answer</summary>

.. rst-class:: atlas-try-these

.. doctest::

   >>> spot = atlas.antipode("Madrid")
   >>> spot.nearest[0].place.country_code
   'NZ'

New Zealand. Most of the land on Earth sits opposite ocean, so few cities have
a city on the other side.

.. raw:: html

   </details>

.. testcleanup::

   atlas.close()

Want more? The :doc:`cheatsheet` lists the most useful calls, and
``atlas.quiz("capitals")`` asks five questions at a time.
