Country discovery and learning tools
====================================

PyWorldAtlas can turn its sourced country profiles into reproducible samples,
compact discovery cards, and structured flashcards. These tools are offline,
dependency-free, and deterministic. They do not maintain scores or user state.

Flag emoji
----------

``Country.flag`` and ``Country.flag_emoji`` expose the same regional-indicator
Unicode sequence derived from the profile's alpha-2 code:

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()
   >>> japan = atlas.country("Japan")
   >>> japan.flag
   '🇯🇵'
   >>> japan.flag_emoji
   '🇯🇵'

Flag appearance depends on the operating system, font, and application. Some
terminals display a pair of regional-indicator letters instead of a flag image.
The package does not bundle flag artwork.

Derived profile facts
---------------------

Convenience properties keep common profile work explicit:

.. doctest::

   >>> japan.language_codes
   ('ja',)
   >>> japan.currency_code
   'JPY'
   >>> japan.major_city_count == len(japan.major_cities)
   True
   >>> round(japan.population_density, 2)
   334.88

``population_density`` is calculated from the captured population and area
values. It is not a separate official statistic and returns ``None`` when the
ratio cannot be calculated.

Discovery cards
---------------

:meth:`Country.discovery_card <pyworldatlas.Country.discovery_card>` returns a
compact immutable view suitable for teaching examples, JSON APIs, notebooks,
and static-site generation:

.. doctest::

   >>> card = japan.discovery_card()
   >>> card.country.alpha3
   'JPN'
   >>> card.capital
   'Tokyo'
   >>> card.flag_emoji
   '🇯🇵'
   >>> card.formal_name
   'Japan'
   >>> card.language_codes
   ('ja',)
   >>> card.anthem_title
   'Kimigayo'
   >>> card.demonym
   'Japanese (singular and plural)'
   >>> card.timezone_ids
   ('Asia/Tokyo',)
   >>> card.to_dict()["country"]["numeric"]
   '392'

The card is built from the materialized ``Country`` object. It performs no
database query and remains usable after its atlas is closed.

Reproducible country samples
----------------------------

:meth:`Atlas.sample_countries <pyworldatlas.Atlas.sample_countries>` uses a
versioned SHA-256 ranking over stable M49 identifiers. It does not use global
random state or depend on SQLite row order:

.. doctest::

   >>> sample = atlas.sample_countries(count=5, seed=42)
   >>> [country.name for country in sample]
   ['Kuwait', 'Bahamas', 'Burundi', 'United Arab Emirates', 'Tunisia']
   >>> africa = atlas.sample_countries(count=4, continent="Africa", seed="class")
   >>> [country.alpha2 for country in africa]
   ['BJ', 'MW', 'CV', 'DZ']

The same package version, dataset version, filters, count, and seed produce the
same ordered sample on every supported Python version. ``count`` must be a
positive integer and cannot exceed the filtered population.

Structured flashcards
---------------------

:meth:`Atlas.flashcards <pyworldatlas.Atlas.flashcards>` uses the same stable
sampling primitive and returns immutable :class:`~pyworldatlas.Flashcard`
objects:

.. doctest::

   >>> cards = atlas.flashcards(topic="capitals", count=3, seed=42)
   >>> [(card.country.alpha2, card.answer) for card in cards]
   [('KW', 'Kuwait City'), ('BS', 'Nassau'), ('BI', 'Gitega')]
   >>> cards[0].prompt
   'What is the capital of Kuwait?'
   >>> cards[0].to_dict()["country"]["numeric"]
   '414'

Supported topics
~~~~~~~~~~~~~~~~

.. list-table:: Flashcard topics
   :header-rows: 1
   :widths: 30 70

   * - Topic
     - Answer
   * - ``capitals``
     - Primary capital name
   * - ``countries_from_capitals``
     - Country or area name
   * - ``flags``
     - Country or area represented by a flag emoji
   * - ``alpha_2_codes`` / ``alpha_3_codes`` / ``m49_codes``
     - Standard country identifier
   * - ``currencies``
     - Captured currency name and code
   * - ``calling_codes``
     - Captured international calling codes
   * - ``top_level_domains``
     - Country-code top-level domain
   * - ``language_codes``
     - Captured language codes
   * - ``continents`` / ``regions``
     - Bundled geographic classification
   * - ``local_names``
     - Selected sourced local-language name
   * - ``neighbors``
     - Alphabetized names from the reviewed land-border graph
   * - ``border_counts``
     - Number of accepted land-border relationships
   * - ``populations`` / ``areas`` / ``population_density``
     - Captured snapshot value or transparent calculated ratio

Countries missing the answer required by a topic are removed before sampling.
If the requested count is impossible, the method raises ``ValueError`` rather
than returning an incomplete lesson. Local-name flashcards cover all 248
country and area records using their selected local identity. Neighbor cards exclude
borderless entities, while border-count cards include them with an answer of
``0``.

.. doctest::

   >>> atlas.flashcards(topic="local_names", count=2, seed=42)[0].answer
   'الكويت'
   >>> atlas.close()

Data and interpretation
-----------------------

Discovery features introduce no unsourced country values. Flags come from
alpha-2 codes; density is a documented ratio; cards copy profile fields; and
sampling and flashcards rearrange existing values. Population and area answers
remain snapshots, observed timezones remain limited to bundled places, and
language answers are source codes, while local-name cards use the selected CLDR
or UNGEGN identity record. Border flashcards are derived from the reviewed graph;
they introduce no additional adjacency claims.

Executable example
------------------

.. literalinclude:: ../../examples/discovery.py
   :language: python
   :linenos:
