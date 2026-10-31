Teaching with PyWorldAtlas
==========================

A free, offline geography toolkit for the classroom. Every student gets the
same answers from the same sourced data, quizzes repeat exactly when you reuse
a seed, and nothing needs an account or an internet connection once installed.

A lesson in 15 minutes
----------------------

.. list-table::
   :header-rows: 1
   :widths: 18 82

   * - Minutes
     - Activity
   * - 0 to 3
     - Everyone opens the :doc:`playground` and types their own country or
       town into **Look up anything**.
   * - 3 to 8
     - Run the class quiz below and answer together. Every screen shows the
       same questions in the same order.
   * - 8 to 12
     - Press **Open in the editor** on any card, change one word (a country,
       a city, a date), and run it again. That is programming.
   * - 12 to 15
     - Talk about one surprise: why is the day so short in Oslo in December?
       (See :doc:`sun`.)

One quiz for the whole class
----------------------------

A ``seed`` is a word or number that picks the questions. The same seed always
gives the same quiz, so you can print an answer key in advance and every
student sees exactly what you see.

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     questions = atlas.quiz(topic="capitals", count=3, seed="class-7b", continent="Europe")
   >>> for number, question in enumerate(questions, 1):
   ...     print(f"{number}. {question.prompt}")
   ...     for letter, choice in zip("ABCD", question.choices):
   ...         print(f"   {letter}) {choice}")
   1. What is the capital of Romania?
      A) Tórshavn
      B) Ljubljana
      C) Bern
      D) Bucharest
   2. What is the capital of Hungary?
      A) Saint Peter Port
      B) Copenhagen
      C) Budapest
      D) Monaco
   3. What is the capital of Belgium?
      A) London
      B) Brussels
      C) Vienna
      D) Warsaw
   >>> print("Answers:", ", ".join(f"{n}{'ABCD'[q.answer_number - 1]}" for n, q in enumerate(questions, 1)))
   Answers: 1D, 2C, 3B

Change ``seed`` to make a new quiz, and ``topic`` to change the subject:
:meth:`~pyworldatlas.Atlas.learning_topics` lists them all, from capitals and
flags to rivers, climate, plug types, and driving sides. Narrow a quiz to one
continent or region with ``continent`` or ``region``.

More activities
---------------

- **Which is higher?** :meth:`~pyworldatlas.Atlas.quiz` asks about
  famous mountains, islands, and lakes: "Which is higher: Mont Blanc or
  Denali?" (:doc:`learning`).
- **Why seasons happen.** Compare the length of the same day in Oslo and Cape
  Town, then in June (:doc:`sun`).
- **Dig through the Earth.** Find what is on the other side of the planet from
  your town, and notice how often it is ocean (:doc:`learning`).
- **How has the world changed?** Follow electricity, internet use, or life
  expectancy since 1960 in one line (:doc:`statistics`).
- **Travel basics.** Which plug would you pack for Japan? Which side of the
  road do people drive on in Kenya? (:doc:`reference_facts`).
- **Explore the terrain.** Turn a 3D map of a country and find its highest
  mountain (:doc:`maps`).

Classrooms without internet
---------------------------

Install PyWorldAtlas once, then everything runs offline. To give a whole room
the optional packs without downloading them on every computer, download a
``.pack`` file once, copy it on a USB stick, and install it on each computer:

.. code-block:: console

   pyworldatlas add pyworldatlas-statistics.pack

PyWorldAtlas is built for low-cost computers: everything, including the
largest place pack, fits in the 512 MB of memory of a Raspberry Pi Zero 2 W.

What you can rely on
--------------------

- Every fact comes from a named public source with its date
  (:doc:`data_sources`); missing values are left missing, never guessed.
- Country names and codes follow published international standards, and the
  package takes no position on disputes (:doc:`educational_principles`).
- The documentation, maps, and playground are built to be used with a
  keyboard and screen reader; each 3D map includes a plain-language
  description.
